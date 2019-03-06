import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'
import { Link } from 'react-router-dom';
import url from '../../config';
import './Repartition.scss';
import variables from '../../globalSCSS/color.scss';

class Repartition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [
        { field: 'motivation', title: 'Motivation', repartition: [] },
        { field: 'lifestyle', title: 'Lifestyle', repartition: [] },
        { field: 'fidelity', title: 'Fidelite', repartition: [] },
        { field: 'noOrientation', title: 'Besoin de réorientation', repartition: [] },
        { field: 'integration', title: 'Intégration', repartition: [] },
      ],
    };
  }

  componentDidMount() {
    for (let i = 0; i < this.state.fields.length; i++) {
      const field = this.state.fields[i];
      axios
        .post(`${url}/api/stats/global`, { field: field.field })
      // eslint-disable-next-line no-loop-func
        .then((res) => {
          const fields = this.state.fields;
          fields[i].repartition = res.data;
          this.setState({ fields });
        });
    }
  }

  render() {
    const classes = [
      'progress-bar bg-danger',
      'progress-bar bg-warning',
      'progress-bar bg-success',
    ];
    const colors = [variables.graph3, variables.graph1, variables.graph2];

    return (
      <div>
        <h2 className="container">Répartition des élèves suivant les 5 critères. </h2>
        <h5 className="container">
                    La largeur de chaque couleur correspond à la proportion d'étudiants dans chaque
                    intervalle de notes :
          {' '}
        </h5>
        <div className="container">
          <div className="card">
            <div className="card-header">Légende : proportion d'étudiants </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-center">
                                Notés de &nbsp; &nbsp;
                <span className="badge badge-pill badge-danger">0 à 4</span>
              </li>
              <li className="list-group-item d-flex justify-content-center">
                                Notés de &nbsp; &nbsp;
                <span className="badge badge-pill badge-warning">4 à 7</span>
              </li>
              <li className="list-group-item d-flex justify-content-center">
                                Notés de &nbsp; &nbsp;
                <span className="badge badge-pill badge-success">7 à 10</span>
              </li>
            </ul>
          </div>
        </div>

        {this.state.fields.map((f, i) => (
          <Link to={`../filter/${f.field}`} key={i}>
            <div className="fieldState">
              <h2>{f.title}</h2>
              <div
                className="progress"
                style={{
                  height: '30px',
                  width: '90%',
                  margin: '10px auto',
                  borderRadius: '15px',
                }}
              >
                {f.repartition.map((r, j) => (
                  <div
                    key={j}
                    className={classes[j]}
                    role="progressbar"
                    style={{ width: `${r}%`, color: `${colors[j]}` }}
                    aria-valuenow="15"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

export default Repartition;
