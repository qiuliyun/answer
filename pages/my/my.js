//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasUserInfo: false,
    canIUse : wx.canIUse('button.open-type.getUserInfo'),
  },

  onLoad: function (options) {

    //登陆
    if(wx.getStorageSync("user") == ""){

      // 查看是否授权
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                wx.clearStorage();
                wx.setStorageSync("user", res.userInfo);
              }
            })
          }
        }
      })
    }else{
      var srcc = wx.getStorageSync("user")
      this.setData({
        hasUserInfo: true,
        userInfo: srcc
      })
    } 
  },
  bindGetUserInfo: function (e) {
    wx.clearStorage();
    wx.setStorageSync("user", e.detail.userInfo);
    this.setData({
      hasUserInfo:true,
      userInfo: e.detail.userInfo
    })
  }, 


  //专业大类选择
  selschool : function(){
    wx.navigateTo({
      url: '/pages/mysel/myschool/myschool',
    })
  },

//关于模态框
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  }
})
