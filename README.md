# cesium_learn
Cesium个人学习笔记

请先预下载Cesium的js包，并将其中"Build"中的"CesiumUnminified"放置于其他文件夹的同级目录下。

大多数在前一个的基础上添加代码。

Cesium的调用需要申请Token。
Viewer里的控件均可进行隐藏和修改。

imagerylayers对图层的改动，在调用前需先在cesium ion里把相应的图层资源启用，再根据相应的ID添加。
不同api的调用也就是这里处理。

添加地形数据的步骤需要先所需导入的地形数据放于viewer.terrainProvider中,再启动深度测试将地表下的图层进行隐藏，只显示地表上的图像。
