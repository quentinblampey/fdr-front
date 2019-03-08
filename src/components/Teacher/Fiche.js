/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
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
      user: { details: { name: 'undefined' } },
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
      // console.log(res.data);
      this.setState({ user: res.data }, () => {
        // console.log('user', this.state.user);
        const { user } = this.state;
        const scores = user.score;

        /*
        let color = '';
        if (scores.fidelity > 7) {
          color = 'green';
        } else if (scores.fidelity < 4) {
          color = 'red';
        } else {
          color = 'orange';
        }
        */

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
            // color: `list-group-item ${color}`,
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
    /* let motivation;
    let lifestyle;
    let integration;
    let noOrientation; */
    const {
      user, score, firstLog, average, lastChat,
    } = this.state;

    return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <Recap />
                    </div>
                    <div className="card col-6">
                        <SC id={this.props.match.params.id} />
                    </div>
                </div>
                <h2 className="text-center">
                    {" Fiche de l'élève : "}
                    {user.details.name}
                    {user.aide && (
                        <p>
                            <span className="badge badge-pill badge-danger">
                                Cet étudiant a demandé de l'aide !
                            </span>
                        </p>
                    )}
                </h2>
                <p>
{' '}
{user.pseudo}
{' '}
                </p>
                <div className="card bg-light mb-3">
                    <div className="card-header">
                        <h2>Informations personnelles</h2>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <h5 className="card-title">
                                {' '}
                                Motivation générale :
{' '}
{parseFloat(score.motivation).toFixed(2)}
                                /10
                            </h5>
                        </li>

                        <li className="list-group-item">
                            <h5 className="card-title">
                                {' '}
                                Utilisation et fidélité :
{' '}
{parseFloat(score.fidelity).toFixed(2)}
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
{' '}
{parseFloat(score.lifestyle).toFixed(2)}
                                /10
                            </h5>
                        </li>

                        <li className="list-group-item">
                            <h5 className="card-title">
                                {' '}
                                Intégration :
{' '}
{parseFloat(score.integration).toFixed(2)}
                                /10
                            </h5>
                        </li>

                        <li className="list-group-item">
                            <h5 className="card-title">
                                Pertinence de l&apos;orientation :
{' '}
                                {parseFloat(score.noOrientation).toFixed(2)}
                                /10
                            </h5>
                        </li>

                        <li className="list-group-item">
                            <SC id={this.props.match.params.id} />
                        </li>
                    </ul>

                    <div className="card-footer">
                        <h4 className="card-title">
                            Score moyen :
{' '}
{parseFloat(average).toFixed(2)}
                            /10
                        </h4>
                    </div>
                </div>
            </div>
    );
  }
}

class Recap extends Component {
  /* propTypes = {
      match: PropTypes.number.isRequired,
      params: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    }; */
  constructor(props) {
    super(props);
    // this.computeStats = this.computeStats.bind(this)
    this.state = {
      user: { details: { name: 'undefined' } },
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
      // console.log(res.data);
      this.setState({ user: res.data }, () => {
        // console.log('user', this.state.user);
        const { user } = this.state;
        const scores = user.score;

        /*
        let color = '';
        if (scores.fidelity > 7) {
          color = 'green';
        } else if (scores.fidelity < 4) {
          color = 'red';
        } else {
          color = 'orange';
        }
        */

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
            // color: `list-group-item ${color}`,
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
    /* let motivation;
    let lifestyle;
    let integration;
    let noOrientation; */
    const {
      user, score, firstLog, average, lastChat,
    } = this.state;

    return (
            <div className="container">
                <div className="card bg-light mb-3">
                    <div className="card-header">
                        <h2>Informations personnelles</h2>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <h5 className="card-title">
                                {' '}
                                Motivation générale :
{' '}
{parseFloat(score.motivation).toFixed(2)}
                                /10
                            </h5>
                        </li>

                        <li className="list-group-item">
                            <h5 className="card-title">
                                {' '}
                                Utilisation et fidélité :
{' '}
{parseFloat(score.fidelity).toFixed(2)}
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
{' '}
{parseFloat(score.lifestyle).toFixed(2)}
                                /10
                            </h5>
                        </li>

                        <li className="list-group-item">
                            <h5 className="card-title">
                                {' '}
                                Intégration :
{' '}
{parseFloat(score.integration).toFixed(2)}
                                /10
                            </h5>
                        </li>

                        <li className="list-group-item">
                            <h5 className="card-title">
                                Pertinence de l&apos;orientation :
{' '}
                                {parseFloat(score.noOrientation).toFixed(2)}
                                /10
                            </h5>
                        </li>
                    </ul>

                    <div className="card-footer">
                        <h4 className="card-title">
                            Score moyen :
{' '}
{parseFloat(average).toFixed(2)}
                            /10
                        </h4>
                    </div>
                </div>
            </div>
    );
  }
}

export default Begin;
