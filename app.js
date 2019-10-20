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
          wx.getUserInfo({
            success: userInfoRes => {
              var userInfo = userInfoRes.userInfo;
              this.globalData.userInfo = userInfoRes.userInfo;
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(userInfoRes)
              }
              wx.request({
                url: 'http://localhost:8080/groupmark/login/login',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  code: res.code,
                  nickName: userInfo.nickName
                },
                dataType: 'json',
                success(loginRes) {
                  if (loginRes.data.code == '0000'){
                    wx.setStorageSync('token', loginRes.data.token)
                  }
                }
              })
            }
          });
        }
      }
    })
  }
})