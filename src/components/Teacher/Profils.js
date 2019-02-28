import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'
import RadialChart from './RadialChart';
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'
import url from '../../config';

class Repartition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profils:['Travail', 'Sportif', 'Hadicap', 'Artiste'],
      proportions:[0,0,0,0]
    };
  }

  componentDidMount() {
    for (let i=0; i<this.state.profils.length; i++){
      axios
        .post(`${url}/api/stats/profils`, { profil: this.state.profils[i] })
      // eslint-disable-next-line no-loop-func
        .then((res) => {
          const proportions = this.state.proportions;
          proportions[i] = res.data.nb;
          this.setState({ proportions:proportions });
        });

    }
  }
  

  render() {
    return (
      <div>
        <h2>Vous pouvez consulter ici les proportions de chacuns des profils parmi vos étudiants.</h2>
        <RadialChart profils={this.state.profils} proportions={this.state.proportions}></RadialChart>
      </div>
    );
  }
}

export default Repartition;
