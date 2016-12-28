Ext.define('AOC.view.taskmanager.DisregardEmailWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.disregardEmail',
    runTime: AOC.config.Runtime,
    disregardEmail: function() {
    	debugger;
    	Ext.getBody().mask('Disregarding...');
        var id = this.runTime.getOrderEmailQueueId(),
        me = this;
        var commentArea = this.getView().lookupReference('commentArea');
        var comment = commentArea.getValue().replace(/\n/g, '::');
        var parameters = '{\"status\":\"' + AOCLit.disregardStatus + '\"';
        if (comment != '') {
            parameters = parameters + ',\"comment\":\"' + comment + '\"';
        }
        parameters = parameters + '}';
        Ext.Ajax.request({
            url: applicationContext + '/rest/emailqueue/disregardemail/' + id,
            method: 'PUT',
            jsonData: parameters,
            success: function(response, opts) {
                var orderEmailQueueView= Ext.ComponentQuery.query('#emailPanel')[0];
                var activeItem=orderEmailQueueView.getLayout().getActiveItem();
                if(activeItem.xtype.indexOf('orderemailqueue')!=-1){
                	//var orderlineexpandablegrid = activeItem.down('grid'),
	                //validateButton = activeItem.lookupReference('validateButton'),//disable view email-view order 
	               // cancelOrderButton=activeItem.lookupReference('cancelOrderButton');
                	//validateButton.disable();
                	//cancelOrderButton.disable();
                	//me.runTime.setAllowOrderLineEdit(false);
                	//orderlineexpandablegrid.store.load();
                	Ext.Msg.alert('',AOCLit.emailDisregardSuccessAlert);
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