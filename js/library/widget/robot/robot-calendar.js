define("library/widget/robot/robot-calendar",
		["require","exports","WdatePicker","jquery"],
function(require,exports,WdatePicker,$){
	
	var defaultOpts = {
		tDate : ".t-date"
  };
  
  var RobotCalendar = function (opts) {
  	this.opts = $.extend({}, defaultOpts, opts);
  };
  var fn = RobotCalendar.prototype;
  
  /**
   * 日历控件浮出
   * @param   {
   *     $this : 对象
   *     el : input id
   * }
   */
  fn.datePicker = function($this,id){
  	var format = $this.data("format")
	  , dateFormat = format ? format : "yyyy-MM-dd";
  	if(id){
  		WdatePicker({el:id, dateFmt: dateFormat, position: {top: 0}});
  	}else{
  		WdatePicker({dateFmt: dateFormat, position: {top: 0}});
  	}
  };
  /**
   * 事件监听
   */
  fn.event = function(){
  	var _self = this
  	, param = _self.opts;
    //日历
		$(document).delegate(".t-date","click",function(e){
			var targetId = $(this).data("target");
			var value = $("#" + targetId).val();
			if(value.indexOf("$") < 0){
				_self.datePicker($(this),targetId);
			}
  	});
  };
  
  return RobotCalendar;
});