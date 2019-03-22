import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import url from '../../config';
import VueEnseignant from './VueEnseignant';
import Fiche from './Fiche';
import Filtered from './Filtered';
import FicheCourte from './FicheCourte';
import Repartition from './Repartition';
import Profils from './Profils';
import HistoricUpdate from './HistoricUpdate';
import Explication from './Explication';
import Nav from '../Navbar';
import Propose from './Propose';
import variables from '../../globalSCSS/color.scss';

const crypto = require('crypto');

class RouterEns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: false,
      MdP: '',
      fail: false,
    };
  }

  componentDidMount() {}

    onChange = (e) => {
      this.setState({ MdP: e.target.value });
    };

    onSubmit = (e) => {
      const { MdP } = this.state;
      e.preventDefault();
      const MdPasse = MdP;
      axios.get(`${url}/api/enseignants/`).then((res) => {
        const hash = crypto
          .pbkdf2Sync(MdPasse, res.data.salt, 1000, 64, 'sha512')
          .toString('hex');
        if (hash === res.data.hash) {
          this.setState({ authorized: true });
        } else {
          this.setState({ fail: true });
        }
      });
    };

    render() {
      const { authorized, fail } = this.state;
      if (!authorized && !fail) {
        return (
          <div
            className="container text-center"
            style={{
              background: variables.graph1,
              borderRadius: '10px',
              padding: '20px',
              width: '600px',
              marginTop: '100px',
            }}
          >
            <div style={{ display: 'flex' }}>
              {' '}
              <i
                className="fa fa-tint"
                aria-hidden="true"
                style={{ color: '#fefefe', fontSize: '30px', margin: '10px' }}
              />
              <div className="title" style={{ fontSize: '35px' }}>
                            Océane
              </div>
            </div>
            <div
              style={{
                margin: '20px',
                width: '80%',
                height: '1px',
                background: '#fefefe',
              }}
            />
            <h2 style={{ color: '#fefefe' }}> Interface enseignant</h2>
            <p style={{ color: '#fefefe' }}>Entrez le code</p>
            <form onSubmit={this.onSubmit}>
              <input
                type="password"
                className="validate form-control"
                name="password"
                value={this.MdP}
                onChange={this.onChange}
                placeholder="Mot de passe"
              />
              <button type="submit" className="btn btn-dark">
                            Me connecter
              </button>
            </form>
          </div>
        );
      }
      if (!authorized && fail) {
        return (
          <div
            className="container text-center"
            style={{
              background: variables.graph1,
              borderRadius: '10px',
              padding: '20px',
              width: '600px',
              marginTop: '100px',
            }}
          >
            <div style={{ display: 'flex' }}>
              {' '}
              <i
                className="fa fa-tint"
                aria-hidden="true"
                style={{ color: '#fefefe', fontSize: '30px', margin: '10px' }}
              />
              <div className="title" style={{ fontSize: '35px' }}>
                            Océane
              </div>
            </div>
            <div
              style={{
                margin: '20px',
                width: '80%',
                height: '1px',
                background: '#fefefe',
              }}
            />
            <h2 style={{ color: '#fefefe' }}>Interface enseignant</h2>
            <p style={{ color: '#fefefe' }}>Entrez le code</p>
            <form onSubmit={this.onSubmit}>
              <input
                type="password"
                className="validate form-control"
                name="password"
                value={this.MdP}
                onChange={this.onChange}
                placeholder="Mot de passe"
              />
              <button type="submit" className="btn btn-dark">
                            Me connecter
              </button>
            </form>
            <br />
            <div className="alert alert-danger" role="alert">
                        Mot de passe incorrect ! Veuillez réessayer.
            </div>
          </div>
        );
      }

      return (
        <div>
          <Router>
            <div>
              <Nav />
              <Route exact path="/fakefiche" component={FicheCourte} />
              <Route exact path="/enseignant/automation" component={HistoricUpdate} />
              <Route exact path="/enseignant/explication" component={Explication} />
              <Route exact path="/enseignant" component={VueEnseignant} />
              <Route path="/enseignant/propose" component={Propose} />
              <Route
                path="/enseignant/fiche/:id"
                render={props => <Fiche {...props} />}
              />
              <Route
                path="/enseignant/filter/:filter"
                render={props => <Filtered {...props} />}
              />
              <Route path="/enseignant/repartition" component={Repartition} />
              <Route path="/enseignant/profils" component={Profils} />
            </div>
          </Router>
        </div>
      );
    }
}

export default RouterEns;
