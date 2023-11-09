import React from 'react';
import Navarea from '../Navbar/Navbar';
import Header from '../Header/Header';
import List from '../List/List';
import Footer from '../Footer/Footer';

function Home(props) {
    
    return (
        <div>
            
            <Navarea/>
            <Header />
            <List/>
            <Footer/>
        </div>
    );
}

export default Home;