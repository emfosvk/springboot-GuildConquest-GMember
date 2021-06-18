/***
* Developer : Rosa / 2021-04-11
* Screen    : BOOK00_EVMATCH Script ( JS 스크립트 템플릿. )
* History   : Created ( 2021-04-11 )
*/
var BOOK00_EVMATCH = function(){
	/* ********************** [START] variables ****************** */
	// common variables for this script
	var commParam = {};

	//ajax url
	var searchListBOOK00_EVMATCH_URL = "/book/api/searchListEvChar.api";
	var modifyBOOK00_EVMATCH_URL 	= "/book/api/modifyEvChar.api";


	/* ********************** [END] variables ****************** */

    var toastGrid, toastGridCols;
    var $selBoxTypeCode, selBoxTypeCode;

    var lotteData, lotteLength;
    var lotteRotate, lotteEnding;

	/* ********************** [START] page load ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_BOOK00_EVMATCH_ready
	 * @process page Ready (This function is called after the clear function works and page load.)
	 */
	var fn_BOOK00_EVMATCH_ready = function(){

		$('form').each(function(){

		});

	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_BOOK00_EVMATCH_button_event
	 * @process page initialize (This function is called after the clear function works and page load.)
	 */
	var fn_BOOK00_EVMATCH_init = function(){

		//init Grid
		fn_BOOK00_EVMATCH_initGrid();

		//init dropdown
        fn_BOOK00_EVMATCH_initDropdown();

		//default value setting
		fn_BOOK00_EVMATCH_defaultValue();

        // Mapping buton event
        fn_BOOK00_EVMATCH_button_event();

        // Default Lottery Setting
        fn_BOOK00_EVMATCH_btnEvent_regiClear();

	}
	/* ********************** [END] page load ****************** */

	/* ********************** [START] init grid ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_BOOK00_EVMATCH_initgrid
	 * @process create Grid
	 */
	var fn_BOOK00_EVMATCH_initGrid = function(){

	    toastGridCols = [
                             {
                               header : '클래스',
                               name   : 'class_name',
                               width  : 70,
                               align  : 'center',
                               editor : 'text',
                             },
                             {
                               header : '캐릭터명',
                               name   : 'char_name',

                               align  : 'center',
                               editor : 'text',
                             },
                             {
                               header : '적용 Y/N',
                               name   : 'ev_use_yn',
                               width  : 70,
                               align  : 'center',
                               formatter: 'listItemText',
                               editor: {
                                 type: "select",
                                 options: {
                                  listItems: [
                                     {text : "O", value : 'Y'}
                                    ,{text : "X", value : 'N'}
                                  ]
                                 }
                               },
                               validation : { required : true }
                             },
                             {
                               header : 'Code',
                               name   : 'char_id',
                               hidden : true
                             }
                         ]

        toastGrid = new tui.Grid({
                      el: document.getElementById('toastGrid'), // 컨테이너 엘리먼트
                      data: {
                              api: {
                                 readData:   { url: '/book/api/searchListEvChar.api', method: 'GET' }
                              }
                            },
                      //scrollX: false,
                      bodyHeight : 400,
                      rowHeaders: ['rowNum'],
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

        toastGrid.on('editingStart', (ev) => {
          // check the value
          var colName = ev.columnName;
          var rowKey = ev.rowKey;
          var hiddenData = toastGrid.getRow(rowKey);
          if (ev.columnName == 'type_code' && null != hiddenData[colName+'_hidden']) {
            ev.stop();
          }
        });


	}

    /**
     * @author Rosa, 2021-04-11
     * @method fn_BOOK00_EVMATCH_initgrid
     * @process create Grid
     */
    var fn_BOOK00_EVMATCH_initDropdown = function(){
//        selBoxTypeCode = new tui.SelectBox('#frmS_paramStr1', {
//                           data: [
//                             {
//                                data: [{label : 'Select All', value: ''}]
//                             },
//                             {
//                               label: 'Type Code',
//                               data: commParam.variables.typeCodeList
//                             }
//                           ],
//                           autofocus: true
//                         });
    }

	/* ********************** [END] init grid ****************** */

	/* ********************** [START] grid event ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_BOOK00_EVMATCH_grid_click
	 * @process on event to buttons
	 */
	var fn_BOOK00_EVMATCH_grid_click = function(){

	}

	/* ********************** [END] grid event ****************** */

	/* ********************** [START] common button event ****************** */


	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_BOOK00_EVMATCH_button_event
	 * @process on event to buttons
	 */
	// description of funtion
	var fn_BOOK00_EVMATCH_button_event = function(){
	    /*기본 버튼*/
        $('#btnSearch').off();
        $('#btnClear') .off();
        $('#btnNew')   .off();
        $('#btnSave')  .off();
        $('#btnDelete').off();
        $('#btnSearch').on('click',fn_BOOK00_EVMATCH_btnEvent_search);
        $('#btnClear') .on('click',fn_BOOK00_EVMATCH_btnEvent_clear);
        $('#btnNew')   .on('click',fn_BOOK00_EVMATCH_btnEvent_new);
        $('#btnSave')  .on('click',fn_BOOK00_EVMATCH_btnEvent_save);
        $('#btnDelete').on('click',fn_BOOK00_EVMATCH_btnEvent_delete);

	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_BOOK00_EVMATCH_btnEvent_search
	 * @process create 'on' event to Search button
	 */
	var fn_BOOK00_EVMATCH_btnEvent_search = function(e){

        var searchOption = {};
        toastGrid.readData(1, searchOption, true);

	}

    /**
     * @author Rosa, 2021-04-13
     * @method fn_BOOK00_EVMATCH_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_BOOK00_EVMATCH_btnEvent_clear = function(e){
        console.log('초기화버튼');
        toastGrid.destroy();
        fn_BOOK00_EVMATCH_ready();
        fn_BOOK00_EVMATCH_init();

    }

    /**
     * @author Rosa, 2021-04-13
     * @method fn_BOOK00_EVMATCH_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_BOOK00_EVMATCH_btnEvent_new = function(e){

    }

	/**
     * @author Rosa, 2021-04-13
     * @method fn_BOOK00_EVMATCH_btnEvent_save
     * @process create 'on' event to Save button
     */
    var fn_BOOK00_EVMATCH_btnEvent_save = function(e){

        var getRowOption =  {
             checkedOnly : false // If set to true, only checked rows will be considered.
            ,withRawData : false // If set to true, the data will contains the row data for internal use.
            ,rowKeyOnly  : false // If set to true, only keys of the changed rows will be returned.
            ,ignoredColumns : [] // A list of column name to be excluded
        }

        if(toastModifyValid(toastGrid, getRowOption)){
            var columnData = toastGrid.getColumns(toastGrid);
            var modifyRows = toastGrid.getModifiedRows(getRowOption);

            $.ajax({
                url: modifyBOOK00_EVMATCH_URL,
                dataType : "json",
                type: "POST",
                data: {
                     "columnData" : JSON.stringify(columnData)
                    ,"updatedRows" : JSON.stringify(modifyRows.updatedRows)
                },
                success: function(data){
                    fn_BOOK00_EVMATCH_btnEvent_search();
                },
                error: function(){
                    alert("simpleWithObject err");
                }
            });
        }

    };

	/**
     * @author Rosa, 2021-04-13
     * @method fn_BOOK00_EVMATCH_btnEvent_save2
     * @process create 'on' event to Save button
     */
    var fn_BOOK00_EVMATCH_btnEvent_save2 = function(e){

        console.log('fn_BOOK00_EVMATCH_btnEvent_save2');

    }

    /**
     * @author Rosa, 2021-04-13
     * @method fn_BOOK00_EVMATCH_btnEvent_search
     * @process create 'on' event to Search button
     */
    var fn_BOOK00_EVMATCH_btnEvent_delete = function(e){
//        toastGrid.removeCheckedRows(true); // If set to true, confirm message will be shown before remove.
        console.log('삭제버튼');
    }

	/* ********************** [END] common button event ****************** */

	/* ********************** [START] user defined function ****************** */

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_BOOK00_EVMATCH_defaultValue
	 * @process setting default Value
	 */
	var fn_BOOK00_EVMATCH_defaultValue = function(){

	}

	/**
	 * @author Rosa, 2021-06-19
	 * @method fn_BOOK00_EVMATCH_btnEvent_stInterval
	 * @process custom event
	 */
	var fn_BOOK00_EVMATCH_btnEvent_stInterval = function(){
        lotteData = toastGrid.getData();
        lotteLength = lotteData.length;
        if(!lotteRotate){
			$('#finalMsg').text('');
			lotteRotate = setInterval(function() { //실행할 스크립트
				var result = Math.floor(Math.random() * (lotteLength));
				fn_BOOK00_EVMATCH_setRoulette(result);
			}, 100);
            $('#edInterval').attr("disabled", false);
			$('#edInterval').on('click',fn_BOOK00_EVMATCH_btnEvent_edInterval);

			$('#stInterval').attr("disabled", true);
            $('#regiBtn1').attr("disabled", true);
            $('#regiBtn2').attr("disabled", true);
            $('#stInterval').off();
            $('#regiBtn1').off();
            $('#regiBtn2').off();

        }
	}

	/**
	 * @author Rosa, 2021-06-19
	 * @method fn_BOOK00_EVMATCH_btnEvent_edInterval
	 * @process custom event
	 */
	var fn_BOOK00_EVMATCH_btnEvent_edInterval = function(){
			if(lotteRotate != null){
				clearInterval(lotteRotate);
				lotteRotate = null;

                $('#edInterval').attr("disabled", true);
                $('#edInterval').off();

            	var randomCount = lotteData.length;

				var i = 0;
				var lastCnt = 5;

				lotteEnding = setInterval(function() { //실행할 스크립트
					var result = Math.floor(Math.random() * randomCount);

					fn_BOOK00_EVMATCH_setRoulette(result);
					i++;

					if(i >= lastCnt && lotteData[result].ev_use_yn == 'Y'){
						clearInterval(lotteEnding);
						lotteEnding = null;

						$('#finalMsg').text('선택 완료 !!');

						regiListToggle = true;
						i = 0;

   						$('#stInterval').attr("disabled", false);
						$('#regiBtn1').attr("disabled", false);
                        $('#regiBtn2').attr("disabled", false);

                        $('#stInterval').on('click',fn_BOOK00_EVMATCH_btnEvent_stInterval);
                        $('#regiBtn1').on('click',fn_BOOK00_EVMATCH_btnEvent_regiBtn1);
                        $('#regiBtn2').on('click',fn_BOOK00_EVMATCH_btnEvent_regiBtn2);

					}
				}, 500);
			}

	}

	/**
	 * @author Rosa, 2021-06-19
	 * @method fn_BOOK00_EVMATCH_btnEvent_regiBtn1
	 * @process custom event
	 */
	var fn_BOOK00_EVMATCH_btnEvent_regiBtn1 = function(){
		if(lotteRotate == null && lotteEnding == null && regiListToggle){
			var resultLotto = $('#result').text();
			$('#div1pList').append('<br>' + resultLotto);
			$('#regiBtn1').attr("disabled", true);
            $('#regiBtn2').attr("disabled", true);
			$('#regiBtn1').off();
            $('#regiBtn2').off();
			regiListToggle = false;
		}
	}

	/**
	 * @author Rosa, 2021-06-19
	 * @method fn_BOOK00_EVMATCH_btnEvent_regiBtn2
	 * @process custom event
	 */
	var fn_BOOK00_EVMATCH_btnEvent_regiBtn2 = function(){
		if(lotteRotate == null && lotteEnding == null && regiListToggle){
			var resultLotto = $('#result').text();
			$('#div2pList').append('<br>' + resultLotto);
			$('#regiBtn1').attr("disabled", true);
            $('#regiBtn2').attr("disabled", true);
			$('#regiBtn1').off();
            $('#regiBtn2').off();
			regiListToggle = false;
		}
	}

	/**
	 * @author Rosa, 2021-06-19
	 * @method fn_BOOK00_EVMATCH_btnEvent_regiBtn2
	 * @process custom event
	 */
	var fn_BOOK00_EVMATCH_btnEvent_regiClear = function(){

        //Interval 초기화
		if(lotteRotate){
			clearInterval(lotteRotate);
			lotteRotate = null;
		}
		if(lotteEnding){
			clearInterval(lotteEnding);
			lotteEnding = null;
		}

		//추첨 결과 초기화
		$('#result').text('결과 영역');
		$('#div1pList').text('');
		$('#div2pList').text('');
        $('#finalMsg').text('');

		// 버튼 초기화
        $('#stInterval') .off();
        $('#edInterval') .off();
        $('#regiBtn1')   .off();
        $('#regiBtn2')   .off();
        $('#clearBtn')   .off();

        $('#stInterval').attr("disabled", false);
        $('#stInterval').on('click',fn_BOOK00_EVMATCH_btnEvent_stInterval);

        $('#stInterval').attr("disabled", false);
        $('#clearBtn').on('click',fn_BOOK00_EVMATCH_btnEvent_regiClear);

        $('#edInterval').attr("disabled", true);
        $('#regiBtn1').attr("disabled", true);
        $('#regiBtn2').attr("disabled", true);

	}

	var fn_BOOK00_EVMATCH_setRoulette = function (result) {

        $('#result').text(lotteData[result].char_name);

	} //end function btnEvent

	/* ********************** [END] user defined function ****************** */

	return {
		initialize : function(param){
			commParam = param;
			console.log(commParam.variables.typeCodeList);

			fn_BOOK00_EVMATCH_ready();
			fn_BOOK00_EVMATCH_init();
		},

		fn_ready  : fn_BOOK00_EVMATCH_ready,
		fn_init   : fn_BOOK00_EVMATCH_init,
		commParam : commParam
	};
}();