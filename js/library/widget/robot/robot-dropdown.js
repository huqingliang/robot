define('library/widget/robot/robot-dropdown',
		['require','exports','RobotEvent','jquery'],
	function(require,exports,RobotEvent,$){

		"use strict";
		var dropdowns = ".dropdown,.multiple-dropdown";
		var defaultOpts = {
	    pEle: dropdowns,
	    inputEle : ".text-input",
	    btnEle : ".btn",
	    menuEle: ".dropdown-menu,.multiple-dropdown-menu",
	    menuChild: ".menu-item",
	    custom : false
	  };
		var Dropdown = function(opts){
			this.opts = $.extend({}, defaultOpts, opts);
		};
		var fn = Dropdown.prototype;
	  //将 Events 混入（mix-in）到RobotDialog
	  RobotEvent.mixTo(Dropdown);
	  /**
	   * 事件监听
	   */
		fn.event = function() {
			var _self = this
			, param = _self.opts
			, parent = param.document ? document : param.pEle;
	    // input click
	    $(parent).delegate(param.inputEle, "click",function() {
	      $(this).closest(param.pEle).find(param.menuEle).show();
	    });
	    // btn click
	    $(parent).delegate(param.btnEle, "click",function() {
	    	$(this).closest(param.pEle).find(param.menuEle).show();
      });
	    // do write back event linsten
	    $(parent).delegate(param.menuChild, "click",function(e) {
	    	var $this = $(this);
	    	// 如果自定义处理，直接触发switch返回用户自行处理
	    	if(param.custom){
	    		_self.trigger("switch",{
        	  $this : $this,
        	  e : e
        	});
	    	}else{
	    	  // 值回填
		      if($this.parent().hasClass("multiple-dropdown-menu")){
		      	_self.multiWriteback($this,e,function($input){
		        	$this.parent().hide();
		        });
		      }else{
		      	_self.writeback($this,e,function($input){
		        	$this.parent().hide();
		        	// 触发dropdown
		        	_self.trigger("switch",{
		        	  $this : $input,
		        	  e : e
		        	});
		        });
		      }
	    	}
	      
	    });
	    $(document).delegate(dropdowns,"mouseleave",function() {
	      $(this).find(param.menuEle).hide();
	    });
	  };
	  /**
	   * 值回填
	   * @param $this 当前点击的元素
	   * @param callback
	   */
	  fn.writeback = function($this,e,callback) {
	  	var _self = this
			, param = _self.opts
	    , id = $this.data("id")
	    , key = $this.data("key")
	    , name = $this.text().trim()
	    , $input = $(e.target).closest(param.pEle).find(param.inputEle)
	    $input.data("id", id);
	    $input.data("key", key);
	    $input.val(name);
	    $input.focus();
	    $input.trigger("change");
	    if(typeof callback == "function"){
	    	callback($input);
	    }
	  };
	  /**
	   * 多选菜单值回填
	   * @param $this 当前点击的元素
	   */
	  fn.multiWriteback = function($this,e) {
	  	var _self = this
			, param = _self.opts
	    , $input = $(e.target).closest(param.pEle).find(param.inputEle)
	    , ids = []
	    , names = [];
	    var checks = $this.parent().find('input[name="dim-item"]:checked:checked');
	    if (checks.length > 0) {
	      checks.each(function() {
	        var menuClild = $(this).closest(param.menuChild);
	        ids.push($(menuClild).data("id"));
	        names.push($(menuClild).text().trim());
	      })
	    }
	    $($input).data("id", ids ? ids.join(",") : "");
	    $($input).val(names ? names.join(",") : "");
	  };
	  
	  return Dropdown;
		  
});