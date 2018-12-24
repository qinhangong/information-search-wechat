//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    list: [],
    emptyMessage: "No information was found"
  },

  onShow: function() {
    this.queryInfoList();
  },

  onPullDownRefresh: function () {
    this.queryInfoList();
    wx.stopPullDownRefresh()
  },

  queryInfoList:function(){
    const { baseUrl } = app.globalData;
    const url = `${baseUrl}/api/information/list`;
    wx.request({
      url,
      header: {
        "content-type": "application/json" // 默认值
      },
      success: res => {
        const { code, data } = res.data;
        console.log('data====', data);
        if (code === 1) {
          this.setData({
            list: data
          });
        }
      }
    });
  },

  handleClick: function(e) {
    const {
      target: {
        dataset: { id }
      }
    } = e;
    wx.navigateTo({
      url: "../result/result?id=" + id
    });
  }
});
