I.PROJECT NAME

    Microservices_backend

II.PREREQUISITES

    Node.js
    Node Package Manager(npm)

III.Folder Architecture & Description

    --config
    
    	---config.js (configuration of environment keys)
        ---aws-config.js(aws keys configuration)
        ---database.js(configuration of dynamo db)
        ---schema.js (CRUD operations on particular table)
        ---table.js (creation of table by configuring the READ and WRITE requests )
    
    --methods
    
    	---email.js (sending Email to signup users)
    
    --models
    
    	---user.js (definition of user schema )
    
    	---device.js (definition of paring of device ,nurse, and patient details)

        ---devicedata.js (definition of device-data schema)

        ---patientanddevicedata.js (definition of patient-and-device schema )
    
    --controllers
    
    	---signup.js ( it include route which act as a microservice for signup functionality)

        ---signupverification.js ( it include root which act as a microservice for signupverification functionality)

        ---login.js ( it include root which act as a microservice for login functionality)

        ---getPatientList.js ( it include a root which act as a microservice)

        ---getPatientData.js ( it include a root which act as a microservices)

        ---addDevice.js ( it include root which act as a microservices)

        ---getDevicedata.js ( iit include root which act as a microservices)

        ---create=end-point ( it include root which act as a microservices)
    
    ---app.js (host and port configuration)
    

IV.Running Locally

    a.git clone https://github.com/Sikandarkhan/microservices_backend/
    
    b.cd microservices_backend
    
    c.npm install
    
    d.To make request for microservices ,Make sure required params need to be passed.
    
    npm start or node app.js or nodemon start app.js 
	
V.Testing:

    a.Postman:
    
    Your app should now be running on http://localhost:2019
    
    Note:Parameter list need to be changed based on the requirement.
    

