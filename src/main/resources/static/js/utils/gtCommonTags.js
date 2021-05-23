/*
 * Guild Conquest Application 에서 공통적으로 사용할 커스텀 UI 태그들을 등록한다.
 */

$.fn.gtAjaxAutoComplete = function(options){

    if(this.length > 0){
        var defFunction = function(event, ui){};

        var defOptions = {
              type : 'POST'
            , url : "/comn/api/searchCode.api"
            , data : {}
            , codeCol : "value"
            , nameCol : "label"
            , minLength : 2
            , selectEvent : defFunction
        };
        
        
        var ajaxOptions = $.extend( true, defOptions, options );

        $( "#" + this[0].id ).on("change", (e) => {
            console.log('gtAjaxAutoComplete change Event!!');
            $( "#" + this[0].id ).val('');
            $( "#" + this[0].id + '_code' ).val('');
        });

        $( "#" + this[0].id ).autocomplete({
            source : function( request, response ) {
                ajaxOptions.data.autoCompleteOption = request.term;
                $.ajax({
                    type: ajaxOptions.type,
                    url: ajaxOptions.url,
                    dataType: "json",
                    data: ajaxOptions.data,
                    success: function(rtnData) {
                        if(rtnData.result){
                            //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                            response(
                                $.map(rtnData.data.contents, function(item) {
                                    return {
                                        label: item[ajaxOptions.nameCol],
                                        value: item[ajaxOptions.nameCol],
                                        code : item[ajaxOptions.codeCol]
                                    }
                                })
                            );
                        }
                    }

                });
            },
            //조회를 위한 최소글자수
            minLength: ajaxOptions.minLength,
            select: function(e, ui) {
                console.log('gtAjaxAutoComplete select Event!!');
                var _id = '#' + this.id;
                $('#' + this.id ).blur();
                setTimeout(function(){
                    $(_id).val(ui.item.label);
                    $(_id + '_code' ).val(ui.item.code);
                    }, 250);
            }
        });
    } else {
        console.log('gtAjaxAutoComplete Fail !! : this.length < 0 ');
    }

};