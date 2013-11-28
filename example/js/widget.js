define(["require",
		 "exports",
		 "RobotNavs",
		 "RobotDropdown",
		 "RobotDialog",
		 "RobotPage",
		 "RobotCommon"], 		
	function(
		require,
		exports,
		RobotNavs,
		RobotDropdown,
		RobotDialog,
		RobotPage,
		RobotCommon){
	
	"use strict";
	
	var _common = new RobotCommon();
	
	var initModule = function(){
		// 分页
	  var _pagePreview = new RobotPage({
	    pagination : "#pagination1"
	  });
	  _pagePreview.renderPage({
	  	currentPage : 2,
	  	pageSize : 10,
	  	totalPage : 14
	  });
	  $("#pagination1").delegate(".page-cell","click",function(){
  		var page = $(this).data("page");
  		if(page){
  			_pagePreview.renderPage({
			  	currentPage : page,
			  	pageSize : 10,
			  	totalPage : 14
			  });
  		}
  	});
	};
	initModule();
	var initDropdown = function(){
		// 多选下拉菜单
		var _multiDrop = new RobotDropdown({
			pEle : "#mutl-city1"
		});
		_multiDrop.on("switch",function(obj){
			console.log(obj);
		});
	};
	initDropdown();
	var event = function(){
		
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
	var initCode = function(){
    /*
    var viewDiv = document.getElementById("highlight-view");
    var t1 = document.getElementById("t1");
    var t2 = document.getElementById("t2");
    var selector = document.getElementById("langSelector");
    var selectedLang = selector.options[selector.selectedIndex].value.toLowerCase();
    if(selectedLang) {
        viewDiv.innerHTML = '<pre><code class="'+selectedLang+'">'+t1.value.escape()+"</code></pre>";
    } else { // try auto
        viewDiv.innerHTML = '<pre><code>' + t1.value.escape() + "</code></pre>";
    }
    hljs.highlightBlock(viewDiv.firstChild.firstChild);
    t2.value = viewDiv.innerHTML;
    */
    
    var viewDiv = document.getElementById("highlight-view");
    var softs = $("textarea.soft");
    var lang = "haml";
    softs.each(function(k,v){
      var value = $(v).val();
      var languages = $(v).data("languages");
      if(languages){
        lang = languages;
      }
      viewDiv.innerHTML = '<pre><code class="' + lang + '">' + _common.filterBrackets(value) + "</code></pre>";
      hljs.highlightBlock(viewDiv.firstChild.firstChild);
      $(v).after(viewDiv.innerHTML);
    });
    
   
	};
	$(document).ready(function(){
	 initCode();
	});
});