import request from '@/utiles/request'
/**
 * 获取用户频道
 * @returns promise
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 * 获取所有用户频道
 * @returns promise
 */
export const getAllchannelAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
