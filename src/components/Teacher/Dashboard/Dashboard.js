import React, { Component } from 'react';
import axios from 'axios';
import url from '../../../config';
import variables from '../../globalSCSS/color.scss';
import RadialChart from './Data/Profils';
import Repartition from './Data/Repartition';
import Filtered from './Fiches/Filtered';
import './Dashboard.scss';

class VueEnseignant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: [],
      sort: ['pseudo'],
      sortScore: [],
      filterHelp: false,
      profils: ['Employés', 'Sportifs', 'Handicapés', 'Artistes', 'Internationaux'],
      profilsName: ['employe', 'athlete', 'disabled', 'artist', 'foreigner'],
      translate: {
        employe : 'Employés',
        disabled : 'Handicapés',
        foreigner : 'Internationaux',
        artist : 'Artistes',
        athlete : 'Sportifs de haut niveau',
        mean : 'Synthèse',
        motivation : 'Motivation',
        lifestyle : 'Style de vie',
        fidelity : 'Fidélité',
        noOrientation : 'Orientation',
        integration : 'Intégration'
      },
      proportions: [0, 0, 0, 0, 0],
      colors: [variables.graph1, variables.graph2, variables.graph3, variables.graph4],
      updateFilter: this.updateFilter.bind(this),
      updateSort: this.updateSort.bind(this),
      help: this.help.bind(this),
      loadUsers: this.loadUsers.bind(this),
      users: [],
      usersHelped: [],
      number: 0,
      numberHelp: 0,
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
            filterHelp: this.state.filterHelp,
          })
          .then((res) => {
            this.setState({ users: res.data });
            axios.get(`${url}/api/users/helped`).then((res) => {
              this.setState({ usersHelped: res.data, numberHelp: res.data.length });
              axios.get(`${url}/api/users/number`).then((resNb) => {
                console.log(resNb.data);
                this.setState({ number: resNb.data.nombre - this.state.numberHelp });
              });
            });
          });
      });
    };

    help = (id) => {
      axios.post(`${url}/api/users/help/${id}`).then(() => {
        this.loadUsers();
      });
    };

    updateSort(sort) {
      if (this.state.sortScore[0] === sort) {
        this.setState({ sortScore: [] });
      } else {
        this.setState({ sortScore: [sort] });
      }
      this.loadUsers();
    }

    updateSortPseudo() {
      this.setState({ sortScore: [], filter: [], filterHelp: false });
      this.loadUsers();
    }

    updateFilter(filter) {
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

    navigate() {
      this.props.history.push('/enseignant/propose');
    }

    render() {
      const { sortScore, filter, filterHelp, number } = this.state;
      return (
        <div className="container text-center">
          <div className="row dashboard">
            <div className="filtered">
              <div className="text-center">
                <h2> Étudiants en L1 </h2>
              </div>
              <h5>
                Nombre d'étudiants :
                {' '}
                { number }
              </h5>
              <div className="text-center" style={{ display: 'flex' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '40%' , padding: '3px'}}
                  onClick={this.updateSort.bind(this, 'mean')}
                >
                                En difficulté
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '60%' , padding: '3px'}}
                  onClick={this.updateFilterHelp.bind(this)}
                >
                                En demande d'aide
                </button>
              </div>
              {(filter.length !== 0 || filterHelp || sortScore.length !== 0) && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-left',
                    background: '#eee',
                    borderRadius: '5px',
                    margin: '5px 0px',
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={this.updateSortPseudo.bind(this)}
                  >
                    <i
                      className="fa fa-times"
                      style={{ color: '#fefefe' }}
                      aria-hidden="true"
                    />
                  </button>
                  <div className="container">
                    <div className="filters">
                      <p> Filtres :</p>
                      {filter.map(filt => (
                        <div key={filt} className="filter">
                          {' '}
                          {this.state.translate[filt]}
                          {' '}
                        </div>
                      ))}
                      <div className="filter">
                        {' '}
                        {filterHelp && 'Demande aide'}
                        {' '}
                      </div>
                    </div>
                    <div className="sorts">
                      <p> Tri :</p>
                      {sortScore.map(sort => (
                        <div key={sort} className="sort">
                          {' '}
                          {this.state.translate[sort]}
                          {' '}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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
            <div className="bloc-center" style={{ display:'flex'}} >
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
            <div className="filtered">
              <Filtered
                filter={this.state.filter}
                filterHelp={false}
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
