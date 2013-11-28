define("library/widget/robot/robot-common",
		["require","exports","jquery"],
function(require,exports,$){
	
	"use strict";
	
	var defaultOpts = {
  };
  
  var RobotCommon = function (opts) {
  	this.opts = $.extend({}, defaultOpts, opts);
  };
  var fn = RobotCommon.prototype; 
  
  /**
   * filterBrackets
   * 过滤尖括号，转换成&lt;\&gt;
   */
  fn.filterBrackets = function(str) {
    return str.replace(/&/gm, '&amp;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
  };
  
  /**
   * 获取指定格式的系统时间
   * @param format 日期格式 如： "yyyy-MM-dd"
   * @return 指定格式的日期字符串 如： "2013-06-27"
   */
  fn.getFormatDate = function(format){
  	var _self = this
    , param = _self.opts
  	, date = new Date()
  	, fullYear = date.getFullYear()
  	, month = date.getMonth() + 1 + ""
  	, day = date.getDate() + ""
  	, hour = date.getHours() + ""
  	, min = date.getMinutes() + ""
  	, second = date.getSeconds() + ""
  	, result = format
  	, checkLength = function(str){
  		if(str.length == 1){
			  str = "0" + str;
    	}
  		return str;
  	};
  	month = checkLength(month);
  	day = checkLength(day);
  	hour = checkLength(hour);
  	min = checkLength(min);
  	second = checkLength(second);
  	if(_self.isNotEmpty(result)){
    	result = result.indexOf("yyyy") >= 0 ? result.replace("yyyy",fullYear) : result;
    	result = result.indexOf("MM") >= 0 ? result.replace("MM",month) : result;
    	result = result.indexOf("dd") >= 0 ? result.replace("dd",day) : result;
    	result = result.indexOf("hh") >= 0 ? result.replace("hh",hour) : result;
    	result = result.indexOf("mm") >= 0 ? result.replace("mm",min) : result;
    	result = result.indexOf("ss") >= 0 ? result.replace("ss",second) : result;
  	}
  	return result;
  };
    
    /**
	 * 判断字符串不为空
	 */
	fn.isNotEmpty = function(str){
		var result = true;
		if(typeof(str) != "undefined" && str != "undefined"){
			if(typeof(str) == "string" && (str == null || str.trim() == "" || str == "null")){
				result = false;
			}else if((typeof(str) == "object" || typeof(str) == "boolean" || typeof(str) == "Number") && str == null){
				result = false;
			}
		}else{
			result = false;
		}
		return result;
	};
	/**
	 * 判断字符串为空
	 */
	fn.isEmpty = function(str){
		var _self = this
	    , param = _self.opts;
		return !_self.isNotEmpty(str);
	};
	
//	/**
//	 * 获取浏览器信息
//	 */
//	fn.browser = function(){
//		var type = "msie"
//		, version = $.browser.version;
//		console.log($)
//		if($.browser.webkit){
//			type = "webkit"
//		}else if($.browser.safari){
//			type = "safari"
//		}else if($.browser.opera){
//			type = "opera"
//		}else if($.browser.mozilla){
//			type = "mozilla"
//		}
//		return {
//			"type" : type
//			"version" : version
//		}
//	};
	
	/**
	 * 判断是否跳过验证
	 * @param logic(逻辑运算符)
	 * @return true/false
	 */
	fn.skipCheck = function(logic){
		var result = false
		, array = ["is null","is not null"];
		result = array.indexOf(logic) > -1;
		return result;
	};
	/**
	 * 判断是否是包括、不包括等特殊类型
	 * @param logic
	 * @return result : true/false
	 */
	fn.containTypes = function(logic){
		var result = false
		, array = ["in","not in"];
		result = array.indexOf(logic) > -1;
		return result;
	};
	/**
	 * 包括、不包括等特殊类型，需要先分割逗号再验证
	 * @param o : {
     *     $this 当前对象
     *     value 当前值
     *     type 字符类型
     * }
     * @param value
     * @param obj
     * @return result : true/false
	 */
	fn.containTypeCheck = function(o,value,obj){
		var result = true
		, array = value.split(",");
		for(var i=0;i<array.length;i++){
			if(!obj[o.type].test(array[i])){
				result = false;
				if(o.error){
	    	  o.$this.addClass(o.error);
    		}else{
    			o.$this.addClass("error");
    		}
			}
		}
		if(result && o.error){
  	  o.$this.removeClass(o.error);
  	}
		return result;
	};
	/**
	 * 一般类型验证
	 * @param o : {
     *     $this 当前对象
     *     value 当前值
     *     type 字符类型
     * }
     * @param value
     * @param obj
     * @return result : true/false
	 */
	fn.normalCheck = function(o,value,obj){
		var result = true;
		if(!obj[o.type].test(value)){
  		if(o.error){
  			o.$this.addClass(o.error);
  		}else{
  			o.$this.addClass("error");
  		}
  		result = false;
    }else{
  		if(o.error){
  		  o.$this.removeClass(o.error);
  		}
		}
		return result;
	};
    
  /**
   * 验证字符串、整数、浮点数是否合法
   * @param o : {
   *     $this 当前对象
   *     value 当前值
   *     type 字符类型
   * }
   */
  fn.dataCheck = function(o){
  	var _self = this
  	, result = true
  	, value = _self.isNotEmpty(o.value) && o.type == "file" ? o.value.toLowerCase() : o.value
  	, obj = {
  		"int" : /^-?[0-9]\d*$/,
  		"sql" : /^0$|^[1-9]\d*$/,
  		"between-int" : /^([0-9]{1,},){1}([0-9]{1,})$/,
  		"string" : /\S+$/,
  		"string-yn" : /\S+$/,
  		"string-dim" : /\S+$/,
  		"float" : /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|\d*)$/,
  		"between-float" : /^((-?\d+)(\.\d+),(-?\d+)(\.\d+)){1}?$/,
		  "date" : /^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, //yyyy-MM-dd
		  "datetime" : /^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]) (\d{2}):(\d{2}):(\d{2})$/, //yyyy-MM-dd hh:mm:ss
		  "file" : /\s*\S+\s*\.txt|\.TXT$/,
		  "param" : /\S+$/
  	}
  	// 跳过验证的类型，直接返回true
  	if(_self.skipCheck(o.logic)){
  		return true;
  	}
  	// 先判断是否是包括、不包括等特殊类型
  	var isConstainType = _self.containTypes(o.logic); 
  	if(isConstainType){
  		result = _self.containTypeCheck(o,value,obj);
  	}else if(!isConstainType && obj[o.type]){
  		result = _self.normalCheck(o,value,obj);
  	}
	
  	return result;
  };
    
    /**
	 * second秒自动移除$this上名为error的class
	 */
	fn.removeError = function($this,second){
		var s = second ? second : 10;
		setTimeout(function(){
			$this.removeClass("error");
		},s * 1000);
	};
	
	/**
	 * second秒自动移除$this
	 */
	fn.removeEle = function($this,second){
		var s = second ? second : 10;
		setTimeout(function(){
			$this.remove();
		},s * 1000);
	};

	/**
     * 获取操作符(大于、等于)，并转换成英文形式(比如：>、=)<br>
     * 
     * r-value: 非浮框型操作符在不可编辑状态下的class<br>
     * input-value: 浮框型操作符在不可编辑状态下的class<br>
	 * logic-value: 浮框型操作符(永远是不可编辑状态)的class
	 * 
	 * @param $this: condition，即item div
     */
    fn.getChildLogic = function($this){
    	var _self = this
    	, v =  $this.find("em.r-value").text().trim();
    	
    	if(_self.isEmpty(v)){
				v = $this.find(".input-equal").val();
			}
    	if(_self.isEmpty(v)){
				v = $this.find(".logic-value").text().trim();
			}
    	var rs = _self.getLogicSymbol(v);
    	return rs;
    };
    
    /**
     * 根据中文类型cType映射出相应的符号
     * a = 1
	   a > 1
	   a >= 1
	   a < 1
	   a <= 1
	   a between 1;10	（分号分隔，包含边界值）
	   a like %ddd%
	   a like %ddd
	   a like ddd%
	   a in 1;2;3		（分号分隔）
	   a infile 1		（第三个操作符”1”表示上传文件的id）

     */
    fn.getLogicSymbol = function(cType){
    	var result = ""
    	, data = {
    		"等于" : "=",
    		"不等于" : "!=",    		
  	    "大于" : ">",
  	    "大于等于" : ">=",
  	    "小于" : "<",
  	    "小于等于" : "<=",
  	    "介于" : "between",
  	    "模糊匹配" : "like",
  	    "包括" : "in",
  	    "不包括" : "not in",
  	    "包括文件" : "infile",
				"且" : "and",
				"或" : "or",
				"为空值" : "is null",
				"不为空值" : "is not null"
    	}
    	if(cType && data[cType]){
    		result = data[cType];
    	}
    	return result;
    };
    
    /**
     * 是否是维表字段的包括操作 
     */
    fn.isInDim = function(operator, dtype) {
    	// string-dim: 普通维表字段，字段可选值从一个维表中取，且不为“Y,N”
    	return operator == "in" && dtype == "string-dim";
    };
    
    /**
     * 根据key值获取对应的
     */
    fn.getLogicList = function(key){
    	var result = ["包括","大于","大于等于","小于","小于等于","等于","不等于"]
    	, data = {
    		"int" : ["包括","大于","大于等于","介于","小于","小于等于","为空值","不为空值","等于","不等于"],
    		"date" : ["等于","介于","大于","小于","大于等于","小于等于","为空值","不为空值"],
    		"datetime" : ["等于","介于","大于","小于","大于等于","小于等于","为空值","不为空值"],
    		"float" : ["包括","大于","大于等于","介于","小于","小于等于","为空值","不为空值","等于","不等于"],
    		"string" : ["包括","模糊匹配","包括","不包括","为空值","不为空值","等于","不等于"],
    		"string-yn" : ["包括","为空值","不为空值","等于","不等于"],
    		"string-dim" : ["包括","不包括","为空值","不为空值","等于","不等于"],
    		"relation" : ["且","或"],
    		"file" : ["包括文件"],
    		"param" : ["包括","大于","大于等于","小于","小于等于","等于","不等于"]
    	}
    	if(key && data[key]){
    		result = data[key];
    	}
    	return result;
    };
    
    /**
     * 获取数据类型
     * @param key : "int\date\float\string\file"
     * @return "整数\日期\浮点数... ..."
     */
    fn.getDataType = function(key){
    	var result = ""
    	, data = {
    		"int" : "整数（包括、不包括用','隔开）",
    		"date" : "yyyy-MM-dd",
    		"datetime" : "yyyy-MM-dd hh:mm:ss",
    		"float" : "浮点数（包括、不包括用','隔开）",
    		"string" : "字符串",
    		"string-yn" : "字符串",
    		"string-dim" : "字符串",
    		"file" : "TXT文件",
    		"sql" : "正数或负数",
    		"param" : "参数"
    	}
    	if(key && data[key]){
    		result = data[key];
    	}
    	return result;
    };
    
    fn.isReadonly = function(type) {
//    	return type == "string" || type == "date" || type == "datetime";
    	return true;
    };
    
    fn.isDate = function(type) {
    	return type == "date" || type == "datetime";
    };
    
    fn.isLogicValue = function(type) {
//    	return type == "string" || type == "date" || type == "datetime";
    	return true;
    };
    
    
    /**
     * 判断是否in/not in
     * 
     * @param operator : 操作符(>、<等)
     */
    fn.isContain = function(operator) {
    	return operator == "in" || operator == "not in";
    };
    
    	
    /**
     * 发送异步请求
     * @param obj	      
		 *    包括url,
		 *    data,
		 *    type:get\post,
		 *    datatype:json\html\text
     * @param callback 回到函数
     */
    fn.sendAjax = function(obj,callback,errorBack){
       var _self = this
       , param = _self.opts
       , timeout = obj.timeout ? obj.timeout : param.timeout;
       
       $.ajax({
         url : obj.url,
         data : obj.data,
         dataType : obj.dataType,
         type : obj.type,
         timeout : timeout
       }).done(function(o) {
    	   if(callback){
    	     callback(o);
    	   }    	   
       }).error(function(o){
    	   if(errorBack){
    		   errorBack(o);
    	   }
       });
    };
    
    /**
     * 获取鼠标坐标
     */
    fn.getMousePos = function(ev) {
		if (!ev) {
			ev = this.getEvent();
		}
		if (ev.pageX || ev.pageY) {
			return {
				x: ev.pageX,
				y: ev.pageY
			};
		}

		if (document.documentElement && document.documentElement.scrollTop) {
			return {
				x: ev.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft,
				y: ev.clientY + document.documentElement.scrollTop - document.documentElement.clientTop
			};
		} else if (document.body) {
			return {
				x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
				y: ev.clientY + document.body.scrollTop - document.body.clientTop
			};
		}
	};
	fn.getItself = function(id) {
		return "string" == typeof id ? $("#"+id)[0] : id;
	};
	
	/**
	 * 获取元素坐标
	 */
	fn.getElementPos = function(ele) {
		var el = typeof(ele) == "object" ? ele: this.getItself(ele),
		    _x = 0,
			_y = 0;
		do {
			_x += el.offsetLeft;
			_y += el.offsetTop;
		} while (el = el.offsetParent);
		return {
			x: _x,
			y: _y
		};
	};
	
	/**
   * 获取父元素li.item坐标
   */
  fn.getParentPos = function($this,pEleName){
  	var _self = this
  	, param = _self.opts
  	, num = 0
  	, position = {
      pageX : 1,
      pageY : 1
    }
  	, doGet = function($this){
  		if(num < 10){
    		if(!$this.hasClass(pEleName ? pEleName: "item")){
    			num++;
    			doGet($this.parent());
        }else{
        	position.pageX = $this.offset().left + $this.width() - $(window).scrollLeft();
        	position.pageY = $this.offset().top + $this.height() - $(window).scrollTop();
        }
  		}
  	}
  	doGet($this);
  	return position;
  };
  
  return RobotCommon;
});