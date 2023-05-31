import { useState } from 'react';
import './assets/stylesheet.css';
import { useNavigate, useParams } from "react-router-dom";
const localIP = '192.168.1.102';

const Home = () => {
    const navigate = useNavigate();
    let props = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    async function GetCharacterData() {
        return fetch(
            `http://${localIP}:3001/characterdata/${props.character}`,
            {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => {
                return response.json();
            })
            .then((resJson) => {
                setData(resJson.rows[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.log('here f');
                console.log(error);
            });
    }

    GetCharacterData()

    if (loading) {
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
                    <div>
                        loading...
                    </div>
                </div>
            </div>
        );
    }
    else {
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
                    <h className='characterName'>{data.name}</h>
                    <div className='characterDetailsTable'>
                        <div className='characterIcon'>
                            <img
                                src={`http://${localIP}:3001/characterpicture/` + data.name}
                                className='characterIcon'
                                alt={'character icon for ' + data.name}
                            />
                        </div>
                        <div className='characterDetails'>
                            <div className='Path'>
                                <img
                                    src={`http://${localIP}:3001/characterpicture/` + data.path}
                                    className='pathIcon'
                                    alt={'path icon for ' + data.path}
                                />
                                <span>{data.path}</span>
                            </div>
                            <div className='Element'>
                                <img
                                    src={`http://${localIP}:3001/characterpicture/` + data.element}
                                    className='elementIcon'
                                    alt={'element icon for ' + data.element}
                                />
                                {data.element}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;