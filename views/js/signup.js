$(document).ready(function(){
    $(".alert").css("display","none");
    $("#submit").click(function(){
       if($("#file").val()==="")
        {
            alert("Please select file");
            return false;
        }    
        var form = new FormData();
          form.append("name",$("#name").val());
          form.append("email",$("#email").val());
          form.append("password",$("#password").val());
          form.append("file",document.getElementById("file").files[0]);
         
        $.ajax({
            method:"POST",
            url:"/api/users/",
            data:form,
            contentType:false,
            processData:false,
            cache:false,
            success:function(redirect){
               alert("You are successfully Registered! Login To Continue!");
               window.location.href = redirect;  
            },
            error:function(error){
                $(".alert").css("display","block");
                $("#status").html(error.status+" ");
                $("#msg").html(error.responseText);
            }

        });
    });
});