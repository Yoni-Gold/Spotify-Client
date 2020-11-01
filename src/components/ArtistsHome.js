import React, {useEffect , useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

var mixpanel = require('mixpanel-browser');
mixpanel.init("bd331ef60a5a72628e03642f5da49901");

function ArtistsHome()
{
    const [artistList , setArtists] = useState([{id: null , name: null}]);

    useEffect(() => {getArtists(); mixpanel.track("Entered Artists Home Page");} , []);
    
    const getArtists = async () => {
        const artists = await axios.get(`http://localhost:3001/artists`).then(r => r.data);
        setArtists(artists);
    };

    const searchArtists = async (e) => {
        const artists = await axios.get(`http://localhost:3001/artists?search=${e.target.value}`).then(r => r.data);
        setArtists(artists);
    };

    return (<>
        <input id="searchSongs" type="text" onChange={searchArtists} autoComplete="off" placeholder="Search an artist"/>
        <div id="songshome">
            {artistList.map(e => <Link key={e.id} to={`/artists/${e.id}`}><div id="crouselItem" style={{backgroundImage: `url(${e.cover_image})`,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'}}>{e.name}</div></Link>)}
        </div></>
    );
}

export default ArtistsHome;