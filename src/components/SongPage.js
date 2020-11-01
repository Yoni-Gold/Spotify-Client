import React, {useEffect , useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Carousel from "react-elastic-carousel";

var mixpanel = require('mixpanel-browser');
mixpanel.init("bd331ef60a5a72628e03642f5da49901");

function SongPage({match ,location})
{
    const [songInfo , setSong] = useState([{youtube_link: "", name: null, artist_id: null}]);
    const [songArtist , setArtist] = useState([{id: "" , name: ""}]);
    const [queryInfo , setQuery] = useState([{id: "" , name: ""}]);
    const [queryTitle , setTitle] = useState("");

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
      ];
  

    useEffect(() => {getSongInfo();} , []);
    
    const getSongInfo = async () => {
        const song = await axios.get(`http://localhost:3001/songs/${match.params.id}`).then(r => r.data[0]);
        setSong(song);
        const artist = await axios.get(`http://localhost:3001/artists/${song.artist_id}`).then(r => r.data[0]);
        setArtist(artist);

        mixpanel.track(`Played ${song.name} by ${artist.name}`);

        if (location.search)
        {
            if (location.search.slice(1,4) === 'alb')
            {
                const info = await axios.get(`http://localhost:3001/songs/album/${location.search.slice(5)}`).then(r => r.data);
                setQuery(info);
                setTitle("More from this album");
            }

           else if (location.search.slice(1,4) === 'ply')
            {
                const info = await axios.get(`http://localhost:3001/playlistSongs/${location.search.slice(5)}`).then(r => r.data);
                setQuery(info);
                setTitle("More from this playlist");
            }
            else
            {
                const info = await axios.get(`http://localhost:3001/songs/artist/${song.artist_id}`).then(r => r.data);
                setQuery(info);
                setTitle('More from this artist');
            }
        }
        else
        {
            const info = await axios.get(`http://localhost:3001/songs/artist/${song.artist_id}`).then(r => r.data);
            setQuery(info);
            setTitle('More from this artist');
        }
    };

    return (<>
        <div id="songpage">
            <span id="songName">{songInfo.name}<Link to={`/artists/${songArtist.id}`}> • {songArtist.name}</Link></span><br/>
            <iframe width="560" height="315" frameBorder="0" src={songInfo.youtube_link}></iframe>
       
       <div className="carousel" style={{width: '1000px'}}>
        <hr/>
        <div id="queryTitle">{queryTitle}</div>
      <Carousel breakPoints={breakPoints}>
        {queryInfo.map(e => <Link key={e.id} to={`/songs/${e.id}${location.search}`}><div id="crouselItem" style={{backgroundImage: e.youtube_link ? `url(https://img.youtube.com/vi/${e.youtube_link.slice(30)}/default.jpg)` : null,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'}}>{e.name}</div></Link>)}
      </Carousel>
        </div>
        </div>
        </>
    );
}

export default SongPage;