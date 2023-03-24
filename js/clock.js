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

viewer.imageryLayers.remove(viewer.imageryLayers.get(0)); //清除原有底层

const layer = viewer.imageryLayers.addImageryProvider(
    new Cesium.IonImageryProvider({ assetId: 3954 })
  );

  viewer.terrainProvider = Cesium.createWorldTerrain({
    requestWaterMask : true, // 是否添加水面的效果
    requestVertexNormals : true // 是否添加光线的效果
});

viewer.scene.globe.depthTestAgainstTerrain = true;//启动深度测试，将地表下的图层进行隐藏。

viewer.scene.globe.enableLighting = true;//启动太阳位置的光照，使得图层具有阴影

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