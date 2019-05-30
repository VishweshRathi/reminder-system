import React, { Component } from 'react';
import Aux from '../../../hoc/Aux'
import { Link } from 'react-router-dom'
// import classes from './Header.css'
// import logo from '../../../public/images/logo_dia.png'
class Header extends Component {
    render() {
        return (
            <Aux>
                <nav className="navbar navbar-inverse navbar-static-top">
                    <div className="container">
                        <button type="button"
                            className="navbar-toggle"
                            data-toggle="collapse"
                            data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to={'/home'}>DIAGNOCARE ENTERPRISES</Link>
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to={'/home'}>Home</Link></li>
                                <li><Link to={'/add_reminder'}>Add reminder</Link></li>                            
                                <li><Link to={'/show_reminder'}>Show reminders</Link></li>                            
                                <li><Link to={'/today_reminders'}>Today's Reminder</Link></li>                            
                                <li ><Link to={'/contactus'}>Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </Aux >
        );
    };

}

export default Header