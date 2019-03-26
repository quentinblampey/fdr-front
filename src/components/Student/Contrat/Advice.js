import React, { Component } from 'react';

class Advice extends Component {
  render() {
    return (
      <div style={{ color: '#fefefe', margin: '50px 10px 10px 10px' }}>
        {this.props.user.textContrat
          ? this.props.user.textContrat
          : "Votre enseignant n'a pas encore renseigné de conseils concernant votre contrat"}
      </div>
    );
  }
}

export default Advice;
