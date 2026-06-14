import { Router } from 'express'

import {
    obtenerLibros,
    obtenerLibro,
    calcularPromedioPaginas
} from '../funciones/funcionesLibros.mjs'

const router = Router()


// Obtener todos los libros
router.get('/', obtenerLibros)

// Ruta que ejecuta una acción
router.get('/promedio/paginas', calcularPromedioPaginas)


// Obtener libro por ID
router.get('/:id', obtenerLibro)


export default router