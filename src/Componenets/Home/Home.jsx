import React from 'react';
import Navarea from '../Navbar/Navbar';
import Header from '../Header/Header';
import List from '../List/List';

function Home(props) {
    return (
        <div>
            
            <Navarea/>
            <Header/>
            <List/>
        </div>
    );
}

export default Home;