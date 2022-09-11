import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const Id = 'id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getId() {
  return Cookies.get(Id)
}

export function setId(id) {
  return Cookies.set(Id, id)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
