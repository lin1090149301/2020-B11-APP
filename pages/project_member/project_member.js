// pages/project_member/project_member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: "",
    members_name: [],
    members_student_number: [],
    members_school: [],
    members_college: [],
    members_major: [],
    delete_or_quit: "",

    androidDialog1: false,
    androidDialog2: false,

    id:"",
  },

  close: function () {
    this.setData({
        androidDialog1: false,
        androidDialog2: false,
    })
  },
  
  openAndroid1: function (e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      androidDialog1: true,
      id:e.currentTarget.dataset.index,
    });
  },
  
  openAndroid2: function (e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      androidDialog2: true,
      id:e.currentTarget.dataset.index,
    });
  },

  delete: function () {
    this.setData({
      androidDialog1: false,
      androidDialog2: false,
    });
    var i = this.data.id;
    //getApp().globalData.members_project_id = this.data.project_id[i];
    console.log(this.data.members_student_number[i]);
    wx.request({
      url:
        getApp().globalData.iMatch_url +
        "/iMatch/project_members_delete",
      method: "POST",
      data:{
        project_id: getApp().globalData.members_project_id,
        members_student_number:this.data.members_student_number[this.data.id],
      },
      success: (res) => {
        console.log(res);
        if (res["data"] == 'success') {
          wx.showToast({
            title: "成功移除",
            icon: "success",
            duration: 2000,
          });

          wx.request({
            url:
              getApp().globalData.iMatch_url +
              "/iMatch/project_members/" +
              getApp().globalData.members_project_id,
            // data: this.data.text,
            // method: "POST",
            success: (res) => {
              console.log(res["data"]["message"]);
              this.setData({
                number: res["data"]["message"].length,
                //leader_name: getApp().globalData.user_title1,
              });
              for (var i = 0; i < this.data.number; i++) {
                var a = "members_name[" + i + "]";
                var b = "members_student_number[" + i + "]";
                var c = "members_school[" + i + "]";
                var d = "members_college[" + i + "]";
                var e = "members_major[" + i + "]";
                this.setData({
                  [a]: res["data"]["message"][i]["members_name"],
                  [b]: res["data"]["message"][i]["members_student_number"],
                  [c]: res["data"]["message"][i]["members_school"],
                  [d]: res["data"]["message"][i]["members_college"],
                  [e]: res["data"]["message"][i]["members_major"],
                });
              }
            },
          });
        }

        
      },
    });
  },

  quit: function () {
    this.setData({
      androidDialog1: false,
      androidDialog2: false,
    });
    //var i = this.data.id;
    //getApp().globalData.members_project_id = this.data.project_id[i];
    //console.log(this.data.members_student_number[i]);
    wx.request({
      url:
        getApp().globalData.iMatch_url +
        "/iMatch/project_members_quit",
      method: "POST",
      data:{
        project_id: getApp().globalData.members_project_id,
        openid:getApp().globalData.openid,
      },
      success: (res) => {
        console.log(res);
        if (res["data"] == 'success') {
        var pages = getCurrentPages(); //页面栈
        var beforePage = pages[pages.length - 2];
        console.log(beforePage.route);
        if (beforePage.route == "pages/i_join/i_join") {
          beforePage.onLoad(); //这个函数式调用接口的函数
        }

        wx.showToast({
          title: "成功退出",
          icon: "success",
          duration: 2000,
        });

        setTimeout(function () {
          beforePage = pages[pages.length - 1];
          wx.navigateBack({
            delta: 1, //返回的页面数，如果 delta 大于现有页面数，则返回到首页。
            success: function () {
              if (beforePage.route == "pages/i_join/i_join") {
                beforePage.onLoad(); //这个函数式调用接口的函数
              }
            },
          });
            //要延时执行的代码
        }, 2000); //延迟时间 这里是5秒

        }

        
      },
    });
  },

  // quit: function (e) {
  //   var i = e.currentTarget.id;
  //   // console.log(i);
  //   getApp().globalData.members_project_id = this.data.project_id[i];
  //   getApp().globalData.delete_or_quit = 1;
  //   console.log(getApp().globalData.members_project_id);
  //   wx.navigateTo({
  //     url: "../project_member/project_member",
  //   });
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      delete_or_quit:getApp().globalData.delete_or_quit,
    })

    wx.request({
      url:
        getApp().globalData.iMatch_url +
        "/iMatch/project_members/" +
        getApp().globalData.members_project_id,
      // data: this.data.text,
      // method: "POST",
      success: (res) => {
        console.log(res["data"]["message"]);
        this.setData({
          number: res["data"]["message"].length,
          //leader_name: getApp().globalData.user_title1,
        });
        for (var i = 0; i < this.data.number; i++) {
          var a = "members_name[" + i + "]";
          var b = "members_student_number[" + i + "]";
          var c = "members_school[" + i + "]";
          var d = "members_college[" + i + "]";
          var e = "members_major[" + i + "]";
          this.setData({
            [a]: res["data"]["message"][i]["members_name"],
            [b]: res["data"]["message"][i]["members_student_number"],
            [c]: res["data"]["message"][i]["members_school"],
            [d]: res["data"]["message"][i]["members_college"],
            [e]: res["data"]["message"][i]["members_major"],
          });
        }
      },
    });

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