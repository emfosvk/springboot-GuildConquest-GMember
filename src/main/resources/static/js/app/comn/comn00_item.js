/***
* Developer : Rosa / 2021-04-24
* Screen    : COMN00_ITEM Script ( JS 스크립트 템플릿. )
* History   : Created ( 2021-04-24 )
*/
var COMN00_ITEM = function(){
	/* ********************** [START] variables ****************** */
	// common variables for this script
	var commParam = {};

	//ajax url
	var searchListCOMN00_ITEM_URL = "/comn/api/searchItem.api";
	var modifyCOMN00_ITEM_URL 	= "/comn/api/modifyItem.api";


	/* ********************** [END] variables ****************** */

    var toastGrid, toastGridCols;
    var $selBoxTypeCode, selBoxTypeCode;

	/* ********************** [START] page load ****************** */
	/**
	 * @author Rosa, 2021-04-24
	 * @method fn_COMN00_ITEM_ready
	 * @process page Ready (This function is called after the clear function works and page load.)
	 */
	var fn_COMN00_ITEM_ready = function(){

		$('form').each(function(){

		});

	}

	/**
	 * @author Rosa, 2021-04-24
	 * @method fn_COMN00_ITEM_button_event
	 * @process page initialize (This function is called after the clear function works and page load.)
	 */
	var fn_COMN00_ITEM_init = function(){

		//init Grid
		fn_COMN00_ITEM_initGrid();

		//init dropdown
        fn_COMN00_ITEM_initDropdown();

		//default value setting
		fn_COMN00_ITEM_defaultValue();

        // Mapping buton event
        fn_COMN00_ITEM_button_event();

	}
	/* ********************** [END] page load ****************** */

	/* ********************** [START] init grid ****************** */
	/**
	 * @author Rosa, 2021-04-24
	 * @method fn_COMN00_ITEM_initgrid
	 * @process create Grid
	 */
	var fn_COMN00_ITEM_initGrid = function(){

	    toastGridCols = [
                             {
                               header : 'Item ID',
                               name   : 'item_id',
                               width  : 50,
                               align  : 'center'
                             },
                             {
                               header : '아이템명',
                               name   : 'item_name',
                               width  : 150,
                               editor : 'text',
                               validation : { required : true }
                             },
                             {
                               header : '캐릭터코드',
                               name   : 'char_id',
                               align  : 'center',
                               width  : 70,
                               editor : 'text'
                             },
                             {
                               header : '타입',
                               name   : 'item_type',
                               width  : 100,
                               align  : 'center',
                               formatter: 'listItemText',
                               editor: {
                                 type: "select",
                                 options: {
                                  listItems: commParam.variables.itemTypeList
                                 }
                               },
                               validation : { required : true }
                             },
                             {
                               header : '토벌사용여부',
                               name   : 'cq_use_yn',
                               width  : 100,
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
                               header : '아이콘파일명',
                               name   : 'icon_file',
                               width  : 100,
                               editor : 'text'
                             },
                             {
                               header : 'X',
                               name   : 'icon_x',
                               width  : 30,
                               editor : 'text',
                               align  : 'center'
                             },
                             {
                               header : 'Y',
                               name   : 'icon_y',
                               width  : 30,
                               editor : 'text',
                               align  : 'center'
                             },
                             {
                               header : '아이템 코멘트 1',
                               name   : 'item_comt',
                               whiteSpace: 'normal',
                               editor : 'text',
                               width  : 500
                             },
                             {
                               header : '아이템 코멘트 2',
                               name   : 'item_comt_02',
                               whiteSpace: 'normal',
                               editor : 'text',
                               width  : 500
                             },
                             {
                               header : '아이템 코멘트 3',
                               name   : 'item_comt_03',
                               whiteSpace: 'normal',
                               editor : 'text',
                               width  : 500
                             },
                             {
                               header : '아이템 코멘트 4',
                               name   : 'item_comt_04',
                               whiteSpace: 'normal',
                               editor : 'text',
                               width  : 500
                             }
                         ]

        toastGrid = new tui.Grid({
                      el: document.getElementById('toastGrid'), // 컨테이너 엘리먼트
                      data: {
                              api: {
                                 readData:   { url: searchListCOMN00_ITEM_URL, method: 'GET' }
                              }
                            },
                      //scrollX: false,
                      bodyHeight : 500,
                      rowHeight: 'auto',
                      showDummyRows: true,
                      rowHeaders: [{ type: "checkbox" }, { type: "rowNum" }],
                      columns: toastGridCols,
                      columnOptions: {
                        resizable: true,
                        frozenCount: 2,
                        frozenBorderWidth: 2
                      }
                    });

        tui.Grid.applyTheme('striped');

        toastGrid.on('editingStart', (ev) => {
          // check the value
//          var colName = ev.columnName;
//          var rowKey = ev.rowKey;
//          var hiddenData = toastGrid.getRow(rowKey);
//          if (ev.columnName == 'char_id' && null != hiddenData[colName+'_hidden']) {
//            ev.stop();
//          }
        });

        toastGrid.readData();

	}

    /**
     * @author Rosa, 2021-04-24
     * @method fn_COMN00_ITEM_initgrid
     * @process create Grid
     */
    var fn_COMN00_ITEM_initDropdown = function(){
        selBoxTypeCode = new tui.SelectBox('#frmS_paramStr1', {
                           data: [
                             {
                                data: [{label : 'Select All', value: ''}]
                             },
                             {
                               label: 'Item Type',
                               data: commParam.variables.itemTypeList
                             }
                           ],
                           autofocus: true
                         });
    }

	/* ********************** [END] init grid ****************** */

	/* ********************** [START] grid event ****************** */
	/**
	 * @author Rosa, 2021-04-24
	 * @method fn_COMN00_ITEM_grid_click
	 * @process on event to buttons
	 */
	var fn_COMN00_ITEM_grid_click = function(){

	}

	/* ********************** [END] grid event ****************** */

	/* ********************** [START] common button event ****************** */


	/**
	 * @author Rosa, 2021-04-24
	 * @method fn_COMN00_ITEM_button_event
	 * @process on event to buttons
	 */
	// description of funtion
	var fn_COMN00_ITEM_button_event = function(){
        $('#btnSearch').off();
        $('#btnClear') .off();
        $('#btnNew')   .off();
        $('#btnSave')  .off();
        $('#btnDelete').off();
        $('#btnSearch').on('click',fn_COMN00_ITEM_btnEvent_search);
        $('#btnClear') .on('click',fn_COMN00_ITEM_btnEvent_clear);
        $('#btnNew')   .on('click',fn_COMN00_ITEM_btnEvent_new);
        $('#btnSave')  .on('click',fn_COMN00_ITEM_btnEvent_save);
        $('#btnDelete').on('click',fn_COMN00_ITEM_btnEvent_delete);
	}

	/**
	 * @author Rosa, 2021-04-24
	 * @method fn_COMN00_ITEM_btnEvent_search
	 * @process create 'on' event to Search button
	 */
	var fn_COMN00_ITEM_btnEvent_search = function(e){

        var searchOption = $('#frmS').formSerialize(true);
        var typeCode = selBoxTypeCode.getSelectedItem();
        searchOption.paramStr1 = typeCode.value;
        toastGrid.readData(1, searchOption, true);

	}

    /**
     * @author Rosa, 2021-04-13
     * @method fn_COMN00_ITEM_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_COMN00_ITEM_btnEvent_clear = function(e){
        console.log('초기화버튼');
        toastGrid.destroy();
        selBoxTypeCode.destroy();
        fn_COMN00_ITEM_ready();
        fn_COMN00_ITEM_init();

    }

    /**
     * @author Rosa, 2021-04-13
     * @method fn_COMN00_ITEM_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_COMN00_ITEM_btnEvent_new = function(e){
        console.log('신규버튼');
        console.log(toastGrid.getRowCount());
        toastGrid.appendRow({});
    }

	/**
     * @author Rosa, 2021-04-13
     * @method fn_COMN00_ITEM_btnEvent_save
     * @process create 'on' event to Save button
     */
    var fn_COMN00_ITEM_btnEvent_save = function(e){

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
                url: modifyCOMN00_ITEM_URL,
                dataType : "json",
                type: "POST",
                data: {
                     "columnData" : JSON.stringify(columnData)
                    ,"createdRows" : JSON.stringify(modifyRows.createdRows)
                    ,"updatedRows" : JSON.stringify(modifyRows.updatedRows)
                    ,"deletedRows" : JSON.stringify(modifyRows.deletedRows)
                },
                success: function(data){
                    fn_COMN00_ITEM_btnEvent_search();
                },
                error: function(){
                    alert("simpleWithObject err");
                }
            });
        }
    };

    /**
     * @author Rosa, 2021-04-13
     * @method fn_COMN00_ITEM_btnEvent_search
     * @process create 'on' event to Search button
     */
    var fn_COMN00_ITEM_btnEvent_delete = function(e){
        toastGrid.removeCheckedRows(true); // If set to true, confirm message will be shown before remove.
        console.log('삭제버튼');
    }

	/* ********************** [END] common button event ****************** */

	/* ********************** [START] user defined function ****************** */

	/**
	 * @author Rosa, 2021-04-24
	 * @method fn_COMN00_ITEM_defaultValue
	 * @process setting default Value
	 */
	var fn_COMN00_ITEM_defaultValue = function(){
        selBoxTypeCode.select('');
        $('input:radio[name=paramStr2]:input[value=' + 'A' + ']').attr("checked", true);
	}

	/**
	 * @author Rosa, 2021-04-24
	 * @method fn_COMN00_ITEM_custom_function
	 * @process custom event
	 */
	var fn_COMN00_ITEM_custom_function = function(){

	}

	/* ********************** [END] user defined function ****************** */

	return {
		initialize : function(param){
			commParam = param;
			console.log(commParam.variables.typeCodeList);

			fn_COMN00_ITEM_ready();
			fn_COMN00_ITEM_init();
		},

		fn_ready  : fn_COMN00_ITEM_ready,
		fn_init   : fn_COMN00_ITEM_init,
		commParam : commParam
	};
}();