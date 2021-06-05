$( ".reqbutton" ).on( "click", function(event){
    event.preventDefault();
   $.get($(this).attr('href'), function (data, textStatus, jqXHR) {
    if(textStatus=='success'){
        $("#success").text(data.message).show().delay(3000).fadeOut(300);
        let request_id = $(this).attr("data-rid");
        $(this).hide();
        $('#emailButton'+request_id).show();
        //$(this).removeClass();
        $(this).removeAttr('href',"mailt:{{request.studentKey.user.email}}");
    }else{
        $("#error").text(data.message).show().delay(3000).fadeOut(300);
    }
});
});