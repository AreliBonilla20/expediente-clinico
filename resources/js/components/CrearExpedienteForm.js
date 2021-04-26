import React from 'react';

function CrearExpedienteForm() {
    return (
        <section id="multiple-column-form">
        <div className="row match-height">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Complete los datos del formulario</h4>
                    </div>
                    <div className="card-content">
                        <div className="card-body">
                            <form className="form">
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label for="first-name-column">Nombres</label>
                                            <input type="text" id="first-name-column" className="form-control"
                                                placeholder="First Name" name="fname-column" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label for="last-name-column">Apellidos</label>
                                            <input type="text" id="last-name-column" className="form-control"
                                                placeholder="Last Name" name="lname-column" />
                                        </div>
                                    </div>
                                    
                                    <div className="col-12 d-flex justify-content-end">
                                        <button type="submit"
                                            className="btn btn-primary me-1 mb-1">Guardar</button>
                                        <button type="reset"
                                            className="btn btn-light-secondary me-1 mb-1">Limpiar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}

export default CrearExpedienteForm;