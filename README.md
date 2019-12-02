# Map Rest Web Service

*** version 1.0.0 , Super simple to use ***

**介绍:**

- 目前国内几大地图服务提供商的地理编码服务只支持国内查询，如果需要查询国外的地理信息则需要使用谷歌地图、必应地图等，谷歌地图有严格的收费限制，注册比较麻烦。目前微软旗下的必应地图对于开发者提供了一定限度的免费支持。
- 本项目的npm package 是对必应地图的部分Web服务进行了封装和过滤处理，开发人员可以轻松配置使用。
- 必应地图对于国内的地理信息查询结果完整度和精确度都不高，后续将会提供高德地图来针对国内地址查询。

------------


**功能**
1. 查找与关键字匹配的位置信息
2. 查找地球上指定经纬度的位置信息

```javascript
let { getBingMapData }  = require('mapinterface')
getBingMapData({
    api_key: "", //到必应地图开发中心申请API_KEY即可,必填
    isPoint: false, //false表示功能1，true表示功能2
    key_word: "", //模糊查询关键字,当isPoint字段为false时必填
    point_coord: '47.6395555,-122.128156' //经纬度，当isPoint字段为true时必填
    culture: "", //输出语言,默认'en-US'，非必填，语言配置列表请前往：http://www.bingmap.cn/guide/58bafd44-5a31-4aba-8fb0-f836374d71f6?module=doc
    inclnb: 0, //是否包含临近街道，默认0表示不包含，1表示包含，非必填
    maxResults: 5, //返回的匹配数量，保持在1-20，默认是5条结果，非必填
    docType: 'xml', //输出文档类型，默认是JSON格式，可配置成XML格式，非必填
}, function(err, val){
    if(err){
        console.log(val)
    }
    console.log(val)
})
```
