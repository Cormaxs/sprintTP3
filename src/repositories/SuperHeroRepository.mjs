import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }

    async obtenerTodos() {
        return await SuperHero.find();
    }

    async buscarPorAtributo(atributo, valor) {
        const query = {};
        if (!isNaN(valor)) {
            // Si el valor es un número, hacemos una comparación directa
            query[atributo] = valor;
        } else {
            // Si es una cadena, usamos una expresión regular
            query[atributo] = new RegExp(valor, 'i');
        }
        return await SuperHero.find(query);
    }

    async obtenerMayoresDe30() {
        return await SuperHero.find({
            edad: { $gt: 30 },
            planetaOrigen: 'Tierra',
            poderes: { $exists: true, $not: { $size: 0 } } 
        });
    }

    async modificarSuperheroe(id, datosActualizados) {
        return await SuperHero.findByIdAndUpdate(id, datosActualizados, { new: true });
    }

    // Función para eliminar un superhéroe
    async eliminarSuperheroe(id) {
        return await SuperHero.findByIdAndDelete(id);
    }
}

export default new SuperHeroRepository();