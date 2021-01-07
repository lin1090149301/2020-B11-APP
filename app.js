//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);

    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // console.log(res.code);
          //发起网络请求
          wx.request({
            url: this.globalData.iMatch_url + "/iMatch/login",
            method: "POST",
            data: {
              code: res.code,
            },
            success: (res) => {
              console.log(res["data"]);
              this.globalData.openid = res["data"];
              if (this.openidCallback) {
                this.openidCallback(this.globalData.openid);
              }
              wx.request({
                url:
                  this.globalData.iMatch_url +
                  "/iMatch/me/" +
                  this.globalData.openid,
                success: (res) => {
                  this.globalData.user_message = res["data"]["message"][0];
                  console.log(this.globalData.user_message);
                  this.globalData.user_title1 = this.globalData.user_message[
                    "name"
                  ];
                  if (this.user_title1Callback) {
                    this.user_title1Callback(this.globalData.user_title1);
                  }
                  this.globalData.user_title2 = this.globalData.user_message[
                    "student_number"
                  ];
                  this.globalData.user_title3 = this.globalData.user_message[
                    "school"
                  ];
                  this.globalData.user_title4 = this.globalData.user_message[
                    "college"
                  ];
                  this.globalData.user_title5 = this.globalData.user_message[
                    "major"
                  ];
                  this.globalData.user_title6 = this.globalData.user_message[
                    "contact"
                  ];
                },
              });
              wx.request({
                url:
                  this.globalData.iMatch_url +
                  "/iMatch/message/" +
                  this.globalData.openid,
                success: (res) => {
                  console.log(res);
                  this.globalData.message_number = res["data"]["message"][0];
                  this.globalData.other_message_number =
                    res["data"]["message"][1];
                  if (this.message_numberCallback) {
                    this.message_numberCallback(this.globalData.message_number);
                  }
                  if (this.other_message_numberCallback) {
                    this.other_message_numberCallback(
                      this.globalData.other_message_number
                    );
                  }
                  console.log("申请消息：", this.globalData.message_number);
                  console.log(
                    "其他消息：",
                    this.globalData.other_message_number
                  );
                },
              });
              // wx.request({
              //   url:
              //     this.globalData.iMatch_url +
              //     "/iMatch/other_message/" +
              //     this.globalData.openid,
              //   success: (res) => {
              //     console.log("其他消息数", res);
              //     this.globalData.other_message_number = res["data"];
              //     if (this.other_message_numberCallback) {
              //       this.other_message_numberCallback(
              //         this.globalData.other_message_number
              //       );
              //     }
              //   },
              // });
            },
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      },
    });
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            },
          });
        }
      },
    });
  },
  globalData: {
    userInfo: null,
    get_data: "",
    event_id: "",
    openid: "",
    user_message: "",

    user_title1: "",
    user_title2: "",
    user_title3: "",
    user_title4: "",
    user_title5: "",
    user_title6: "",

    message_number: null,

    applicant_college: "",
    applicant_major: "",
    applicant_name: "",
    applicant_school: "",
    applicant_student_number: "",
    applicant_openid: "",
    apply_message: "",

    message_id: "",
    project_id: "",
    project_name: "",
    other_message_number: null,
    ohter_message: "",
    other_message_id: "",
    other_message_sql_id: "",

    members_project_id: "",

    delete_or_quit:"",

    iMatch_url: "https://o33092i600.imdo.co",
    theme: "light", // dark
  },
});
