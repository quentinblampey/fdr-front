import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import url from '../../config';

class HU extends Component {
  constructor(props) {
    super(props);

    this.state = {
      historicScore: {
        motivation: [1, 6, 7, 8],
        lifestyle: [5, 3, 4, 6],
        noOrientation: [2, 2, 3, 4],
        integration: [8, 6, 7, 5],
        fidelity: [10, 9, 5, 4],
      },
      options: {
        chart: {
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'Évolution des indicateurs',
          align: 'left',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: ['Sep', 'Oct', 'Nov', 'Dec'],
        },
      },
      series: [
        {
          name: 'Motivation',
          data: [],
        },
        {
          name: 'Fidelité',
          data: [],
        },
        {
          name: 'Intégration',
          data: [],
        },
        {
          name: 'Style de vie',
          data: [],
        },
        {
          name: 'Bien orienté',
          data: [],
        },
      ],
    };
  }

  componentDidMount() {
    axios.get(`${url}/api/users/getid/${this.props.id}`).then((res) => {
      this.setState({
        series: [
          {
            name: 'Motivation',
            data: res.data.historicScores.motivation,
          },
          {
            name: 'Fidelité',
            data: res.data.historicScores.fidelity,
          },
          {
            name: 'Intégration',
            data: res.data.historicScores.integration,
          },
          {
            name: 'Style de vie',
            data: res.data.historicScores.lifestyle,
          },
          {
            name: 'Bien orienté',
            data: res.data.historicScores.noOrientation,
          },
        ],
      });
    });
  }

  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height="350"
        />
      </div>
    );
  }
}

export default HU;
