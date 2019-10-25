// pages/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    muchPeopleGroupMemberList: [],
    muchPeoplePayer: [],
    partPlain: true,
    partShowView :false,
    muchPeoplePlain: true,
    muchPeopleShowView: false,
    moneyValue:''
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 3,
      success: function (res) {
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  setPartView: function(e){
    this.setData({
      partPlain: !this.data.partPlain,
      partShowView: !this.data.partShowView
    })
  },
  setMuchPeopleView: function (e) {
    this.setData({
      muchPeoplePlain: !this.data.muchPeoplePlain,
      muchPeopleShowView: !this.data.muchPeopleShowView
    })
  },
  inputMoney:function(e){
    console.log(this.data.moneyValue)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      groupId: options.groupId
    })
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'http://localhost:8080/groupmark/group/myGroupMember',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: token,
        groupId: options.groupId
      },
      dataType: 'json',
      success(res) {
        if ('0000' == res.data.code) {
          that.setData({
            muchPeopleGroupMemberList: res.data.groupMemberList
          })
          var muchPeoplePayer = [];
          res.data.groupMemberList.forEach(member => {
            if (member.self){
              muchPeoplePayer.push(member.memberName)
            }
          })
          that.setData({
            muchPeoplePayer: muchPeoplePayer
          })
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