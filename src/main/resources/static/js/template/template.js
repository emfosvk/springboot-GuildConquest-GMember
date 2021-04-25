/***
* Developer : Rosa / 2021-04-11
* Screen    : TEMPLATE_JS Script ( JS 스크립트 템플릿. )
* History   : Created ( 2021-04-11 )
*/
var TEMPLATE_JS = function(){
	/* ********************** [START] variables ****************** */
	// common variables for this script
	var commParam = {};

	//ajax url
	var searchTEMPLATE_JSURL 				= "/biz/ir01_0111/searchRoomRateOnRsvn.do";

	/* ********************** [END] variables ****************** */

	/* ********************** [START] page load ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_TEMPLATE_JS_ready
	 * @process page Ready (This function is called after the clear function works and page load.)
	 */
	var fn_TEMPLATE_JS_ready = function(){

		$('form').each(function(){

		});

		// Mapping buton event
		fn_TEMPLATE_JS_button_event();
	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_TEMPLATE_JS_button_event
	 * @process page initialize (This function is called after the clear function works and page load.)
	 */
	var fn_TEMPLATE_JS_init = function(){

		//init Grid
		fn_TEMPLATE_JS_initgrid();

		//default value setting
		fn_TEMPLATE_JS_defaultValue();

	}
	/* ********************** [END] page load ****************** */

	/* ********************** [START] init grid ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_TEMPLATE_JS_initgrid
	 * @process create Grid
	 */
	var fn_TEMPLATE_JS_initgrid = function(){

	}


	/* ********************** [END] init grid ****************** */

	/* ********************** [START] grid event ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_TEMPLATE_JS_grid_click
	 * @process on event to buttons
	 */
	var fn_TEMPLATE_JS_grid_click = function(){

	}

	/* ********************** [END] grid event ****************** */

	/* ********************** [START] common button event ****************** */


	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_TEMPLATE_JS_button_event
	 * @process on event to buttons
	 */
	// description of funtion
	var fn_TEMPLATE_JS_button_event = function(){
		//각종 버튼의 on Event는 여기에 집어넣으세요.
	});

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_TEMPLATE_JS_btnEvent_search
	 * @process create 'on' event to Search button
	 */
	var fn_TEMPLATE_JS_btnEvent_search = function(obj, e){

	}

	/* ********************** [END] common button event ****************** */

	/* ********************** [START] user defined function ****************** */

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_TEMPLATE_JS_defaultValue
	 * @process setting default Value
	 */
	var fn_TEMPLATE_JS_defaultValue = function(){

	});

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_TEMPLATE_JS_custom_function
	 * @process custom event
	 */
	var fn_TEMPLATE_JS_custom_function = function(){

	});

	/* ********************** [END] user defined function ****************** */

	return {
		initialize : function(param){
			commParam = param;

			fn_TEMPLATE_JS_ready();
			fn_TEMPLATE_JS_init();
		},

		fn_ready  : fn_TEMPLATE_JS_ready,
		fn_init   : fn_TEMPLATE_JS_init,
		commParam : commParam
	};
}();