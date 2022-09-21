import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: '/fms/forums',
    method: 'get',
    params: params
  })
}

export function getForum(id) {
  return request({
    url: '/fms/forums/' + id,
    method: 'get'
  })
}

export function deleteForum(id) {
  return request({
    url: '/fms/forums/' + id,
    method: 'delete'
  })
}

