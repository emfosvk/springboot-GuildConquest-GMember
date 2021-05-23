/***
* Developer : Rosa / 2021-04-11
* Screen    : GULD00_REGIST Script ( JS 스크립트 템플릿. )
* History   : Created ( 2021-04-11 )
*/
var GULD00_REGIST = function(){
	/* ********************** [START] variables ****************** */
	// common variables for this script
	var commParam = {};

	//ajax url
	var searchListGULD00_REGIST_URL = "/guld/api/searchRegist.api";
	var modifyGULD00_REGIST_URL 	= "/guld/api/modifyRegist.api";

	/* ********************** [END] variables ****************** */

    let loginUserInfo;
    var toastGrid, toastGridCols;
    var selBoxGuildID, selBoxGuildSts, selBoxGuildRole;

	/* ********************** [START] page load ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_GULD00_REGIST_ready
	 * @process page Ready (This function is called after the clear function works and page load.)
	 */
	var fn_GULD00_REGIST_ready = function(){

		$('form').each(function(){

		});

	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_GULD00_REGIST_button_event
	 * @process page initialize (This function is called after the clear function works and page load.)
	 */
	var fn_GULD00_REGIST_init = function(){

		//init Grid
		fn_GULD00_REGIST_initGrid();

		//init dropdown
        fn_GULD00_REGIST_initDropdown();

		//default value setting
		fn_GULD00_REGIST_defaultValue();

        // Mapping buton event
        fn_GULD00_REGIST_button_event();

	}
	/* ********************** [END] page load ****************** */

	/* ********************** [START] init grid ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_GULD00_REGIST_initgrid
	 * @process create Grid
	 */
	var fn_GULD00_REGIST_initGrid = function(){

	    toastGridCols = [
                             {
                               header : 'Guild',
                               name   : 'guild_name',
                               width  : 130
                             },
                             {
                               header : '닉네임',
                               name   : 'nickname',
                               width  : 150
                             },
                             {
                               header : '직책',
                               name   : 'role_name',
                               width  : 100
                             },
                             {
                               header : '가입 상태',
                               name   : 'regist_status_name',
                               width  : 100
                             },
                             {
                               header : '가입 인사말',
                               name   : 'regist_msg'
                             },
                             {
                               header : 'Guild Id',
                               name   : 'guild_id',
                               hidden : true
                             },
                             {
                               header : 'member ID',
                               name   : 'user_id',
                               hidden : true
                             },
                             {
                               header : 'Role',
                               name   : 'role',
                               hidden : true
                             },
                             {
                               header : 'User ID',
                               name   : 'regist_status',
                               hidden : true
                             },
                             {
                               header : 'User Level',
                               name   : 'user_level',
                               hidden : true
                             }
                         ]

        toastGrid = new tui.Grid({
                      el: document.getElementById('toastGrid'), // 컨테이너 엘리먼트
                      data: {
                              api: {
                                 readData:   { url: searchListGULD00_REGIST_URL, method: 'GET' }
                              }
                            },
                      //scrollX: false,
                      bodyHeight : 500,
                      rowHeaders: ['rowNum', 'checkbox'],
                      columns: toastGridCols,
                      showDummyRows: true,
                      columnOptions: {
                        resizable: true
                      }
                    });

        tui.Grid.applyTheme('striped');

        toastGrid.on('beforeRequest', (ev) => {
            loadingBarControl(true);
        });

        toastGrid.on('response', (ev) => {
            // 성공/실패와 관계 없이 응답을 받았을 경우
            loadingBarControl(false);
        });

        toastGrid.on('dblclick', (ev) => {
            if(typeof ev != "undefined" && typeof ev.rowKey != "undefined"){
                var selecedRowData = toastGrid.getRow(ev.rowKey);
                if(selecedRowData){

                    $('#frmGM').bindingForm(selecedRowData);

                    if (!fn_GULD00_REGIST_changeModalMode(selecedRowData)){
                        return false;
                    };

                    $('#modalGuildManageRegist').modal("show");
                }
            }
        });

        //toastGrid.readData();

	}

    /**
     * @author Rosa, 2021-04-11
     * @method fn_GULD00_REGIST_initgrid
     * @process create Grid
     */
    var fn_GULD00_REGIST_initDropdown = function(){
        selBoxGuildID = new tui.SelectBox('#frmS_paramStr1', {
                           data: commParam.variables.guildList,
                           autofocus: true
                         });

        selBoxGuildSts = new tui.SelectBox('#frmGM_registStatus', {
                           data: commParam.variables.registStatusList,
                           autofocus: true
                         });

        selBoxGuildRole = new tui.SelectBox('#frmGM_role', {
                           data: commParam.variables.roleList,
                           autofocus: true
                         });

        $('#modalGuildManageRegist .formTitle .GRtooltip').tooltip();

    }

	/* ********************** [END] init grid ****************** */

	/* ********************** [START] grid event ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_GULD00_REGIST_grid_click
	 * @process on event to buttons
	 */
	var fn_GULD00_REGIST_grid_click = function(){

	}

	/* ********************** [END] grid event ****************** */

	/* ********************** [START] common button event ****************** */


	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_GULD00_REGIST_button_event
	 * @process on event to buttons
	 */
	// description of funtion
	var fn_GULD00_REGIST_button_event = function(){
        $('#btnSearch').off();
        $('#btnClear') .off();
//        $('#btnNew')   .off();
//        $('#btnSave')  .off();
//        $('#btnDelete').off();
        $('#btnSearch').on('click',fn_GULD00_REGIST_btnEvent_search);
        $('#btnClear') .on('click',fn_GULD00_REGIST_btnEvent_clear);
//        $('#btnNew')   .on('click',fn_GULD00_REGIST_btnEvent_new);
//        $('#btnSave')  .on('click',fn_GULD00_REGIST_btnEvent_save);
//        $('#btnDelete').on('click',fn_GULD00_REGIST_btnEvent_delete);
	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_GULD00_REGIST_btnEvent_search
	 * @process create 'on' event to Search button
	 */
	var fn_GULD00_REGIST_btnEvent_search = function(e){

        var searchOption = $('#frmS').formSerialize(true);
        var guildID = selBoxGuildID.getSelectedItem();
        if(!guildID){
            selBoxGuildID.select(0);
            guildID = selBoxGuildID.getSelectedItem();
        }
        searchOption.paramStr1 = guildID.value;
        toastGrid.readData(1, searchOption, true);

	}

    /**
     * @author Rosa, 2021-04-13
     * @method fn_GULD00_REGIST_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_GULD00_REGIST_btnEvent_clear = function(e){
        console.log('초기화버튼');
        toastGrid.destroy();
        selBoxGuildID.destroy();
        selBoxGuildSts.destroy();
        selBoxGuildRole.destroy();
        fn_GULD00_REGIST_ready();
        fn_GULD00_REGIST_init();
    }

    /**
     * @author Rosa, 2021-04-13
     * @method fn_GULD00_REGIST_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_GULD00_REGIST_btnEvent_new = function(e){
//        console.log('신규버튼');
//        console.log(toastGrid.getRowCount());
//
//        var guildIdItem = selBoxGuildID.getSelectedItem();
//        if(!guildIdItem){
//            selBoxGuildID.select(0);
//            guildIdItem = selBoxGuildID.getSelectedItem();
//        }
//        var guildID = guildIdItem.value;
//        toastGrid.appendRow({
//               "guild_id": Number(guildID)
//              ,"use_yn" : 'Y'
//        });
    }

	/**
     * @author Rosa, 2021-04-13
     * @method fn_GULD00_REGIST_btnEvent_save
     * @process create 'on' event to Save button
     */
    var fn_GULD00_REGIST_btnEvent_save = function(e){

//        var getRowOption =  {
//             checkedOnly : false // If set to true, only checked rows will be considered.
//            ,withRawData : false // If set to true, the data will contains the row data for internal use.
//            ,rowKeyOnly  : false // If set to true, only keys of the changed rows will be returned.
//            ,ignoredColumns : [] // A list of column name to be excluded
//        }
//
//        if(toastModifyValid(toastGrid, getRowOption)){
//            var columnData = toastGrid.getColumns(toastGrid);
//            var modifyRows = toastGrid.getModifiedRows(getRowOption);
//
//            $.ajax({
//                url: modifyGULD00_REGIST_URL,
//                dataType : "json",
//                type: "POST",
//                data: {
//                     "columnData" : JSON.stringify(columnData)
//                    ,"createdRows" : JSON.stringify(modifyRows.createdRows)
//                    ,"updatedRows" : JSON.stringify(modifyRows.updatedRows)
//                    ,"deletedRows" : JSON.stringify(modifyRows.deletedRows)
//                },
//                success: function(data){
//                    fn_GULD00_REGIST_btnEvent_search();
//                },
//                error: function(){
//                    alert("simpleWithObject err");
//                }
//            });
//        }
    };

    /**
     * @author Rosa, 2021-04-13
     * @method fn_GULD00_REGIST_btnEvent_search
     * @process create 'on' event to Search button
     */
    var fn_GULD00_REGIST_btnEvent_delete = function(e){
//        toastGrid.removeCheckedRows(true); // If set to true, confirm message will be shown before remove.
//        console.log('삭제버튼');
    }

	/* ********************** [END] common button event ****************** */

	/* ********************** [START] user defined function ****************** */

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_GULD00_REGIST_defaultValue
	 * @process setting default Value
	 */
	var fn_GULD00_REGIST_defaultValue = function(){
        selBoxGuildID.select('');
        $('input:radio[name=paramStr2]:input[value=' + 'A' + ']').attr("checked", true);
	}

    /**
     * @author Rosa, 2021-05-23
     * @method fn_GULD00_REGIST_custom_function
     * @process custom event
     */
    var fn_GULD00_REGIST_changeModalMode = function(selecedRowData){
        var rtnPass = false;
        if(selecedRowData){

            //01 Select box Control
            selBoxGuildSts.enable();
            selBoxGuildSts.select(selecedRowData.regist_status);
            selBoxGuildSts.disable();
            console.log(selBoxGuildSts.getSelectedItem());

            selBoxGuildRole.enable();
            selBoxGuildRole.enable("GUEST");
            var roleSelItem = selBoxGuildRole.getItem(selecedRowData.role);
            var roleSelItemDisabled = roleSelItem.itemDisabled;
            if(roleSelItemDisabled){
                selBoxGuildRole.enable(selecedRowData.role);
            }

            selBoxGuildRole.select(selecedRowData.role);

            if(roleSelItemDisabled){
                selBoxGuildRole.disable(selecedRowData.role);
            }

            //02 Btn Control
            $('#btnGuildManageRegistModify').removeClass("btnDisplayNone");
            $('#btnGuildManageRegistReject').removeClass("btnDisplayNone");
            $('#btnGuildManageRegistModify').off();
            $('#btnGuildManageRegistReject').off();
            var btnModifyText = "길드정보 수정";
            var btnRejectText = "길드가입 거절";


            var registSts = selecedRowData.regist_status;
            switch(registSts){
                case "01" :
                    //01 Select box Control

                    //02 Btn Control
                    btnModifyText = '가입 승인';
                    btnRejectText = '가입 거절';

                break;
                case "10" :
                    //01 Select box Control
                    //가입 상태인 유저는 GUEST 권한으로 돌리지 못하도록 세팅
                    selBoxGuildRole.disable("GUEST");

                    //02 Btn Control
                    btnModifyText = '정보 수정';
                    btnRejectText = '강퇴';

                    if(selecedRowData.user_level >= loginUserInfo.user_level && selecedRowData.user_id != loginUserInfo.user_id ){
                        //자기랑 동급 혹은 상위 권한일 경우 수정 불가능.
                        selBoxGuildRole.disable();
                        $('#btnGuildManageRegistModify').addClass("btnDisplayNone");
                        $('#btnGuildManageRegistReject').addClass("btnDisplayNone");
                    } else if (selecedRowData.user_id == loginUserInfo.user_id){
                        //자기자신일 경우 정보만 수정 가능하도록
                        selBoxGuildRole.disable();
                        $('#btnGuildManageRegistReject').addClass("btnDisplayNone");
                    }

                break;
                case "91" :
                case "99" :
                    //01 Select box Control
                    //강퇴, 탈퇴멤버는 복구 못하도록 버튼 제어.
                    selBoxGuildRole.disable();

                    //02 Btn Control
                    $('#btnGuildManageRegistModify').addClass("btnDisplayNone");
                    $('#btnGuildManageRegistReject').addClass("btnDisplayNone");
                break;
            }

            $('#btnGuildManageRegistModify').text(btnModifyText);
            $('#btnGuildManageRegistReject').text(btnRejectText);

            $('#btnGuildManageRegistModify').on('click', fn_GULD00_REGIST_accept_regist);
            $('#btnGuildManageRegistReject').on('click', fn_GULD00_REGIST_reject_regist);
            var rtnPass = true;
        }
        return rtnPass;
    }

	/**
	 * @author Rosa, 2021-05-23
	 * @method fn_GULD00_REGIST_accept_regist
	 * @process custom event
	 */
	var fn_GULD00_REGIST_accept_regist = function(){
        //길드 가입 승인
        var registInfo = $('#frmGM').formSerialize(true);
        var guildSts = selBoxGuildSts.getSelectedItem();
        var guildRole = selBoxGuildRole.getSelectedItem();
        registInfo.role = guildRole.value;
        registInfo.role_name = guildRole.label;
        registInfo.regist_status = guildSts.value;
        registInfo.regist_status_name = guildSts.label;

        if(registInfo.regist_status == '01' && registInfo.role == 'GUEST'){
            cfn_openCommonModal({
                                 modalMode : 'alert'
                                ,title: '설정값 확인'
                                ,content : '방문객 등급이 아닌 다른 권한으로 변경해주세요'
            });
            return false;
        }

        var confirmTitle = '';
        var confirmMsg = '';
        var ajaxEventType = '';

        switch(registInfo.regist_status){
            case "01" :
                //가입신청 - 가입 승인 버튼
                registInfo.mode = 'MR'; //Modify Regist
                ajaxEventType = "RegistModify01";
                confirmTitle = '가입 승인 확인';
                confirmMsg =  '<h5>'+ '다음 유저의 가입 승인을 진행하시겠습니까?' +'</h5>'
                           + '게임 닉네임 : ' + registInfo.nickname + '<br>'
                           + '권한 : ' +  registInfo.role_name + '<br>'
                           + '신청 메시지 : ' +  registInfo.regist_msg + '<br>'
                           + '<br>';
            break;
            case "10" :
                //가입신청 - 정보 수정 버튼
                registInfo.mode = 'MM'; //Modify Member Info
                ajaxEventType = "RegistModify10";
                confirmTitle = '회원 정보 수정 확인';
                confirmMsg =  '<h5>'+ '다음과 같이 정보를 변경하시겠습니까?' +'</h5>'
                           + '게임 닉네임 : ' + registInfo.nickname + '<br>'
                           + '권한 : ' +  registInfo.role_name + '<br>'
                           + '<br>';
            break;
            default :
            return false;
        }

        cfn_openCommonModal({
                             modalMode : 'confirm'
                            ,title: confirmTitle
                            ,content : confirmMsg
                            ,OK : ()=>{
                                cfn_ajax({
                                      type : "POST"
                                    , url : modifyGULD00_REGIST_URL
                                    , data : registInfo
                                    , fromAjaxEvent : ajaxEventType
                                    , callbackFunc : fn_GULD00_REGIST_callbackFunc
                                });
                            }
        });

	}

	/**
	 * @author Rosa, 2021-05-23
	 * @method fn_GULD00_REGIST_accept_reject
	 * @process custom event
	 */
	var fn_GULD00_REGIST_reject_regist = function(){
        //길드 가입 거절
        var registInfo = $('#frmGM').formSerialize(true);
        var guildSts = selBoxGuildSts.getSelectedItem();
        var guildRole = selBoxGuildRole.getSelectedItem();
        registInfo.role = guildRole.value;
        registInfo.role_name = guildRole.label;
        registInfo.regist_status = guildSts.value;
        registInfo.regist_status_name = guildSts.label;


        var confirmTitle = '';
        var confirmMsg = '';
        var ajaxEventType = '';

        switch(registInfo.regist_status){
            case "01" :
                //가입승인 - 가입 거절 버튼
                registInfo.mode = 'RR'; //Reject Regist
                ajaxEventType = "RegistReject01";
                confirmTitle = '가입 거절 확인';
                confirmMsg =  '<h5>'+ '정말로 가입신청을 거절 하시겠습니까?' +'</h5>'
                           + '게임 닉네임 : ' + registInfo.nickname + '<br>'
                           + '신청 메시지 : ' +  registInfo.regist_msg + '<br>'
                           + '<br>';
            break;
            case "10" :
                //가입정보 - 강퇴 버튼
                registInfo.mode = 'RM'; //Reject Member
                ajaxEventType = "RegistReject10";
                confirmTitle = '강제 탈퇴 확인';
                confirmMsg =  '<h5>'+ '정말로 강제 탈퇴를 실행하시겠습니까?' +'</h5>'
                           + '게임 닉네임 : ' + registInfo.nickname + '<br>'
                           + '권한 : ' +  registInfo.role_name + '<br>'
                           + '<br>';
            break;
            default :
            return false;
        }

        console.log('fn_GULD00_REGIST_reject_regist');
        console.log(registInfo);

        cfn_openCommonModal({
                             modalMode : 'confirm_alert'
                            ,title: confirmTitle
                            ,content : confirmMsg
                            ,OK : ()=>{
                                cfn_ajax({
                                      type : "POST"
                                    , url : modifyGULD00_REGIST_URL
                                    , data : registInfo
                                    , fromAjaxEvent : ajaxEventType
                                    , callbackFunc : fn_GULD00_REGIST_callbackFunc
                                });
                            }
        });
	}

	/**
	 * @author Rosa, 2021-05-23
	 * @method fn_GULD00_REGIST_accept_reject
	 * @process custom event
	 */
	var fn_GULD00_REGIST_callbackFunc = function(fromAjaxEvent, jsonResult, registInfo){

	    var modalTitle = '';
	    var modalContent = '';

	    switch (fromAjaxEvent) {
            case "RegistModify01" :
                modalTitle = '가입 승인 완료';
                modalContent = '가입 승인이 완료되었습니다.';
            break;
            case "RegistModify10" :
                modalTitle = '정보 수정 완료';
                modalContent = '가입 정보수정이 완료되었습니다.';
            break;
            case "RegistReject01" :
                modalTitle = '가입 거절 완료';
                modalContent = '길드 가입 거절이 완료되었습니다.';
            break;
            case "RegistReject10" :
                modalTitle = '탈퇴 처리 완료';
                modalContent = '탈퇴 처리가 완료되었습니다.';
            break;
	    }

        if(jsonResult) {
	        if(jsonResult.result == true){
                cfn_openCommonModal({
                     title: modalTitle
                    ,content : modalContent
                    ,Close : fn_GULD00_REGIST_callbackReloadPage
                });
            } else {
                var errorTitle = '길드 가입 신청 실패';
                var errorContent = (jsonResult && jsonResult.msg)? jsonResult.msg : '관리자에게 문의하세요';
                 cfn_openCommonModal({
                      modalMode : 'alert'
                     ,title: errorTitle
                     ,content : errorContent
                     ,Close : fn_GULD00_REGIST_callbackReloadPage
                 });
            }
        }

	}


    /**
     * @author Rosa, 2021-04-11
     * @method fn_GULD00_REGIST_callbackReloadPage
     * @process custom event
     */
    var fn_GULD00_REGIST_callbackReloadPage = function(){
        $('#modalGuildManageRegist').modal("hide");
        fn_GULD00_REGIST_btnEvent_search();
    }

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_GULD00_REGIST_custom_function
	 * @process custom event
	 */
	var fn_GULD00_REGIST_custom_function = function(){

	}
	/* ********************** [END] user defined function ****************** */

	return {
		initialize : function(param){
			commParam = param;
            loginUserInfo = commParam.variables.loginUserInfo;
            console.log(loginUserInfo);
			fn_GULD00_REGIST_ready();
			fn_GULD00_REGIST_init();
		},

		fn_ready  : fn_GULD00_REGIST_ready,
		fn_init   : fn_GULD00_REGIST_init,
		commParam : commParam
	};
}();