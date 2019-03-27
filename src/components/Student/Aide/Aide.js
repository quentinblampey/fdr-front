import React, { Component } from 'react';
import { ToastsStore } from 'react-toasts';
import '../AccueilChat/Accueil.scss';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import FooterStop from '../Footer';
import Onglets from '../Onglets';
import url from '../../../config';
import Switch from "react-switch";
import colors from '../../../globalSCSS/color.scss';

/*
Main help component, rendered in the router.
*/
class Aide extends Component {
  constructor(props) {
    super(props);
    this.onOpenModal2 = this.onOpenModal2.bind(this);
    this.onCloseModal2 = this.onCloseModal2.bind(this);
    this.state = {
      user: '', // Stores the user
      rdvs: [], // Table of the RDVs proposed by the teacher, if any.
      message: '', // The message joined by the student to his help request.
      // If the modals 1, 2, 3 or 4 is opened or not.
      open1: false, 
      open2: false,
      open3: false,
      open4: false,
    };
  }

  // Calls the reload method on page loading.
  componentDidMount() {
    this.update();
  }

  // Get the specified user, saves it into the state, and then gets the RDVs the teacher proposed to him.
  update = () => {
    axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
      this.setState({ user: res.data });
      axios.get(`${url}/api/slots/getfree`).then((res2) => {
        this.setState({ rdvs: res2.data });
      });
    });
  }; 

  // Handles the modal opening
    onOpenModal1 = () => {
      this.setState({ open1: true });
    };

  // Handles the modal closing
    onCloseModal1 = () => {
      this.setState({ open1: false });
    };

  // Handles the modal opening  
    onOpenModal2 = () => {
      this.setState({ open2: true });
    };

  // Handles the modal closing
    onCloseModal2 = () => {
      this.setState({ open2: false });
    };

  // Handles the modal opening
    onOpenModal3 = () => {
      this.setState({ open3: true });
    };

  // Handles the modal closing
    onCloseModal3 = () => {
      this.setState({ open3: false });
    };

  // Handles the modal opening
    onOpenModal4 = () => {
      this.setState({ open4: true });
    };

  // Handles the modal closing
    onCloseModal4 = () => {
      this.setState({ open4: false });
    };

  // Handles the change of the message.
    onChange = (e) => {
      const message = e.target.value;
      this.setState({ message });
    };
  
  // Called when a user send his help request.
    demAide = () => {
      const { user, message } = this.state;
      axios.post(`${url}/api/users/aide/${user._id}/2`, { message }).then((res) => {
        this.setState({ user: res.data });
        // Closes the component of the help request.
        this.onCloseModal1();
        ToastsStore.info("Demande d'aide envoyée");
      });
    };

    render() {
      const { user, open1, message } = this.state;
      return (
        <div>
          <Onglets onglet="aide" id={this.props.match.params.id} />
          <div className="component">
            <h3 className="titre-cadre"> DEMANDE D&apos;AIDE </h3>
            <div style={{ position: 'absolute', top: '180px', display: 'flex', flexDirection: 'column', alignItems:'center'}} >
            {!user.aide && (
              <div className="container">
              <button type="submit" className="help" onClick={this.onOpenModal1}>
                <p>DEMANDER DE L&apos;AIDE</p>
              </button>
              <ModalHelp 
                open={open1} 
                onClose={this.onCloseModal1} 
                demAide={this.demAide} 
                onChange={this.onChange}
                message={message}
              />
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
              <div style={{ color: `${colors.colorWhite}` }} className="container">
                Votre enseignant référent veut un rendez-vous !
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
              <p style={{ color: `${colors.colorWhite}`, margin:'10px 0px'}} className="container text-center">
                Votre enseignant référent n'a pas encore cherché à vous recevoir. Vous ne pouvez donc pas encore choisir de créneau de rendez-vous.
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

/*
Component to allow the user to choose a Rdv slot from the ones available proposed by the teacher.
*/
class ModalRDV extends Component {
  constructor(props) {
    super(props);
    this.state = {
        slots : [], // All the slots that are available to the users.
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Loads the free slots and saves them in the state when the component is rendered.
    componentDidMount() {
      axios.get(`${url}/api/slots/getfree`).then((slots) => {
        let ins = [];
        slots.data.forEach((slot) => { ins.push({id: slot._id, date: slot.date,checked:(this.props.user.chosenSlots.indexOf(slot._id) > -1)})})
        this.setState({ slots: ins})
      })
    }

  // Handles the acceptation (selection) of a Rdv slot.
    handleInputChange(event, event2) {
      let slots = this.state.slots;
      slots[event].checked = event2;
      this.setState({
        slots,
      });
      
    }

  // Saves the chosen slots in the back end.
    send = () => {
      let toSend = []
      this.state.slots.forEach(slot => { if (slot.checked) { toSend.push(slot.id) }});
      axios.post(`${url}/api/users/chosen-slots/${this.props.user._id}`, { chosenSlots: toSend });
      this.props.closeModal();
    }

    render() {
      return (
        <Modal style={{ zIndex:10}} open={this.props.open} onClose={this.props.closeModal} center>
          <h2>Demander un créneau de rendez-vous</h2>
          <p>
                    Ici, vous pouvez voir les créneaux qu'a proposé votre enseignant référent et en
                    demander plusieurs. Un de ceux que vous avez demandé vous sera attribué en fonction
                    des disponibilités.
          </p>
          { this.state.slots.length === 0 && <p> Aucun créneau proposé.</p>}
          <br />
          <form>
                            {this.state.slots.map((slot,i) => (
                                <div key={i}>
                                    <Switch 
                                      style={{margin:'30px'}} 
                                      onChange={this.handleInputChange.bind(this, i)} 
                                      checked={slot.checked} 
                                      uncheckedIcon={false} 
                                      checkedIcon={false} 
                                      width={40} 
                                      height={15} 
                                      offHandleColor={'#cdcdcd'} 
                                      onHandleColor={'#cdcdcd'} 
                                      handleDiameter={20}
                                    />
                                    <label style={{padding: '10px'}} >
                                        {' '+slot.date}
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
                        <br />
                        <br />
        </Modal>
      );
    }
}

/*
Displays the date of the next Rdv slot attributed to the user, if any.
*/
class ModalMesRDV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: 'Aucun rendez-vous', // Stores the rdv date (string) that the user curently has.
    };
  }

  // Gets the next rdv slot the user has, on component loading
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
      <Modal style={{ zIndex:10}} open={this.props.open} onClose={this.props.closeModal} center>
        <br />
        <h2>Mes Rendez-vous</h2>
        <p>Ici, vous pouvez voir votre prochain créneau de rendez-vous :</p>
        <p>
          {this.state.date}
        </p>
        <br />
        <button type="submit" className="modale" onClick={this.props.closeModal}>
          <p>FERMER</p>
        </button>
        <br />
        <br />
      </Modal>
    );
  }
}

/*
Allows the user to make a help request, and to join a message to the teacher.
*/
class ModalHelp extends Component {
  render() {
    return (
      <Modal style={{ zIndex:10}} open={this.props.open} onClose={this.props.onClose} center>
        <h2>Demander de l&apos;aide</h2>
          <p>
            Ici, vous pouvez contacter votre enseignant référent si vous avez besoin de
            conseils ou de soutient. Vous pouvez aussi lui joindre un message.
            Si vous ne voulez pas en ajouter, cliquez juste sur
            "Envoyer".
          </p>

          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="2"
            value={this.props.message}
            onChange={this.props.onChange}
          />
          <br />
          <button type="submit" className="modale" onClick={this.props.demAide}>
            <p>ENVOYER</p>
          </button>
      </Modal>
    );
  }
}

/*
Component to allow the user to choose a Rdv slot from the one personally proposed by the teacher.
*/
class ModalRDVEnseignant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposed: [],
    };
  }

  // Gets the slots proposed by the teacher on component load.
  componentDidMount() {
    this.update();
  }

  // Fetches the rdv slots assigned to a specific user by a teacher.
  update = () => {
    axios.get(`${url}/api/slots/rdvu/${this.props.id}`).then((resp) => {
      this.setState({ proposed: resp.data });
    });
  }

  // Accepts the rdv and saves the result to the back.
  onAccept = (id) => {
    axios.put(`${url}/api/slots/rdvOK/${this.props.id}`, { idRDV: id }).then((resp) => {
      this.setState({ proposed: [resp.data] });
      this.update();
      ToastsStore.info("L'enseignant a été prévenu par mail !");
      ToastsStore.info("Vous avez été prévenu par mail et vous pouvez \n télécharger le RDV dans votre calendrier!");
      // Re-renders the page to display the right components.
      document.location.reload();
    });
  }

  render() {
    const { proposed } = this.state;
    return (
      <Modal style={{ zIndex:10}}
      open={this.props.open} onClose={this.props.closeModal} center>
        <br />
        <h2>Horaires proposés par votre enseignant</h2>
        <p>
          Suite à votre demande d'aide, votre enseignant vous a proposé un (des) rendez-vous(s).
          Vous pouvez choisir celui qui vous arrange le plus et l'accepter.
        </p>
        { proposed.length === 0 && (
          <p>Vous n'avez pas encore reçu de propositions de rendez-vous de la part de votre enseignant référent.</p>
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
        <br />
      </Modal>
    );
  }
}

export default Aide;
