import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import url from '../../config';

const crypto = require('crypto');

class VueEnseignant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: '',
      pseudos: [],
    };
  }

  componentDidMount() {
    axios.get(`${url}/api/users/`).then((res) => {
      this.setState({ pseudo: '', pseudos: res.data });
    });
  }

  render() {
    const count = 0;
    const { pseudos } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-body">
            <h1 className="jumbotron-heading">Aide à la réussite</h1>
            <h3>Interface Enseignant</h3>
            <Link to="/enseignant/filter/pseudo">
              <button className="btn btn-primary">Liste des étudiants</button>
            </Link>
            <Link to="/enseignant/repartition/">
              <button className="btn btn-primary">Vue globale</button>
            </Link>
            <Link to="/enseignant/profils/">
              <button className="btn btn-primary">Vue globale 2</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default VueEnseignant;
