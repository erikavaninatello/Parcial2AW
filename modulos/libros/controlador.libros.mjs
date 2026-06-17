// Controlador de libros
// Lógica de negocio del módulo libros
// Recibe las peticiones, consulta el modelo y responde al cliente
// El formato de respuesta sigue el criterio de clase: { datos, url, status }

import libros from './modelo.libros.mjs'


// GET /api/v1/libros — devuelve todos los libros
export function obtenerTodos(req, res) {
    res.status(200).json({
        datos:  libros,
        url:    'http://localhost:3000/api/v1/libros',
        status: 200
    })
}


// GET /api/v1/libros/:id — devuelve un libro por su id
// El middleware validarId ya garantizó que req.params.id es un entero positivo
export function obtenerUno(req, res) {

    const id_libro = Number(req.params.id)

    // filter devuelve un nuevo array con los elementos que cumplen la condición
    // no modifica el array original
    const librosFiltrados = libros.filter((libro) => libro.id === id_libro)

    if (librosFiltrados.length > 0) {
        res.status(200).json({
            datos:  librosFiltrados,
            url:    `http://localhost:3000/api/v1/libros/${id_libro}`,
            status: 200
        })
    } else {
        res.status(404).json({ mensaje: 'Libro no encontrado', status: 404 })
    }

}


// GET /procedimiento/promedio-paginas — endpoint de procedimiento
// Está por fuera de la API REST porque no identifica un recurso con la ruta,
// sino que ejecuta un cálculo sobre los datos
// Recorre todos los libros con forEach, acumula el total de páginas y calcula el promedio
export function calcularPromedioPaginas(req, res) {

    let totalPaginas = 0
    libros.forEach((libro) => { totalPaginas += libro.paginas })
    const promedio = totalPaginas / libros.length

    res.status(200).json({
        datos: {
            promedioPaginas:promedio,
            totalLibros:libros.length
        },
        status: 200
    })

}