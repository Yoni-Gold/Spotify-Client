import React, {useEffect , useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

var mixpanel = require('mixpanel-browser');
mixpanel.init("bd331ef60a5a72628e03642f5da49901");

function SongsHome()
{
    const [songList , setSongs] = useState([{id: null , name: null, youtube_link: ""}]);

    useEffect(() => {getSongInfo(); mixpanel.track("Entered Songs Home Page");} , []);
    
    const getSongInfo = async () => {
        const songs = await axios.get(`http://localhost:3001/songs`).then(r => r.data);
        setSongs(songs);
    };

    const searchSongs = async (e) => {
        const songs = await axios.get(`http://localhost:3001/songs?search=${e.target.value}`).then(r => r.data);
        setSongs(songs);
    };

    return (<>
        <input id="searchSongs" type="text" onChange={searchSongs} autoComplete="off" placeholder="Search a song"/>
        <div id="songshome">
            {songList.map(e => <Link key={e.id} to={`/songs/${e.id}`}><div id="crouselItem" style={{backgroundImage: e.youtube_link ? `url(https://img.youtube.com/vi/${e.youtube_link.slice(30)}/default.jpg)` : null,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'}}>{e.name}</div></Link>)}
        </div></>
    );
}

export default SongsHome;