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
                            <span>Centros Médicos</span>
                        </a>
                        <ul className="submenu">
                            <li className="submenu-item ">
                                <Link to="/centros_medicos">Consultar</Link>
                            </li>
                            <li className="submenu-item ">
                                <Link to="/centros_medicos/crear">Agregar centro médico</Link>
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

                    <li className="sidebar-item has-sub">
                        <a href="" className='sidebar-link'>
                        <i className="bi bi-grid-1x2-fill"></i>
                            <span>Medicamentos</span>
                        </a>
                        <ul className="submenu">
                            <li className="submenu-item ">
                                <Link to="/medicamentos">Consultar</Link>
                            </li>
                            <li className="submenu-item ">
                                <Link to="/medicamentos/crear">Agregar medicamentos</Link>
                            </li>
                        </ul>
                    </li>

                    <li className="sidebar-item has-sub">
                        <a href="" className='sidebar-link'>
                        <i className="bi bi-grid-1x2-fill"></i>
                            <span>Tratamientos</span>
                        </a>
                        <ul className="submenu">
                            <li className="submenu-item ">
                                <Link to="/tratamientos_medicos">Consultar</Link>
                            </li>
                            <li className="submenu-item ">
                                <Link to="/tratamientos_medicos/crear">Agregar tratamientos</Link>
                            </li>
                        </ul>
                    </li>

                    <li className="sidebar-item has-sub">
                        <a href="" className='sidebar-link'>
                        <i className="bi bi-grid-1x2-fill"></i>
                            <span>Examenes</span>
                        </a>
                        <ul className="submenu">
                            <li className="submenu-item ">
                                <Link to="/examenes">Consultar</Link>
                            </li>
                            <li className="submenu-item ">
                                <Link to="/examenes/crear">Agregar exámenes</Link>
                            </li>
                        </ul>
                    </li>

                    <li className="sidebar-item has-sub">
                        <a href="" className='sidebar-link'>
                        <i className="bi bi-grid-1x2-fill"></i>
                            <span>Empleados</span>
                        </a>
                        <ul className="submenu">
                            <li className="submenu-item ">
                                <Link to="/empleados">Consultar</Link>
                            </li>
                            <li className="submenu-item ">
                                <Link to="/empleados/crear">Agregar empleados</Link>
                            </li>
                        </ul>
                    </li>

                    <li className="sidebar-item has-sub">
                        <a href="" className='sidebar-link'>
                        <i className="bi bi-grid-1x2-fill"></i>
                            <span>Citas</span>
                        </a>
                        <ul className="submenu">
                            <li className="submenu-item ">
                                <Link to="/citas">Consultar</Link>
                            </li>
                            
                        </ul>
                    </li>
                    
                    <li className="sidebar-item has-sub">
                        <a href="" className='sidebar-link'>
                        <i className="bi bi-grid-1x2-fill"></i>
                            <span>Usuarios</span>
                        </a>
                        <ul className="submenu">
                            <li className="submenu-item ">
                                <Link to="/usuarios">Consultar</Link>
                            </li>
                            <li className="submenu-item ">
                                <Link to="/usuarios/crear">Agregar usuarios</Link>
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
