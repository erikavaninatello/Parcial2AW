// Rutas del módulo libros
// Vincula cada endpoint con su función del controlador
// El middleware validarId es un middleware PROPIO de la aplicación (no de Express)
// que valida que el parámetro :id sea un número entero positivo antes de llegar al controlador

import { Router } from 'express'
import * as controlador from './controlador.libros.mjs'
import { validarId }    from './middleware.libros.mjs'

const rutasLibros = new Router()

// GET /api/v1/libros — devuelve todos los libros
rutasLibros.get('/api/v1/libros', controlador.obtenerTodos)

// GET /api/v1/libros/:id — devuelve un libro por su id
// validarId se ejecuta antes del controlador para verificar que :id sea válido
// Va DESPUÉS de /procedimiento para que Express no interprete "procedimiento" como un id
rutasLibros.get('/api/v1/libros/:id', validarId, controlador.obtenerUno)

// GET /procedimiento/promedio-paginas — endpoint de procedimiento
// Está por fuera de la API REST y de su prefijo /api/v1/ porque no identifica un recurso,
// sino que ejecuta un cálculo sobre los datos
rutasLibros.get('/procedimiento/promedio-paginas', controlador.calcularPromedioPaginas)

export default rutasLibros