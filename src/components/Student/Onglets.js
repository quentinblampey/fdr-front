import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Onglets.scss';

class Onglets extends Component {
  render() {
    return (
      <div>
        <div className="onglets">
          <Link to={`/begin/${this.props.id}`}>
            <div
              className={`text-center ${
                this.props.onglet === 'chatbot' ? 'color' : 'left'
              }`}
            >
              <p> Chatbot </p>
              {this.props.onglet === 'aide' && (
              <div className="corner-left">
                <div />
              </div>
              )}
            </div>
          </Link>
          <Link to={`/aide/${this.props.id}`}>
            <div
              className={`text-center ${
                this.props.onglet === 'aide' ? 'color' : 'middle'
              }`}
            >
              <p> Aide </p>
              {}
              {this.props.onglet === 'contrat' && (
              <div className="corner-left">
                <div />
              </div>
              )}
              {this.props.onglet === 'chatbot' && (
              <div className="corner-right">
                <div />
              </div>
              )}
            </div>
          </Link>
          <Link to={`/contrat/${this.props.id}`}>
            <div
              className={`text-center ${
                this.props.onglet === 'contrat' ? 'color' : 'right'
              }`}
            >
              {this.props.onglet === 'aide' && (
              <div className="corner-right">
                <div />
              </div>
              )}
              <p> Contrats </p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Onglets;
