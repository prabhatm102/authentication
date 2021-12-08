$(document).ready(function(){
    if(document.cookie.indexOf("verify")>-1){
      location.href=location.origin+"/signin";
    }

    $(".alert").css("display","none");
    $("#sendMail").click(function(){
        $("#sendMail").prop("disabled","true");
        $("#sendMail").val("Sending...");      
        const data = {
            email:$("#email").val(),
        }
        $.ajax({
            method:"POST",
            url:location.origin+"/api/users/sendmail",
            data:data,
            success:function(msg){
               $("#sendMail").val("Mail Sent");
               alert(msg);
               window.location.href = window.location.origin+"/signin";  
            },
            error:function(error){
                $("#sendMail").prop("disabled",false);
                $("#sendMail").val("Send Email");                
                $(".alert").css("display","block");
                $("#status").html(error.status+" ");
                $("#msg").html(error.responseText);
            }
        });
    });
});