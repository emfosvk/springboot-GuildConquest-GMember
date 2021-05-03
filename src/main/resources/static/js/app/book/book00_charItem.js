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

    var selBoxTypeCode;
    var galleryTop, galleryThumbs, galleryetcEtcItem;

    let pos = { top: 0, left: 0, x: 0, y: 0 };
    var elementEtcItemSection, etcItemDiv;
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
                               label: 'Charater',
                               data: commParam.variables.classList
                             },
                             {
                               label: 'Etc Item',
                               data: [
                                {label : '유물', value: 'AF'}
                                ]
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

        var searchOption = $('#frmS').formSerialize(true);
        var typeCode = selBoxTypeCode.getSelectedItem();
        searchOption.paramStr1 = typeCode.value;

        $.ajax({
            url: searchListBOOK00_CHARITEM_URL, // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
            data: searchOption, // HTTP 요청과 함께 서버로 보낼 데이터
            method: "POST", // HTTP 요청 메소드(GET, POST 등)
            dataType: "json" // 서버에서 보내줄 데이터의 타입

        }).done(function(jsonResult) {
            console.log('성공');
            console.log(jsonResult);
            fn_BOOK00_CHARITEM_ajaxCallback('btnSearch', jsonResult, searchOption);

        }).fail(function(xhr, status, errorThrown) {
            console.log('에러');
            console.log(xhr);
            console.log(status);
            console.log(errorThrown);

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

    var fn_BOOK00_CHARITEM_ajaxCallback = function(fromAjaxEvent, jsonResult, searchOption){
        if(jsonResult != null){
            switch(fromAjaxEvent){
                case 'btnSearch' :
                    if (searchOption.paramStr1){
                        switch(searchOption.paramStr1){
                            case 'AF' :
                                $('#charItemSection').addClass('itemSection_display_none');
                                $('#etcItemSection').removeClass('itemSection_display_none');
                                fn_BOOK00_CHARITEM_etcItemSection(jsonResult, searchOption.paramStr1);
                            break;
                            default :
                                $('#etcItemSection').addClass('itemSection_display_none');
                                $('#charItemSection').removeClass('itemSection_display_none');
                                fn_BOOK00_CHARITEM_charItemSection(jsonResult, searchOption.paramStr1);

                        }
                    }
                break;

                default :

            }
        }
    }

    /**
     * @author Rosa, 2021-05-01
     * @method fn_BOOK00_CHARITEM_etcItemSection
     * @process custom event
     */
    var fn_BOOK00_CHARITEM_etcItemSection = function(jsonResult, equipType){
        var data = jsonResult.data;
        var htmlTextBook = ''; // 우측 표기될 도감 내용
        var htmlTextIcon = ''; // 좌측 표기될 아이콘
        var s3config = commParam.variables.s3config;

        var s3_path = '';
        var s3_padding_top = '';
        var s3_width = '';
        var s3_height = '';
        var borderLinePx = 3;
        var borderLineColor = '#CECEF6';

        switch(equipType){
            case 'AF':
                s3_path = s3config.af_s3_path;
                s3_padding_top = s3config.af_padding_top;
                s3_width = s3config.af_width;
                s3_height = s3config.af_height;
            break;
            default:
                s3_path = s3config.af_s3_path;
                s3_padding_top = s3config.af_padding_top;
                s3_width = s3config.af_width;
                s3_height = s3config.af_height;
            break;
        }


        if(data.length > 0){

            $.each(data, function (index, map) {

                htmlTextIcon =  htmlTextIcon
                                 + "<div "
                                 + "id='" + "etcItemIcon"+ index + "' "
                                 + "data-order-num='" +  index + "' "
                                 + "class='thumbImgDiv etcItemIcon' "
                                 + " style='background:url(" + s3_path + map.icon_file + ") "
                                 + ( (parseInt(map.icon_x) - 1) * parseInt(s3_width) ) * -1 + "px "
                                 + ( (parseInt(map.icon_y) - 1) * parseInt(s3_height) + parseInt(s3_padding_top)) * -1 + "px;"
                                 + "'"
                                 + ">"
                                 + "</div>";

                htmlTextBook =  htmlTextBook
                             + "<div class='swiper-slide' id='charInfoDiv"+index+"'> "
                                + "<table class='etcItemComtTable'>"
                                    + "<colgroup>"
                                        + "<col style='width:144px; '>"
                                        + "<col style='width:calc(100% - 150px); '>"
                                    + "</colgroup>"
                                    + "<tbody>"
                                        + "<tr class ='etcItemComtTr"
                                        + ((index % 2 == 1)? "Odd" : "Even") // Unique Weapon Row
                                        + "'>"
                                            + "<td class='etcItemComtCol1'>"
                                                + "<div "
                                                + "id='" + "etcItemComtIcon"+ (index + 1) + "' "
                                                + "class='thumbImgDiv etcItemComtIcon' "
                                                + " style='background:url(" + s3_path + map.icon_file + ") "
                                                + ( (parseInt(map.icon_x) - 1) * parseInt(s3_width) ) * -1 + "px "
                                                + ( (parseInt(map.icon_y) - 1) * parseInt(s3_height) + parseInt(s3_padding_top)) * -1 + "px;"
                                                + "'"
                                                + ">"
                                                + "</div>"
                                                + "<br>"
                                                + "<span class='etcItemComtCol1-ItemName'>" + map.item_name + "</span>"
                                            +"</td>"
                                            + "<td class='etcItemComtCol3'>"+ map.item_comt +"</td>"
                                        + "</tr>"
                                    + "</tbody>"
                                + "</table>"
                             + "</div>"

            });

            if(galleryetcEtcItem){
                galleryetcEtcItem.destroy();
            }

            $('#galleryEtcItemDiv').html(htmlTextBook);
            $('#etcItemIconSection').html(htmlTextIcon);

            $('.etcItemIcon').css({
                  "width":  (parseInt(s3_width) + borderLinePx * 2 - 2) + "px"
                , "height": (parseInt(s3_height) + borderLinePx * 2 - 2) + "px"
                , "border": borderLinePx + "px " + "solid " + borderLineColor
            });

            $('.etcItemComtIcon').css({
                  "width":  s3_width + "px"
                , "height": s3_height + "px"
            });

            galleryetcEtcItem = new Swiper(".gallery-etcItem", {
                  direction: "vertical",
                  slidesPerView: 4,
                  freeMode: true,
                  mousewheel: true
            });

            elementEtcItemSection = document.getElementById('etcItemIconSection');
            etcItemDiv = document.getElementsByClassName('etcItemIcon');

            // Attach the handler
            elementEtcItemSection.addEventListener('mousedown', fn_BOOK00_CHARITEM_mouseDownHandler);
            for (let i=0; i<etcItemDiv.length; i++){
                etcItemDiv[i].addEventListener('click', fn_BOOK00_CHARITEM_ectItemClickEvent);
            }

            galleryetcEtcItem.on('activeIndexChange', fn_BOOK00_CHARITEM_ectItemComtChangeEvent);

        }
    }

	/**
	 * @author Rosa, 2021-04-28
	 * @method fn_BOOK00_CHARITEM_createCharItemSection
	 * @process custom event
	 */
	var fn_BOOK00_CHARITEM_charItemSection = function(jsonResult, equipType){
        var data = jsonResult.data;
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
                                        + "<tr>"
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
                                                + "<span class='charInfoCharNickName'>"+ map.char_nickname +"</span>"
                                                + "<br/>"
                                                + "<span class='charInfoCharName'>"+ map.char_name +"</span>"
                                                + "<br/>"
                                                + "<span class='charInfoClass charInfoClass"+ map.class +"'>" + map.class_name + "</span>"
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
                                            + "<td class='itemNameTd'>" // Item Name
                                                + map.uw_name
                                            + "</td>"
                                            + "<td class='itemComtTd'>" // Item Comt
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
                                            + "<td class='itemNameTd'>" // Item Name
                                                + map.sw_name
                                            + "</td>"
                                            + "<td>" // Item Comt
                                                +"<table class='swTable'>"
                                                +	"<colgroup>"
                                                +       "<col width='100'>"
                                                +       "<col>"
                                                +   "</colgroup>"
                                                +	"<tbody>"
                                                +		"<tr >"
                                                +			"<td class='swTableTD1' style='border-top: 2px solid rgb(0, 0, 0);'>" + "발동 조건" + "</td>"
                                                +			"<td class='swTableTD2' style='border-top: 2px solid rgb(0, 0, 0);'>"  + map.sw_comt + "</td>"
                                                +		"</tr>"
                                                +		"<tr>"
                                                +			"<td class='swTableTD1'>" + "고유 스킬" + "</td>"
                                                +			"<td class='swTableTD2'>" + map.sw_comt_02 + "</td>"
                                                +		"</tr>"
                                                +		"<tr>"
                                                +			"<td class='swTableTD1'>" + "승급 1단계" + "</td>"
                                                +			"<td class='swTableTD2'>" + map.sw_comt_03 + "</td>"
                                                +		"</tr>"
                                                +		"<tr>"
                                                +			"<td class='swTableTD1' style='border-bottom: 2px solid rgb(0, 0, 0);'>" + "승급 2단계" + "</td>"
                                                +			"<td class='swTableTD2' style='border-bottom: 2px solid rgb(0, 0, 0);'>" + map.sw_comt_04 + "</td>"
                                                +		"</tr>"
                                                +	"</tbody>"
                                                +"</table>"
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
                                            + "<td class='itemNameTd'>" // Item Name
                                                + map.ut1_name
                                            + "</td>"
                                            + "<td class='itemComtTd'>" // Item Comt
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
                                            + "<td class='itemNameTd'>" // Item Name
                                                + map.ut2_name
                                            + "</td>"
                                            + "<td class='itemComtTd'>" // Item Comt
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
                                            + "<td class='itemNameTd'>" // Item Name
                                                + map.ut3_name
                                            + "</td>"
                                            + "<td class='itemComtTd'>" // Item Comt
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
                                            + "<td class='itemNameTd'>" // Item Name
                                                + map.ut4_name
                                            + "</td>"
                                            + "<td class='itemComtTd'>" // Item Comt
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

    var fn_BOOK00_CHARITEM_mouseDownHandler = function(e) {

        elementEtcItemSection.style.cursor = 'grabbing';
        elementEtcItemSection.style.userSelect = 'none';

        pos = {
            left: elementEtcItemSection.scrollLeft,
            top: elementEtcItemSection.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };

        document.addEventListener('mousemove', fn_BOOK00_CHARITEM_mouseMoveHandler);
        document.addEventListener('mouseup', fn_BOOK00_CHARITEM_mouseUpHandler);
    };

    var fn_BOOK00_CHARITEM_mouseMoveHandler = function(e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        elementEtcItemSection.scrollTop = pos.top - dy;
        elementEtcItemSection.scrollLeft = pos.left - dx;
    };

    var fn_BOOK00_CHARITEM_mouseUpHandler = function() {
        elementEtcItemSection.style.cursor = 'grab';
        elementEtcItemSection.style.removeProperty('user-select');

        document.removeEventListener('mousemove', fn_BOOK00_CHARITEM_mouseMoveHandler);
        document.removeEventListener('mouseup', fn_BOOK00_CHARITEM_mouseUpHandler);
    };

    var fn_BOOK00_CHARITEM_ectItemClickEvent = function(e){
    	var id = e.toElement.id;
    	var selIconDiv = $('#'+id);
        var selNum = selIconDiv.data('order-num');

    	$('.etcItemIcon').removeClass('etcItemIcon-active');
    	selIconDiv.addClass('etcItemIcon-active');

        galleryetcEtcItem.slideTo(selNum, 1000, false);

    };

    var fn_BOOK00_CHARITEM_ectItemComtChangeEvent = function(e){

        var comnGalIndex = galleryetcEtcItem.activeIndex;
        $('.etcItemIcon').removeClass('etcItemIcon-active');
        $('.etcItemIcon[data-order-num='+comnGalIndex+']').addClass('etcItemIcon-active');

        var iconY = $('.etcItemIcon[data-order-num='+comnGalIndex+']').offset().top;
        var iconHeight = $('.etcItemIcon[data-order-num='+comnGalIndex+']').height();
        var iconBorderTop = parseInt($('.etcItemIcon[data-order-num='+'1'+']').css('border-top-width').split('px')[0]);
        var iconBorderBottom = parseInt($('.etcItemIcon[data-order-num='+'1'+']').css('border-bottom-width').split('px')[0]);
        var iconTotalHeight = iconHeight + iconBorderTop + iconBorderBottom;

        var sectionY = $('#etcItemIconSection').offset().top;
        var sectionHeight = $('#etcItemIconSection').height();

        var relativeY = iconY - sectionY;
        var MaxbottomY = sectionHeight - iconTotalHeight;
        var nowScrollPosition = $('#etcItemIconSection').scrollTop();

        if(relativeY < 0){
            $('#etcItemIconSection').stop().animate({scrollTop:nowScrollPosition + relativeY, duration:100});
        } else if (relativeY > MaxbottomY){
            $('#etcItemIconSection').stop().animate({scrollTop:nowScrollPosition + relativeY - MaxbottomY, duration:100});
        }

    };

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