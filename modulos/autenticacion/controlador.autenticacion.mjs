// Controlador de autenticación
// POST /autenticar — verifica credenciales contra la BD, genera token JWT y lo guarda en cookie httpOnly
// GET  /cerrar-sesion — elimina la cookie del token y redirige al login

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

        // Si no existe el usuario
        if (resultado.rowCount === 0) return res.sendStatus(401)

        // bcrypt.compare compara la contraseña recibida en texto plano
        // contra el hash almacenado en la BD — nunca se guarda la contraseña original
        verificado = await bcrypt.compare(pass, resultado.rows[0].password_hash)

    } catch (error) {
        return res.sendStatus(500)
    }

    if (verificado) {
        try {
            // Generamos el token JWT firmado con JWT_FIRMA del .env
            // expiresIn: el token expira en 2 horas, forzando al usuario a re-autenticarse
            const token = jwt.sign(
                { usuario: usuario },
                process.env.JWT_FIRMA,
                { expiresIn: '2h' }
            )

            // Guardamos el token en una cookie httpOnly
            // httpOnly: true -- JavaScript del navegador NO puede leerla (protección XSS)
            // sameSite: 'lax' -- solo se envía en navegación del mismo dominio
            // maxAge coincide con expiresIn del JWT (2 horas en milisegundos)
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge:   1000 * 60 * 60 * 2
            })

            res.redirect('/admin')

        } catch (error) {
            res.sendStatus(500)
        }

    } else {
        // Contraseña incorrecta — mismo código que "usuario no encontrado"
        // para no revelar cuál de los dos datos falló
        res.sendStatus(401)
    }

}


// GET /cerrar-sesion
export function cerrarSesion(req, res) {
    // Eliminamos la cookie asignándole maxAge 0, lo que la expira de inmediato
    res.cookie('token', '', { maxAge: 0 })
    res.redirect('/login')
}