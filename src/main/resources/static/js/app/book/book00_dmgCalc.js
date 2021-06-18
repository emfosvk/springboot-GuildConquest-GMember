/***
* Developer : Rosa / 2021-04-11
* Screen    : BOOK00_DMGCALC Script ( JS 스크립트 템플릿. )
* History   : Created ( 2021-04-11 )
*/
var BOOK00_DMGCALC = function(){
	/* ********************** [START] variables ****************** */
	// common variables for this script
	var commParam = {};

	//ajax url
	var searchListBOOK00_DMGCALC_URL = "/comn/api/searchComnCode.api";
	var modifyBOOK00_DMGCALC_URL 	= "/comn/api/modifyComnCode.api";


	/* ********************** [END] variables ****************** */

    var toastGrid, toastGridCols;
    var $selBoxTypeCode, selBoxTypeCode;

	/* ********************** [START] page load ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_BOOK00_DMGCALC_ready
	 * @process page Ready (This function is called after the clear function works and page load.)
	 */
	var fn_BOOK00_DMGCALC_ready = function(){

		$('form').each(function(){

		});

	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_BOOK00_DMGCALC_button_event
	 * @process page initialize (This function is called after the clear function works and page load.)
	 */
	var fn_BOOK00_DMGCALC_init = function(){

		//init Grid
		fn_BOOK00_DMGCALC_initGrid();

		//init dropdown
        fn_BOOK00_DMGCALC_initDropdown();

		//default value setting
		fn_BOOK00_DMGCALC_defaultValue();

        // Mapping buton event
        fn_BOOK00_DMGCALC_button_event();

	}
	/* ********************** [END] page load ****************** */

	/* ********************** [START] init grid ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_BOOK00_DMGCALC_initgrid
	 * @process create Grid
	 */
	var fn_BOOK00_DMGCALC_initGrid = function(){

	    toastGridCols = [
                             {
                               header : 'Type',
                               name   : 'type_code',
                               width  : 130,
                               formatter: 'listItemText',
                               editor: {
                                 type: "select",
                                 options: {
                                  listItems: commParam.variables.typeCodeList
                                 }
                               },
                               validation : { required : true }
                             },
                             {
                               header : 'Code',
                               name   : 'comn_code',
                               width  : 50,
                               align  : 'center',
                               editor : 'text',
                               validation : { required : true }
                             },
                             {
                               header : '적용 Y/N',
                               name   : 'use_yn',
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
                             }
                         ]

        toastGrid = new tui.Grid({
                      el: document.getElementById('toastGrid'), // 컨테이너 엘리먼트

                      //scrollX: false,
                      bodyHeight : 250,
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
     * @method fn_BOOK00_DMGCALC_initgrid
     * @process create Grid
     */
    var fn_BOOK00_DMGCALC_initDropdown = function(){
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
	 * @method fn_BOOK00_DMGCALC_grid_click
	 * @process on event to buttons
	 */
	var fn_BOOK00_DMGCALC_grid_click = function(){

	}

	/* ********************** [END] grid event ****************** */

	/* ********************** [START] common button event ****************** */


	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_BOOK00_DMGCALC_button_event
	 * @process on event to buttons
	 */
	// description of funtion
	var fn_BOOK00_DMGCALC_button_event = function(){
        $('#btnSearch').off();
        $('#btnClear') .off();
        $('#btnNew')   .off();
        $('#btnSave')  .off();
        $('#btnDelete').off();
        $('#btnSearch').on('click',fn_BOOK00_DMGCALC_btnEvent_search);
        $('#btnClear') .on('click',fn_BOOK00_DMGCALC_btnEvent_clear);
        $('#btnNew')   .on('click',fn_BOOK00_DMGCALC_btnEvent_new);
        $('#btnSave')  .on('click',fn_BOOK00_DMGCALC_btnEvent_save);
        $('#btnSave2') .on('click',fn_BOOK00_DMGCALC_btnEvent_save2);
        $('#btnDelete').on('click',fn_BOOK00_DMGCALC_btnEvent_delete);
	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_BOOK00_DMGCALC_btnEvent_search
	 * @process create 'on' event to Search button
	 */
	var fn_BOOK00_DMGCALC_btnEvent_search = function(e){

        var searchOption = $('#frmS').formSerialize(true);
        var typeCode = selBoxTypeCode.getSelectedItem();
        searchOption.paramStr1 = typeCode.value;
        toastGrid.readData(1, searchOption, true);

	}

    /**
     * @author Rosa, 2021-04-13
     * @method fn_BOOK00_DMGCALC_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_BOOK00_DMGCALC_btnEvent_clear = function(e){
        console.log('초기화버튼');
        toastGrid.destroy();
        selBoxTypeCode.destroy();
        fn_BOOK00_DMGCALC_ready();
        fn_BOOK00_DMGCALC_init();

    }

    /**
     * @author Rosa, 2021-04-13
     * @method fn_BOOK00_DMGCALC_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_BOOK00_DMGCALC_btnEvent_new = function(e){
        console.log('신규버튼');
        console.log(toastGrid.getRowCount());
        var typeCodeSelItem = selBoxTypeCode.getSelectedItem();
        var typeCode = (typeCodeSelItem) ? typeCodeSelItem.value : '';
        toastGrid.appendRow({
            "type_code" : typeCode
            , "use_yn" : 'Y'
        });
    }

	/**
     * @author Rosa, 2021-04-13
     * @method fn_BOOK00_DMGCALC_btnEvent_save
     * @process create 'on' event to Save button
     */
    var fn_BOOK00_DMGCALC_btnEvent_save = function(e){

        console.log('fn_BOOK00_DMGCALC_btnEvent_save');

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
//                url: modifyBOOK00_DMGCALC_URL,
//                dataType : "json",
//                type: "POST",
//                data: {
//                     "columnData" : JSON.stringify(columnData)
//                    ,"createdRows" : JSON.stringify(modifyRows.createdRows)
//                    ,"updatedRows" : JSON.stringify(modifyRows.updatedRows)
//                    ,"deletedRows" : JSON.stringify(modifyRows.deletedRows)
//                },
//                success: function(data){
//                    fn_BOOK00_DMGCALC_btnEvent_search();
//                },
//                error: function(){
//                    alert("simpleWithObject err");
//                }
//            });
//        }

    };

	/**
     * @author Rosa, 2021-04-13
     * @method fn_BOOK00_DMGCALC_btnEvent_save2
     * @process create 'on' event to Save button
     */
    var fn_BOOK00_DMGCALC_btnEvent_save2 = function(e){

        console.log('fn_BOOK00_DMGCALC_btnEvent_save2');

    }

    /**
     * @author Rosa, 2021-04-13
     * @method fn_BOOK00_DMGCALC_btnEvent_search
     * @process create 'on' event to Search button
     */
    var fn_BOOK00_DMGCALC_btnEvent_delete = function(e){
//        toastGrid.removeCheckedRows(true); // If set to true, confirm message will be shown before remove.
        console.log('삭제버튼');
    }

	/* ********************** [END] common button event ****************** */

	/* ********************** [START] user defined function ****************** */

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_BOOK00_DMGCALC_defaultValue
	 * @process setting default Value
	 */
	var fn_BOOK00_DMGCALC_defaultValue = function(){
//        selBoxTypeCode.select('');
//        $('input:radio[name=paramStr2]:input[value=' + 'A' + ']').attr("checked", true);
	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_BOOK00_DMGCALC_custom_function
	 * @process custom event
	 */
	var fn_BOOK00_DMGCALC_custom_function = function(){

	}

	/* ********************** [END] user defined function ****************** */

	return {
		initialize : function(param){
			commParam = param;
			console.log(commParam.variables.typeCodeList);

			fn_BOOK00_DMGCALC_ready();
			fn_BOOK00_DMGCALC_init();
		},

		fn_ready  : fn_BOOK00_DMGCALC_ready,
		fn_init   : fn_BOOK00_DMGCALC_init,
		commParam : commParam
	};
}();