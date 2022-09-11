import request from '@/utiles/request'
// import store from '@/store/index'
/**
 * 登录
 * @param {String} mobile 手机号
 * @param {Nubmer} code 验证码
 * @returns promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data: {
      mobile,
      code
    }
  })
}

/**
 *
 * @param {Number} mobile 手机号
 * @returns promise
 */
export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 *  获取用户个人信息
 * @returns promise
 */
export const getuserinfo = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    // }
  })
}
