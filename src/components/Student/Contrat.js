/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios';
import Modal from 'react-responsive-modal';
import FooterStop from './FooterStop';
import url from '../../config';
import Test from './test';
import liste from './listeUE';
import './Begin.scss';
import Switch from "react-switch";

class Contrat extends Component {
  constructor(props) {
    super(props);
    // this.demAide = this.demAide.bind(this);
    this.state = {
        comment:'',
        engagements:[{date: "21 Mars", student:"Je m'engage à aller en TD", validation:true, teacher:"Ok j'ai noté ton engagement"},
        {date: "21 Juin", student:"Je m'engage à aller en Amphi des fois", validation:false, teacher:"Pas sur que ça soit suffisant.."}
    ],
        user:{ue:[]},
        status: 'choice',
        displayStatus: 'Mes UEs',
        dropdownDatas:  [{status: 'choice', displayStatus : 'Mes UEs'}, {status: 'feedback', displayStatus :'Mes Feedbacks'}, {status:'comment', displayStatus :'Mes Commentaires'}, {status: 'engagement', displayStatus :'Mes Engagements'}, {status:'reflexions', displayStatus :'Mes Reflexions'}],
        UEs: [],
        myComment:'',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.send = this.send.bind(this);
  }

  handleInputChange(event, event2) {
    let UEs = this.state.UEs;
    UEs[event].checked = event2;
    this.setState({
      UEs,
    });
    
  }


  componentDidMount() {
    axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
        let aux=[];
        liste.forEach(element => {
            aux.push({name:element, checked:(res.data.ue.filter((x) => element===x.name).length >0), comment:false})
        })
        this.setState({ user: res.data, UEs:aux});
        alert(
            "La partie contrat n'est pas reglementaire, elle ne sert qu'à communiquer entre l'enseignant et l'étudiant sur sa réussite / ses difficultés / ses engagements concernant ses UEs.",
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
            UEs.forEach(element => {
                element.checked = (res.data.ue.filter((x) => element.name===x.name).length ===1);
            });
            this.setState({ user: res.data , UEs:UEs, status:'feedback', displayStatus: 'Mes Feedbacks'});
          });
      });
    }

    etat = (nextEtat, nextDisplayEtat) => {
        this.setState({ status: nextEtat, displayStatus: nextDisplayEtat });
        this.resetSelected();
    }
    
    options = (status, name) => {
        axios.post(`${url}/api/contrats/options/${this.props.match.params.id}`, { name, status }).then((res) => {
                this.setState({ user: res.data});
              });
      }

      comment = (name) => {
        let a = [];
        this.state.UEs.forEach(element =>{
            if (element.name === name){
                let aux = element;
                aux.comment = !element.comment;
                a.push(aux);
            }
            else{
                a.push(element);
            }
        })
        this.setState({UEs:a});
      }  

      sendComment = (name) => {
        let comment = this.state.comment;
        axios.post(`${url}/api/contrats/comment/${this.props.match.params.id}`, { name, comment }).then((res) => {
                this.setState({ user: res.data, comment:''});
                this.comment(name);
              });
      }

      selectEngagement(engagement){
          this.setState({selectedEngagement:engagement})
      }

      resetSelected(){
          this.setState({selectedEngagement:undefined})
      }

      save(){

      }

    render() {
      return (
          <div>
              <Test onglet="contrat" id={this.props.match.params.id} />
              
          <div className="component row justify-content-center" style={{ margin:'0px' }} >
          <h3 className="titre-cadre">CONTRAT
          <div className="sstitre-cadre">DE RÉUSSITE</div>
          </h3>
            <div className="row justify-content-center" style={{position: 'absolute', top:'140px'}}>
            {(this.state.selectedEngagement && this.state.status === 'engagement') && (
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
                    <div style={{
                        position: 'absolute',
                        top: '190px',
                        bottom:'100px',
                        overflow: 'scroll',
                        overflowX: 'hidden'}}>
                        <form>
                            {this.state.UEs.map((ue, i) => (
                                <div key={ue.name} style={{ color : '#fefefe', margin:'10px', width:'100%-10px'}}>
                                    <div style={{ width:'100%'}}>
                                        <Switch style={{margin:'30px'}} onChange={this.handleInputChange.bind(this, i)} checked={ue.checked} uncheckedIcon={false} checkedIcon={false} width={40} height={15} handleDiameter={20}/>
                                        {" "+ue.name}
                                    </div>
                                </div>
                            ))}
                        </form>
                        <button className="help" style={{margin: '5px 0px', width: '100%'}} onClick={this.send}>Valider</button>
                    </div>
                )}
                {(this.state.status === 'feedback' && this.state.user.ue)&& (
                    <ul className="list-group" style={{
                        width:'90%',
                        position: 'absolute',
                        top: '190px',
                        bottom:'105px',
                        overflow: 'scroll',
                        overflowX: 'hidden',
                        margin:'5px'}}>
                            {this.state.user.ue.map((ue) => (
                                <li key={ue.name} className={"row list-group-item-"+ue.status} style={{minHeight:'45px', borderRadius:'10px', width:'100%', margin: '5px 0px', padding: '0px 0px 0px 10px', display:'flex', flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
                                    <div>
                                        {ue.name}
                                    </div>
                                    <div className="dropdown">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu alignRight>
                                            <Dropdown.Header>Suivi de l'UE</Dropdown.Header>
                                            <Dropdown.Item onClick={this.options.bind(this, "warning", ue.name)}>Signaler des difficulté</Dropdown.Item>
                                            <Dropdown.Item onClick={this.comment.bind(this, ue.name)}>Commentaire</Dropdown.Item>
                                            <Dropdown.Item onClick={this.comment.bind(this, ue.name)}>Absence à une évaluation</Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Header>Fin de l'UE</Dropdown.Header>
                                            <Dropdown.Item onClick={this.options.bind(this, "success", ue.name)}>Validé</Dropdown.Item>
                                            <Dropdown.Item onClick={this.options.bind(this, "danger", ue.name)}>Non validé</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Modal style={{ zIndex:10}} open={this.state.UEs.filter(element => element.name===ue.name)[0].comment} onClose={this.comment.bind(this, ue.name)} center>
                                        <h2>Entre ton commentaire</h2>
                                        <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="2"
                                        value={this.state.comment}
                                        onChange={this.onChange}
                                        />
                                        <br />
                                        <button type="submit" className="modale" onClick={this.sendComment.bind(this, ue.name)}>
                                            <p>ENVOYER</p>
                                        </button>
                                    </Modal>
                                    </div>
                                </li>
                            ))}
                    </ul>
                )}
                {this.state.status === 'comment' && (
                    <div style={{ color : '#fefefe', margin: '50px 10px 10px 10px'}}>
                        <textarea className="form-control"
                                id="exampleFormControlTextarea1"
                                value={this.state.myComment}
                                onChange={this.onChangeMy}
                                placeholder={"Ecrivez ici un commentaire sur votre contrat"}
                                style={{width:'95%', marginBottom:'10px'}}
                        />&nbsp;
                        <button type="submit"
                                className="modale"
                                onClick={this.save.bind(this)}
                        ><p>ENREGISTRER</p></button><br/>
                        {(this.state.user.textContrat) ? (
                            this.state.user.textContrat
                        ):(
                            "Votre enseignant n'a pas encore renseigné de commentaire concernant votre contrat"
                        )}
                        <br/><br/> Cette fonctionnalité est en cours de développement
                    </div>
                )}
                {this.state.status === 'engagement' && (
                    <div style={{ color : '#fefefe', margin: '10px', marginTop:'90px'}}>
                        {(this.state.engagements.length===0) ? (
                            "Vous n'avez pas encore d'engagements"
                        ):(
                            (!this.state.selectedEngagement) ? (
                                this.state.engagements.map((engagement, i)=> (
                                    <div key={engagement.date} className="row">
                                        <button type="button" style={{width:'80%'}} className="btn btn-outline-light col self-align-center" onClick={this.selectEngagement.bind(this, engagement)}>{"Rendez-vous du "+engagement.date}</button>
                                    </div>
                                ))
                            ) : (
                                <div style={{marginTop:'30px'}}>
                                    <div>{"Rendez-vous du "+this.state.selectedEngagement.date}</div>
                                    <div className="row">
                                    <button className="btn btn-outline-light" style={{width:'80%', textAlign:'left', margin:'10px'}}>
                                        {this.state.selectedEngagement.student}
                                    </button>
                                    </div>
                                    <div className="row justify-content-end">
                                    <button className="btn btn-outline-light" style={{width:'80%', textAlign:'left', margin:'10px'}}>
                                        {this.state.selectedEngagement.teacher}
                                    </button>
                                    </div>
                                </div>
                            )
                        )}
                        {!this.state.selectedEngagement && (
                            <div className="row">
                            <button type="button" style={{width:'80%'}} className="btn btn-outline-light col self-align-center">+</button>
                        </div>
                        )}
                    </div>
                )}
                {this.state.status === 'reflexions' && (
                    <div style={{ color : '#fefefe', margin: '50px 10px 10px 10px'}}>
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