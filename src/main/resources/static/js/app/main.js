/***
* Developer : Rosa / 2021-04-11
* Screen    : main Script ( JS 스크립트 템플릿. )
* History   : Created ( 2021-04-11 )
*/
var main = function(){
	/* ********************** [START] variables ****************** */
	// common variables for this script
	var commParam = {};

	//ajax url
	var searchMainURL 				= "/biz/ir01_0111/searchRoomRateOnRsvn.do";

	/* ********************** [END] variables ****************** */

	/* ********************** [START] page load ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_ready
	 * @process page Ready (This function is called after the clear function works and page load.)
	 */
	var fn_main_ready = function(){

		$('form').each(function(){

		});

		// Mapping buton event
		fn_main_button_event();
	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_button_event
	 * @process page initialize (This function is called after the clear function works and page load.)
	 */
	var fn_main_init = function(){

		//init Grid
		fn_main_initgrid();

		//default value setting
		fn_main_defaultValue();

	}
	/* ********************** [END] page load ****************** */

	/* ********************** [START] init grid ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_initgrid
	 * @process create Grid
	 */
	var fn_main_initgrid = function(){

	}


	/* ********************** [END] init grid ****************** */

	/* ********************** [START] grid event ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_grid_click
	 * @process on event to buttons
	 */
	var fn_main_grid_click = function(){

	}

	/* ********************** [END] grid event ****************** */

	/* ********************** [START] common button event ****************** */


	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_button_event
	 * @process on event to buttons
	 */
	// description of funtion
	var fn_main_button_event = function(){
		//각종 버튼의 on Event는 여기에 집어넣으세요.
	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_btnEvent_search
	 * @process create 'on' event to Search button
	 */
	var fn_main_btnEvent_search = function(obj, e){

	}

	/* ********************** [END] common button event ****************** */

	/* ********************** [START] user defined function ****************** */

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_defaultValue
	 * @process setting default Value
	 */
	var fn_main_defaultValue = function(){

	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_custom_function
	 * @process custom event
	 */
	var fn_main_custom_function = function(){

	}

	/* ********************** [END] user defined function ****************** */

	return {
		initialize : function(param){
			commParam = param;

			fn_main_ready();
			fn_main_init();
		},

		fn_ready  : fn_main_ready,
		fn_init   : fn_main_init,
		commParam : commParam
	};
}();