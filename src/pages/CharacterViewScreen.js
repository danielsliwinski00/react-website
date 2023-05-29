import './assets/stylesheet.css';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { withRouter } from "./withRouter";

//const navigate = useNavigate();

class CharacterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayData: [],
      isLoading: true,
    }
  }

  async GetCharacterData() {
    return fetch(
      'http://localhost:3001/characterdata',
      {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        return response.json();
      })
      .then((resJson) => {
        this.setState({
          arrayData: Object.entries(resJson)[0][1],
          isLoading: false
        })
      })
      .catch((error) => {
        console.log('here f');
        console.log(error);
      });
  }

  SortTable(sort) {
    let t = this.state.arrayData;

    if (sort === 'Name') {
      t.sort((a, b) => a.name > b.name ? 1 : -1)
    }
    else if (sort === 'Path') {
      t.sort((a, b) => a.path > b.path ? 1 : -1)
    }
    else {
      t.sort((a, b) => a.element > b.element ? 1 : -1)
    }
    this.setState({
      arrayData: t
    })
  }

  Table() {
    return (
      <>
        <table className='characterTable'>
          <thead>
            <tr>
              <th className='Name' onClick={() => { this.SortTable('Name') }}>Name</th>
              <th className='Path' onClick={() => { this.SortTable('Path') }}>Path</th>
              <th className='Element' onClick={() => { this.SortTable('Element') }}>Element</th>
            </tr>
          </thead>
          <tbody>
            {this.state.arrayData.map((item) => {
              return (
                <tr className='tableRow' key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.path}</td>
                  <td>{item.element}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    )
  }

  componentDidMount() {
    this.GetCharacterData();
  }

  render() {
    if (this.state.isLoading) {
      <div>
        <h>
          Loading
        </h>
      </div>
    }
    return (
      <div>
        <div className="body">
          <div className="navigation">
            <a onClick={() => { this.props.navigate('/home') }}>Home</a>
            <a onClick={() => { this.props.navigate('/input') }}>Input</a>
            <a className='currentWebsite' onClick={() => { this.props.navigate('/characters') }}>Characters</a>
          </div>
          {this.Table()}
        </div>
      </div>
    );
  }
}

export default withRouter(CharacterView);
