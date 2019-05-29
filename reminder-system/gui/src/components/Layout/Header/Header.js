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
                                <li className="dropdown">
                                    <Link className="dropdown-toggle" data-toggle="dropdown" to={'/Product1'}>Product <b className="caret"></b></Link>
                                    <ul className="dropdown-menu">
                                        <li><Link to={'/biochemistry'}>Biochemistry</Link></li>
                                        <li><Link to={'/serology'}>Serology</Link></li>
                                        <li><Link to={'/rapid'}>Radip</Link></li>
                                        <li><Link to={'/monovail'}>Monovail</Link></li>
                                        <li><Link to={'/turbi_latex'}>Turbi Latex</Link></li>
                                        <li><Link to={'/coagulation'}>Coagulation</Link></li>
                                        <li><Link to={'/instruments'}>Instuments</Link></li>
                                    </ul>
                                </li>
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