/*
 * @Descripttion: 
 * @version: 
 * @Author: flatterer
 * @Date: 2023-03-21 10:13:42
 * @LastEditors: flatterer
 * @LastEditTime: 2023-03-21 13:35:24
 */
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMzkwYTNlNy1hNDYwLTQ1NGQtYTlhNi0xNzEwNjEzMDhjMGMiLCJpZCI6MTI5NDQ0LCJpYXQiOjE2NzkyOTQ3NzB9.n0KRQHhjyoT1q0w39RI66iV6KoPjshFuTUJQDkxivmk';

viewer = new Cesium.Viewer("cesiumContainer",{
    terrainProvider: Cesium.createWorldTerrain(),
    Geocoder:false,//是否显示地名查找控件
    HomeButton:true,//是否显示跳转回默认视角
    sceneModePicker: true, //是否显示投影方式控件
    animation: false, //是否显示动画控件
    baseLayerPicker: false, //是否显示图层选择控件
    timeline: false, //是否显示时间线控件
    navigationHelpButton: false, //是否显示帮助信息控件
    infoBox: true, //是否显示点击要素之后显示的信息
    fullscreenButton: false,   // 是否显示全屏控件
});

viewer._cesiumWidget._creditContainer.style.display = "none"; //去除左下图标



// Geocoder : 一种地理位置搜索工具，用于显示相机访问的地理位置。默认使用微软的Bing地图。
// HomeButton : 首页位置，点击之后将视图跳转到默认视角。
// SceneModePicker : 切换2D、3D 和 Columbus View (CV) 模式。
// BaseLayerPicker : 选择三维数字地球的底图（imagery and terrain）。
// NavigationHelpButton : 帮助提示，如何操作数字地球。
// Animation :控制视窗动画的播放速度。
// CreditsDisplay : 展示商标版权和数据源。
// Timeline : 展示当前时间和允许用户在进度条上拖动到任何一个指定的时间。
// FullscreenButton : 视察全屏按钮。