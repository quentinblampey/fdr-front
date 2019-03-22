import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import url from '../../config'




class VueEnseignant extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authorized: false,
      MdP: ''
    };
  }

  componentDidMount() {
    axios.get(url+'/api/users/')
      .then(res => {
        this.setState({ pseudo:'', pseudos: res.data });
      });
  }
  

  
    
  

  render() {
      return (
        <div className="container">
          <h1>STATISTIQUES</h1>
        </div>
      )
    }
}

export default VueEnseignant;