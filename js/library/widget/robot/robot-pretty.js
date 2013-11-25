define('library/widget/robot/robot-pretty',
	['require','exports','RobotEvent','jquery'],		
function(require,exports,RobotEvent,$){

  var defaultOpts = {
  	containId : "email",            //控件唯一标示
  	itemName : "e-item",            //子项样式名
  	item : ".e-item",
  	containFocus : "pretty-focus",  //获取焦点控件样式名
  	type : "other",           //正则验证类型名，{email、aliww、tbww、默认}
  	errorTip : "格式不正确！",    //子项验证不通过的样式名
  	customKeyCode : 13,       //默认的按键触发验证事件keycode
  	regExp : /\S+$/,           //正则验证输入值的正确性default is not null
  	mark : ";"                 //默认分隔符是";"
  };
  var Pretty = function (opts) {
      this.opts = $.extend({}, defaultOpts, opts);
      this.opts.textInputId = $("#" + this.opts.containId).data("text");
      this.event();
      this.textInputEvent();
  };
  // 将 Events 混入（mix-in）到Tab
	RobotEvent.mixTo(Pretty);
	
  var fn = Pretty.prototype;
  /**
   * 正则表达式验证
   * @param address
   */
  fn.doRegExp= function(address){
  	var _self = this
  	, param = _self.opts
  	, reg = ""
  	, result = true
  	switch(param.type){
	    case "aliww":
	    	result = _self.enableLength(address,5,25);    		    
		    param.errorTip = "阿里旺旺号必须是5-25个字符！";
		    break;
	    case "tbww":
	    	result = _self.enableLength(address,4,25);    		    
		    param.errorTip = "淘宝旺旺号必须是4-25个字符！";
		    break;
	    case "email":
	    	//reg = /^([a-zA-Z0-9_\.\-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;  //邮件地址
	    	reg = /^([a-zA-Z0-9_\.\-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+){1,2}$/;  //邮件地址
    	result = reg.test(address);
    	param.errorTip = "该邮件地址格式有误，请双击修改！";
	    break;
	    default:
	    //自定义格式：正则验证，如果没有传入正则，则默认判断非空
	    	result = param.regExp.test(address);
	    	break;
    }
  	return result;
  };
  
  /**
   * 是否在限定的长度内
   */
  fn.enableLength = function(value,min,max){
		var array = value.split("")
		, patrn = /^[\u4e00-\u9fa5]$/
		, length = 0
		, enable = true
	  	
		for(var i=0;i<array.length;i++){
	  		if(patrn.test(array[i])){
	  			length += 2;
	  		}else{
	  			length += 1;
	  		}
	  	}
		if(length < min || length > max){
			enable = false;
		}
		return enable;
		
	};
  
  /**
   * 容器事件监听
   */
  fn.event = function(){
  	var _self = this
  	, param = _self.opts;
  	$("#"+param.containId).on("click",function(e){
  		_self.containClick(e);    //邮箱地址容器点击事件处理逻辑
  	});
  	$("#"+param.containId).delegate("#"+param.textInputId,"click",function(e){
  		$(this).removeClass("input_error");
  		$(this).removeAttr("title");
  	});
  	$("#"+param.containId).delegate(param.item,"dblclick",function(e){
  		//edit pretty address.for example : email,aliww,tbww
  		_self.editPretty($(this));     
  	});
  	
  };
  /**
   * 输入框事件监听
   */
  fn.textInputEvent = function(){
  	var _self = this
  	, param = _self.opts;
  	
  	$("#" + param.textInputId).on("blur",function(e){
  		_self.doCheck();       //验证邮箱地址
  		$("#"+param.containId).removeClass(param.containFocus);
  	});
  	$("#" + param.textInputId).on("keyup",function(e){
  		if(e.keyCode == 13){      //回车或者自定义按键  || e.keyCode == parseInt(param.customKeyCode)
  			_self.doCheck();
  		}
  		var deleteFlag =  e.keyCode == 46 ? true : false
  		, value = $(this).val().trim()
  	    , backFlag = e.keyCode == 8 && value == "" ? true : false
  	    , way = "";
  		if(deleteFlag)
  			way = "next";
  		if(backFlag)
  			way = "prev";
  		
  		if(deleteFlag || backFlag){        // Delete:46 Backspace:8
  			_self.deleteEmail($(this),way);    //删除邮箱地址
  		}
  	});
  };
  /**
   * 邮箱地址容器点击事件处理逻辑
   * @param event
   */
  fn.containClick = function(event){
  	var _self = this
  	, param = _self.opts;
  	
  	var item = $(event.target).hasClass(param.itemName)
		, id = event.target.id; 
		if(!item){
	  		if(!id || (id && id != param.textInputId)){
	  			$("#"+param.textInputId).focus();
	  		}
		}
		$("#"+param.containId).addClass(param.containFocus);
  };
  /**
   * edit pretty address.
   * for example : email,aliww,tbww
   */
  fn.editPretty = function($this){
  	var _self = this
  	, param = _self.opts
  	, text = $this.text()
		, length = text.length;
		
		$("#"+param.textInputId).val(text.substr(0,length));
//		var clone = $("#"+param.textInputId).clone();
//		$("#"+param.textInputId).remove();
		$("#"+param.textInputId).insertBefore($this);
		$this.remove();
//		_self.textInputEvent();//重新绑定事件
		$("#"+param.textInputId).focus();
  };
  /**
   * 删除邮箱地址
   * @param $this 当前输入框
   * @param way 方向 prev：向前、next：向后
   */
  fn.deleteEmail = function($this,way){
  	var _self = this
  	, param = _self.opts;
  	if(way == "prev"){
  		$this.prev().remove();
  	}else if(way == "next"){
  		$this.next().remove();
  	}
  };
  /**
   * 验证正则匹配的任何值
   */
  fn.doCheck = function(){
  	var _self = this
  	, param = _self.opts
		// 验证格式
		, checkEmail = function(address){
			var isEmail = true;
			if(!_self.doRegExp(address)){
				isEmail = false;
			}
			return isEmail;
		}
		// 验证值
		, checkValue = function(value){
			var isEmpty = true
			, isEmail = false
			, length = value.length
			, start = length > 1?length-1 : length
			, end = length
			, last = value.substring(start,end);
			if(value.trim() != ""){
				isEmpty = false;
				if(checkEmail(value)){//qingliang_hu@163.com
					isEmail = true;
				}
				value += param.mark;   //加分隔符
			}    			
			return {
				isEmpty : isEmpty,
				isEmail : isEmail,
				value : value			    
			}
	  }
		var values = $("#"+param.textInputId).val();
		if(values.trim() != ""){
			var addArray = values.split(";");
			for(var i=0;i<addArray.length;i++){
				var rs = checkValue(addArray[i]);
				_self.pingHtml(rs);  //拼装html
			}
			
		} 
  };
  /**
   * 拼装html
   * @param   isEmpty : isEmpty
   * @param	isEmail : isEmail
   * @param	value : value
   */
  fn.pingHtml = function(obj){
  	var _self = this
  	, param = _self.opts
  	, nextSize = $("#"+param.textInputId).next().length
  	, html = '';    	
		if(!obj.isEmpty){
			html = '<p  title="双击可以修改！" class="' + param.itemName + '">' + obj.value + '</p>';
			if(!obj.isEmail){
				html = '<p class="' + param.itemName + ' input_error" title="' + param.errorTip + '">' + obj.value + '</p>';
			}
			$(html).insertBefore($("#"+param.textInputId));
			$("#"+param.textInputId).val("");
		}
		// 如果输入框位置移植到contain最后面
		$("#"+param.textInputId).appendTo($("#"+param.containId));
		$("#"+param.textInputId).focus();
  };
  
  return Pretty;
});
