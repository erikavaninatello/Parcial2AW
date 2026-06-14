// Modelo de libros
// Fuente de datos local — colección de libros de la biblioteca

const libros = [
    { id: 1,  titulo: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling',              genero: 'Fantasía',      anio: 1997, paginas: 309,  disponible: true  },
    { id: 2,  titulo: 'El señor de los anillos',            autor: 'J.R.R. Tolkien',            genero: 'Fantasía',      anio: 1954, paginas: 1178, disponible: false },
    { id: 3,  titulo: 'El código Da Vinci',                 autor: 'Dan Brown',                 genero: 'Thriller',      anio: 2003, paginas: 489,  disponible: true  },
    { id: 4,  titulo: 'Crepúsculo',                         autor: 'Stephenie Meyer',           genero: 'Romance',       anio: 2005, paginas: 498,  disponible: true  },
    { id: 5,  titulo: 'El alquimista',                      autor: 'Paulo Coelho',              genero: 'Ficción',       anio: 1988, paginas: 208,  disponible: false },
    { id: 6,  titulo: 'Los juegos del hambre',              autor: 'Suzanne Collins',           genero: 'Distopía',      anio: 2008, paginas: 374,  disponible: true  },
    { id: 7,  titulo: 'It',                                 autor: 'Stephen King',              genero: 'Terror',        anio: 1986, paginas: 1138, disponible: true  },
    { id: 8,  titulo: 'El diario de Ana Frank',             autor: 'Ana Frank',                 genero: 'Autobiografía', anio: 1947, paginas: 283,  disponible: false },
    { id: 9,  titulo: 'Orgullo y prejuicio',                autor: 'Jane Austen',               genero: 'Romance',       anio: 1813, paginas: 432,  disponible: true  },
    { id: 10, titulo: 'El principito',                      autor: 'Antoine de Saint-Exupéry', genero: 'Ficción',       anio: 1943, paginas: 96,   disponible: true  },
    { id: 11, titulo: '1984',                               autor: 'George Orwell',             genero: 'Distopía',      anio: 1949, paginas: 328,  disponible: false },
    { id: 12, titulo: 'El gran Gatsby',                     autor: 'F. Scott Fitzgerald',       genero: 'Novela',        anio: 1925, paginas: 180,  disponible: true  }
]

export default libros
