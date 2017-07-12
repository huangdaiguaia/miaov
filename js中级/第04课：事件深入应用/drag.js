/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-06-07 19:33:32
 * @version $Id$
 */

function drag(obj) {
 	// 只有鼠标点在div[想移动的obj上]才触发接下来的函数
 	// 鼠标在整个文档上移动 和在整个文档上抬起 都发生 移动和释放事件
 	/*拖拽的时候，如果有文字被选中，会产生问题。
 	原因：当鼠标在任何地方[down下去]按下的时候，如果页面中有文字被选中，会触发浏览器的默认拖拽文字的效果。
 	解决方法：
 	标准下：在onmousedown事件的函数里面添加return false;
 	非标准IE下：通过在ie下设置全局捕获，用setCapture()方法曲线救国

 	拖拽图片会有问题，原因和解决方法同上*/


 	obj.onmousedown = function(ev) {
 		var ev = ev || event;

 		var disX = ev.clientX - this.offsetLeft;
 		var disY = ev.clientY - this.offsetTop;

 		if ( obj.setCapture ) {
 			obj.setCapture();
 		}

 		document.onmousemove = function(ev) { //为了解决鼠标移动太快时  鼠标不在div上 ?[移动事件间隔时间]
 			                                                              //移动事件不发生
 			var ev = ev || event;

 			var L = ev.clientX - disX;                            //限制拖拽的范围
 			var T = ev.clientY - disY;

 			if ( L < 0 ) {
 				L = 0;
 			} else if ( L > document.documentElement.clientWidth - obj.offsetWidth ) {
 				L = document.documentElement.clientWidth - obj.offsetWidth;
 			}

 			if ( T < 0 ) {
 				T = 0;
 			} else if ( T > document.documentElement.clientHeight - obj.offsetHeight ) {
 				T = document.documentElement.clientHeight - obj.offsetHeight;
 			}													//限制拖拽的范围

 			obj.style.left = L + 'px';
 			obj.style.top = T + 'px';
 		}

 		document.onmouseup = function() {              //在任何地方抬起鼠标 都释放事件
 			document.onmousemove = document.onmouseup = null;
 			//释放全局捕获 releaseCapture();              //让选中的文字可以释放
 			if ( obj.releaseCapture ) {
 				obj.releaseCapture();
 			}
 		}

 		return false;

 	}

 }
