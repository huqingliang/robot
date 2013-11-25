define('library/widget/robot/robot-navs',
		['require','exports','RobotEvent','jquery'],
	function(require,exports,RobotEvent,$){

	"use strict";
	
	var defaultOpts = {
		pEle : ".nav-tabs",
		cEle : ".item",
		cActice : "active",
		leaf : ".tab",
		activeLeaf : ".btn-white",
		noActiveLeaf : ".btn-blue-gray"
	};
	var RobotNavs = function (options) {
    this.opts = $.extend({}, defaultOpts, options);
    this.event();
  };
  var fn = RobotNavs.prototype;
  //将 Events 混入（mix-in）到RobotDialog
  RobotEvent.mixTo(RobotNavs);
	
	fn.event = function(){
		var _self = this
		, opts = _self.opts;
		
		$(opts.pEle).delegate(opts.cEle,"click",function(e){
			var $this = $(this);
			if($this.hasClass(opts.cActice)){
				return;
			}else{
				// 更改样式
				_self.changeStyle($this,function(){
				  // 触发选中自定义事件switch
		      _self.trigger("switch" , e);
				})
			}
		});
	};
	/**
	 * 更改样式
	 * @param $this
	 * @param callback
	 */
	fn.changeStyle = function($this,callback){
		var _self = this
		, opts = _self.opts
		, array = $this.closest(opts.pEle).children("." + opts.cActice);
		array.each(function(k,v){
			$(v).removeClass(opts.cActice);
		});
		$this.addClass(opts.cActice);
		if(typeof callback == "function"){
			callback();
		}
	};
	return RobotNavs; 
	
});