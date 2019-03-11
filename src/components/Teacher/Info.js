import React, { Component } from 'react';
import './FicheCourte.scss';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texts: {
        profils:
                    'Dans cette partie du Dashboard, <br/>vous pouvez clicker sur chacune <br/>des radial bars afin que la liste des <br/>étudiants proposés soit filtrée pour <br/>ce profil.',
        repartition:
                    'Dans cette partie du Dashboard, <br/>vous pouvez clicker sur chacun <br/>des élements afin que la liste des <br/>étudiants proposés soit ordonnée en <br/>fonction de ce critère.',
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  render() {
    return (
      <div>
        <ReactTooltip multiline />
        <button
          multiline
          type="button"
          className="btn btn-primary rounded-circle"
          data-tip={this.state.texts[this.props.part]}
        >
                    &nbsp;i&nbsp;
        </button>
      </div>
    );
  }
}

export default Info;
