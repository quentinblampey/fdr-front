import React, { Component } from 'react';
import {
  Form, FormGroup, Label, Input,
} from 'reactstrap';

class Repartition extends Component {
  render() {
    return (
      <div>
        <Form>
          <p>
            {' '}
Date :
            {this.props.engagement.date}
          </p>
          {!this.props.ens && (
          <p>
            {' '}
Contact :
            {this.props.engagement.contact}
          </p>
          )}
          <p>
            {' '}
Commentaire élève :
            {this.props.engagement.student}
          </p>
          <p>
            {' '}
Commentaire prof :
            {this.props.engagement.teacher}
          </p>
          <FormGroup>
            <Label for="exampleText">Text Area</Label>
            <Input type="textarea" name="text" id={this.props.engagement._id} />
          </FormGroup>
          <div
            className="btn btn-info"
            onClick={() => {
              this.props.updateTeacherComment(this.props.engagement._id);
            }}
          >
            {' '}
                        Envoyer
            {' '}
          </div>
          <p>
            {this.props.engagement.isValidated ? (
              <div className="btn btn-success"> Contrat validé </div>
            ) : (
              <button
                className="btn btn-success"
                onClick={() => {
                  this.props.validate(this.props.engagement._id);
                }}
              >
                {' '}
                                Valider le contrat
                {' '}
              </button>
            )}
          </p>
        </Form>
      </div>
    );
  }
}

export default Repartition;
