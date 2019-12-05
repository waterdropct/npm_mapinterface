# Map Web Rest Api Service

*** version 1.0.0 , Super simple to use ***

**介绍:**

- 当前高德地图、百度地图、腾讯地图等开放功能只支持国内查询服务，对于国外的地理信息则需要使用谷歌地图、必应地图等。
- 谷歌地图有严格的收费限制，注册比较麻烦，微软旗下的必应地图对于开发者提供了一定限度的免费支持 [点击查看必应地图免费访问上限](http://www.bingmap.cn/guide/e53e6e82-dafe-11e8-b818-d46d6d978bfa?module=doc) -- [点击查看高德地图免费访问上限](https://lbs.amap.com/api/webservice/guide/tools/flowlevel)。
- 该 Npm Package 是对必应地图（地理编码、逆地理编码功能）和高德地图（地理编码、逆地理编码、IP定位功能）Web API进行了封装处理，可以轻松配置参数来查询地理信息。
- 高德地图(aMap)目前只支持国内查询服务(海外版需要申请试用审批，流程较复杂)。
- 必应地图(bingMap)对于国内的地理信息查询结果完整度和精确度都不高，建议用于国外查询。

------------


**功能**
1. bingMap：查找全球与关键字匹配的位置信息
2. bingMap：查找全球指定经纬度对应的位置信息
3. aMap：查找与关键字匹配的位置信息(只支持国内)
4. aMap：查找指定经纬度对应的位置信息(只支持国内)
5. aMap：查找指定IP地址对应的位置信息(只支持国内)

```javascript
let { getBingMapData, getAMapData }  = require('mapinterface')
// Bing Map Service
getBingMapData({
    api_key: "", //到必应地图开发中心申请API_KEY即可,必填
    isPoint: false, //false表示功能1，true表示功能2
    key_word: "", //模糊查询关键字,当isPoint字段值为false时必填
    point_coord: '' //经纬度，逗号分隔，例如(47.6395555,-122.128156),当isPoint字段值为true时必填
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

// AMap Service
getAMapData({
    api_key: "", //到高德地图开发中心申请API_KEY即可,必填
    queryType: "address", //address：地理编码服务 - location：逆地理编码服务 - ip：IP定位查询   默认值address，非必填
    batch: false, //批量查询控制，当queryType字段值为address或location时可配置，默认为false，表示查询单条；当为true时，address(最多10个)或point_coord(最多20个)支持多个以|分割的值，非必填
    address: "", //地址,当queryType字段值为address时必填
    point_coord: '', //经纬度，逗号分隔，例如(120.8397067,30.77980118),当queryType字段值为location时必填
    ip: "", //经纬度，逗号分隔，例如(116.234.222.36),当queryType字段值为ip时必填
    output_type: "xml", //输出文档类型，默认是JSON格式，可配置成XML格式，非必填
    extensions: "all", //当queryType字段值为location时有效，默认值为base，当值为all时会返回附近POI内容、道路信息以及道路交叉口信息，非必填
    poitype: "", //附近POI类型，当extensions字段值为all时有效，可配置参数请前往：https://lbs.amap.com/api/webservice/download 查询，非必填
    radius: 500 //搜索半径，radius取值范围在0~3000，默认是1000，单位：米，非必填
}, function(err, val){
    if(err){
        console.log(val)
    }
    console.log(val)
})
```

------------

目前只封装了几种常见的查询功能，对于其他web服务，可直接前往开发者中心查看文档。