/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import {ToastsContainer, ToastsStore} from 'react-toasts';
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
    this.onOpenModal2 = this.onOpenModal2.bind(this);
    this.onCloseModal2 = this.onCloseModal2.bind(this);
    this.state = {
      user: '',
      rdvs: [],
      message: '',
      open1: false,
      open2: false,
      open3: false,
      current: '',
      passed: [],
    };
  }

  componentDidMount() {
    axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
      this.setState({ user: res.data });
      axios.get(`${url}/api/slots/getfree`).then((res2) => {
        this.setState({ rdvs: res2.data });
        axios.get(`${url}/api/users/current/${this.props.match.params.id}`).then((curRDV) => {
          this.setState({ current: curRDV.data });
          axios
            .get(`${url}/api/users/passed-slots/${this.props.match.params.id}`)
            .then((passRDV) => {
              this.setState({ passed: passRDV.data });
            });
        });
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

    onOpenModal3 = () => {
      this.setState({ open3: true });
    };

    onCloseModal3 = () => {
      this.setState({ open3: false });
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
        ToastsStore.info("Demande d'aide envoyée");
      });
    };

    render() {
      const {
        user, open1, message, rdvs, current, passed,
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
                                    Ici, tu peux contacter ton enseignant référent si tu as besoin de
                                    conseils ou de soutient. Tu peux aussi lui joindre un message.
                                    Si tu ne veux pas en ajouter, clique juste sur
                                    "Envoyer".
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
              <div>
                <button type="submit" className="help" disabled>
                  <p>Demande d'aide envoyée</p>
                </button>
                <br />
              </div>
            )}
            { user.helped ? (<p style={{color: '#fefefe'}}> Votre professeur veut un rendez-vous !</p>) : (<p style={{color: '#fefefe'}}>Votre professeur n'a pas encore cherché à vous reçevoir</p>)}
            <div className="container">
              {(rdvs.length !== 0 && user.helped) && (
                <div>
                  <button type="submit" className="help" onClick={this.onOpenModal2}>
                    <p>CRÉNEAUX DISPONIBLES</p>
                  </button>
                  <ModalRDV
                    open={this.state.open2}
                    closeModal={this.onCloseModal2}
                    openModal={this.onOpenModal2}
                    rdvs={this.state.rdvs}
                    id={this.props.match.params.id}
                    user={this.state.user}
                  />
                </div>
              )}
            </div>
            <br />
            <div className="container">
              {(!(this.state.user.currentSlot === "")) && (
                <div>
                  <button type="submit" className="help" onClick={this.onOpenModal3}>
                    <p>MON RENDEZ-VOUS</p>
                  </button>
                  <ModalMesRDV
                    open={this.state.open3}
                    closeModal={this.onCloseModal3}
                    openModal={this.onOpenModal3}
                    current={this.state.current}
                    user = {this.state.user}
                    id={this.props.match.params.id}
                  />
                </div>
              )}
            </div>
          </div>
          <FooterStop />
        </div>
      );
    }
}

class ModalRDV extends Component {
  constructor(props) {
    super(props);
    this.state = {
        slots : [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

    acceptRDV = (e) => {
      console.log(e.target.value);
      if (e.target.value !== undefined) {
        axios
          .post(`${url}/api/users/chosen-slots/${this.props.id}`, {
            chosenSlot: e.target.value,
          })
          .then((res) => {
            console.log('sucess !');
            super.setState({ rdvs: [] });
          });
      }
    };

    componentDidMount() {
      axios.get(`${url}/api/slots`).then((slots) => {
        let ins = [];
        console.log(slots);
        slots.data.forEach((slot) => { ins.push({id: slot._id, date: slot.date,checked:(this.props.user.chosenSlots.indexOf(slot._id) > -1)})})
        this.setState({ slots: ins})
        console.log(ins);
      })
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const i = target.name;
      let slots = this.state.slots;
      console.log(slots)
      slots[i].checked = value;
      this.setState({
        slots,
      });
    }

    send = () => {
      let toSend = []
      this.state.slots.forEach(slot => { if (slot.checked) { toSend.push(slot.id) }});
      axios.post(`${url}/api/users/chosen-slots/${this.props.user._id}`, { chosenSlots: toSend });
      this.props.closeModal();
    }

    render() {
      return (
        <Modal open={this.props.open} onClose={this.props.closeModal} center>
          <h2>Demander un créneau de rendez-vous</h2>
          <p>
                    Ici, tu peux voir les créneaux qu'a proposé ton enseignant référent et en
                    demander plusieurs. Un de ceux que tu as demandé te sera attribué en fonction
                    des disponibilités.
          </p>
          <br />
          <form>
                            {this.state.slots.map((slot,i) => (
                                <div>
                                    <label>
                                        <input
                                        name={i}
                                        type="checkbox"
                                        checked={slot.checked}
                                        onChange={this.handleInputChange}
                                    />
                                        {slot.date}
                                    </label>
                                </div>
                            ))}
                        </form>
                        <button className="modale" onClick={this.send}>Valider</button>
          <br />
          <br />
          <br />
          <br />
          <br />
        </Modal>
      );
    }
}

class ModalMesRDV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: 'Aucun rendez-vous',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      axios.get(`${url}/api/slots/${this.props.user.currentSlot}`).then((slot) => {
        this.setState({ date: slot.data.date});
      })
    }
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.closeModal} center>
        <br />
        <h2>Mes Rendez-vous</h2>
        <p>Ici, tu peux voir ton prochain créneau de rendez-vous :</p>
        { this.props.user.currentSlot !== "" && (<p>{this.state.date}</p>)}
        <br />
        <button type="submit" className="modale" onClick={this.props.closeModal}>
          <p>FERMER</p>
        </button>
        <br />
      </Modal>
    );
  }
}

export default Exit;
