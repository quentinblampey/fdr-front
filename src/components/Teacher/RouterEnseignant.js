import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import VueEnseignant from './Dashboard/Dashboard';
import Fiche from './Dashboard/Fiches/Detail/Fiche';
import Filtered from './Dashboard/Fiches/Filtered';
import FicheCourte from './Dashboard/Fiches/FicheCourte';
import Repartition from './Dashboard/Data/Repartition';
import Profils from './Dashboard/Data/Profils';
import HistoricUpdate from './HistoricUpdate';
import Explication from './Guide/Explication';
import Nav from './Navbar';
import Propose from './RDV/Propose';

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
