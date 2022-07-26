import React, { Component } from "react";
import Listados from "./comp/webcomp";

const encabezados = [{ id: 0, valor: 'Título-' },
{ id: 1, valor: 'Descripción-' },
{ id: 2, valor: 'Opciones-' }
];

class App extends Component {


    constructor() {
        super();
        this.state = {
            titulo: '',
            descripcion: '',
            tareas: [],
            _id: ''
        };
        this.addTarea = this.addTarea.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.borrarTarea=this.borrarTarea.bind(this);
        this.editarTarea=this.editarTarea.bind(this);
    }

    handleChange(e) {
        //console.log(e.target.value);
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    componentDidMount() {
        //console.log('componente montado');
        this.obtenerTareas();
    }

    obtenerTareas() {
        fetch('/api/tareas')
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                this.setState({ tareas: data });
                console.log(this.state.tareas);
            }
            );

    }


    addTarea(e) {
        if (this.state._id) {
            fetch(`/api/tareas/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            )
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Tarea actualizada' })
                    this.setState({ titulo: '', descripcion: '', _id: '' });
                    this.obtenerTareas();
                });

        } else {
            fetch('/api/tareas', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                //console.log(this.state);
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: 'Tarea guardada' })
                    this.setState({ titulo: '', descripcion: '' });
                    this.obtenerTareas();
                })
                .catch(err => console.error(err));
        }

        e.preventDefault();
    }



    borrarTarea(id) {
        if (confirm('¿Eliminar?')) {
            console.log('eliminando:', id);
            fetch(`/api/tareas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            )
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: 'Tarea eliminada' });
                    this.obtenerTareas();
                }
                );
        }
    }

    editarTarea(id) {
        fetch(`/api/tareas/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    titulo: data.titulo,
                    descripcion: data.descripcion,
                    _id: data._id
                })
            });

    }

    render() {
        return (
            <div>

                {/* Navegación*/}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack</a>
                    </div>
                </nav>

                
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTarea}>
                                        <div className="row">

                                            <div className="input-field col s12">
                                                <input name="titulo" type="text"
                                                    onChange={this.handleChange}
                                                    value={this.state.titulo}
                                                    placeholder="Titulo de tarea"></input>
                                            </div>

                                        </div>
                                        <div className="row">

                                            <div className="input-field col s12">
                                                <textarea name="descripcion"
                                                    onChange={this.handleChange}
                                                    value={this.state.descripcion}
                                                    placeholder="Descripción de la tarea"
                                                    className="materialize-textarea">

                                                </textarea>
                                            </div>

                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Enviar
                                        </button>
                                    </form>
                                </div>

                            </div>
                        </div>
                        <Listados titulo={"Tareas"}
                            listado={this.state.tareas}
                            encabezadosX={encabezados}
                            borrar={this.borrarTarea}
                            editar={this.editarTarea}
                            >
                        </Listados>
                        
                        <div className="col s7">

                            <table className="striped flow-text">
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Descripción</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tareas.map(tarea => {
                                            return (
                                                <tr key={tarea._id}>
                                                    <td> {tarea.titulo} </td>
                                                    <td> {tarea.descripcion} </td>
                                                    <td>
                                                        <button className="btn light-blue darken-4"
                                                            onClick={() => { this.borrarTarea(tarea._id) }}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" style={{ margin: '4px' }}
                                                            onClick={() => { this.editarTarea(tarea._id) }}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;