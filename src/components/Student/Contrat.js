import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Checkbox } from 'react-bootstrap/FormCheck';
import { DropdownButton } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios';
import { Link } from 'react-router-dom';
import FooterStop from './FooterStop';
import url from '../../config';
import Modal from 'react-responsive-modal';
import Test from './test';
import liste from './listeUE';
import './Begin.scss';

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
    this.choice = this.choice.bind(this);
    this.feedback = this.feedback.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(value);
    const name = target.name;
    console.log(name);
    let UEs = this.state.UEs;
    UEs[name].checked = value;
    this.setState({
      UEs,
    });
    console.log(this.state.UEs);
  }


  componentDidMount() {
    axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
        let aux=[];
        liste.forEach(element => {
            aux.push({name:element, checked:(res.data.ue.filter((x) => element.name===x.name).length ===1), comment:false})
        })
        this.setState({ user: res.data , UEs:aux});
      });
  }

    onChange = (e) => {
      const comment = e.target.value;
      this.setState({ comment });
    };

    send() {
      let { user, status, UEs } = this.state;
      axios.post(`${url}/api/contrats/${this.props.match.params.id}`, { UEs }).then(() => {
        axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
            UEs.forEach(element => {
                element.checked = (res.data.ue.filter((x) => element.name===x.name).length ===1);
            });
            console.log(res.data);
            this.setState({ user: res.data , UEs:UEs, status:'feedback'});
          });
      });
    }

    feedback = () => {
        console.log(this.state.status);
        if (this.state.status==='choice'){
            this.setState({ status:'feedback' });
        }
    }
    choice = () => {
        console.log(this.state.status);
        if (this.state.status==='feedback'){
            this.setState({ status:'choice' });
        }
      }
    
    options = (status, name) => {
        console.log('here i am')
        axios.post(`${url}/api/contrats/options/${this.props.match.params.id}`, { name, status }).then((res) => {
                console.log(res.data);
                this.setState({ user: res.data});
              });
      }

      onClose(name){
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
        console.log('here i am')
        let comment = this.state.comment;
        axios.post(`${url}/api/contrats/comment/${this.props.match.params.id}`, { name, comment }).then((res) => {
                console.log(res.data);
                this.setState({ user: res.data, comment:''});
                this.onClose(name);
              });
      }

    render() {
      return (
          <div>
              <Test onglet="contrat" id={this.props.match.params.id} />
              
          <div className="component">
          <h3 className="titre-cadre"> MES CONTRATS </h3>
            <div className="btn-group" role="group" aria-label="Basic example" style={{ position: 'absolute', top:'140px'}}>
                  <button type="button" className="btn btn-light" onClick={this.choice}>Choisir mes UE</button>
                  <button type="button" className="btn btn-light" onClick={this.feedback}>Feedback sur mes UE</button>
                </div>
                {this.state.status === 'choice' && (
                    <div className="text-center" style={{
                        width:'100%',
                        position: 'absolute',
                        left:'5%',
                        top: '190px',
                        bottom:'75px',
                        overflow: 'scroll',
                        overflowX: 'hidden'}}>
                        <form>
                            {this.state.UEs.map((ue, i) => (
                                <div key={ue.name} style={{ color : '#fefefe', margin: '10px'}}>
                                    <label>
                                        <input
                                        name={i}
                                        type="checkbox"
                                        checked={ue.checked}
                                        onChange={this.handleInputChange}
                                    />
                                        {ue.name}
                                    </label>
                                </div>
                            ))}
                        </form>
                        <button className="help" onClick={this.send}>Valider</button>
                    </div>
                )}
                {(this.state.status === 'feedback' && this.state.user.ue)&& (
                    <ul className="list-group" style={{ width:'90%', margin: '10px'}}>
                            {this.state.user.ue.map((ue) => (
                                <li key={ue.name} className={"row list-group-item-"+ue.status} style={{'border-radius':'10px', width:'100%', margin: '5px 0px', padding: '0px 0px 0px 10px', display:'flex', 'flex-direction': 'row', 'justify-content':'space-between', 'align-items':'center'}}>
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
                                    <Modal open={this.state.UEs.filter(element => element.name===ue.name)[0].comment} onClose={this.onClose.bind(this, ue.name)} center>
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
          </div>
              <FooterStop />
            </div>
      );
    }
}

export default Contrat;