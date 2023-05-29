import './assets/stylesheet.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function DataInput() {

  const [name, setName] = useState('');
  const [path, setPath] = useState('Destruction');
  const [element, setElement] = useState('Physical');

  var data = {
    'name': name,
    'path': path,
    'element': element,
  }

  async function handleForm() {
    console.log(name, path, element)
    //console.log(data)
    return fetch(
      'http://localhost:3001/characterdata',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data
        }),
      })
      .then((response) => {
        console.log('here')
        console.log(response)
      })
      .catch((error) => {
        console.log('here')
        console.log(error);
      });
  }

  return (
    <>
      <div className='form'>
        <label className='charName'>
          Character Name:
          <input name='charactername' className='nameInput' value={name} onChange={e => setName(e.target.value)} />
        </label>
        <hr />
        <div className='formOptions'>
          <div className='path'>
            <p>
              Character Path:<br />
              <label>
                <input
                  type="radio"
                  name="path"
                  value="Destruction"
                  defaultChecked={true}
                  onChange={e => setPath(e.target.value)}
                />
                Destruction
              </label><br />
              <label>
                <input
                  type="radio"
                  name="path"
                  value="The Hunt"
                  onChange={e => setPath(e.target.value)}
                />
                The Hunt
              </label><br />
              <label>
                <input
                  type="radio"
                  name="path"
                  value="Erudition"
                  onChange={e => setPath(e.target.value)}
                />
                Erudition
              </label><br />
              <label>
                <input
                  type="radio"
                  name="path"
                  value="Harmony"
                  onChange={e => setPath(e.target.value)}
                />
                Harmony
              </label><br />
              <label>
                <input
                  type="radio"
                  name="path"
                  value="Nihility"
                  onChange={e => setPath(e.target.value)}
                />
                Nihility
              </label><br />
              <label>
                <input
                  type="radio"
                  name="path"
                  value="Preservation"
                  onChange={e => setPath(e.target.value)}
                />
                Preservation
              </label><br />
              <label>
                <input
                  type="radio"
                  name="path"
                  value="Abundance"
                  onChange={e => setPath(e.target.value)}
                />
                Abundance
              </label>
            </p>
          </div>
          <hr />
          <div className='element'>
            <p>
              Character Element:<br />
              <label>
                <input
                  type="radio"
                  name="element"
                  value="Physical"
                  defaultChecked={true}
                  onChange={e => setElement(e.target.value)}
                />
                Physical
              </label><br />
              <label>
                <input
                  type="radio"
                  name="element"
                  value="Fire"
                  onChange={e => setElement(e.target.value)}
                />
                Fire
              </label><br />
              <label>
                <input
                  type="radio"
                  name="element"
                  value="Ice"
                  onChange={e => setElement(e.target.value)}
                />
                Ice
              </label><br />
              <label>
                <input
                  type="radio"
                  name="element"
                  value="Lightning"
                  onChange={e => setElement(e.target.value)}
                />
                Lightning
              </label><br />
              <label>
                <input
                  type="radio"
                  name="element"
                  value="Wind"
                  onChange={e => setElement(e.target.value)}
                />
                Wind
              </label><br />
              <label>
                <input
                  type="radio"
                  name="element"
                  value="Quantum"
                  onChange={e => setElement(e.target.value)}
                />
                Quantum
              </label><br />
              <label>
                <input
                  type="radio"
                  name="element"
                  value="Imaginary"
                  onChange={e => setElement(e.target.value)}
                />
                Imaginary
              </label>
            </p>
          </div>
        </div>
        <hr />
        <div className='submitButtonDiv'>
          <button type="submit" className='submitButton' onClick={() => { handleForm() }}>Submit Character Data</button>
        </div>
      </div>
    </>
  );
}

function DataInputScreen() {

  const navigate = useNavigate();

  return (
    <div>
      <header className="header">
      </header>
      <div className="body">
      <div className="navigation">
          <a onClick={() => { navigate('/home') }}>Home</a>
          <a className='currentWebsite' onClick={() => { navigate('/input') }}>Input</a>
          <a onClick={() => { navigate('/characters') }}>Characters</a>
        </div>
        {DataInput()}
      </div>
    </div>
  );
}

export default DataInputScreen;
