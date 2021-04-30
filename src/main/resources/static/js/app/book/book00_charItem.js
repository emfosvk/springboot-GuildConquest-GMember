/***
* Developer : Rosa / 2021-04-28
* Screen    : BOOK00_CHARITEM Script ( JS 스크립트 템플릿. )
* History   : Created ( 2021-04-28 )
*/
var BOOK00_CHARITEM = function(){
	/* ********************** [START] variables ****************** */
	// common variables for this script
	var commParam = {};

	//ajax url
	var searchListBOOK00_CHARITEM_URL = "/book/api/searchCharItem.api";


	/* ********************** [END] variables ****************** */

    var toastGrid, toastGridCols;
    var $selBoxTypeCode, selBoxTypeCode;
    var rollingInfo, rollingIcon;
    var galleryTop, galleryThumbs;

	/* ********************** [START] page load ****************** */
	/**
	 * @author Rosa, 2021-04-28
	 * @method fn_BOOK00_CHARITEM_ready
	 * @process page Ready (This function is called after the clear function works and page load.)
	 */
	var fn_BOOK00_CHARITEM_ready = function(){

		$('form').each(function(){

		});

	}

	/**
	 * @author Rosa, 2021-04-28
	 * @method fn_BOOK00_CHARITEM_button_event
	 * @process page initialize (This function is called after the clear function works and page load.)
	 */
	var fn_BOOK00_CHARITEM_init = function(){

		//init Grid
		fn_BOOK00_CHARITEM_initGrid();

		//init dropdown
        fn_BOOK00_CHARITEM_initDropdown();

		//default value setting
		fn_BOOK00_CHARITEM_defaultValue();

        // Mapping buton event
        fn_BOOK00_CHARITEM_button_event();

	}
	/* ********************** [END] page load ****************** */

	/* ********************** [START] init grid ****************** */
	/**
	 * @author Rosa, 2021-04-28
	 * @method fn_BOOK00_CHARITEM_initgrid
	 * @process create Grid
	 */
	var fn_BOOK00_CHARITEM_initGrid = function(){

	}

    /**
     * @author Rosa, 2021-04-28
     * @method fn_BOOK00_CHARITEM_initgrid
     * @process create Grid
     */
    var fn_BOOK00_CHARITEM_initDropdown = function(){
        selBoxTypeCode = new tui.SelectBox('#frmS_paramStr1', {
                           data: [
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
	 * @author Rosa, 2021-04-28
	 * @method fn_BOOK00_CHARITEM_grid_click
	 * @process on event to buttons
	 */
	var fn_BOOK00_CHARITEM_grid_click = function(){

	}

	/* ********************** [END] grid event ****************** */

	/* ********************** [START] common button event ****************** */


	/**
	 * @author Rosa, 2021-04-28
	 * @method fn_BOOK00_CHARITEM_button_event
	 * @process on event to buttons
	 */
	// description of funtion
	var fn_BOOK00_CHARITEM_button_event = function(){
        $('#btnSearch').off();
        $('#btnClear') .off();
        $('#btnNew')   .off();
        $('#btnSave')  .off();
        $('#btnDelete').off();
        $('#btnSearch').on('click',fn_BOOK00_CHARITEM_btnEvent_search);
        $('#btnClear') .on('click',fn_BOOK00_CHARITEM_btnEvent_clear);
        $('#btnNew')   .on('click',fn_BOOK00_CHARITEM_btnEvent_new);
        $('#btnSave')  .on('click',fn_BOOK00_CHARITEM_btnEvent_save);
        $('#btnDelete').on('click',fn_BOOK00_CHARITEM_btnEvent_delete);
	}

	/**
	 * @author Rosa, 2021-04-28
	 * @method fn_BOOK00_CHARITEM_btnEvent_search
	 * @process create 'on' event to Search button
	 */
	var fn_BOOK00_CHARITEM_btnEvent_search = function(e){

        //var searchOption = $('#frmS').formSerialize(true);
        var typeCode = selBoxTypeCode.getSelectedItem();
        var paramStr1 = typeCode.value;
        //toastGrid.readData(1, searchOption, true);

        $.ajax({
            url: searchListBOOK00_CHARITEM_URL + '?' + 'paramStr1=' + paramStr1, // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
            data: { name: "홍길동" }, // HTTP 요청과 함께 서버로 보낼 데이터
            method: "GET", // HTTP 요청 메소드(GET, POST 등)
            dataType: "json" // 서버에서 보내줄 데이터의 타입

        }).done(function(json) {
            console.log('성공');
            console.log(json);
            fn_BOOK00_CHARITEM_createRolling(json);
        }).fail(function(xhr, status, errorThrown) {
            console.log('에러');
            console.log(xhr);
            console.log(status);
            console.log(errorThrown);

            $("#text").html("오류가 발생했다.<br>") .append("오류명: " + errorThrown + "<br>") .append("상태: " + status);

        }).always(function(xhr, status) {
            console.log('항상');
            console.log(xhr);
            console.log(status);

            console.log('s3config');
            console.log(commParam.variables.s3config);


        });

	}

    /**
     * @author Rosa, 2021-04-13
     * @method fn_BOOK00_CHARITEM_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_BOOK00_CHARITEM_btnEvent_clear = function(e){
        console.log('초기화버튼');
        selBoxTypeCode.destroy();
        fn_BOOK00_CHARITEM_ready();
        fn_BOOK00_CHARITEM_init();

    }

    /**
     * @author Rosa, 2021-04-13
     * @method fn_BOOK00_CHARITEM_btnEvent_save
     * @process create 'on' event to New button
     */
    var fn_BOOK00_CHARITEM_btnEvent_new = function(e){

    }

	/**
     * @author Rosa, 2021-04-13
     * @method fn_BOOK00_CHARITEM_btnEvent_save
     * @process create 'on' event to Save button
     */
    var fn_BOOK00_CHARITEM_btnEvent_save = function(e){

    };

    /**
     * @author Rosa, 2021-04-13
     * @method fn_BOOK00_CHARITEM_btnEvent_search
     * @process create 'on' event to Search button
     */
    var fn_BOOK00_CHARITEM_btnEvent_delete = function(e){

    }

	/* ********************** [END] common button event ****************** */

	/* ********************** [START] user defined function ****************** */

	/**
	 * @author Rosa, 2021-04-28
	 * @method fn_BOOK00_CHARITEM_defaultValue
	 * @process setting default Value
	 */
	var fn_BOOK00_CHARITEM_defaultValue = function(){
        selBoxTypeCode.select('01');
        $('input:radio[name=paramStr2]:input[value=' + 'A' + ']').attr("checked", true);
	}

	/**
	 * @author Rosa, 2021-04-28
	 * @method fn_BOOK00_CHARITEM_createRolling
	 * @process custom event
	 */
	var fn_BOOK00_CHARITEM_createRolling = function(json){
        var data = json.data;
        var htmlTextBook = ''; // 상단 표기될 도감 내용
        var htmlTextIcon = ''; // 하단 표기될 아이콘
        var s3config = commParam.variables.s3config;

        if(data.length > 0){

            $.each(data, function (index, map) {

                htmlTextBook =  htmlTextBook
                             + "<div class='swiper-slide' id='charInfoDiv"+index+"'> "
                                 + "<table class='infoTable table table-striped'>"

                                    + "<colgroup>"
                                        + "<col style='width:131px';>"
                                        + "<col style='width:60px';>"
                                        + "<col style='width:120px';>"
                                        + "<col style='width:500px'>"
                                    + "<tbody>"
                                        + "<tr>" // Unique Weapon Row
                                            + "<td rowspan='6' class='charPortTD'>"
                                                + "<div class='chatPortImgDiv' "  // Portrait Image
                                                + " style='background:url(" +s3config.cp_s3_path + map.port_file + ") "
                                                + ( (parseInt(map.port_x) - 1) * parseInt(s3config.cp_width) - 1) * -1 + "px "
                                                + ( (parseInt(map.port_y) - 1) * parseInt(s3config.cp_height) + 1 + parseInt(s3config.cp_padding_top)) * -1 + "px;"
                                                +        "width:"  + parseInt(s3config.cp_width)  + "px;"
                                                +        "height:" + parseInt(s3config.cp_height) + "px;"
                                                +        "display: inline-block;"
                                                +        "';"
                                                + ">"
                                                + "</div>"
                                                + "<br/>"
                                                + "<br/>"
                                                + "<span class='charInfoCharName'>"+ map.char_name +"</span>"
                                                + "<br/>"
                                                + "<span class='charInfoClass"+ map.class +"'>" + map.class_name + "</span>"
                                                + "<br/>"
                                                + "<span class='charInfoAtkType"+map.atk_type+"'>" + map.atk_type_name + "</span>"
                                            + "</td>"
                                            + "<td class='ItemIconTD'>" // Item Name + Icon
                                                + "<div class='chatPortImgDiv' "// Unique Weapon Image
                                                + " style='background:url(" +s3config.uw_s3_path + map.uw_file + ") "
                                                + ( (parseInt(map.uw_x) - 1) * parseInt(s3config.uw_width) - 1) * -1 + "px "
                                                + ( (parseInt(map.uw_y) - 1) * parseInt(s3config.uw_height) + 1 + parseInt(s3config.uw_padding_top)) * -1 + "px;"
                                                +        "width:"  + parseInt(s3config.uw_width)  + "px;"
                                                +        "height:" + parseInt(s3config.uw_height) + "px;"
                                                +        "display: inline-block;"
                                                +        "';"
                                                + ">"
                                            + "</td>"
                                            + "<td>" // Item Name
                                                + map.uw_name
                                            + "</td>"
                                            + "<td>" // Item Comt
                                                + map.uw_comt
                                            + "</td>"
                                        + "</tr>"

                                        + "<tr>" // Soul Weapon Row
                                            + "<td class='ItemIconTD'>" // Item Name + Icon
                                                + "<div class='chatPortImgDiv' "// Soul Weapon Image
                                                + " style='background:url(" +s3config.sw_s3_path + map.sw_file + ") "
                                                + ( (parseInt(map.sw_x) - 1) * parseInt(s3config.sw_width) - 1) * -1 + "px "
                                                + ( (parseInt(map.sw_y) - 1) * parseInt(s3config.sw_height) + 1 + parseInt(s3config.sw_padding_top)) * -1 + "px;"
                                                +        "width:"  + parseInt(s3config.sw_width)  + "px;"
                                                +        "height:" + parseInt(s3config.sw_height) + "px;"
                                                +        "display: inline-block;"
                                                +        "';"
                                                + ">"
                                                + "</div>"
                                            + "</td>"
                                            + "<td>" // Item Name
                                                + map.sw_name
                                            + "</td>"
                                            + "<td>" // Item Comt
                                                + map.sw_comt
                                            + "</td>"
                                        + "</tr>"

                                        + "<tr>" // Unique treasure 1 Row
                                            + "<td class='ItemIconTD'>" // Item Name + Icon
                                                + "<div class='chatPortImgDiv' "// Unique Treasure 1rd Skil Image
                                                + " style='background:url(" +s3config.ut_s3_path + map.ut1_file + ") "
                                                + ( (parseInt(map.ut1_x) - 1) * parseInt(s3config.ut_width) - 1) * -1 + "px "
                                                + ( (parseInt(map.ut1_y) - 1) * parseInt(s3config.ut_height) + 1 + parseInt(s3config.ut_padding_top)) * -1 + "px;"
                                                +        "width:"  + parseInt(s3config.ut_width)  + "px;"
                                                +        "height:" + parseInt(s3config.ut_height) + "px;"
                                                +        "display: inline-block;"
                                                +        "';"
                                                + ">"
                                                + "</div>"
                                            + "</td>"
                                            + "<td>" // Item Name
                                                + map.ut1_name
                                            + "</td>"
                                            + "<td>" // Item Comt
                                                + map.ut1_comt
                                            + "</td>"
                                        + "</tr>"

                                        + "<tr>" // Unique treasure 2 Row
                                            + "<td class='ItemIconTD'>" // Item Name + Icon
                                                + "<div class='chatPortImgDiv' "// Unique Treasure 2rd Skil Image
                                                + " style='background:url(" +s3config.ut_s3_path + map.ut2_file + ") "
                                                + ( (parseInt(map.ut2_x) - 1) * parseInt(s3config.ut_width) - 1) * -1 + "px "
                                                + ( (parseInt(map.ut2_y) - 1) * parseInt(s3config.ut_height) + 1 + parseInt(s3config.ut_padding_top)) * -1 + "px;"
                                                +        "width:"  + parseInt(s3config.ut_width)  + "px;"
                                                +        "height:" + parseInt(s3config.ut_height) + "px;"
                                                +        "display: inline-block;"
                                                +        "';"
                                                + ">"
                                                + "</div>"
                                            + "</td>"
                                            + "<td>" // Item Name
                                                + map.ut2_name
                                            + "</td>"
                                            + "<td>" // Item Comt
                                                + map.ut2_comt
                                            + "</td>"
                                        + "</tr>"

                                        + "<tr>" // Unique treasure 3 Row
                                            + "<td class='ItemIconTD'>" // Item Name + Icon
                                                + "<div class='chatPortImgDiv' "// Unique Treasure 3rd Skil Image
                                                + " style='background:url(" +s3config.ut_s3_path + map.ut3_file + ") "
                                                + ( (parseInt(map.ut3_x) - 1) * parseInt(s3config.ut_width) - 1) * -1 + "px "
                                                + ( (parseInt(map.ut3_y) - 1) * parseInt(s3config.ut_height) + 1 + parseInt(s3config.ut_padding_top)) * -1 + "px;"
                                                +        "width:"  + parseInt(s3config.ut_width)  + "px;"
                                                +        "height:" + parseInt(s3config.ut_height) + "px;"
                                                +        "display: inline-block;"
                                                +        "';"
                                                + ">"
                                                + "</div>"
                                            + "</td>"
                                            + "<td>" // Item Name
                                                + map.ut3_name
                                            + "</td>"
                                            + "<td>" // Item Comt
                                                + map.ut3_comt
                                            + "</td>"
                                        + "</tr>"

                                        + "<tr>" // Unique treasure 4 Row
                                            + "<td class='ItemIconTD'>" // Item Name + Icon
                                                + "<div class='chatPortImgDiv' "// Unique Treasure 4th Skil Image
                                                + " style='background:url(" +s3config.ut_s3_path + map.ut4_file + ") "
                                                + ( (parseInt(map.ut4_x) - 1) * parseInt(s3config.ut_width) - 1) * -1 + "px "
                                                + ( (parseInt(map.ut4_y) - 1) * parseInt(s3config.ut_height) + 1 + parseInt(s3config.ut_padding_top)) * -1 + "px;"
                                                +        "width:"  + parseInt(s3config.ut_width)  + "px;"
                                                +        "height:" + parseInt(s3config.ut_height) + "px;"
                                                +        "display: inline-block;"
                                                +        "';"
                                                + ">"
                                                + "</div>"
                                            + "</td>"
                                            + "<td>" // Item Name
                                                + map.ut4_name
                                            + "</td>"
                                            + "<td>" // Item Comt
                                                + map.ut4_comt
                                            + "</td>"
                                        + "</tr>"

                                    + "</tbody>"
                                 + "</table>"
                             + "</div>";

                htmlTextIcon =  htmlTextIcon
                             + "<div class='swiper-slide'> "
                                 + "<div class='thumbImgDiv' "
                                 + " style='background:url(" +s3config.ci_s3_path + map.icon_file + ") "
                                 + ( (parseInt(map.icon_x) - 1) * parseInt(s3config.ci_width) - 1) * -1 + "px "
                                 + ( (parseInt(map.icon_y) - 1) * parseInt(s3config.ci_height) + 1 + parseInt(s3config.ci_padding_top)) * -1 + "px;"
                                 +        "'"
                                 + ">"
                                 + "</div>"
                             + "</div>";
            });

            if(galleryThumbs){
                galleryThumbs.destroy();
            }
            if(galleryTop){
                galleryTop.destroy();
            }

            $('#galleryTopDiv').html(htmlTextBook);
            $('#galleryThumbsDiv').html(htmlTextIcon);

            galleryThumbs = new Swiper('.gallery-thumbs', {
                  spaceBetween: 10,
                  loop : true,
                  slidesPerView: 'auto',
                  freeMode: true,
                  loopedSlides: 6, //looped slides should be the same
                  watchSlidesVisibility: true,
                  watchSlidesProgress: true,
                });
            galleryTop = new Swiper('.gallery-top', {
                  spaceBetween: 10,
                  loop : true,
                  loopedSlides: 6, //looped slides should be the same
                  navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  },
                  thumbs: {
                    swiper: galleryThumbs,
                  },
                });

        }



	}

	/* ********************** [END] user defined function ****************** */

	return {
		initialize : function(param){
			commParam = param;

			fn_BOOK00_CHARITEM_ready();
			fn_BOOK00_CHARITEM_init();
		},

		fn_ready  : fn_BOOK00_CHARITEM_ready,
		fn_init   : fn_BOOK00_CHARITEM_init,
		commParam : commParam
	};
}();