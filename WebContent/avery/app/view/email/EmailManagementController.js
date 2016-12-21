Ext.define('AOC.view.email.EmailManagementController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.emailManagementController',
    runTime : AOC.config.Runtime,
    helper: AOC.util.Helper,
    requires:['AOC.view.advsearch.ProductLineAdvanceSearch','AOC.util.Helper'],
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
               	      var form = Ext.ComponentQuery.query('#viewmailformItemId')[0];
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
	                   panel = Ext.ComponentQuery.query('#emailPanel')[0];
	                   var viewmail = Ext.ComponentQuery.query('#EmailAttachmentInfoGriditemId')[0];
	                   viewmail.bindStore(store);
	                   panel.getLayout().setActiveItem(1);
	                    me.runTime.setActiveGrid(viewmail);
	                    callout.destroy();
},
            	    cancelMail:function(){
            	    	 currentRecord = e.record;
                  	     var id = currentRecord.get('id');
                  	     var win = Ext.create('AOC.view.orderqueue.CancelOrderWindow');
           	             win.show();
            	    },
            	    viewOrder: function(cmp) {
            	    	                    var data = e.record;
            	    	                    var id = data.id;
            	    	                    store = Ext.create('AOC.store.OrderQueueStore', {
            	    	                        storeId: 'OrderQueueStoreStoreId',
            	    	                        totalCount: 'total'
            	    	                    });
            	    	                   var panel = Ext.ComponentQuery.query('#emailPanel')[0];
            	    	                   var orderQueueView = panel.down('#EmailOrderQueueGridItemId');
            	    	                   orderQueueView.down('#OrderQueueBackButton').setVisible(true);
            	    	                   orderQueueView.bindStore(store);
            	    	                   panel.getLayout().setActiveItem(2);
            	    	                   orderQueueView.orderTrackNo = id;
            	    	                   orderQueueView.down('#pagingtoolbar').bindStore(store);
            	    	                   me.runTime.setActiveGrid(orderQueueView);
            	    	                   callout.destroy();
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
            '<div style="width: 140px !important;border-bottom: none !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="viewMail"">View Mail</div>',
            '</tpl>',
            '<div style="width: 140px !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item "  event="cancelMail">Cancel Email</div>',
            '</tpl>',
            '<div style="width: 140px !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="viewOrder"">View Order</div>',
            '</tpl>',
            { isCancelOrderDisabled : function(v)
        	 {
	    		 return (v.Status!=AOCLit.orderError);
	          }
            }
        );
    }
    
  
    });
