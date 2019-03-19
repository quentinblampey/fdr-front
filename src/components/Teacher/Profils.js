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
        <div className="row">
          <div className="col-10">
            <h5>Repartition des étudiants selon leurs profils</h5>
          </div>
          <div className="col-2">
            <Info part="profils" />
          </div>
        </div>
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
                series={
                  this.props.proportions}
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
