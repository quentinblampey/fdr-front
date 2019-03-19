/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
// import axios from 'axios';
import './FooterStop.scss';

class FooterStop extends Component {
  render() {
    return (
      <div>
        <nav
          className="navbar fixed-bottom2 navbar-light bg-light"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <a href="https://goo.gl/forms/NkNRuP0SJ4LnZ23w1" className="stop">
            <button type="submit" className="btn btn-danger">
                            ARRÊTER L'ÉVALUATION
            </button>
          </a>
        </nav>
      </div>
    );
  }
}
export default FooterStop;
