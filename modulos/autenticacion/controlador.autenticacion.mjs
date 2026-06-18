// Controlador de autenticación
// POST /autenticar    — verifica credenciales contra la BD, genera JWT y lo guarda en cookie firmada
// GET  /cerrar-sesion — elimina la cookie y redirige al login

import bcrypt from 'bcryptjs'
import jwt    from 'jsonwebtoken'
import pool   from '../../bd/conexion.bd.mjs'


// POST /autenticar
export async function autenticar(req, res) {

    const { usuario, pass } = req.body

    // Validamos que lleguen ambos campos antes de consultar la BD
    if (!usuario || !pass) return res.sendStatus(400)

    let verificado = false

    try {
        // Buscamos el hash de la contraseña asociado al usuario en la BD
        const resultado = await pool.query(
            'SELECT password_hash FROM usuarios WHERE username = $1',
            [usuario]
        )

        // Si no existe el usuario respondemos 401 sin dar detalles (buena práctica de seguridad)
        if (resultado.rowCount === 0) return res.sendStatus(401)

        // bcrypt.compare compara la contraseña recibida en texto plano
        // contra el hash almacenado en la BD — nunca se guarda la contraseña original
        verificado = await bcrypt.compare(pass, resultado.rows[0].password_hash)

    } catch (error) {
        return res.sendStatus(500)
    }

    if (verificado) {

        // jwt.sign genera el token firmado con JWT_FIRMA del .env
        // expiresIn: el token expira en 1h, forzando al usuario a re-autenticarse
        jwt.sign(
            { usuario: usuario },
            process.env.JWT_FIRMA,
            { expiresIn: '1h' },
            (error, token) => {

                if (error) return res.sendStatus(500)

                // Guardamos el JWT en una cookie firmada
               
                res.cookie('token', token, {
                    secure:   false,
                    httpOnly: true,
                    sameSite: 'lax',
                    signed:   true
                })

                res.redirect('/admin')
            }
        )

    } else {
        // Contraseña incorrecta
        // para no revelar cuál de los dos datos falló
        res.sendStatus(401)
    }

}


// GET /cerrar-sesion
export function cerrarSesion(req, res) {
    // Eliminamos la cookie asignándole maxAge 0
    res.cookie('token', '', { maxAge: 0 })
    res.redirect('/login')
}