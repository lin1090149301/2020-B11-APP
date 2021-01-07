// pages/invite_project/invite_project.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getin1: "",
    getin2: "",
  },

  getinput1: function (e) {
    this.setData({
      getin1: e.detail.value,
      search: 0,
    });
  },

  getinput2: function (e) {
    this.setData({
      getin2: e.detail.value,
    });
  },

  formSubmit: function (e) {
    console.log(this.data.getin1);
    console.log(this.data.getin2);
    wx.request({
      url: getApp().globalData.iMatch_url + "/iMatch/invite_project",
      method: "POST",
      data: {
        leader_openid: getApp().globalData.openid,
        // leader_name: getApp().globalData.user_title1,
        project_id: this.data.getin1,
        invited_student_number: this.data.getin2,
      },
      success: (res) => {
        console.log(res);

        if (res["data"] == "noproject") {
          wx.showToast({
            title: "不存在此项目",
            icon: "none",
            duration: 2000,
          });
        }
        else if (res["data"] == "noowner") {
          wx.showToast({
            title: "您不是该项目的创建者，无法邀请",
            icon: "none",
            duration: 2000,
          });
        }
        else if (res["data"] == "nostudent") {
          wx.showToast({
            title: "查无此被邀请者",
            icon: "none",
            duration: 2000,
          });
        }
        else if (res["data"] == "self") {
          wx.showToast({
            title: "您不能邀请自己",
            icon: "none",
            duration: 2000,
          });
        }
        else if (res["data"] == "exist") {
          wx.showToast({
            title: "此用户已存在于该团队",
            icon: "none",
            duration: 2000,
          });
        }
        else {
          wx.showToast({
            title: "邀请成功",
            icon: "success",
            duration: 2000,
          });
          this.setData({
            getin1: "",
            getin2: "",
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