import React, { Component } from 'react';
import './Navbar.scss';
// import axios from 'axios';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <Link to="/enseignant">
            <button className="btn btn-primary">Accueil</button>
          </Link>
          <Link to="/enseignant/propose">
            <button className="btn btn-primary">
                            Proposer des creneaux de Rendez-vous
            </button>
          </Link>
        </nav>
      </div>
    );
  }
}

export default Navbar;
