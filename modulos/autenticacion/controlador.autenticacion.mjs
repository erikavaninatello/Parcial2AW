// Controlador de autenticación
// Login: verifica credenciales contra la BD, genera token JWT y lo guarda en cookie
// Logout: elimina la cookie del token

import bcrypt from 'bcryptjs'
import jwt    from 'jsonwebtoken'
import pool   from '../../bd/conexion.bd.mjs'


// POST /autenticar
export async function autenticar(req, res) {

    const { usuario, pass } = req.body

    if (!usuario || !pass) return res.sendStatus(400)

    let verificado = false

    try {
        // Buscamos el hash de la contraseña del usuario en la BD
        const resultado = await pool.query(
            'SELECT password_hash FROM usuarios WHERE username = $1',
            [usuario]
        )
        if (resultado.rowCount === 0) return res.sendStatus(401)

        // Comparamos la contraseña recibida con el hash almacenado
        verificado = await bcrypt.compare(pass, resultado.rows[0].password_hash)

    } catch (error) {
        return res.sendStatus(401)
    }

    if (verificado) {
        try {
            // Generamos el token JWT con los datos del usuario y lo firmamos con JWT_FIRMA
            const token = jwt.sign(
                { usuario: usuario },
                process.env.JWT_FIRMA,
                { expiresIn: '2h' }
            )

            // Guardamos el token en una cookie httpOnly
            // httpOnly: no accesible desde JS del navegador (protección XSS)
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge:   1000 * 60 * 60 * 2 // 2 horas
            })

            res.redirect('/admin')

        } catch (error) {
            res.sendStatus(500)
        }
    } else {
        res.sendStatus(401)
    }

}


// GET /cerrar-sesion
export function cerrarSesion(req, res) {
    // Eliminamos la cookie del token
    res.cookie('token', '', { maxAge: 0 })
    res.redirect('/login')
}
