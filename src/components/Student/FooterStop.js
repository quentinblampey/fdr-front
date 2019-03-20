/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
// import axios from 'axios';
import './FooterStop.scss';
import { ToastsStore } from 'react-toasts';

class FooterStop extends Component {
    sendLove = () => {
      ToastsStore.info("T'as envoyé de \n l'amour au chatbot, \n Il t'aime aussi ❤️");
    };

    render() {
      return (
        <div>
          <nav
            className="navbar fixed-bottom navbar-light bg-light"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <button
              style={{
                height: '50px',
                width: '50px',
                border: '1px solid rgb(201, 2, 69)',
                'border-radius': '25px',
                display: 'flex',
                background: 'none',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={this.sendLove}
            >
              <i
                className="fa fa-heart"
                aria-hidden="true"
                style={{
                  margin: 'auto',
                  color: 'rgb(201, 2, 69)',
                  'font-size': '20px',
                }}
              />
            </button>
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
