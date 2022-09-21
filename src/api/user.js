import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/ums/login',
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: '/ums/' + id,
    method: 'get'
  })
}

export function logout(token) {
  return request({
    url: '/users/loginOut?token=' + token,
    method: 'get'
  })
}

export function fetchList(params) {
  return request({
    url: '/ums/list',
    method: 'get',
    params: params
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/ums/status/' + id,
    method: 'put',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/ums/register',
    method: 'post',
    data: data
  })
}

export function updateAdmin(id, data) {
  return request({
    url: '/ums/' + id,
    method: 'put',
    data: data
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/ums/' + id,
    method: 'delete'
  })
}
