import React, {useEffect , useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function AlbumPage({ match })
{
    const [albumInfo , setAlbum] = useState([{id: null, name: null,cover_image: "/"}]);
    const [albumSongs, setSongs] = useState([{id: null , name: ""}]);
    const [albumArtist, setArtist] = useState([{id: null , name: ""}]);

    useEffect(() => {getAlbumInfo();} , []);

    const getAlbumInfo = async () => {
        const album = await axios.get(`http://localhost:3001/albums/${match.params.id}`).then(r => r.data[0]);
        setAlbum(album);
        const songs = await axios.get(`http://localhost:3001/songs/album/${match.params.id}`).then(r => r.data);
        setSongs(songs);
        const artist = await axios.get(`http://localhost:3001/artists/${album.artist_id}`).then(r => r.data[0]);
        setArtist(artist);
        console.log(artist);
    };

    return (
        <div id="albumpage">
        <div id="albumName">{albumInfo.name}</div>
        <div id="artistName">• <Link to={`/artists/${albumInfo.artist_id}`}>{albumArtist.name}</Link> •</div>
        <div id="albumcover" style={{backgroundImage: `url(${albumInfo.cover_image})`,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'}}></div>
        <ul>{albumSongs.map(e => <li key={e.id}><Link key={e.id} to={`/songs/${e.id}?alb=${albumInfo.id}`}>{e.name}</Link></li>)}</ul>
        </div>
        );
}

export default AlbumPage;