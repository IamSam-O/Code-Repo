var OAuthSAPConcurAddParameters = Class.create();
OAuthSAPConcurAddParameters.prototype = Object.extendsObject(OAuthUtil, {


    interceptRequestParameters: function(requestParamMap) {

        // Retrieve the refresh_token associated with the OAuth profile
        // var provider = new sn_cc.StandardCredentialsProvider();
        //var creds = provider.getCredentialByID('6be949f8c381fd10d01e69deb001312c');
        //requestParamMap.put('username', creds.getAttribute('user_name'));


        var profGr = this.oauthContext.getOAuthProfile().sys_id;
        var requestorID = "";
        var oauthEntityProfileID = "";

		
        var grORP = new GlideRecord('oauth_requestor_profile');
        grORP.addEncodedQuery("oauth_entity_profile.sys_id=" + profGr);
        grORP.setLimit(100);
        grORP.query();
        while (grORP.next()) {
            oauthEntityProfileID = grORP.oauth_entity_profile;
            requestorID = grORP.requestor_id;
        }


        var oAuthClient = new sn_auth.GlideOAuthClient();
        var token = oAuthClient.getToken(requestorID, oauthEntityProfileID);
        if (token) {
            var refreshToken = token.getRefreshToken();
        }


        requestParamMap.put('refresh_token', refreshToken);
        requestParamMap.put('grant_type', 'refresh_token');
        //requestParamMap.put('credtype', 'authtoken');

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