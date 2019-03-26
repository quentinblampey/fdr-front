import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

class Engagements extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div style={{ color : '#fefefe', position: 'absolute', top: '190px', bottom: '100px', overflow: 'scroll', overflowX: 'hidden', width:'80%'}}>
                        {(this.props.user.engagements.filter(engagement => this.props.page === engagement.contact || (this.props.page==="reflexion" && engagement.contact!=="Enseignant référent")).length===0) ? (
                            <div className="row">
                            <button type="button" style={{width:'80%'}} className="btn btn-outline-light col self-align-center" disabled>{"Vous n'avez pas encore d'engagements"}</button>
                        </div>
                        ):( 
                            (!this.props.selectedEngagement) ? (
                                this.props.user.engagements.filter(engagement => this.props.page === engagement.contact || (this.props.page==="reflexion" && engagement.contact!=="Enseignant référent")).map((engagement, i)=> (
                                    <div key={engagement.date} className="row">
                                        <button
                                          type="button"
                                          style={{ width: '100%' }}
                                          className="btn btn-outline-light col self-align-center"
                                          onClick={() => this.props.selectEngagement(engagement)}
                                        >
                                            {`Rendez-vous du ${engagement.date}`}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div style={{marginTop:'30px'}}>
                                    <h5 style={{marginBottom:'20px'}}>{"Rendez-vous du "+this.props.selectedEngagement.date+" - "+this.props.selectedEngagement.contact}</h5>
                                    <div className="row" style={{width:'100%'}}>
                                    <div style={{width:'80%', textAlign:'left', marginLeft:'20px'}}>
                                        {" Votre compte-rendu :"}
                                    </div>
                                    <button disabled className="btn btn-outline-light" style={{width:'75%', textAlign:'left', margin:'10px'}}>
                                        {this.props.selectedEngagement.student}
                                    </button>
                                    {this.props.selectedEngagement.isValidated && (
                                    <button type="button" class="btn btn-success rounded-circle">{"Validé"}</button>
                                    )}
                                    </div>
                                    {(this.props.selectedEngagement.teacher !== "") ? (
                                        <div className="row justify-content-end">
                                        <div style={{width:'80%', textAlign:'left', marginLeft:'20px'}}>Réponse votre enseignant référent :</div>
                                        <button disabled className="btn btn-outline-light" style={{width:'80%', textAlign:'left', margin:'10px'}}>
                                            {this.props.selectedEngagement.teacher}
                                        </button>
                                        </div>
                                    ):(
                                        <div className="row justify-content-end">
                                        <div style={{width:'80%', textAlign:'left', marginLeft:'20px'}}>Votre enseignant n'a pas écrit de commentaire sur cet engagement.</div>
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                        {!this.props.selectedEngagement && (
                            <div className="row">
                                <button type="button" style={{width:'80%'}} className="btn btn-outline-light col self-align-center" onClick={() => this.props.add(this.props.page)}>+</button>
                            </div>
                        )}
                    <Modal style={{ zIndex:10}} open={this.props.newrdv !== ''} onClose={() => this.props.add(this.props.newrdv)} center>
                                            <h2>Nouveau compte-rendu</h2>
                                            <label>Date :</label>
                                            <textarea
                                            className="form-control"
                                            id="exampleFormControlTextarea1"
                                            rows="2"
                                            value={this.props.date}
                                            onChange={this.props.onChange}
                                            name="date"
                                            />
                                            <br />
                                            {this.props.page==='reflexion' && (
                                                <div>
                                                    <label>Contact :</label>
                                                    <textarea
                                                    className="form-control"
                                                    id="exampleFormControlTextarea1"
                                                    rows="2"
                                                    value={this.props.contact}
                                                    onChange={this.props.onChange}
                                                    name="contact"
                                                    />
                                                    <br />
                                                </div>
                                            )}
                                            <label>Description :</label>
                                            <textarea
                                            className="form-control"
                                            id="exampleFormControlTextarea1"
                                            rows="2"
                                            value={this.props.student}
                                            onChange={this.props.onChange}
                                            name="student"
                                            />
                                            <br />
                                            <button type="submit" className="modale" onClick={this.props.sendCR}>
                                                <p>ENVOYER</p>
                                            </button>
                                        </Modal>
                    </div>
        );
    }
}

export default Engagements;