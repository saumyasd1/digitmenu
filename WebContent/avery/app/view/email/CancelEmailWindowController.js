Ext.define('AOC.view.email.CancelEmailWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cancelEmail',
    requires: ['AOC.view.orderqueue.SalesOrderExpandableGrid', 'AOC.view.advsearch.OrderQueueAdvanceSearch', 'AOC.view.orderqueue.OrderLineExpandableGrid'],
    runTime: AOC.config.Runtime,
    cancelEmail: function() {
    	Ext.getBody().mask('Cancelling...');
        var id = this.runTime.getOrderEmailQueueId(),
        me = this;
        var commentArea = this.getView().lookupReference('commentArea');
        var comment = commentArea.getValue().replace(/\n/g, '::');
        var parameters = '{\"status\":\"' + AOCLit.unrecognizedEmailStatus + '\"';
        if (comment != '') {
            parameters = parameters + ',\"comment\":\"' + comment + '\"';
        }
        parameters = parameters + '}';
        Ext.Ajax.request({
            url: applicationContext + '/rest/emailqueue/cancelemail/' + id,
            method: 'PUT',
            jsonData: parameters,
            success: function(response, opts) {
                var orderEmailQueueView= Ext.ComponentQuery.query('#emailPanel')[0];
                var activeItem=orderEmailQueueView.getLayout().getActiveItem();
                activeItem.getStore().load();
                Ext.Msg.alert(AOCLit.success,AOCLit.emailMovedToTaskManagerSuccessAlert);
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