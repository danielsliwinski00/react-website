import './assets/stylesheet.css';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { withRouter } from "./withRouter";
const localIP = '192.168.1.102';
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
      `http://${localIP}:3001/characterdata`,
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

  getCharacterImage = async (e) => {
    return fetch(
      `http://${localIP}:3001/characterdpicture/` + e,
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
              <th className='CharacterIcon' onClick={() => { this.SortTable('Name') }}>Character</th>
              <th className='Name' onClick={() => { this.SortTable('Name') }}></th>
              <th className='PathIcon'></th>
              <th className='Path' onClick={() => { this.SortTable('Path') }}>Path</th>
              <th className='ElementIcon'></th>
              <th className='Element' onClick={() => { this.SortTable('Element') }}>Element</th>
            </tr>
          </thead>
          <tbody>
            {this.state.arrayData.map((item) => {
              return (
                <tr className='tableRow' key={item.id} onClick={() => { this.props.navigate(`/characterdetails/` + item.name) }}>
                  <td>
                    <img
                      src={`http://${localIP}:3001/characterpicture/` + item.name}
                      className='characterIcon'
                      alt={'character icon for ' + item.name}
                    />
                  </td>
                  <td className='Name'>{item.name}</td>
                  <td>
                    <img
                      src={`http://${localIP}:3001/characterpicture/` + item.path}
                      className='pathIcon'
                      alt={'path icon for ' + item.path}
                    />
                  </td>
                  <td className='Path'>{item.path}</td>
                  <td>
                    <img
                      src={`http://${localIP}:3001/characterpicture/` + item.element}
                      className='elementIcon'
                      alt={'element icon for ' + item.element}
                    />
                  </td>
                  <td className='Element'>{item.element}</td>
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
            <a className='currentWebsite' onClick={() => { this.props.navigate('/characters') }}>Characters</a>
          </div>
          {this.Table()}
        </div>
      </div>
    );
  }
}

export default withRouter(CharacterView);

//<a onClick={() => { this.props.navigate('/input') }}>Input</a>