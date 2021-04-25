/***
* Developer : Rosa / 2021-04-11
* Screen    : COMN00_CLASS Script ( JS 스크립트 템플릿. )
* History   : Created ( 2021-04-11 )
*/
var COMN00_CLASS = function(){
	/* ********************** [START] variables ****************** */
	// common variables for this script
	var commParam = {};

	//ajax url
	var searchListCOMN00_CLASS_URL = "/comn/api/searchClass.api";
	var modifyCOMN00_CLASS_URL 	= "/comn/api/modifyClass.api";


	/* ********************** [END] variables ****************** */

    var toastGrid, toastGridCols;

	/* ********************** [START] page load ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_COMN00_CLASS_ready
	 * @process page Ready (This function is called after the clear function works and page load.)
	 */
	var fn_COMN00_CLASS_ready = function(){

		$('form').each(function(){

		});

	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_COMN00_CLASS_button_event
	 * @process page initialize (This function is called after the clear function works and page load.)
	 */
	var fn_COMN00_CLASS_init = function(){

		//init Grid
		fn_COMN00_CLASS_initgrid();

		//default value setting
		fn_COMN00_CLASS_defaultValue();

        // Mapping buton event
        fn_COMN00_CLASS_button_event();

	}
	/* ********************** [END] page load ****************** */

	/* ********************** [START] init grid ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_COMN00_CLASS_initgrid
	 * @process create Grid
	 */
	var fn_COMN00_CLASS_initgrid = function(){

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


	/* ********************** [END] init grid ****************** */

	/* ********************** [START] grid event ****************** */
	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_COMN00_CLASS_grid_click
	 * @process on event to buttons
	 */
	var fn_COMN00_CLASS_grid_click = function(){

	}

	/* ********************** [END] grid event ****************** */

	/* ********************** [START] common button event ****************** */


	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_COMN00_CLASS_button_event
	 * @process on event to buttons
	 */
	// description of funtion
	var fn_COMN00_CLASS_button_event = function(){
        $('#btnSearch').off();
        $('#btnClear') .off();
        $('#btnNew')   .off();
        $('#btnSave')  .off();
        $('#btnDelete').off();
        $('#btnSearch').on('click',fn_COMN00_CLASS_btnEvent_search);
        $('#btnClear') .on('click',fn_COMN00_CLASS_btnEvent_clear);
        $('#btnNew')   .on('click',fn_COMN00_CLASS_btnEvent_new);
        $('#btnSave')  .on('click',fn_COMN00_CLASS_btnEvent_save);
        $('#btnDelete').on('click',fn_COMN00_CLASS_btnEvent_delete);
	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_COMN00_CLASS_btnEvent_search
	 * @process create 'on' event to Search button
	 */
	var fn_COMN00_CLASS_btnEvent_search = function(e){

        var searchOption = $('#frmS').formSerialize(true);

        toastGrid.readData(1, searchOption, true);

	}

    /**
     * @author Rosa, 2021-04-13
     * @method fn_COMN00_CLASS_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_COMN00_CLASS_btnEvent_clear = function(e){
        console.log('초기화버튼');
        toastGrid.destroy();
        fn_COMN00_CLASS_ready();
        fn_COMN00_CLASS_init();

    }

    /**
     * @author Rosa, 2021-04-13
     * @method fn_COMN00_CLASS_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_COMN00_CLASS_btnEvent_new = function(e){
        console.log('신규버튼');
        toastGrid.appendRow({});
    }

	/**
     * @author Rosa, 2021-04-13
     * @method fn_COMN00_CLASS_btnEvent_save
     * @process create 'on' event to Save button
     */
    var fn_COMN00_CLASS_btnEvent_save = function(e){

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
                url: modifyCOMN00_CLASS_URL,
                dataType : "json",
                type: "POST",
                data: {
                     "columnData" : JSON.stringify(columnData)
                    ,"createdRows" : JSON.stringify(modifyRows.createdRows)
                    ,"updatedRows" : JSON.stringify(modifyRows.updatedRows)
                    ,"deletedRows" : JSON.stringify(modifyRows.deletedRows)
                },
                success: function(data){
                    fn_COMN00_CLASS_btnEvent_search();
                },
                error: function(){
                    alert("simpleWithObject err");
                }
            });
        }
    };

    /**
     * @author Rosa, 2021-04-13
     * @method fn_COMN00_CLASS_btnEvent_search
     * @process create 'on' event to Search button
     */
    var fn_COMN00_CLASS_btnEvent_delete = function(e){
        toastGrid.removeCheckedRows(true); // If set to true, confirm message will be shown before remove.
        console.log('삭제버튼');
    }

	/* ********************** [END] common button event ****************** */

	/* ********************** [START] user defined function ****************** */

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_COMN00_CLASS_defaultValue
	 * @process setting default Value
	 */
	var fn_COMN00_CLASS_defaultValue = function(){

	}

	/**
	 * @author Rosa, 2021-04-11
	 * @method fn_COMN00_CLASS_custom_function
	 * @process custom event
	 */
	var fn_COMN00_CLASS_custom_function = function(){

	}

	/* ********************** [END] user defined function ****************** */

	return {
		initialize : function(param){
			commParam = param;

			fn_COMN00_CLASS_ready();
			fn_COMN00_CLASS_init();
		},

		fn_ready  : fn_COMN00_CLASS_ready,
		fn_init   : fn_COMN00_CLASS_init,
		commParam : commParam
	};
}();