Ext.define('AOC.view.orderqueue.SalesOrderViewController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.salesorder',
    requires : ['AOC.view.orderqueue.BulkUpdateSalesOrderGrid'],
    runTime : AOC.config.Runtime,
    getUpdateScreen:function(){
    	 var viwport=Ext.ComponentQuery.query('#viewportitemid')[0];
      	 var height=viwport.getHeight()-20;
      	 var width=viwport.getWidth()-20;
      	 var id=this.runTime.getOrderQueueId();
      	var store=Ext.create('AOC.store.SalesOrderStore', {
      		extend : 'Ext.data.Store',
      		model:'AOC.model.SalesOrderModel',
      		autoLoad : true,
      		storeId:'SalesOrderId',
      		proxy : {
      			type : 'ajax',
      			 url : applicationContext+'/rest/salesorders/order/'+id,
      			reader:{
      		        type:'json', 
      		        rootProperty: 'ArrayList'
      		    }
      	}
      	});
		   var win=Ext.create('Ext.window.Window',{
			 	height:height,
				width:width,
				title:"Bulk Update",
				layout: 'fit',
				draggable: false,
				modal:true,
				items:[{
					xtype:'bulkupdatesalesordergrid',
					store:store
				}]
		   });
		   win.show();
    },
    backButton:function(){
    	 var bulkUpdate=Ext.ComponentQuery.query('#bulkUpdateItemId')[0];
    	  bulkUpdate.setText('<b>Order Queue</b>');
    	var panel=Ext.ComponentQuery.query('#orderQueueViewItemId1')[0];
        panel.getLayout().setActiveItem(0);
        this.getView().destroy();
    },
    radioButtonClick:function(){
    	
    },
    saveSalesOrder:function(){
    	
    }
})