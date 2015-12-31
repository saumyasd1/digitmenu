Ext.define('AOC.view.users.manage.UserController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.userMain',
    runTime : AOC.config.Runtime,
    createuser:function(){
    	 var win=Ext.ComponentQuery.query('#userWindowItemId')[0];
    	 if(!win){
    	
    			 win = Ext.create('Ext.window.Window',{
    					 	height:550,
    						width:1000,
    						title:'<b>Add User</b>',
    						itemId:'userWindowItemId',
    						layout: 'fit',
    						draggable: false,
    						showPasswordField:true,
    						modal:true,
    					 	items : [{  xtype : 'useredit' }]
    				 });
    	         }
		win.show();
    },
    SaveDetails:function(){
		Ext.getBody().mask('Saving....');
		var me=this;
		var Msg='';
	    var win=Ext.ComponentQuery.query('#userWindowItemId')[0];
		var createuser=Ext.ComponentQuery.query("#useredititemid")[0];
		var grid=Ext.ComponentQuery.query('#usersgriditemId')[0];
		var valueObj='',form=this.getView().down('form');
		var methodMode='';
		url='';
			url=applicationContext+'/rest/users';
			valueObj=form.getValues(false,true,false,true);
			methodMode='POST';
			Msg='<b>User Added Successfully</b>';
		   var parameters=Ext.JSON.encode(valueObj);
				Ext.Ajax.request( {
					method: methodMode,
				    jsonData : parameters,	
				    url : url,
		        success : function(response, opts) {
		        	    Ext.getBody().unmask();
		        	    win.destroy();
			  			Ext.Msg.alert('Alert Message',Msg);
			  			grid.store.load();
		        },
		        failure: function(response, opts) {
		        	Msg=response.responseText;
		        	Msg=Msg.replace("Exception:"," ");
		        	Ext.Msg.alert('Alert Message',Msg);
		        	Ext.getBody().unmask();
		        	win.destroy();
              }
      	});
		
    },
CancelDetails:function(){
	var win=Ext.ComponentQuery.query('#userWindowItemId')[0];
	win.destroy();
}
});