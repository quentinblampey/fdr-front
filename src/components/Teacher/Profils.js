import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'
import './Repartition.scss';
import RadialChart from './RadialChart';

class Repartition extends Component {

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
