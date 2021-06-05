$( ".reqbutton" ).on( "click", function(event){
    event.preventDefault();
    let objid=$(this).attr('data-rid');
   $.get($(this).attr('href'), function (data, textStatus, jqXHR) {
    if(textStatus=='success'){
        $("#success").text(data.message).show().delay(3000).fadeOut(300);
        
        $("#acceptButton"+objid).hide();
        //$(this).removeClass();
        $("#emailButton"+objid).show();
        
    }else{
        $("#error").text(data.message).show().delay(3000).fadeOut(300);
    }
});
});

$('#selectSubject').on('change', function(event){

    event.preventDefault();

    let urlId = $(this).val();


    $.get('/api/tutor/subject/'+urlId, function (data, textStatus, jqXHR) {
        if(textStatus=='success'){
            $("#success").text(data.message).show().delay(3000).fadeOut(300);
            
        }else{
            $("#error").text(data.message).show().delay(3000).fadeOut(300);
        }

    });
});