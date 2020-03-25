# 吃豆人游戏  
  一款用 canvas 实现的网页吃豆人游戏。  
  游戏试玩地址：http://htmlpreview.github.io/?https://github.com/KaiWinding/pac-man/blob/master/index.html  
***
js目录下文件的作用  
* scene.js 游戏场景，在其中绘制地图和各游戏角色  
* scene_end.js 游戏结束画面  
* utils.js 包含了碰撞检测算法  
* monster.js 怪物类，其中move方法是怪物的移动  
* pac_man.js 吃豆人，主要移动算法是根据怪物类改的，同时这两个类还未完成重构，由于运动的实现较为繁琐，且目前没有想到优化方法  
* creaatemap.js 目前最不满意的一段，由于地图是手撸的实现的很难看。同时三个地图信息列表其实可以用一个代替
* game.js 游戏主控制进程，在这里切换不同场景，预先载入所有图片，同时场景内的按键操作也注册到该对象  
***  
目前游戏的基本功能已经完成，下一步是找一些游戏对象的素材做出对象在动的效果。
