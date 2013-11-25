define(["require","exports","RobotPretty"], function(require,exports,RobotPretty){
	
	"use strict";
	
	var event = function(){
		/* 排序搜索 $this 当前节点对象 */
		var prettyEmail = new RobotPretty();
		prettyEmail.on("switch",function(obj){
			console.log(obj);
		});
		var prettyAliww = new RobotPretty();
		prettyAliww.on("switch",function(obj){
			console.log(obj);
		});
		var prettyTaobaoww = new RobotPretty();
		prettyTaobaoww.on("switch",function(obj){
			console.log(obj);
		});
		$("#test-area").resize(function(e){
			console.log(e);
		})
	}
	event();
});