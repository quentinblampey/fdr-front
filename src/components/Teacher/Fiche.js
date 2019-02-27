import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'
import url from '../../config';
import computeStats from './ComputeStats';

class Begin extends Component {
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
    axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
      console.log(res.data.registration);
      this.setState(
        { user: res.data, firstLog: this.toDisplay(res.data.registration) },
        (state) => {
          console.log('user', this.state.user);

          const scores = computeStats(this.state.user);
          let color = '';
          if (scores[1] > 7) {
            color = 'green';
          } else if (scores[1] < 4) {
            color = 'red';
          } else {
            color = 'orange';
          }

          // Coloration de l'indicateur INVESTISSEMENT
          if (
            this.state.user.numberChats !== undefined
                        && this.state.user.numberChats !== null
          ) {
            const nbChats = this.state.user.numberChats.length;

            const d = new Date();
            const today = [d.getFullYear(), d.getMonth() + 1, d.getDate()];
            console.log(today);

            if (nbChats !== 0) {
              const lastChat = this.state.user.numberChats[
                this.state.user.numberChats.length - 1
              ];
              console.log(lastChat);

              const lastEval = [
                lastChat.split('T')[0].split('-')[0],
                lastChat.split('T')[0].split('-')[1],
                lastChat.split('T')[0].split('-')[2],
              ];
              console.log(lastEval);
              /*
            if (today[1] - lastEval[1] > 1 || today[0] - lastEval[0] > 1) {
              color='red'
            } else if (today[2] - lastEval[2] > 14) {
              color='orange'
            } else if (today[2] - lastEval[2] < 14) {
              color='green'
            }
*/
            }

            this.setState({
              user: res.data,
              color: `list-group-item ${color}`,
              score: scores,
              average:
                                (scores[0] + scores[1] + scores[2] + scores[3] + scores[4]) / 5,
            });
          }
        },
      );
    });
  }

  toDisplay(dateMongo) {
    const tab = dateMongo.split('T')[0].split('-');
    return `${tab[2]}/${tab[1]}/${tab[0]}`;
  }

  render() {
    let fidelity;
    let motivation;
    let lifestyle;
    let integration;
    let noOrientation;

    if (false) {
      motivation = true;
    } else {
      motivation = false;
    }

    if (
      this.state.user.numberChats !== undefined
            && this.state.user.numberChats.length !== 0
            && this.state.user.numberChats !== null
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
Fiche de l'élève :
          {this.state.user.pseudo}
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
                {this.state.score[0]}
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

            <li className={this.state.color}>
              <h5 className="card-title">
                {' '}
                                Utilisation et fidélité :
                {' '}
                {this.state.score[1]}
/10
              </h5>
              <p className="card-text">
                {' '}
                                Dernière session de chat :
                {' '}
                {fidelity
                  ? this.toDisplay(
                    this.state.user.numberChats[
                      this.state.user.numberChats.length - 1
                    ],
                  )
                  : 'Aucune session'}
                {' '}
              </p>
              <p className="card-text">
                {' '}
                                Nombre de sessions de chat :
                {' '}
                {fidelity ? this.state.user.numberChats.length : '0'}
                {' '}
              </p>
              <p className="card-text">
                {' '}
                                Nombre de réponses :
                {' '}
                {this.state.user.numberQuestion !== undefined
                  ? this.state.user.numberQuestion
                  : '0'}
                {' '}
              </p>
              <p className="card-text">
                {' '}
                                Date d'inscription :
                {' '}
                {this.state.firstLog}
                {' '}
              </p>
            </li>

            <li className="list-group-item">
              <h5 className="card-title">
                {' '}
Style de vie :
                {this.state.score[2]}
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
                {this.state.score[3]}
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
                                Pertinence de l'orientation :
                {' '}
                {this.state.score[4]}
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
          </ul>

          <div className="card-footer">
            <h4 className="card-title">
Score moyen :
              {this.state.average}
/10
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Begin;
