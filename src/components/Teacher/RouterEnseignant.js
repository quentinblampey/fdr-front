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

const crypto = require('crypto');

class RouterEns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: false,
      MdP: '',
    };
  }

  componentDidMount() {}

    onChange = (e) => {
      const { MdP } = this.state;
      this.setState({ MdP: e.target.value }, () => console.log(MdP));
    };

    onSubmit = (e) => {
      const { MdP } = this.state;
      e.preventDefault();
      const MdPasse = MdP;
      // console.log(MdP);
      axios.get(`${url}/api/enseignants/`).then((res) => {
        // console.log(res.data);
        const hash = crypto
          .pbkdf2Sync(MdPasse, res.data.salt, 1000, 64, 'sha512')
          .toString('hex');
        if (hash === res.data.hash) {
          this.setState({ authorized: true });
        }
      });
    };

    render() {
      const { authorized } = this.state;
      if (!authorized) {
        return (
          <div className="container">
            <h2>Entrez le code pour accéder à l&apos;interface enseignant.</h2>
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

      return (
        <Router>
          <div>
            <Route exact path="/fakefiche" component={FicheCourte} />
            <Route exact path="/enseignant/historic/score" component={HistoricUpdate} />
            <Route exact path="/enseignant" component={VueEnseignant} />
            <Route path="/enseignant/fiche/:id" render={props => <Fiche {...props} />} />
            <Route
              path="/enseignant/filter/:filter"
              render={props => <Filtered {...props} />}
            />
            <Route path="/enseignant/repartition" component={Repartition} />
            <Route path="/enseignant/profils" component={Profils} />
          </div>
        </Router>
      );
    }
}

export default RouterEns;
