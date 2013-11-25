define(["require",
		 "exports",
		 "RobotTab",
		 "RobotDropdown",
		 "RobotDialog"], 		
	function(
		require,
		exports,
		RobotTab,
		RobotDropdown,
		RobotDialog){
	
	"use strict";
	
	var event = function(){
		/* 排序搜索 $this 当前节点对象 */
		var tab1 = new RobotTab();
		tab1.on("switch",function(obj){
			console.log(obj);
		});
		
		/* dropdown */
		var dropdown1 = new RobotDropdown();
		dropdown1.on("switch",function(obj){
			console.log(obj);
		});
		
		/* define-my-report 点击能出现浮层的按钮事件 */
		var dialogId = $("#define-del").data("target-dialog");
		var dialogDel = new RobotDialog({
			dialogBox : "#" + dialogId
		});
		$("#define-del").on("click",function(e){
			dialogDel.openDialog();
		});
		dialogDel.on("confirm",function(obj){
			dialogDel.closeDialog();
		});
		
		/* define-my-report 点击能出现浮层的按钮事件 */
		var dialogId2 = $("#define-my-report").data("target-dialog");
		var dialogReport = new RobotDialog({
			dialogBox : "#" + dialogId2
		});
		$("#define-my-report").on("click",function(e){
			dialogReport.openDialog();
		});
		dialogReport.on("switch",function(obj){
			dialogReport.closeDialog();
		});
	}
	event();
});