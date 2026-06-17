// Middleware de autenticación
// Verifica el token JWT guardado en la cookie antes de dar acceso a rutas protegidas
// Si el token no existe, es inválido o expiró -- bloquea el acceso
// Si es válido -- llama a next() y deja pasar la petición

import jwt from 'jsonwebtoken'

export function verificarAcceso(req, res, next) {

    const token = req.cookies['token']

    // jwt.verify verifica tanto la firma como la expiración del token
    // Si falla por cualquier motivo, el parámetro "error" no será null
    jwt.verify(token, process.env.JWT_FIRMA, function(error ) {

        if (error) {
            // Distinguimos si la petición es a la API o a una página
            // para responder con JSON o con una redirección según corresponda
            const esApi = req.originalUrl.startsWith('/api/')
            if (esApi) {
                return res.status(401).json({ mensaje: 'No autorizado', status: 401 })
            }
            return res.redirect('/login')
        }

        // Token válido -- dejamos pasar la petición al siguiente middleware o ruta
        next()

    })

}