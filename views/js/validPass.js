function validPass(){
    if(document.getElementById('newPass').value!==document.getElementById('cnfPass').value){
      alert("New password and confirm password should be same");
      
        return false;
    }
      

}