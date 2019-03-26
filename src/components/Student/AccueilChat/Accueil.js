import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FooterStop from '../Footer';
import url from '../../../config';
import './Begin.scss';
import Onglets from '../Onglets';
import colors from '../../globalSCSS/color.scss';

class Begin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      open1: false,
      open2: false,
      message: '',
      accorded: [],
      passed: [],
    };
  }

  componentDidMount() {
    axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
      this.setState({ user: res.data });
    });
  }

    onOpenModal2 = () => {
      this.setState({ open2: true });
    };

    onCloseModal2 = () => {
      this.setState({ open2: false });
    };

    render() {
      return (
        <div>
          <Onglets onglet="chatbot" id={this.props.match.params.id} />
          <div className="component">
            <div className="shape">
              <div className="left">
                <div />
              </div>
              <Link to={`/chat/${this.props.match.params.id}`}>
                <button type="submit" className="content">
                  <p>
                    <span>“ </span>
                                    CHATER AVEC OCÉANE
                    <span> ”</span>
                  </p>
                </button>
              </Link>
            </div>
            <Link to={`/chat/${this.props.match.params.id}`}>
              <div
                style={{
                  height: '50px',
                  width: '50px',
                  border: '1px solid white',
                  borderRadius: '25px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <i
                  className="fa fa-share"
                  aria-hidden="true"
                  style={{
                    margin: 'auto',
                    color: `${colors.colorWhite}`,
                    fontSize: '20px',
                  }}
                />
              </div>
            </Link>
            <br />
          </div>
          <FooterStop />
        </div>
      );
    }
}

export default Begin;
