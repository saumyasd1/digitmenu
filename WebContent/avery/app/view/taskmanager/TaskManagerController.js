Ext.define('AOC.view.taskmanager.TaskManagerController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.taskManagerController',
    runTime : AOC.config.Runtime,
    onClickMenu: function(obj, rowIndex, colIndex, item, e, record) {
        var me = this;
        var callout = Ext.widget('callout', {
            cls: 'white more-menu-item-callout extra',
            html: me.buildMenuTpl.apply("{}"),
            target: e.target,
            calloutArrowLocation: 'top-left',
            relativePosition: 't-b',
            relativeOffsets: [52, 23],
            dismissDelay: 0,
            listeners: {
            	afterrender: me.onAfterRenderEditCallout,
            	viewMail: function(){  
            		currentRecord = e.record;
         	      var id = currentRecord.get('id');
         	     var panel = Ext.ComponentQuery.query('#taskManagerPanel')[0];
           	      var form = panel.down('#viewmailformItemId');
           	      form.loadRecord(currentRecord);
                    store = Ext.create('AOC.store.ViewMailformStore',{
                        storeId: 'ViewMailformStoreId',
                        totalCount: 'total',
                        proxy : {
                    		type : 'rest',
                    		url : applicationContext+'/rest/orderattachements/order/'+id,
                    		reader:{
                    	        type:'json', 
                    	        rootProperty: 'viewmail',
                    	        totalProperty: 'totalCount'
                    	    }
                    	}
                    });
                   
                   var viewmail = panel.down('#EmailAttachmentInfoGriditemId');
                   viewmail.bindStore(store);
                   panel.getLayout().setActiveItem(1);
                    me.runTime.setActiveGrid(viewmail);
                    callout.destroy();},
          	  markasRead:function(){
          		  
          	  },
          	   disregard:function(){
               currentRecord = e.record;
               var id = currentRecord.get('id');
               var win = Ext.create('AOC.view.taskmanager.DisregardEmailWindow');
               callout.destroy();
                 win.show();
                 me.runTime.setOrderEmailQueueId(id);
                 // me.runTime.setOrderEmailQueueActiveRecord(currentRecord);
                 me.runTime.setOrderEmailQueueStatus(currentRecord.get('Status'));
                 //me.runTime.setAllowOrderLineEdit(true);
                // var bulkUpdate = Ext.ComponentQuery.query('#bulkUpdateItemId')[0];
              }
            }
        });
        //Adding functionality related to Menu item visibility
        callout.show();
        var heightAbove = e.getY() - Ext.getBody().getScroll().top,
        heightBelow = Ext.Element.getViewportHeight() - heightAbove;
  	    if(heightBelow<(callout.getHeight()+40)){
  		  callout.calloutArrowLocation='bottom-left'; 
  		  callout.relativePosition='b-t';
  		  callout.relativeOffsets = [60, 0];
  	  }else{
  		  callout.calloutArrowLocation='top-left'; 
  		  callout.relativePosition='t-b';
  		callout.relativeOffsets = [60, 5];
  	  }
        callout.show();
    },
    onAfterRenderEditCallout: function(cmp) {
        var me = this;
        cmp.el.on({
            delegate: 'div.user-profile-menu-item',
            click: function(e, element) {
                var el = Ext.get(element),
                    event = el.getAttribute('event');
                if (event && !el.hasCls('edit-menu-disabled')) {
                    me.fireEvent(event);
                }
            }
        });
    },
    buildMenuTpl: function() {
        var me = this;
        return Ext.create('Ext.XTemplate',
            '<div style="width: 150px !important;border-bottom: none !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="viewMail"">View Mail</div>',
            '</tpl>',
            '<div style="width: 150px !important;border-bottom: none !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="markasRead"">Mark as Read</div>',
            '</tpl>',
            '<div style="width: 150px !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="disregard"">Disregard</div>',
            '</tpl>'
        );
    }
    
    
});
