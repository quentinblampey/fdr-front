import React, { Component } from 'react';
import './Begin.scss';
import axios from 'axios';

import Modal from 'react-responsive-modal';
import FooterStop from './FooterStop';
import Test from './test';
import url from '../../config';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'

class Exit extends Component {
  constructor(props) {
    super(props);
    // this.demAide = this.demAide.bind(this);
    this.state = {
      user: '',
      rdvs: [],
      message: '',
      open1: false,
    };
  }

  componentDidMount() {
    axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
      this.setState({ user: res.data });
      axios.get(`${url}/api/slots/getfree`).then((res2) => {
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

    render() {
      const {
        user, open1, message, rdvs,
      } = this.state;
      return (
        <div>
          <Test onglet="aide" id={this.props.match.params.id} />
          <div className="component">
            <h3 className="titre-cadre"> DEMANDE D'AIDE </h3>
            <div className="container">
              <button type="submit" className="help" onClick={this.onOpenModal1}>
                <p>DEMANDER DE L'AIDE</p>
              </button>
              <br />
              <Modal open={open1} onClose={this.onCloseModal1} center>
                <h2>Demander de l'aide</h2>
                <p>
                                Ici, tu peux contacter ton enseignant référendsi tu as besoin de
                                conseils ou de soutient. Tu peux aussi lui joindre un message. Si tu
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
              <h2>Créneaux proposés: </h2>
              <p>
                            Tu peux maintenant voir si ton enseignant référend t'a proposé des
                            créneaux de rendez-vous.
              </p>

              <p>La fonctionnalité "accepter le RDV" n'a pas encore été implémentée.</p>
            </div>
          </div>
          <FooterStop />
        </div>
      );
    }
}

export default Exit;
