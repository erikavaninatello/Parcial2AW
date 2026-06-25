
## 1. Clonar el repo
git clone https://github.com/erikavaninatello/Parcial2AW.git
cd Parcial2AW
```

## 2. Instalar dependencias
npm install
```

## 3. Crear el `.env`
Crear un archivo `.env` en la raíz del proyecto.

PUERTO=3000
BD_HOST=localhost
BD_USER=root
BD_PASS=pass
BD_BD=admin
BD_PORT=5433
JWT_FIRMA=unaclavesupersecretajwt
COOKIE_FIRMA=unaclavesupersecretacookie
.env
-------------------------------------------------------------------------------
http://localhost:3000/login/
-------------------------------------------------------------------------------
--para crear contenedor nuevo en docker--
cd _docker-pg
docker build -t imagen-parcial .
docker run -d --name contenedor-parcial -p 5433:5432 imagen-parcial
------------------------------------------------------------------------------
npm run dev


/////////////////////////////////////////////////////////////////////////////////
npg_QMyTqoX67KaV CLAVE
///////////////////////////////
para ingresar sin docker ni postgre

PUERTO=3000
BD_HOST=ep-empty-math-aiecxyxz.c-4.us-east-1.aws.neon.tech
BD_USER=neondb_owner
BD_PASS=npg_QMyTqoX67KaV
BD_BD=neondb
BD_PORT=5432
JWT_FIRMA=unaclavesupersecretajwt
COOKIE_FIRMA=unaclavesupersecretacookie

///contraseña y usuario///
Usuario: admin
Contraseña: password

77---------------------------------------
git clone https://github.com/erikavaninatello/Parcial2AW.git
cd Parcial2AW
npm install
Crear el .env con los datos de Neon, agregar ssl: true en conexion.bd.mjs y:
npm run dev
