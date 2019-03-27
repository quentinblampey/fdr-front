import React, { Component } from 'react';
import axios from 'axios';
import url from '../../config';

class HU extends Component {
    /*
      Save the indicators of every users in their 'history indicators' arrays.
    */
    update = () => {
      axios.put(`${url}/api/users/save_scores`);
    };

    /*
      Run the algorithm that assigns every student to a slot he had chosen.
    */
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
