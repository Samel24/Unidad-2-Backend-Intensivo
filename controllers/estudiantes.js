const estudiantes = require('../database/database');
const { v4: uuidv4 } = require('uuid');

class Estudiante {

    listar() {
        return new Promise((resolve, reject) => {
            try {
                const totalEstudiantes = estudiantes

                return resolve({
                    ok: true,
                    estudiantes: totalEstudiantes
                })
            } catch (error) {
                console.error('Error al mostrar los Estudiantes:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tenemos un error al mostrar los estudiantes',
                })
            }
        })
    }

    agregar(estudiante) {
        return new Promise((resolve, reject) => {
            try {
                if (!estudiante.nombre || !estudiante.edad || !estudiante.carrera) {
                    return reject('Debes ingresar propiedades como: nombre, edad y carrera')
                }

                if (Number.isInteger(estudiante.edad) === false) {
                    return reject('Debes ingresar una edad escrita en numeros')
                }

                if (estudiante.edad > 150 || estudiante.edad < 0) {
                    return reject('Debes ingresar una valida entre 1 año y 150 años')
                }

                for (let i = 0; i < estudiantes.length; i++) {
                    if (estudiantes[i].edad === estudiante.edad && estudiantes[i].nombre === estudiante.nombre && estudiantes[i].carerra === estudiante.carerra) {
                        return reject('Este estudiante ya esta registrado con los mismos datos, debes cambiarlos')
                    }
                }

                const nuevoEstudiante = {
                    id: uuidv4(),
                    nombre: estudiante.nombre,
                    edad: estudiante.edad,
                    carrera: estudiante.carrera
                }

                estudiantes.push(nuevoEstudiante)
                return resolve({
                    ok: true,
                    estudiante_agregado: nuevoEstudiante
                })
            } catch (error) {
                console.error('Error al agregar el Estudiante:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al agregar el Estudiante',
                })
            }
        })
    }

    mostrar(id){
        return new Promise((resolve, reject) => {
            try {
                for (let i = 0; i < estudiantes.length; i++) {
                    if (estudiantes[i].id === id) {
                            return resolve({
                            ok: true,
                            estudiante: estudiantes[i]
                        })
                    }
                }

                return reject({
                    ok:false,
                    mensaje: "no se encontro el estudiante que estas buscando"
                })
            } catch (error) {
                console.error('Error al mostrar el Estudiante:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tenemos un error al mostrar el estudiante',
                })
            }
        })
    }

    editar(estudiante, id) {
        return new Promise((resolve, reject) => {
            try {
                if (!estudiante.nombre || !estudiante.edad || !estudiante.carrera) {
                    return reject('Debes ingresar propiedades como: nombre, edad y carrera')
                }

                if (Number.isInteger(estudiante.edad) === false) {
                    return reject('Debes ingresar una edad escrita en numeros')
                }

                if (estudiante.edad > 150 || estudiante.edad < 0) {
                    return reject('Debes ingresar una valida entre 1 año y 150 años')
                }

                for (let i = 0; i < estudiantes.length; i++) {
                    if (estudiantes[i].id === id) {
                        const edicion_estudiante = {
                            id: id,
                            nombre: estudiante.nombre,
                            edad: estudiante.edad,
                            carrera: estudiante.carrera
                        }

                        estudiantes.splice(i, 1, edicion_estudiante);

                        return resolve({
                            ok: true,
                            estudiante_editado: edicion_estudiante
                        })
                    }
                }

                return reject({
                    ok:false,
                    mensaje: "no se encontro el estudiante que quieres Editar"
                })
            } catch (error) {
                console.error('Error al editar el Estudiante:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al editar el Estudiante',
                })
            }
        })
    }

    eliminar(id){
        return new Promise((resolve, reject) => {
            try {
                for (let i = 0; i < estudiantes.length; i++) {
                    if (estudiantes[i].id === id) {
                        const estudiante_eliminado = estudiantes[i]
                        estudiantes.splice(i, 1);

                        return resolve({
                            ok: true,
                            estudiante_eliminado
                        })
                    }
                }

                return reject({
                    ok:false,
                    mensaje: "no se encontro el estudiante que quieres Eliminar"
                })
            } catch (error) {
                console.error('Error al eliminar el Estudiante:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al eliminar el Estudiante',
                })
            }
        })
    }
}

const estudiantesC = new Estudiante();
module.exports = estudiantesC;