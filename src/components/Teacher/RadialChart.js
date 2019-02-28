import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class RadialChart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
            events: {
              dataPointSelection: function(event, chartContext, config) {
                console.log(Array.from(event.path[0].id).slice(-1)[0]);
              }
            }
          },
        labels: ['Travail', 'Sportif', 'Hadicap', 'Artiste'],
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
      series: [68, 23, 12, 34],
    }
  }

  render() {

    return (
      <div className="radialbar">
        <Chart options={this.state.options} series={this.state.series} type="radialBar" height="380" />
      </div>
    );
  }
}

export default RadialChart;