// Importa el arreglo de libros
// que funciona como base de datos local

import libros from '../data/libros.mjs'



// OBTENER TODOS LOS LIBROS
// Endpoint GET -> /api/v1/libros


// Devuelve todos los libros disponibles

export function obtenerLibros(req, res) {

    res.status(200).json({

        datos: libros,

        url: 'http://localhost:3000/api/v1/libros',

        status: 200

    })

}


// OBTENER LIBRO POR ID
// Endpoint GET -> /api/v1/libros/:id
//En README estan los demas endopoints

// Busca un libro según el id enviado por URL

export function obtenerLibro(req, res) {

    // Obtiene el id enviado por parámetro
    const id_libro = Number(req.params.id)

    // filter() recorre el arreglo buscando coincidencias
    const librosFiltrados = libros.filter((libro) => {

        return libro.id === id_libro

    })

    // Verifica si encontró el libro
    if (librosFiltrados.length > 0) {

        res.status(200).json({

            datos: librosFiltrados,

            url: 'http://localhost:3000/api/v1/libros/' + id_libro,

            status: 200

        })

    } else {

        res.status(404).json({

            mensaje: 'Libro no encontrado',

            status: 404

        })

    }

}




// PROCEDIMIENTO
// Endpoint -> /calcularPromedioPaginas


// Calcula el promedio de páginas de todos los libros.

export function calcularPromedioPaginas(req, res) {

    let totalPaginas = 0

    // Recorre todos los libros sumando páginas
    libros.forEach((libro) => {

        totalPaginas = totalPaginas + libro.paginas

    })

    // Calcula el promedio total
    const promedio = totalPaginas / libros.length

    res.status(200).json({

        datos: {

            promedioPaginas: promedio,

            totalLibros: libros.length

        },

        status: 200

    })

}



// ==========================================
// MIDDLEWARE PERSONALIZADO
// ==========================================

// Muestra en consola el método HTTP y la URL

export function middleware1(req, res, next) {

    console.log(`${req.method} ${req.originalUrl}`)

    // Continúa con la siguiente función
    next()

}