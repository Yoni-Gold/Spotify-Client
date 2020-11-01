import React, {useEffect , useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function PlaylistPage({ match })
{
    const [playlistInfo , setPlaylist] = useState([{id: null, name: null, cover_image: "/"}]);
    const [playlistUser , setUser] = useState([{id: null, name: null}]);
    const [playlistSongs , setSongs] = useState([{id: null, name: null}]);

    useEffect(() => {getPlaylistInfo();} , []);

    const getPlaylistInfo = async () => {
        const playlist = await axios.get(`http://localhost:3001/playlists/${match.params.id}`).then(r => r.data[0]);
        setPlaylist(playlist);
        const user = await axios.get(`http://localhost:3001/users/${playlist.user_id}`).then(r => r.data[0]);
        setUser(user);
        const songs = await axios.get(`http://localhost:3001/playlistSongs/${playlist.id}`).then(r => r.data);
        setSongs(songs);
    };

    return (
        <div id="playlistpage">
        <div id="playlistName">{playlistInfo.name}</div>
        <div id="artistcover" style={{backgroundImage: `url(${playlistInfo.cover_image})`,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'}}></div>
        <div id="playlistName">Playlist by {playlistUser ? playlistUser.name : "Spoti4s"}</div>
        <ul>{playlistSongs.map(e => <li key={e.id}><Link key={e.id} to={`/songs/${e.song_id}?ply=${playlistInfo.id}`}>{e.name}</Link></li>)}</ul>
        </div>
        );
}

export default PlaylistPage;