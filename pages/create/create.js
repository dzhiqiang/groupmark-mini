// pages/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectGroupInputText: '',
    selectGroupInputValue:'',
    checkitems: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'FRA', value: '法国' },
    ],
    items: [
      { value: 'USA', name: '美国' },
      { value: 'CHN', name: '中国' },
      { value: 'BRA', name: '巴西' },
      { value: 'JPN', name: '日本' },
      { value: 'ENG', name: '英国' },
      { value: 'FRA', name: '法国' }
    ],
    partPlain: true,
    partShowView :false,
    muchPeoplePlain: true,
    muchPeopleShowView: false
  },
  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
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
      url: 'http://localhost:8080/groupmark/group/myGroup',
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
            myGroupList: res.data.myGroupList
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