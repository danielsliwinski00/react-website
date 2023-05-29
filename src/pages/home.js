import './assets/stylesheet.css';
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div>
      <header className="header">
      </header>
      <div className="body">
      <div className="navigation">
            <a className='currentWebsite' onClick={() => { navigate('/home') }}>Home</a>
            <a onClick={() => { navigate('/input') }}>Input</a>
            <a onClick={() => { navigate('/characters') }}>Characters</a>
          </div>
        <input type='button' className='submitButton' value='Input New Character Data' onClick={() => { navigate('/input') }} />
        <br/>
        <input type='button' className='submitButton' value='View Character Data' onClick={() => { navigate('/characters') }} />
      </div>
    </div>
  );
}

export default Home;