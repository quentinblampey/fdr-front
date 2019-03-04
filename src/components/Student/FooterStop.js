/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';

class FooterStop extends Component {
  render() {
    return (
      <div>
        <nav
          className="navbar fixed-bottom navbar-light bg-light"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <a href="https://goo.gl/forms/NkNRuP0SJ4LnZ23w1" target="_blank">
            <button type="submit" className="btn btn-danger">
                            Arrêter l'évaluation
            </button>
          </a>
        </nav>
      </div>
    );
  }
}
export default FooterStop;
