/*
 * @Descripttion: 
 * @version: 
 * @Author: flatterer
 * @Date: 2023-03-28 10:49:01
 * @LastEditors: flatterer
 * @LastEditTime: 2023-03-28 11:36:06
 */
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMzkwYTNlNy1hNDYwLTQ1NGQtYTlhNi0xNzEwNjEzMDhjMGMiLCJpZCI6MTI5NDQ0LCJpYXQiOjE2NzkyOTQ3NzB9.n0KRQHhjyoT1q0w39RI66iV6KoPjshFuTUJQDkxivmk';

viewer = new Cesium.Viewer("cesiumContainer",{
    terrainProvider: Cesium.createWorldTerrain(),
    Geocoder:false,
    HomeButton:true,
    sceneModePicker: true, 
    animation: true, 
    baseLayerPicker: false, 
    timeline:true,
    navigationHelpButton: false, 
    infoBox: true, 
    fullscreenButton: false,   
});

viewer._cesiumWidget._creditContainer.style.display = "none";

// viewer.imageryLayers.remove(viewer.imageryLayers.get(0)); //清除原有底层

// const layer = viewer.imageryLayers.addImageryProvider(
//     new Cesium.IonImageryProvider({ assetId: 3954 })
//   );

//   viewer.terrainProvider = Cesium.createWorldTerrain({
//     requestWaterMask : true, // 是否添加水面的效果
//     requestVertexNormals : true // 是否添加光线的效果
// });

// viewer.scene.globe.depthTestAgainstTerrain = true;//启动深度测试，将地表下的图层进行隐藏。

// viewer.scene.globe.enableLighting = true;//启动太阳位置的光照，使得图层具有阴影

//初始化view
var initiaPosition = new Cesium.Cartesian3.fromDegrees(-73.998114468289017509, 40.674512895646692812, 2631.082799425431); //笛卡尔坐标系下的摄像机经纬度和高度

var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(7.1077496389876024807, -31.987223091598949054, 0.025883251314954971306);//摄像机的角度

var homeCameraView = {
    destination : initiaPosition,
    orientation : {
        heading : initialOrientation.heading,//Z轴位置
        pitch : initialOrientation.pitch,//X轴位置
        roll : initialOrientation.roll//Y轴位置
    }
}
viewer.scene.camera.setView(homeCameraView);


//flyto的设置

//修改移动摄像头时的动画效果的参数，自定义
homeCameraView.duration = 2.0;
homeCameraView.maximumHeight = 2000;
homeCameraView.pitchAdjustHeight = 2000;
homeCameraView.endTransform = Cesium.Matrix4.IDENTITY;
//重构homebutton的函数
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
    e.cancel = true;
    viewer.scene.camera.flyTo(homeCameraView);
});
//设置时间条相关参数和动画效果
viewer.clock.shouldAnimate = true; // 使在时间开始时动画开始动
viewer.clock.startTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:00:00Z");
viewer.clock.stopTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:20:00Z");
viewer.clock.currentTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:00:00Z");
viewer.clock.multiplier = 2; // 设置时间变化的乘数 2倍速
viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER; // 根据时间变化的成熟来设置时间跳转
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // 时间到末尾时跳转到前面 重新开始
viewer.timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime); // 加载参数

//加载3DTile资源 在Cesium ion中的Asset Depot启用 New York City 3D Buildings
var city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({ url: Cesium.IonResource.fromAssetId(75343) }));

//解决偏移
// var heightOffset = -32;
// city.readyPromise.then(function(tileset) {
//     // Position tileset
//     var boundingSphere = tileset.boundingSphere;
//     var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
//     var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
//     var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
//     var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
//     tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
// });

//添加样式

// var defaultStyle = new Cesium.Cesium3DTileStyle({
//     color : "color('white')",
//     show : true
// });
// city.style = defaultStyle;

// var transparentStyle = new Cesium.Cesium3DTileStyle({
//     color : "color('white', 0.3)",
//     show : true
// });
// city.style = transparentStyle;

//根据特征属性进行处理
var heightStyle = new Cesium.Cesium3DTileStyle({
    color : {
        conditions : [
            ["${Height} >= 300", "rgba(45, 0, 75, 0.5)"], //注意属性名称两边要一致，不然会找不到数值，会报错
            ["${Height} >= 200", "rgb(102, 71, 151)"],
            ["${Height} >= 100", "rgb(170, 162, 204)"],
            ["${Height} >= 50", "rgb(224, 226, 238)"],
            ["${Height} >= 25", "rgb(252, 230, 200)"],
            ["${Height} >= 10", "rgb(248, 176, 87)"],
            ["${Height} >= 5", "rgb(198, 106, 11)"],
            ["true", "rgb(127, 59, 8)"]
        ]
    }
});
city.style = heightStyle;

//需要创建一个窗口 里面有选项啥的 来调整样式 这里没写
// var tileStyle = document.getElementById('tileStyle');
// function set3DTileStyle() {
//     var selectedStyle = tileStyle.options[tileStyle.selectedIndex].value;
//     if (selectedStyle === 'none') {
//         city.style = defaultStyle;
//     } else if (selectedStyle === 'height') {
//         city.style = heightStyle;
//     } else if (selectedStyle === 'transparent') {
//         city.style = transparentStyle;
//     }
// }

// tileStyle.addEventListener('change', set3DTileStyle);