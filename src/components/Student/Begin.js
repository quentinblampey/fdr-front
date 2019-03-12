/* eslint-disable arrow-parens */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import FooterStop from './FooterStop';
import url from '../../config';
import './Begin.scss';

class Begin extends Component {
    constructor(props) {
        super(props);
        // this.demAide = this.demAide.bind(this);
        this.state = {
            user: '',
            rdvs: [],
            open1: false,
            open2: false,
            message: '',
        };
    }

    componentDidMount() {
        axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then(res => {
            this.setState({ user: res.data });
            axios.get(`${url}/api/rdv/${this.props.match.params.id}`).then(res2 => {
                this.setState({ rdvs: res2.data });
            });
        });
    }

    onOpenModal1 = () => {
        this.setState({ open1: true });
    };

    onCloseModal1 = () => {
        this.setState({ open1: false });
    };

    onOpenModal2 = () => {
        this.setState({ open2: true });
    };

    onCloseModal2 = () => {
        this.setState({ open2: false });
    };

    onChange = e => {
        const message = e.target.value;
        this.setState({ message });
    };

    demAide = () => {
        const { user, message } = this.state;
        axios.post(`${url}/api/users/aide/${user._id}/2`, { message }).then(res => {
            this.setState({ user: res.data });
            this.onCloseModal1();
        });
    };

    render() {
        const {
 user, open1, open2, message, rdvs,
} = this.state;
        let i = 0;
        return (
            <div>
                <div className="component">
                    <div className="shape">
                        <div className="left">
                            <div />
                        </div>
                        <Link to={`/chat/${this.props.match.params.id}`}>
                            <button type="submit" className="content">
                                <p>
                                    <span>“ </span>
                                    MON COACH CHATBOT
                                    <span> ”</span>
                                </p>
                            </button>
                        </Link>
                    </div>
                    <Link to={`/chat/${this.props.match.params.id}`}>
                        <button type="submit" className="help">
                            <p>LANCER LE CHAT</p>
                        </button>
                    </Link>
                    <br />
                    {user.aide ? (
                        <div className="container">
                            <button type="submit" className="help" onClick={this.onOpenModal2}>
                                <p>
                                    CRENEAUX PROPOSES
{' '}
                                    {rdvs.length > 0 && (
                                        <span className="badge badge-pill badge-light">
                                            {'  '}
                                            {rdvs.length}
{' '}
                                        </span>
                                    )}
                                </p>
                            </button>
                            <br />
                            <Modal open={open2} onClose={this.onCloseModal2} center>
                                <h2>Créneaux proposés: </h2>
                                <p className="container backg">
                                    Tu peux maintenant voir si ton enseignant référend t'a proposé
                                    des créneaux de rendez-vous.
                                </p>

                                {rdvs.length === 0 ? (
                                    <p>Pas de Créneaux proposés</p>
                                ) : (
                                    rdvs.map(horaire => {
                                        i += 1;
                                        return (
                                            <div key={i}>
                                                {horaire}
{' '}
                                                <button type="submit" className="modale">
                                                    <i className="fas fa-check" />
                                                </button>
                                                <br />
                                            </div>
                                        );
                                    })
                                )}
                                <p>
                                    La fonctionnalité "accepter le RDV" n'a pas encore été
                                    implémentée.
                                </p>
                            </Modal>
                        </div>
                    ) : (
                        <div className="container">
                            <button type="submit" className="help" onClick={this.onOpenModal1}>
                                <p>DEMANDER DE L'AIDE</p>
                            </button>
                            <br />
                            <Modal open={open1} onClose={this.onCloseModal1} center>
                                <h2>Demander de l'aide</h2>
                                <p>
                                    Ici, tu peux contacter ton enseignant référendsi tu as besoin de
                                    conseils ou de soutient. Tu peux aussi lui joindre un message.
                                    Si tu ne veux pas en ajouter, clique juste sur "Envoyer".
                                </p>

                                <textarea
                                  className="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows="2"
                                  value={message}
                                  onChange={this.onChange}
                                />
                                <br />

                                <button type="submit" className="modale" onClick={this.demAide}>
                                    <p>ENVOYER</p>
                                </button>
                            </Modal>
                        </div>
                    )}
                </div>
                <FooterStop />
            </div>
        );
    }
}

export default Begin;
