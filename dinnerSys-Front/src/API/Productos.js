import {BACK_URL} from '../utils/Constants.js';
import axios from 'axios';

/* Object Structure:
    {
        ProductoId: x,
        Nombre: x,
        Descripcion: x,
        Categoria: x,
        Precio: x,
    }

*/

//Get all products
export const getProducts = async () => { 
    try {
        const products = await axios.get(`${BACK_URL}/productos/getProductos`);
        return products.status === 200 ? products.data : null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

//Create new Product
export const createProduct = async (newProduct) => { 
    try {
        const isCreate = await axios.post(`${BACK_URL}/productos/createProducto`, newProduct);
        return isCreate.status === 201 ? true : false;
    } catch (error) {
        console.log(error);
        return null;
    }
};


//Update Product
export const updateProduct = async (id, upProduct) => { 
    try {
        const isUpdate = await axios.put(`${BACK_URL}/productos/updateProducto/${id}`, upProduct);
        return isUpdate.status === 201 ? true : false;
    } catch (error) {
        console.log(error);
        return null;
    }
};


//Delete Product
export const deleteProduct = async (id) => { 
    try {
        const isDelete = await axios.delete(`${BACK_URL}/productos/deleteProducto/${id}`);
        return isDelete.status === 201 ? true : false;
    } catch (error) {
        console.log(error);
        return null;
    }
};