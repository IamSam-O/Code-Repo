var OAuthSAPConcurAddParameters = Class.create();
OAuthSAPConcurAddParameters.prototype = Object.extendsObject(OAuthUtil, {


    interceptRequestParameters: function(requestParamMap) {
        //this gets refresh token for the first time
        var provider = new sn_cc.StandardCredentialsProvider();
        var creds = provider.getCredentialByID('6be949f8c381fd10d01e69deb001312c'); // sys_id of basic auth record
        //username and password are stored as a basic auth credential 
        requestParamMap.put('username', creds.getAttribute('user_name'));
        requestParamMap.put('password', creds.getAttribute('password')); //comment line if renewing refresh token
        requestParamMap.put('grant_type', 'password'); //comment line if renewing refresh token
        //requestParamMap.put('grant_type', 'refresh_token'); //uncomment if renewing refresh token
        //var refreshToken = refresh_token value from [oauth_credential];
        //requestParamMap.put('refresh_token', refreshToken); //uncomment if renewing refresh token
        requestParamMap.put('credtype', 'authtoken');
        //client_id and client_secret are supplied by OAuth Profile 

    },

    postprocessAccessToken: function(accessTokenResponse) {
        var tokenResponse = (new global.JSON()).decode(accessTokenResponse.getBody());
        var paramMap = accessTokenResponse.getparameters();
        for (param in tokenResponse)
            // gs.info("Param Values are: " + tokenResponse[param]);
            paramMap.put(param, tokenResponse[param].toString());
    },

    type: 'OAuthSAPConcurAddParameters'


});