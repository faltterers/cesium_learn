# cesium_learn
Cesium个人学习笔记

:sob::sob::sob::sob:

请先预下载Cesium的js包，并将其中"Build"中的"CesiumUnminified"放置于其他文件夹的同级目录下。

**大多数在前一个的基础上添加代码。**

Cesium的调用需要申请Token。
Viewer里的控件均可进行隐藏和修改。

imagerylayers对图层的改动，在调用前需先在cesium ion里把相应的图层资源启用，再根据相应的ID添加。
不同api的调用也就是这里处理。

添加地形数据的步骤需要先所需导入的地形数据放于viewer.terrainProvider中,再启动深度测试将地表下的图层进行隐藏，只显示地表上的图像。

设置摄像机位置需要提供经纬度和高度等基础信息，以及摄像机处于空间中的位置和形态，才能形成俯视或者仰视的效果。
将这些构成一个类，在初始化view。

动画效果自定义，重构homebutton时需注意将flyto()中的传递值改为原先设定的。

clock的函数不多，shouldAnimate、startTime、stopTime、currentTime、multiplier、clockStep、clockRange，分别对应是否自动动画、时间条开始时间、时间条结束时间、现在时间、播放速率、播放速率变化方式、是否循环播放。
在利用iewer.timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime)  加载参数

entity的简单用法还是比较简单的，需要自定义使用什么直接查询便可知。
