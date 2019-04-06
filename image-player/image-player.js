// image-player.js
Component({
  properties: {
    /**
     * 图片列表，图片路径数组
     */
    imageList: {
      type: Array,
      observer(newVal, oldVal) {
        /**
         * 重组图片列表，给每个图片随机加入动画
         */
        let imageList = []
        this.setData({
          playerList: imageList
        })

        for (let i in newVal) {
          imageList.push({
            img: newVal[i],
            animate: `animate${this.random(1,6)}`
          })
        }

        this.setData({
          playerList: imageList
        })

        wx.nextTick(() => {
          this.startAnimation()
        })
      }
    },
    /**
     * 是否需要背景填充
     */
    needBackground: {
      type: Boolean,
      default: true
    },
    /**
     * 动画时长 ms
     */
    animationDuration: {
      type: Number,
      default: 5000
    },
    /**
     * 背景透明度
     */
    backgroundOpacity: {
      type: Number,
      default: 0.5
    },
  },
  data: {
    currentIndex: 0, //当前索引
    intervalPlay: null, //播放轮询
    canAnimation: false, //是否播放动画

    isFirstIn: true, //是否是首次进入
  },

  methods: {
    /**
     * 生成随机数
     */
    random(lower, upper) {
      return Math.floor(Math.random() * (upper - lower)) + lower
    },
    startAnimation() {
      //图片数量在一张以上时才进行播放，否则清理轮询和动画
      console.log(this.data.playerList.length, this.data.intervalPlay, this.data.animationDuration)
      if (this.data.playerList.length > 1 && !this.data.intervalPlay) {
        this.setData({
          /**
           * 设置轮询
           */
          canAnimation: true,
          intervalPlay: setInterval(() => {
            if (this.data.currentIndex < this.data.playerList.length - 1) {
              this.setData({
                currentIndex: this.data.currentIndex + 1
              })
            } else {
              this.setData({
                currentIndex: 0
              })
            }
          }, this.data.animationDuration)
        })
      } else {
        clearInterval(this.data.intervalPlay)
        this.setData({
          intervalPlay: null,
          canAnimation: false
        })
      }
    }
  },
  pageLifetimes: {
    hide() {
      /**
       * 此时清除轮询，暂停动画
       */
      clearInterval(this.data.intervalPlay)
      this.setData({
        intervalPlay: null,
        canAnimation: false
      })
    },
    show() {
      /**
       * 如果不是首次进入，则重启轮询和动画
       */
      if(!this.data.isFirstIn) {
        this.startAnimation()
      }
    }
  },
  ready() {

  },
  detached() {
    /**
     * 此时清除轮询，暂停动画，清空列表
     */
    clearInterval(this.data.intervalPlay)
    this.setData({
      intervalPlay: null,
      canAnimation: false,
      playerList: []
    })
    console.log('detached')
  }
})