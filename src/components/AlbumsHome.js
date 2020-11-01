import React, {useEffect , useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

var mixpanel = require('mixpanel-browser');
mixpanel.init("bd331ef60a5a72628e03642f5da49901");

function AlbumsHome()
{
    const [albumList , setAlbums] = useState([{id: null , name: null}]);

    useEffect(() => {getAlbums(); mixpanel.track("Entered Albums Home Page");} , []);
    
    const getAlbums = async () => {
        const albums = await axios.get(`http://localhost:3001/albums`).then(r => r.data);
        setAlbums(albums);
    };

    const searchAlbums = async (e) => {
        const albums = await axios.get(`http://localhost:3001/albums?search=${e.target.value}`).then(r => r.data);
        setAlbums(albums);
    };

    return (<>
        <input id="searchSongs" type="text" onChange={searchAlbums} autoComplete="off" placeholder="Search an album"/>
        <div id="songshome">
            {albumList.map(e => <Link key={e.id} to={`/albums/${e.id}`}><div id="crouselItem" style={{backgroundImage: `url(${e.cover_image})`,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'}}>{e.name}</div></Link>)}
        </div></>
    );
}

export default AlbumsHome;