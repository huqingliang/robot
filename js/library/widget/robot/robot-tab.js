define('library/widget/robot/robot-tab',
		['require','exports','RobotEvent','jquery'],
 function(require,exports,RobotEvent,$){

  var defaultOpts = {
  	pEle: ".ope-type"
  };
  
	var Tab = function(opts){
		this.opts = $.extend({},defaultOpts,opts);
		this.event();
	};
	// 将 Events 混入（mix-in）到Tab
	RobotEvent.mixTo(Tab);

	fn = Tab.prototype;
  
	/**
	 * 事件监听
	 */	
	fn.event = function(){
		var _self = this
		, param = _self.opts;
		/** 
		 * tab 切换
	   * 触发 robotTab 事件 返回参数：{
		 *   this : $(this),
		 *   e : e
		 * }
		 */
		$(param.pEle).delegate(".link","click",function(e){
			var $this = $(this);
			console.log(e)
			_self.changeStyle($this,function(){
				_self.trigger('switch',{
					$this : $this,
					e : e
				});
			});
		});
  };
  /**
   * 更改样式
   * @param $this
   * @param callback
   */
  fn.changeStyle = function($this,callback){
		var $parant = $this.parent()
		, links = $parant.find(".link")
		, order = $this.data("order")
		, oldOrder = $parant.data("order"); 
		$parant.data("order",order);
		$parant.data("old-order",oldOrder);
		links.each(function(){
			$(this).removeClass("sel");
		});
		$this.addClass("sel");
		
		if(callback && typeof callback == "function"){
			callback();
		}
  }
  return Tab;  	
});