define('library/widget/robot/robot-page',['jquery'],
	function($){

	"use strict";

    var defaultOpts = {
    	pageSize : 10,
    	totalPage : 1,
    	current : 1,
      pagination : "#pagination"
    };

    var Page = function (opts) {
      this.opts = $.extend({}, defaultOpts, opts);
    };
    var fn = Page.prototype;
    /**
     * 渲染分页层
     * @param  p (后台返回的page对象)
     * {
     *   currentPage: 6  //当前页，必选
     *   pageSize: 10    //显示多少个tab，必选 
     *   totalPage: 14   //总页数，必选
     *   total: 136      //总条数，可选
     * }
     */
    fn.renderPage = function(p){
    	var _self = this
    	, param = _self.opts
    	, current = p.currentPage ? parseInt(p.currentPage) : param.current
    	, prePage = current - 1
    	, nextPage = current + 1
    	, totalPage = p.totalPage ? p.totalPage : param.totalPage
    	, pageSize = p.pageSize ? p.pageSize : param.pageSize;
    	if(totalPage > 0){
        var html = '<ul class="pull-right">'
        , j = 1
        , array = new Array();
        if(current > 1){
            html += '<li><a href="javascript:;" data-page="' + prePage + '" class="page-cell pre a-link" title="上一页"></a></li>';
        }else{
        	html += '<li><a class="page-cell pre disabled-pre" title="上一页"></a></li>';
        }
        while(j<=totalPage){
            array[j-1] = j;
            j++;
        }
        var index = array[current-1],
            acount = parseInt(pageSize);//10
        var start = index < parseInt(acount/2) ? 1 : index - parseInt(acount/2) + 1;
        var end = index < parseInt(acount/2) ? acount : index + parseInt(acount/2);
        if(!end || end>totalPage){
        	end = totalPage;
            start = end - acount + 1;
            start = start <= 0 ? 1 : start;
        }
        while(start<=end){
            if(start==current){
                html += '<li class="active"><a class="page-cell" href="javascript:;">' + start + '</a></li>';
            }else{
                html += '<li><a class="page-cell a-link" href="javascript:;" data-page="' + start + '">' + start + '</a></li>';
            }
            start++;
        }
        if(current < totalPage){
            html += '<li><a href="javascript:;" data-page="' + nextPage + '" class="page-cell a-link next"  title="下一页"></a></li>';
        }else{
        	html += '<li><a class="page-cell next disabled-next" title="下一页"></a></li>';
        }
        html += '</ul>';
        $(param.pagination).html(html);
      }
    };
    return Page;
});