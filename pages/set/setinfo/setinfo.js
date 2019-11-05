// pages/set/setinfo/setinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitDisabled :false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var groupId = options.groupId;
    this.setData({
      groupId : groupId
    });
    this.doSetView();
    
  },
  doSetView:function(){
    var that = this;
    var groupId = that.data.groupId;
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'http://localhost:8080/groupmark/group/doSet',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: token,
        groupId: groupId
      },
      dataType: 'json',
      success(res) {
        if ('0000' == res.data.code) {
          that.setData({
            setNum: res.data.doSetResponse.setNum,
            setMoney: res.data.doSetResponse.setMoney,
            detailIdList: res.data.doSetResponse.detailIdList,
            setResponseList: res.data.doSetResponse.setResponseList,
          });
        }
      }
    })
  },
  setDetail : function(){
    var that = this;
    var token = wx.getStorageSync('token');
    var groupId = that.data.groupId;
    var detailIdList = that.data.detailIdList;
    wx.request({
      url: 'http://localhost:8080/groupmark/group/setDetail',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: token,
        groupId: groupId,
        detailIdList: detailIdList
      },
      dataType: 'json',
      success(res) {
        if ('0000' == res.data.code) {
          wx.navigateTo({
            url: '/pages/index/index',
          })
        }else{
          that.doSetView();
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