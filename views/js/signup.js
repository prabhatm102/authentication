const axios  = require("axios");

function addUser(frm){
    axios.post('http://localhost:3000/api/users',{name:frm.name,email:frm.email,password:frm.password})
      .then(res=>console.log(res))
      .then(ex=>console.log(ex.message));
    return false;
}