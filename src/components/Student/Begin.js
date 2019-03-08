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
      open: false,
      message: '',
    };
  }

  componentDidMount() {
    axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
      this.setState({ user: res.data });
    });
  }

    onOpenModal = () => {
      this.setState({ open: true });
    };

    onCloseModal = () => {
      this.setState({ open: false });
    };

    onChange = (e) => {
      const message = e.target.value;
      this.setState({ message });
    };

    demAide = () => {
      const { user, message } = this.state;
      console.log(message);
      console.log(user._id);
      axios.post(`${url}/api/users/aide/${user._id}/2`, { message }).then((res) => {
        this.setState({ user: res.data });
        this.onCloseModal();
      });
    };

    render() {
      const { user, open, message } = this.state;
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
                    {user.aide >= 2 ? (
                        <button type="submit" className="help" disabled>
                            <p>DEMANDE D'AIDE ENVOYEE!</p>
                        </button>
                    ) : (
                        <div>
                            <button type="submit" className="help" onClick={this.onOpenModal}>
                                <p>DEMANDER DE L'AIDE</p>
                            </button>
                            <Modal open={open} onClose={this.onCloseModal} center>
                                <h2>Demander de l'aide</h2>
                                <p>
                                    Tu peux joindre un message pour ton enseignant référend. Si tu
                                    ne veux pas en ajouter, clique juste sur "Envoyer".
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
                    <br />
                    <p className="container backg">
                        Tu peux contacter ton enseignant référend grâce à ce bouton. Si tu as besoin
                        de conseils ou de soutien, tu peux le solliciter ici!
                    </p>
                </div>
                <FooterStop />
            </div>
      );
    }
}

export default Begin;
