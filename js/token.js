/*
 * @Descripttion: 
 * @version: 
 * @Author: flatterer
 * @Date: 2023-03-21 09:25:01
 * @LastEditors: flatterer
 * @LastEditTime: 2023-03-21 09:34:42
 */
Cesium.Ion.defaultAccessToken = '此处替换为自己申请的token';
viewer = new Cesium.Viewer("cesiumContainer",{
    terrainProvider: Cesium.createWorldTerrain()
});
