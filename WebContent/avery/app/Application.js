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
		'AOC.util.ProxyExceptionHandler',
		'AOC.config.Runtime',
		'AOC.config.Overrides'
    ],
    controllers : [
                   'MenuController' 
    ],
    views : ['Viewport'],
    launch : function(){
	var me =this;
	 Ext.fly('loading').fadeOut({
             callback : function(){
                 Ext.fly('loading').destroy();
             }
         });
	var runtime=AOC.config.Runtime;
	var helper = AOC.util.Helper;
	 var auth = helper.getCookie("authorization");
	 var userInfo = helper.getCookie("userinfo");
	 var index= 0;
	 if(!Ext.isEmpty(auth) && !Ext.isEmpty(userInfo)){
	     index=1;
	     runtime.setUser(JSON.parse(userInfo));
	     this.getController('MenuController').loadStores()
	 }
    	myAppGlobal=this;
    	Ext.create('AOC.view.Viewport', {
    		activeItem:index
        });
    	
    }
  
    });
