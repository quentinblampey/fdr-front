import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'
import url from '../../config';

class Repartition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profils: ['Travail', 'Sportif', 'Hadicap', 'Artiste'],
      profilsName: ['employe', 'athlete', 'disabled', 'artist'],
      proportions: [0, 0, 0, 0],
    };
  }

  componentDidMount() {
    console.log(this.state.profils);
    for (let i = 0; i < this.state.profils.length; i++) {
      axios
        .post(`${url}/api/stats/profils`, { profil: this.state.profils[i] })
      // eslint-disable-next-line no-loop-func
        .then((res) => {
          const proportions = this.state.proportions;
          proportions[i] = res.data.nb;
          this.setState({ proportions });
        });
    }
  }

  renderRedirect(link) {
    console.log(link);
    this.props.history.push(`/enseignant/filter/${link}`);
  }

  render() {
    const options = {
      chart: {
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const a = Array.from(event.path[0].id);
            this.renderRedirect(this.state.profilsName[a[a.length - 1]].toLowerCase());
          },
        },
      },
      labels: this.state.profils,
      plotOptions: {
        radialBar: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '26px',
          },
          hollow: {
            size: '20%',
          },
        },
      },
    };

    return (
      <div>
        <h2>
                    Vous pouvez consulter ici les proportions de chacuns des profils parmi vos
                    étudiants.
        </h2>
        <div className="radialbar">
          <Chart
            options={options}
            series={this.state.proportions}
            type="radialBar"
            height="380"
          />
        </div>
      </div>
    );
  }
}

export default Repartition;
