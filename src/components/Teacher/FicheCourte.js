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
        this.state = {};
    }

    getColor = (val) => {
        if (val <= 6) {
            if (val <= 3) {
                return 'red';
            }
            return 'orange';
        }
    };

    render() {
        const { aide } = this.props.user.aide;
        return (
            <div className="fiche">
                <Link to={`/enseignant/fiche/${this.props.user._id}`}>
                    <div className="card1">
                        <div className="header">
                            <ReactTooltip multiline />
                            {aide === -2 && (
                                <span
                                    multiline
                                    className="badge badge-pill badge-danger"
                                    data-tip={this.props.user.aideMessage}
                                >
                                    Aide
                                </span>
                            )}
                            {aide === -1 && (
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
                            {aide === -3 && (
                                <div>
                                    <ReactTooltip multiline />
                                    <span
                                        multiline
                                        className="badge badge-pill badge-danger"
                                        data-tip={this.props.user.aideMessage}
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
                                            background: this.getColor(
                                                this.props.user.score.motivation,
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="progress-container">
                                    <div
                                        className="score"
                                        style={{
                                            height: `${this.props.user.score.lifestyle * 10}%`,
                                            background: this.getColor(
                                                this.props.user.score.lifestyle,
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="progress-container">
                                    <div
                                        className="score"
                                        style={{
                                            height: `${this.props.user.score.integration * 10}%`,
                                            background: this.getColor(
                                                this.props.user.score.integration,
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="progress-container">
                                    <div
                                        className="score"
                                        style={{
                                            height: `${this.props.user.score.fidelity * 10}%`,
                                            background: this.getColor(
                                                this.props.user.score.fidelity,
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="progress-container">
                                    <div
                                        className="score"
                                        style={{
                                            height: `${this.props.user.score.noOrientation * 10}%`,
                                            background: this.getColor(
                                                this.props.user.score.noOrientation,
                                            ),
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
