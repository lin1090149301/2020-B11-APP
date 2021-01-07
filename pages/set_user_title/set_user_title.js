// pages/set_user_title/set_user_title.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user_title1: "",
    user_title2: "",
    user_title3: "",
    user_title4: "",
    user_title5: "",
    iMatch_url: getApp().globalData.iMatch_url,
  },
  mixins: [require("../../mixin/themeChanged")],
  /**
   * 生命周期函数--监听页面加载
   */
  input1: function (e) {
    this.setData({
      user_title1: e.detail.value,
    });
  },
  input2: function (e) {
    this.setData({
      user_title2: e.detail.value,
    });
  },
  input3: function (e) {
    this.setData({
      user_title3: e.detail.value,
    });
  },
  input4: function (e) {
    this.setData({
      user_title4: e.detail.value,
    });
  },
  input5: function (e) {
    this.setData({
      user_title5: e.detail.value,
    });
  },
  clear: function (e) {
    this.setData({
      user_title1: "",
      user_title2: "",
      user_title3: "",
      user_title4: "",
      user_title5: "",
    });
  },
  formSubmit: function (e) {
    console.log(
      this.data.user_title1,
      this.data.user_title2,
      this.data.user_title3,
      this.data.user_title4,
      this.data.user_title5
    );
    wx.request({
      url:
        this.data.iMatch_url +
        "/iMatch/me/change/" +
        getApp().globalData.openid,
      method: "POST",
      data: {
        name: this.data.user_title1,
        student_number: this.data.user_title2,
        school: this.data.user_title3,
        college: this.data.user_title4,
        major: this.data.user_title5,
      },
      success: (res) => {
        if (res["data"] == "number_existed") {
          wx.showToast({
            title: "学号已存在！",
            icon: "none",
            duration: 2000,
          });
        }

        else {
          wx.showToast({
            title: "修改成功",
            icon: "success",
            duration: 2000,
          });
          setTimeout(function () {
            getApp().globalData.user_title1 = "";
            getApp().onLaunch();
            let pages = getCurrentPages(); //页面栈
            let beforePage = pages[pages.length - 2];
            // console.log(beforePage.route);
            wx.navigateBack({
              delta: 1, //返回的页面数，如果 delta 大于现有页面数，则返回到首页。
              success: function () {
                if (beforePage.route == "pages/me/me") {
                  beforePage.onLoad(); //这个函数式调用接口的函数
                }
              },
            });
            //要延时执行的代码
          }, 2000); //延迟时间 这里是2秒
        }

        
      },
    });
  },
  onLoad: function (options) {
    this.setData({
      user_title1: getApp().globalData.user_title1,
      user_title2: getApp().globalData.user_title2,
      user_title3: getApp().globalData.user_title3,
      user_title4: getApp().globalData.user_title4,
      user_title5: getApp().globalData.user_title5,
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
