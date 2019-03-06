import React, { Component } from 'react';
import axios from 'axios';
import url from '../../config';

class HU extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '5c76a73f39bf810101c7956b',
      user: {
        historicScores: {
          motivation: [],
          lifestyle: [],
          noOrientation: [],
          integration: [],
          fidelity: [],
        },
      },
    };
  }

    update = () => {
      axios.put(`${url}/api/users/save_scores`);
    };

    render() {
      return (
        <div className="text-center">
          <h2> Ce bouton permet de stocker les indicateurs des étudiants à un instant T </h2>
          <p>
            {' '}
                    Dans la version réelle, il sera automatiquement activé à un intervalle de temps
                    régulier
            {' '}
          </p>
          <button onClick={this.update} className="btn btn-danger">
            {' '}
                    Update
            {' '}
          </button>
        </div>
      );
    }
}

export default HU;
