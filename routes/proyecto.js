const { Router } = require('express')
const { createProyecto, getProyecto, updateProyectoByID} =
 require('../controllers/proyecto')

const router = Router()

// crear
router.post('/', createProyecto)

// consultar todos
router.get('/', getProyecto)

// actualizar
router.put('/:id', updateProyectoByID)

module.exports = router;