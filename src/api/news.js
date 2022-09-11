import request from '@/utiles/request'

/**
 * 用于获取文章列表
 * @param {Number} id 获取文章得id
 * @param {Number} timestamp 当前时间戳
 * @returns promise
 */
export const getArt = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
