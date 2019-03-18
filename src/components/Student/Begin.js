/* eslint-disable arrow-parens */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import FooterStop from './FooterStop';
import url from '../../config';
import './Begin.scss';
import Test from './test';

class Begin extends Component {
    constructor(props) {
        super(props);
        // this.demAide = this.demAide.bind(this);
        this.state = {
            user: '',
            rdvs: [],
            open1: false,
            open2: false,
            message: '',
        };
    }

    componentDidMount() {
        axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then(res => {
            this.setState({ user: res.data });
            axios.get(`${url}/api/rdv/${this.props.match.params.id}`).then(res2 => {
                this.setState({ rdvs: res2.data });
            });
        });
    }

    onOpenModal2 = () => {
        this.setState({ open2: true });
    };

    onCloseModal2 = () => {
        this.setState({ open2: false });
    };

    onChange = e => {
        const message = e.target.value;
        this.setState({ message });
    };

    demAide = () => {
        const { user, message } = this.state;
        axios.post(`${url}/api/users/aide/${user._id}/2`, { message }).then(res => {
            this.setState({ user: res.data });
            this.onCloseModal1();
        });
    };

    render() {
        const {
 user, open1, open2, message, rdvs,
} = this.state;
        const i = 0;
        return (
            <div>
                <Test onglet="chatbot" id={this.props.match.params.id} />
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
                                <p className="text-align"> Lancer le chat </p>
                            </button>
                        </Link>
                    </div>
                    <br />
                </div>
                <FooterStop />
            </div>
        );
    }
}

export default Begin;
