import { pool } from "../conexion/conexion.js";

//METODOS GET PARA OBTENER PRODUCTOS
//Funcion para obtener todos los productos
export const getProductos = async (req, res) => {
    console.log("\n\nFuncion getProductos():");
    try {
        const Productos = await pool.query('SELECT P.ProductoId, P.Nombre, P.Descripcion, C.NombreCategoria AS Categoria, P.Precio'
            + ' FROM Productos P'
            + ' LEFT JOIN Categorias C ON C.CategoriaId = P.Categoria WHERE P.Inactivo = 0 OR P.Categoria IS NULL;');
        if (Productos.length > 0) {
            console.log("Productos: ", Productos);
            return res.status(200).json(Productos);
        } else {
            console.log("No hay productos");
            return res.status(200).json({ Error: 'No hay ningun producto' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Error: 'Error del servidor' });
    }
}

//Funcion para obtener un producto por su id
export const getProductoById = async (req, res) => {
    console.log("\n\nFuncion getProductoById():");

    try {
        const { ProductoId } = req.params;
        // Verificar si el ID es un numero valido y es un numero entero positivo
        if (ProductoId > 0) {
            const [producto] = await pool.query('SELECT * FROM productos WHERE productoid = ?', [ProductoId]);
            console.log('Respuesta consulta producto: ', producto);
            if (producto) {
                console.log('Producto encontrado: ', producto.rows);
                return res.status(200).json(producto);
            } else {
                return res.status(404).json({ mensaje: 'No se encontro un producto con el ID ' + ProductoId + ' que has proporcionado.' });
            }
        } else {
            return res.status(400).json({ mensaje: 'El ID proporcionado no es un numero entero positivo valido.' });
        }

    } catch (error) {
        console.error('Error del servidor: ', error);
        return res.status(500).json({ mensaje: 'Error del servidor' });
    }
};

//METODO POST PARA CREAR PRODUCTO
export const createProducto = async (req, res) => {
    console.log("\n\nFuncion createProducto():");
    try {
        const { Nombre, Descripcion, Precio, Categoria } = req.body;
        // { str, str, number, number }
        // Verificar si alguno de los campos esta vacío
        if (Nombre && Descripcion && Precio && Categoria) {
            // Verificar que el Precio sea un numero positivo
            if (Precio >= 100) {
                // Verificar si la categoría existe y obtener su Id
                const [isCategoria] = await pool.query('SELECT CategoriaId FROM Categorias WHERE NombreCategoria = ?', [Categoria]);
                if (isCategoria) {
                    const isInsert = await pool.query('INSERT INTO productos (Nombre, Descripcion, Precio, Categoria) VALUES (?,?,?,?)',
                        [Nombre, Descripcion, Precio, isCategoria.CategoriaId]);
                    if (isInsert.affectedRows === 1) {//Si se inserto correctamente
                        console.log("Producto creado correctamente");
                        return res.status(201).json({ mensaje: 'Producto creado correctamente' });
                    } else {
                        console.log("Error al crear el producto");
                        return res.status(409).json({ error: 'Error al crear el producto', error });
                    }
                }else{
                    return res.status(404).json({ error: 'La categoria no existe' });
                }
            } else {
                console.log("El Precio debe ser mayor a 100");
                return res.status(400).json({ error: "El Precio debe ser mayor a 100" });
            }
        } else {
            console.log("Ausencia de datos");
            return res.status(400).json({ error: "Ausencia de datos" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: 'Error en el servidor', error });
    }
};

//METODO PUT PARA ACTUALIZAR PRODUCTO
export const updateProducto = async (req, res) => {
    console.log("\n\nFuncion updateProducto():");
    try {
        const { ProductoId } = req.params;
        const { Nombre, Descripcion, Precio, Categoria } = req.body;
        //{ str, str, number, str }
        // Verificar que precio sea mayor a 100
        if (Precio > 99) {
            // Verificar que la categoria exista
            const [isCategoria] = await pool.query('SELECT CategoriaId FROM Categorias WHERE NombreCategoria = ?', [Categoria]);
            if (isCategoria) {
                //El COALESCE() es para que si el campo viene vacio, no lo actualice
                const isUpdate = await pool.query('UPDATE Productos SET Nombre = COALESCE(?, Nombre), Descripcion = COALESCE(?, Descripcion), ' +
                    'Precio = COALESCE(?, Precio), Categoria = COALESCE(?, Categoria) WHERE ProductoId = ?',
                    [Nombre, Descripcion, Precio, isCategoria.CategoriaId, ProductoId]);

                if (isUpdate.affectedRows === 1) {//Si se actualizo correctamente
                    console.log("Producto actualizado correctamente");
                    return res.status(201).json({ mensaje: 'Producto actualizado correctamente' });
                } else {
                    console.log("El producto a actualizar no existe");
                    return res.status(404).json({ error: 'El producto a actualizar no existe' });
                }
            } else {
                console.log("La categoria no existe");
                return res.status(404).json({ error: 'La categoria no existe' });
            }

        } else {
            console.log("El Precio debe ser mayor a 100");
            return res.status(400).json({ error: "El precio debe ser mayor a 99" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Error: 'Error del servidor ', error });
    }
}

//METODO DELETE PARA ELIMINAR PRODUCTO
export const deleteProducto = async (req, res) => {
    console.log("\n\nFuncion deleteProducto():");
    try {
        const { ProductoId } = req.params;
        // Inhabilitamos el producto con el campo Inactivo para que no se muestre en la lista de productos
        const isDelete = await pool.query('UPDATE Productos SET Inactivo = 1 WHERE ProductoId = ?', [ProductoId]);
        if (isDelete.affectedRows === 1) {
            console.log("Producto eliminado correctamente");
            return res.status(201).json({ Message: 'Producto eliminado correctamente' });
        } else {
            console.log("Error, el producto no existe");
            return res.status(404).json({ Error: 'Error, el producto no existe' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Error: 'Error del servidor ', error });
    }
}