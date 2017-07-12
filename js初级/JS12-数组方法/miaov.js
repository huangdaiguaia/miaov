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
 function doMove ( obj, attr, dropSpeed, target, endFn ) {   //dropSpeed  步长
 	dropSpeed = parseInt(getStyle( obj, attr )) < target ? dropSpeed : -dropSpeed;  // dropSpeed 方向在这里解决了
 	clearInterval( obj.doMove );
 	obj.doMove = setInterval(function () {
 		var speed = parseInt(getStyle( obj, attr )) + dropSpeed;
 		if ( speed > target && dropSpeed > 0 ||  speed < target && dropSpeed < 0  ) {
 			speed = target;
 		}
 		obj.style[attr] = speed + 'px';
 		if ( speed == target ) {
 			clearInterval( obj.doMove );
 			/*
 			if ( endFn ) {
 				endFn();
 			}
 			*/
 			endFn && endFn();
 		}

 	}, 20);
 }

 // 晃动的幅度越来越小 最后停下来
 function shake ( obj, attr, endFn ) {

 	if( obj.shaked ) { //当上一个晃动还没到停下来的时候 调用这个函数shake 则return; 下面的都不执行;
 		return;
 	}
 	obj.shaked = true;                                       //----------------------------------------

 	var pos = parseInt( getStyle(obj, attr) );			// 有隐患的
 	var arr = [];			// 20, -20, 18, -18 ..... 0
 	var num = 0;
 	for ( var i=10; i>0; i-=2 ) {                //-----------20->10
 		arr.push( i, -i );
 	}
 	arr.push(0);  //不能是i<=2 因为不能在数组中添加 0 -0;

 	clearInterval( obj.shake );
 	obj.shake = setInterval(function (){
 		obj.style[attr] = pos + arr[num] + 'px';
 		num++;
 		if ( num === arr.length ) {
 			clearInterval( obj.shake );
 			endFn && endFn();

 			obj.shaked = false;                           //------------------------

 		}
 	}, 50);
 }

// 改变图片透明度
 function opacity(obj,len,target){
 	var opacityNum=1;
 	clearInterval(obj.opacity);
 	obj.opacity=setInterval(function(){
 		opacityNum-=len;
 		obj.style.opacity=opacityNum;
 		if(opacityNum===target){
 			clearInterval(obj.opacity);
 		}
 	},100)
 }
