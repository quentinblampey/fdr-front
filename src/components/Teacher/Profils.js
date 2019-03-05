import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'
import url from '../../config';
import variables from '../../globalSCSS/color.scss';

class Repartition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profils: ['Travail', 'Sportif', 'Hadicap', 'Artiste'],
      profilsName: ['employe', 'athlete', 'disabled', 'artist'],
      proportions: [0, 0, 0, 0],
      colors: [variables.graph1, variables.graph2, variables.graph3, variables.graph4],
    };
  }

  componentDidMount() {
    console.log(this.state.profils);
      axios
        .post(`${url}/api/stats/profils`, { profils: this.state.profilsName })
      // eslint-disable-next-line no-loop-func
        .then((res) => {
          console.log(res.data);
          this.setState({ proportions: res.data.proportions });
        });
    }

  renderRedirect(link) {
    console.log(link);
    this.props.history.push(`/enseignant/filter/${link}`);
  }

  render() {
    const options = {
      colors: this.state.colors,
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
          startAngle: 0,
          endAngle: 270,
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
        <h4>
                    Vous pouvez consulter ici les proportions de chacuns des profils parmi vos
                    étudiants.
        </h4>
        <div>
          <div style={{ position: 'absolute', top: '24%', width: '100%' }}>
            {this.state.profils.map((a, i) => (
              <div key={i} style={{ color: this.state.colors[i], marginLeft: '7%' }}>
                {a}
                {' '}
:
                {this.state.proportions[i]}
%
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', top: '16%' }}>
            <div className="radialbar">
              <Chart
                options={options}
                series={this.state.proportions}
                type="radialBar"
                height="380"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Repartition;
