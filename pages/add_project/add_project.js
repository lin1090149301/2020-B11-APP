// pages/add_project/add_project.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // tab切换
    currentTab: 0,
    getin1: "",
    getin2: "",
    getin3: "",
    getin4: "",
    search: 0,
    project_name: "",
    leader_name: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData.user_title1);
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      });
    }
  },

  getinput1: function (e) {
    this.setData({
      getin1: e.detail.value,
      search: 0,
    });
  },

  getinput4: function (e) {
    this.setData({
      getin4: e.detail.value,
    });
  },

  formSubmit0: function (e) {
    if (this.data.getin1 == "") return 0;
    console.log(this.data.getin1);
    var that = this;
    wx.request({
      url: getApp().globalData.iMatch_url + "/iMatch/find_project",
      method: "POST",
      data: {
        project_id: this.data.getin1,
      },
      success: (res) => {
        console.log(res);
        if (res["data"] == false) {
          that.setData({
            search: 0,
          });
          wx.showToast({
            title: "查无此项目",
            icon: "none",
            duration: 2000,
          });
        } else {
          that.setData({
            project_name: res["data"]["project_name"],
            leader_name: res["data"]["leader_name"],
            search: 1,
            getin4: "",
          });
        }
      },
    });
  },

  apply: function (e) {
    wx.request({
      url: getApp().globalData.iMatch_url + "/iMatch/apply",
      method: "POST",
      data: {
        project_id: this.data.getin1,
        applicant_openid: getApp().globalData.openid,
        message: this.data.getin4,
      },
      success: (res) => {
        console.log(res);
        if (res["data"] == "joined") {
          wx.showToast({
            title: "您已在该项目中",
            icon: "none",
            duration: 2000,
          });
        }
        else if (res["data"] == "leader") {
          wx.showToast({
            title: "您已是该项目队长",
            icon: "none",
            duration: 2000,
          });
        }
        else if (res["data"] == false) {
          wx.showToast({
            title: "您已经提出过申请",
            icon: "none",
            duration: 2000,
          });
        }
        else {
          wx.showToast({
            title: "申请成功",
            icon: "success",
            duration: 2000,
          });
          this.setData({
            getin4: "",
          });
        }
      },
    });
  },

  reset: function (e) {
    this.setData({
      search: 0,
    });
  },

  getinput2: function (e) {
    this.setData({
      getin2: e.detail.value,
    });
  },

  getinput3: function (e) {
    this.setData({
      getin3: e.detail.value,
    });
  },

  formSubmit1: function (e) {
    console.log(this.data.getin2);
    console.log(this.data.getin3);
    wx.request({
      url: getApp().globalData.iMatch_url + "/iMatch/creat_project",
      method: "POST",
      data: {
        leader_openid: getApp().globalData.openid,
        leader_name: getApp().globalData.user_title1,
        project_name: this.data.getin2,
        introduction: this.data.getin3,
      },
      success: (res) => {
        console.log(res);
        wx.showToast({
          title: "创建成功",
          icon: "success",
          duration: 2000,
        });
        this.setData({
          getin2: "",
          getin3: "",
        });
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
