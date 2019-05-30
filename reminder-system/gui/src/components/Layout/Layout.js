import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Header from './Header/Header'
import Footer from './Footer/Footer'
// import classes from './Layout.css'
// import logo from '../../../public/images/logo_dia.png'
class Layout extends Component {
    render() {
        return (
            <Aux>
                <Header/>
                <main style={{margin: "2em 0 10em"}}>
                    {this.props.children}
                </main>
                <Footer/>
            </Aux >
        );
    };

}

export default Layout