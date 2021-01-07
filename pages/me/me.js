// pages/me/me.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user_title1: "",   //姓名
    user_title2: "",   //学号
    user_title3: "",   //学校
    user_title4: "",   //学院
    user_title5: "",   //专业
    user_title6: "",   //联系方式
    message_number: "",
    other_message_number: "",
  },
  set_user_title: function (e) {
    wx.navigateTo({
      url: "../set_user_title/set_user_title",
    });
  },

  toMessage: function (e) {
    wx.navigateTo({
      url: "../message/message",
    });
  },

  to_other_Message: function (e) {
    wx.navigateTo({
      url: "../other_message/other_message",
    });
  },

  find_people: function (e) {
    wx.navigateTo({
      url: "../find_people/find_people",
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (getApp().globalData.user_title1 != "") {
      this.setData({
        user_title1: "姓名：" + getApp().globalData.user_message["name"],
        user_title2:
          "学号：" + getApp().globalData.user_message["student_number"],
        user_title3: "学校：" + getApp().globalData.user_message["school"],
        user_title4: "学院：" + getApp().globalData.user_message["college"],
        user_title5: "专业：" + getApp().globalData.user_message["major"],
        user_title6: "联系方式：" + getApp().globalData.user_message["contact"],
      });
    } else {
      app.user_title1Callback = (user_title1) => {
        if (user_title1 != "") {
          this.setData({
            user_title1: "姓名：" + getApp().globalData.user_message["name"],
            user_title2:
              "学号：" + getApp().globalData.user_message["student_number"],
            user_title3: "学校：" + getApp().globalData.user_message["school"],
            user_title4: "学院：" + getApp().globalData.user_message["college"],
            user_title5: "专业：" + getApp().globalData.user_message["major"],
            user_title6: "联系方式：" + getApp().globalData.user_message["contact"],
          });
        }
      };
    }

    if (
      getApp().globalData.message_number ||
      getApp().globalData.message_number == 0
    ) {
      this.setData({
        message_number: getApp().globalData.message_number,
      });
      console.log("1赋值message_number", this.data.message_number);
    } else {
      console.log(
        "判定",
        getApp().globalData.message_number != null,
        getApp().globalData.message_number
      );
      app.message_numberCallback = (message_number) => {
        if (message_number || message_number == 0) {
          this.setData({
            message_number: getApp().globalData.message_number,
          });
          console.log("2赋值message_number", this.data.message_number);
        }
      };
    }

    if (
      getApp().globalData.other_message_number ||
      getApp().globalData.other_message_number == 0
    ) {
      this.setData({
        other_message_number: getApp().globalData.other_message_number,
      });
      console.log("1赋值other_message_number", this.data.other_message_number);
    } else {
      console.log(
        "判定",
        getApp().globalData.other_message_number != null,
        getApp().globalData.other_message_number
      );
      app.other_message_numberCallback = (other_message_number) => {
        if (other_message_number || other_message_number == 0) {
          this.setData({
            other_message_number: getApp().globalData.other_message_number,
          });
          console.log(
            "2赋值other_message_number",
            this.data.other_message_number
          );
        }
      };
    }

    console.log(this.data.message_number, this.data.other_message_number);
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
