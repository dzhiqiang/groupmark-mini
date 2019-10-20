//app.js
App({
  onLaunch: function () {
    this.onLogin();
  },
  globalData: {
    userInfo: null
  },
  onLogin:function(){
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res) {
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    // 可以将 res 发送给后台解码出 unionId
                    this.globalData.userInfo = res.userInfo
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (this.userInfoReadyCallback) {
                      this.userInfoReadyCallback(res)
                    }

                  }
                })
              }
            }
          })
          wx.request({
            url: 'http://localhost:8080/groupmark/login/login',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              code: res.code
            },
            dataType: 'json',
            success(loginRes) {
              if (loginRes.data.code == '0000') {
                wx.setStorageSync('token', loginRes.data.token)
              }
            }
          })
        }
      }
    })
    
  }
})