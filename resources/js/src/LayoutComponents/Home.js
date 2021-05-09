import React from 'react';

import Menu from './Menu';
import Header from './Header';
import Footer from './Footer';


const App = () => {
    return(
        <div id="app">
        <Menu />
        <div id="main" className='layout-navbar'>
        <Header />
            <div id="main-content">

                <div className="page-heading">
                    <div className="page-title">
                        <div className="row">
                            <div className="col-12 col-md-6 order-md-1 order-last">
                                <h3>Bienvenido!</h3>
                                
                                <p className="text-subtitle text-muted">Centro de atención médica.</p>
                            </div>
                           
                        </div>
                    </div>
                    <div className="page-heading">
                    <div className="page-title">
                        <div className="row">
                          
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <section className="section">
                        <div className="card">
                            <div className="card-header">
                               
                            </div>
                            <div className="card-body">
                               
                            </div>
                        </div>
                    </section>
            </div>
            </div>   
            </div>
        </div>
        <Footer />
    </div>
    );
}

export default App;