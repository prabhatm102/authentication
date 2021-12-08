$(document).ready(function(){
    $("#updatePass").click(function(){
        if(document.getElementById('newPass').value!==document.getElementById('cnfPass').value){
            alert("New password and confirm password should be same"); 
            return false;
          }
            $("#updatePass").prop("disabled","true");
            $("#updatePass").val("Please Wait...");     
       
        const data = {
            newPass:$("#newPass").val(),
            cnfPass:$("#cnfPass").val(),
            authToken:location.pathname.slice(location.pathname.lastIndexOf("/")+1)
        }
        $.ajax({
            method:"PUT",
            url:location.origin+"/api/users/changepassword",
            data:data,
            success:function(msg){
               $("#updatePass").val("Password Updated");
               alert(msg);
               window.location.href = location.origin+"/signin";  
            },
            error:function(error){
                $("#updatePass").val("Update Password");
                $("#updatePass").prop("disabled",false);
                $(".alert").css("display","block");
                $("#status").html(error.status+" ");
                $("#msg").html(error.responseText);
            }
        });
    });
});