import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import Info from './Info';
import variables from '../../../../globalSCSS/color.scss';

class RadialChart extends Component {
  render() {
    const options = {
      // Options of the chart imported from Apex Chart
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
        <div
          style={{
            background: '#eee',
            borderRadius: '5px',
            color: variables.graph1,
            padding: '10px',
            width: '250px',
            margin: 'auto',
          }}
        >
          <h5 style={{ margin: '0px' }}>Répartition par profil</h5>
          <Info part="profils" />
        </div>
        <br />
        <div>
          <div>
            {this.props.profils.map((a, i) => (
              <div key={i} style={{ color: this.props.colors[i], marginLeft: '7%' }}>
                {a}
                {' : '}
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
                height="340"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RadialChart;
