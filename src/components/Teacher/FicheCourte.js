/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import './FicheCourte.scss';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

class FicheCourte extends Component {
  constructor(props) {
    super(props);
    this.jump = this.jump.bind(this);
    this.state = {
      aide: false,
      indicator: '',
      color1: '',
      color2: '',
      color3: '',
      color4: '',
      color5: '',
    };
  }

  componentDidMount() {
    const score = this.props.user.score;

    try {
      const aide = this.props.user.aide;
      this.setState({ aide });
    } catch (error) {
      this.setState({ aide: false });
    }

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

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      const score = this.props.user.score;
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
  }

  jump(event) {}

    hover = () => {
      // this.setState({ indicator: s });
    };

    /* <div className="other">
              <div className="round" />
              <div className="round" />
            </div> */

    render() {
      const { aide } = this.state;
      return (
            <Link to={`/enseignant/fiche/${this.props.user._id}`}>
                <div className="card1">
                    <div className="header">
                        <ReactTooltip multiline />
                        {aide === 2 && <span className="badge badge-pill badge-danger">Aide</span>}
                        {aide === 1 && (
                            <div>
                                <ReactTooltip multiline />
                                <span
                                  multiline
                                  className="badge badge-pill badge-warning"
                                  data-tip="Le chatbot a repéré un étudiant <br /> qui mérite votre attention!"
                                >
                                    Aide
                                </span>
                            </div>
                        )}
                        {aide === 3 && (
                            <div>
                                <ReactTooltip multiline />
                                <span
                                  multiline
                                  className="badge badge-pill badge-danger"
                                  data-tip="Message étudiant"
                                >
                                    Aide
                                </span>
                                <span
                                  multiline
                                  className="badge badge-pill badge-warning"
                                  data-tip="Le chatbot a repéré un étudiant <br /> qui mérite votre attention!"
                                >
                                    Aide
                                </span>
                            </div>
                        )}
                        <div className="completion-container">
                            <div
                              className="completion"
                              style={{
                                width: `${this.props.user.completion}%`,
                              }}
                            />
                        </div>
                        <div className="picture" />
                        <h1>
                            {' '}
                            {this.props.user.details !== undefined
                                && this.props.user.details.name}
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
                                    height: `${this.props.user.score.motivation * 10}%`,
                                    background: this.state.color1,
                                  }}
                                />
                            </div>
                            <div className="progress-container">
                                <div
                                  className="score"
                                  style={{
                                    height: `${this.props.user.score.lifestyle * 10}%`,
                                    background: this.state.color2,
                                  }}
                                />
                            </div>
                            <div className="progress-container" onMouseEnter={this.jump.bind(this)}>
                                <div
                                  className="score"
                                  style={{
                                    height: `${this.props.user.score.integration * 10}%`,
                                    background: this.state.color3,
                                  }}
                                />
                            </div>
                            <div className="progress-container">
                                <div
                                  className="score"
                                  style={{
                                    height: `${this.props.user.score.fidelity * 10}%`,
                                    background: this.state.color4,
                                  }}
                                />
                            </div>
                            <div className="progress-container">
                                <div
                                  className="score"
                                  style={{
                                    height: `${this.props.user.score.noOrientation * 10}%`,
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
