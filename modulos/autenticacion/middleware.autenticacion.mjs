// Middleware de autenticación
// Verifica el token JWT de la cookie antes de dar acceso a rutas protegidas
// Igual que la función verificarAcceso del profe en la clase del 11/06

import jwt from 'jsonwebtoken'


export function verificarAcceso(req, res, next) {

    const token = req.cookies['token']

    // Verificamos la firma del token con JWT_FIRMA del .env
    jwt.verify(token, process.env.JWT_FIRMA, function(error, decoded) {

        if (error) {
            // Token inválido o expirado
            const esApi = req.originalUrl.startsWith('/api/')
            if (esApi) {
                return res.status(401).json({ mensaje: 'No autorizado', status: 401 })
            }
            return res.redirect('/login')
        }

        // Token válido → dejamos pasar
        next()

    })

}
