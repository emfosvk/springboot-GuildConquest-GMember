/*
 * Guild Conqust Application에서 공통적으로 사용할 커스텀 태그들을 등록한다.
 */

$.fn.formSerialize = function(bnlValid){
	var map =  this.map(function(){
		var param = {};
		var frmId = $(this).attr('id');
		if(!bnlValid)
		{
			//bnlValid = $('#'+ frmId).validate();
		}

		if(bnlValid)
		{
			$(this).find('input, textarea, select').each(function(){
				switch($(this).attr("data-type"))
				{
				case "text" :
					var value = $(this).val();
					var id = $(this).attr("id");
					if(typeof CKEDITOR != 'undefined'){
						if(CKEDITOR.instances[id]){
							value = CKEDITOR.instances[id].getData();
						}else{
							value = $(this).val();
						}
					}else{
						value = $(this).val();
					}
					param[$(this).attr("name")] = value;
					break;
				case "number" :
					var value = $(this).val();
					if(value==null) value= "";
					value = value.replace(/,/g,"");
					param[$(this).attr("name")] = value;
					value=null;
					break;
				case "radio" :
                	var name = $(this).attr('name');
                	var value = $("input[name='"+name+"']:checked").val();
                	if(value==null) value= "";
                	value = value.replace(/,/g,"");
                	param[name] = value;
                	value=null;
                	break;
				case "date" :
//					var value = $(this).val();
//					var newdate = kendo.parseDate(value, $(this).attr('data-format'));
//					if($(this).attr('data-valueFormat') && $(this).attr('data-valueFormat') != '')
//					{
//						value = kendo.toString(newdate, $(this).attr('data-valueFormat'));
//					}
//					else
//					{
//						value = kendo.toString(newdate, 'yyyyMMdd');
//					}
//					if(value==null) value= "";
//					param[$(this).attr("name")] = value;
//					value=null;
					break;
				case "hidden" :
					var value = $(this).val();
					param[$(this).attr("name")] = value;
					value=null;
					break;
				};

			});
			//param = param.substring(0,param.length -1);
//			try{
			try{
				return [param];
			}finally{
				param=null;
			}
		}
	});

	if(map){
		var returnValue = {};
		var length = map.length;
		if(length > 0){
			for(var index = 0; index < length; index++){
				 $.extend(returnValue, map[index]);
			}
		}
		return returnValue;
	}
};

$.fn.bindingForm = function(objJson,schema)
{
	try{
		return this.each(function(){
			if(objJson == null) return;
			var data = objJson;
			if(schema != '' && !schema && typeof schema != 'undefined'){
			    data = objJson[schema];
			}
			if(data.length <= 0) return;
			var frmid = $(this).attr('id');
			$(this).find("input, textarea, select").each(function(){
				switch($(this).attr("data-type"))
				{
					case "text" :
						var id = $(this).attr("id");
						if(typeof CKEDITOR != 'undefined'){
							if(CKEDITOR.instances[id]){
								CKEDITOR.instances[id].setData(data[$(this).attr("name")]);
							}else{
								$(this).val(data[$(this).attr("name")]);
							}
						}else
							$(this).val(data[$(this).attr("name")]);
						if($(this).attr("data-key") == "true")
						{
							$(this).attr("readonly",true);
							$(this).addClass("disabled");
						}
						break;
					case "radio" :
						$('#'+frmid +' input:radio[name='+$(this).attr("name")+']:input[value='+data[$(this).attr("name")]+']').prop('checked',true);
						if($(this).attr("data-key") == "true")
						{
							$(this).attr("readonly",true);
							$(this).addClass("disabled");
						}
						break;
					case "number" :
						var value = data[$(this).attr("name")];
						if(value)
						{
							value = value.toString();
							value = value.replace(/,/g,'');
						}
						$(this).setValue(value);
						if($(this).attr("data-key") == "true")
						{
							$(this).attr("readonly",true);
							$(this).addClass("disabled");
						}
						break;
					case "hidden" :
						$(this).val(data[$(this).attr("name")]);
						break;
				}
			});
			opTycd = "U";
		});
	}
	finally{
		delete objJson;
	}
};

