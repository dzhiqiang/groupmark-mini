// pages/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupMemberList: [],
    muchPeoplePayer: [],
    partPayer: [],
    partPlain: true,
    partShowView :false,
    muchPeoplePlain: true,
    muchPeopleShowView: false,
    moneyValue:'',
    project:''
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 1,
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
    var moneyValue = e.detail.value;
    if (!(/^(\d?)+(\.\d{0,2})?$/.test(moneyValue))) { //正则验证，提现金额小数点后不能大于两位数字
      moneyValue = moneyValue.substring(0, e.detail.value.length - 1);
    } 
    this.setData({
      moneyValue: moneyValue
    })
    //付款者设置
    var groupMemberList = this.data.groupMemberList;
    var checkedNum = 0;
    groupMemberList.forEach(groupMember => {
      if (groupMember.muchPeopleChecked) {
        checkedNum ++;
      }
    })
    
    if (checkedNum == 1){
      groupMemberList.forEach(groupMember => {
        if (groupMember.muchPeopleChecked) {
          groupMember.muchPeopleMoney = moneyValue;
        }
      })
    }
    //分摊方设置
    var moneyValueFen = moneyValue*100;
    var groupMemberLength = groupMemberList.length;
    var quotient = parseInt(moneyValueFen / groupMemberLength);
    var remainder = moneyValueFen - (groupMemberLength * parseInt(moneyValueFen / groupMemberLength));
    groupMemberList.forEach(groupMember => {
      if (groupMember.partChecked){
        if (groupMemberLength == 1) {
          groupMember.partMoney = (quotient + remainder) / 100;
        } else {
          groupMember.partMoney = quotient / 100;
        }
        groupMemberLength--;
      }
      
    })
    this.setData({
      groupMemberList: groupMemberList
    })
  },
  inputProject:function(e){
    var inputProject = e.detail.value;
    this.setData({
      project: inputProject
    })
  },
  remarkInput: function (e) {
    var remark = e.detail.value;
    this.setData({
      remark: remark
    })
  },
  muchPeopleMoneyInput:function(e){
    var that = this;
    var groupMemberList = that.data.groupMemberList;
    var groupmemid = e.target.dataset.groupmemid;
    var muchPeopleMoney = e.detail.value;
    if (!(/^(\d?)+(\.\d{0,2})?$/.test(muchPeopleMoney))) { //正则验证，提现金额小数点后不能大于两位数字
      muchPeopleMoney = muchPeopleMoney.substring(0, e.detail.value.length - 1);
    }
    for(var groupMember of groupMemberList){
      if(groupMember.id == groupmemid){
        groupMember.muchPeopleMoney = muchPeopleMoney;
      }
    }
    that.setData({
      groupMemberList: groupMemberList
    })
  },
  partMoneyInput: function (e) {
    var that = this;
    var groupMemberList = that.data.groupMemberList;
    var groupmemid = e.target.dataset.groupmemid;
    var partMoney = e.detail.value;
    if (!(/^(\d?)+(\.\d{0,2})?$/.test(partMoney))) { //正则验证，提现金额小数点后不能大于两位数字
      partMoney = partMoney.substring(0, e.detail.value.length - 1);
    }
    for (var groupMember of groupMemberList) {
      if (groupMember.id == groupmemid) {
        groupMember.partMoney = partMoney;
      }
    }
    that.setData({
      groupMemberList: groupMemberList
    })
  },
  muchPeopleChange:function(e){
    var that = this;
    var groupMemberList = that.data.groupMemberList;
    var muchPeoplePayer = [];
    var muchPeopleChecked = e.detail.value;
    groupMemberList.forEach(groupMember => {
      if (muchPeopleChecked.indexOf(groupMember.id+'')>=0){
        groupMember.muchPeopleChecked = true;
        muchPeoplePayer.push(groupMember.memberName)
      }else{
        groupMember.muchPeopleChecked = false;
      }
    })
    that.setData({
      groupMemberList: groupMemberList,
      muchPeoplePayer: muchPeoplePayer
    })
  },
  partChange: function (e) {
    var that = this;
    var groupMemberList = that.data.groupMemberList;
    var partPayer = [];
    var partChecked = e.detail.value;
    groupMemberList.forEach(groupMember => {
      if (partChecked.indexOf(groupMember.id + '') >= 0) {
        groupMember.partChecked = true;
        partPayer.push(groupMember.memberName)
      } else {
        groupMember.partChecked = false;
      }
    })
    that.setData({
      groupMemberList: groupMemberList,
      partPayer: partPayer
    })
  },
  saveDetail:function(e){
    
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
          var muchPeoplePayer = [];
          var partPayer = [];
          res.data.groupMemberList.forEach(groupMember => {
            groupMember.partChecked = true;
            partPayer.push(groupMember.memberName);
            if (groupMember.muchPeopleChecked){
              muchPeoplePayer.push(groupMember.memberName);
            }
          });
          that.setData({
            partPayer: partPayer,
            muchPeoplePayer: muchPeoplePayer,
            groupMemberList: res.data.groupMemberList
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