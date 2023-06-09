const { Schema, model} = require('mongoose')


const ProyectoSchema = Schema({
    numero: {
        type: Number,
        required: [true, 'Numero requerido'],
        unique: [true, 'proyecto creado']
    },
    titulo: {
        type: String,
        required: [true, 'titulo requerido']
    },
    valor: {
        type:Number,
        required: [true, 'valor requerido']
    },
    tipoProyecto: {
        type: Schema.Types.ObjectId,
        ref: 'TipoProyecto',
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    etapas: {
        type: Schema.Types.ObjectId,
        ref: 'Etapas',
        required: true
    },
    universidades: {
        type: Schema.Types.ObjectId,
        ref: 'Universidad',
        required: true
    },
    fechaIniciacion: {
        type: String,
        required: [true, 'fecha Iniciacion requerido']
    },
    fechaEntrega: {
        type: String,
        required: [true, 'fecha Entrega requerido']
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
   
})

module.exports = model('Proyecto', ProyectoSchema)
