import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import Info from './Info';

class RadialChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  renderRedirect(link) {
    this.props.history.push(`/enseignant/filter/${link}`);
  }

  render() {
    const options = {
      colors: this.props.colors,
      chart: {
        events: {
          dataPointSelection: (event, chartContext, config) => {
            this.props.updateFilter(
              this.props.profilsName[config.dataPointIndex].toLowerCase(),
            );
          },
        },
      },
      labels: this.props.profils,
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
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
      <div className="container">
        <p>
          <h5>Repartition par profil</h5>
        </p>
        <Info part="profils" />
        <br />
        <div>
          <div>
            {this.props.profils.map((a, i) => (
              <div key={i} style={{ color: this.props.colors[i], marginLeft: '7%' }}>
                {a}
                {' '}
:
                {this.props.proportions[i]}
%
              </div>
            ))}
          </div>
          <div>
            <div className="radialbar">
              <Chart
                options={options}
                series={this.props.proportions}
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

export default RadialChart;
