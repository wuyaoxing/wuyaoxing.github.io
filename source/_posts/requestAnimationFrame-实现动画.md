---
title: requestAnimationFrame 实现动画
date: 2017-04-05 14:46:12
tags:
    - requestAnimationFrame
    - 动画
---


以往JS控制的动画大多使用setInterval 或者setTimeout 每隔一段时间刷新元素的位置，来达到动画的效果，但是这种方式并不能准确地控制动画帧率，尽管主流的浏览器对于这两个函数实现的动画都有一定的优化，但是这依然无法弥补它们性能问题。主要原因是因为JavaScript的单线程机制使得其可能在有阻塞的情况下无法精确到毫秒触发。

requestAnimationFrame()方法正是为了满足高性能动画的需求而提供的API，通过setInterval方法控制的动画其调用的间隔由程序员设置，而requestAnimationFrame()无须设置调用间隔， 它自动紧跟浏览器的绘制的帧率（一般浏览器的显示帧率是60fps，差不多每帧间隔16.7ms）

就终极目的来说，requestAnimationFrame就是setTimeout。既然有了setTimeout，那还要requestAnimationFrame来干嘛。setTimeout会存在过度绘制，会造成帧丢失，继而导致动画断续显示。这也是setTimeout的定时器值推荐最小使用16.7ms的原因（16.7 = 1000 / 60, 即每秒60帧）。

浏览器可以优化并行的动画动作，更合理的重新排列动作序列，并把能够合并的动作放在一个渲染周期内完成，从而呈现出更流畅的动画效果。requestAnimationFrame就是为了这个而出现的。我所做的事情很简单，跟着浏览器的绘制走，如果浏览设备绘制间隔是16.7ms，那我就这个间隔绘制；如果浏览设备绘制间隔是10ms, 我就10ms绘制。这样就不会存在过度绘制的问题，动画不会掉帧。通过requestAnimationFrame()，JS动画能够和CSS动画/变换或SVG SMIL动画同步发生。另外，如果在一个浏览器标签页里运行一个动画，当这个标签页不可见时，浏览器会暂停它，这会减少CPU，内存的压力，节省电池电量。


## requestAnimationFrame

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)的原话：

> The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint. The method takes as an argument a callback to be invoked before the repaint.

window.requestAnimationFrame() 方法告诉浏览器您希望执行动画，并请求浏览器调用指定的函数在下一次重绘之前更新动画。该方法将在重绘之前调用的回调作为参数。

也可以说这个方法原理其实也就跟setTimeout/setInterval差不多，通过递归调用同一方法来不断更新画面以达到动起来的效果，但它优于setTimeout/setInterval的地方在于它是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销。

## 基本语法

```
requestID = window.requestAnimationFrame(callback);               // Firefox 23 / IE10 / Chrome / Safari 7 (incl. iOS)
requestID = window.mozRequestAnimationFrame(callback);                // Firefox < 23
requestID = window.webkitRequestAnimationFrame(callback); // Older versions Chrome/Webkit
```

可以直接调用，也可以通过window来调用，接收一个函数作为回调，返回一个ID值，通过把这个ID值传给window.cancelAnimationFrame()可以取消该次动画。

## 浏览器兼容性

就目前来说，主流现代浏览器都对它提供了支持。可以去这里查看更详细的兼容性( http://caniuse.com/#search=requestAnimationFrame )。

## 封装

```
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

```
这是网上比较推荐的兼容做法。


## 推荐

- setInterval控制的动画与requestAnimationFrame()的效果的对比可以看(  http://www.cnblogs.com/aaronjs/p/4283109.html )

- 张鑫旭也深入浅出的阐释了该方法( http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/ )注意前方高能

- 结合canvas去做的动画( http://www.webhek.com/post/requestanimationframe.html )

- 一篇非常详细的介绍jquery动画源码的文章 ( http://www.iteye.com/topic/786984 ) 虽然目前jquery已经不是主流，但也有一定的学习价值。

- 这一篇更直观的给出了jquery动画的分析图例( http://nuysoft.iteye.com/blog/1172137 )。

- 这一篇对translate和改变top/left进行动画做了对比( http://www.tuicool.com/articles/UfYJb2E )


## 参考链接

- https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
- https://segmentfault.com/a/1190000008246652
- https://segmentfault.com/a/1190000004039023

## 写在最后

对requestAnimationFrame做了一个封装结合vue实现scrollTop/scrollLeft滚动条滚动的缓动动画，详细的请看这里( https://github.com/wuyaoxing/vue-scroll-animate )。

0425更新
## 补充一个缓动动画JS小算法

原理如下：

假设要从数值A变化到数值B，如果是线性运动，则每次移动距离是一样；如果是缓动，每次移动距离不一样。那如何才能不一样呢？很简单，按比例移动就可以。

例如：每次移动剩余距离的一半。

用一个简单的公式表示就是：

> A = A + (B - A) / 2

这个简单的公式就是常用、易记的缓动小算法。我们可以结合requestAnimationFrame一起使用。

```
// requestAnimationFrame的兼容处理
if (!window.requestAnimationFrame) {
    requestAnimationFrame = function(fn) {
        setTimeout(fn, 17);
    };
}

var _easeout = function(start, end, rate, callback) {
var _end = end;
if (start == end || typeof start != ‘number’) {
return;
}
end = end || 0;
rate = rate || 2;

var step = function() {
start = start + (end – start) / rate;
if (Math.abs(start – _end) < 1) {

// if (start < 1) {
console.log('end');
callback(end, true);
return;
}
callback(start, false);
requestAnimationFrame(step);
};
step();
};

调用
var doc = document.body.scrollTop !== undefined ? document.body : document.documentElement;
console.log('start', doc.scrollTop);
console.log('end', end);
_easeout(doc.scrollTop, end, 2, function(value) {
doc.scrollTop = value;
});
```

**参数**：
- start是起始位置
- end是目标位置
- rate是缓动速率
- callback是变化的位置回调，支持两个参数，value和isEnding，表示当前的位置值（数值）以及是否动画结束了（布尔值）

**参考链接**
- http://www.zhangxinxu.com/wordpress/2017/01/share-a-animation-algorithm-js/
- http://www.zhangxinxu.com/wordpress/2016/12/how-use-tween-js-animation-easing/

