/*
 * @Descripttion: 
 * @version: 
 * @Author: flatterer
 * @Date: 2023-03-21 17:33:04
 * @LastEditors: flatterer
 * @LastEditTime: 2023-03-21 17:36:29
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