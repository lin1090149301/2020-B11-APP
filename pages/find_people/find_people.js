// pages/find_people/find_people.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: "",
    search: 0,
    name: "",
    student_number: "",
    school: "",
    college: "",
    major: "",
    contact: "",
  },

  getkey: function (e) {
    this.setData({
      key: e.detail.value,
      search: 0,
    });
  },

  reset: function (e) {
    this.setData({
      search: 0,
    });
  },

  formSubmit0: function (e) {
    if (this.data.key == "") return 0;
    console.log(this.data.key);
    var that = this;
    wx.request({
      url: getApp().globalData.iMatch_url + "/iMatch/find_people",
      method: "POST",
      data: {
        key: this.data.key,
      },
      success: (res) => {
        console.log(res);
        if (res["data"] == false) {
          that.setData({
            search: 0,
          });
          wx.showToast({
            title: "查无此用户",
            icon: "none",
            duration: 2000,
          });
        } else {
          that.setData({
            name: res["data"]["name"],
            student_number: res["data"]["student_number"],
            school: res["data"]["school"],
            college: res["data"]["college"],
            major: res["data"]["major"],
            contact: res["data"]["contact"],
            search: 1,
            key: "",
          });
        }
      },
    });
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