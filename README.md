# authentication
  For Development--->
      
      1. First clone project or download zip(then extract)--->
     
      2. Open terminal and go to project directory and run following commands from terminal--->
      
      3. npm i     (To get modules)
     
      4. Set config variables(from terminal using following commands)
             > export auth_jwtPrivateKey="yourSecretKey"
             > export auth_db="mongodb://localhost/authdb"
             > export auth_mailPass="123@#abc"                (to send mail)
             
     3. run index.js             
  
  For Production--->           
  
     1. connect to github and set repo
     2. set config variables
             > auth_jwtPrivateKey="yourSecretKey"
             > auth_db="yourDbUrl"
             > auth_mailPass="123@#abc"                (to send mail)
          
              
