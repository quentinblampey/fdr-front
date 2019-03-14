import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './test.scss';

class Test extends Component {
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
              {this.props.onglet === 'rdv' && (
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
          <Link to={`/rdv/${this.props.id}`}>
            <div
              className={`text-center ${
                this.props.onglet === 'rdv' ? 'color' : 'right'
              }`}
            >
              {this.props.onglet === 'aide' && (
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
