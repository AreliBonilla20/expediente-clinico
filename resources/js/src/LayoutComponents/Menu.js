import React from 'react';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import logo from '../../../../public/assets/images/logo/logo.png'


const Menu = () => {
    return(
        <div id="sidebar" className="active">
        <div className="sidebar-wrapper active">
            <div className="sidebar-header">
                <div className="d-flex justify-content-between">
                    <div className="logo">
                        <Link to="/"><img src={logo} alt="Logo" srcSet="" /></Link>
                    </div>
                    <div className="toggler">
                        <a href="#" className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></a>
                    </div>
                </div>
            </div>
            <div className="sidebar-menu">
                <ul className="menu">
                    <li className="sidebar-title">Menu</li>
                    
                    <li className="sidebar-item has-sub">
                        <a href="" className='sidebar-link'>
                            <i className="bi bi-grid-1x2-fill"></i>
                            <span>Expedientes</span>
                        </a>
                        <ul className="submenu">
                            <li className="submenu-item ">
                                <Link to="/expedientes">Consultar</Link>
                            </li>
                            <li className="submenu-item ">
                                <Link to="/expedientes/crear">Agregar expediente</Link>
                            </li>
                        </ul>
                    </li>

                    <li className="sidebar-item has-sub">
                        <a href="" className='sidebar-link'>
                            <i className="bi bi-grid-1x2-fill"></i>
                            <span>Diagnósticos</span>
                        </a>
                        <ul className="submenu">
                            <li className="submenu-item ">
                                <Link to="/diagnosticos">Consultar</Link>
                            </li>
                            <li className="submenu-item ">
                                <Link to="/diagnosticos/crear">Agregar diagnóstico</Link>
                            </li>
                        </ul>
                    </li>

                    
                    <li className="sidebar-title">Forms &amp; Tables</li>

                    

                </ul>
            </div>
            <button className="sidebar-toggler btn x"><i data-feather="x"></i></button>
        </div>
    </div>
    );
}

export default Menu;