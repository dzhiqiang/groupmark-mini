// pages/mygroup/mygrouplist/mygrouplist.js
import { ENV } from '../../profile.js'
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
      groupId: options.groupId
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
    this.showGroupInfo();
    this.showGroupDetailInfo();
  },
  showGroupInfo: function () {
    var that = this;
    var token = wx.getStorageSync('token');
    var groupId = this.data.groupId;
    wx.request({
      url: ENV.domain + '/groupmark/group/groupInfo',
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
            groupName: res.data.gmGroup.groupName
          })
        }
      }
    })
  },
  showGroupDetailInfo: function () {
    var that = this;
    var token = wx.getStorageSync('token');
    var groupId = this.data.groupId;
    wx.request({
      url: ENV.domain + '/groupmark/detail/detailList',
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
            gmDetailViewList: res.data.gmDetailViewList
          })
        }
      }
    })
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