// pages/project/project.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  i_creat: function (e) {
    wx.navigateTo({
      url: "../i_creat/i_creat",
    });
  },

  i_join: function (e) {
    wx.navigateTo({
      url: "../i_join/i_join",
    });
  },

  add_project: function (e) {
    wx.navigateTo({
      url: "../add_project/add_project",
    });
  },

  invite_project: function (e) {
    wx.navigateTo({
      url: "../invite_project/invite_project",
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
