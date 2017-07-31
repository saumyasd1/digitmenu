Ext.define('AOC.view.orderqueue.CancelOrderWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cancelOrder',
    requires: ['AOC.view.orderqueue.SalesOrderExpandableGrid', 'AOC.view.advsearch.OrderQueueAdvanceSearch', 'AOC.view.orderqueue.OrderLineExpandableGrid'],
    runTime: AOC.config.Runtime,
    cancelOrder: function() {
        var id = AOCRuntime.getOrderQueueId(),
            me = this;
        
        var commentArea = this.getView().lookupReference('commentArea');
        var cancelComboValue = this.getView().lookupReference('cancelOrderCombo');
        var comment = cancelComboValue.getValue()+(commentArea.getValue().replace(/\n/g, '::')? ' <br>'+ commentArea.getValue().replace(/\n/g, '::') : '');
        
        var parameters = {
    		status:AOCLit.cancelStatusOrderQueue
        }
        if (comment != '') {
            parameters.comment = comment
        }
        
        parameters.lastModifiedBy = Helper.setLastModifiedBy();
        Ext.getBody().mask(AOCLit.pleaseWait);
        Ext.Ajax.request({
            url: applicationContext + '/rest/orders/cancelorder/' + id,
            method: 'PUT',
            jsonData: parameters,
            success: function(response, opts) {
                var orderQueueView= Ext.ComponentQuery.query('#orderQueueViewItemId')[0];
                var activeItem = orderQueueView.getLayout().getActiveItem();
                
                if(activeItem.xtype.indexOf('orderline') != -1){
                	var orderlineexpandablegrid = activeItem.down('grid'),
		                validateButton = activeItem.lookupReference('validateButton'),
		                bulkUpdateButton= orderlineexpandablegrid.lookupReference('bulkUpdateButton'),
		                salesViewOrderbutton = activeItem.lookupReference('salesViewOrderbutton'),
		                salesOrderbutton = activeItem.lookupReference('salesOrderbutton'),
		                cancelOrderButton = activeItem.lookupReference('cancelOrderButton'),
		                form = orderlineexpandablegrid.lookupReference('form');
                	
                	validateButton.disable();
                	bulkUpdateButton.disable();
                	salesViewOrderbutton.disable();
                	salesOrderbutton.disable();
                	cancelOrderButton.disable();
                	form.disable();
                	
                	AOCRuntime.setAllowOrderLineEdit(false);
                	
                	Helper.loadOrderLineGridStore(orderlineexpandablegrid.store, AOC.config.Runtime.getOrderQueueId());
                	Helper.showToast('success', AOCLit.orderCancelSuccessAlert)
                	
                	orderQueueView.getLayout().setActiveItem(0);
                }else{
                	activeItem.getStore().load();
                }
                Ext.getBody().unmask();
                me.getView().destroy();
            },
            failure: function(response, opts) {
                Ext.getBody().unmask();
                me.getView().destroy();
            }
        });
    },
    closeWindow:function(obj){
    	this.getView().destroy();
    }
});