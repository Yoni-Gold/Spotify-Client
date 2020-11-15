import React from 'react';
import {NavLink} from 'react-router-dom';

function NavBar()
{
    return (
        <div id="top-menu">
        <NavLink activeStyle={{color: 'white'}} to="/songs"><div>songs</div></NavLink>
        <NavLink activeStyle={{color: 'white'}} to="/playlists"><div>playlists</div></NavLink>
        <NavLink activeStyle={{color: 'white'}} to="/artists"><div>artists</div></NavLink>
        <NavLink activeStyle={{color: 'white'}} to="/albums"><div>albums</div></NavLink>
        <NavLink activeStyle={{color: 'white'}} to="/elastic"><div>search</div></NavLink>
        </div>
    );
}

export default NavBar;