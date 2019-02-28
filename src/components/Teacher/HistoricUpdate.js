import React, { Component } from 'react';
import axios from 'axios';
import FicheCourte from './FicheCourte';
import url from '../../config';
import './Filtered.scss';

class Filtered extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

    update = () => {
      axios.put(`${url}/api/users/save_scores`);
    };

    render() {
      return (
        <div>
          <button onClick={this.update}> Update </button>
        </div>
      );
    }
}

export default Filtered;
