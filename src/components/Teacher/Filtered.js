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
    axios.get(`${url}/api/users/sorted/score/${this.props.filter}`).then((res) => {
      this.setState({ users: res.data });
    });
  }

  render() {
    return (
      <div className="container">
        {this.state.users.map(user => (
          <FicheCourte name={user.pseudo} score={user.score} />
        ))}
      </div>
    );
  }
}

export default Filtered;
