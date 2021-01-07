//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    get_data: "",
    event_id: "",
    number: 4,
    step: 4,
    inputShowed: false,
    inputVal: "",
    showstyle: 1,
    title: [],
    text: [],
    image_name: [],
    state: "列表式",
    add: "加载更多",
    search: "",
    issearch: false,
    openid: "",
    iMatch_url: getApp().globalData.iMatch_url,
  },
  mixins: [require("../../mixin/themeChanged")],
  showInput: function () {
    this.setData({
      inputShowed: true,
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      issearch: false,
    });
    wx.request({
      url: this.data.iMatch_url + "/iMatch",
      // data: this.data.text,
      // method: "POST",
      success: (res) => {
        this.setData({
          get_data: res["data"]["message"],
        });
        getApp().globalData.get_data = this.data.get_data;
        console.log(this.data.get_data);
        // console.log(res);
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
          var a = "text[" + i + "]";
          var b = "title[" + i + "]";
          var c = "image_name[" + i + "]";
          this.setData({
            [a]: res["data"]["message"][i]["text"],
            [b]: res["data"]["message"][i]["title"],
            [c]: res["data"]["message"][i]["post"],
          });
        }
        console.log(this.data.image_name);
      },
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
    });
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  showMore: function () {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  showStyle: function () {
    if (this.data.showstyle == 1) {
      this.setData({
        showstyle: 2,
        state: "表格式",
      });
    } else {
      this.setData({
        showstyle: 1,
        state: "列表式",
      });
    }
  },
  add: function () {
    this.setData({
      add: "加载中...",
    });
    if (this.data.issearch == false) {
      wx.request({
        url: this.data.iMatch_url + "/iMatch",
        // data: this.data.text,
        // method: "POST",
        success: (res) => {
          this.setData({
            get_data: res["data"]["message"],
          });
          getApp().globalData.get_data = this.data.get_data;
          console.log(this.data.get_data);
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
            var a = "text[" + i + "]";
            var b = "title[" + i + "]";
            var c = "image_name[" + i + "]";
            this.setData({
              [a]: res["data"]["message"][i]["text"],
              [b]: res["data"]["message"][i]["title"],
              [c]: res["data"]["message"][i]["post"],
            });
          }
        },
        // fail: (res) => {
        //   this.setData({
        //     add: "加载失败，点击重试",
        //   });
        // },
      });
    } else {
      wx.request({
        url: this.data.iMatch_url + "/search/" + this.data.search,
        // data: this.data.text,
        // method: "POST",
        success: (res) => {
          this.setData({
            get_data: res["data"]["message"],
          });
          getApp().globalData.get_data = this.data.get_data;
          console.log(this.data.get_data);
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
            var a = "text[" + i + "]";
            var b = "title[" + i + "]";
            var c = "image_name[" + i + "]";
            this.setData({
              [a]: res["data"]["message"][i]["text"],
              [b]: res["data"]["message"][i]["title"],
              [c]: res["data"]["message"][i]["post"],
            });
          }
        },
        // fail: (res) => {
        //   this.setData({
        //     add: "加载失败，点击重试",
        //   });
        // },
      });
    }
  },

  bindconfirm: function (e) {
    let content = e.detail.value["search - input"]
      ? e.detail.value["search - input"]
      : e.detail.value;
    // console.log("e.detail.value", content);
    if (content == "") {
      this.setData({
        inputVal: "",
        inputShowed: false,
        issearch: false,
      });
      wx.request({
        url: this.data.iMatch_url + "/iMatch",
        // data: this.data.text,
        // method: "POST",
        success: (res) => {
          this.setData({
            get_data: res["data"]["message"],
          });
          getApp().globalData.get_data = this.data.get_data;
          // console.log(getApp().globalData.get_data);
          // console.log(res);
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
            var a = "text[" + i + "]";
            var b = "title[" + i + "]";
            var c = "image_name[" + i + "]";
            this.setData({
              [a]: res["data"]["message"][i]["text"],
              [b]: res["data"]["message"][i]["title"],
              [c]: res["data"]["message"][i]["post"],
            });
          }
          // console.log(this.data.image_name);
        },
      });
      return 0;
    }
    this.setData({
      search: content,
      issearch: true,
    });
    // console.log(this.data.search);
    wx.request({
      url: this.data.iMatch_url + "/search/" + this.data.search,
      // data: this.data.search,
      // method: "POST",
      success: (res) => {
        this.setData({
          get_data: res["data"]["message"],
        });
        getApp().globalData.get_data = this.data.get_data;
        console.log(getApp().globalData.get_data);
        // console.log(res);
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
          var a = "text[" + i + "]";
          var b = "title[" + i + "]";
          var c = "image_name[" + i + "]";
          this.setData({
            [a]: res["data"]["message"][i]["text"],
            [b]: res["data"]["message"][i]["title"],
            [c]: res["data"]["message"][i]["post"],
          });
        }
      },
    });
  },
  look_event_details: function (e) {
    var i = e.currentTarget.id;
    // console.log(i);
    this.setData({
      event_id: i,
    });
    getApp().globalData.event_id = this.data.event_id;
    wx.navigateTo({
      url: "../event_details/event_details",
    });
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          });
        },
      });
    }
    if (getApp().globalData.openid != "") {
      this.setData({
        openid: getApp().globalData.openid,
      });
    } else {
      app.openidCallback = (openid) => {
        if (openid != "") {
          this.setData({
            openid: getApp().globalData.openid,
          });
        }
      };
    }
    wx.request({
      url: this.data.iMatch_url + "/iMatch",
      // data: this.data.text,
      // method: "POST",
      success: (res) => {
        // console.log(res);
        this.setData({
          get_data: res["data"]["message"],
        });
        getApp().globalData.get_data = this.data.get_data;
        // console.log(getApp().globalData.get_data);
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
          var a = "text[" + i + "]";
          var b = "title[" + i + "]";
          var c = "image_name[" + i + "]";
          this.setData({
            [a]: res["data"]["message"][i]["text"],
            [b]: res["data"]["message"][i]["title"],
            [c]: res["data"]["message"][i]["post"],
          });
        }
        // console.log(this.data.image_name);
      },
    });
  },
  getUserInfo: function (e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
});
