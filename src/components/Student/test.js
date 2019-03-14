import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './test.scss';

class Test extends Component {
  render() {
    return (
      <div>
        <div className="onglets">
          <Link to="/test/chatbot">
            <div
              className={`text-center ${
                this.props.match.params.onglet === 'chatbot' ? 'color' : 'left'
              }`}
            >
              <p> Chatbot </p>
              {this.props.match.params.onglet === 'aide' && (
              <div className="corner-left">
                <div />
              </div>
              )}
            </div>
          </Link>
          <Link to="/test/aide">
            <div
              className={`text-center ${
                this.props.match.params.onglet === 'aide' ? 'color' : 'middle'
              }`}
            >
              <p> Aide </p>
              {}
              {this.props.match.params.onglet === 'rdv' && (
              <div className="corner-left">
                <div />
              </div>
              )}
              {this.props.match.params.onglet === 'chatbot' && (
              <div className="corner-right">
                <div />
              </div>
              )}
            </div>
          </Link>
          <Link to="/test/rdv">
            <div
              className={`text-center ${
                this.props.match.params.onglet === 'rdv' ? 'color' : 'right'
              }`}
            >
              {this.props.match.params.onglet === 'aide' && (
              <div className="corner-right">
                <div />
              </div>
              )}
              <p> Rendez-vous </p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Test;
