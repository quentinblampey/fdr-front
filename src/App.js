import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Chat from './components/Student/Chat/Chat';
import Begin from './components/Student/Begin';
import Home from './components/Home';
import VueEtudiant from './components/Student/VueEtudiant';
import RouterEns from './components/Teacher/RouterEnseignant';

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
          <Route path="/chat/:id" component={Chat} />
          <Route path="/begin/:id" render={props => <Begin {...props} />} />
          <Route path="/enseignant" component={RouterEns} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
