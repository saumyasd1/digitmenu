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
    	       var grid=this.getView();
    	       var store=grid.store,
    	       parms ='';
    	       var updatedRecords=store.getModifiedRecords();
    	       Ext.each(updatedRecords,function(record){
    	           var obj=record.getChanges( ) ;
    	           obj.id=record.id;
    	           if(parms=='')
    	               parms=parms+Ext.encode(obj);
    	           else 
    	               parms=parms+'@@@'+Ext.encode(obj);
    	             
    	            });
    	       Ext.Ajax.request({
    	           method:'PUT',
    	            jsonData:parms,
    	              url : applicationContext+'/rest/salesorders/bulkupdate',
    	                success : function(response, opts) {
    	                      Ext.Msg.alert('Sales Order successfully updated');
    	                      Ext.getBody().unmask();
    	                      me.getView().store.load();
    	                },
    	                failure: function(response, opts) {
    	                    Ext.getBody().unmask();
    	              }
    	             }); 
    	       
    	   
    },
    cancelChanges:function(){
    	var me=this;
		Ext.Msg.confirm('', 'Are you sure you cancel the changes?',function(btn){
			  if(btn=='yes'){
				  me.getView().getStore().load();
			  }
		});
    }
})