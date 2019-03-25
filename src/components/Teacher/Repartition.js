import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'
import url from '../../config';
import './Repartition.scss';
import variables from '../../globalSCSS/color.scss';
import Info from './Info';

class Repartition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [
        { field: 'motivation', title: 'Motivation', repartition: [] },
        { field: 'lifestyle', title: 'Style de vie', repartition: [] },
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
      <div style={{ width: '250px' }}>
        <div
          style={{
            background: '#eee',
            borderRadius: '5px',
            color: variables.graph1,
            padding: '10px',
            width: '100%',
            margin: 'auto',
          }}
        >
          <h5 style={{ margin: '0px' }}>Répartition par critère</h5>
          <Info part="repartition" />
        </div>
        <br />
        <div className="legend-box">
          <div className="head">Légende : répartition des étudiants par indicateur</div>
          <div className="content">
            <p> Notes de </p>
            <div className="pastille red"> 0 à 4 </div>
            <div className="pastille yellow"> 4 à 7 </div>
            <div className="pastille green"> 7 à 10 </div>
          </div>
        </div>

        {this.state.fields.map((f, i) => (
          <div
            key={i}
            className="fieldState"
            onClick={() => this.props.updateSort(f.field)}
          >
            <h6>{f.title}</h6>
            <div
              className="progress"
              style={{
                height: '15px',
                width: '90%',
                margin: '10px auto',
                borderRadius: '8px',
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
        ))}
      </div>
    );
  }
}

export default Repartition;
