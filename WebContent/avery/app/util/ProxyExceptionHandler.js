Ext.define('AOC.util.ProxyExceptionHandler',{
	singleton : true,
	requires : ['Ext.Ajax'],
	constructor : function(){
        Ext.Ajax.on('beforerequest',this.handleBeforeRequest,this);
        Ext.Ajax.on('requestexception',this.handleException,this);
	},
	handleBeforeRequest: function(conn,option,opt){
    	    var timeout = AOC.config.Settings.getRequestTimeOut();
	    option.headers={"Authorization" : "Basic YWRtaW46aW5kaWdvMQ=="};
	    var headers = option.headers;
	    if(headers){	
		var helper = AOC.util.Helper,
		jwtValue=helper.getCookie("authorization");
		if(!Ext.isEmpty(jwtValue)){
		    option.headers.Authorization=jwtValue;
		}}
        if(Ext.isEmpty(option.timeout) || isNaN(option.timeout) || option.timeout< timeout){
            option.timeout=timeout;
        }
	},
	handleException : function(conn,rsp,opt){
		var status = rsp.status;
		//AC-4316 # User registration is not working.
		if(status == 401){
	    	opt.failure = null;
        	Ext.Msg.alert('Failed',"Invalid credentials.",function(){
        	    AOC.util.Helper.deleteCookie("authorization");
	            window.location.reload();
        	},this);
	}
	}
});