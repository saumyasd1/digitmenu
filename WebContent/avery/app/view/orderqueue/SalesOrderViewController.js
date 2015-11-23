Ext.define('AOC.view.orderqueue.SalesOrderViewController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.salesorder',
    requires : ['AOC.view.orderqueue.BulkUpdateSalesOrderGrid'],
    getUpdateScreen:function(){
    	 var viwport=Ext.ComponentQuery.query('#viewportitemid')[0];
      	 var height=viwport.getHeight()-20;
      	 var width=viwport.getWidth()-20;
      	var store=Ext.create('AOC.store.SalesOrderStore', {
      		extend : 'Ext.data.Store',
      		model:'AOC.model.SalesOrderModel',
      		autoLoad : true,
      		storeId:'SalesOrderId',
      		proxy : {
      		//	timeout:parseInt(requestTimeoutforStore, 10),
      			// load using HTTP
      			
      			type : 'ajax',
      			//url : 'powerpay/MenuItems/GET',
      			url : 'avery/app/data/salesorder.json',
      			reader:{
      		        type:'json', 
      		        rootProperty: 'items'
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
    	var panel=Ext.ComponentQuery.query('#orderQueueViewItemId1')[0];
        panel.getLayout().setActiveItem(0);
        this.getView().destroy();
    },
    radioButtonClick:function(){
    	
    },
    saveSalesOrder:function(){
    	
    }
})