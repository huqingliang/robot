(function( env ) {
  'use strict';
 
  var configs = {
    alias: {
	  	/* robot */
			'RobotCalendar' : 'library/widget/robot/robot-calendar',
			'RobotCommon' : 'library/widget/robot/robot-common',
			'RobotDialog' : 'library/widget/robot/robot-dialog',
			'RobotDropdown' : 'library/widget/robot/robot-dropdown',
			'RobotEvent' : 'library/widget/robot/robot-event',
			'RobotPretty' : 'library/widget/robot/robot-pretty',
			'RobotTab' : 'library/widget/robot/robot-tab',
			'RobotNavs' : 'library/widget/robot/robot-navs',
			'RobotPage' : 'library/widget/robot/robot-page',
			'RobotTooltip' : 'library/widget/robot/robot-tooltip',
		  'jquery' : 'library/jquery183',
		  'WdatePicker' : 'library/my97-date-picker/wdate-picker'
    },

		amd : true,
		
		baseUrl : 'file:///E:/open-project/robot/',
		
		resolve: function( id ) {
		  var rStyle = /\.css(?:\?|$)/,
			parts = id.split('/'),
			root = parts[0],
			type = rStyle.test( id ) ? 'css/' : 'js/';
			switch ( root ){
	      case 'robot':
	      	id = '' + type + id;
          break;
        default:
        	id = '' + type + id;
          break;
       }
		  return id;
		} 
  };	

  if( typeof env.lofty !== 'undefined' ) {
    // for lofty
    env.lofty.config(configs);
  }
  if( typeof exports !== 'undefined' && env === exports ) {
    // for node.js
    exports.configs = configs;
  }
})(this);