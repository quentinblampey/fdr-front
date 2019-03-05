import React, { Component } from 'react';
import axios from 'axios';
import FicheCourte from './FicheCourte';
import url from '../../config';
import './Filtered.scss';

class Filtered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    if (this.props.match.params.filter === 'pseudo') {
      axios.get(`${url}/api/users/sorted/pseudo`).then((res) => {
        this.setState({ users: res.data });
      });
    } else if (
      ['motivation', 'lifestyle', 'fidelity', 'integration', ' noOrientation'].includes(
        this.props.match.params.filter,
      )
    ) {
      axios
        .get(`${url}/api/users/sorted/score/${this.props.match.params.filter}`)
        .then((res) => {
          this.setState({ users: res.data });
        });
    } else {
      axios
        .get(`${url}/api/users/sorted/caracteristics/${this.props.match.params.filter}`)
        .then((res) => {
          this.setState({ users: res.data });
        });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h2>
            {' Étudiants triés par '}
            {this.props.match.params.filter}
            {' '}
          </h2>
        </div>
        <div className="container-fiches">
          {this.state.users.map((user, i) => (
            <FicheCourte key={i} name={user.pseudo} score={user.score} id={user._id} />
          ))}
        </div>
      </div>
    );
  }
}

export default Filtered;
