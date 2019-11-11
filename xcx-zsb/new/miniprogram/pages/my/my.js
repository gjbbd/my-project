// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  // my页面按钮跳转页面  
  // 借阅
  borrow(){
    wx.navigateTo({
      url: '/pages/borrow/borrow',
    })
  },
  // 预约
  order(){
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },
  // 收藏
  favorite(){
    wx.navigateTo({
      url: '/pages/favorite/favorite',
    })
  },
  // 历史
  history(){
    wx.navigateTo({
      url: '/pages/history/history',
    })
  },
  // 读者证
  perInfo(){
    wx.navigateTo({
      url: '/pages/perInfo/perInfo',
    })
  },
  // 帮助
  help(){
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // perInfo:function(param){

    // }
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