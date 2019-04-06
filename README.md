# 小程序图片幻灯片组件

> 用于需要幻灯片展示一系列图片，并且需要提供一些转场效果的时候

## 使用方式

```js
//引入组件
"usingComponents": {
    "image-player": "../image-player/image-player"
}
```

```html
<!-- 直接引入 backImageUrls表示图片地址Array -->
<image-player
    imageList="{{backImageUrls}}"
    needBackground="{{true}}"
    backgroundOpacity="{{0.6}}"
    animationDuration="{{4000}}"
    ></image-player>
```

## 小程序片段代码

[https://developers.weixin.qq.com/s/in6OUqmk7k7v](https://developers.weixin.qq.com/s/in6OUqmk7k7v)

## 配置说明

| 名称 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| imageList | 图片链接数组 | Array | 必填 |
| needBackground | 是否需要背景填充 | Boolean | true |
| backgroundOpacity | 背景填充透明度 | Number | 0.5 |
| animationDuration | 动画时长 | Number | 5000  \(单位 ms\) |



