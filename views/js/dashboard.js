$(document).ready(function(){
    $(".alert").css("display","none");  
    $("#submit").click(function(){
        
        const data = {
            name:$("#name").val(),
            email:$("#email").val(),
            password:$("#password").val(),
            isActive:$("#isActive").prop("checked")
        }
    
       let url = location.origin+"/api/users/"+location.pathname.slice(location.pathname.lastIndexOf("/")+1)
        $.ajax({
            method:"PUT",
            url:url,
            data:data,
            success:function(redirect){
              location.href = redirect;  
            },
            error:function(error){
                $(".alert").css("display","block");
                $("#status").html(error.status+" ");
                $("#msg").html(error.responseText);
            }

        }); 
    });

    $("#logout").click(function(){
        $.ajax({
            method:"PUT",
            url:$("#logoutFrm").prop("action"),
            success:function(redirect){
              location.href = redirect;  
            },
            error:function(error){
                $(".alert").css("display","block");
                $("#status").html(error.status+" ");
                $("#msg").html(error.responseText);
            }

        });
    });
});    


function edit(ob){
    window.location.href = window.origin+"/editprofile/"+ob.id;
}


function deleteUser(ob){
    if(confirm("Are you sure to delete account permanently?")){
        $.ajax({
            method:"DELETE",
            url:"../../../api/users/"+ob.id,
            success:function(redirect){
               alert("Account Deleted Successfully!")
               window.location.href = redirect;  
            },
            error:function(error){
                $(".alert").css("display","block");
                $("#status").html(error.status+" ");
                $("#msg").html(error.responseText);
            }

        });
    }else{
        return false;
    }
}


