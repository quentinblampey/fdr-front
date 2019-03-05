import React, { Component } from 'react';
import './FicheCourte.scss';
import { Link } from 'react-router-dom';

class FicheCourte extends Component {
  constructor(props) {
    super(props);
    this.jump = this.jump.bind(this);
    this.state = {
      indicator: '',
      color1: '',
      color2: '',
      color3: '',
      color4: '',
      color5: '',
    };
  }

  componentDidMount() {
    const score = this.props.score;
    if (score.motivation <= 6) {
      if (score.motivation <= 3) {
        this.setState({ color1: 'red' });
      } else {
        this.setState({ color1: 'orange' });
      }
    }
    if (score.lifestyle <= 6) {
      if (score.lifestyle <= 3) {
        this.setState({ color2: 'red' });
      } else {
        this.setState({ color2: 'orange' });
      }
    }
    if (score.integration <= 6) {
      if (score.integration <= 3) {
        this.setState({ color3: 'red' });
      } else {
        this.setState({ color3: 'orange' });
      }
    }
    if (score.fidelity <= 6) {
      if (score.fidelity <= 3) {
        this.setState({ color4: 'red' });
      } else {
        this.setState({ color4: 'orange' });
      }
    }
    if (score.noOrientation <= 6) {
      if (score.noOrientation <= 3) {
        this.setState({ color5: 'red' });
      } else {
        this.setState({ color5: 'orange' });
      }
    }
  }

  jump(event) {
    console.log('Fucking hover ta mère la tchoin !');
  }

    hover = () => {
      console.log('hover');
      // this.setState({ indicator: s });
    };

    /* <div className="other">
              <div className="round" />
              <div className="round" />
            </div> */

    render() {
      return (
        <Link to={`/enseignant/fiche/${this.props.id}`}>
          <div className="card1">
            <div className="header">
              <div className="picture" />
              <h1>
                {' '}
                {this.props.name}
                {' '}
              </h1>
            </div>
            <div className="scores">
              <div className="other">
                <p>M</p>
                {' '}
                <p>L</p>
                {' '}
                <p>I</p>
                {' '}
                <p>F</p>
                {' '}
                <p>O</p>
              </div>
              <div className="bars">
                <div className="progress-container">
                  <div
                    className="score"
                    style={{
                      height: `${this.props.score.motivation * 10}%`,
                      background: this.state.color1,
                    }}
                  />
                </div>
                <div className="progress-container">
                  <div
                    className="score"
                    style={{
                      height: `${this.props.score.lifestyle * 10}%`,
                      background: this.state.color2,
                    }}
                  />
                </div>
                <div className="progress-container" onMouseEnter={this.jump.bind(this)}>
                  <div
                    className="score"
                    style={{
                      height: `${this.props.score.integration * 10}%`,
                      background: this.state.color3,
                    }}
                  />
                </div>
                <div className="progress-container">
                  <div
                    className="score"
                    style={{
                      height: `${this.props.score.fidelity * 10}%`,
                      background: this.state.color4,
                    }}
                  />
                </div>
                <div className="progress-container">
                  <div
                    className="score"
                    style={{
                      height: `${this.props.score.noOrientation * 10}%`,
                      background: this.state.color5,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    }
}

export default FicheCourte;
