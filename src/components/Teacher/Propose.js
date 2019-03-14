import React, { Component } from 'react';
import './FicheCourte.scss';
import DatePicker from 'react-datepicker';
// import ReactTooltip from 'react-tooltip';
// import axios from 'axios';

class Propose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 15,
      date: new Date(),
      plage: [],
    };
  }

  componentDidMount() {}

  componentDidUpdate() {}

    changeDuration = e => this.setState({ duration: e.target.value });

    addDate = () => {
      const { plage, date } = this.state;
      plage.push({
        horaire: `${date.getDate()}/${date.getMonth()
                + 1}/${date.getFullYear()} à ${date.getHours()}h${date.getMinutes()}`,
        id: plage.length + 1,
      });
      this.setState({ plage, date: new Date() }, () => console.log(this.state.plage));
    };

    onChange = date => this.setState({ date });

    render() {
      return (
        <div className="container">
          <h2>
                    Vous pouvez ici proposer des créneaux de Rendez-vous automatiquement. Le Chatbot
                    proposera les créneaux aux élèves et prendra les rendez-vous automatiquement.
          </h2>

          <div className="card">
            <div className="card-header">
              <h2>Proposer un horaire : </h2>
            </div>
            <div className="container">
              <br />
              <h5>Durée des créneaux : </h5>
                        Vous pouvez choisir la durée de vos rendez-vous (de 10 à 50 minutes).
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.duration}
                  onChange={this.changeDuration}
                />
              </div>
              <h5>Début des créneaux : </h5>
                        Vous pouvez ajouter autant de créneaux que vous voulez. Chosir l'horaire de
                        début du nouveau créneau.
              <DatePicker
                selected={this.state.date}
                onChange={this.onChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="d/MM/yyyy, h:mm aa"
                timeCaption="time"
              />
              {' '}
              <button type="button" className="btn btn-success" onClick={this.addDate}>
                <i className="fas fa-plus" />
              </button>
              <br />
            </div>
          </div>
        </div>
      );
    }
}

export default Propose;
