/***
* Developer : KIM HY / 20161208
* Screen    : Room Rate Matrix Popup ( 객실료 조건표 팝업 )
* History   : Created ( 2016-12-08 )
*/
/***
* Developer : Rosa / 2021-04-11
* Screen    : main_sidebar Script ( JS 스크립트 템플릿. )
* History   : Created ( 2021-04-11 )
*/
var main_sidebar = function(){
	/* ********************** [START] variables ****************** */
	// common variables for this script
	var commParam = {};

	//ajax url
	var searchmain_sidebarURL 				= "/biz/ir01_0111/searchRoomRateOnRsvn.do";

	/* ********************** [END] variables ****************** */

	/* ********************** [START] page load ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_sidebar_ready
	 * @process page Ready (This function is called after the clear function works and page load.)
	 */
	var fn_main_sidebar_ready = function(){

		$('form').each(function(){

		});

		// Mapping buton event
		fn_main_sidebar_button_event();
	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_sidebar_button_event
	 * @process page initialize (This function is called after the clear function works and page load.)
	 */
	var fn_main_sidebar_init = function(){

		//init Grid
		fn_main_sidebar_initgrid();

		//default value setting
		fn_main_sidebar_defaultValue();

	}
	/* ********************** [END] page load ****************** */

	/* ********************** [START] init grid ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_sidebar_initgrid
	 * @process create Grid
	 */
	var fn_main_sidebar_initgrid = function(){

	}


	/* ********************** [END] init grid ****************** */

	/* ********************** [START] grid event ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_sidebar_grid_click
	 * @process on event to buttons
	 */
	var fn_main_sidebar_grid_click = function(){

	}

	/* ********************** [END] grid event ****************** */

	/* ********************** [START] common button event ****************** */


	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_sidebar_button_event
	 * @process on event to buttons
	 */
	// description of funtion
	var fn_main_sidebar_button_event = function(){
		//각종 버튼의 on Event는 여기에 집어넣으세요.
		$("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_sidebar_btnEvent_search
	 * @process create 'on' event to Search button
	 */
	var fn_main_sidebar_btnEvent_search = function(obj, e){

	}

	/* ********************** [END] common button event ****************** */

	/* ********************** [START] user defined function ****************** */

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_sidebar_defaultValue
	 * @process setting default Value
	 */
	var fn_main_sidebar_defaultValue = function(){

	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_sidebar_custom_function
	 * @process custom event
	 */
	var fn_main_sidebar_custom_function = function(){

	}

	/* ********************** [END] user defined function ****************** */

	return {
		initialize : function(param){
			commParam = param;

			fn_main_sidebar_ready();
			fn_main_sidebar_init();
		},

		fn_ready  : fn_main_sidebar_ready,
		fn_init   : fn_main_sidebar_init,
		commParam : commParam
	};
}();

main_sidebar.initialize();