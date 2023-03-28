/*
 * @Descripttion: 
 * @version: 
 * @Author: flatterer
 * @Date: 2023-03-28 09:34:58
 * @LastEditors: flatterer
 * @LastEditTime: 2023-03-28 10:29:12
 */
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMzkwYTNlNy1hNDYwLTQ1NGQtYTlhNi0xNzEwNjEzMDhjMGMiLCJpZCI6MTI5NDQ0LCJpYXQiOjE2NzkyOTQ3NzB9.n0KRQHhjyoT1q0w39RI66iV6KoPjshFuTUJQDkxivmk';

viewer = new Cesium.Viewer("cesiumContainer",{
    terrainProvider: Cesium.createWorldTerrain(),
    Geocoder:false,
    HomeButton:true,
    sceneModePicker: true, 
    animation: false, 
    baseLayerPicker: false, 
    timeline:false,
    navigationHelpButton: false, 
    infoBox: true, 
    fullscreenButton: false,   
});
//清除标签
viewer._cesiumWidget._creditContainer.style.display = "none";

//矩形实体
var wyoming = viewer.entities.add({
  name : 'Wyoming',
  polygon : {
    hierarchy : Cesium.Cartesian3.fromDegreesArray([
                              -109.080842,45.002073,
                              -105.91517,45.002073,
                              -104.058488,44.996596,
                              -104.053011,43.002989,
                              -104.053011,41.003906,
                              -105.728954,40.998429,
                              -107.919731,41.003906,
                              -109.04798,40.998429,
                              -111.047063,40.998429,
                              -111.047063,42.000709,
                              -111.047063,44.476286,
                              -111.05254,45.002073]),
    height : 0,
    material : Cesium.Color.RED.withAlpha(0.5),
    outline : true,
    outlineColor : Cesium.Color.BLACK
  }
});

viewer.zoomTo(wyoming);

//椭圆实体
var entity = viewer.entities.add({
  name : 'ellipse',
  position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
  ellipse : {
    semiMinorAxis : 250000.0,
    semiMajorAxis : 400000.0,
    material : Cesium.Color.BLUE.withAlpha(0.5)
  }
});
viewer.zoomTo(entity);

var ellipse = entity.ellipse; 

//添加实体材质
//图片
// ellipse.material = '//cesiumjs.org/tutorials/images/cats.jpg';

//棋盘
// ellipse.material = new Cesium.CheckerboardMaterialProperty({
//   evenColor : Cesium.Color.WHITE,
//   oddColor : Cesium.Color.BLACK,
//   repeat : new Cesium.Cartesian2(4, 4)
// });

//条纹
// ellipse.material = new Cesium.StripeMaterialProperty({
//   evenColor : Cesium.Color.WHITE,
//   oddColor : Cesium.Color.BLACK,
//   repeat : 32
// });

//网格
// ellipse.material = new Cesium.GridMaterialProperty({
//   color : Cesium.Color.YELLOW,
//   cellAlpha : 0.2,
//   lineCount : new Cesium.Cartesian2(8, 8),
//   lineThickness : new Cesium.Cartesian2(2.0, 2.0)
// });
//挖空仅剩线条
ellipse.fill = false;
ellipse.outline = true;
ellipse.outlineColor = Cesium.Color.YELLOW;
ellipse.outlineWidth = 2.0;

//折现实体
var entity = viewer.entities.add({
  polyline : {
      positions : Cesium.Cartesian3.fromDegreesArray([-80, 35,
                                                      -90, 35]),
  width : 5,
  material : Cesium.Color.RED
}});
viewer.zoomTo(viewer.entities);

var polyline = entity.polyline 

//给折线添加样式
//轮廓
polyline.material = new Cesium.PolylineOutlineMaterialProperty({
  color : Cesium.Color.ORANGE,
  outlineWidth : 3,
  outlineColor : Cesium.Color.BLACK
});
//光晕
polyline.material = new Cesium.PolylineGlowMaterialProperty({
  glowPower : 0.2,
  color : Cesium.Color.BLUE
});

//使矩形实体变成长方体
wyoming.polygon.height = 200000;
wyoming.polygon.extrudedHeight = 250000;