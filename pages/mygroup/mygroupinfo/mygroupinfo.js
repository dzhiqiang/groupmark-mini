// pages/mygroup/mygroupinfo/mygroupinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputMemberAliasName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      groupName: options.groupName,
      groupId: options.groupId
    })
    this.loadMember();
  },
  loadMember : function(){
    var that = this;
    var token = wx.getStorageSync('token');
    var groupId = this.data.groupId;
    wx.request({
      url: 'http://localhost:8080/groupmark/group/myGroupMember',
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
            groupMemberList: res.data.groupMemberList
          })
        }
      }
    })
  },
  joinGroup:function(e){
    var that = this;
    var token = wx.getStorageSync('token');
    var memberAliasName = this.data.inputMemberAliasName;
    var groupId = this.data.groupId;
    if (!memberAliasName || !memberAliasName.trim()){
      wx.showToast({
        icon: 'none',
        title: '请输入团员名'
      });
      return;
    }
    wx.request({
      url: 'http://localhost:8080/groupmark/group/addGroupMember',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: token,
        groupId: groupId,
        memberAliasName: memberAliasName.trim()
      },
      dataType: 'json',
      success(res) {
        if ('0000' == res.data.code) {
          that.setData({
            inputMemberAliasName: ''
          });
          that.loadMember();
        }
      }
    })
  },
  inputMemberAliasNameChange : function(e){
    this.data.inputMemberAliasName = e.detail.value
  },
  inputGroupNameChange : function(e){
    this.data.groupName = e.detail.value
  },
  modifyGroupName : function(){
    var groupName = this.data.groupName;
    if (!groupName || !groupName.trim()) {
      wx.showToast({
        icon: 'none',
        title: '请输入团名'
      });
      return;
    }
    var that = this;
    var token = wx.getStorageSync('token');
    var groupId = this.data.groupId;
    wx.request({
      url: 'http://localhost:8080/groupmark/group/modifyGroupName',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: token,
        groupId: groupId,
        groupName: groupName.trim()
      },
      dataType: 'json',
      success(res) {
        if ('0000' == res.data.code) {
          that.setData({
            inputMemberAliasName: ''
          });
          that.loadMember();
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