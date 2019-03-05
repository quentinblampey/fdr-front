import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FooterStop from './FooterStop';
import url from '../../config';
import './Begin.scss';

class Begin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
      this.setState({ user: res.data });
    });
  }

  render() {
    return (
      <div>
        <div className="component">
          <div className="shape">
            <div className="left">
              <div />
            </div>
            <Link to={`/chat/${this.props.match.params.id}`}>
              <button type="submit" className="content">
                <p>
                  <span>“ </span>
                                    MON COACH CHATBOT
                  <span> ”</span>
                </p>
              </button>
            </Link>
          </div>
          <Link to="">
            <button type="submit" className="help">
              <p>DEMANDER DE L'AIDE</p>
            </button>
          </Link>
        </div>
        <FooterStop />
      </div>
    );
  }
}

export default Begin;
