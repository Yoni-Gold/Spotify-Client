import axios from 'axios';
import React, {useEffect , useState} from 'react';
import {Link} from 'react-router-dom';

function ElasticSearch() 
{
    const [search , setSearch] = useState(null);
    const [songList , setSongs] = useState([]);
    const [artistList , setArtists] = useState([]);
    const [albumList , setAlbums] = useState([]);
    const [playlistList , setPlaylists] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/elastic/songs/${search}`).then(r => r.data).then(r => setSongs(r));
        axios.get(`http://localhost:3001/elastic/artists/${search}`).then(r => r.data).then(r => setArtists(r));
        axios.get(`http://localhost:3001/elastic/albums/${search}`).then(r => r.data).then(r => setAlbums(r));
        axios.get(`http://localhost:3001/elastic/playlists/${search}`).then(r => r.data).then(r => setPlaylists(r));
    } , [search]);

    return (<div>
        <input type='text' onChange={({ target: { value } }) => {value !== '' && setSearch(value)}}></input>
        <div>
        {songList.length > 0 && <div class='searchTitle'>Songs</div>}
        {songList && songList.map(e => <Link key={e.id} to={`/songs/${e._source.id}`}><div class="elasticItem"><span class='smallIcon' style={{backgroundImage: `url(https://img.youtube.com/vi/${e._source.link.slice(30)}/default.jpg)`,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'}}></span>{e._source.name}</div></Link>)}
        {albumList.length > 0 && <div class='searchTitle'>Albums</div>}
        {albumList && albumList.map(e => <Link key={e.id} to={`/albums/${e._source.id}`}><div class="elasticItem"><span class='smallIcon' style={{backgroundImage: `url(${e._source.link})`,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'}}></span>{e._source.name}</div></Link>)}
        {artistList.length > 0 && <div class='searchTitle'>Artists</div>}
        {artistList && artistList.map(e => <Link key={e.id} to={`/artists/${e._source.id}`}><div class="elasticItem"><span class='smallIcon' style={{backgroundImage: `url(${e._source.link})`,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'}}></span>{e._source.name}</div></Link>)}
        {playlistList.length > 0 && <div class='searchTitle'>Playlists</div>}
        {playlistList && playlistList.map(e => <Link key={e.id} to={`/playlists/${e._source.id}`}><div class="elasticItem"><span class='smallIcon' style={{backgroundImage: `url(${e._source.link})`,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'}}></span>{e._source.name}</div></Link>)}
    </div></div>);
}

export default ElasticSearch;