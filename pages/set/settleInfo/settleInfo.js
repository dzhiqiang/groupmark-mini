// pages/set/settleInfo/settleInfo.js
import { ENV } from '../../profile.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      settleId:options.settleId
    });
    this.settleInfo();
  },
  settleInfo :function(){
    var that = this;
    var settleId = this.data.settleId;
    var token = wx.getStorageSync('token');
    wx.request({
      url: ENV.domain + '/groupmark/group/settleInfo',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: token,
        settleId: settleId
      },
      dataType: 'json',
      success(res) {
        if ('0000' == res.data.code) {
          that.setData({
            setNum: res.data.settleResponse.setNum,
            setMoney: res.data.settleResponse.setMoney,
            setResponseList: res.data.settleResponse.memberSetList,
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})