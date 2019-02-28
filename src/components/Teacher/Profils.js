import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'

import ApexCharts from 'apexcharts';
import { Link } from 'react-router-dom';
import url from '../../config';
import './Repartition.scss';
import RadialChart from './RadialChart';

class Repartition extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  

  render() {
    return (
      <div>
        <h2>Vous pouvez consulter ici les proportions de chacuns des profils parmi vos étudiants.</h2>
        <RadialChart></RadialChart>
      </div>
    );
  }
}

export default Repartition;
