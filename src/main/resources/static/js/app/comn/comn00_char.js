/***
* Developer : Rosa / 2021-04-24
* Screen    : COMN00_CHAR Script ( JS 스크립트 템플릿. )
* History   : Created ( 2021-04-24 )
*/
var COMN00_CHAR = function(){
	/* ********************** [START] variables ****************** */
	// common variables for this script
	var commParam = {};

	//ajax url
	var searchListCOMN00_CHAR_URL = "/comn/api/searchChar.api";
	var modifyCOMN00_CHAR_URL 	= "/comn/api/modifyChar.api";


	/* ********************** [END] variables ****************** */

    var toastGrid, toastGridCols;
    var $selBoxTypeCode, selBoxTypeCode;

	/* ********************** [START] page load ****************** */
	/**
	 * @author Rosa, 2021-04-24
	 * @method fn_COMN00_CHAR_ready
	 * @process page Ready (This function is called after the clear function works and page load.)
	 */
	var fn_COMN00_CHAR_ready = function(){

		$('form').each(function(){

		});

	}

	/**
	 * @author Rosa, 2021-04-24
	 * @method fn_COMN00_CHAR_button_event
	 * @process page initialize (This function is called after the clear function works and page load.)
	 */
	var fn_COMN00_CHAR_init = function(){

		//init Grid
		fn_COMN00_CHAR_initGrid();

		//init dropdown
        fn_COMN00_CHAR_initDropdown();

		//default value setting
		fn_COMN00_CHAR_defaultValue();

        // Mapping buton event
        fn_COMN00_CHAR_button_event();

	}
	/* ********************** [END] page load ****************** */

	/* ********************** [START] init grid ****************** */
	/**
	 * @author Rosa, 2021-04-24
	 * @method fn_COMN00_CHAR_initgrid
	 * @process create Grid
	 */
	var fn_COMN00_CHAR_initGrid = function(){

	    toastGridCols = [
                             {
                               header : 'Char ID',
                               name   : 'char_id',
                               width  : 50,
                               align  : 'center',
                               editor : 'text',
                               validation : { required : true }
                             },
                             {
                               header : 'char ID Hidden',
                               name   : 'char_id_hidden',
                               hidden : true
                             },
                             {
                               header : '캐릭터명',
                               name   : 'char_name',
                               width  : 100,
                               editor : 'text',
                               validation : { required : true }
                             },
                             {
                               header : '타이틀',
                               name   : 'char_nickname',
                               width  : 150,
                               editor : 'text'
                             },
                             {
                               header : '클래스',
                               name   : 'class',
                               width  : 100,
                               formatter: 'listItemText',
                               editor: {
                                 type: "select",
                                 options: {
                                  listItems: commParam.variables.classList
                                 }
                               },
                               validation : { required : true }
                             },
                             {
                               header : '공격속성',
                               name   : 'atk_type',
                               width  : 100,
                               formatter: 'listItemText',
                               editor: {
                                 type: "select",
                                 options: {
                                  listItems: commParam.variables.atkTypeList
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
                               header : '캐릭터 코멘트',
                               name   : 'char_comt',
                               width  : 250,
                               editor : 'text'
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
                               align  : 'center',
                               editor : 'text'
                             },
                             {
                               header : 'Y',
                               name   : 'icon_y',
                               width  : 30,
                               align  : 'center',
                               editor : 'text'
                             },
                             {
                               header : '초상화파일명',
                               name   : 'port_file',
                               width  : 100,
                               editor : 'text'
                             },
                             {
                               header : 'X',
                               name   : 'port_x',
                               width  : 30,
                               align  : 'center',
                               editor : 'text'
                             },
                             {
                               header : 'Y',
                               name   : 'port_y',
                               width  : 30,
                               align  : 'center',
                               editor : 'text'
                             }
                         ]

        toastGrid = new tui.Grid({
                      el: document.getElementById('toastGrid'), // 컨테이너 엘리먼트
                      data: {
                              api: {
                                 readData:   { url: searchListCOMN00_CHAR_URL, method: 'GET' }
                              }
                            },
                      //scrollX: false,
                      bodyHeight : 500,
                      rowHeaders: ['rowNum', 'checkbox'],
                      columns: toastGridCols,
                      showDummyRows: true,
                      columnOptions: {
                        resizable: true,
                        frozenCount: 2,
                        frozenBorderWidth: 2
                      }
                    });

        tui.Grid.applyTheme('striped');

        toastGrid.on('editingStart', (ev) => {
          // check the value
          var colName = ev.columnName;
          var rowKey = ev.rowKey;
          var hiddenData = toastGrid.getRow(rowKey);
          if (ev.columnName == 'char_id' && null != hiddenData[colName+'_hidden']) {
            ev.stop();
          }
        });

        toastGrid.readData();

	}

    /**
     * @author Rosa, 2021-04-24
     * @method fn_COMN00_CHAR_initgrid
     * @process create Grid
     */
    var fn_COMN00_CHAR_initDropdown = function(){
        selBoxTypeCode = new tui.SelectBox('#frmS_paramStr1', {
                           data: [
                             {
                                data: [{label : 'Select All', value: ''}]
                             },
                             {
                               label: 'Class',
                               data: commParam.variables.classList
                             }
                           ],
                           autofocus: true
                         });
    }

	/* ********************** [END] init grid ****************** */

	/* ********************** [START] grid event ****************** */
	/**
	 * @author Rosa, 2021-04-24
	 * @method fn_COMN00_CHAR_grid_click
	 * @process on event to buttons
	 */
	var fn_COMN00_CHAR_grid_click = function(){

	}

	/* ********************** [END] grid event ****************** */

	/* ********************** [START] common button event ****************** */


	/**
	 * @author Rosa, 2021-04-24
	 * @method fn_COMN00_CHAR_button_event
	 * @process on event to buttons
	 */
	// description of funtion
	var fn_COMN00_CHAR_button_event = function(){
        $('#btnSearch').off();
        $('#btnClear') .off();
        $('#btnNew')   .off();
        $('#btnSave')  .off();
        $('#btnDelete').off();
        $('#btnSearch').on('click',fn_COMN00_CHAR_btnEvent_search);
        $('#btnClear') .on('click',fn_COMN00_CHAR_btnEvent_clear);
        $('#btnNew')   .on('click',fn_COMN00_CHAR_btnEvent_new);
        $('#btnSave')  .on('click',fn_COMN00_CHAR_btnEvent_save);
        $('#btnDelete').on('click',fn_COMN00_CHAR_btnEvent_delete);
	}

	/**
	 * @author Rosa, 2021-04-24
	 * @method fn_COMN00_CHAR_btnEvent_search
	 * @process create 'on' event to Search button
	 */
	var fn_COMN00_CHAR_btnEvent_search = function(e){

        var searchOption = $('#frmS').formSerialize(true);
        var typeCode = selBoxTypeCode.getSelectedItem();
        searchOption.paramStr1 = typeCode.value;
        toastGrid.readData(1, searchOption, true);

	}

    /**
     * @author Rosa, 2021-04-13
     * @method fn_COMN00_CHAR_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_COMN00_CHAR_btnEvent_clear = function(e){
        console.log('초기화버튼');
        toastGrid.destroy();
        selBoxTypeCode.destroy();
        fn_COMN00_CHAR_ready();
        fn_COMN00_CHAR_init();

    }

    /**
     * @author Rosa, 2021-04-13
     * @method fn_COMN00_CHAR_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_COMN00_CHAR_btnEvent_new = function(e){
        console.log('신규버튼');
        console.log(toastGrid.getRowCount());
        toastGrid.appendRow({});
    }

	/**
     * @author Rosa, 2021-04-13
     * @method fn_COMN00_CHAR_btnEvent_save
     * @process create 'on' event to Save button
     */
    var fn_COMN00_CHAR_btnEvent_save = function(e){

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
                url: modifyCOMN00_CHAR_URL,
                dataType : "json",
                type: "POST",
                data: {
                     "columnData" : JSON.stringify(columnData)
                    ,"createdRows" : JSON.stringify(modifyRows.createdRows)
                    ,"updatedRows" : JSON.stringify(modifyRows.updatedRows)
                    ,"deletedRows" : JSON.stringify(modifyRows.deletedRows)
                },
                success: function(data){
                    fn_COMN00_CHAR_btnEvent_search();
                },
                error: function(){
                    alert("simpleWithObject err");
                }
            });
        }
    };

    /**
     * @author Rosa, 2021-04-13
     * @method fn_COMN00_CHAR_btnEvent_search
     * @process create 'on' event to Search button
     */
    var fn_COMN00_CHAR_btnEvent_delete = function(e){
        toastGrid.removeCheckedRows(true); // If set to true, confirm message will be shown before remove.
        console.log('삭제버튼');
    }

	/* ********************** [END] common button event ****************** */

	/* ********************** [START] user defined function ****************** */

	/**
	 * @author Rosa, 2021-04-24
	 * @method fn_COMN00_CHAR_defaultValue
	 * @process setting default Value
	 */
	var fn_COMN00_CHAR_defaultValue = function(){
        selBoxTypeCode.select('');
        $('input:radio[name=paramStr2]:input[value=' + 'A' + ']').attr("checked", true);
	}

	/**
	 * @author Rosa, 2021-04-24
	 * @method fn_COMN00_CHAR_custom_function
	 * @process custom event
	 */
	var fn_COMN00_CHAR_custom_function = function(){

	}

	/* ********************** [END] user defined function ****************** */

	return {
		initialize : function(param){
			commParam = param;
			console.log(commParam.variables.typeCodeList);

			fn_COMN00_CHAR_ready();
			fn_COMN00_CHAR_init();
		},

		fn_ready  : fn_COMN00_CHAR_ready,
		fn_init   : fn_COMN00_CHAR_init,
		commParam : commParam
	};
}();