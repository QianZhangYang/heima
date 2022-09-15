import request from '@/utiles/request'
/**
 * 用于获取建议
 * @param {*} q 关键词
 * @returns
 */
export const getSuggestionAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
/**
 * 用于获取结果
 * @param {Number} page
 * @param {Number} per_page
 * @param {string} q
 * @returns
 */
export const getResultAPI = (/* eslint-disable-line */ page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
