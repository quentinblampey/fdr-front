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
        user:{ue:[]},
        status: 'choice',
        UEs: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.send = this.send.bind(this);
  }

  handleInputChange(event, event2) {
    let UEs = this.state.UEs;
    console.log(event, event2);
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
      });
  }

    onChange = (e) => {
      const comment = e.target.value;
      this.setState({ comment });
    };

    send() {
      const { UEs } = this.state;
      axios.post(`${url}/api/contrats/${this.props.match.params.id}`, { UEs }).then(() => {
        axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
            UEs.forEach(element => {
                element.checked = (res.data.ue.filter((x) => element.name===x.name).length ===1);
            });
            this.setState({ user: res.data , UEs:UEs, status:'feedback'});
          });
      });
    }

    etat = (nextEtat) => {
        this.setState({ status: nextEtat });
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

    render() {
      return (
          <div>
              <Test onglet="contrat" id={this.props.match.params.id} />
              
          <div className="component">
          <h3 className="titre-cadre"> MES CONTRATS </h3>
            <div className="btn-group" role="group" aria-label="Basic example" style={{ position: 'absolute', top:'140px'}}>
                  <button type="button" className="btn btn-light" onClick={this.etat.bind(this, 'choice')}>Choix</button>
                  <button type="button" className="btn btn-light" onClick={this.etat.bind(this, 'feedback')}>Feedback</button>
                  <button type="button" className="btn btn-light" onClick={this.etat.bind(this, 'comment')}>Commentaire</button>
                </div>
                {this.state.status === 'choice' && (
                    <div style={{
                        paddingLeft:'10%',
                        position: 'absolute',
                        top: '190px',
                        bottom:'80px',
                        overflow: 'scroll',
                        overflowX: 'hidden'}}>
                        <form>
                            {this.state.UEs.map((ue, i) => (
                                <div key={ue.name} style={{ color : '#fefefe', margin:'10px', width:'100%'}}>
                                    <div style={{ width:'100%', paddingLeft:'5%'}}>
                                        <Switch style={{margin:'30px'}} onChange={this.handleInputChange.bind(this, i)} checked={ue.checked} uncheckedIcon={false} checkedIcon={false} width={40} height={15} handleDiameter={20}/>
                                        {" "+ue.name}
                                    </div>
                                </div>
                            ))}
                        </form>
                        <button className="help" style={{marginLeft:'40%'}} onClick={this.send}>Valider</button>
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
                                            <Dropdown.Item onClick={this.options.bind(this, "success", ue.name)}>Validé !</Dropdown.Item>
                                            <Dropdown.Item onClick={this.options.bind(this, "warning", ue.name)}>Signaler des difficulté</Dropdown.Item>
                                            <Dropdown.Item onClick={this.options.bind(this, "danger", ue.name)}>Echec</Dropdown.Item>
                                            <Dropdown.Item onClick={this.comment.bind(this, ue.name)}>Commentaire</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Modal open={this.state.UEs.filter(element => element.name===ue.name)[0].comment} onClose={this.comment.bind(this, ue.name)} center>
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
                    <div style={{ color : '#fefefe', margin: '10px'}}>
                        {(this.state.user.textContrat) ? (
                            this.state.user.textContrat
                        ):(
                            "Votre enseignant n'a pas encore renseigné de commentaire concernant votre contrat"
                        )}
                    </div>
                )}
          </div>
              <FooterStop />
            </div>
      );
    }
}

export default Contrat;