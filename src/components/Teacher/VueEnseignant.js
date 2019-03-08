import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import url from '../../config';
import variables from '../../globalSCSS/color.scss';
import RadialChart from './Profils';
import Repartition from './Repartition';
import Filtered from './Filtered';

class VueEnseignant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: '',
      pseudos: [],
      filter: [],
      sort: ['pseudo'],
      sortScore: [],
      profils: ['Employés', 'Sportifs', 'Handicapés', 'Artistes'],
      profilsName: ['employe', 'athlete', 'disabled', 'artist'],
      proportions: [0, 0, 0, 0],
      colors: [variables.graph1, variables.graph2, variables.graph3, variables.graph4],
      updateFilter: this.updateFilter.bind(this),
      updateSort: this.updateSort.bind(this),
    };
  }

  componentDidMount() {
    axios.post(`${url}/api/stats/profils`, { profils: this.state.profilsName }).then((res) => {
      this.setState({ proportions: res.data.proportions });
    });
    axios.get(`${url}/api/users/`).then((res) => {
      this.setState({ pseudo: '', pseudos: res.data });
    });
  }

  updateSort(sort) {
    this.setState({ sortScore: [sort] });
  }

  updateFilter(filter) {
    const filters = this.state.filter;
    if (filters.includes(filter)) {
      filters.splice(filters.indexOf(filter), 1);
    } else {
      filters.push(filter);
    }
    this.setState({ filter: filters });
  }

  render() {
    return (
      <div className="container text-center">
        <h1 className="jumbotron-heading">Aide à la réussite</h1>
        <div className="row">
          <div className="card col-3">
            <Filtered filter={this.state.filter} sort={this.state.sort} sortScore={this.state.sortScore} helped/>
          </div>
          <div className="col-6">
            <div className="row text-center">
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={this.updateSort.bind(this, 'pseudo')}
              >
                                Afficher la liste complète
              </button>
            </div>
            <div className="row">
              <div className="card col-6">
                <br />
                <RadialChart
                  updateFilter={this.state.updateFilter}
                  parent={this}
                  profils={this.state.profils}
                  profilsName={this.state.profilsName}
                  proportions={this.state.proportions}
                  colors={this.state.colors}
                />
              </div>
              <div className="card col-6">
                <br />
                <Repartition updateSort={this.state.updateSort} />
              </div>
            </div>
          </div>
          <div className="card col-3">
            <Filtered filter={this.state.filter} sort={this.state.sort} sortScore={this.state.sortScore} helped={false}/>
          </div>
        </div>
      </div>
    );
  }
}

export default VueEnseignant;
