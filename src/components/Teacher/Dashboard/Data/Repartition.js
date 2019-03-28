import React, { Component } from 'react';
import axios from 'axios';
import url from '../../../../config';
import './Repartition.scss';
import variables from '../../../../globalSCSS/color.scss';
import Info from './Info';

// Component displaying the repartition of the students in each of the 5 indicators.
class Repartition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [
        /*
        In each indicator, the repartition is stored in indicator.repartition.
        A length 3 array [20, 30, 50] means 20% of students between 0 and 4, 30% between 4 and 7 and 50% between 7 and 10.
        */
        { field: 'motivation', title: 'Motivation', repartition: [] }, // Repartition of the student in the indicator Motivation.
        { field: 'lifestyle', title: 'Style de vie', repartition: [] }, // Repartition of the student in the indicator Lifestyle.
        { field: 'fidelity', title: 'Fidelite', repartition: [] }, // Repartition of the student in the indicator Fidelity.
        { field: 'noOrientation', title: 'Besoin de réorientation', repartition: [] }, // Repartition of the student in the indicator Orientation.
        { field: 'integration', title: 'Intégration', repartition: [] }, // Repartition of the student in the indicator Integration.
      ],
    };
  }

  // Fetches the repartition for each of the indicators.
  componentDidMount() {
    for (let i = 0; i < this.state.fields.length; i++) {
      const field = this.state.fields[i];
      axios.post(`${url}/api/stats/global`, { field: field.field }).then((res) => {
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
          <div className="head">Légende</div>
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
