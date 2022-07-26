const express = require('express');
//const task = require('../models/task');
const router = express.Router();

const Task = require('../models/task');

//router.get('/', 
//async (req,res) => 
//{    const tareas = await Task.find();
//console.log(tareas);
//res.json(tareas);
//res.send('Hola mundo')
/*
 Task.find(function(err,task) {
     console.log(task);
 });                    
 res.json(
     {   status:'API Works'
     }
 );*/
//}
//); 

//Obtener
router.get('/',
    async (req, res) => {
        const tareas = await Task.find();
        res.json(tareas);
    }
);

router.get('/:id',
    async (req, res) => {
        const tarea = await Task.findById(req.params.id);
        res.json(tarea);
    }
);

//Guardar
router.post('/',
    async (req, res) => {   //console.log(req.body);
        const { titulo, descripcion } = req.body;
        const tarea = new Task({
            titulo: titulo,
            descripcion: descripcion
        }
        );
        console.log(tarea);
        await tarea.save();
        res.json({ status: 'Tarea guardada' });
        //res.json('recibido');
    }
);
//Actualizar
router.put('/:id',
    async (req, res) => {
        const { titulo, descripcion } = req.body;
        const newTarea = { titulo, descripcion };
        await Task.findByIdAndUpdate(req.params.id, newTarea)
        res.json({ status: 'Tarea actualizada' });
        //console.log(req.params.id);
        //res.json('recibido');
    }
);

router.delete('/:id',
    async (req, res) => {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ status: 'Eliminado' });
    }
);
module.exports = router;