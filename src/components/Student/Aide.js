/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { ToastsStore } from 'react-toasts';
import './Begin.scss';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import FooterStop from './FooterStop';
import Test from './test';
import url from '../../config';
import Switch from "react-switch";
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
      open4: false,
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

    onOpenModal4 = () => {
      this.setState({ open4: true });
    };

    onCloseModal4 = () => {
      this.setState({ open4: false });
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
      const { user, open1, message } = this.state;
      return (
        <div>
          <Test onglet="aide" id={this.props.match.params.id} />
          <div className="component">
            <h3 className="titre-cadre"> DEMANDE D&apos;AIDE </h3>
            <div style={{ position: 'absolute', top: '180px', display: 'flex', flexDirection: 'column', alignItems:'center'}} >
            {!user.aide && (
              <div className="container">
              <button type="submit" className="help" onClick={this.onOpenModal1}>
                <p>DEMANDER DE L&apos;AIDE</p>
              </button>
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

                <button type="submit" className="modale" onClick={this.demAide}>
                  <p>ENVOYER</p>
                </button>
              </Modal>
            </div>
            )}
            { (user.aide && !user.currentSlot) && (
              <div style={{margin:'auto'}} >
                <button type="submit" className="help" disabled>
                  <p>Demande d'aide envoyée</p>
                </button>
                <br />
              </div>
            )}
            { (user.helped && !(user.currentSlot)) && (
              <div style={{ color: '#fefefe' }} className="container">
                Votre professeur veut un rendez-vous !
                <br />
                <br />
                <button type="submit" className="help" onClick={this.onOpenModal4}>
                  <p>PRISE DE RDV DIRECTE</p>
                </button>
                <ModalRDVEnseignant
                    open={this.state.open4}
                    closeModal={this.onCloseModal4}
                    openModal={this.onOpenModal4}
                    id={this.props.match.params.id}
                  />
                  <div>
                  <button type="submit" className="help" onClick={this.onOpenModal2}>
                    <p>CHOIX DE CRÉNEAUX</p>
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
              </div>
            )}

            { (!user.helped) && (
              <p style={{ color: '#fefefe', margin:'10px 0px'}} className="container text-center">
                Votre professeur n'a pas encore cherché à vous recevoir. Vous ne pouvez donc pas encore choisir de créneau de rendez-vous.
              </p>
            )}
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
                    user={this.state.user}
                    id={this.props.match.params.id}
                  />
                </div>
              )}
            </div>
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
      if (e.target.value !== undefined) {
        axios
          .post(`${url}/api/users/chosen-slots/${this.props.id}`, {
            chosenSlot: e.target.value,
          })
          .then((res) => {
            super.setState({ rdvs: [] });
          });
      }
    };

    componentDidMount() {
      axios.get(`${url}/api/slots/getfree`).then((slots) => {
        let ins = [];
        slots.data.forEach((slot) => { ins.push({id: slot._id, date: slot.date,checked:(this.props.user.chosenSlots.indexOf(slot._id) > -1)})})
        this.setState({ slots: ins})
      })
    }

    handleInputChange(event, event2) {
      let slots = this.state.slots;
      slots[event].checked = event2;
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
          { this.state.slots.length === 0 && <p> Aucun créenau proposé.</p>}
          <br />
          <form>
                            {this.state.slots.map((slot,i) => (
                                <div key={i}>
                                    <Switch style={{margin:'30px'}} onChange={this.handleInputChange.bind(this, i)} checked={slot.checked} uncheckedIcon={false} checkedIcon={false} width={40} height={15} offHandleColor={'#cdcdcd'} onHandleColor={'#cdcdcd'} handleDiameter={20}/>
                                    <label style={{padding: '10px'}} >
                                        {' '+slot.date}{ slot.date[slot.date.length -2] === 'h' && '0'}
                                    </label>
                                </div>
                            ))}
                        </form>
                        <button className="modale" onClick={this.send}>Valider</button>
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
      if (this.props.user.currentSlot !== "") {
        axios.get(`${url}/api/slots/${this.props.user.currentSlot}`).then((slot) => {
          this.setState({ date: slot.data.date});
        })
      }
    }
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.closeModal} center>
        <br />
        <h2>Mes Rendez-vous</h2>
        <p>Ici, tu peux voir ton prochain créneau de rendez-vous :</p>
        <p>
          {this.state.date}
          { this.state.date[this.state.date.length -2] === 'h' && '0'}
        </p>
        <br />
        <button type="submit" className="modale" onClick={this.props.closeModal}>
          <p>FERMER</p>
        </button>
        <br />
      </Modal>
    );
  }
}

class ModalRDVEnseignant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposed: [],
    };
  }

  componentDidMount() {
    this.update();
  }

  update = () => {
    axios.get(`${url}/api/slots/rdvu/${this.props.id}`).then((resp) => {
      this.setState({ proposed: resp.data });
    });
  }

  onAccept = (id) => {
    console.log(id);
    axios.put(`${url}/api/slots/rdvOK/${this.props.id}`, { idRDV: id }).then((resp) => {
      this.setState({ proposed: [resp.data] });
      this.update();
      ToastsStore.info("L'enseignant a été prévenu par mail !");
      ToastsStore.info("Tu a été prévenu par mail et tu peux \n télécharger le RDV dans ton calendrier!");
    });
  }

  render() {
    const { proposed } = this.state;
    return (
      <Modal open={this.props.open} onClose={this.props.closeModal} center>
        <br />
        <h2>Horaires proposés par ton enseignant</h2>
        <p>
          Suite à ta demande d'aide, ton enseignant t'a proposé un (des) rendez-vous(s).
          Tu peux choisir celui qui t'arrange le plus et l'accepter.
        </p>
        { proposed.length === 0 && (
          <p>Tu n'as pas encore reçu de propositions de rendez-vous de la part de ton enseignant référent.</p>
        )}
        { !(proposed.length === 1 && proposed[0].affectation !== '') && proposed.map(slot => (
          <div key={slot._id}>
            {slot.date}
            {' '}
            <button type="submit" className="modale" onClick={() => this.onAccept(slot._id)}>
              <p>Ok</p>
            </button>
          </div>
        ))}
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
