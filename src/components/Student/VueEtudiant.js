import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import url from '../../config';

class VueEtudiant extends Component {
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

    onChange = (e) => {
      const state = this.state;
      state[e.target.name] = e.target.value;
      this.setState(state);
    };

    onSubmit = (e) => {
      e.preventDefault();

      const pseudo = this.state.pseudo;

      if (pseudo !== '') {
        axios.post(`${url}/api/users/initget`, { pseudo }).then((result) => {
          this.props.history.push(`/begin/${result.data._id}`);
        });
      }
    };

    render() {
      const { pseudo, pseudos } = this.state;
      return (
        <div className="text-center">
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-body">
                <h1> Interface étudiant </h1>
                <hr />
                <h3>Veuillez vous inscrire avec votre adresse mail:</h3>
                <form onSubmit={this.onSubmit}>
                  <input
                    type="email"
                    className="form-control"
                    name="pseudo"
                    value={pseudo}
                    onChange={this.onChange}
                    placeholder="nom@exemple.com"
                  />
                  <button type="submit" className="btn btn-success">
                                    Me connecter
                  </button>
                </form>
                <br />
                <h5>
                                A terme, l'identification se fera par le biais du CAS (Service
                                d'autentification central).
                </h5>
                <hr />
                <div className="card bg-light mb-3">
                  <div className="card-header">
                    <h5>Comptes inscrits :</h5>
                  </div>

                  <ul className="list-group list-group-flush">
                    {pseudos.map((p, i) => (
                      <li className="list-group-item" key={i}>
                        <Link to={`/begin/${p._id}`}>{p.pseudo}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default VueEtudiant;
