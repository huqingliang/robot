window.lofty &&
define('library/widget/robot/robot-dialog' , 
		['require','exports','RobotEvent','jquery'] ,
 function(require,exports,RobotEvent,$){

	"use strict";

	var defaultOpts = {
  	startIndex : 1000,
  	endIndex : 9000,
    zIndex : 1000,
    myDialog : "my-dialog",
    dialogBox : "#dialogBox",
    isEvent : false,
    animate : false
  };
  var RobotDialog = function (options) {
    this.opts = $.extend({}, defaultOpts, options);
  };
  //将 Events 混入（mix-in）到RobotDialog
  RobotEvent.mixTo(RobotDialog);
  
  var fn = RobotDialog.prototype;

  /**
   * 浮层事件监听入口
   */
  fn.event = function(){
    var _self = this
    , param = _self.opts;
    // 确认
    $(param.dialogBox).delegate(".btn-confirm","click",function(e){
    	var $this = $(this);
      // 触发确认事件confirm
      _self.trigger("confirm",{
      	$this : $this,
      	e : e
      });
    });
    // 取消
    $(param.dialogBox).delegate(".btn-cancel","click",function(e){
    	_self.closeDialog();
    	var $this = $(this);
      // 触发确认事件confirm
      _self.trigger("close",{
      	$this : $this,
      	e : e
      });
    });
    $(param.dialogBox).resize(function(e){
	   	_self.resizeDialog();
	  });
    $(window).resize(function(e){
	   	_self.resizeDialog();
	  });
  };


  /**
	 * 渲染浮层
	 * @param  obj
	 * obj : {
	 *    position ： {
	 *        pageX ： 10，
	 *        pageY : 10
	 *    },
	 *    pX: 549,
	 *    pY: 327
	 * }
	 *
	 */
 fn.openDialog = function(obj){
	 var _self = this
   , param = _self.opts
   , doShow = function(){
		// 计算坐标
	  // resize dialog
		var pos = _self.countPosition(); 
  	var zIndex =  _self.controlIndex();
  	_self.resizeDialog({
  	 "left" : pos.left,
  	 "top" : pos.top,
  	 "z-index" : zIndex
  	});
	  $(param.dialogBox).show();
	  if(!param.isEvent){
	  	_self.event();
	  	param.isEvent = true;
	  }
  };
   _self.createMask();
   doShow();
 };
 /**
  * resize dialog
  * @param data {
  *   zIndex : 100
  *   position : fixed
  * }
  */
 fn.resizeDialog = function(data){
	 var _self = this
   , param = _self.opts
   , pos = data && data.pos ? data.pos : "";
	 if(!pos){
		 pos = _self.countPosition(); 
		 data = $.extend({},data,pos);
	 }
	 if(param.animate){
		 $(param.dialogBox).animate(data);
	 }else{
		 $(param.dialogBox).css(data);
	 }
	   //贴边处理
//	   var bObj = $.extend(true,{},{top:pos.top,left:pos.left},obj);
//	   _self.weltControl(bObj);
 };
 /**
  * 创建遮罩
  */
 fn.createMask = function(){
	 var _self = this
   , param = _self.opts
   , zIndex = _self.controlIndex()	 
	 $("body").append('<div class="dialog-mask" style="z-index:' + zIndex + '"></div>');
 };
 /**
  * 移除遮罩
  */
 fn.removeMask = function(){
	 $("body").children(".dialog-mask").remove();
 };
 /**
  * 计算浮层坐标
  * @param obj
  * @return obj : {
  *   top : _top,
	*	  left : _left
  * }
  */
 fn.countPosition = function(obj){
	 var _self = this
   , param = _self.opts
   , _height = $(window).height()
   , _width =  $(window).width()
   , dialogWidth = $(param.dialogBox).width()
   , dialogHeight = $(param.dialogBox).height()
   , _top = (_height - dialogHeight)/2
   , _left = (_width - dialogWidth)/2;
	 
	 if(obj && obj.position){
	   _top = obj.position.pageY - parseInt(obj.pY ? obj.pY : 0);
	   _left = obj.position.pageX - parseInt(obj.pX ? obj.pX : 0);
	 }
	 _top = _top + "px";
	 _left = _left + "px";
	 return {
		 top : _top,
		 left : _left
	 }
 };
 /**
  * 贴边处理
  * @param obj : {
  *   dialogBox : "id",
  *   top : 10,
  *   left : 20
  * }
  * @return {
  *   left:left,
  *   top:top
  * }
  */
 fn.weltControl = function(obj){
	 var _self = this
   , param = _self.opts
	 , eleHeight = $(param.dialogBox).height()
	 , eleWidth = $(param.dialogBox).width()
	 , winHeight = $(window).height()
	 , winWidth = $(window).width()
	 , _top = obj.top.replace("px","")
	 , _left = obj.left.replace("px","")
	 , offsetTop = 0
	 , offsetLeft = 0
	 , offsetDefault = 20
	 , wordH = 14;
	 if(parseInt(_top) + parseInt(eleHeight) > winHeight){
		 _top = winHeight - eleHeight - offsetDefault;
		 var bubbleTop =  parseInt(obj.position.pageY) - parseInt(_top) - wordH;
		 $(param.dialogBox).find(".t-bubble").css("top",Math.abs(bubbleTop)+"px");
	 }else if(parseInt(_top) < 0){
		 _top = offsetDefault;
		 var bubbleTop =  parseInt(obj.position.pageY) - parseInt(_top) - wordH;
		 $(param.dialogBox).find(".t-bubble").css("top",Math.abs(bubbleTop)+"px");
	 }else{
		 $(param.dialogBox).find(".t-bubble").css("top","20px");
	 }
	 if(parseInt(_left) + parseInt(eleWidth) > winWidth){
		 _left = winWidth - eleWidth - offsetDefault;
		 _left = _left < 0 ? 0 : _left;
	 }
	 $(param.dialogBox).css({
  		"top" : _top + "px",
  		"left" : _left + "px"
  	 });
	 return {
		 top : _top,
		 left : _left
	 }
 };
  /**
   * 控制z-index增长
   * @retrun z-ndex
   */
  fn.controlIndex = function(){
	  var _self = this
	  , param = _self.opts;
	  param.zIndex++;
    if(param.zIndex === param.endIndex){
  	  param.zIndex = param.startIndex;
    }
    return param.zIndex;
  };
  /**
   * 是否触发关闭dialog事件
   */
  fn.closeDialog = function(){
	  var _self = this
    , param = _self.opts;
	  $(param.dialogBox).hide();
	  _self.removeMask();
  };
  return RobotDialog;

});