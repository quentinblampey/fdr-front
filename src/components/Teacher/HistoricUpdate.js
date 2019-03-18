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

    affecte = () => {
      axios.post(`${url}/api/assign`);
    };

    render() {
      return (
        <div className="text-center">
          <hr />
          <h2> Ce bouton permet de stocker les indicateurs des étudiants à un instant T </h2>
          <p>
            {' '}
                    Dans la version réelle, il sera automatiquement activé à un intervalle de temps
                    régulier
            {' '}
          </p>
          <button onClick={this.update} className="btn btn-danger">
            {' '}
                    Enregistrer les indicateurs
            {' '}
          </button>
          <hr />
          <h2>
            {' '}
                    Ce bouton permet d'affecter les étudiants aux créneaux proposés par l'enseignant
            {' '}
          </h2>
          <p>
            {' '}
                    Dans la version réelle, il sera automatiquement activé à un temps T avant les
                    rendez-vous
            {' '}
          </p>
          <button onClick={this.affecte} className="btn btn-danger">
            {' '}
                    Affecter les étudiants
            {' '}
          </button>
          <hr />
        </div>
      );
    }
}

export default HU;
