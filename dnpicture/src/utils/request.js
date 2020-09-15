// 封装promise请求
// 原因 : 微信原生请求不支持promise, uni请求没有加载中状态

const request = params => {
  // loading
  uni.showLoading({ title: '正在加载', mask: true })

  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      },
      complete() {
        // 关闭loading
        uni.hideLoading()
      },
    })
  })
}

export default request
