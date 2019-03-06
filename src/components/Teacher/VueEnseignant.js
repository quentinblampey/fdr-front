import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import url from '../../config';
import variables from '../../globalSCSS/color.scss';
import RadialChart from './Profils';

class VueEnseignant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: '',
      pseudos: [],
      profils: ['Travail', 'Sportif', 'Hadicap', 'Artiste'],
      profilsName: ['employe', 'athlete', 'disabled', 'artist'],
      proportions: [0, 0, 0, 0],
      colors: [variables.graph1, variables.graph2, variables.graph3, variables.graph4],
    };
  }

  componentDidMount() {
    axios.post(`${url}/api/stats/profils`, { profils: this.state.profilsName })
      .then((res) => {
        this.setState({ proportions: res.data.proportions });
      });
    axios.get(`${url}/api/users/`).then((res) => {
      this.setState({ pseudo: '', pseudos: res.data });
    });
  }

  render() {
    return (
      <div className="container text-center">
        <h1 className="jumbotron-heading">Aide à la réussite</h1>
        <h3>Interface Enseignant</h3>
        <div className="row">
          <div className="col-8">
            <div className="row text-center">
              <button type="button" className="btn btn-primary" style={{width:'100%'}}>Afficher la liste complète</button>
            </div>
            <div className="row">
              <div className="col-6">
              <RadialChart profils= {this.state.profils} profilsName = {this.state.profilsName} proportions={this.state.proportions} colors={this.state.colors}></RadialChart>
              </div>
              <div className="col-6">
                One of three columns
              </div>
            </div>
          </div>
          <div className="col-4">
            HERE WE WANT TO DISPLAY THE LIST OF THE SUTNDENTS THAT IS DEFINED IN THE OTHER PARTS OF THE DASHBOARD
          </div>
        </div>
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
