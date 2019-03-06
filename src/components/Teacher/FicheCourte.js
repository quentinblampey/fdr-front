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
      fields: [
        { field: 'motivation', title: 'Motivation', repartition: [] },
        { field: 'lifestyle', title: 'Lifestyle', repartition: [] },
        { field: 'fidelity', title: 'Fidelite', repartition: [] },
        { field: 'noOrientation', title: 'Besoin de réorientation', repartition: [] },
        { field: 'integration', title: 'Intégration', repartition: [] },
      ]
    };
  }

  componentDidMount() {
    const score = this.props.user.score;
    if (score.motivation <= 6) {
      if (score.motivation <= 3) {
        this.setState({ color1: 'red' });
      } 
      else{
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

  componentDidUpdate(prevProps){
    if (prevProps.user !== this.props.user) {
      console.log(this.props.user);
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

  jump(event) {
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
        <Link to={`/enseignant/fiche/${this.props.user._id}`}>
          <div className="card1">
            <div className="header">
              <div className="picture" />
              <h1>
                {' '}
                {this.props.user.details !== undefined && this.props.user.details.name}
                {' '}
              </h1>
            </div>
            <div className="scores">
              <div className="bars">
                {this.state.fields.map((f, i) => (
                  <div key={i} className="fieldState">
                    <div
                      className="progress"
                      style={{
                        height: '15px',
                        width: '90%',
                        margin: '10px auto',
                        borderRadius: '8px',
                      }}
                    >
                        <div
                          key={i+5}
                          role="progressbar"
                          style={{ width: `${this.props.user.score[f.field]}%`, color: 'blue' }}
                          aria-valuenow="15"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >{this.props.user.score[f.field]}</div>
                    </div>
                  </div>
              ))}
              </div>
            </div>
          </div>
        </Link>
      );
    }
}

export default FicheCourte;
