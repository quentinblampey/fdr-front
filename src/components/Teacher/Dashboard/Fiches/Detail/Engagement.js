import React, { Component } from 'react';
import {
  Form, FormGroup, Label, Input,
} from 'reactstrap';

class Repartition extends Component {
  render() {
    return (
      <div>
        <Form>
          {this.props.engagement.isValidated ? (
            <span className="badge badge-pill badge-success">
              {' '}
                            Engagement validé !
              {' '}
            </span>
          ) : (
            <div
              className="btn btn-success"
              onClick={() => {
                this.props.validate(this.props.engagement._id);
              }}
            >
              {' '}
                            Valider l'engagement
              {' '}
            </div>
          )}
          <p>
            {' '}
                        Date : &nbsp;
            {this.props.engagement.date}
          </p>
          {!this.props.ens && (
          <p>
            {' '}
                            Contact : &nbsp;
            {this.props.engagement.contact}
          </p>
          )}
          <p>
            {' '}
                        Commentaire de l'élève : &nbsp;
            {this.props.engagement.student}
          </p>
          <p>
            {' '}
                        Votre commentaire : &nbsp;
            {this.props.engagement.teacher}
          </p>
          <FormGroup>
            <Label for="exampleText" />
            <Input
              type="textarea"
              placeholder="Votre commentaire"
              name="text"
              id={this.props.engagement._id}
            />
          </FormGroup>
          <div
            className="btn btn-info"
            onClick={() => {
              this.props.updateTeacherComment(this.props.engagement._id);
            }}
          >
            {' '}
                        Envoyer le commentaire
            {' '}
          </div>
        </Form>
      </div>
    );
  }
}

export default Repartition;
