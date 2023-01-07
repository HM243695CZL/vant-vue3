import request from '@/utils/request';


export function postAction(url: string, data: any, state: boolean = true) {
  return request({
    url,
    method: 'post',
    data,
    state
  })
}

export function getAction(url: string, data: any, state: boolean = true) {
  return request({
    url: url,
    method: 'get',
    data,
    state
  })
}
