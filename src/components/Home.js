import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <section className="text-center">
    <div className="container">
      <h1>Aide à la réussite - Version de test</h1>
      <p className="lead text-muted">
                Ceci est la version d'essai de l'application du programme d'aide à la réussite. Le
                but de cette version d'essai est de collecter vos retours sur ce qui a été fait.
                Vous pouvez à tout moment décider de stopper votre test et de nous faire vos retours
                via le bouton "Arrêter l'évaluation".
      </p>
      <p>
        <Link to="/enseignant">
          <button className="btn btn-primary my-2">Interface Enseignant </button>
        </Link>
        <Link to="/etudiant">
          <button className="btn btn-primary my-2">Interface Etudiant</button>
        </Link>
      </p>
    </div>
  </section>
);

export default Home;
