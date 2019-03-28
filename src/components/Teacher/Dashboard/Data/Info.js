import React, { Component } from 'react';
import '../Fiches/FicheCourte.scss';
import ReactTooltip from 'react-tooltip';

// CLass containing the data displayed in the tooltips.
class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texts: {
        // Text to show in the info areas
        profils:
                    'Dans cette partie du tableau de bord, <br/>vous pouvez cliquer sur chacun <br/>des elements afin que la liste des <br/>étudiants proposés soit filtrée pour <br/>ce profil.',
        repartition:
                    'Dans cette partie du tableau de bord, <br/>vous pouvez cliquer sur chacun <br/>des élements afin que la liste des <br/>étudiants proposés soit ordonnée en <br/>fonction de ce critère.',
      },
    };
  }

  render() {
    return (
      <div>
        <ReactTooltip multiline />
        <button
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
