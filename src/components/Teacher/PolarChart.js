import React, { Component } from 'react';
import Chart from 'chart.js/dist/Chart';

class PolarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const ctx = 'myChart';
    // eslint-disable-next-line
        var myChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: [
          'Motivation',
          'Fidélité',
          'Style de vie',
          'Intégration',
          'Non besoin de réorientation',
        ],
        datasets: [
          {
            data: [
              this.props.score.motivation,
              this.props.score.fidelity,
              this.props.score.lifestyle,
              this.props.score.integration,
              this.props.score.noOrientation,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scale: {
          display: true,
        },
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
      },
    });
  }

    onChange = (e) => {};

    render() {
      return (
        <div>
          <canvas id="myChart" width="100" height="100" />
        </div>
      );
    }
}

export default PolarChart;
