// pages/i_join/i_join.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    number: "",
    members_number: [],
    project_id: [],
    project_name: [],
    leader_name: [],
  },

  look_members: function (e) {
    var i = e.currentTarget.id;
    // console.log(i);
    getApp().globalData.members_project_id = this.data.project_id[i];
    getApp().globalData.delete_or_quit = 1;
    console.log(getApp().globalData.members_project_id);
    wx.navigateTo({
      url: "../project_member/project_member",
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url:
        getApp().globalData.iMatch_url +
        "/iMatch/i_join_list/" +
        getApp().globalData.openid,
      // data: this.data.text,
      // method: "POST",
      success: (res) => {
        console.log(res["data"]["message"]);
        this.setData({
          number: res["data"]["message"].length,
        });
        for (var i = 0; i < this.data.number; i++) {
          var a = "project_name[" + i + "]";
          var b = "project_id[" + i + "]";
          var c = "members_number[" + i + "]";
          var d = "leader_name[" + i + "]";
          this.setData({
            [a]: res["data"]["message"][i]["project_name"],
            [b]: res["data"]["message"][i]["project_id"],
            [c]: res["data"]["message"][i]["members_number"],
            [d]: res["data"]["message"][i]["leader_name"],
          });
        }
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
