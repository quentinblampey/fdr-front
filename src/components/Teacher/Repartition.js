import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import FooterStop from './FooterStop'
import { Link } from 'react-router-dom';
import url from '../../config';
import './Repartition.scss';

class Repartition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [
        { field: 'motivation', title: 'Motivation', repartition: [] },
        { field: 'lifestyle', title: 'Lifestyle', repartition: [] },
    {field:'fidelity',title: 'Fidelite', repartition:[]}, 
    {field:'noOrientation',title: 'Besoin de réorientation', repartition:[]},
    {field:'integration',title: 'Intégration', repartition:[]}]};
  }

  componentDidMount() {
      for (let i = 0; i < this.state.fields.length; i++){
        let field=this.state.fields[i];
        console.log('heyo');
        axios.post(url+'/api/stats/global', {field:field.field})
            // eslint-disable-next-line no-loop-func
            .then(res => {
                console.log(res.data);
                let fields = this.state.fields;
                fields[i].repartition=res.data;
                this.setState({fields:fields});
            });
      }
  }

  render() {
    let classes = ["progress-bar bg-danger", "progress-bar bg-warning", "progress-bar bg-success"]
    return (
        <div>
        {this.state.fields.map((f, i) =>
            <Link to={`enseignant/filter/${f.field}`}>
              <div key={i} className='fieldState'>
                  <h3 key={i+1}>{f.title}</h3>
                  <div key={(10*i).toString()} className="progress" style={{height:'20px', width:'90%', margin:'10px auto', borderRadius:'10px'}}>
                      {f.repartition.map((r, j) => 
                          <div key={(10*i+j+1).toString()} className={classes[j]} role="progressbar" style={{width: `${r}%`}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                      )}
                  </div>
              </div>
            </Link>
        )}
        </div>
        
    )

  }
}

export default Repartition;