function updateMotivation() {
  return 0;
}

function updateFidelity(user) {
  if (
    user.numberChats === undefined
        || user.numberChats === null
        || user.numberChats.length === 0
  ) {
    return 0;
  }
  let score = 0;
  const d = new Date();
  const today = [d.getFullYear(), d.getMonth() + 1, d.getDate()];

  const lastChat = user.numberChats[user.numberChats.length - 1];
  const lastEval = [
    lastChat.split('T')[0].split('-')[0],
    lastChat.split('T')[0].split('-')[1],
    lastChat.split('T')[0].split('-')[2],
  ];

  const dateRegistration = [
    user.registration.split('T')[0].split('-')[0],
    user.registration.split('T')[0].split('-')[1],
    user.registration.split('T')[0].split('-')[2],
  ];

  if (today[1] - lastEval[1] >= 1 || today[0] - lastEval[0] >= 1) {
    score += 1;
  } else if (today[2] - lastEval[2] > 21) {
    score += 2;
  } else if (today[2] - lastEval[2] > 14) {
    score += 3;
  } else if (today[2] - lastEval[2] > 7) {
    score += 4;
  } else if (today[2] - lastEval[2] < 7) {
    score += 5;
  }

  const nbchats = user.numberChats.length;
  const nbMois = (today[0] - dateRegistration[0]) * 12 + today[1] - dateRegistration[1];

  if (nbMois === 0 && nbchats === 1) {
    score += 2;
  } else if (nbMois === 0 && nbchats === 2) {
    score += 4;
  } else if (nbchats > 2 * nbMois) {
    score += 5;
  } else if (nbchats > nbMois) {
    score += 3;
  } else if (nbchats < nbMois) {
    score += 1;
  }

  return score;
}

function updateLifestyle() {
  return 0;
}

function updateIntegration() {
  return 0;
}

function updateNoOrientation() {
  return 0;
}

export default function computeStats(user) {
  const tabScores = [];
  let count = 0;
  Object.keys(user.score).forEach((score) => {
    if (score >= 0) {
      tabScores.push(score);
    } else {
      let newScore;
      switch (count) {
        case 0:
          newScore = updateMotivation(user);
          break;

        case 1:
          newScore = updateFidelity(user);
          break;

        case 2:
          newScore = updateLifestyle(user);
          break;

        case 3:
          newScore = updateIntegration(user);
          break;

        case 4:
          newScore = updateNoOrientation(user);
          break;

        default:
          break;
      }
      tabScores.push(newScore);
    }
    count += 1;
  });

  return tabScores;
}
