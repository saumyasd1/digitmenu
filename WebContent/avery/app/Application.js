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
    	myAppGlobal=this;
    	Ext.create('AOC.view.Viewport', {
    		activeItem:0
        });
    	
    }
  
    });
