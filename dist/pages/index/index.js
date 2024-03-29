'use strict';

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'Index page',
    userInfo: {},
    currentPage: 0,
    topics: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    var _this = this;

    console.log(' ---------- onLoad ----------');
    // console.dir(app.data)
    app.getUserInfo().then(function (info) {
      return _this.setData({ userInfo: info });
    }).catch(console.info);
    this.fetchData();
  },

  /**
   * 获取图片列表
   * @return Array
   */
  fetchData: function fetchData() {
    var self = this;
    var limit = 10;
    var start = self.data.currentPage * limit;

    wx.showLoading({
      title: '害羞ing'
    });
    wx.request({
      url: 'https://haixiu.huangsy.me/api/topics?start=' + start + '&limit=' + limit,
      header: {
        'content-type': 'application/json'
      },
      success: function success(res) {
        wx.hideLoading();
        self.setData({
          topics: res.data.docs
        });
      },
      fail: function fail(err) {
        wx.hideLoading();
        wx.showToast({
          title: '网络异常',
          duration: 2000
        });
      }

    });
  },
  fetchPre: function fetchPre() {
    var self = this;
    if (self.data.currentPage > 0) {
      self.setData({
        currentPage: self.data.currentPage - 1
      });
      self.fetchData();
    }
  },
  fetchNext: function fetchNext() {
    console.log('next');
    var self = this;
    self.setData({
      currentPage: self.data.currentPage + 1
    });
    self.fetchData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    console.log(' ---------- onReady ----------');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    console.log(' ---------- onShow ----------');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    console.log(' ---------- onHide ----------');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    console.log(' ---------- onUnload ----------');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    console.log(' ---------- onPullDownRefresh ----------');
  }
});
//# sourceMappingURL=index.js.map
