import React, { Component } from 'react';
import './Begin.scss';
import FooterStop from './FooterStop';

import Test from './test';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'

class Exit extends Component {
  render() {
    return (
      <div>
        <Test onglet="aide" id={this.props.match.params.id} />
        <div className="component">
          <h3>Coucou, c'est moi Charlotte</h3>
        </div>
        <FooterStop />
      </div>
    );
  }
}

export default Exit;
