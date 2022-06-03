import axios from 'axios'
import { AuthModel } from '../models/AuthModel'
import { UserModel } from '../models/UserModel'
import store from '../../../../setup/redux/Store'
import { CONFIG } from '../../../../helpers/config'

export const LOGIN_URL = `${CONFIG.GETWAY_URL}/${CONFIG.GETWAY_PATH}/user/gettoken`
export const LOGOUT_URL = `${CONFIG.GETWAY_URL}/${CONFIG.GETWAY_PATH}/user/logout`
export const REGISTER_URL = `${CONFIG.GETWAY_URL}/${CONFIG.GETWAY_PATH}/user/register`
export const REQUEST_PASSWORD_URL = `${CONFIG.GETWAY_URL}/${CONFIG.GETWAY_PATH}/user/forgetpass`
export const CHANGE_PASSWORD_URL = `${CONFIG.GETWAY_URL}/${CONFIG.GETWAY_PATH}/changepass`

// Server should return AuthModel
export function login(userName: string, password: string) {
  return axios.post(LOGIN_URL, { user: userName, pass: password }, { headers: { Authorization: `Bearer ${CONFIG.GETWAY_TOKEN}` } })
}

export function logout(accessToken: string) {
  return axios.post(LOGOUT_URL, { token: accessToken }, { headers: { Authorization: `Bearer ${CONFIG.GETWAY_TOKEN}` } })
}

// Server should return AuthModel
export const register = (
  Email: string,
  Name: string,
  UserName: string,
  PassWord: string,
  Address: string,
  confirmPassword: string,
  DateOfBirth: string,
  Mobile: string,
  Sex: string,
) => {
  return axios.post<any>(REGISTER_URL, {
    Email,
    Name,
    UserName,
    PassWord,
    Address,
    Mobile,
    Sex,
    IsAuctioner: false,
    IsDeleted: false,
  }, { headers: { Authorization: `Bearer ${CONFIG.GETWAY_TOKEN}` } })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, { email })
}
export function changePassword(
  email: string,
  password: string,
  confirmPassword: string,
  token: string
) {
  return axios.post<{ result: boolean }>(CHANGE_PASSWORD_URL, {
    email,
    password,
    confirmPassword,
    token,
  })
}
