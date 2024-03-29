import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";

export const create = async (id_user) => {
    const { data } = await $authHost.post('api/object/', { id_user });
    return data
}

export const getAll = async (id_user) => {
    const { data } = await $authHost.get(`api/object/?id_user=${id_user}`);
    return data
}

export const getOneUpdate = async (id, id_user) => {
    const { data } = await $authHost.post(`api/object/forUpdate`, { id, id_user });
    return data
}

export const update = async (objectData) => {
    const { data } = await $authHost.put(`api/object/`, objectData);
    return data
}

export const deleteApart = async (id, id_user) => {
    const { data } = await $authHost.delete(`api/object/${id}/${id_user}`);
    return data
}

export const getAppartTypes = async () => {
    const { data } = await $authHost.post(`api/object/apartmentTypes`)
    return data
}

export const getBedTypes = async () => {
    const { data } = await $authHost.post(`api/object/bedTypes`)
    return data
}

export const getKitchenTypes = async () => {
    const { data } = await $authHost.post(`api/object/kitchenTypes`)
    return data
}

export const getCities = async (inputValue) => {
    const { data } = await $authHost.post(`api/object/cities`, { inputValue })
    return data
}