import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: '/bms/carousels',
    method: 'get',
    params: params
  })
}

export function createCarousel(data) {
  return request({
    url: '/bms/carousels',
    method: 'post',
    data: data
  })
}

export function updateCarousel(id, data) {
  return request({
    url: '/bms/carousels/' + id,
    method: 'put',
    data: data
  })
}

export function getCarousel(id) {
  return request({
    url: '/bms/carousels/' + id,
    method: 'get'
  })
}

export function deleteCarousel(id) {
  return request({
    url: '/bms/carousels/' + id,
    method: 'delete'
  })
}

