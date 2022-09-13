import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: '/oms/orders',
    method: 'get',
    params: params
  })
}

export function getOrder(id) {
  return request({
    url: '/oms/orders/' + id,
    method: 'get'
  })
}

export function deleteOrder(id) {
  return request({
    url: '/oms/orders/' + id,
    method: 'delete'
  })
}

