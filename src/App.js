import React from 'react';
import './App.css';
import {BrowserRouter as Router , Switch , Route , Link} from 'react-router-dom';
import NavBar from './components/NavBar';
import SongPage from './components/SongPage';
import ArtistPage from './components/ArtistPage';
import AlbumPage from './components/AlbumPage';
import PlaylistPage from './components/PlaylistPage';
import HomePage from './components/HomePage';
import SongsHome from './components/SongsHome';
import ArtistsHome from './components/ArtistsHome';
import AlbumsHome from './components/AlbumsHome';
import PlaylistsHome from './components/PlaylistsHome';


function App() {
  return (
    <Router>
    <div className="App">
    <div id="header"><Link to="/"><h1><span id="logo"> {'{'}{'}'} </span>Spoti<span id="num">4</span>s<span id="tm">TM</span></h1></Link></div>
    <NavBar />
    <div id="main">
    <Switch>
    <Route path="/" exact component={HomePage}/>
    <Route path="/songs">
      <Route path="/songs" exact component={SongsHome}/>
  <Route path="/songs/:id" render={(props) => (<SongPage key={props.match.params.id} {...props} />)}/>
    </Route>
    <Route path="/playlists">
      <Route path="/playlists" exact component={PlaylistsHome}/>
      <Route path="/playlists/:id" component={PlaylistPage}/>
    </Route>
    <Route path="/artists">
      <Route path="/artists" exact component={ArtistsHome}/>
      <Route path="/artists/:id" component={ArtistPage}/>
    </Route>
    <Route path="/albums">
      <Route path="/albums" exact component={AlbumsHome}/>
      <Route path="/albums/:id" component={AlbumPage}/>
    </Route>
    <Route><div id="notfound">404 page not found</div></Route>
    </Switch>
    </div>
    </div>
    </Router>
  );
}

export default App;
