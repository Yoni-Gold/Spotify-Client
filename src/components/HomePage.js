import React, {useEffect , useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Carousel from "react-elastic-carousel";

function HomePage()
{
    const [topArtists , setArtists] = useState([]);
    const [topAlbums , setAlbums] = useState([]);
    const [topPlaylists , setPlaylists] = useState([]);
    const [topSongs , setSongs] = useState([]);

    const breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 2 },
      { width: 768, itemsToShow: 3 },
      { width: 1200, itemsToShow: 4 }
    ];

    useEffect(() => {getInfo();} , []);
    
    const getInfo = async () => {
      await axios.get(`http://localhost:3001/artist/top`).then(r => setArtists(r.data));
      await axios.get(`http://localhost:3001/album/top`).then(r => setAlbums(r.data));
      await axios.get(`http://localhost:3001/playlist/top`).then(r => setPlaylists(r.data));
    };

    return (<>
    <h2>• Artists •</h2>
    <div className="carousel" style={{width: '1000px'}}>
      <Carousel breakPoints={breakPoints}>
        {topArtists.map(e => <Link key={e.id} to={`/artists/${e.id}`}><div id="crouselItem" style={{backgroundImage: `url(${e.cover_image})`,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'}}>{e.name}</div></Link>)}
      </Carousel>
    </div><hr/>

    <h2>• Albums •</h2>
    <div className="carousel" style={{width: '1000px'}}>
      <Carousel breakPoints={breakPoints}>
        {topAlbums.map(e => <Link key={e.id} to={`/albums/${e.id}`}><div id="crouselItem" style={{backgroundImage: `url(${e.cover_image})`,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'}}>{e.name}</div></Link>)}
      </Carousel>
    </div><hr/>

    <h2>• Playlists •</h2>
    <div className="carousel" style={{width: '1000px'}}>
      <Carousel breakPoints={breakPoints}>
        {topPlaylists.map(e => <Link key={e.id} to={`/playlists/${e.id}`}><div id="crouselItem" style={{backgroundImage: `url(${e.cover_image})`,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'}}>{e.name}</div></Link>)}
      </Carousel>
    </div><hr/>

    </>);
}

export default HomePage;