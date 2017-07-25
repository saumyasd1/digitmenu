/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('AOC.Application', {
    extend: 'Ext.app.Application',
    
    name: 'AOC',

    controllers : [
       'MenuController' 
    ],
    requires:[
        'Ext.ux.ProgressBarPager',
	    'Ext.window.Toast',
	    'AOC.config.Settings',
  		'AOC.config.Runtime',
  		'AOC.config.Overrides',
  		'AOC.lang.lit',
  		'AOC.util.ProxyExceptionHandler',
  		'AOC.util.Helper',
  		'AOC.view.main.Main',
  		'AOC.view.main.MainModel'
	],
    stores: [
         'Sections',
         'PartnerManagementStore',
         'EmailManagementStore',
         'AddressStore',
         'OrderQueueStore',
         'HomePageOders',
         'LocalItemLookupStore',
         'BillShipMappingStore',
         'ConfigurationCSRStore'
    ],
    views : ['Viewport'],
    
    launch: function () {
    	localStorage.clear();
    	var me =this;
   	 	Ext.fly('loading').fadeOut({
            callback : function(){
                Ext.fly('loading').destroy();
            }
        });
   	 	var auth = Helper.getCookie("authorization");
   	 	var userInfo = Helper.getCookie("userinfo");
   	 	var index= 0;
   	 	
   	 	if(!Ext.isEmpty(auth) && !Ext.isEmpty(userInfo)){
   	 		index=1;
   	 		AOCRuntime.setUser(JSON.parse(userInfo));
   	 		
   	 		this.getController('MenuController').loadStores();
   	 	}
       	myAppGlobal=this;
       	Ext.create('AOC.view.Viewport', {
       		activeItem:index
       });
       	Helper.updateProfileInfo();
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
