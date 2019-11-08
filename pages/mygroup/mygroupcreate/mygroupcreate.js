// pages/mygroup/mygroupcreate/mygroupcreate.js
import { ENV } from '../../profile.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupName: '',
    inputMemberAliasName:'',
    memberList: [],
    dialog: {
      content: '',
      hidden: true
    }
  },
  memberTempList:[],
  joinGroup:function(e){
    const {inputMemberAliasName} = this.data
    if (inputMemberAliasName.length === 0) {
      this.setData({
        'dialog.hidden': false,
        'dialog.content': '别名不能为空'
      })
      return;
    }
    this.memberTempList.push(inputMemberAliasName)
    this.setData({
      inputMemberAliasName: '',
      memberList: this.memberTempList
    })
  },
  deleteMember: function (e) {
    this.memberTempList.splice(e.target.dataset.index, 1);
    this.setData({
      memberList: this.memberTempList
    })
  },
  inputMemberAliasNameChange: function (e) {
    this.data.inputMemberAliasName = e.detail.value
  },
  inputGroupName: function (e) {
    this.data.groupName = e.detail.value
  },
  confirm() {
    this.setData({
      'dialog.hidden': true,
      'dialog.content': ''
    })
  },
  createGroup : function(){
    var that = this;
    var token = wx.getStorageSync('token');
    const { groupName, memberList } = this.data;
    if (groupName == ''){
      this.setData({
        'dialog.hidden': false,
        'dialog.content': '团名不能为空'
      })
      return;
    }
    wx.request({
      url: ENV.domain + '/groupmark/group/create',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: token,
        groupName: groupName,
        memberList: memberList
      },
      dataType: 'json',
      success(res) {
        if ('0000' == res.data.code){
          that.setData({
            'dialog.hidden': false,
            'dialog.content': '保存成功'
          })
          wx.redirectTo({
            url: '/pages/index/index'
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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