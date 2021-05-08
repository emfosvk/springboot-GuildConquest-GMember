/***
* Developer : Rosa / 2021-04-11
* Screen    : main_menu Script ( JS 스크립트 템플릿. )
* History   : Created ( 2021-04-11 )
*/
var main_menu = function(){
	/* ********************** [START] variables ****************** */
	// common variables for this script
	var commParam = {};

	//ajax url
	var searchmain_menuURL 				= "/biz/ir01_0111/searchRoomRateOnRsvn.do";

	/* ********************** [END] variables ****************** */

	/* ********************** [START] page load ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_menu_ready
	 * @process page Ready (This function is called after the clear function works and page load.)
	 */
	var fn_main_menu_ready = function(){

		// Mapping buton event
		fn_main_menu_button_event();
	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_menu_button_event
	 * @process page initialize (This function is called after the clear function works and page load.)
	 */
	var fn_main_menu_init = function(){

		//init Grid
		fn_main_menu_initMenu();

		//default value setting
		fn_main_menu_defaultValue();

	}
	/* ********************** [END] page load ****************** */

	/* ********************** [START] init menu ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_menu_initMenu
	 * @process create Grid
	 */
	var fn_main_menu_initMenu = function(){
        var mainMenuList = commParam.variables.mainMenuList;
        console.log(mainMenuList);

        var sideBarHtml = '';
        var dropdownHtml = '';


        $.each(mainMenuList, function (index, map) {

            switch (map.row_type) {
                case 'F' :
                    sideBarHtml = sideBarHtml
                                + "<div class='menuFolder'>"
                                + map.screen_name
                                + "</div>";
                    dropdownHtml = dropdownHtml
                                + "<div class='dropdown-divider'>"
                                + ""
                                + "</div>";
                break;
                case 'S' :
                    sideBarHtml = sideBarHtml
                                + "<a href='" + map.uri_path + "'  class='list-group-item list-group-item-action bg-light'>"
                                + map.screen_name
                                + "</a>";
                    dropdownHtml = dropdownHtml
                                + "<a href='" + map.uri_path + "'  class='dropdown-item'>"
                                + map.screen_name
                                + "</a>";
                break;
                default :
                console.log('unknown row type Line No.' + index);
                console.log(map);
            }

        });

        $('#mainSideBarMenuList').html(sideBarHtml);
        $('#mainDropdownMenuList').html(dropdownHtml);
	}


	/* ********************** [END] init menu ****************** */

	/* ********************** [START] grid event ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_menu_grid_click
	 * @process on event to buttons
	 */
	var fn_main_menu_grid_click = function(){

	}

	/* ********************** [END] grid event ****************** */

	/* ********************** [START] common button event ****************** */


	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_menu_button_event
	 * @process on event to buttons
	 */
	// description of funtion
	var fn_main_menu_button_event = function(){
		//각종 버튼의 on Event는 여기에 집어넣으세요.
	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_menu_btnEvent_search
	 * @process create 'on' event to Search button
	 */
	var fn_main_menu_btnEvent_search = function(obj, e){

	}

	/* ********************** [END] common button event ****************** */

	/* ********************** [START] user defined function ****************** */

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_menu_defaultValue
	 * @process setting default Value
	 */
	var fn_main_menu_defaultValue = function(){

	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_main_menu_custom_function
	 * @process custom event
	 */
	var fn_main_menu_custom_function = function(){

	}

	/* ********************** [END] user defined function ****************** */

	return {
		initialize : function(param){
			commParam = param;

			fn_main_menu_ready();
			fn_main_menu_init();
		},

		fn_ready  : fn_main_menu_ready,
		fn_init   : fn_main_menu_init,
		commParam : commParam
	};
}();