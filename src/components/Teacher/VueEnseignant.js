import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import url from '../../config';

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
    return (
      <div className="container text-center" style={{ width: '100%' }}>
        <h1 className="jumbotron-heading">Aide à la réussite</h1>
        <h3>Interface Enseignant</h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Link to="/enseignant/filter/pseudo">
            <button className="btn btn-primary" style={{ width: '100%' }}>
                            Liste des étudiants
            </button>
          </Link>
          <Link to="/enseignant/repartition/">
            <button className="btn btn-primary">Vue globale</button>
          </Link>
          <Link to="/enseignant/profils/">
            <button className="btn btn-primary">Vue globale 2</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default VueEnseignant;
