import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Checkbox } from 'react-bootstrap/FormCheck';
import { DropdownButton } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios';
import { Link } from 'react-router-dom';
import FooterStop from './FooterStop';
import url from '../../config';

class Contrat extends Component {
  constructor(props) {
    super(props);
    // this.demAide = this.demAide.bind(this);
    this.state = {
        user:{ue:[]},
        status: 'choice',
        UEs: [{ name: 'Maths', checked: false },
            { name: 'Cuisine', checked: false },
            { name: 'Piscine', checked: false },
            { name: "Histoire de l'autriche précolombienne selon Jesus", checked: false }],
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
        // console.log(res.data);
        console.log(res.data.ue);
        let UEs=this.state.UEs
        UEs.forEach(element => {
            element.checked = (res.data.ue.filter((x) => element.name===x.name).length ===1);
        });
        this.setState({ user: res.data , UEs:UEs});
      });
  }

    onChange = (e) => {
      const message = e.target.value;
      this.setState({ message });
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

    render() {
      return (
          <div>
              <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-secondary" onClick={this.choice}>Choisir mes UE</button>
                  <button type="button" className="btn btn-secondary" onClick={this.feedback}>Feedback sur mes UE</button>
                </div>
                {this.state.status === 'choice' && (
                    <div>
                        <form>
                            {this.state.UEs.map((ue, i) => (
                                <div>
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
                        <button className="btn btn-success" onClick={this.send}>Valider</button>
                    </div>
                )}
                {(this.state.status === 'feedback' && this.state.user.ue)&& (
                    <ul class="list-group">
                            {this.state.user.ue.map((ue) => (
                                <li key={ue.name} className={"row list-group-item-"+ue.status}>
                                    <div className="col-8">
                                        {ue.name}
                                    </div>
                                    <div class="dropdown col-4">
                                    <DropdownButton variant="light" id="dropdown-basic-button" title="Options">
                                        <Dropdown.Item onClick={this.options.bind(this, "success", ue.name)}>Validé !</Dropdown.Item>
                                        <Dropdown.Item onClick={this.options.bind(this, "warning", ue.name)}>Signaler des difficulté</Dropdown.Item>
                                        <Dropdown.Item onClick={this.options.bind(this, "danger", ue.name)}>Echec</Dropdown.Item>
                                        <Dropdown.Item>Commentaire</Dropdown.Item>
                                    </DropdownButton>
                                    </div>
                                </li>
                            ))}
                    </ul>
                )}
              <FooterStop />
            </div>
      );
    }
}

export default Contrat;
