import React, { Component } from 'react';
import axios from 'axios';
import url from '../../config';
import './Portail.scss';
import FooterStop from './Footer';

/*
First view, is on the root route where the user lands when he opens the application.
*/
class VueEtudiant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: '', // Stores the email adress of the user in the text field.
    };
  }


  // Explication message on component loading.
  componentDidMount() {
      alert(
        "Cette application est le début de développement d'une application utilisée pour suivre, coacher et repérer d'éventuels étudiants en difficulté dans les licences. Imaginez vous que vous venez d'entrer en licence, et participez à une (ou plusieurs) conversation avec le chatbot. Remplissez ensuite le questionnaire de satisfaction disponible en cliquant sur le bouton 'Arrêter l'évaluation'. ",
      );
  }

  // Handles the change of text field.
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  // Get the user on submit. Makes a request to the back to get the user data.
  onSubmit = (e) => {
    e.preventDefault();
    const { pseudo } = this.state;
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
                  <h3>Inscris-toi ici !</h3>
                  <p style={{ color: '#fefefe' }}>
                    {' '}
                                    Renseigne ton e-mail pour participer à l'expérimentation
                  </p>
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
