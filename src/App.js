import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import Chat from './components/Student/AccueilChat/Chat/Chat';
import AccueilChat from './components/Student/AccueilChat/Accueil';
import Aide from './components/Student/Aide/Aide';
import Contrat from './components/Student/Contrat/Contrat';
import Portail from './components/Student/Portail';
import RouterEns from './components/Teacher/RouterEnseignant';
import IE from './components/IE';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  /*
Global router of the application.
The route /enseignant leads to another router for the teacher interface.
*/
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Portail} />
          <Route exact path="/etudiant" component={Portail} />
          <Route exact path="/contrat/:id" component={Contrat} />
          <Route path="/chat/:id" component={Chat} />
          <Route path="/aide/:id" component={Aide} />
          <Route path="/begin/:id" render={props => <AccueilChat {...props} />} />
          <Route path="/enseignant" component={RouterEns} />
          <Route path="/ie" component={IE} />
          <ToastsContainer store={ToastsStore} />
        </div>
      </Router>
    );
  }
}

export default App;
