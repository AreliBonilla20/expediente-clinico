import React from 'react';

import logo from '../../../public/assets/images/logo/logo.jpg'; 

function Menu() {
    return (
        <div id="sidebar" className="active">
        <div className="sidebar-wrapper active">
            <div className="sidebar-header">
                <div className="d-flex justify-content-between">
                    <div className="logo">
                        <a href="index.html"><img src={logo} alt="Logo" srcSet="" width="250" height="200"/></a>
                    </div>
                    <div className="toggler">
                        <a href="#" className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></a>
                    </div>
                </div>
            </div>
            <div className="sidebar-menu">
                <ul className="menu">
                    <li className="sidebar-title">Menu</li>

                    <li className="sidebar-item  ">
                        <a href="index.html" className='sidebar-link'>
                            <i className="bi bi-grid-fill"></i>
                            <span>Inicio</span>
                        </a>
                    </li>

                    <li className="sidebar-item  has-sub">
                        <a href="#" className='sidebar-link'>
                            <i className="bi bi-stack"></i>
                            <span>Expedientes</span>
                        </a>
                        <ul className="submenu ">
                            <li className="submenu-item ">
                                <a href="component-alert.html">Consultar</a>
                            </li>
                            <li className="submenu-item ">
                                <a href="component-badge.html">Crear expediente</a>
                            </li>
                        </ul>
                    </li>

                    <li className="sidebar-item  has-sub">
                        <a href="#" className='sidebar-link'>
                            <i className="bi bi-stack"></i>
                            <span>Usuarios</span>
                        </a>
                        <ul className="submenu ">
                            <li className="submenu-item ">
                                <a href="component-alert.html">Consultar</a>
                            </li>
                            <li className="submenu-item ">
                                <a href="component-badge.html">Crear usuario</a>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
            <button className="sidebar-toggler btn x"><i data-feather="x"></i></button>
        </div>
    </div>
    );
}

export default Menu;