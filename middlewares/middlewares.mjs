export function middleware1(req, res, next) {

    console.log(`${req.method} ${req.originalUrl}`)

    next()
}