import React, { Component } from 'react';
import axios from 'axios';
import url from '../../config';
import './VueEtudiant.scss';
import FooterStop from './FooterStop';

class VueEtudiant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: '',
    };
  }

  componentDidMount() {
    axios.get(`${url}/api/users/`).then((res) => {
      this.setState({ pseudo: '', pseudos: res.data });
      alert(
        "Cette application est le début de développement d'une app utilisée pour suivre, coacher et repérer d'éventuels étudiants décrocheurs dans les licences. Imaginez vous que vous venez d'entrer en licence, et participez à une (ou plusieurs) conversation avec le chatbot. Remplissez ensuite le questionnaire de satisfaction disponible en cliquant sur le bouton 'Arrêter l'évaluation'. ",
      );
    });
  }

    onChange = (e) => {
      const state = this.state;
      state[e.target.name] = e.target.value;
      this.setState(state);
    };

    onSubmit = (e) => {
      e.preventDefault();

      const pseudo = this.state.pseudo;

      if (pseudo !== '') {
        axios.post(`${url}/api/users/initget`, { pseudo }).then((result) => {
          this.props.history.push(`/begin/${result.data._id}`);
        });
      }
    };

    render() {
      const { pseudo } = this.state;
      return (
        <div>
          <div className="color4" />
          <div className="text-center component">
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-body">
                  <h3>INSCRIS-TOI ICI !</h3>
                  <p style={{ color: '#fefefe' }}> Renseigne ton email</p>
                  <form onSubmit={this.onSubmit}>
                    <input
                      type="email"
                      className="form-control"
                      name="pseudo"
                      value={pseudo}
                      onChange={this.onChange}
                      placeholder="nom@exemple.com"
                    />
                    <button type="submit" className="sign">
                                        Me connecter
                    </button>
                  </form>
                  <br />
                </div>
              </div>
            </div>
            <FooterStop />
          </div>
        </div>
      );
    }
}

export default VueEtudiant;
