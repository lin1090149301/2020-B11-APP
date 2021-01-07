// pages/event_details/event_details.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    get_data: "",
    event_id: "",
    image_url: "",
    iMatch_url: getApp().globalData.iMatch_url,
  },
  mixins: [require("../../mixin/themeChanged")],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      get_data: getApp().globalData.get_data,
      event_id: getApp().globalData.event_id,
      image_url:
        this.data.iMatch_url +
        "/image/" +
        getApp().globalData.get_data[getApp().globalData.event_id]["post"],
    });
  },
  individual_team: function (e) {
    wx.navigateTo({
      url: "../individual_team/individual_team",
    });
  },
  team_recruitment: function (e) {
    wx.navigateTo({
      url: "../team_recruitment/team_recruitment",
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(this.data.get_data);
    console.log(this.data.event_id);
  },

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
