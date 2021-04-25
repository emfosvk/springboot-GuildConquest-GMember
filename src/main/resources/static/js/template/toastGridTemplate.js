/***
* Developer : Rosa / 2021-04-11
* Screen    : TOAST_GRID_TEMPLATE_JS Script ( JS 스크립트 템플릿. )
* History   : Created ( 2021-04-11 )
*/
var TOAST_GRID_TEMPLATE_JS = function(){
	/* ********************** [START] variables ****************** */
	// common variables for this script
	var commParam = {};

	//ajax url
	var searchListTOAST_GRID_TEMPLATE_JSURL = "/comn/api/searchClass.api";
	var modifyTOAST_GRID_TEMPLATE_JSURL 	= "/comn/api/modifyClass.api";


	/* ********************** [END] variables ****************** */

    var toastGrid, toastGridCols;

	/* ********************** [START] page load ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_TOAST_GRID_TEMPLATE_JS_ready
	 * @process page Ready (This function is called after the clear function works and page load.)
	 */
	var fn_TOAST_GRID_TEMPLATE_JS_ready = function(){

		$('form').each(function(){

		});

	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_TOAST_GRID_TEMPLATE_JS_button_event
	 * @process page initialize (This function is called after the clear function works and page load.)
	 */
	var fn_TOAST_GRID_TEMPLATE_JS_init = function(){

		//init Grid
		fn_TOAST_GRID_TEMPLATE_JS_initgrid();

		//default value setting
		fn_TOAST_GRID_TEMPLATE_JS_defaultValue();

        // Mapping buton event
        fn_TOAST_GRID_TEMPLATE_JS_button_event();

	}
	/* ********************** [END] page load ****************** */

	/* ********************** [START] init grid ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_TOAST_GRID_TEMPLATE_JS_initgrid
	 * @process create Grid
	 */
	var fn_TOAST_GRID_TEMPLATE_JS_initgrid = function(){

	    toastGridCols = [
                             {
                               header : 'Code',
                               name   : 'type_code',
                               width  : 150,
                               editor : 'text',
                               validation :
                                    {
                                        required : true,
                                        unique   : true,
                                        validatorFn: (value, row, columnName) => {
                                          // cannot use as below, because the grid instance is not created on calling `validatorFn`
                                          // grid.getValue(row.rowKey, columnName);
                                          // return value !== 11000
                                          if(value == '' || value == null){
                                            return false;
                                          }else if (value.length > 10){
                                            return false;
                                          }
                                          return true;
                                        }
                                    }
                             },
                             {
                               header : 'Code',
                               name   : 'type_code_hidden',
                               hidden : true
                             },
                             {
                               header : 'Name',
                               name   : 'type_code_name',
                               width  : 200,
                               editor : 'text'
                             },
                             {
                               header : 'Description',
                               name   : 'type_code_comt',
                               editor : 'text'
                             }
                         ]

        toastGrid = new tui.Grid({
                      el: document.getElementById('toastGrid'), // 컨테이너 엘리먼트
                      data: {
                              api: {
                                 readData:   { url: '/comn/api/searchClass.api', method: 'GET' }
                              }
                            },
                      scrollX: false,
                      bodyHeight : 500,
                      rowHeaders: ['rowNum', 'checkbox'],
                      columns: toastGridCols,
                      showDummyRows: true,
                      columnOptions: {
                        resizable: true
                      }
                    });

        tui.Grid.applyTheme('striped');

        toastGrid.on('check', ev => {
          console.log('check!', ev);
        });

        toastGrid.on('uncheck', ev => {
          console.log('uncheck!', ev);
        });

        toastGrid.on('focusChange', ev => {
          console.log('change focused cell!', ev);
          console.log(toastGrid.getRow(ev.rowKey));
        });

        toastGrid.on('editingStart', (ev) => {
          // prevent Key column Modify
          var colName = ev.columnName;
          var rowKey = ev.rowKey;
          var hiddenData = toastGrid.getRow(rowKey);
          if (ev.columnName == 'type_code' && null != hiddenData[colName+'_hidden']) {
            ev.stop();
          }
        });


	}


	/* ********************** [END] init grid ****************** */

	/* ********************** [START] grid event ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_TOAST_GRID_TEMPLATE_JS_grid_click
	 * @process on event to buttons
	 */
	var fn_TOAST_GRID_TEMPLATE_JS_grid_click = function(){

	}

	/* ********************** [END] grid event ****************** */

	/* ********************** [START] common button event ****************** */


	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_TOAST_GRID_TEMPLATE_JS_button_event
	 * @process on event to buttons
	 */
	// description of funtion
	var fn_TOAST_GRID_TEMPLATE_JS_button_event = function(){
        $('#btnSearch').off();
        $('#btnClear') .off();
        $('#btnNew')   .off();
        $('#btnSave')  .off();
        $('#btnDelete').off();
        $('#btnSearch').on('click',fn_TOAST_GRID_TEMPLATE_JS_btnEvent_search);
        $('#btnClear') .on('click',fn_TOAST_GRID_TEMPLATE_JS_btnEvent_clear);
        $('#btnNew')   .on('click',fn_TOAST_GRID_TEMPLATE_JS_btnEvent_new);
        $('#btnSave')  .on('click',fn_TOAST_GRID_TEMPLATE_JS_btnEvent_save);
        $('#btnDelete').on('click',fn_TOAST_GRID_TEMPLATE_JS_btnEvent_delete);
	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_TOAST_GRID_TEMPLATE_JS_btnEvent_search
	 * @process create 'on' event to Search button
	 */
	var fn_TOAST_GRID_TEMPLATE_JS_btnEvent_search = function(e){

        var searchOption = $('#frmS').formSerialize(true);

        toastGrid.appendRow({});

	}

    /**
     * @author Rosa, 2021-04-13
     * @method fn_TOAST_GRID_TEMPLATE_JS_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_TOAST_GRID_TEMPLATE_JS_btnEvent_clear = function(e){
        console.log('초기화버튼');
        toastGrid.destroy();
        fn_TOAST_GRID_TEMPLATE_JS_ready();
        fn_TOAST_GRID_TEMPLATE_JS_init();

    }

    /**
     * @author Rosa, 2021-04-13
     * @method fn_TOAST_GRID_TEMPLATE_JS_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_TOAST_GRID_TEMPLATE_JS_btnEvent_new = function(e){
        console.log('신규버튼');
        toastGrid.appendRow({});
    }

	/**
     * @author Rosa, 2021-04-13
     * @method fn_TOAST_GRID_TEMPLATE_JS_btnEvent_save
     * @process create 'on' event to Save button
     */
    var fn_TOAST_GRID_TEMPLATE_JS_btnEvent_save = function(e){

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
                url: modifyTOAST_GRID_TEMPLATE_JSURL,
                dataType : "json",
                type: "POST",
                data: {
                     "columnData" : JSON.stringify(columnData)
                    ,"createdRows" : JSON.stringify(modifyRows.createdRows)
                    ,"updatedRows" : JSON.stringify(modifyRows.updatedRows)
                    ,"deletedRows" : JSON.stringify(modifyRows.deletedRows)
                },
                success: function(data){
                    fn_TOAST_GRID_TEMPLATE_JS_btnEvent_search();
                },
                error: function(){
                    alert("simpleWithObject err");
                }
            });
        }
    };

    /**
     * @author Rosa, 2021-04-13
     * @method fn_TOAST_GRID_TEMPLATE_JS_btnEvent_search
     * @process create 'on' event to Search button
     */
    var fn_TOAST_GRID_TEMPLATE_JS_btnEvent_delete = function(e){
        toastGrid.removeCheckedRows(true); // If set to true, confirm message will be shown before remove.
        console.log('삭제버튼');
    }

	/* ********************** [END] common button event ****************** */

	/* ********************** [START] user defined function ****************** */

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_TOAST_GRID_TEMPLATE_JS_defaultValue
	 * @process setting default Value
	 */
	var fn_TOAST_GRID_TEMPLATE_JS_defaultValue = function(){

	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_TOAST_GRID_TEMPLATE_JS_custom_function
	 * @process custom event
	 */
	var fn_TOAST_GRID_TEMPLATE_JS_custom_function = function(){

	}

	/* ********************** [END] user defined function ****************** */

	return {
		initialize : function(param){
			commParam = param;

			fn_TOAST_GRID_TEMPLATE_JS_ready();
			fn_TOAST_GRID_TEMPLATE_JS_init();
		},

		fn_ready  : fn_TOAST_GRID_TEMPLATE_JS_ready,
		fn_init   : fn_TOAST_GRID_TEMPLATE_JS_init,
		commParam : commParam
	};
}();