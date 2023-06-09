import { useEffect, useState } from 'react';
import './assets/stylesheet.css';
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion"
const localIP = '192.168.1.102';

const Home = () => {
    const navigate = useNavigate();
    let props = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isMediaWide, setIsMediaWide] = useState(false);
    const [isMediaTall, setIsMediaTall] = useState(true);

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
                console.log(isMediaWide)
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
                        <a onClick={() => { navigate('/characters') }}>Characters</a>
                    </div>
                    <motion.h
                        className='characterName'
                        initial={{ opacity: 1, x: '0%', y: '0%' }}
                        animate={isOpen ? { translateX: '-25vw' } : { opacity: 1 }}
                        transition={{
                            duration: 0.6,
                            bounce: 0
                        }}
                    >
                        {data.name}
                    </motion.h>
                    <motion.div
                        className='characterDetails'
                    >
                        <div className='splashArt'>
                            <motion.img
                                src={`http://${localIP}:3001/charactersplash/` + data.name}
                                className='splashart'
                                alt={'splash art for ' + data.element}

                                initial={{ opacity: 1 }}
                                animate={isOpen ? {
                                    opacity: 0,
                                    y: -100,
                                } : {
                                    opacity: 1,
                                }}
                                transition={{
                                    duration: 0.4,
                                    bounce: 0
                                }}
                            />
                            <span>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 1 }}
                                    initial={{ opacity: 1 }}
                                    animate={isOpen ? isMediaWide ? {
                                       y: '-35vh'
                                    } : {
                                        translateY: '-110vw',
                                        translateX: '+70%'
                                    } 
                                    : {

                                    }}
                                    transition={{
                                        duration: 0.6,
                                        bounce: 0
                                    }}
                                >
                                    <a
                                        className='detailsButton'
                                        onClick={() => { setIsOpen(!isOpen) }}
                                    >
                                        {isOpen ? 'View Splash Art' : 'View Details'}
                                    </a>
                                </motion.div>
                            </span>
                        </div>
                    </motion.div>
                    <motion.div
                        className='characterDetailsTable'
                        initial={{ opacity: 0 }}
                        animate={isOpen ? {
                            opacity: 1,
                            translateY: '-100vw',
                        } : {
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.6,
                            bounce: 0
                        }}
                    >
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
                    </motion.div>
                </div>
            </div>
        );
    }
}

export default Home;