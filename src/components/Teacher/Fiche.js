/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable prefer-template */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'
// import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Dropdown from 'react-bootstrap/Dropdown';
import url from '../../config';
// import computeStats from './ComputeStats';
import SC from './ScoreChart';

import 'react-datepicker/dist/react-datepicker.css';

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
      user: { details: { name: 'undefined' }, ue: [] },
      textContrat: '',
      saved: true,
      status: 'choice',
      displayStatus: 'UEs choisies',
      dropdownDatas: [
        { status: 'choice', displayStatus: 'UEs choisies' },
        { status: 'comment', displayStatus: 'Commentaires' },
        { status: 'engagement', displayStatus: 'Engagements' },
        { status: 'reflexions', displayStatus: 'Reflexions' },
      ],
    };
  }

  componentDidMount() {
    // const { id } = this.props;
    // this.props.match.params.id
    // eslint-disable-next-line react/destructuring-assignment react/prop-types
    this.load();
  }

    load = () => {
      axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
        // console.log(res.data);
        // console.log(res.data.ue);
        this.setState({ user: res.data, textContrat: res.data.textContrat });
      });
    };

    onChange = (e) => {
      const textContrat = e.target.value;
      this.setState({ textContrat, saved: false });
    };

    save = () => {
      axios
        .post(`${url}/api/users/textContrat/${this.props.match.params.id}`, {
          textContrat: this.state.textContrat,
        })
        .then((res) => {
          // console.log(res.data);
          // console.log(res.data);
          this.setState({ user: res.data, saved: true });
        });
    };

    help = (id) => {
      axios.post(`${url}/api/users/help/${id}`).then(() => {
        this.load();
      });
    };

    etat = (nextEtat, nextDisplayEtat) => {
      this.setState({ status: nextEtat, displayStatus: nextDisplayEtat });
    };

    render() {
      const { user } = this.state;
      return (
            <div className="container">
                <h2 className="text-center">
                    {" Fiche de l'étudiant : "}
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
                <p>
                    {!user.helped && (
                        <div>
                            <ReactTooltip multiline />
                            <button
                              onClick={() => {
                                this.help(user._id);
                              }}
                              className="btn btn-success"
                              data-tip="Cliquez-ici pour pouvoir proposer<br />des rendez-vous à cet étudiant"
                            >
                                Proposer de l'aide à cet étudiant
                            </button>
                        </div>
                    )}
                </p>
                <div className="row">
                    <div className="col-6">
                        <Recap id={this.props.match.params.id} />
                        <div>
                            <div className="card">
                                <div className="card-header">
                                    <h2>Contrat pédagogique</h2>
                                </div>
                                <div>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                                            {this.state.displayStatus}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu alignRight>
                                            {this.state.dropdownDatas
                                              .filter(
                                                element => element.status !== this.state.status,
                                              )
                                              .map(d => (
                                                    <Dropdown.Item
                                                      onClick={this.etat.bind(
                                                        this,
                                                        d.status,
                                                        d.displayStatus,
                                                      )}
                                                    >
                                                        {d.displayStatus}
                                                    </Dropdown.Item>
                                              ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {this.state.status === 'choice'
                                        && (this.state.user.ue.length === 0 ? (
                                            <h5>
                                                Cet étudiant n'a pas encore signalé d'UEs. C'est la
                                                raison pour laquelle vous ne pouvez pas encore
                                                établir de contrat pédagogique.
                                            </h5>
                                        ) : (
                                            <ul
                                              className="list-group"
                                              style={{ width: '95%', margin: '10px' }}
                                            >
                                                {this.state.user.ue.map(ue => (
                                                    <div key={ue.name}>
                                                        <ReactTooltip multiline />
                                                        <li
                                                          data-tip={ue.message}
                                                          className={
                                                                'row list-group-item-' + ue.status
                                                            }
                                                          style={{
                                                            'border-radius': '10px',
                                                            width: '100%',
                                                            margin: '5px 0px',
                                                            padding: '0px 0px 0px 10px',
                                                            display: 'flex',
                                                            'flex-direction': 'row',
                                                            'justify-content': 'space-between',
                                                            'align-items': 'center',
                                                          }}
                                                        >
                                                            <div>
                                                                {ue.name}
                                                                {ue.dateValid !== '' && (
                                                                    <div>{ue.dateValid}</div>
                                                                )}
                                                            </div>
                                                        </li>
                                                    </div>
                                                ))}
                                            </ul>
                                        ))}
                                    {this.state.status === 'comment' && (
                                        <div className="container">
                                            <div className="row justify-content-between">
                                                <h5 className="col-9">
                                                    &nbsp;Commentaire sur le contrat
                                                </h5>
                                                <div className="col-3">
                                                    {this.state.saved && (
                                                        <h5 className="badge badge-pill badge-success">
                                                            Enregistré
                                                        </h5>
                                                    )}
                                                </div>
                                            </div>
                                            <textarea
                                              className="form-control"
                                              id="exampleFormControlTextarea1"
                                              value={this.state.textContrat}
                                              onChange={this.onChange}
                                            />
                                            &nbsp;
                                            <button
                                              type="submit"
                                              className="modale"
                                              onClick={this.save.bind(this)}
                                            >
                                                <p>ENREGISTRER</p>
                                            </button>
                                        </div>
                                    )}
                                    {['reflexions', 'engagement'].includes(this.state.status) && (
                                        <div className="container">
                                            Cette fonctionnalité est en cours de développement
                                        </div>
                                    )}
                                </div>
                                <br />
                            </div>
                        </div>
                        <br />
                    </div>
                    <div className=" col-6">
                        <div className="card">
                            <div className="card-header">
                                <h2>Evolution des indicateurs</h2>
                            </div>
                            <SC id={this.props.match.params.id} />
                        </div>
                        <br />
                        {user.helped && (
                            <div className="card">
                                <div className="card-header">
                                    <h2>Gestion des rendez-vous</h2>
                                </div>
                                <Aide id={this.props.match.params.id} />
                            </div>
                        )}
                        <br />
                    </div>
                </div>
            </div>
      );
    }
}

// Liste et affichage des scores
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
    axios.get(`${url}/api/users/getid/${this.props.id}`).then((res) => {
      this.setState({ user: res.data }, () => {
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

          const tab = user.registration.split('T')[0].split('-');
          const reg = `${tab[2]}/${tab[1]}/${tab[0]}`;
          let last = ' Aucune session';
          if (
            user.numberChats !== undefined
                        && user.numberChats.length !== 0
                        && user.numberChats !== null
          ) {
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
    /* let motivation;
    let lifestyle;
    let integration;
    let noOrientation; */
    let fidelity = false;
    const {
      user, score, firstLog, average, lastChat,
    } = this.state;
    if (user.numberChats !== undefined && user.numberChats !== null) {
      fidelity = true;
    }

    return (
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
{parseFloat(score.motivation).toFixed(0)}
                            /10
                        </h5>
                    </li>

                    <li className="list-group-item">
                        <h5 className="card-title">
                            {' '}
                            Utilisation et fidélité :
{' '}
{parseFloat(score.fidelity).toFixed(0)}
                            /10
                        </h5>
                        <p className="card-text">
{' '}
Dernière session de discussion avec le chatbot :
{lastChat}
{' '}

                        </p>
                        <p className="card-text">
                            {' '}
                            Nombre de sessions de discussion avec le chatbot :
{' '}
{fidelity
  ? user.numberChats.length
  : '0'}
{' '}
                        </p>
                        <p className="card-text">
{' '}
Nombre de réponses :
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
{parseFloat(score.lifestyle).toFixed(0)}
                            /10
                        </h5>
                    </li>

                    <li className="list-group-item">
                        <h5 className="card-title">
                            {' '}
                            Intégration :
{' '}
{parseFloat(score.integration).toFixed(0)}
                            /10
                        </h5>
                    </li>

                    <li className="list-group-item">
                        <h5 className="card-title">
                            Pertinence de l&apos;orientation :
{' '}
                            {parseFloat(score.noOrientation).toFixed(0)}
                            /10
                        </h5>
                    </li>
                </ul>

                <div className="card-footer">
                    <h4 className="card-title">
                        Score moyen :
{' '}
{parseFloat(average).toFixed(0)}
                        /10
                    </h4>
                </div>
            </div>
    );
  }
}

// Gestion des demandes d'aide
class Aide extends Component {
  /* propTypes = {
      match: PropTypes.number.isRequired,
      params: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    }; */

  constructor(props) {
    super(props);
    // this.computeStats = this.computeStats.bind(this)
    this.state = {
      date: new Date(),
      taken: [],
    };
  }

  componentDidMount() {
    axios.get(`${url}/api/slots/rdvu/${this.props.id}`).then((resp) => {
      this.setState({ taken: resp.data });
    });
  }

    onChange = date => this.setState({ date });

    proposeRdv = () => {
      const { date } = this.state;
      let minutes = date.getMinutes();
      let mois = String(date.getMonth() + 1);
      if (minutes === 0) {
        minutes = String('00');
      }
      if (mois.length === 1) {
        mois = '0' + mois;
      }
      const horaire = `${date.getDate()}/${mois}/${date.getFullYear()} à ${date.getHours()}h${minutes}`;
      axios.post(`${url}/api/slots/newrdv/${this.props.id}`, { horr: horaire }).then(() => {
        axios.get(`${url}/api/slots/rdvu/${this.props.id}`).then((resp) => {
          this.setState({ taken: resp.data });
        });
      });
    };

    render() {
      let i = 0;
      const { taken } = this.state;
      return (
            <div className="container">
                <br />
                <h2>Proposer un rendez-vous</h2>
                <br />
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="d/MM/yyyy, h:mm aa"
                  timeCaption="time"
                  placeholderText="Choisir l'horaire"
                />
{' '}
                <button type="button" className="btn btn-success" onClick={this.proposeRdv}>
                    Proposer l'horaire
                </button>
                <br />
                <br />
                <h2>Horaires déjà proposés : </h2>
                {taken.map((horaire) => {
                  i += 1;
                  return (
                        <div key={i}>
                            {horaire.date}
                            <br />
                        </div>
                  );
                })}
                <br />
            </div>
      );
    }
}

export default Begin;
