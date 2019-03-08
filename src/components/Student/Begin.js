/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FooterStop from './FooterStop';
import url from '../../config';
import './Begin.scss';

class Begin extends Component {
  constructor(props) {
    super(props);
    // this.demAide = this.demAide.bind(this);
    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
      this.setState({ user: res.data });
    });
  }

    demAide = () => {
      const { user } = this.state;
      const id = user._id;
      console.log(id);
      axios.post(`${url}/api/users/aide/${user._id}/2`, user).then((res) => {
        this.setState({ user: res.data });
      });
    };

    render() {
      const { user } = this.state;
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
            <Link to={`/chat/${this.props.match.params.id}`}>
              <button type="submit" className="help">
                <p>LANCER LE CHAT</p>
              </button>
            </Link>
            <br />
            {user.aide >= 2 ? (
              <button type="submit" className="help" disabled>
                <p>DEMANDE D'AIDE ENVOYEE!</p>
              </button>
            ) : (
              <button type="submit" className="help" onClick={this.demAide}>
                <p>DEMANDER DE L'AIDE</p>
              </button>
            )}
            <br />
            <p className="container backg">
                        Tu peux contacter ton enseignant référend grâce à ce bouton. Si tu as besoin
                        de conseils ou de soutien, tu peux le solliciter ici!
            </p>
          </div>
          <FooterStop />
        </div>
      );
    }
}

export default Begin;
