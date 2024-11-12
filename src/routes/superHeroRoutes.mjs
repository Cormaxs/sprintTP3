import express from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    agregarSuperheroeController, 
    modificarSuperheroeController, 
    eliminarSuperheroeController 
} from '../controllers/superheroesController.mjs';

const router = express.Router();

router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);

router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);//buscar super


//Ruta para agregar un superhéroe 
router.post('/heroes', agregarSuperheroeController);

//Ruta para modificar un superhéroe
router.put('/heroes/:id', modificarSuperheroeController);

//Ruta para eliminar un superhéroe
router.delete('/heroes/:id', eliminarSuperheroeController);

export default router;