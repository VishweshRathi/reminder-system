import React, { Component } from 'react';
import Aux from '../../../hoc/Aux'
// import { Link } from 'react-router-dom'
// import classes from './Footer.css'
class Footer extends Component {
    render() {
        return (
            <Aux>
                <nav className="navbar navbar-inverse navbar-fixed-bottom">
                    <div className="container">
                        <div className="navbar-text pull-left">
                            <p>Copyright Diagnocare Enterprises 2019</p>
                        </div>
                    </div>
                </nav>
            </Aux >
        );
    };
}

export default Footer