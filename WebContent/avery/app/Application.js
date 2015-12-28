Ext.Loader.setConfig({
    enabled        : true,
    disableCaching : true
});

Ext.define('AOC.Application', {
    name        : 'AOC',
    extend      : 'Ext.app.Application',
    appFolder 	: 'avery/app',
    requires    : [
		'AOC.config.MenuInstructions',
		'AOC.config.Runtime'
    ],
    controllers : [
                   'MenuController' 
    ],
    views : ['Viewport'],
    launch : function(){
	 Ext.fly('loading').fadeOut({
             callback : function(){
                 Ext.fly('loading').destroy();
             }
         });
	var runtime=AOC.config.Runtime;
	var helper = AOC.util.Helper;
	debugger;
	 var auth = helper.getCookie("authorization");
	 var userInfo = helper.getCookie("userinfo");
	 var index= 0;
	 if(!Ext.isEmpty(auth) && !Ext.isEmpty(userInfo)){
	     index=1;
	     runtime.setUser(JSON.parse(userInfo));
	 }
    	myAppGlobal=this;
    	Ext.create('AOC.view.Viewport', {
    		activeItem:index
        });
    	
    }
  
    });
