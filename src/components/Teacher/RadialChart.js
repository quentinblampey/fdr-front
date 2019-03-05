import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class RadialChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          events: {
            dataPointSelection(event, chartContext, config) {
              console.log(Array.from(event.path[0].id).slice(-1)[0]);
            },
            dataPointMouseEnter(event, chartContext, config) {
              console.log(Array.from(event.path[0].id).slice(-1)[0]);
            },
          },
        },
        labels: this.props.profils,
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
      },
    };
  }

  render() {
    return (
      <div className="radialbar">
        <Chart
          options={this.state.options}
          series={this.props.proportions}
          type="radialBar"
          height="380"
        />
      </div>
    );
  }
}

export default RadialChart;
