import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import FooterStop from '../Footer';
import url from '../../../config';
import Test from '../Onglets';
import liste from './listeUE';
import UEs from './UEs';
import Feedbacks from './Feedbacks';
import Advice from './Advice';
import Engagements from './Engagements';
import '../AccueilChat/Accueil.scss';

class Contrat extends Component {
  constructor(props) {
    super(props);
    // this.demAide = this.demAide.bind(this);
    this.state = {
        modalFeedbacks:{name:"", field:""},
        newrdv:'',
        comment:'',
        date:'',
        student:'',
        contact:'',
        engagements:[{date: "21 Mars", student:"Je m'engage à aller en TD", validation:true, teacher:"Ok j'ai noté ton engagement"},
        {date: "21 Juin", student:"Je m'engage à aller en Amphi des fois", validation:false, teacher:"Pas sur que ça soit suffisant.."}
    ],
        user:{ue:[]},
        status: 'choice',
        displayStatus: 'Mes UEs',
        dropdownDatas:  [{status: 'choice', displayStatus : 'Mes UEs'}, {status: 'feedback', displayStatus :'Mes Feedbacks'}, {status:'comment', displayStatus :'Conseils'}, {status: 'engagement', displayStatus :'Mes Engagements'}, {status:'reflexions', displayStatus :'Mes Reflexions'}],
        UEs: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.send = this.send.bind(this);
    this.modal = this.modal.bind(this);
    this.options = this.options.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sendModal = this.sendModal.bind(this);
    this.add = this.add.bind(this);
    this.selectEngagement = this.selectEngagement.bind(this);
    this.sendCR = this.sendCR.bind(this);
  }

  handleInputChange(checked, event, id) {
    let UEs = this.state.UEs;
    UEs[id].checked = checked;
    this.setState({
      UEs,
    });
  }

  componentDidMount() {
    axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
        let aux=[];
        liste.forEach(element => {
            aux.push({name:element, checked:(res.data.ue.filter((x) => element===x.name).length >0)})
        })
        this.setState({ user: res.data, UEs:aux});
        alert(
            "Note : notre parti-pris est que le Contrat n'est pas reglementaire, elle ne sert qu'à communiquer entre l'enseignant et l'étudiant sur sa réussite / ses difficultés / ses engagements concernant ses UEs.",
          );
      });
  }

  onChange = (e) => {
    console.log(e.target.name)
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
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
        console.log(name, field);
        let modalFeedbacks;
        if (this.state.modalFeedbacks.name === ""){
            modalFeedbacks={name:name, field:field};
        } else{
            modalFeedbacks={name:"", field:""};
        }
        this.setState({modalFeedbacks});
      }  

      sendModal = () => {
        let comment = this.state.comment;
        let name = this.state.modalFeedbacks.name;
        let field = this.state.modalFeedbacks.field;
        axios.post(`${url}/api/contrats/modal/${this.props.match.params.id}`, { name, comment, field }).then((res) => {
                this.setState({ user: res.data, comment:''});
                this.modal(this.state.modalFeedbacks.name, this.state.modalFeedbacks.field);
              });
      }

      sendCR = () => {
        const {date, student, contact} = this.state;
        axios.post(`${url}/api/engagements/${this.props.match.params.id}`, { date, student, contact }).then((res) => {
            let auxUser = this.state.user;
            auxUser.engagements.push(res.data);
            this.setState({ user: auxUser, date:'', student:'', contact:'Enseignant référent'});
            this.add("");
          });
      }

      add = (newrdv) => {
          console.log(newrdv);
          if (this.state.newrdv!==""){
            this.setState({newrdv: ""});
          }else{
            this.setState({newrdv});
          }
      }

      selectEngagement(engagement){
          console.log(engagement);
          this.setState({selectedEngagement:engagement})
      }

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
              <Test onglet="contrat" id={this.props.match.params.id} />
              
          <div className="component row justify-content-center" style={{ margin:'0px' }} >
          <h3 className="titre-cadre">CONTRAT
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
                                            {this.state.dropdownDatas.filter(element => element.status !==this.state.status).map(d => (
                                                <Dropdown.Item key={d.status} onClick={this.etat.bind(this, d.status, d.displayStatus)}>{d.displayStatus}</Dropdown.Item>
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