import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import FicheCourte from './FicheCourte';
import './Filtered.scss';

class Filtered extends Component {
  render() {
    return (
      <div className="container">
        {this.props.helped && (
        <div>
          <ReactTooltip multiline />
          <div data-tip="Etudiants auxquels vous voulez <br />proposer de l'aide. Accedez<br />à sa fiche pour proposer<br />un horaire">
            <h2> Étudiants à aider </h2>
          </div>
          <div className="text-center">
            <h5>
                                Nombre d'étudiants :&nbsp;
              {this.props.users.length}
            </h5>
          </div>
        </div>
        )}
        <div className="container-fiches box">
          {this.props.users.map(user => (
            <FicheCourte
              key={user._id}
              user={user}
              help={this.props.help}
              fiche={false}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Filtered;
