import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: '/bms/books',
    method: 'get',
    params: params
  })
}

export function createBook(data) {
  return request({
    url: '/bms/books',
    method: 'post',
    data: data
  })
}

export function updateBook(id, data) {
  return request({
    url: '/bms/books/' + id,
    method: 'put',
    data: data
  })
}

export function getBook(id) {
  return request({
    url: '/bms/books/' + id,
    method: 'get'
  })
}

export function deleteBook(id) {
  return request({
    url: '/bms/books/' + id,
    method: 'delete'
  })
}

