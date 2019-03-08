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
    axios.get(`${url}/api/users/filter/${this.props}`).then((res) => {
      this.setState({ users: res.data });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      axios.get(`${url}/api/users/filter/${this.props}`).then((res) => {
        this.setState({ users: res.data });
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="filters">
          {this.props.filter.array.forEach((filter) => {
            <div className="filter">
              {' '}
              {filter}
              {' '}
            </div>;
          })}
                    ;
        </div>
        <div className="sorts">
          {this.props.sortScore.array.forEach((sort) => {
            <div className="filter">
              {' '}
              {sort}
              {' '}
            </div>;
          })}
                    ;
        </div>
        <div className="text-center">
          <h2> Étudiants </h2>
        </div>
        <div className="container-fiches box">
          {this.state.users.map(user => (
            <FicheCourte key={user._id} user={user} />
          ))}
        </div>
      </div>
    );
  }
}

export default Filtered;
