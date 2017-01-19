Ext.define('AOC.view.users.manage.UserController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.userMain',
    runTime : AOC.config.Runtime,
    helper: AOC.util.Helper,
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
    					 		        showPasswordField:true,
    					 		        hidefield:false}]
    				 });
    	         }
    	 
		win.show();
    },
    SaveDetails:function(){
		Ext.getBody().mask('Saving....');
		var Msg='';
	    var win=Ext.ComponentQuery.query('#userWindowItemId')[0];
		var grid=Ext.ComponentQuery.query('#usersgriditemId')[0];
		var valueObj='',form=this.getView().down('form');
		var methodMode='';
		url='';
		valueObj=form.getValues(false,true,false,true);
		var ID=valueObj.id;
		var length = 0;
		if(ID !=null){
			url=applicationContext+'/rest/users/'+ID;
			//form.updateRecord();
			valueObj=form.getValues(false,true,false,true);
			methodMode='PUT';
			length = Object.keys(valueObj).length;
			//Msg='User Updated Successfully';
			var Msg=AOCLit.updateUserMsg;
			var parameters=Ext.JSON.encode(valueObj);
		}
		else{
			url=applicationContext+'/rest/users';
			valueObj=form.getValues(false,true,false,true);
			methodMode='POST';
			valueObj.status=100;
			
			//Msg='User Added Successfully';
			var Msg=AOCLit.addUserMsg;
			length = Object.keys(valueObj).length-1;
			var parameters=Ext.JSON.encode(valueObj);
		   }
		if (length > 0) {
			if (form.isValid()) {
				Ext.Ajax.request( {
					method: methodMode,
				    jsonData : parameters,	
				    url : url,
		        success : function(response, opts) {
		        	var jsonString = Ext.JSON.decode(response.responseText);
                    var valueExist = jsonString.valueExist;
                    if (valueExist) {
                        Ext.getBody().unmask();
                        win.down('#messageFieldItemId').show();
                        win.down('#messageFieldItemId').setValue(AOCLit.userNameExistsMsg);
                        return false;
                    }
		        	    Ext.getBody().unmask();
		        	    win.destroy();
		        	    AOC.util.Helper.fadeoutMessage('Success',Msg);
			  			//Ext.Msg.alert('Alert Message',Msg);
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
			}else{
				win.down('#messageFieldItemId').setValue(AOCLit.fillMandatoryFieldMsg).setVisible(true);
			}
		}else {
			win.down('#messageFieldItemId').setValue(AOCLit.noFieldModifiedMsg).setVisible(true);
        }
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
  		    	height:460,
				width:950,
	  			modal:true,
	  			itemId:'userWindowItemId',
	  			title:'<b>'+title+'</b>',
	  			editMode:true,
	  			ID:id,
	  			items : [{  xtype : 'useredit',
	  				        hidefield:false}]
	  		});
	  		win.down('#useredititemid').getForm().setValues(currentRecord.data);
	  		win.show();
	  		}
            	callout.destroy();
            },
            deleteuser: function(cmp){
          	  currentRecord=e.record;
          		var ID=record.get('id');
          		//var Msg='User Deleted Succesfully';
          		var Msg=AOCLit.deleteUserMsg;
          		Ext.Msg.confirm('Alert',AOCLit.delUserMsg,function(btn){
          			  if(btn=='yes'){
          					Ext.Ajax.request({
          							method:'DELETE',
          							url:applicationContext+'/rest/users/'+ID,
          				        success : function(response, opts) {
          				        
          				            AOC.util.Helper.fadeoutMessage('Success',Msg);
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
    var heightAbove = e.getY() - Ext.getBody().getScroll().top,
    heightBelow = Ext.Element.getViewportHeight() - heightAbove;
	
	    if(heightBelow<(callout.getHeight()+40)){
		callout.calloutArrowLocation='bottom-left'; 
		callout.relativePosition='b-t';
		callout.relativeOffsets = [55, -5];
	}else{
		callout.calloutArrowLocation='top-left'; 
		callout.relativePosition='t-b';
		callout.relativeOffsets = [55, 5];
	}
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
     },
     hideMandatoryMessage: function() {
         var obj = this.getView();
         this.helper.hideMandatoryMessage(obj);
     },
     notifyByMessage: function() {
         var obj = this.getView();
         this.helper.notifyByMessage(obj);
     },
     notifyByImage: function(config) {
         this.helper.notifyByImage(config);
     },
     getQuickSearchResults: function(cmp) {
         var store = this.getView().store;
         var value = cmp.getValue();
         if (value != null && value != '') {
             store.proxy.setFilterParam('query');
             var parameters = '{"email":"' + value + '"}';
             store.setRemoteFilter(true);
             if (!store.proxy.hasOwnProperty('filterParam')) {
                 store.proxy.setFilterParam('query');
             }
             store.proxy.encodeFilters = function(filters) {
                 return filters[0].getValue();
             };
             store.filter({
                 id: 'query',
                 property: 'query',
                 value: parameters
             });
         }
         cmp.orderedTriggers[0].show();
     },
     getSearchResults: function(cmp, e) {
         var me = this;
         if (e.getKey() == e.ENTER) {
             me.getQuickSearchResults(cmp);
         }
     },
     clearSearchResults: function(cmp) {
         var grid = this.getView();
         var store = grid.store;
         store.clearFilter();
         store.loadPage(1);
         cmp.setValue('');
         cmp.orderedTriggers[0].hide();
     }
});