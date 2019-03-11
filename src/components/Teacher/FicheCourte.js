/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { Component } from 'react';
import './FicheCourte.scss';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

class FicheCourte extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aide: false,
            aideMessage: '',
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

        try {
            const aideMessage = `Message de l'étudiant : <br />${this.props.user.aideMessage}`;
            this.setState({ aideMessage });
        } catch (error) {
            this.setState({ aideMessage: "Pas de message de l'étudiant." });
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

    render() {
        const { aide, aideMessage } = this.state;
        return (
            <div className="fiche">
                <Link to={`/enseignant/fiche/${this.props.user._id}`}>
                    <div className="card1">
                        <div className="header">
                            <ReactTooltip multiline />
                            {aide === 2 && (
                                <span
                                    multiline
                                    className="badge badge-pill badge-danger"
                                    data-tip={aideMessage}
                                >
                                    Aide
                                </span>
                            )}
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
                                        data-tip={aideMessage}
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
<p>F</p>
{' '}
<p>O</p>
{' '}
<p>I</p>
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
                                <div className="progress-container">
                                    <div
                                        className="score"
                                        style={{
                                            height: `${this.props.user.score.integration * 10}%`,
                                            background: this.state.color3,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                {!this.props.user.helped && (
                    <button
                        onClick={() => {
                            this.props.help(this.props.user._id);
                        }}
                        className="buttonHelp"
                    >
                        <i className="fa fa-calendar" aria-hidden="true" />
                    </button>
                )}
            </div>
        );
    }
}

export default FicheCourte;
