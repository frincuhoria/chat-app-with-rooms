import React, {useState,useRef,useEffect} from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

import './Join.css';

const Join = () => {
    const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null)
    
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');

    useEffect(() => {
        if (!vantaEffect && process.browser) {
          window.THREE = THREE
          setVantaEffect(NET({
            el: myRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x3f7e8,
            backgroundColor: 0x2c135f,
            points: 15.00,
            maxDistance: 24.00,
            spacing: 16.00,
            THREE: window.THREE // use a custom THREE when initializing
          }))
        }
        return () => {
          if (vantaEffect) vantaEffect.destroy()
        }
      }, [vantaEffect])


    return (
        <div className="joinOuterContainer" ref={myRef}>
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="username" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button green mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;