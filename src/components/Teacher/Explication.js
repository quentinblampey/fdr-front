import React, { Component } from 'react';
import img1 from './img/1.png';
import img2 from './img/2.png';
import img3 from './img/3.png';
import img4 from './img/4.png';
import img5 from './img/5.png';

class Info extends Component {
  render() {
    return (
      <div style={{ padding: '20px' }}>
        <h1 className="text-center"> Guide de l'interface enseignant </h1>
        <h2> 1 - Tableau de bord </h2>
        <p>
          {' '}
                    L'interface enseignant est composée entre autres d'un tableau de bord. Avec
                    celui-ci, chaque enseignant référent pourra, en un coup d'oeil, avoir une vue
                    sur l'état des étudiants sous sa responsabilité.
          {' '}
        </p>
        <div className="part" style={{ marginLeft: '30px', marginTop: '20px' }}>
          <h4> 1.1 Fiche récapitulative étudiant </h4>
          <p>
            {' '}
                        Chaque enseignant référent verra une liste de fiches récapitulative de la
                        situation de chaque étudiant (voir ci-dessous) grâce à 5 indicateurs de
                        réussite : sa motivation pour les cours (M comme motivation), son style de
                        vie (S comme style de vie), son intégration au sein de l'établissement (I
                        comme intégration), sa fidelité à l'application (F comme fidelité) et son
                        besoin ou non de réorientation (O comme orientation).
            {' '}
          </p>
          <p>
            {' '}
                        Au dessus du nom de l'étudiant peut apparaître une ou deux pastille "Aide".
                        Une vignette aide de couleur orange signifie que le chatbot a remarqué que
                        cet étudiant a besoin d'aide, et il est recommandé de l'aider. Une pastille
                        rouge signifie que l'étudiant a demandé de l'aide, et il est alors possible
                        de voir son message de demande d'aide au survol de cette pastille.
            {' '}
          </p>
          <p>
            {' '}
                        Au clic sur une fiche, un onglet s'ouvre et affiche un peu plus de détail
                        sur cet étudiant.
            {' '}
          </p>
          <img src={img1} alt=" " style={{ height: '300px', margin: '20px auto' }} />
        </div>

        <div className="part" style={{ marginLeft: '30px', marginTop: '20px' }}>
          <h4> 1.2 Indicateurs globaux </h4>
          <p>
            {' '}
                        Le tableau de bord, en plus de l'affichage des étudiants, propose différents
                        indicateurs globaux, donnant donc au enseignant référent des outils pour
                        sonder l'état de sa cohorte dans sa globalité et non étudiant par étudiant.
          </p>
          <p>
            {' '}
                        Le graphique suivant affiche les pourcentages de certaines caractéristiques
                        présentes dans la cohorte, comme le pourcentage d'étudiants sportifs de haut
                        niveau, employés en parallèle, étudiants internationaux etc...
            {' '}
          </p>
          <img src={img2} alt=" " style={{ height: '500px', margin: '20px auto' }} />
          <p>
            {' '}
                        Les barres suivantes permettent de voir comment se situe la cohorte pour
                        chaque indicateur (motivation, style de vie etc...) : une barre pour chaque
                        indicateur, qui montre le pourcentage d'étudiants "dans le rouge" pour cet
                        indicateur, ceux "dans le orange" et ceux "dans le vert". Ici, par exemple,
                        50% de la cohorte est "moyennement motivée" (couleur orange), et l'autre
                        moitié est suffisamment motivée (couleur verte).
          </p>
          <img src={img3} alt=" " style={{ height: '500px', margin: '20px auto' }} />
        </div>

        <div className="part" style={{ marginLeft: '30px', marginTop: '20px' }}>
          <h4> 1.3 Filtres et tris </h4>
          <p>
            {' '}
                        Les précédents indicateurs peuvent être utilisés pour filtrer ou trier la
                        vue des étudiants.
          </p>
          <p>
            {' '}
            <span style={{ fontFamily: 'MsBoldItalic' }}> Tris : </span>
            {' '}
il est possible
                        de trier les étudiants selon chacun des 5 indicateurs en cliquant sur la
                        jauge correspondante, mais aussi de trier les étudiants selon leur niveau de
                        difficulté (prenant en compte les 5 critères).
          </p>
          <p>
            {' '}
            <span style={{ fontFamily: 'MsBoldItalic' }}> Filtres : </span>
            {' '}
il est
                        possible de filtrer les étudiants selon leurs caractéristiques, par exemple
                        si ils sont ou non sportifs de haut niveau / étudiants internationaux / ...
                        Il est également possible de récupérer seulement les étudiants ayant demandé
                        de l'aide en appliquant le filtre correspondant.
            {' '}
          </p>
          <p>
            {' '}
                        Lorsqu'un filtre ou tri est ajouté, il se voit directement sur la colonne de
                        gauche. Il est possible de supprimer tous les filtres et tris en cliquant
                        sur le bouton jaune.
          </p>
          <img src={img4} alt=" " style={{ height: '150px', margin: '20px auto' }} />
        </div>
        <div className="part" style={{ marginLeft: '30px', marginTop: '20px' }}>
          <h4> 1.4 Gestion des demandes de rendez-vous </h4>
          <p>
            {' '}
                        Imaginons qu'un enseignant référent souhaite reçevoir 5 étudiants cette
                        semaine. Grâce aux tableau de bord et ses différents outils, le enseignant
                        référent peut aisément choisir les étudiants qu'il veut voir en priorité
                        dans le but de les aider. Par exemple, il peut appliquer le filtre "demande
                        d'aide" pour récupérer tous les étudiants ayant demandé de l'aide, ajouter
                        le tri par étudiant en difficulté et choisir les 5 premiers élèves. Par
                        "choisir", on entend accepter la demande de rendez-vous, ce qui ne signifie
                        pas prendre rendez-vous ! Une fois les 5 demandes de rendez-vous acceptées,
                        les étudiants choisis seront placés dans la colonne de droite du tableau de
                        bord, et il faudra planifier les rendez-vous (voir partie 2).
          </p>
          <p>
            {' '}
                        Pour passer un étudiant de la colonne gauche à la colonne droite, il faut
                        cliquer sur l'icône planning de couleur verte à la droite de leur fiche.
            {' '}
          </p>
        </div>
        <h2> 2 - Prise de rendez-vous </h2>

        <p>
          {' '}
                    Afin de satisfaire au mieux tous les enseignants référents, il est possible de choisir les créneaux
                    de rendez-vous de 3 manières différentes.
        </p>
        <div className="part" style={{ marginLeft: '30px', marginTop: '20px' }}>
          <h4> 2.1 Par mail </h4>
          <p>
            {' '}
                        Le mail de l'étudiant est donné dans la fiche détaillée. L'enseignant référent
                         est donc libre de le contacter par mail directement.
            {' '}
          </p>
        </div>
        <div className="part" style={{ marginLeft: '30px', marginTop: '20px' }}>
          <h4> 2.2 Via l'interface, étudiant par étudiant </h4>
          <p>
            {' '}
                        Sur la fiche détaillée de l'étudiant, il est possible de lui proposer
                        individuellement un ou plusieurs créneau de rendez-vous. L'étudiant doit
                        donc ensuite, de son côté, accepter un des créneaux proposés. Il est possible
                        de proposer les créneaux un par un jusqu'à ce que l'étudiant en accepte un, pour
                        éviter les trous dans le planning de l'enseignant référent.
          </p>
        </div>
        <div className="part" style={{ marginLeft: '30px', marginTop: '20px' }}>
          <h4> 2.3 Via l'interface, automatiquement </h4>
          <p>
            {' '}
                        La planification de rendez-vous avec l'étudiant peut être difficile et
                        chronophage, car les étudiants comme les enseignants référents ont des impératifs et
                        n'aiment pas avoir des trous dans leur planning. L'enseignant référent peut donc
                        simplement proposer sa plage de rendez-vous (via l'onglet associé dans la
                        barre de navigation), et les étudiants de leur côté choisiront tous les
                        créneaux où ils sont disponibles. Ensuite, un algorithme sera lancé de sorte
                        à trouver une solution qui convient aux étudiants et à l'enseignant référent. S'il
                        n'existe pas de solution, seront favorisés les étudiants ayant le plus
                        besoin d'aide.
          </p>
        </div>
        <h2> 3 - Contrats </h2>

        <p>Dans cette partie, les enseignants référents peuvent gérer le contrat pédagogique en lien 
          avec l'étudiant. Pour cela, il dispose de différentes fonctionnalités accessibles grâce au menu déroulant.</p>
        <div className="part" style={{ marginLeft: '30px', marginTop: '20px' }}>
          <h4> 3.1 UEs choisies </h4>
          <p> Dans cette section, l'enseignant peut accéder aux UEs choisies par l'étudiant dont les couleurs correspondent 
            à l'état déclaré par l'étudiant (validé, non validé, en difficulté). Il peut en outre accéder au commentaire 
            laissé par l'étudiant au survol de l'UE. </p>
        </div>
        <div className="part" style={{ marginLeft: '30px', marginTop: '20px' }}>
          <h4> 3.2 Commentaires </h4>
          <p>
            {' '}
                        Dans cette section, l'enseignant peut accéder au commentaire général sur le
                        contrat saisi par l'étudiant. Il peut également saisir ou modifier son
                        propre commentaire
          </p>
        </div>
        <div className="part" style={{ marginLeft: '30px', marginTop: '20px' }}>
          <h4> 3.3 Engagements </h4>
          <p>
            {' '}
                        Dans cette section, l'enseignant pourra accéder à la liste des compte-rendus
                        des entretiens saisis par l'étudiants. Il peut également saisir sa réaction
                        aux engagements de l'étudiant(approbation, information complémentaire
                        etc...)
          </p>
        </div>
        <div className="part" style={{ marginLeft: '30px', marginTop: '20px' }}>
          <h4> 3.4 Reflexions </h4>
          <p>
            {' '}
                        Dans cette section, l'enseignant pourra accéder à la liste des compte-rendus
                        des entretiens avec d'autres intervenants saisis par l'étudiants. Il peut
                        également saisir sa réaction aux engagements de l'étudiant(approbation,
                        information complémentaire etc...)
          </p>
        </div>
        <img src={img5} alt=" " style={{ height: '250px', margin: '20px auto' }} />
      </div>
    );
  }
}

export default Info;
