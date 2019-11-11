const db = wx.cloud.database({});

const cont = db.collection('bookinfo');

Page({

  data: {
    "bnrUrl": [

      {
        "url": "/images/6.jpg"
      }, 
      {
        "url": "/images/5.jpg"
      }, 
      {
        "url": "/images/1.jpg"
      }, {
        "url": "/images/2.jpg"
      }, {
        "url": "/images/3.jpg"
      }, {
        "url": "/images/4.jpg"
      }
    ],
    booklist: [],
    bookimg: "/images/book.jpg"
  },

  onLoad: function(options) {
    //获取数据库的所有的图书文件
    var that = this;
    wx.request({
      url: 'http://localhost:8080/xcx/index',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var datalist = res.data
        that.setData({
          booklist: datalist
        })
        // console.log(res.data)
        // console.log(datalist)
      }
    })

  },
  update: function(event) {
    console.log(1)
  },
  onSearch:function(event){
    console.log(event)
    var that = this;
    wx.request({
      url: 'http://localhost:8080/xcx/search',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var searchdata = res.data
        that.setData({
          booklist: searchdata
        })
      }
    })
  }
})