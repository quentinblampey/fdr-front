import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import FooterStop from '../Footer';
import url from '../../../config';
import Test from '../Onglets';
import liste from './listeUE';
import UEs from './UEs';
import Feedbacks from './Feedbacks';
import Advice from './Advice';
import Engagements from './Engagements';
import '../AccueilChat/Accueil.scss';
import colors from '../../../globalSCSS/color.scss';

class Contrat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalFeedbacks: { name: '', field: '' }, //Defines the name and field (comment or missing) of the current modal
      newrdv: '', //Defines the type of the new meeting : Enseignant référant or rflexion
      comment: '', //The current comment the user is typing
      date: '', //The current date the user is typing
      student: '', //The current student comment the user is typing
      contact: '', //The current contact the user is typing
      user: { ue: [] }, //The user who is connected
      status: 'choice', //Defines the page to be displayed : see dropdownDatas to see all possibilities
      displayStatus: 'Mes UEs', //Defines the title of the current displayed page : see dropdownDatas to see all possibilities
      dropdownDatas: [{ status: 'choice', displayStatus: 'Mes UEs' },
        { status: 'feedback', displayStatus: 'Mes Feedbacks' },
        { status: 'comment', displayStatus: 'Conseils' },
        { status: 'engagement', displayStatus: 'Mes Engagements' },
        { status: 'reflexions', displayStatus: 'Mes Reflexions' }],
        //Defines all the pages and their title
      UEs: [], //The list of UEs, it will be imported later from listeUE.js
    };
  }

  /*
  1. Gets the user from the Back-end
  2. Initializes the list of UEs
  3. Alerts to explain to the user the role of the page
  */

  componentDidMount() {
    axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
      const aux = [];
      liste.forEach((element) => {
        aux.push({ name: element, checked: (res.data.ue.filter(x => element === x.name).length > 0) });
      });
      this.setState({ user: res.data, UEs: aux });
      alert(
        "Note : notre parti-pris est que le Contrat n'est pas reglementaire, elle ne sert qu'à communiquer entre l'enseignant et l'étudiant sur sa réussite / ses difficultés / ses engagements concernant ses UEs.",
      );
    });
  }

  /*
  1. Updates the right checkbox when the user click it
  */

  handleInputChange = (checked, event, id) => {
    let UEs = this.state.UEs;
    UEs[id].checked = checked;
    this.setState({
      UEs,
    });
  }

  /*
  Updates the values linked to every text area. name can be contact, student, date or comment
  */

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  /*
  The function is called when the user validates the UE choice
  1. Posts the UEs list
  2. Gets the updated user
  3. Updates the state
  */

  send = () => {
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

  /*
  Function that is used to change the displayed page
  */

  etat = (nextEtat, nextDisplayEtat) => {
    this.setState({ status: nextEtat, displayStatus: nextDisplayEtat });
    this.resetSelected();
  };

  /*
  This fonction posts the new status of an UEs : success, warning, danger
  */

  options = (status, name) => {
    axios.post(`${url}/api/contrats/options/${this.props.match.params.id}`, { name, status }).then((res) => {
      this.setState({ user: res.data });
    });
  };

  /*
  Sets the state attribute modalFeedback
  */

  modal = (name, field) => {
    let modalFeedbacks;
    if (this.state.modalFeedbacks.name === "") {
      modalFeedbacks = { name:name, field:field };
    } else{
      modalFeedbacks={name:"", field:""};
    }
    this.setState({modalFeedbacks});
  }
  
  /*
  This function is used to send comment or missing explanation to the back-end
  */

  sendModal = () => {
    let comment = this.state.comment;
    let name = this.state.modalFeedbacks.name;
    let field = this.state.modalFeedbacks.field;
    axios.post(`${url}/api/contrats/modal/${this.props.match.params.id}`, { name, comment, field }).then((res) => {
      this.setState({ user: res.data, comment:''});
      this.modal(this.state.modalFeedbacks.name, this.state.modalFeedbacks.field);
    });
  }

  /*
  This function posts the new meeting report and updates the state
  */

  sendCR = (page) => {
    let contact = this.state.contact;
    const {date, student} = this.state;
    if (page==='Enseignant référent') {
      contact = 'Enseignant référent';
      console.log(contact);
    }
    axios.post(`${url}/api/engagements/${this.props.match.params.id}`, { date, student, contact }).then((res) => {
      let auxUser = this.state.user;
      auxUser.engagements.push(res.data);
      this.setState({ user: auxUser, date:'', student:'', contact:''});
      this.add("");
    });
  }

  /*
  This function updates the state to trigger the modal to add a new meeting report
  */

  add = (newrdv) => {
    if (this.state.newrdv!=="") {
      this.setState({newrdv: ""});
    }else{
      this.setState({newrdv});
    }
  }

  /*
  This function updates the selectedEngagement to display
  */

  selectEngagement = (engagement)  => {
    this.setState({ selectedEngagement: engagement });
  }

  /*
  This function resets the selected engagement in the state
  */

  resetSelected = () => {
    this.setState({ selectedEngagement: undefined });
  }

  getStyle = (style) => {
    if (style===this.state.status){
      return {backgroundColor : `${colors.color4}`, color : `${colors.colorWhite}`}
    }
    else{
      return {}
    }
  }

  render() {
    return (
      <div>
        <Test onglet="contrat" id={this.props.match.params.id} />
        <div className="component row justify-content-center" style={{ margin:'0px'}} >
          <h3 className="titre-cadre">
            CONTRAT
            <div className="sstitre-cadre">DE RÉUSSITE</div>
          </h3>
          <div className="row justify-content-center" style={{position: 'absolute', top:'140px', margin:'auto'}}>
            {(this.state.selectedEngagement && ['engagement', 'reflexions'].includes(this.state.status)) && (
              <button type="button" className="btn btn-light" onClick={this.resetSelected.bind(this)}>Retour</button>
            )}
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                {this.state.displayStatus}
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight>
                {this.state.dropdownDatas.map(d => (
                  <Dropdown.Item key={d.status} style={this.getStyle(d.status)} onClick={() => this.etat(d.status, d.displayStatus)}>{d.displayStatus}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {this.state.status === 'choice' && (
            <UEs UEs = {this.state.UEs} handleInputChange={this.handleInputChange} send={this.send}/>   
          )}
          {(this.state.status === 'feedback' ) && (
            <Feedbacks user={this.state.user} onChange={this.onChange} options={this.options} modal={this.modal} modalFeedbacks={this.state.modalFeedbacks} sendModal={this.sendModal}/>
          )}
          {this.state.status === 'comment' && (
            <Advice user={this.state.user}/>
          )}
          {this.state.status === 'engagement' && (
            <Engagements page="Enseignant référent" onChange={this.onChange} sendCR={this.sendCR} user={this.state.user} selectedEngagement={this.state.selectedEngagement} add={this.add} selectEngagement={this.selectEngagement} newrdv={this.state.newrdv} date={this.state.date} contact={this.state.contact} student={this.state.student}/>
          )}
          {this.state.status === 'reflexions' && (
            <Engagements page="reflexion" onChange={this.onChange} sendCR={this.sendCR} user={this.state.user} selectedEngagement={this.state.selectedEngagement} add={this.add} selectEngagement={this.selectEngagement} newrdv={this.state.newrdv} date={this.state.date} contact={this.state.contact} student={this.state.student}/>
          )}
        </div>
        <FooterStop />
      </div>
    );
  }
}

export default Contrat;