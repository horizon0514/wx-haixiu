// 获取全局应用程序实例对象
const app = getApp()

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
  onLoad () {
    console.log(' ---------- onLoad ----------')
    // console.dir(app.data)
    app.getUserInfo()
      .then(info => this.setData({ userInfo: info }))
      .catch(console.info)
    this.fetchData()
  },
  /**
   * 获取图片列表
   * @return Array
   */
  fetchData () {
    const self = this
    const limit = 10
    const start = self.data.currentPage * limit

    wx.showLoading({
      title: '害羞ing'
    })
    wx.request({
      url: `https://haixiu.huangsy.me/api/topics?start=${start}&limit=${limit}`,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        self.setData({
          topics: res.data.docs
        })
      },
      fail: function (err) {
        wx.hideLoading()
        wx.showToast({
          title: '网络异常',
          duration: 2000
        })
      }

    })
  },
  fetchPre () {
    const self = this
    if(self.data.currentPage>0) {
      self.setData({
        currentPage: self.data.currentPage - 1
      })
      self.fetchData()
    } 
  },
  fetchNext () {
    console.log('next')
    const self = this
    self.setData({
      currentPage: self.data.currentPage + 1
    })
    self.fetchData()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    console.log(' ---------- onReady ----------')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    console.log(' ---------- onShow ----------')
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    console.log(' ---------- onUnload ----------')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    console.log(' ---------- onPullDownRefresh ----------')
  }
})
