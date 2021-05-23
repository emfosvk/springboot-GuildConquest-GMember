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
	var searchmain_sidebarURL 			= "/biz/ir01_0111/searchRoomRateOnRsvn.do";
	var searchListGuild				    = "/guld/openapi/searchGuild.api";
	var registerGuild 				    = "/guld/openapi/registerGuild.api";
	var cancelRegisterGuild 		    = "/guld/openapi/cancelRegisterGuild.api";

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

		//init Grid
       fn_main_sidebar_initGuildModal();

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

	/**
	 * @author Rosa, 2021-05-14
	 * @method fn_main_sidebar_initGuildModal
	 * @process create Grid
	 */
	var fn_main_sidebar_initGuildModal = function(){
	    if(commParam.variables.mainGuildInfoExeBoolean){
            $('#btnGuildInfo').on('click', (e) => {
                if(commParam.variables.mainGuildInfo){
                    //cancelRegisterGuild
                    var registInfo = commParam.variables.mainGuildInfo
                    var cancelModalTitle = '';
                    var cancelModalMsg = '';
                    var cancelBtnMsg = '길드 탈퇴';

                    switch(registInfo.regist_status){
                        case '01' : // 가입 승인 대기
                            cancelModalTitle = '가입 승인 대기 중';

                            cancelModalMsg = '길드명 : ' + registInfo.guild_name + '<br>'
                                            + '신청자 게임 닉네임 : ' + registInfo.nickname + '<br>'
                                            + '신청 메시지 : ' +  registInfo.regist_msg + '<br>';
                            cancelBtnMsg = '가입 신청 취소';
                            break;
                        case '10' : // 현 길드원
                            cancelModalTitle = '길드 가입 정보';

                            cancelModalMsg = '길드명 : ' + registInfo.guild_name + '<br>'
                                            + '신청자 게임 닉네임 : ' + registInfo.nickname + '<br>'
                                            + '직책 : ' + registInfo.role_name + '<br>';
                            cancelBtnMsg = '길드 탈퇴';
                            break;
                    }

                    $('#modalGuildInfo .modal-title').html(cancelModalTitle);
                    $('#modalGuildInfo .modal-body').html(cancelModalMsg);
                    $('#btnGuildCancelRegist').html(cancelBtnMsg);

                    $('#btnGuildCancelRegist').on('click', (e)=>{
                        var registInfo = commParam.variables.mainGuildInfo;
                        if(registInfo){

                            var confirmTitle = '';

                            var confirmMsg = '';
                            var cancelSuccessMsg = '';

                            switch(registInfo.regist_status){
                                case '01' : // 가입 승인 대기
                                    confirmTitle = '가입 신청 취소';

                                    confirmMsg = '길드명 : ' + registInfo.guild_name + '<br>'
                                                    + '게임 닉네임 : ' + registInfo.nickname + '<br>'
                                                    + '신청 메시지 : ' +  registInfo.regist_msg + '<br>'
                                                    + '<br>'
                                                    + '<h5>'+ '정말로 가입신청을 취소 하시겠습니까?' +'</h5>';
                                    cancelSuccessMsg = '길드 가입 신청 취소가 완료되었습니다.';
                                    break;
                                case '10' : // 현 길드원
                                    confirmTitle = '길드 탈퇴';

                                    confirmMsg = '길드명 : ' + registInfo.guild_name + '<br>'
                                                    + '등록 닉네임 : ' + registInfo.nickname + '<br>'
                                                    + '직책 : ' + registInfo.role_name + '<br>'
                                                    + '<br>'
                                                    + '<h5>'+ '정말로 길드를 탈퇴 하시겠습니까?' +'</h5>';
                                    cancelSuccessMsg = '길드 탈퇴가 완료되었습니다.';
                                    cancelSuccessMsg += "<br>다시 로그인 해주세요."
                                    break;
                            }

                            var GRcallbackFunc = function (fromAjaxEvent, jsonResult, registInfo){
                                if(jsonResult.result == true){
                                    cfn_openCommonModal({
                                         title: confirmTitle + ' 성공'
                                        ,content : cancelSuccessMsg
                                        ,Close : GRcallbackReloadPage
                                    });
                                } else {
                                   var errorContent = (jsonResult && jsonResult.msg)? jsonResult.msg : '관리자에게 문의하세요';
                                    cfn_openCommonModal({
                                         modalMode : 'alert'
                                        ,title: confirmTitle + ' 실패'
                                        ,content : errorContent
                                        ,Close : GRcallbackReloadPage
                                    });
                                }
                            }

                            var GRcallbackReloadPage = function (){
                                location.reload();
                            }

                            cfn_openCommonModal({
                                                 modalMode : 'confirm_alert'
                                                ,title: confirmTitle
                                                ,content : confirmMsg
                                                ,OK : ()=>{
                                                    cfn_ajax({
                                                          type : "POST"
                                                        , url : cancelRegisterGuild
                                                        , data : registInfo
                                                        , fromAjaxEvent : 'btnSearch'
                                                        , callbackFunc : GRcallbackFunc
                                                    });
                                                }
                            });

                        }
                    })

                    // 길드 정보 팝업
                    $('#modalGuildInfo').modal("show");

                } else {

                    // 길드 가입 팝업 modalGuildRegist
                    $('#frmG_guild').gtAjaxAutoComplete({
                          type : "GET"
                        , url : searchListGuild
                        , data : {paramStr2 : 'Y'}
                        , codeCol : "guild_id"
                        , nameCol : "guild_name"
                        , minLength : 0
                    });

                    $('#modalGuildRegist label .GRtooltip').tooltip();

                    $('#btnGuildRegist').on('click', (e)=>{
                        var registInfo = $('#frmG').formSerialize(true);
                        if(registInfo){
                            if(!registInfo.guild_id || registInfo.guild_id == ''){
                                alert('가입하려는 길드를 선택해주세요');
                                $('#frmG_guild').focus();
                                return false;
                            }
                            if(!registInfo.nickname || registInfo.nickname == ''){
                                alert('인게임 닉네임을 등록해주세요');
                                $('#frmG_guild').focus();
                                return false;
                            }

                            var confirmMsg = '길드명 : ' + registInfo.guild_name + '<br>'
                                            + '신청자 게임 닉네임 : ' + registInfo.nickname + '<br>'
                                            + '신청 메시지 : ' +  registInfo.regist_msg + '<br>'
                                            + '<br>'
                                            + '<h5>'+ '위 정보로 길드 신청을 하시겠습니까?' +'</h5>'

                            var GRcallbackFunc = function (fromAjaxEvent, jsonResult, registInfo){
                                if(jsonResult.result == true){
                                    cfn_openCommonModal({
                                         title:'길드 가입 신청 완료'
                                        ,content : '신청이 완료되었습니다.'
                                        ,Close : GRcallbackReloadPage
                                    });
                                } else {
                                   var errorTitle = '길드 가입 신청 실패';
                                   var errorContent = (jsonResult && jsonResult.msg)? jsonResult.msg : '관리자에게 문의하세요';
                                    cfn_openCommonModal({
                                         modalMode : 'alert'
                                        ,title: errorTitle
                                        ,content : errorContent
                                        ,Close : GRcallbackReloadPage
                                    });
                                }
                            }

                            var GRcallbackReloadPage = function (){
                                location.reload();
                            }

                            cfn_openCommonModal({
                                                 modalMode : 'confirm'
                                                ,title:'길드 가입 신청 정보 확인'
                                                ,content : confirmMsg
                                                ,OK : ()=>{
                                                    cfn_ajax({
                                                          type : "POST"
                                                        , url : registerGuild
                                                        , data : registInfo
                                                        , fromAjaxEvent : 'btnSearch'
                                                        , callbackFunc : GRcallbackFunc
                                                    });
                                                }
                            });

                        }
                    })

                    $('#modalGuildRegist').modal("show");

                }
            });
	    }
	    //modalGuildRegist
        //modalGuildInfo
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