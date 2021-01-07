// pages/individual_team/individual_team.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // tab切换
    currentTab: 0,
    // event_id: getApp().globalData.event_id,
    number: 0,
    step: 4,
    title: [],
    first: [],
    second: [],
    third: [],
    fourth: [],
    getin1: "",
    getin2: "",
    getin3: "",
    getin4: "",
    getin5: "",
    get_data: "",
    add: "加载更多",
  },
  mixins: [require("../../mixin/themeChanged")],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url:
        getApp().globalData.iMatch_url +
        "/iMatch/get_individual_team/" +
        getApp().globalData.get_data[getApp().globalData.event_id]["id"],
      // data: this.data.text,
      // method: "POST",
      success: (res) => {
        console.log(res);
        this.setData({
          get_data: res["data"]["message"],
        });
        console.log(this.data.get_data);
        if (res["data"]["message"].length >= this.data.step) {
          this.setData({
            number: this.data.step,
          });
        } else if (res["data"]["message"].length < this.data.step) {
          this.setData({
            number: res["data"]["message"].length,
          });
        }
        for (var i = 0; i < this.data.number; i++) {
          var a = "title[" + i + "]";
          var b = "first[" + i + "]";
          var c = "second[" + i + "]";
          var d = "third[" + i + "]";
          var e = "fourth[" + i + "]";
          this.setData({
            [a]: res["data"]["message"][i]["title"],
            [b]: res["data"]["message"][i]["first"],
            [c]: res["data"]["message"][i]["second"],
            [d]: res["data"]["message"][i]["third"],
            [e]: res["data"]["message"][i]["fourth"],
          });
        }
        // console.log(this.data.image_name);
      },
    });
  },
  add: function () {
    this.setData({
      add: "加载中...",
    });
    wx.request({
      url:
        getApp().globalData.iMatch_url +
        "/iMatch/get_individual_team/" +
        getApp().globalData.get_data[getApp().globalData.event_id]["id"],
      // data: this.data.text,
      // method: "POST",
      success: (res) => {
        this.setData({
          get_data: res["data"]["message"],
        });
        // console.log(res);
        if (
          res["data"]["message"].length >=
          this.data.number + this.data.step
        ) {
          this.setData({
            number: this.data.number + this.data.step,
            add: "加载更多",
          });
        } else if (
          res["data"]["message"].length < this.data.number + this.data.step &&
          res["data"]["message"].length > this.data.number
        ) {
          this.setData({
            number: res["data"]["message"].length,
            add: "加载更多",
          });
        } else {
          this.setData({
            add: "没有更多了",
          });
          var that = this;
          setTimeout(function () {
            that.setData({
              add: "加载更多",
            });
            //要延时执行的代码
          }, 5000); //延迟时间 这里是5秒
        }
        for (var i = 0; i < this.data.number; i++) {
          var a = "title[" + i + "]";
          var b = "first[" + i + "]";
          var c = "second[" + i + "]";
          var d = "third[" + i + "]";
          var e = "fourth[" + i + "]";
          this.setData({
            [a]: res["data"]["message"][i]["title"],
            [b]: res["data"]["message"][i]["first"],
            [c]: res["data"]["message"][i]["second"],
            [d]: res["data"]["message"][i]["third"],
            [e]: res["data"]["message"][i]["fourth"],
          });
        }
      },
      // fail: (res) => {
      //   this.setData({
      //     add: "加载失败，点击重试",
      //   });
      // },
    });
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
    if (this.data.currentTab == 0) {
      wx.request({
        url:
          getApp().globalData.iMatch_url +
          "/iMatch/get_individual_team/" +
          getApp().globalData.get_data[getApp().globalData.event_id]["id"],
        // data: this.data.text,
        // method: "POST",
        success: (res) => {
          console.log(res);
          this.setData({
            get_data: res["data"]["message"],
          });
          console.log(this.data.get_data);
          if (res["data"]["message"].length >= this.data.step) {
            this.setData({
              number: this.data.step,
            });
          } else if (res["data"]["message"].length < this.data.step) {
            this.setData({
              number: res["data"]["message"].length,
            });
          }
          for (var i = 0; i < this.data.number; i++) {
            var a = "title[" + i + "]";
            var b = "first[" + i + "]";
            var c = "second[" + i + "]";
            var d = "third[" + i + "]";
            var e = "fourth[" + i + "]";
            this.setData({
              [a]: res["data"]["message"][i]["title"],
              [b]: res["data"]["message"][i]["first"],
              [c]: res["data"]["message"][i]["second"],
              [d]: res["data"]["message"][i]["third"],
              [e]: res["data"]["message"][i]["fourth"],
            });
          }
          // console.log(this.data.image_name);
        },
      });
    }
  },
  getinput1: function (e) {
    this.setData({
      getin1: e.detail.value,
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
  getinput4: function (e) {
    this.setData({
      getin4: e.detail.value,
    });
  },
  getinput5: function (e) {
    this.setData({
      getin5: e.detail.value,
    });
  },
  formSubmit: function (e) {
    console.log(
      this.data.getin1,
      this.data.getin2,
      this.data.getin3,
      this.data.getin4,
      this.data.getin5,
    );
    wx.request({
      url:
        getApp().globalData.iMatch_url +
        "/iMatch/post_individual_team/" +
        getApp().globalData.openid,
      method: "POST",
      data: {
        event_id: getApp().globalData.get_data[getApp().globalData.event_id][
          "id"
        ],
        title: this.data.getin1,
        first: this.data.getin2,
        second: this.data.getin3,
        third: this.data.getin4,
        fourth: this.data.getin5,
      },
      success: (res) => {
        wx.showToast({
          title: "发布成功",
          icon: "success",
          duration: 2000,
        });
      },
    });
    this.setData({
      getin1: "",
      getin2: "",
      getin3: "",
      getin4: "",
      getin5: "",
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
