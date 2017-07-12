/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-05-16 09:45:00
 * @version $Id$
 */
 //  $获取元素-----------------------------------------------------------------------------------------------------------
  function $( v ){
  	if( typeof v === 'function' ){
  		window.onload = v;
  	} else if ( typeof v === 'string' ) {
  		return document.getElementById(v);
  	} else if ( typeof v === 'object' ) {
  		return v;
  	}
  }

//  获得元素属性 getComputedStyle( obj )[attr]是标准方法 另一个是ie方法----------------------------
  function getStyle( obj, attr ){
  	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle( obj )[attr];
  }

// 让一个元素的某个属性在一定时间内完成某个改变 完成是(再添加一个回调函数)-------------------
 function doMove ( obj, attr, dir, target, endFn ) {   //dir  步长
 	dir = parseInt(getStyle( obj, attr )) < target ? dir : -dir;  // dir 方向在这里解决了
 	clearInterval( obj.timer );
 	obj.timer = setInterval(function () {
 		var speed = parseInt(getStyle( obj, attr )) + dir;
 		if ( speed > target && dir > 0 ||  speed < target && dir < 0  ) {
 			speed = target;
 		}
 		obj.style[attr] = speed + 'px';
 		if ( speed == target ) {
 			clearInterval( obj.timer );
 			/*
 			if ( endFn ) {
 				endFn();
 			}
 			*/
 			endFn && endFn();
 		}

 	}, 20);
 }


