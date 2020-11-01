import React, {useEffect , useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Carousel from "react-elastic-carousel";

function ArtistPage({ match })
{
    const [artistInfo , setArtist] = useState([{id: null , name: null , cover_image: "/"}]);
    const [artistAlbums, setAlbums] = useState([{id: null , name: "" ,  cover_image: "/"}]);
    const [artistSongs, setSongs] = useState([{id: null , name: "" ,  youtube_link: "/"}]);

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
      ];

    useEffect(() => {getArtistInfo();} , []);

    const getArtistInfo = async () => {
        const artist = await axios.get(`http://localhost:3001/artists/${match.params.id}`).then(r => r.data);
        setArtist(artist);
        const albums = await axios.get(`http://localhost:3001/albums/artist/${match.params.id}`).then(r => r.data);
        setAlbums(albums);
        const songs = await axios.get(`http://localhost:3001/songs/artist/${match.params.id}`).then(r => r.data);
        setSongs(songs);
    };

    return (<>
    <div id="artistpage">
    <div id="artistcover" style={{backgroundImage: `url(${artistInfo[0].cover_image})`,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'}}></div>
    <div id="artistName">{artistInfo[0].name}</div>
    <ul>{artistAlbums.map(e => <li key={e.id}><Link key={e.id} to={`/albums/${e.id}`}><img src={e.cover_image} style={{width: '50px' , height: '50px' , margin: '10px'}}></img>{e.name}</Link></li>)}</ul>
    </div>

<hr/>
<div id="queryTitle">Songs by the artist</div>
<div className="carousel" style={{width: '1000px'}}>
<Carousel breakPoints={breakPoints}>
{artistSongs.map(e => <Link key={e.id} to={`/songs/${e.id}`}><div id="crouselItem" style={{backgroundImage: e.youtube_link ? `url(https://img.youtube.com/vi/${e.youtube_link.slice(30)}/default.jpg)` : null,
         backgroundPosition: 'center',
         backgroundSize: 'cover',
         backgroundRepeat: 'no-repeat'}}>{e.name}</div></Link>)}
</Carousel>
</div></>
    );
}

export default ArtistPage;