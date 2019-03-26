import React, { Component } from 'react';
import './FicheCourte.scss';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

class FicheCourte extends Component {

    getColor = (val) => {
        if (val <= 6) {
            if (val <= 3) {
                return 'red';
            }
            return 'orange';
        }
    };

    render() {
        return (
            <div className="fiche">
                <Link to={`/enseignant/fiche/${this.props.user._id}`} target="_blank">
                    <div className="card1">
                        <div className="header">
                            {this.props.user.aide && (
                                <div>
                                    <ReactTooltip multiline />
                                    <span
                                        className="badge badge-pill badge-danger"
                                        data-tip={this.props.user.aideMessage}
                                    >
                                        Aide
                                    </span>
                                </div>
                            )}
                            {this.props.user.score.mean < 5 && (
                                <div>
                                    <ReactTooltip multiline />
                                    <span
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
                                <ReactTooltip multiline />
                                <p data-tip="Motivation pour les cours">M</p>
{' '}
                                <p data-tip="Style de vie">S</p>
{' '}
<p data-tip="Intégration">I</p>
{' '}
                                <p data-tip="Fidelité à Océane">F</p>
{' '}
                                <p data-tip="Orientation">O</p>
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
                {!this.props.user.helped && this.props.fiche === false && (
                    <div>
                        <ReactTooltip multiline />
                        <button
                            onClick={() => {
                                this.props.help(this.props.user._id);
                            }}
                            className="buttonHelp"
                            data-tip="Cliquez-ici pour pouvoir proposer<br />de l'aide à cet étudiant"
                        >
                            <i className="fa fa-calendar" aria-hidden="true" />
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default FicheCourte;
