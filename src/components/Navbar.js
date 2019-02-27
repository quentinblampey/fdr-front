import React, { Component } from 'react';
import './Navbar.scss';
//import axios from 'axios';
import { Link } from 'react-router-dom';

class Navbar extends Component {

  render() {
    return (
        <div>

            <nav>
              <Link to={`/`}>
                  <button className="btn btn-outline-light">Accueil</button>
              </Link>

            </nav>
        </div>
    );
  }
}



export default Navbar;