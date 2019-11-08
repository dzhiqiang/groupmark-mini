// pages/share/shareinfo/shareinfo.js
import { ENV } from '../../profile.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitDisabled: false
  },
  setPartView: function (e) {
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
  inputMoney: function (e) {
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
        checkedNum++;
      }
    })

    if (checkedNum == 1) {
      groupMemberList.forEach(groupMember => {
        if (groupMember.muchPeopleChecked) {
          groupMember.muchPeopleMoney = moneyValue;
        }
      })
    }
    //分摊方设置
    var moneyValueFen = moneyValue * 100;
    var groupMemberLength = groupMemberList.length;
    var quotient = parseInt(moneyValueFen / groupMemberLength);
    var remainder = moneyValueFen - (groupMemberLength * parseInt(moneyValueFen / groupMemberLength));
    groupMemberList.forEach(groupMember => {
      if (groupMember.partChecked) {
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
  inputProject: function (e) {
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
  muchPeopleMoneyInput: function (e) {
    var that = this;
    var groupMemberList = that.data.groupMemberList;
    var groupmemid = e.target.dataset.groupmemid;
    var muchPeopleMoney = e.detail.value;
    if (!(/^(\d?)+(\.\d{0,2})?$/.test(muchPeopleMoney))) { //正则验证，提现金额小数点后不能大于两位数字
      muchPeopleMoney = muchPeopleMoney.substring(0, e.detail.value.length - 1);
    }
    for (var groupMember of groupMemberList) {
      if (groupMember.id == groupmemid) {
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
  muchPeopleChange: function (e) {
    var that = this;
    var groupMemberList = that.data.groupMemberList;
    var muchPeoplePayer = [];
    var muchPeopleChecked = e.detail.value;
    groupMemberList.forEach(groupMember => {
      if (muchPeopleChecked.indexOf(groupMember.id + '') >= 0) {
        groupMember.muchPeopleChecked = true;
        muchPeoplePayer.push(groupMember.memberName)
      } else {
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
  saveDetail: function (e) {
    var that = this;
    var moneyValue = this.data.moneyValue;
    this.setData({
      submitDisabled: !this.data.submitDisabled
    })
    if (!this.data.project || !this.data.project.trim()) {
      wx.showToast({
        icon: 'none',
        title: '项目不能为空'
      });
      this.setData({
        submitDisabled: !this.data.submitDisabled
      })
      return;
    }

    if (!this.data.moneyValue) {
      wx.showToast({
        icon: 'none',
        title: '金额不能为空'
      });
      this.setData({
        submitDisabled: !this.data.submitDisabled
      })
      return;
    }

    var groupMemberList = this.data.groupMemberList;
    var muchPeopleDetailMoneyList = [];
    var partDetailMoneyList = [];
    var muckPeopleSum = 0;
    var partSum = 0;
    for (let groupMember of groupMemberList) {
      if (groupMember.partChecked) {
        var partDetailMoney = {};
        partDetailMoney.memberName = groupMember.memberName;
        partDetailMoney.memberId = groupMember.id;
        partDetailMoney.moneyValue = groupMember.partMoney;
        partDetailMoneyList.push(partDetailMoney);
        if (!groupMember.partMoney) {
          wx.showToast({
            icon: 'none',
            title: '选中团员金额不能为空'
          });
          this.setData({
            submitDisabled: !this.data.submitDisabled
          })
          return;
        }
        partSum += parseFloat(groupMember.partMoney);
      }
      if (groupMember.muchPeopleChecked) {
        var muchPeopleDetailMoney = {};
        muchPeopleDetailMoney.memberName = groupMember.memberName;
        muchPeopleDetailMoney.memberId = groupMember.id;
        muchPeopleDetailMoney.moneyValue = groupMember.muchPeopleMoney;
        muchPeopleDetailMoneyList.push(muchPeopleDetailMoney);
        if (!groupMember.muchPeopleMoney) {
          wx.showToast({
            icon: 'none',
            title: '选中团员金额不能为空'
          });
          this.setData({
            submitDisabled: !this.data.submitDisabled
          })
          return;
        }
        muckPeopleSum += parseFloat(groupMember.muchPeopleMoney);
      }
    }

    if (moneyValue != muckPeopleSum) {
      wx.showToast({
        icon: 'none',
        title: '多人付款总金额不符'
      });
      this.setData({
        submitDisabled: !this.data.submitDisabled
      })
      return;
    }

    if (moneyValue != partSum) {
      wx.showToast({
        icon: 'none',
        title: '多人分摊总金额不符'
      });
      this.setData({
        submitDisabled: !this.data.submitDisabled
      })
      return;
    }

    if (muchPeopleDetailMoneyList.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '付款者不能为空'
      });
      this.setData({
        submitDisabled: !this.data.submitDisabled
      })
      return;
    }

    if (partDetailMoneyList.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '分摊方不能为空'
      });
      this.setData({
        submitDisabled: !this.data.submitDisabled
      })
      return;
    }

    var token = wx.getStorageSync('token');
    var id = this.data.id;
    var data = {
      id: id,
      token: token,
      groupId: this.data.groupId,
      project: this.data.project,
      moneyValue: this.data.moneyValue,
      muchPeopleFlag: this.data.muchPeopleShowView,
      partFlag: this.data.partShowView,
      remark: this.data.remark,
      muchPeopleDetail: JSON.stringify(muchPeopleDetailMoneyList),
      partDetail: JSON.stringify(partDetailMoneyList)
    };
    wx.request({
      url: ENV.domain + '/groupmark/detail/create',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: data,
      dataType: 'json',
      success(res) {
        if ('0000' == res.data.code) {
          wx.showToast({
            icon: 'success',
            title: '成功'
          });
          wx.navigateBack({
            delta: 1
          })
        } else if ('0014' == res.data.code){
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          });
          that.loadDetail();
        }
      },
      fail(res) {
        wx.showToast({
          icon: 'none',
          title: '保存失败'
        });
        this.setData({
          submitDisabled: !this.data.submitDisabled
        })
      }
    })
  },
  deleteDetail : function(){
    var that = this;
    var detailId = this.data.id;
    var token = wx.getStorageSync('token');
    wx.showModal({
      title: '提示',
      content: '确定要删除吗?',
      success: function (e) {
        if (e.confirm) {
          wx.request({
            url: ENV.domain + '/groupmark/detail/deleteDetail',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              token: token,
              detailId: detailId
            },
            dataType: 'json',
            success: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.detailId,
      groupId: options.groupId
    });
    this.loadDetail();
  },
  loadDetail:function(){
    var that = this;
    var detailId = that.data.id;
    var token = wx.getStorageSync('token');
    wx.request({
      url: ENV.domain + '/groupmark/detail/detailInfo',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: token,
        detailId: detailId
      },
      dataType: 'json',
      success(res) {
        if ('0000' == res.data.code) {
          var detailInfoJson = JSON.parse(res.data.detailInfo);
          var partPayer = [];
          var muchPeoplePayer = [];
          var groupMemberList = detailInfoJson.memberMoneyList;
          groupMemberList.forEach(groupMember => {
            if (groupMember.partChecked) {
              partPayer.push(groupMember.memberName);
            }
            if (groupMember.muchPeopleChecked) {
              muchPeoplePayer.push(groupMember.memberName);
            }
          });
          that.setData({
            groupMemberList: groupMemberList,
            partPlain: !detailInfoJson.partFlag,
            partShowView: detailInfoJson.partFlag,
            muchPeoplePlain: !detailInfoJson.muchPeopleFlag,
            muchPeopleShowView: detailInfoJson.muchPeopleFlag,
            moneyValue: detailInfoJson.moneyValue,
            project: detailInfoJson.project,
            remark: detailInfoJson.remark,
            partPayer: partPayer,
            muchPeoplePayer: muchPeoplePayer,
            modifyFlag: detailInfoJson.modifyFlag,
            deleteFlag: detailInfoJson.deleteFlag
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