function toastModifyValid(grid, getRowOption){
    // 그리드의 필수값 여부 체크
    var validResult = grid.validate();
    if(validResult.length > 0){
        console.log('입력 체크 로직 에러');
        console.log(validResult);
        alert("라인 무결성 체크해주세요. 확인이 필요한 라인 수 : " + validResult.length);
        return false;
    }

    // 그리드의 수정된 row Count 체크
    var modifyRows = grid.getModifiedRows(getRowOption);
    var createdCnt = (modifyRows.createdRows)? modifyRows.createdRows.length : 0;
    var deletedCnt = (modifyRows.deletedRows)? modifyRows.deletedRows.length : 0;
    var updatedCnt = (modifyRows.updatedRows)? modifyRows.updatedRows.length : 0;
    var modifyCnt = createdCnt + deletedCnt + updatedCnt

    if(modifyCnt <= 0){
        console.log(modifyRows);
        alert("수정된 내역이 없습니다.");
        return false;
    }

    return true;
}

var loadingKaselMode = ['_normal', '_eclipse']
var nowKaselMode = loadingKaselMode.length;

function loadingBarControl(enableMode){
   if(enableMode){
        //true
        nowKaselMode += 1;
        if(nowKaselMode >= loadingKaselMode.length){
            nowKaselMode = 0;
        }
        $('.loadingScreen img').removeClass('loadingImgSelected');
        var kaselmode = (loadingKaselMode[nowKaselMode])? loadingKaselMode[nowKaselMode] : '_normal';
        $('.loadingScreen #loadingKasel' + kaselmode).addClass('loadingImgSelected');
        $('#loadingScreen').css('display', 'block');
   } else {
        //false
        setTimeout(()=>  $('#loadingScreen').css('display', ''), 500);
   }
}

function cfn_openCommonModal(options){
    var defFunction = function(event){};

    var defOptions = {
          modalMode : "message"
        , title : ""
        , content : ""
        , OK : defFunction
        , Close : defFunction
    };

    $.extend( false, options, defOptions );

    var modalId = '';
    switch (options.modalMode){
        case "alert" :
            modalId = "modalCommonAlert";
            break;

        case "confirm_alert" :
            modalId = "modalCommonAlertConfirm";
            break;

        case "confirm" :
            modalId = "modalConfirm";
            break;

        case "message" :
        default :
            modalId = "modalCommon";
            break;
    }

    $('#' + modalId + ' .modal-title').html(options.title);
    $('#' + modalId + ' .modal-body').html(options.content);

    $('#' + modalId + ' .common-modal-close').on('click', options.Close);
    $('#' + modalId + ' .common-modal-ok').on('click', (e)=> {
        var custmEvResult = options.OK(e);
        if(typeof custmEvResult == "undefined" || custmEvResult){
            $('#' + modalId ).modal("hide");
        }
    });

    $('#' + modalId ).on("hidden.bs.modal", ()=> {
        $('#' + modalId + ' .common-modal-close').off();
        $('#' + modalId + ' .common-modal-ok').off();
    });

    $('#' + modalId ).modal("show");
}

function cfn_closeCommonModal(options){
    var defFunction = function(event){};

    var defOptions = {
          modalMode : "message"
    };

    $.extend( false, options, defOptions );

    switch (options.modalMode){
        case "alert" :
            modalId = "modalCommonAlert";
            break;
        case "confirm_alert" :
            modalId = "modalCommonAlertConfirm";
            break;
        case "confirm" :
            modalId = "modalConfirm";
            break;
        case "message" :
        default :
            modalId = "modalCommon";
            break;
    }

    $('#' + modalId ).modal("show");
}

function cfn_ajax(options){
    var defSuccessFunc = function(fromAjaxEvent, jsonResult, searchOption){};
    var defErrorFunc = function(xhr, status, errorThrown){};
    var defAlwaysFunc = function(xhr, status){};

    var defOptions = {
          type : "POST"
        , url : "/comn/api/searchCode.api"
        , data : {}
        , fromAjaxEvent : 'btnSearch'
        , callbackFunc : defSuccessFunc
        , errorFunc : defErrorFunc
        , alwaysFunc : defAlwaysFunc
    };

    var ajaxOptions = $.extend( true, defOptions, options );

    loadingBarControl(true);

    $.ajax({
        url: ajaxOptions.url, // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
        data: ajaxOptions.data, // HTTP 요청과 함께 서버로 보낼 데이터
        method: ajaxOptions.type, // HTTP 요청 메소드(GET, POST 등)
        dataType: "json" // 서버에서 보내줄 데이터의 타입

    }).done(function(jsonResult) {
        ajaxOptions.callbackFunc(ajaxOptions.fromAjaxEvent, jsonResult, ajaxOptions.data);
    }).fail(function(xhr, status, errorThrown) {
        ajaxOptions.errorFunc(xhr, status, errorThrown);
    }).always(function(xhr, status) {
        ajaxOptions.alwaysFunc(xhr, status);
        loadingBarControl(false);
    });

}