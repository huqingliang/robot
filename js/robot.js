define(['jquery','RobotNavs','RobotDropdown','RobotCalendar'],
	function($,RobotNavs,RobotDropdown,RobotCalendar){

	"use strict";	
	
	/**
	 * 默认事件初始化
	 */
	$(document).ready(function(){
		if($.browser && !$.browser.webkit && !$.browser.mozilla && !$.browser.safari){
		  $.fx.off = true;
		}
		var navs = new RobotNavs({document:true});
		navs.event();
		var dropdown = new RobotDropdown({document:true});
		dropdown.event();
		var calendar = new RobotCalendar({document:true});
		calendar.event();
	  //所有非超链接，url转向处理
    $(document).delegate(".d-links","click",function(){
      var url = $(this).data("url")
          ,target =  $(this).data("target");
      if(url){
          if(target && target == "_blank"){
              window.open(url);
          }else{
              window.location.href = url;
          }
      }
    });
	});
	
});