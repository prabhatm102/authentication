$(document).ready(function(){
    $(".alert").css("display","none");
    $("#submit").click(function(){
        // let frm = document.frm;
        // for(let i=0;i<frm.length;i++){
        //     if((frm[i].type=="text" || frm[i].type=="email") && (frm[i].value.trim().length<3)){
        //         alert(`${frm[i].name} must be greater than 3 charecters`);
        //         return false;
        //     }
        //     if(frm[i].type=="email" && (frm[i].value.indexOf('@')<3 || frm[i].value.indexOf('@')!=frm[i].value.lastIndexOf('@') || (frm[i].value.length-frm[i].value.indexOf('@')<=9) )){
        //         alert(`Please enter valid ${frm[i].name}`);
        //         return false;
        //     }
        //     if((frm[i].type=="password") && (frm[i].value.trim().length<8 || frm[i].value.trim().length>16)){
        //         alert(`${frm[i].name} must be greater than 8 or less than 16 charecters`);
        //         return false;
        //     }
        //       if(frm[i].name=="text" || frm[i].name=="email"  || frm[i].name=="password" || frm[i].name=="isAdmin" || frm[i].name=="isActive"){
                    
        //       }
        // } 

        const data = {
            name:$("#name").val(),
            email:$("#email").val(),
            password:$("#password").val()
        }
        $.ajax({
            method:"POST",
            url:"/api/users",
            data:data,
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