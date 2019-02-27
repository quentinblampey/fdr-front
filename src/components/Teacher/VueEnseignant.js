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
      authorized: false,
      MdP: '',
    };
  }

  componentDidMount() {
    axios.get(`${url}/api/users/`).then((res) => {
      this.setState({ pseudo: '', pseudos: res.data });
    });
  }

    onChange = (e) => {
      this.setState({ MdP: e.target.value }, () => console.log(this.state.MdP));
    };

    onSubmit = (e) => {
      e.preventDefault();
      const MdP = this.state.MdP;
      console.log(MdP);
      axios.get(`${url}/api/enseignants/`).then((res) => {
        console.log(res.data);
        const hash = crypto.pbkdf2Sync(MdP, res.data.salt, 1000, 64, 'sha512').toString('hex');
        if (hash === res.data.hash) {
          this.setState({ authorized: true });
        }
      });
    };

    render() {
      let count = 0;
      const { pseudos } = this.state;
      if (this.state.authorized === true) {
        return (
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-body">
                <h1 className="jumbotron-heading">Aide à la réussite</h1>
                <h3>Interface Enseignant</h3>
                <Link to={`/enseignant/filter/pseudo`}>
                  <button className={'btn btn-primary'}>Liste des étudiants</button>
                </Link>
                <Link to={`/enseignant/repartition/`}>
                  <button className={'btn btn-primary'}>Vue globale</button>
                </Link>
                <Link to={`/enseignant/evolution/`}>
                  <button className={'btn btn-primary'}>Vue globale 2</button>
                </Link>
              </div>
            </div>  
          </div>
        );
      }
      return (
        <div className="container">
          <h2>Entrez le code pour accéder à l'interface enseignant.</h2>
          <form onSubmit={this.onSubmit}>
            <input
              type="password"
              className="validate form-control"
              name="password"
              value={this.MdP}
              onChange={this.onChange}
              placeholder="Mot de passe"
            />
            <button type="submit" className="btn btn-success">
                        Me connecter
            </button>
          </form>
        </div>
      );
    }
}

export default VueEnseignant;