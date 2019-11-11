// pages/scan/scan.js
Page({

/**
 * 页面的初始数据
 */
data: {

},

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {

},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function() {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function() {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function() {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function() {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function() {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function() {

},
scanCode: function(event) {
  // console.log(1)
  // 允许从相机和相册扫码
  wx.scanCode({
    onlyFromCamera: true,
    scanType: 'barCode',
    success: res => {
      console.log(res.result)
      wx.cloud.callFunction({
        // 要调用的云函数名称
        name: 'bookinfo',
        // 传递给云函数的参数
        data: {
          isbn: res.result
        },
        success: res => {
          //  console.log(res)
          //进一步的处理
          var bookString = res.result;
          console.log(JSON.parse(bookString))
          //云数据库初始化
          const db = wx.cloud.database({});
          const book = db.collection('booklist')
          db.collection('booklist').add({
            // data 字段表示需新增的 JSON 数据
            data: JSON.parse(bookString)
          }).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        },
        fail: err => {
          console.error(res)
        }
      })
      console.log(JSON.parse(res.result))
    },
    fail: err => {
      console.log(err);
    }
  })
}
})