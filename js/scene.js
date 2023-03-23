/*
 * @Descripttion: 
 * @version: 
 * @Author: flatterer
 * @Date: 2023-03-23 13:56:17
 * @LastEditors: flatterer
 * @LastEditTime: 2023-03-23 16:47:45
 */
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMzkwYTNlNy1hNDYwLTQ1NGQtYTlhNi0xNzEwNjEzMDhjMGMiLCJpZCI6MTI5NDQ0LCJpYXQiOjE2NzkyOTQ3NzB9.n0KRQHhjyoT1q0w39RI66iV6KoPjshFuTUJQDkxivmk';

viewer = new Cesium.Viewer("cesiumContainer",{
    terrainProvider: Cesium.createWorldTerrain(),
    Geocoder:false,
    HomeButton:true,
    sceneModePicker: true, 
    animation: false, 
    baseLayerPicker: false, 
    timeline: false,
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
