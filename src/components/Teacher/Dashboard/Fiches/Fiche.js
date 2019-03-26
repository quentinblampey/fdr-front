/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable prefer-template */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import axios from 'axios';
import { Collapse } from 'reactstrap';
import DatePicker from 'react-datepicker';
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'
// import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import FicheCourte from './FicheCourte';
import url from '../../../../config';
// import computeStats from './ComputeStats';
import SC from './ScoreChart';
import Engagement from './Detail/Engagement';

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
        { status: 'comment', displayStatus: 'Mes conseils' },
        { status: 'engagement', displayStatus: 'Engagements' },
        { status: 'reflexions', displayStatus: 'Reflexions' },
      ],
    };
    this.validate = this.validate.bind(this);
    this.updateTeacherComment = this.updateTeacherComment.bind(this);
  }

  componentDidMount() {
    this.load();
  }

    load = () => {
      axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
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

    updateTeacherComment = (id) => {
      axios
        .post(`${url}/api/engagements/comment/${id}/${this.state.user._id}`, {
          comment: document.getElementById(id).value,
        })
        .then(() => {
          this.load();
        });
    };

    validate = (id) => {
      axios.post(`${url}/api/engagements/validate/${id}/${this.state.user._id}`).then(() => {
        this.load();
      });
    };

    render() {
      const { user } = this.state;
      return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-sm-12 col-xl-8 text-center">
                        <h2>
                            {" Fiche de l'étudiant : "}
                            {user.details.name}
                            <p>
                                {user.aide && (
                                    <span className="badge badge-pill badge-danger">
                                        Cet étudiant a demandé de l'aide !
                                    </span>
                                )}
                                <br />
{' '}
{user.pseudo}
{' '}
                            </p>
                        </h2>
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
                    </div>
                    <div className="col-lg-4 col-sm-9 col-md-9 col-xl-4 offset-sm-3 offset-md-4 offset-lg-0 offset-xl-0 text-center">
                        {user.details.name !== 'undefined' && (
                            <FicheCourte user={user} help={user.help} fiche />
                        )}
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-6">
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
                                            <h5 className="container">
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
                                                    &nbsp;Mes conseils sur le contrat
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
                                    {['engagement'].includes(this.state.status) && (
                                        <div className="container">
                                            {this.state.user.engagements.map(engagement => (
                                                <div>
                                                    {engagement.contact
                                                        === 'Enseignant référent' && (
                                                        <div>
                                                            <Engagement
                                                              engagement={engagement}
                                                              ens
                                                              userId={this.state.user._id}
                                                              validate={this.validate}
                                                              updateTeacherComment={
                                                                    this.updateTeacherComment
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {['reflexions'].includes(this.state.status) && (
                                        <div className="container">
                                            {this.state.user.engagements.map(engagement => (
                                                <div>
                                                    {engagement.contact
                                                        !== 'Enseignant référent' && (
                                                        <Engagement
                                                          engagement={engagement}
                                                          ens={false}
                                                          userId={this.state.user._id}
                                                          validate={this.validate}
                                                          updateTeacherComment={
                                                                this.updateTeacherComment
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <br />
                            </div>
                        </div>
                        <br />
                    </div>
                    <div className=" col-6">
                        <Graph id={this.props.match.params.id} />
                        <br />
                        {user.helped && (
                            <Aide id={this.props.match.params.id} name={user.details.name} />
                        )}
                        <br />
                    </div>
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
      collapse: false,
    };
  }

  componentDidMount() {
    axios.get(`${url}/api/slots/rdvu/${this.props.id}`).then((resp) => {
      this.setState({ taken: resp.data });
    });
  }

    onChange = date => this.setState({ date });

    onCollapse = () => {
      const { collapse } = this.state;
      this.setState({ collapse: !collapse });
    };

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
      const { taken, collapse } = this.state;
      return (
            <div className="card">
                <div className="btn card-header" onClick={this.onCollapse}>
                    <h2>
                        Rendez-vous avec
{' '}
{this.props.name}
{' '}
&nbsp;
{collapse && (
                            <div>
                                <i className="fas fa-chevron-up" />
                            </div>
)}
                        {!collapse && (
                            <div>
                                <i className="fas fa-chevron-down" />
                            </div>
                        )}
                    </h2>
                </div>
                <Collapse isOpen={collapse}>
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
                </Collapse>
            </div>
      );
    }
}

class Graph extends Component {
  /* propTypes = {
      match: PropTypes.number.isRequired,
      params: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    }; */

  constructor(props) {
    super(props);
    // this.computeStats = this.computeStats.bind(this)
    this.state = {
      collapse: false,
    };
  }

    onCollapse = () => {
      const { collapse } = this.state;
      this.setState({ collapse: !collapse });
    };

    render() {
      const i = 0;
      const { collapse } = this.state;
      return (
            <div className="card">
                <div className="btn card-header" onClick={this.onCollapse}>
                    <h2>
                        Évolution des indicateurs
                        {collapse && (
                            <div>
                                <i className="fas fa-chevron-up" />
                            </div>
                        )}
                        {!collapse && (
                            <div>
                                <i className="fas fa-chevron-down" />
                            </div>
                        )}
                    </h2>
                </div>

                <Collapse isOpen={collapse}>
                    <SC id={this.props.id} />
                </Collapse>
            </div>
      );
    }
}

export default Begin;
