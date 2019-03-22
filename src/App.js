import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import Footer from './components/Footer';
import Chat from './components/Student/Chat/Chat';
import Begin from './components/Student/Begin';
import Aide from './components/Student/Aide';
import Contrat from './components/Student/Contrat';
import Test from './components/Student/test';
import VueEtudiant from './components/Student/VueEtudiant';
import RouterEns from './components/Teacher/RouterEnseignant';
import Explication from './components/Teacher/Explication';
import IE from './components/IE';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={VueEtudiant} />
          <Route exact path="/etudiant" component={VueEtudiant} />
          <Route exact path="/contrat/:id" component={Contrat} />
          <Route exact path="/explication" component={Explication} />
          <Route path="/chat/:id" component={Chat} />
          <Route path="/aide/:id" component={Aide} />
          <Route path="/test/:onglet" component={Test} />
          <Route path="/begin/:id" render={props => <Begin {...props} />} />
          <Route path="/enseignant" component={RouterEns} />
          <Route path="/ie" component={IE} />
          <Footer />
          <ToastsContainer store={ToastsStore} />
        </div>
      </Router>
    );
  }
}

export default App;
