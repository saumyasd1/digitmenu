Ext.define('AOC.view.orderqueue.OrderLineViewController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.orderline',
    requires : ['AOC.view.orderqueue.BulkUpdateOrderLineGrid'],
    runTime : AOC.config.Runtime,
    getUpdateScreen:function(){
    	 var viwport=Ext.ComponentQuery.query('#viewportitemid')[0];
      	 var height=viwport.getHeight()-20;
      	 var width=viwport.getWidth()-20;
      	 var id=this.runTime.getOrderQueueId();
      	var store=Ext.create('AOC.store.OrderLineStore', {
			proxy : {
				type : 'rest',
				url : applicationContext+'/rest/orderLines/order/'+id,
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
					xtype:'bulkupdateorderlinegrid',
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
    radioButtonClick:function(obj,newValue,oldValue){
    	var comboField=this.lookupReference('variableFieldCombo');
    	if(newValue.rb=='2'){
    		Ext.getBody().mask('Loading..');
    		var id= this.runTime.getOrderQueueId();
    		Ext.Ajax.request( {
    			method:'GET',
    			url : applicationContext+'/rest/orderlinedetails/order/'+id,
		        success : function(response, opts) {
		        	var jsonValue=Ext.decode(response.responseText);
		        	var serviceStoreData = [];
		        	jsonValue.forEach(function(item){
                		var service = [item];
                		serviceStoreData.push(service);
                	});
		        	var serviceStore =  Ext.create('Ext.data.ArrayStore',{
                 	   		fields : ['variableFieldName'],	
            	            data : serviceStoreData
                    });
		        	comboField.bindStore(serviceStore);
		        	comboField.setVisible(true);
		        	Ext.getBody().unmask();
		        },
		        failure: function(response, opts) {
		        	Ext.getBody().unmask();
	          }
	  	});
    	}else{
    		comboField.setVisible(false);
    	}
    },
    saveOrderLine:function(){
    	var grid=this.getView();
    	var store=grid.store,
    	parms ='';
    	var updatedRecords=store.getModifiedRecords();
    	Ext.each(updatedRecords,function(record){
    		var obj=record.getChanges( ) ;
    		obj.id=record.id;
    		if(params=='')
    			parms=parms+Ext.encode(obj);
    		else 
    			parms=parms+'@@@'+Ext.encode(obj);
    		  
    		 });
    	Ext.Ajax.request({
    		method:'PUT',
	        jsonData:parms,
    		   url : applicationContext+'/rest/orderLines/bulkupdate',
		        success : function(response, opts) {
			  		Ext.Msg.alert('Order line successfully updated');
			  		Ext.getBody().unmask();
			  		me.getView().store.load();
		        },
		        failure: function(response, opts) {
		        	Ext.getBody().unmask();
	          }
    		  }); 
    	
    }
})