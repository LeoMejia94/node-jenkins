const TipoProyecto = require('../models/tipoProyecto')
const { request, response} = require('express')
const Cliente = require('../models/cliente')
const Etapas = require('../models/etapas')
const Universidad = require('../models/universidades')
const Proyecto = require('../models/proyecto')


// crear
const createProyecto= async (req = request, 
    res = response) => {
    try{
        const data = req.body
        console.log(data)
        const { cliente, etapas, tipoProyecto, universidades } = data;
        //validando cliente
        const clienteDB = Cliente.findOne({
            _id: cliente._id
        })
        if(!clienteDB){
            return res.status(400).json({msg: 'cliente invalido'})
        }
        // validando etapa
        const etapasDB = Etapas.findOne({
            _id: etapas._id
        })
        if(!etapasDB){
            return res.status(400).json({msg: 'etapas invalida'})
        }
        // validando Universidad
        const universidadDB = Universidad.findOne({
            _id: universidades._id
        })
        if(!universidadDB){
           return res.status(400).json({msg: 'universidad invalido'})
        }
         // validando TipoProyecto
        const tipoproyectoDB = TipoProyecto.findOne({
            _id: tipoProyecto._id
        })
        if(!tipoproyectoDB){
           return res.status(400).json({msg: 'estado invalido'})
        }      
        const proyecto = new Proyecto(data)

        await proyecto.save()
        
        return res.status(201).json(proyecto)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

//listar todos
const getProyecto = async (req = request, 
    res = response) => {
        try{
            console.log('petición...')
            const proyectoDB = await Proyecto.find()//select * from inventarios
                .populate({
                    path: 'tipoProyecto'
                })
                .populate({
                    path: 'cliente'
                })
                .populate({
                    path: 'etapas'
                })
                .populate({
                    path: 'universidades'
                })
            return res.json(proyectoDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

// actualizar inventario
const updateProyectoByID = async (req = request, 
    res = response) => {

    try{
        const { id } = req.params
        const data = req.body
        const proyecto  = await Proyecto.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(proyecto)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'}) 
    }

}


module.exports = { createProyecto, getProyecto, updateProyectoByID }