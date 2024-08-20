import { pool } from "../conexion/conexion.js";

/* -------------------------------------------------------------------------------------------------------------- */

//METODOS GET
//Funcion para traer todas las mesas
export const getMesas = async (req, res) => {
    console.log("\nFuncion getMesas():");
    try {
        const Mesas = await pool.query('SELECT * FROM Mesas');
        console.log(Mesas);
        return res.status(200).json(Mesas)
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error del servidor', error);
    }
}

/* -------------------------------------------------------------------------------------------------------------- */

// METODOS CREATE
//Funcion para crear una mesa vacia
export const createMesa = async (req, res) => {
    console.log("\nFuncion createMesa():");
    try {
        await pool.query('INSERT INTO Mesas (MesaId) VALUES (NULL)');
        console.log("Mesa creada correctamente");
        return res.status(200).json({ Message: 'Mesa creada correctamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Error: 'Error del servidor ', error });
    }
}

/* -------------------------------------------------------------------------------------------------------------- */

// METODOS UPDATE

//Funcion para liberar una mesa, para enviarle a cantidad de clientes = 0, es decir, sigue a cargo de un mesero, pero no tiene clientes

export const liberarMesaYFinPedido = async (req, res) => {
    console.log("\n\nFuncion liberarMesa():");
    try {
        const { MesaId, PedidoId } = req.params;

        console.log(MesaId, PedidoId)
        if (MesaId && PedidoId) {
            const [isMesaOcupada] = await pool.query('SELECT M.Estado FROM Mesas M WHERE M.MesaId = ?', [MesaId]);
            //Los corchetes es para que no retorne un objeto si no un array y al devolver solo un objeto, se puede desestructurar
            if (isMesaOcupada && isMesaOcupada.Estado === 1) {
                const isUpdate = await pool.query('UPDATE Mesas SET Estado = 0 WHERE MesaId = ?', [MesaId]);
                const isPedidoFinalizado = await pool.query('UPDATE Pedidos SET Finalizado = 1 WHERE PedidoId = ?', [PedidoId]);
                if (isUpdate.affectedRows === 1 && isPedidoFinalizado.affectedRows === 1) {
                    console.log("Mesa liberada correctamente y pedido finalizado");
                    return res.status(201).json({ Exito: 'Mesa liberada correctamente y pedido finalizado' });
                } else {
                    console.log("No se pudo liberar la mesa");
                    return res.status(400).json({ Error: 'No se pudo liberar la mesa' });
                }
            } else {
                return res.status(409).json({ Error: 'La mesa no esta ocupada, por ende no se puede liberar, porque ya esta libre' });
            }
        } else {
            return res.status(400).json({ Error: 'No se recibieron datos' });
        }
    } catch (error) {
        return res.status(500).json({ Error: 'Error del servidor ', error });
    }
}


/* -------------------------------------------------------------------------------------------------------------- */

//METODOS PARA ELIMINAR MESA
//Funcion para eliminar una mesa
export const deleteMesa = async (req, res) => {
    console.log("\n\nFuncion deleteMesa():");
    try {
        const { MesaId } = req.params;
        const isDelete = await pool.query('DELETE FROM Mesas WHERE MesaId = ?', [MesaId]);
        if (isDelete.affectedRows === 1) {
            console.log("Mesa eliminada correctamente");
            return res.status(200).json({ Message: 'Mesa eliminada correctamente' });
        } else {
            console.log("No fue posible eliminar la mesa");
            return res.status(400).json({ Error: `La mesa con el id ${MesaId} no existe` });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Error: 'Error del servidor ', error });
    }
}
