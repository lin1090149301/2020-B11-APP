// pages/message_details/message_details.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    applicant_college: "",
    applicant_major: "",
    applicant_name: "",
    applicant_school: "",
    applicant_student_number: "",
    apply_message: "",
    project_id: "",
    project_name: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      applicant_college: getApp().globalData.applicant_college,
      applicant_major: getApp().globalData.applicant_major,
      applicant_name: getApp().globalData.applicant_name,
      applicant_school: getApp().globalData.applicant_school,
      applicant_student_number: getApp().globalData.applicant_student_number,
      apply_message: getApp().globalData.apply_message,
      project_id: getApp().globalData.project_id,
      project_name: getApp().globalData.project_name,
      applicant_openid: getApp().globalData.applicant_openid,
    });
  },

  accept: function (e) {
    wx.request({
      url:
        getApp().globalData.iMatch_url +
        "/iMatch/accept_join_project/" +
        getApp().globalData.applicant_openid[getApp().globalData.message_id] +
        "/" +
        this.data.project_id,
      success: (res) => {
        console.log(res);
        getApp().globalData.message_number = null;
        getApp().globalData.other_message_number = null;
        getApp().onLaunch();
        var pages = getCurrentPages(); //页面栈
        var beforePage = pages[pages.length - 3];
        // console.log(beforePage.route);
        if (beforePage.route == "pages/me/me") {
          beforePage.onLoad(); //这个函数式调用接口的函数
        }
        wx.showToast({
          title: "已同意",
          icon: "success",
          duration: 2000,
        });
        setTimeout(function () {
          beforePage = pages[pages.length - 2];
          wx.navigateBack({
            delta: 1, //返回的页面数，如果 delta 大于现有页面数，则返回到首页。
            success: function () {
              if (beforePage.route == "pages/message/message") {
                beforePage.onLoad(); //这个函数式调用接口的函数
              }
            },
          });
          //要延时执行的代码
        }, 2000); //延迟时间 这里是5秒
      },
    });
  },

  refuse: function (e) {
    wx.request({
      url:
        getApp().globalData.iMatch_url +
        "/iMatch/refuse_join_project/" +
        getApp().globalData.applicant_openid[getApp().globalData.message_id] +
        "/" +
        this.data.project_id,
      success: (res) => {
        console.log(res);
        getApp().globalData.message_number = null;
        getApp().globalData.other_message_number = null;
        getApp().onLaunch();
        var pages = getCurrentPages(); //页面栈
        var beforePage = pages[pages.length - 3];
        // console.log(beforePage.route);
        if (beforePage.route == "pages/me/me") {
          beforePage.onLoad(); //这个函数式调用接口的函数
        }
        wx.showToast({
          title: "已拒绝",
          icon: "success",
          duration: 2000,
        });
        setTimeout(function () {
          beforePage = pages[pages.length - 2];
          wx.navigateBack({
            delta: 1, //返回的页面数，如果 delta 大于现有页面数，则返回到首页。
            success: function () {
              if (beforePage.route == "pages/message/message") {
                beforePage.onLoad(); //这个函数式调用接口的函数
              }
            },
          });
          //要延时执行的代码
        }, 2000); //延迟时间 这里是5秒
      },
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
