// pages/message/message.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    number: "",
    applicant_college: [],
    applicant_major: [],
    applicant_name: [],
    applicant_school: [],
    applicant_student_number: [],
    applicant_openid: [],
    message: [],
    project_id: [],
    project_name: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (
      getApp().globalData.message_number ||
      getApp().globalData.message_number == 0
    ) {
      this.setData({
        number: getApp().globalData.message_number,
      });
      wx.request({
        url:
          getApp().globalData.iMatch_url +
          "/iMatch/message_list/" +
          getApp().globalData.openid,
        // data: this.data.text,
        // method: "POST",
        success: (res) => {
          console.log(res["data"]["message"]);
          for (var i = 0; i < this.data.number; i++) {
            var a = "applicant_college[" + i + "]";
            var b = "applicant_major[" + i + "]";
            var c = "applicant_name[" + i + "]";
            var d = "applicant_school[" + i + "]";
            var e = "applicant_student_number[" + i + "]";
            var f = "message[" + i + "]";
            var g = "project_id[" + i + "]";
            var h = "project_name[" + i + "]";
            var j = "applicant_openid[" + i + "]";
            this.setData({
              [a]: res["data"]["message"][i]["applicant_college"],
              [b]: res["data"]["message"][i]["applicant_major"],
              [c]: res["data"]["message"][i]["applicant_name"],
              [d]: res["data"]["message"][i]["applicant_school"],
              [e]: res["data"]["message"][i]["applicant_student_number"],
              [f]: res["data"]["message"][i]["message"],
              [g]: res["data"]["message"][i]["project_id"],
              [h]: res["data"]["message"][i]["project_name"],
              [j]: res["data"]["message"][i]["applicant_openid"],
            });
            if (res["data"]["message"][i]["message"] == null) {
              this.setData({
                [f]: "无",
              });
            }
          }
        },
      });
    } else {
      app.message_numberCallback = (message_number) => {
        if (message_number || message_number == 0) {
          this.setData({
            number: getApp().globalData.message_number,
          });
          wx.request({
            url:
              getApp().globalData.iMatch_url +
              "/iMatch/message_list/" +
              getApp().globalData.openid,
            // data: this.data.text,
            // method: "POST",
            success: (res) => {
              console.log(res["data"]["message"]);
              for (var i = 0; i < this.data.number; i++) {
                var a = "applicant_college[" + i + "]";
                var b = "applicant_major[" + i + "]";
                var c = "applicant_name[" + i + "]";
                var d = "applicant_school[" + i + "]";
                var e = "applicant_student_number[" + i + "]";
                var f = "message[" + i + "]";
                var g = "project_id[" + i + "]";
                var h = "project_name[" + i + "]";
                var j = "applicant_openid[" + i + "]";
                this.setData({
                  [a]: res["data"]["message"][i]["applicant_college"],
                  [b]: res["data"]["message"][i]["applicant_major"],
                  [c]: res["data"]["message"][i]["applicant_name"],
                  [d]: res["data"]["message"][i]["applicant_school"],
                  [e]: res["data"]["message"][i]["applicant_student_number"],
                  [f]: res["data"]["message"][i]["message"],
                  [g]: res["data"]["message"][i]["project_id"],
                  [h]: res["data"]["message"][i]["project_name"],
                  [j]: res["data"]["message"][i]["applicant_openid"],
                });
                if (res["data"]["message"][i]["message"] == null) {
                  this.setData({
                    [f]: "无",
                  });
                }
              }
            },
          });
        }
      };
    }
  },

  look_message_details: function (e) {
    var i = e.currentTarget.id;
    getApp().globalData.applicant_college = this.data.applicant_college[i];
    getApp().globalData.applicant_major = this.data.applicant_major[i];
    getApp().globalData.applicant_name = this.data.applicant_name[i];
    getApp().globalData.applicant_school = this.data.applicant_school[i];
    getApp().globalData.applicant_student_number = this.data.applicant_student_number[
      i
    ];
    getApp().globalData.apply_message = this.data.message[i];
    getApp().globalData.project_id = this.data.project_id[i];
    getApp().globalData.project_name = this.data.project_name[i];
    getApp().globalData.applicant_openid = this.data.applicant_openid;
    (getApp().globalData.message_id = i),
      wx.navigateTo({
        url: "../message_details/message_details",
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
