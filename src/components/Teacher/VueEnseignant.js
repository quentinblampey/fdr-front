import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import url from '../../config';
import variables from '../../globalSCSS/color.scss';
import RadialChart from './Profils';
import Repartition from './Repartition';
import Filtered from './Filtered';
import './VueEnseignant.scss';

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
      help: this.help.bind(this),
      users:[],
      usersHelped:[],
      update:0,
    };
  }

  componentDidMount() {
    axios.post(`${url}/api/stats/profils`, { profils: this.state.profilsName }).then((res) => {
      this.setState({ proportions: res.data.proportions });
    });
    axios.get(`${url}/api/users/`).then((res) => {
      this.setState({ pseudo: '', pseudos: res.data });
    });
    axios.post(`${url}/api/users/filter`, {filter:this.state.filter, sort:this.state.sort, sortScore:this.state.sortScore}).then((res) => {
      this.setState({ users: res.data });
    });
    axios.get(`${url}/api/users/helped`).then((res) => {
      this.setState({ usersHelped: res.data });
    });
  }

  componentDidUpdate(prevState){
    if (this.state.update !== prevState.update){
      console.log('updateEns');
      axios.post(`${url}/api/stats/profils`, { profils: this.state.profilsName }).then((res) => {
        this.setState({ proportions: res.data.proportions });
      });
      axios.get(`${url}/api/users/`).then((res) => {
        this.setState({ pseudo: '', pseudos: res.data });
      });
      axios.post(`${url}/api/users/filter`, {filter:this.state.filter, sort:this.state.sort, sortScore:this.state.sortScore}).then((res) => {
        this.setState({ users: res.data });
      });
      axios.get(`${url}/api/users/helped`).then((res) => {
        this.setState({ usersHelped: res.data });
      });
    }
  }

  updateSort(sort) {
    console.log('2');
    this.setState({ sortScore: [sort] , update:this.state.update+1});
  }

  updateSortPseudo() {
    console.log('1');
    this.setState({ sortScore: [], filter: [] , update:this.state.update+1});
  }

    help = (id) => {
      console.log('3');
      axios.post(`${url}/api/users/help/${id}`).then(() => {
        this.setState({update:this.state.update+1});
      });
    };

    updateFilter(filter) {
      console.log('4');
      const filters = this.state.filter;
      if (filters.includes(filter)) {
        filters.splice(filters.indexOf(filter), 1);
      } else {
        filters.push(filter);
      }
      this.setState({ filter: filters , update:this.state.update+1});
    }

    render() {
      return (
        <div className="container text-center">
          <h1 className="jumbotron-heading">Aide à la réussite</h1>
          <div className="row dashboard">
            <div className="filtered">
              <Filtered
                filter={this.state.filter}
                sort={this.state.sort}
                sortScore={this.state.sortScore}
                help={this.state.help}
                users={this.state.usersHelped}
                helped
              />
            </div>
            <div className="bloc-center">
              <div className="row text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={this.updateSortPseudo.bind(this)}
                >
                                Afficher la liste complète
                </button>
              </div>
              <div className="row">
                <div className="chart">
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
                <div className="progress-chart">
                  <br />
                  <Repartition updateSort={this.state.updateSort} />
                </div>
              </div>
            </div>
            <div className="filtered">
              <Filtered
                filter={this.state.filter}
                sort={this.state.sort}
                sortScore={this.state.sortScore}
                helped={false}
                help={this.state.help}
                users={this.state.users}
              />
            </div>
          </div>
        </div>
      );
    }
}

export default VueEnseignant;
