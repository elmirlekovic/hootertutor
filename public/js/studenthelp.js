$( ".reqbutton" ).on( "click", function(event){
    event.preventDefault();
   $.get($(this).attr('href'), function (data, textStatus, jqXHR) {
    if(textStatus=='success'){
        $("#success").text(data.message).show().delay(3000).fadeOut(300);
    }else{
        $("#error").text(data.message).show().delay(3000).fadeOut(300);
    }
});
});