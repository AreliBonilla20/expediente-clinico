import React from 'react';
import {Link} from 'react-router-dom';

import usuario from '../../../../public/assets/images/faces/1.jpg'; 

const Header = () => {
    return(
        <header className='mb-3'>
        <nav className="navbar navbar-expand navbar-light ">
            <div className="container-fluid">
                <a href="#" className="burger-btn d-block">
                    <i className="bi bi-justify fs-3"></i>
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
              
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                       
                    </ul>
                    <div className="dropdown">
                        <a data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="user-menu d-flex">
                                <div className="user-name text-end me-3">
                                    <h6 className="mb-0 text-gray-600">{window.localStorage.getItem('name')}</h6>
                                    <Link to="/logout" className="mb-0 text-sm text-gray-600">Cerrar sesión</Link>
                                </div>
                                <div className="user-img d-flex align-items-center">
                                    <div className="avatar avatar-md">
                                        <img src={usuario} />
                                    </div>
                                </div>
                            </div>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            <li>
                                <h6 className="dropdown-header">Hello, John!</h6>
                            </li>
                            <li><a className="dropdown-item" href="#"><i className="icon-mid bi bi-person me-2"></i> My
                                    Profile</a></li>
                            <li><a className="dropdown-item" href="#"><i className="icon-mid bi bi-gear me-2"></i>
                                    Settings</a></li>
                            <li><a className="dropdown-item" href="#"><i className="icon-mid bi bi-wallet me-2"></i>
                                    Wallet</a></li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li><a className="dropdown-item" href="#"><i
                                        className="icon-mid bi bi-box-arrow-left me-2"></i> Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    );
}

export default Header;