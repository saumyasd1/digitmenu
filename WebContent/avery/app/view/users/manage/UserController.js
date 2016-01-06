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
    						modal:true,
    					 	items : [{  xtype : 'useredit',
    					 		        showPasswordField:true}]
    				 });
    	         }
    	 
		win.show();
    },
    SaveDetails:function(){
		Ext.getBody().mask('Saving....');
		var me=this;
		var Msg='';
	    var win=Ext.ComponentQuery.query('#userWindowItemId')[0];
		var createuser=Ext.ComponentQuery.query("#useredititemid")[1];
		var grid=Ext.ComponentQuery.query('#usersgriditemId')[0];
		var valueObj='',form=this.getView().down('form');
		var methodMode='';
		url='';
		valueObj=form.getValues(false,true,false,true);
		var ID=valueObj.id;
		if(ID !=null){
			url=applicationContext+'/rest/users/'+ID;
			//form.updateRecord();
			valueObj=form.getValues(false,true,false,true);
			methodMode='PUT';
			Msg='<b>User Updated Successfully</b>';
		   var parameters=Ext.JSON.encode(valueObj);
		}
		else{
			url=applicationContext+'/rest/users';
			valueObj=form.getValues(false,true,false,true);
			methodMode='POST';
			valueObj.status=100;
			Msg='<b>User Added Successfully</b>';
			var parameters=Ext.JSON.encode(valueObj);
		   }
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
	Ext.getBody().unmask();
	var win=Ext.ComponentQuery.query('#userWindowItemId')[0];
	win.destroy();
},
onClickMenu:function(obj,rowIndex,colIndex,item,e,record){
    var me=this;
    var callout = Ext.widget('callout', {
        cls                  : 'white more-menu-item-callout extra',
        html                 : me.buildMenuTpl.apply("{}"),
        target               : e.target,
        calloutArrowLocation : 'top-left',
        relativePosition     : 't-b',
        relativeOffsets      : [52,23],
        dismissDelay         : 0,
        listeners            : {
            afterrender : me.onAfterRenderEditCallout,
            edit: function(cmp){
          	  currentRecord=e.record;
          	  var id=currentRecord.get('id');
          	  me.runTime.setWindowInEditMode(true);
	          var mode=me.runTime.getWindowInEditMode();
	  		  var win=Ext.ComponentQuery.query('#userWindowItemId')[0];
	  		  var title=mode ?'Edit User':'Add User';
	  		if(!win){
	  		    var data={"id":""};
	  		    win=Ext.create('Ext.window.Window',{
  		    	height:550,
				width:1000,
	  			modal:true,
	  			itemId:'userWindowItemId',
	  			title:'<b>'+title+'</b>',
	  			editMode:true,
	  			ID:id,
	  			items : [{  xtype : 'useredit' }]
	  		});
	  		win.down('#useredititemid').getForm().setValues(currentRecord.data);
	  		win.show();
	  		}
            	callout.destroy();
            },
            deleteuser: function(cmp){
          	  currentRecord=e.record;
          		var ID=record.get('id');
          		Ext.Msg.confirm('Alert','<b>Are you sure you want to delete the User?</b>',function(btn){
          			  if(btn=='yes'){
          					Ext.Ajax.request({
          							method:'DELETE',
          							url:applicationContext+'/rest/users/'+ID,
          				        success : function(response, opts) {
          							Ext.Msg.alert('Alert Message','<b>User Deleted Succesfully</b>');
          							me.runTime.getActiveGrid().store.load();
          				        },
          				        failure: function(response, opts) {
          		                }
          		        	});
          			  }
          		});
            	callout.destroy();
            }
        }
        });
    callout.show();   
},
onAfterRenderEditCallout : function(cmp){
      var me = this;
      cmp.el.on({
          delegate: 'div.user-profile-menu-item',
          click    : function(e,element){
              var el    = Ext.get(element),
                  event = el.getAttribute('event');
              if (event && !el.hasCls('edit-menu-disabled')){
//                  cmp.destroy();
                  me.fireEvent(event);
              }
          }
      });
  },
buildMenuTpl : function(){
  	  var me=this;
  	 return Ext.create('Ext.XTemplate',
  	      '<div style="width: 140px !important;border-bottom: none !important;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="edit"">Edit</div>',
            '</tpl>',
            '<div style="width: 140px !important;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="deleteuser"">Delete</div>',
            '</tpl>'
        );
     }
});