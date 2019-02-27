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

                <div className="card bg-light mb-3">
                  <div className="card-header">
                    <h4>Etudiants inscrits : </h4>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      <button>Générer les statistiques</button>
                    </p>
                  </div>
                </div>

                <div className="card bg-light mb-3">
                  <div className="card-header">
                    <h4>Etudiants inscrits : </h4>
                  </div>
                  <div className="card-body">
                    <ul className="card-text">
                      {pseudos.map((p) => {
                        count += 1;
                        return (
                          <li key={count}>
                                <Link to={`/enseignant/fiche/${p._id}`}>
                                    {p.pseudo}
                                  </Link>
                              </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
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
