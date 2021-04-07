var main = {

    init : function(){
        var _this = this;
        $('#btn_save').on('click',function(){
            _this.save();
        });

        $('#btn_update').on('click',function(){
            _this.update();
        });

        $('#btn_delete').on('click',function(){
            _this.delete();
        });

    },
    save : function(){
             var data = {
                   title : $('#frmE_title').val()
                 , author : $('#frmE_author').val()
                 , content : $('#frmE_content').val()
             }

             $.ajax({
                  type : "POST"
                 ,url : '/api/v1/posts'
                 ,dataType: 'json'
                 ,contentType : 'application/json; charset=utf-8'
                 ,data: JSON.stringify(data)
             }).done(function(rtnData){
                 alert('등록 완료');
                 window.location.href = '/';
             }).fail(function(error){
                 alert('에러 발생');
                 console.log(error);
             });
         },
    update : function(){
             var data = {
                   title : $('#frmE_title').val()
                 , content : $('#frmE_content').val()
             }

             var id = $('#frmE_id').val();

             $.ajax({
                  type : "PUT"
                 ,url : '/api/v1/posts/' + id
                 ,dataType: 'json'
                 ,contentType : 'application/json; charset=utf-8'
                 ,data: JSON.stringify(data)
             }).done(function(rtnData){
                 alert('수정 완료');
                 window.location.href = '/';
             }).fail(function(error){
                 alert('에러 발생');
                 console.log(error);
             });
         },
    delete : function(){

             var id = $('#frmE_id').val();

             $.ajax({
                  type : "DELETE"
                 ,url : '/api/v1/posts/' + id
                 ,dataType: 'json'
                 ,contentType : 'application/json; charset=utf-8'
             }).done(function(rtnData){
                 alert('삭제 완료');
                 window.location.href = '/';
             }).fail(function(error){
                 alert('에러 발생');
                 console.log(error);
             });
         }



};

main.init();