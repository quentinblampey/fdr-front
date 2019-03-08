/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'
import url from '../../config';
import Info from './Info';

class Tutorial extends Component {
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
            this.props.updateFilter(this.props.profilsName[config.dataPointIndex].toLowerCase());
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
      <div className="container" style={{backgroundColor:'black'}}>
        <div className="row">
          <div className="col-10">
            <h5>Repartition des étudiants selon leurs profils</h5>
          </div>
          <div className="col-2">
            <Info part='profils'/>
          </div>
        </div>
        <div>
          <div>
            {this.props.profils.map((a, i) => (
              <div key={i} style={{ color: this.props.colors[i], marginLeft: '7%' }}>
                {a}
                {' '}
:
                {String((i + 1) * this.props.proportions[i]).split('.')[0]}
%
              </div>
            ))}
          </div>
          <div>
            <div className="radialbar">
              <Chart
                options={options}
                series={[
                  this.props.proportions[0],
                  2 * this.props.proportions[1],
                  3 * this.props.proportions[2],
                  4 * this.props.proportions[3],
                ]}
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

export default Tutorial;
