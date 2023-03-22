/*
 * @Descripttion: 
 * @version: 
 * @Author: flatterer
 * @Date: 2023-03-22 09:32:05
 * @LastEditors: flatterer
 * @LastEditTime: 2023-03-22 16:25:57
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