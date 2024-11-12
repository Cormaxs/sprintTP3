
import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, modificarSuperheroe, eliminarSuperheroe } from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';
import SuperHero from '../models/SuperHero.mjs';


export async function obtenerSuperheroePorIdController(req, res) {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);
    if (superheroe) {
        res.send(renderizarSuperheroe(superheroe));
    } else {
        res.status(404).send("Superhéroe no encontrado");
    }
}

//Controlador para obtener todos los superhéroes
export async function obtenerTodosLosSuperheroesController(req, res) {
    const superheroes = await obtenerTodosLosSuperheroes();
    res.send(renderizarListaSuperheroes(superheroes));
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    const { atributo, valor } = req.params;

    // Verificar si el valor es un número o no
    const valorConvertido = !isNaN(valor) ? Number(valor) : valor; // Convierte solo si es un número puro, verifico que no es un numero con isnan
    
    console.log(typeof(atributo), typeof(valorConvertido));//veo si se convirtio
    try {
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valorConvertido);
        
        if (superheroes.length > 0) {
            res.send(renderizarListaSuperheroes(superheroes));
        } else {
            res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atributo" });
        }
    } catch (error) {
        // En caso de error en la conversión o búsqueda, devuelve un mensaje adecuado
        console.error("Error en la búsqueda de superhéroes:", error);
        res.status(500).send({ mensaje: "Error al buscar superhéroes" });
    }
}




//Controlador para obtener superhéroes mayores de 30 años
export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        res.send(renderizarListaSuperheroes(superheroes));
    } catch (error) {
        console.error("Error al obtener superhéroes mayores de 30:", error);
        res.status(500).send({ mensaje: "Error al obtener superhéroes mayores de 30", error });
    }
}

//Controlador para agregar un superhéroe
export async function agregarSuperheroeController(req, res) {
    try {
        const nuevoSuperheroe = new SuperHero(req.body);
        await nuevoSuperheroe.save();
        res.status(201).send({ mensaje: "Superhéroe agregado exitosamente", superheroe: nuevoSuperheroe });
    } catch (error) {
        res.status(500).send({ mensaje: "Error al agregar superhéroe", error });
    }
}

//Controlador para modificar un superhéroe
export async function modificarSuperheroeController(req, res) {
    const { id } = req.params;
    const datosActualizados = req.body;

    try {
        const superheroeModificado = await modificarSuperheroe(id, datosActualizados);
        if (superheroeModificado) {
            res.send(renderizarSuperheroe(superheroeModificado));
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al modificar el superhéroe", error });
    }
}

// Controlador para eliminar un superhéroe
export async function eliminarSuperheroeController(req, res) {
    const { id } = req.params;

    try {
        const superheroeEliminado = await eliminarSuperheroe(id);
        if (superheroeEliminado) {
            res.send({ mensaje: "Superhéroe eliminado exitosamente" });
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar el superhéroe", error });
    }
}