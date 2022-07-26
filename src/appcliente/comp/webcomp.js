import React from "react";
const Listados = ({ listado, titulo,encabezadosX, borrar,editar
 }) => {
    return (
        <div className="col s7">
            
            <table className="striped flow-text">
                <caption>{titulo}</caption>
                <thead>
                    <tr>
                    { encabezadosX.map( (elemento) =>(
                            <th key={elemento.id}>{elemento.valor}</th>                            
                            )
                        )
                    }
                    </tr>                    
                </thead>
                <tbody>
                    {
                        listado.map(elemento => {
                            return (
                                <tr key={elemento._id}>
                                    <td> {elemento.titulo} </td>
                                    <td> {elemento.descripcion} </td>
                                    <td>
                                        <button className="btn light-blue darken-4"
                                            onClick={() => { borrar(elemento._id) }}>
                                            <i className="material-icons">delete</i>
                                        </button>
                                        <button className="btn light-blue darken-4" style={{ margin: '4px' }}
                                            onClick={() => { editar(elemento._id)} }>
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
    )
}

export default Listados;