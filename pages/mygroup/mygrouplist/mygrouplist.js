// pages/mygroup/mygrouplist/mygrouplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupId:'',
    groupName:''
  },
  targetModifyGroup:function(e){
    wx.navigateTo({
      url: '/pages/mygroup/mygroupinfo/mygroupinfo?groupId=' + this.data.groupId + '&groupName=' + this.data.groupName
    });
  },
  toCreateDetail:function(e){
    wx.navigateTo({
      url: '/pages/create/create?groupId=' + this.data.groupId + '&groupName=' + this.data.groupName
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      groupName: options.groupName,
      groupId: options.groupId,
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