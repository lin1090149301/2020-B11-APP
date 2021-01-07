// pages/other_message/other_message.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    number: "",
    message: [],
    message_id: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (
      getApp().globalData.other_message_number ||
      getApp().globalData.other_message_number == 0
    ) {
      this.setData({
        number: getApp().globalData.other_message_number,
      });
      wx.request({
        url:
          getApp().globalData.iMatch_url +
          "/iMatch/other_message_list/" +
          getApp().globalData.openid,
        // data: this.data.text,
        // method: "POST",
        success: (res) => {
          console.log(res["data"]["message"]);
          for (var i = 0; i < this.data.number; i++) {
            var a = "message[" + i + "]";
            var b = "message_id[" + i + "]";
            this.setData({
              [a]: res["data"]["message"][i]["text"],
              [b]: res["data"]["message"][i]["message_id"],
            });
          }
        },
      });
    } else {
      app.other_message_numberCallback = (other_message_number) => {
        if (other_message_number || other_message_number == 0) {
          this.setData({
            number: getApp().globalData.other_message_number,
          });
          wx.request({
            url:
              getApp().globalData.iMatch_url +
              "/iMatch/other_message_list/" +
              getApp().globalData.openid,
            // data: this.data.text,
            // method: "POST",
            success: (res) => {
              console.log(res["data"]["message"]);
              for (var i = 0; i < this.data.number; i++) {
                var a = "message[" + i + "]";
                var b = "message_id[" + i + "]";
                this.setData({
                  [a]: res["data"]["message"][i]["text"],
                  [b]: res["data"]["message"][i]["message_id"],
                });
              }
            },
          });
        }
      };
    }
  },

  look_other_message_details: function (e) {
    var i = e.currentTarget.id;
    getApp().globalData.other_message = this.data.message[i];
    getApp().globalData.other_message_sql_id = this.data.message_id[i];
    (getApp().globalData.message_id = i),
      wx.navigateTo({
        url: "../other_message_details/other_message_details",
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
