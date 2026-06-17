// Middleware propio del módulo libros
// Valida que el parámetro :id de la ruta sea un número entero positivo
// Si no lo es, corta la petición y responde con 400 (Bad Request)
// Esto evita que lleguen al controlador valores inválidos como "abc" o "-1"

export function validarId(req, res, next) {

    const id = Number(req.params.id)


    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensaje: 'El id debe ser un número entero positivo',
            status:  400
        })
    }

    next()
}