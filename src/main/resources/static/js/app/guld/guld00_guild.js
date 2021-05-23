/***
* Developer : Rosa / 2021-05-03
* Screen    : GULD00_GUILD Script ( JS 스크립트 템플릿. )
* History   : Created ( 2021-05-03 )
*/
var GULD00_GUILD = function(){
	/* ********************** [START] variables ****************** */
	// common variables for this script
	var commParam = {};

	//ajax url
	var searchListGULD00_GUILD_URL = "/guld/openapi/searchGuild.api";
	var modifyGULD00_GUILD_URL 	   = "/guld/api/modifyGuild.api";


	/* ********************** [END] variables ****************** */

    var toastGrid, toastGridCols;
    var $selBoxTypeCode, selBoxTypeCode;

	/* ********************** [START] page load ****************** */
	/**
	 * @author Rosa, 2021-05-03
	 * @method fn_GULD00_GUILD_ready
	 * @process page Ready (This function is called after the clear function works and page load.)
	 */
	var fn_GULD00_GUILD_ready = function(){

		$('form').each(function(){

		});

	}

	/**
	 * @author Rosa, 2021-05-03
	 * @method fn_GULD00_GUILD_button_event
	 * @process page initialize (This function is called after the clear function works and page load.)
	 */
	var fn_GULD00_GUILD_init = function(){

		//init Grid
		fn_GULD00_GUILD_initGrid();

		//init dropdown
        fn_GULD00_GUILD_initDropdown();

		//default value setting
		fn_GULD00_GUILD_defaultValue();

        // Mapping buton event
        fn_GULD00_GUILD_button_event();

	}
	/* ********************** [END] page load ****************** */

	/* ********************** [START] init grid ****************** */
	/**
	 * @author Rosa, 2021-05-03
	 * @method fn_GULD00_GUILD_initgrid
	 * @process create Grid
	 */
	var fn_GULD00_GUILD_initGrid = function(){

	    toastGridCols = [
                             {
                               header : 'Guild ID',
                               name   : 'guild_id',
                               width  : 100,
                               align  : 'center',
                             },
                             {
                               header : '길드명',
                               name   : 'guild_name',
                               width  : 200,
                               editor : 'text',
                               validation : { required : true }
                             },
                             {
                               header : '길드사용여부',
                               name   : 'use_yn',
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
                             }
                         ]

        toastGrid = new tui.Grid({
                      el: document.getElementById('toastGrid'), // 컨테이너 엘리먼트
                      data: {
                              api: {
                                 readData:   { url: searchListGULD00_GUILD_URL, method: 'GET' }
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

        toastGrid.on('beforeRequest', (ev) => {
            $('#loadingScreen').css('display', 'block');
        });

        toastGrid.on('response', (ev) => {
            // 성공/실패와 관계 없이 응답을 받았을 경우
            setTimeout(()=>  $('#loadingScreen').css('display', ''), 1000);
        });

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
     * @author Rosa, 2021-05-03
     * @method fn_GULD00_GUILD_initgrid
     * @process create Grid
     */
    var fn_GULD00_GUILD_initDropdown = function(){
//        selBoxTypeCode = new tui.SelectBox('#frmS_paramStr1', {
//                           data: [
//                             {
//                                data: [{label : 'Select All', value: ''}]
//                             },
//                             {
//                               label: 'Class',
//                               data: commParam.variables.classList
//                             }
//                           ],
//                           autofocus: true
//                         });
    }

	/* ********************** [END] init grid ****************** */

	/* ********************** [START] grid event ****************** */
	/**
	 * @author Rosa, 2021-05-03
	 * @method fn_GULD00_GUILD_grid_click
	 * @process on event to buttons
	 */
	var fn_GULD00_GUILD_grid_click = function(){

	}

	/* ********************** [END] grid event ****************** */

	/* ********************** [START] common button event ****************** */


	/**
	 * @author Rosa, 2021-05-03
	 * @method fn_GULD00_GUILD_button_event
	 * @process on event to buttons
	 */
	// description of funtion
	var fn_GULD00_GUILD_button_event = function(){
        $('#btnSearch').off();
        $('#btnClear') .off();
        $('#btnNew')   .off();
        $('#btnSave')  .off();
        $('#btnDelete').off();
        $('#btnSearch').on('click',fn_GULD00_GUILD_btnEvent_search);
        $('#btnClear') .on('click',fn_GULD00_GUILD_btnEvent_clear);
        $('#btnNew')   .on('click',fn_GULD00_GUILD_btnEvent_new);
        $('#btnSave')  .on('click',fn_GULD00_GUILD_btnEvent_save);
        $('#btnDelete').on('click',fn_GULD00_GUILD_btnEvent_delete);
	}

	/**
	 * @author Rosa, 2021-05-03
	 * @method fn_GULD00_GUILD_btnEvent_search
	 * @process create 'on' event to Search button
	 */
	var fn_GULD00_GUILD_btnEvent_search = function(e){

        var searchOption = $('#frmS').formSerialize(true);
//        var typeCode = selBoxTypeCode.getSelectedItem();
//        searchOption.paramStr1 = typeCode.value;
        toastGrid.readData(1, searchOption, true);

	}

    /**
     * @author Rosa, 2021-04-13
     * @method fn_GULD00_GUILD_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_GULD00_GUILD_btnEvent_clear = function(e){
        console.log('초기화버튼');
        toastGrid.destroy();
        fn_GULD00_GUILD_ready();
        fn_GULD00_GUILD_init();

    }

    /**
     * @author Rosa, 2021-04-13
     * @method fn_GULD00_GUILD_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_GULD00_GUILD_btnEvent_new = function(e){
        console.log('신규버튼');
        console.log(toastGrid.getRowCount());
        toastGrid.appendRow({});
    }

	/**
     * @author Rosa, 2021-04-13
     * @method fn_GULD00_GUILD_btnEvent_save
     * @process create 'on' event to Save button
     */
    var fn_GULD00_GUILD_btnEvent_save = function(e){

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
                url: modifyGULD00_GUILD_URL,
                dataType : "json",
                type: "POST",
                data: {
                     "columnData" : JSON.stringify(columnData)
                    ,"createdRows" : JSON.stringify(modifyRows.createdRows)
                    ,"updatedRows" : JSON.stringify(modifyRows.updatedRows)
                    ,"deletedRows" : JSON.stringify(modifyRows.deletedRows)
                },
                success: function(data){
                    fn_GULD00_GUILD_btnEvent_search();
                },
                error: function(){
                    alert("simpleWithObject err");
                }
            });
        }
    };

    /**
     * @author Rosa, 2021-04-13
     * @method fn_GULD00_GUILD_btnEvent_search
     * @process create 'on' event to Search button
     */
    var fn_GULD00_GUILD_btnEvent_delete = function(e){
        toastGrid.removeCheckedRows(true); // If set to true, confirm message will be shown before remove.
        console.log('삭제버튼');
    }

	/* ********************** [END] common button event ****************** */

	/* ********************** [START] user defined function ****************** */

	/**
	 * @author Rosa, 2021-05-03
	 * @method fn_GULD00_GUILD_defaultValue
	 * @process setting default Value
	 */
	var fn_GULD00_GUILD_defaultValue = function(){
//        selBoxTypeCode.select('');
//        $('input:radio[name=paramStr2]:input[value=' + 'A' + ']').attr("checked", true);
	}

	/**
	 * @author Rosa, 2021-05-03
	 * @method fn_GULD00_GUILD_custom_function
	 * @process custom event
	 */
	var fn_GULD00_GUILD_custom_function = function(){

	}

	/* ********************** [END] user defined function ****************** */

	return {
		initialize : function(param){
			commParam = param;
			console.log(commParam.variables.typeCodeList);

			fn_GULD00_GUILD_ready();
			fn_GULD00_GUILD_init();
		},

		fn_ready  : fn_GULD00_GUILD_ready,
		fn_init   : fn_GULD00_GUILD_init,
		commParam : commParam
	};
}();