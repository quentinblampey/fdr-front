import React, { Component } from 'react';
import '../AccueilChat/Accueil.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-responsive-modal';

class Feedbacks extends Component {
  render() {
    return this.props.user.ue.length > 0 ? (
      <ul
        className="list-group"
        style={{
          width: '90%',
          position: 'absolute',
          top: '190px',
          bottom: '105px',
          overflow: 'scroll',
          overflowX: 'hidden',
          margin: '5px',
        }}
      >
        <p className="explications">
        Indiquez ici votre situation dans chaque UE. 
        </p>
        {this.props.user.ue.map(ue => (
          <li
            key={ue.name}
            className={`row list-group-item-${ue.status}`}
            style={{
              minHeight: '45px',
              borderRadius: '10px',
              width: '100%',
              margin: '5px 0px',
              padding: '0px 0px 0px 10px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>{ue.name}</div>
            <div className="dropdown">
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" />

                <Dropdown.Menu alignRight>
                  <Dropdown.Header>Suivi de l'UE</Dropdown.Header>
                  <Dropdown.Item
                    onClick={() => this.props.options('warning', ue.name)}
                  >
                                        Signaler des difficulté
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => this.props.modal(ue.name, 'comment')}
                  >
                                        Commentaire
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => this.props.modal(ue.name, 'missing')}
                  >
                                        Absence à une évaluation
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Fin de l'UE</Dropdown.Header>
                  <Dropdown.Item
                    onClick={() => this.props.options('success', ue.name)}
                  >
                                        Validé
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => this.props.options('danger', ue.name)}
                  >
                                        Non validé
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Modal
                style={{ zIndex: 10 }}
                open={this.props.modalFeedbacks.name !== ''}
                onClose={this.props.modal.bind(
                  this.props.modalFeedbacks.name,
                  this.props.modalFeedbacks.field,
                )}
                center
              >
                {this.props.modalFeedbacks.field === 'comment' ? (
                  <h2>Entrez votre commentaire</h2>
                ) : (
                  <h2>Entrez votre motif d'absence</h2>
                )}
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="2"
                  value={this.props.comment}
                  name="comment"
                  onChange={this.props.onChange}
                />
                <br />
                <button
                  type="submit"
                  className="modale"
                  onClick={this.props.sendModal}
                >
                  <p>ENVOYER</p>
                </button>
              </Modal>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <div style={{ color: '#fefefe', margin: '10px 10px 10px 10px' }}>
                Vous devez valider des choix d'UE pour pouvoir exprimer vos feedbacks à sur ces UEs
      </div>
    );
  }
}

export default Feedbacks;
