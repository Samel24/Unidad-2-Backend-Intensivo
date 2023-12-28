const express = require('express');
const router = express.Router();
const Estudiantes = require('../controllers/estudiantes')

/* GET Estudiantes */
router.get('/', function (req, res, next) {
  Estudiantes.listar()
    .then((resultado) => {
      res.status(200).json({ "status": 200, "data": resultado })
    })
    .catch((error) => {
      res.status(400).json({ status: 400, mensaje: "no se ha podido mostrar los Estudiantes", error: error })
    })
});

/* POST Estudiantes */
router.post('/', function (req, res, next) {
  Estudiantes.agregar(req.body)
    .then((resultado) => {
      res.status(200).json({ status: 200, mensaje: resultado })
    })
    .catch((error) => {
      res.status(400).json({ status: 400, mensaje: "no se ha podido agregar el Estudiante", error: error })
    })
})

/* GET Estudiante por ID */
router.get('/:id', function (req, res, next) {
  const { id } = req.params

  Estudiantes.mostrar(id)
    .then((resultado) => {
      res.status(200).json({ "status": 200, "data": resultado })
    })
    .catch((error) => {
      res.status(400).json({ status: 400, mensaje: "no se ha podido mostrar los Estudiantes", error: error })
    })
});

/* PUT Estudiantes */
router.put('/:id', function (req, res, next) {
  const { id } = req.params

  Estudiantes.editar(req.body, id)
  .then((resultado) => {
      res.status(200).json({status: 200, mensaje: resultado})
  })
  .catch((error) => {
      res.status(400).json({status: 400, mensaje: "no se ha podido editar el Estudiante", error: error})
  })
})

/* DELETE Estudiantes */
router.delete('/:id', function (req, res, next) {

  const { id } = req.params

  Estudiantes.eliminar(id)
  .then((resultado) => {
      res.status(200).json({status: 200, mensaje: resultado})
  })
  .catch((error) => {
      res.status(400).json({status: 400, mensaje: 'No se pudo eliminar el Estudiante', error: error})
  })
})

module.exports = router;
