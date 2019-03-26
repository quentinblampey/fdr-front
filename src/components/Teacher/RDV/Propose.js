import React, { Component } from 'react';
import { ToastsStore } from 'react-toasts';
import './Propose.scss';
import '../Dashboard/Fiches/FicheCourte.scss';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import url from '../../../config';

class Propose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 15,
      number: 1,
      date: new Date(),
      numberTot: 0,
      plage: [],
      slots: [],
      ok: false,
    };
  }

  componentDidMount() {
    this.reload();
  }

    changeDuration = (e) => {
      this.setState({ duration: e.target.value });
    };

    changeNumber = (e) => {
      this.setState({ number: e.target.value });
    };

    computeCreneaux = () => {
      const {
        number, date, plage, duration, numberTot,
      } = this.state;
      let mois = String(date.getMonth() + 1);
      if (mois.length === 1) {
        mois = '0' + mois;
      }
      if (number <= 0 || number >= 31 || duration <= 4 || duration >= 61) {
        window.alert('Veuillez rentrer un nombre de  créneau entre 1 et 30 et une durée entre 5 et 60 minutes');
        return 0;
      }
      // eslint-disable-next-line prefer-const
      let heureFin = new Date();
      heureFin.setHours(date.getHours());
      heureFin.setMinutes(date.getMinutes());
      let count = 0;
      while (count < number) {
        count += 1;
        let minutes = heureFin.getMinutes();
        if (minutes === 0) {
          minutes = String('00');
        }
        plage.push({
          date: `${date.getDate()}/${mois}/${date.getFullYear()} à ${heureFin.getHours()}h${minutes}`,
          duration: this.state.duration,
          status: 'Non enregistré',
          id: plage.length + 1,
        });
        heureFin.setHours(
          heureFin.getHours(),
          Number(heureFin.getMinutes()) + Number(duration),
          0,
          0,
        );
      }
      let ok = false;
      if (plage.length !== 0) {
        ok = true 
      }
      this.setState({ plage, numberTot: numberTot + number, ok: ok });
    };

    clearAll = () => {
      if (
        window.confirm(
          'Etes-vous sûr(e) de vouloir supprimer tous les créneaux non enregistrés?',
        )
      ) {
        const plage = [];
        const numberTot = 0;
        this.setState({ plage, numberTot });
      }
    };

    clearOne = (e) => {
      if (
        window.confirm(
          "Etes-vous sûr(e) de vouloir supprimer ce créneau? Un étudiant l'avait peut-être déjà demandé...",
        )
      ) {
        const id = e.target.value;
        axios.delete(`${url}/api/slots/TbAa3CpZXgS1apnKjCnj3VdnkIxMhlny/clear/${id}`).then(
          () => {
            this.reload();
          },
        );
      }
    };

    confirmAll = () => {
      const tot = this.state.plage.length;
      let count = 0;
      const { ok } = this.state;
      if (!ok) {
        window.alert("Vous devez ajouter les  créneaux d'abord !")
      } else {
      if (
        window.confirm(
          'Etes-vous sûr(e) de vouloir enregistrer et proposer tous les créneaux non enregistrés?',
        )
      ) {
        const { plage } = this.state;
        plage.forEach((slot) => {
          axios.post(`${url}/api/slots/`, { duration: slot.duration, date: slot.date }).then(
            () => {
              count += 1;
              if (count === tot) {
                this.setState({ plage: [], ok: false }, () => this.reload());
                ToastsStore.info('Les étudiants concernés ont été prévenus par mail!');
              }
            },
          );
        });
      }
    }
    };

    onChange = date => this.setState({ date });

    reload() {
      let tabSlots = [];
      axios.get(`${url}/api/slots/getfree`).then((slots) => {
        slots.data.forEach((slot) => {
          tabSlots.push({ date: slot.date, status: 'Proposé aux étudiants', id: slot._id });
        });
        this.setState({ slots: tabSlots });
      });
    }

    render() {
      const { plage, slots, ok } = this.state;
      return (
        <div className="container">
          <h2>
                    Vous pouvez ici proposer des créneaux de Rendez-vous automatiquement. Le Chatbot
                    proposera les créneaux aux élèves et prendra les rendez-vous automatiquement.
          </h2>

          <div className="card">
            <div className="card-header">
              <h2>Proposer une plage horaire : </h2>
            </div>
            <div className="container">
              <br />
                        Vous pouvez ajouter autant de créneaux que vous voulez. Indiquez le début de
                        la plage horaire, le nombre de créneaux que vous voulez proposer et leur
                        durée. Les créneaux proposés aux élèves seront ainsi régulièrement espacés.
              <br />
                        Par exemple, si je choisis, 3 créneaux de 20 minutes à partir de 16h00, les
                        choix seront 16h->16h20, 16h20->16h40 et 16h40->17h.
              <br />
              <br />
              <h5>Durée des créneaux : </h5>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.duration}
                  onChange={this.changeDuration}
                />
              </div>
              <h5>Nombre de créneaux : </h5>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.number}
                  onChange={this.changeNumber}
                />
              </div>
              <h5>Début de la plage de RDV : </h5>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                dateFormat="d/MM/yyyy, h:mm aa"
                timeCaption="time"
              />
              {' '}
              <button
                type="button"
                className="btn btn-success"
                onClick={this.computeCreneaux}
              >
                Ajouter ces créneaux &nbsp;
                <i className="fas fa-plus" />
              </button>
              <br />
            </div>
            <div>
              <ul className="list-group">
                <li className="list-group-item list-group-item-secondary">Créneaux</li>
                {slots.map(creneaux => (
                  <li key={creneaux.id} className="list-group-item">
                    <div className="row">
                      <div className="col">
                        {creneaux.date}
                      </div>
                      <div className="col">
(
                        {creneaux.status}
)
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="btn btn-danger"
                          value={creneaux.id}
                          onClick={this.clearOne}
                        >
                          <i className="fas fa-times" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
                {plage.map(creneaux => (
                  <li key={creneaux.id} className="list-group-item">
                    <div className="row">
                      <div className="col">
                        {creneaux.date}
                      </div>
                      <div className="col">
(
                        {creneaux.status}
)
                      </div>
                    </div>
                  </li>
                ))}
                {plage.length === 0 && slots.length === 0 && (
                <li className="list-group-item">Pas de crénaux proposés</li>
                )}
              </ul>
              <button type="button" className="btn btn-danger" onClick={this.clearAll}>
                            Effacer tous les créneaux
              </button>
              <button type="button" className="btn btn-success" onClick={this.confirmAll}>
                          Confirmer ces créneaux
              </button>
            </div>
          </div>
        </div>
      );
    }
}

export default Propose;
