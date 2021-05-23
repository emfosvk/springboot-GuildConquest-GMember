/***
* Developer : Rosa / 2021-04-11
* Screen    : COMN00_CODE Script ( JS 스크립트 템플릿. )
* History   : Created ( 2021-04-11 )
*/
var COMN00_CODE = function(){
	/* ********************** [START] variables ****************** */
	// common variables for this script
	var commParam = {};

	//ajax url
	var searchListCOMN00_CODE_URL = "/comn/api/searchComnCode.api";
	var modifyCOMN00_CODE_URL 	= "/comn/api/modifyComnCode.api";


	/* ********************** [END] variables ****************** */

    var toastGrid, toastGridCols;
    var $selBoxTypeCode, selBoxTypeCode;

	/* ********************** [START] page load ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_COMN00_CODE_ready
	 * @process page Ready (This function is called after the clear function works and page load.)
	 */
	var fn_COMN00_CODE_ready = function(){

		$('form').each(function(){

		});

	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_COMN00_CODE_button_event
	 * @process page initialize (This function is called after the clear function works and page load.)
	 */
	var fn_COMN00_CODE_init = function(){

		//init Grid
		fn_COMN00_CODE_initGrid();

		//init dropdown
        fn_COMN00_CODE_initDropdown();

		//default value setting
		fn_COMN00_CODE_defaultValue();

        // Mapping buton event
        fn_COMN00_CODE_button_event();

	}
	/* ********************** [END] page load ****************** */

	/* ********************** [START] init grid ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_COMN00_CODE_initgrid
	 * @process create Grid
	 */
	var fn_COMN00_CODE_initGrid = function(){

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
                               header : 'Type Hidden',
                               name   : 'type_code_hidden',
                               hidden : true
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
                               header : 'name',
                               name   : 'comn_code_name',
                               width  : 100,
                               editor : 'text',
                               validation : { required : true }
                             },
                             {
                               header : 'Description',
                               name   : 'comn_code_comt',
                               editor : 'text'
                             },
                             {
                               header : 'Attr 01',
                               name   : 'attr_01',
                               editor : 'text'
                             },
                             {
                               header : 'Attr 02',
                               name   : 'attr_02',
                               editor : 'text'
                             },
                             {
                               header : 'Attr 03',
                               name   : 'attr_03',
                               editor : 'text'
                             },
                             {
                               header : 'Attr 04',
                               name   : 'attr_04',
                               editor : 'text'
                             },
                             {
                               header : 'Attr 05',
                               name   : 'attr_05',
                               editor : 'text'
                             },
                             {
                               header : 'Sort Order',
                               name   : 'sort_order',
                               editor : 'text'
                             },
                             {
                               header : 'Yse Y/N',
                               name   : 'use_yn',
                               width  : 130,
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
                      data: {
                              api: {
                                 readData:   { url: searchListCOMN00_CODE_URL, method: 'GET' }
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

        toastGrid.on('editingStart', (ev) => {
          // check the value
          var colName = ev.columnName;
          var rowKey = ev.rowKey;
          var hiddenData = toastGrid.getRow(rowKey);
          if (ev.columnName == 'type_code' && null != hiddenData[colName+'_hidden']) {
            ev.stop();
          }
        });

        toastGrid.readData();

	}

    /**
     * @author Rosa, 2021-04-11
     * @method fn_COMN00_CODE_initgrid
     * @process create Grid
     */
    var fn_COMN00_CODE_initDropdown = function(){
        selBoxTypeCode = new tui.SelectBox('#frmS_paramStr1', {
                           data: [
                             {
                                data: [{label : 'Select All', value: ''}]
                             },
                             {
                               label: 'Type Code',
                               data: commParam.variables.typeCodeList
                             }
                           ],
                           autofocus: true
                         });
    }

	/* ********************** [END] init grid ****************** */

	/* ********************** [START] grid event ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_COMN00_CODE_grid_click
	 * @process on event to buttons
	 */
	var fn_COMN00_CODE_grid_click = function(){

	}

	/* ********************** [END] grid event ****************** */

	/* ********************** [START] common button event ****************** */


	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_COMN00_CODE_button_event
	 * @process on event to buttons
	 */
	// description of funtion
	var fn_COMN00_CODE_button_event = function(){
        $('#btnSearch').off();
        $('#btnClear') .off();
        $('#btnNew')   .off();
        $('#btnSave')  .off();
        $('#btnDelete').off();
        $('#btnSearch').on('click',fn_COMN00_CODE_btnEvent_search);
        $('#btnClear') .on('click',fn_COMN00_CODE_btnEvent_clear);
        $('#btnNew')   .on('click',fn_COMN00_CODE_btnEvent_new);
        $('#btnSave')  .on('click',fn_COMN00_CODE_btnEvent_save);
        $('#btnDelete').on('click',fn_COMN00_CODE_btnEvent_delete);
	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_COMN00_CODE_btnEvent_search
	 * @process create 'on' event to Search button
	 */
	var fn_COMN00_CODE_btnEvent_search = function(e){

        var searchOption = $('#frmS').formSerialize(true);
        var typeCode = selBoxTypeCode.getSelectedItem();
        searchOption.paramStr1 = typeCode.value;
        toastGrid.readData(1, searchOption, true);

	}

    /**
     * @author Rosa, 2021-04-13
     * @method fn_COMN00_CODE_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_COMN00_CODE_btnEvent_clear = function(e){
        console.log('초기화버튼');
        toastGrid.destroy();
        selBoxTypeCode.destroy();
        fn_COMN00_CODE_ready();
        fn_COMN00_CODE_init();

    }

    /**
     * @author Rosa, 2021-04-13
     * @method fn_COMN00_CODE_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_COMN00_CODE_btnEvent_new = function(e){
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
     * @method fn_COMN00_CODE_btnEvent_save
     * @process create 'on' event to Save button
     */
    var fn_COMN00_CODE_btnEvent_save = function(e){

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
                url: modifyCOMN00_CODE_URL,
                dataType : "json",
                type: "POST",
                data: {
                     "columnData" : JSON.stringify(columnData)
                    ,"createdRows" : JSON.stringify(modifyRows.createdRows)
                    ,"updatedRows" : JSON.stringify(modifyRows.updatedRows)
                    ,"deletedRows" : JSON.stringify(modifyRows.deletedRows)
                },
                success: function(data){
                    fn_COMN00_CODE_btnEvent_search();
                },
                error: function(){
                    alert("simpleWithObject err");
                }
            });
        }
    };

    /**
     * @author Rosa, 2021-04-13
     * @method fn_COMN00_CODE_btnEvent_search
     * @process create 'on' event to Search button
     */
    var fn_COMN00_CODE_btnEvent_delete = function(e){
        toastGrid.removeCheckedRows(true); // If set to true, confirm message will be shown before remove.
        console.log('삭제버튼');
    }

	/* ********************** [END] common button event ****************** */

	/* ********************** [START] user defined function ****************** */

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_COMN00_CODE_defaultValue
	 * @process setting default Value
	 */
	var fn_COMN00_CODE_defaultValue = function(){
        selBoxTypeCode.select('');
        $('input:radio[name=paramStr2]:input[value=' + 'A' + ']').attr("checked", true);
	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_COMN00_CODE_custom_function
	 * @process custom event
	 */
	var fn_COMN00_CODE_custom_function = function(){

	}

	/* ********************** [END] user defined function ****************** */

	return {
		initialize : function(param){
			commParam = param;
			console.log(commParam.variables.typeCodeList);

			fn_COMN00_CODE_ready();
			fn_COMN00_CODE_init();
		},

		fn_ready  : fn_COMN00_CODE_ready,
		fn_init   : fn_COMN00_CODE_init,
		commParam : commParam
	};
}();