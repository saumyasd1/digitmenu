Ext.define('AOC.view.orderqueue.CancelOrderWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cancelOrderController',
    requires: ['AOC.view.orderqueue.SalesOrderExpandableGrid', 'AOC.view.advsearch.OrderQueueAdvanceSearch', 'AOC.view.orderqueue.OrderLineExpandableGrid'],
    runTime: AOC.config.Runtime,
    cancelOrder: function() {
    	Ext.getBody().mask('Cancelling...');
        var id = this.runTime.getOrderQueueId(),
            me = this;
        var commentArea = this.getView().lookupReference('commentArea');
        var comment = commentArea.getValue().replace(/\n/g, '::');
        var parameters = '{\"status\":\"' + cancelStatus + '\"';
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
                activeItem.getStore().load();
                if(activeItem.itemId.indexOf('orderline')!=-1){
                	var orderlineexpandablegrid = activeItem,
	                validateButton = orderlineexpandablegrid.lookupReference('validateButton'),
	                bulkUpdateButton=orderlineexpandablegrid.lookupReference('bulkUpdateButton'),
	                salesViewOrderbutton= orderlineexpandablegrid.lookupReference('salesViewOrderbutton'),
	                salesOrderbutton=orderlineexpandablegrid.lookupReference('salesOrderbutton'),
	                cancelOrderButton=orderlineexpandablegrid.lookupReference('cancelOrderButton'),
	                form=orderlineexpandablegrid.lookupReference('form');
                	validateButton.disable();
                	bulkUpdateButton.disable();
                	salesViewOrderbutton.enable();
                	salesOrderbutton.disable();
                	cancelOrderButton.disable();
                	form.disable();
                	me.runTime.setAllowOrderLineEdit(false);
                	Ext.Msg.alert('',orderCancelSuccessAlert);
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