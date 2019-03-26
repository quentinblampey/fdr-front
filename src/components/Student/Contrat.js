import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import FooterStop from './Footer';
import url from '../../config';
import Onglets from './Onglets';
import liste from './Contrat/listeUE';
import './Accueil.scss';
import Switch from 'react-switch';

class Contrat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: { name: '', field: '' },
            comment: '',
            engagements: [
                {
                    date: '21 Mars',
                    student: "Je m'engage à aller en TD",
                    validation: true,
                    teacher: "Ok j'ai noté ton engagement",
                },
                {
                    date: '21 Juin',
                    student: "Je m'engage à aller en Amphi des fois",
                    validation: false,
                    teacher: 'Pas sur que ça soit suffisant..',
                },
            ],
            user: { ue: [] },
            status: 'choice',
            displayStatus: 'Mes UEs',
            dropdownDatas: [
                { status: 'choice', displayStatus: 'Mes UEs' },
                { status: 'feedback', displayStatus: 'Mes Feedbacks' },
                { status: 'comment', displayStatus: 'Mes Commentaires' },
                { status: 'engagement', displayStatus: 'Mes Engagements' },
                { status: 'reflexions', displayStatus: 'Mes Reflexions' },
            ],
            UEs: [],
            myComment: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.send = this.send.bind(this);
    }

    handleInputChange(event, event2) {
        const UEs = this.state.UEs;
        UEs[event].checked = event2;
        this.setState({
            UEs,
        });
    }

    componentDidMount() {
        axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
            const aux = [];
            liste.forEach((element) => {
                aux.push({
                    name: element,
                    checked: res.data.ue.filter(x => element === x.name).length > 0,
                });
            });
            this.setState({ user: res.data, UEs: aux });
            alert(
                "Note : notre parti-pris est que le Contrat n'est pas reglementaire, elle ne sert qu'à communiquer entre l'enseignant et l'étudiant sur sa réussite / ses difficultés / ses engagements concernant ses UEs.",
            );
        });
    }

    onChange = (e) => {
        const comment = e.target.value;
        this.setState({ comment });
    };

    onChangeMy = (e) => {
        const myComment = e.target.value;
        this.setState({ myComment });
    };

    send() {
        const { UEs } = this.state;
        axios.post(`${url}/api/contrats/${this.props.match.params.id}`, { UEs }).then(() => {
            axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
                UEs.forEach((element) => {
                    element.checked = res.data.ue.filter(x => element.name === x.name).length === 1;
                });
                this.setState({
                    user: res.data,
                    UEs,
                    status: 'feedback',
                    displayStatus: 'Mes Feedbacks',
                });
            });
        });
    }

    etat = (nextEtat, nextDisplayEtat) => {
        this.setState({ status: nextEtat, displayStatus: nextDisplayEtat });
        this.resetSelected();
    };

    options = (status, name) => {
        axios
            .post(`${url}/api/contrats/options/${this.props.match.params.id}`, { name, status })
            .then((res) => {
                this.setState({ user: res.data });
            });
    };

    modal = (name, field) => {
        let modal;
        if (this.state.modal.name === '') {
            modal = { name, field };
        } else {
            modal = { name: '', field: '' };
        }
        this.setState({ modal });
    };

    sendModal = () => {
        const comment = this.state.comment;
        const name = this.state.modal.name;
        const field = this.state.modal.field;
        axios
            .post(`${url}/api/contrats/modal/${this.props.match.params.id}`, {
                name,
                comment,
                field,
            })
            .then((res) => {
                this.setState({ user: res.data, comment: '' });
                this.modal(this.state.modal.name, this.state.modal.field);
            });
    };

    selectEngagement(engagement) {
        this.setState({ selectedEngagement: engagement });
    }

    resetSelected() {
        this.setState({ selectedEngagement: undefined });
    }

    save() {}

    render() {
        return (
            <div>
                <Onglets onglet="contrat" id={this.props.match.params.id} />

                <div className="component row justify-content-center" style={{ margin: '0px' }}>
                    <h3 className="titre-cadre">
                        CONTRAT
                        <div className="sstitre-cadre">DE RÉUSSITE</div>
                    </h3>
                    <div
                      className="row justify-content-center"
                      style={{ position: 'absolute', top: '140px' }}
                    >
                        {this.state.selectedEngagement && this.state.status === 'engagement' && (
                            <button
                              type="button"
                              className="btn btn-light"
                              onClick={this.resetSelected.bind(this)}
                            >
                                Retour
                            </button>
                        )}
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                {this.state.displayStatus}
                            </Dropdown.Toggle>

                            <Dropdown.Menu alignRight>
                                {this.state.dropdownDatas
                                    .filter(element => element.status !== this.state.status)
                                    .map(d => (
                                        <Dropdown.Item
                                          key={d.status}
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
                    </div>
                    {this.state.status === 'choice' && (
                        <div
                          style={{
                                position: 'absolute',
                                top: '190px',
                                bottom: '100px',
                                overflow: 'scroll',
                                overflowX: 'hidden',
                            }}
                        >
                            <form>
                                {this.state.UEs.map((ue, i) => (
                                    <div
                                      key={ue.name}
                                      style={{
                                            color: '#fefefe',
                                            margin: '10px',
                                            width: '100%-10px',
                                        }}
                                    >
                                        <div style={{ width: '100%' }}>
                                            <Switch
                                              style={{ margin: '30px' }}
                                              onChange={this.handleInputChange.bind(this, i)}
                                              checked={ue.checked}
                                              uncheckedIcon={false}
                                              checkedIcon={false}
                                              width={40}
                                              height={15}
                                              handleDiameter={20}
                                            />
                                            {` S${ue.name}`}
                                        </div>
                                    </div>
                                ))}
                            </form>
                            <button
                              className="help"
                              style={{ margin: '5px 0px', width: '100%' }}
                              onClick={this.send}
                            >
                                Valider
                            </button>
                        </div>
                    )}
                    {this.state.status === 'feedback'
                        && (this.state.user.ue.length > 0 ? (
                            <ul
                              className="list-group"
                              style={{
                                    width: '90%',
                                    position: 'absolute',
                                    top: '190px',
                                    bottom: '105px',
                                    overflow: 'scroll',
                                    overflowX: 'hidden',
                                    margin: '5px',
                                }}
                            >
                                {this.state.user.ue.map(ue => (
                                    <li
                                      key={ue.name}
                                      className={`row list-group-item-${ue.status}`}
                                      style={{
                                            minHeight: '45px',
                                            borderRadius: '10px',
                                            width: '100%',
                                            margin: '5px 0px',
                                            padding: '0px 0px 0px 10px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div>{ue.name}</div>
                                        <div className="dropdown">
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                  variant="light"
                                                  id="dropdown-basic"
                                                />

                                                <Dropdown.Menu alignRight>
                                                    <Dropdown.Header>Suivi de l'UE</Dropdown.Header>
                                                    <Dropdown.Item
                                                      onClick={this.options.bind(
                                                            this,
                                                            'warning',
                                                            ue.name,
                                                        )}
                                                    >
                                                        Signaler des difficulté
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      onClick={this.modal.bind(
                                                            this,
                                                            ue.name,
                                                            'comment',
                                                        )}
                                                    >
                                                        Commentaire
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      onClick={this.modal.bind(
                                                            this,
                                                            ue.name,
                                                            'missing',
                                                        )}
                                                    >
                                                        Absence à une évaluation
                                                    </Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Header>Fin de l'UE</Dropdown.Header>
                                                    <Dropdown.Item
                                                      onClick={this.options.bind(
                                                            this,
                                                            'success',
                                                            ue.name,
                                                        )}
                                                    >
                                                        Validé
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      onClick={this.options.bind(
                                                            this,
                                                            'danger',
                                                            ue.name,
                                                        )}
                                                    >
                                                        Non validé
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <Modal
                                              style={{ zIndex: 10 }}
                                              open={this.state.modal.name !== ''}
                                              onClose={this.modal.bind(
                                                    this,
                                                    this.state.modal.name,
                                                    this.state.modal.field,
                                                )}
                                              center
                                            >
                                                {this.state.modal.field === 'comment' ? (
                                                    <h2>Entre ton commentaire</h2>
                                                ) : (
                                                    <h2>Entre ton motif d'absence</h2>
                                                )}
                                                <textarea
                                                  className="form-control"
                                                  id="exampleFormControlTextarea1"
                                                  rows="2"
                                                  value={this.state.comment}
                                                  onChange={this.onChange}
                                                />
                                                <br />
                                                <button
                                                  type="submit"
                                                  className="modale"
                                                  onClick={this.sendModal}
                                                >
                                                    <p>ENVOYER</p>
                                                </button>
                                            </Modal>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div style={{ color: '#fefefe', margin: '10px 10px 10px 10px' }}>
                                Vous devez valider des choix d'UE pour pouvoir exprimer vos
                                feedbacks à sur ces UEs
                            </div>
                        ))}
                    {this.state.status === 'comment' && (
                        <div style={{ color: '#fefefe', margin: '50px 10px 10px 10px' }}>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              value={this.state.myComment}
                              onChange={this.onChangeMy}
                              placeholder="Ecrivez ici un commentaire sur votre contrat"
                              style={{ width: '95%', marginBottom: '10px' }}
                            />
                            &nbsp;
                            <button type="submit" className="modale" onClick={this.save.bind(this)}>
                                <p>ENREGISTRER</p>
                            </button>
                            <br />
                            {this.state.user.textContrat
                                ? this.state.user.textContrat
                                : "Votre enseignant n'a pas encore renseigné de commentaire concernant votre contrat"}
                            <br />
                            <br />
{' '}
Cette fonctionnalité est en cours de développement
                        </div>
                    )}
                    {this.state.status === 'engagement' && (
                        <div style={{ color: '#fefefe', margin: '10px', marginTop: '90px' }}>
                            {this.state.engagements.length === 0 ? (
                                "Vous n'avez pas encore d'engagements"
                            ) : !this.state.selectedEngagement ? (
                                this.state.engagements.map((engagement, i) => (
                                    <div key={engagement.date} className="row">
                                        <button
                                          type="button"
                                          style={{ width: '80%' }}
                                          className="btn btn-outline-light col self-align-center"
                                          onClick={this.selectEngagement.bind(this, engagement)}
                                        >
                                            {`Rendez-vous du ${engagement.date}`}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div style={{ marginTop: '30px' }}>
                                    <h5 style={{ marginBottom: '20px' }}>
                                        {`Rendez-vous du ${this.state.selectedEngagement.date}`}
                                    </h5>
                                    <div className="row">
                                        <div
                                          style={{
                                                width: '80%',
                                                textAlign: 'left',
                                                marginLeft: '20px',
                                            }}
                                        >
                                            {' Votre compte-rendu :'}
                                        </div>
                                        <button
                                          className="btn btn-outline-light"
                                          style={{
                                                width: '80%',
                                                textAlign: 'left',
                                                margin: '10px',
                                            }}
                                        >
                                            {this.state.selectedEngagement.student}
                                        </button>
                                    </div>
                                    <div className="row justify-content-end">
                                        <div
                                          style={{
                                                width: '80%',
                                                textAlign: 'left',
                                                marginLeft: '20px',
                                            }}
                                        >
                                            Réponse votre enseignant référent :
                                        </div>
                                        <button
                                          className="btn btn-outline-light"
                                          style={{
                                                width: '80%',
                                                textAlign: 'left',
                                                margin: '10px',
                                            }}
                                        >
                                            {this.state.selectedEngagement.teacher}
                                        </button>
                                    </div>
                                </div>
                            )}
                            {!this.state.selectedEngagement && (
                                <div className="row">
                                    <button
                                      type="button"
                                      style={{ width: '80%' }}
                                      className="btn btn-outline-light col self-align-center"
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {this.state.status === 'reflexions' && (
                        <div style={{ color: '#fefefe', margin: '50px 10px 10px 10px' }}>
                            Cette fonctionnalité est en cours de développement
                        </div>
                    )}
                </div>
                <FooterStop />
            </div>
        );
    }
}

export default Contrat;
