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
/**
 *删除用户频道
 * @param {Number} id
 * @returns
 */
export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}
/**
 * 添加频道
 * @returns
 */
export const addchannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [
        {
          id,
          seq
        }
      ]
    }
  })
}
