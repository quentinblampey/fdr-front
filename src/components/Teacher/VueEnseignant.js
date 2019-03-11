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
      filter: [],
      sort: ['pseudo'],
      sortScore: [],
      profils: ['Employés', 'Sportifs', 'Handicapés', 'Artistes'],
      profilsName: ['employe', 'athlete', 'disabled', 'artist'],
      proportions: [0, 0, 0, 0, 0],
      colors: [variables.graph1, variables.graph2, variables.graph3, variables.graph4],
      updateFilter: this.updateFilter.bind(this),
      updateSort: this.updateSort.bind(this),
      help: this.help.bind(this),
      loadUsers: this.loadUsers.bind(this),
      filterHelp: false,
      users: [],
      usersHelped: [],
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

    loadUsers = () => {
      axios.post(`${url}/api/stats/profils`, { profils: this.state.profilsName }).then((res) => {
        this.setState({ proportions: res.data.proportions });
        axios
          .post(`${url}/api/users/filter`, {
            filter: this.state.filter,
            sort: this.state.sort,
            sortScore: this.state.sortScore,
          })
          .then((res) => {
            this.setState({ users: res.data });
            axios.get(`${url}/api/users/helped`).then((res) => {
              this.setState({ usersHelped: res.data });
            });
          });
      });
    };

    help = (id) => {
      console.log('3');
      axios.post(`${url}/api/users/help/${id}`).then(() => {
        this.loadUsers();
      });
    };

    updateSort(sort) {
      console.log('2');
      this.setState({ sortScore: [sort] });
      this.loadUsers();
    }

    updateSortPseudo() {
      console.log('1');
      this.setState({ sortScore: [], filter: [] });
      this.loadUsers();
    }

    updateFilter(filter) {
      console.log('4');
      const filters = this.state.filter;
      if (filters.includes(filter)) {
        filters.splice(filters.indexOf(filter), 1);
      } else {
        filters.push(filter);
      }
      this.setState({ filter: filters });
      this.loadUsers();
    }

    updateFilterHelp() {
      this.setState({ filterHelp: !this.state.filterHelp });
      this.loadUsers();
    }

    render() {
      return (
        <div className="container text-center">
          <h1 className="jumbotron-heading">Aide à la réussite</h1>
          <div className="row dashboard">
            <div className="filtered">
              <Filtered
                filter={this.state.filter}
                filterHelp={this.state.filterHelp}
                sort={this.state.sort}
                sortScore={this.state.sortScore}
                helped={false}
                help={this.state.help}
                users={this.state.users}
              />
            </div>
            <div className="bloc-center">
              <div className="row text-center">
                <button
                  type="button"
                  className="btn btn-primary col"
                  style={{ width: '100%' }}
                  onClick={this.updateSortPseudo.bind(this)}
                >
                                Liste complète
                </button>
                <button
                  type="button"
                  className="btn btn-primary col"
                  style={{ width: '100%' }}
                  onClick={this.updateSort.bind(this, 'mean')}
                >
                                Étudiants en difficulté
                </button>
                <button
                  type="button"
                  className="btn btn-primary col"
                  style={{ width: '100%' }}
                  onClick={this.updateFilterHelp.bind(this)}
                >
                                Étudiants en demande d'aide
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
                filterHelp={this.state.filterHelp}
                sort={this.state.sort}
                sortScore={this.state.sortScore}
                help={this.state.help}
                users={this.state.usersHelped}
                helped
              />
            </div>
          </div>
        </div>
      );
    }
}

export default VueEnseignant;
