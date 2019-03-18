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

    onChange = (e) => {
      const message = e.target.value;
      this.setState({ message });
    };

    demAide = () => {
      const { user, message } = this.state;
      axios.post(`${url}/api/users/aide/${user._id}/2`, { message }).then((res) => {
        this.setState({ user: res.data });
        this.onCloseModal1();
      });
    };

    render() {
      const {
        user, open1, message, rdvs,
      } = this.state;
      return (
        <div>
          <Test onglet="aide" id={this.props.match.params.id} />
          <div className="component">
            <h3 className="titre-cadre"> DEMANDE D&apos;AIDE </h3>
            {!user.aide ? (
              <div className="container">
                <button type="submit" className="help" onClick={this.onOpenModal1}>
                  <p>DEMANDER DE L&apos;AIDE</p>
                </button>
                <br />
                <Modal open={open1} onClose={this.onCloseModal1} center>
                  <h2>Demander de l&apos;aide</h2>
                  <p>
                                    Ici, tu peux contacter ton enseignant référendsi tu as besoin de
                                    conseils ou de soutient. Tu peux aussi lui joindre un message.
                                    Si tu ne veux pas en ajouter, clique juste sur
                                    &bdquo;Envoyer&bdquo;.
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
            ) : (
              <div className="container">
                <button type="submit" className="help" disabled>
                  <p>DEMANDE D&apos;AIDE ENVOYÉE</p>
                </button>
                <br />
              </div>
            )}

            <div className="container">
              <button type="submit" className="help" disabled>
                <p>CRENEAUX PROPOSÉS </p>
              </button>
              <br />
              <h2>Créneaux proposés: </h2>
              {rdvs.length !== 0 && (
                <div>
                  {rdvs.map(rdv => (
                    <div key={rdv._id}>{rdv.date}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <FooterStop />
        </div>
      );
    }
}

export default Exit;
