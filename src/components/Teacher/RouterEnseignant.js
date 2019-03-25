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

class RouterEns extends Component {
  componentDidMount() {}

  render() {
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
