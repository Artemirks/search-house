import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";

export const registration = async (last_name, email, password) => {
    const { data } = await $host.post('api/user/registraion', { last_name, email, password });
    localStorage.setItem('token', data.jwt_token)
    return jwtDecode(data.jwt_token)
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const getOne = async (id) => {
    const { data } = await $authHost.get(`api/user/${id}`)
    return data
}

export const update = async (userData) => {
    const { data } = await $authHost.put(`api/user/`, userData)
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}