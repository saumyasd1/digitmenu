Ext.define('AOC.view.orderqueue.CancelOrderWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cancelOrder',
    requires: ['AOC.view.orderqueue.SalesOrderExpandableGrid', 'AOC.view.advsearch.OrderQueueAdvanceSearch', 'AOC.view.orderqueue.OrderLineExpandableGrid'],
    runTime: AOC.config.Runtime,
    cancelOrder: function() {
    	Ext.getBody().mask('Cancelling...');
        var id = this.runTime.getOrderQueueId(),
            me = this;
        var commentArea = this.getView().lookupReference('commentArea');
        var comment = commentArea.getValue().replace(/\n/g, '::');
        var parameters = '{\"status\":\"' + AOCLit.cancelStatusOrderQueue + '\"';
        if (comment != '') {
            parameters = parameters + ',\"comment\":\"' + comment + '\"';
        }
        parameters = parameters + '}';
        Ext.Ajax.request({
            url: applicationContext + '/rest/orders/cancelorder/' + id,
            method: 'PUT',
            jsonData: parameters,
            success: function(response, opts) {
                var orderQueueView= Ext.ComponentQuery.query('#orderQueueViewItemId1')[0];
                var activeItem=orderQueueView.getLayout().getActiveItem();
                if(activeItem.xtype.indexOf('orderline')!=-1){
                	var orderlineexpandablegrid = activeItem.down('grid'),
	                validateButton = activeItem.lookupReference('validateButton'),
	                bulkUpdateButton=activeItem.lookupReference('bulkUpdateButton'),
	                salesViewOrderbutton= activeItem.lookupReference('salesViewOrderbutton'),
	                salesOrderbutton=activeItem.lookupReference('salesOrderbutton'),
	                cancelOrderButton=activeItem.lookupReference('cancelOrderButton'),
	                form=activeItem.lookupReference('form');
                	validateButton.disable();
                	bulkUpdateButton.disable();
                	salesViewOrderbutton.disable();
                	salesOrderbutton.disable();
                	cancelOrderButton.disable();
                	form.disable();
                	me.runTime.setAllowOrderLineEdit(false);
                	orderlineexpandablegrid.store.load();
                	Ext.Msg.alert('',AOCLit.orderCancelSuccessAlert);
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
})