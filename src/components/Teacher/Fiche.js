/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'
// import PropTypes from 'prop-types';
import url from '../../config';
// import computeStats from './ComputeStats';
import SC from './ScoreChart';

class Begin extends Component {
  /* propTypes = {
      match: PropTypes.number.isRequired,
      params: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    }; */
  constructor(props) {
    super(props);
    // this.computeStats = this.computeStats.bind(this)
    this.state = {
      user: '',
      color: 'green',
      lastChat: '',
      firstLog: '',
      score: [],
      average: 0,
    };
  }

  componentDidMount() {
    // const { id } = this.props;
    // this.props.match.params.id
    // eslint-disable-next-line react/destructuring-assignment react/prop-types
    axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
      console.log(res.data);
      this.setState({ user: res.data }, () => {
        // console.log('user', this.state.user);
        const { user } = this.state;
        const scores = user.score;
        let color = '';
        if (scores.fidelity > 7) {
          color = 'green';
        } else if (scores.fidelity < 4) {
          color = 'red';
        } else {
          color = 'orange';
        }

        console.log(user.numberQuestions);

        // Coloration de l'indicateur INVESTISSEMENT
        if (user.numberChats !== undefined && user.numberChats !== null) {
          // const nbChats = user.numberChats.length;

          // const d = new Date();
          // const today = [d.getFullYear(), d.getMonth() + 1, d.getDate()];
          // console.log(today);

          /* if (nbChats !== 0) {
              const lastChat = user.numberChats[
                user.numberChats.length - 1
              ];
              console.log(lastChat);

              const lastEval = [
                lastChat.split('T')[0].split('-')[0],
                lastChat.split('T')[0].split('-')[1],
                lastChat.split('T')[0].split('-')[2],
              ];
              // console.log(lastEval);

            if (today[1] - lastEval[1] > 1 ||today[0] - lastEval[0] > 1) {
              color='red'
            } else if (today[2] - lastEval[2] > 14) {
              color='orange'
            } else if (today[2] - lastEval[2] < 14) {
              color='green'
            }
            } */
          const tab = user.registration.split('T')[0].split('-');
          const reg = `${tab[2]}/${tab[1]}/${tab[0]}`;
          let last = ' Aucune session';
          if (
            user.numberChats !== undefined
                        && user.numberChats.length !== 0
                        && user.numberChats !== null
          ) {
            // console.log(user.numberChats[user.numberChats.length - 1]);
            const tab2 = user.numberChats[user.numberChats.length - 1]
              .split('T')[0]
              .split('-');
            last = `${tab2[2]}/${tab2[1]}/${tab2[0]}`;
          }

          this.setState({
            user: res.data,
            color: `list-group-item ${color}`,
            score: scores,
            firstLog: reg,
            lastChat: last,
            average:
                            (scores.motivation
                                + scores.fidelity
                                + scores.lifestyle
                                + scores.integration
                                + scores.noOrientation)
                            / 5,
          });
        }
      });
    });
  }

  /* toDisplay(dateMongo) {
    const tab = dateMongo.split('T')[0].split('-');
    const tab2 = this.tab.split('T')[0].split('-');
    return `${tab[2]}/${tab[1]}/${tab[0]}`;
  } */

  render() {
    let fidelity;
    let motivation;
    let lifestyle;
    let integration;
    let noOrientation;
    const {
      user, score, color, firstLog, average, lastChat,
    } = this.state;

    if (false) {
      motivation = true;
    } else {
      motivation = false;
    }

    if (
      user.numberChats !== undefined
            && user.numberChats.length !== 0
            && user.numberChats !== null
    ) {
      fidelity = true;
    } else {
      fidelity = false;
    }

    if (false) {
      lifestyle = true;
    } else {
      lifestyle = false;
    }

    if (false) {
      integration = true;
    } else {
      integration = false;
    }

    if (false) {
      noOrientation = true;
    } else {
      noOrientation = false;
    }

    return (
      <div className="container">
        <h2>
Fiche de l&apos;élève :
          {user.pseudo}
        </h2>
        <div className="card bg-light mb-3">
          <div className="card-header">
            <h3>Informations personnelles</h3>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h5 className="card-title">
                {' '}
                                Motivation générale :
                {' '}
                {score.motivation}
                                /10
              </h5>
              <p className="card-text">
                {' '}
                                Indicateur random :
                {' '}
                {motivation
                  ? 'Indicateur'
                  : "Pas d'indicateur"}
                {' '}
              </p>
            </li>

            <li className={color}>
              <h5 className="card-title">
                {' '}
                                Utilisation et fidélité :
                {' '}
                {score.fidelity}
                                /10
              </h5>
              <p className="card-text">
                {' '}
Dernière session de chat :
                {lastChat}
                {' '}

              </p>
              <p className="card-text">
                {' '}
                                Nombre de sessions de chat :
                {' '}
                {fidelity ? user.numberChats.length : '0'}
                {' '}
              </p>
              <p className="card-text">
                {' '}
                                Nombre de réponses :
                {' '}
                {user.numberQuestions}
                {' '}
              </p>
              <p className="card-text">
                {' '}
Date d&apos;inscription :
                {firstLog}
                {' '}

              </p>
            </li>

            <li className="list-group-item">
              <h5 className="card-title">
                {' '}
                                Style de vie :
                {score.lifestyle}
                                /10
              </h5>
              <p className="card-text">
                {' '}
                                Indicateur random :
                {' '}
                {lifestyle
                  ? 'Indicateur'
                  : "Pas d'indicateur"}
                {' '}
              </p>
            </li>

            <li className="list-group-item">
              <h5 className="card-title">
                {' '}
                                Intégration :
                {score.integration}
                                /10
              </h5>
              <p className="card-text">
                {' '}
                                Indicateur random :
                {' '}
                {integration ? 'Indicateur' : "Pas d'indicateur"}
                {' '}
              </p>
            </li>

            <li className="list-group-item">
              <h5 className="card-title">
                                Pertinence de l&apos;orientation :
                {' '}
                {score.noOrientation}
                                /10
              </h5>
              <p className="card-text">
                {' '}
                                Indicateur random :
                {' '}
                {noOrientation ? 'Indicateur' : "Pas d'indicateur"}
                {' '}
              </p>
            </li>

            <li className="list-group-item">
              <SC id={this.props.match.params.id} />
            </li>
          </ul>

          <div className="card-footer">
            <h4 className="card-title">
                            Score moyen :
              {average}
                            /10
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Begin;
