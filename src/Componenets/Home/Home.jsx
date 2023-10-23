import React from 'react';
import Navarea from '../Navbar/Navbar';
import Header from '../Header/Header';
import List from '../List/List';
import Footer from '../Footer/Footer';

function Home(props) {
     console.log(props.searchInput)
    
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