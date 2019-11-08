//index.js
//获取应用实例
const app = getApp()
import { ENV } from '../profile.js'
Page({
  data: {
    myGroupList:[],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onPullDownRefresh: function () {
    this.onShow();
    wx.stopPullDownRefresh();
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toCreateGroup: function (e) {
    wx.navigateTo({
      url: '/pages/mygroup/mygroupcreate/mygroupcreate'
    });
  },
  setDetail:function(e){
    var groupId = e.target.dataset.groupid;
    wx.navigateTo({
      url: '/pages/set/setinfo/setinfo?groupId='+groupId
    });
  },
  setDetailList:function(e){
    var groupId = e.target.dataset.groupid;
    wx.navigateTo({
      url: '/pages/set/settleList/settleList?groupId=' + groupId
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    var that = this;
    var token = wx.getStorageSync('token');
    wx.request({
      url: ENV.domain + '/groupmark/group/myGroupView',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: token
      },
      dataType: 'json',
      success(res) {
        if ('0000' == res.data.code) {
          that.setData({
            myGroupList: res.data.myGroupViewList
          })
        }
      }
    })
  }
})
