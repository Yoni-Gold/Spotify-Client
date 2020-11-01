import React, {useEffect , useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

var mixpanel = require('mixpanel-browser');
mixpanel.init("bd331ef60a5a72628e03642f5da49901");

function PlaylistsHome()
{
    const [playlistList , setPlaylists] = useState([{id: null , name: null}]);

    useEffect(() => {getPlaylists(); mixpanel.track("Entered Playlists Home Page");} , []);
    
    const getPlaylists = async () => {
        const playlists = await axios.get(`http://localhost:3001/playlists`).then(r => r.data);
        setPlaylists(playlists);
    };

    const searchPlaylists = async (e) => {
        const playlists = await axios.get(`http://localhost:3001/playlists?search=${e.target.value}`).then(r => r.data);
        setPlaylists(playlists);
    };

    return (<>
        <input id="searchSongs" type="text" onChange={searchPlaylists} autoComplete="off" placeholder="Search a playlist"/>
        <div id="songshome">
            {playlistList.map(e => <Link key={e.id} to={`/playlists/${e.id}`}><div id="crouselItem" style={{backgroundImage: `url(${e.cover_image})`,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'}}>{e.name}</div></Link>)}
        </div></>
    );
}

export default PlaylistsHome;