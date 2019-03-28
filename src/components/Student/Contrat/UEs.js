import React, { Component } from 'react';
import '../AccueilChat/Accueil.scss';
import Switch from 'react-switch';

class UEs extends Component {
  render() {
    return (
      <div
        style={{
          position: 'absolute',
          top: '190px',
          bottom: '100px',
          overflow: 'scroll',
          overflowX: 'hidden',
        }}
      >
        <form>
          <p className="explications container">
                        Sélectionnez ici les UEs que vous suivez en licence, puis validez pour que
                        votre enseignant-référent puisse les voir.
          </p>
          {this.props.UEs.map((ue, i) => (
            <div
              key={ue.name}
              style={{ color: '#fefefe', margin: '10px', width: '100%-10px' }}
            >
              <div style={{ width: '100%' }}>
                <Switch
                  id={`${i}`}
                  style={{ margin: '30px' }}
                  onChange={this.props.handleInputChange}
                  checked={ue.checked}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  width={40}
                  height={15}
                  handleDiameter={20}
                />
                {` S${ue.name}${i}`}
              </div>
            </div>
          ))}
        </form>
        <button
          className="help"
          style={{ margin: '5px 0px', width: '100%' }}
          onClick={() => this.props.send()}
        >
                    Valider
        </button>
      </div>
    );
  }
}

export default UEs;
