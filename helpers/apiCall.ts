import request from "../utils/axios";
import { RowData } from "../models";

export const getAllProduct = async () => {
    return await request
        .get("/get_all_product")
        .then((res) => res.data)
        .catch((err) => err);
};

export const getProduct = async (id: string) => {
    return await request
        .get("/get_product", {
            params: {
                id,
            },
        })
        .then((res) => res.data)
        .catch((err) => err);
};

export const createProduct = async (product: RowData) => {
    return await request
        .post("/create_product", {
            Request: {
                price: Number(product.price),
                productName: product.productName,
                productSku: product.productName,
                quantity: Number(product.quantity),
            },
        })
        .then((res) => res.data)
        .catch((err) => err);
};

export const getProductByName = async (name: string) => {
    return await request
        .get(`/get_product_by_name?${name}`)
        .then((res) => res.data)
        .catch((err) => err);
};

export const updateProduct = async (product: RowData) => {
    return request
        .put("/update_product", {
            body: {
                productId: product.id,
                price: product.price,
                productName: product.productName,
                productSku: product.productName,
                quantity: product.quantity,
            },
        })
        .then((res) => res.data)
        .catch((err) => err);
};

export const deleteProduct = async (id: string) => {
    return await request
        .delete(`/delete_product/${id}`)
        .then((res) => res.data)
        .catch((err) => err);
};

export const getProductQr = async (id: string) => {
    return await request
        .post("/get_qr", {
            params: {
                id,
            },
        })
        .then((res) => res.data)
        .catch((err) => err);
};

export const getUserInfo = async () => {
    return await request
        .get("/user_info")
        .then((res) => res.data)
        .catch((err) => err);
};
