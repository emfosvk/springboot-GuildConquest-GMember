/*
 * Guild Conqust Application에서 공통적으로 사용할 커스텀 태그들을 등록한다.
 */

$.fn.formSerialize = function(bnlValid){
	var map =  this.map(function(){
		var param = {};
		var frmId = $(this).attr('id');
		if(!bnlValid)
		{
			bnlValid = $(this).validate();
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
					value = cfn_changeCase($(this),value);
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