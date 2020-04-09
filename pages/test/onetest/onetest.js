// pages/test/onetest/onetest.js
const db = wx.cloud.database({
  env: 'test-u6y3g'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ti : "",
    istrue : true,
    ischoose : true,
  },

//查询
  formSubmit: function (e) {
   var that = this;
    var tiid = e.detail.value.ti_id;
    if(tiid < 890){
      db.collection('sel').where({
        ti_id : tiid
      })
        .get({
          success: function (res) {

            that.setData({
              ti : res.data[0],
              ischoose : true,
              istrue : true
            })
          }
        })
    }else{
      db.collection('judge').where({
        ti_id : tiid
      })
        .get({
          success: function (res) {
            that.setData({
              ti: res.data[0],
              ischoose : false,
              istrue: true
            })
          }
        })
    }
   
  },

  //答案对比
  formSubmit2 : function(e){
    if (this.data.ti == ""){
      wx.showToast({
        title: '请选择题目',
        icon: 'loading',
      })
      
    }else{
      if (e.detail.value.answer == this.data.ti.trueAnswer) {
        wx.showToast({
          title: '回答正确',
          icon: 'success',
        })
        this.setData({
          istrue: true
        })
      } else {
        this.setData({
          istrue: false
        })
      }
    }
    
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