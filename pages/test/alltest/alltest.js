// pages/test/alltest/alltest.js
const db = wx.cloud.database({
  env: 'test-u6y3g'
})

var tihao = [];
var cuoti = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ti: "",
    ischoose: true,
    isdati : false,
    truecount : 0,
    count : 0,
    isfinish : false
  },




  //答案对比
  formSubmit2: function (e) {
      if (e.detail.value.answer == this.data.ti.trueAnswer) {
        this.setData({
          truecount : this.data.truecount+1,
          isdati : true
        })
        
      } else {
        var cuo = { "tihao": this.data.ti.ti_id, "my": e.detail.value.answer, "daan": this.data.ti.trueAnswer}
        cuoti.push(cuo)
        this.setData({
          isdati: true
        })
      }
    

  },

next :function(){
  this.setData({
    isdati : false,
    count: this.data.count+1
  })
  var that = this;
  if (this.data.count ==100){
      return
  }
  var tiid = tihao[this.data.count].toString();
  if (tiid < 890) {
    db.collection('sel').where({
      ti_id: tiid
    })
      .get({
        success: function (res) {
          console.log(res)
          that.setData({
            ti: res.data[0],
            ischoose: true
          })
        }
      })
  } else {
    db.collection('judge').where({
      ti_id: tiid
    })
      .get({
        success: function (res) {
          that.setData({
            ti: res.data[0],
            ischoose: false
          })
        }
      })
  }
},

sumall : function(){
  this.setData({
    cuolist : cuoti,
    isfinish : true
  })
},



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //随机生成题号数组
    var arr = [];
    for (var i = 0; i < 80; i++) {
      var arrNum = parseInt(Math.random() * 889)+1;
      var flag = true;
      for (var j = 0; j <= arr.length; j++) {
        if (arrNum == arr[j]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        arr.push(arrNum);
      } else {
        i--;
      }
    }

    var arr2 = [];
    for (var i = 0; i < 20; i++) {
      var arrNum2 = parseInt(Math.random() * 240) + 890;
      var flag2 = true;
      for (var j = 0; j <= arr.length; j++) {
        if (arrNum2 == arr[j]) {
          flag2 = false;
          break;
        }
      }
      if (flag2) {
        arr2.push(arrNum2);
      } else {
        i--;
      }
    }
    
    var arrti = arr.concat(arr2)
    console.log(arrti);
    tihao = arrti;


    var that = this;
    var tiid = tihao[0].toString();
    if (tiid < 890) {
      db.collection('sel').where({
        ti_id: tiid
      })
        .get({
          success: function (res) {
            that.setData({
              ti: res.data[0],
              ischoose: true
            })
          }
        })
    } else {
      db.collection('judge').where({
        ti_id: tiid
      })
        .get({
          success: function (res) {
            that.setData({
              ti: res.data[0],
              ischoose: false
            })
          }
        })
    }
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