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
    let count = 0;
    const { pseudos } = this.state;

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
        <div className="card bg-light mb-3">
          <Link to="/enseignant/repartition/">
            <div className="card-header">
              <h4>Vue globale : </h4>
            </div>
            <div className="card-body">Clickez ici pour accéder à la vue globale</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default VueEnseignant;
