Ext.define('AOC.view.orderqueue.SalesOrderViewController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.salesorder',
    requires : ['AOC.view.orderqueue.BulkUpdateSalesOrderGrid','AOC.view.orderqueue.BulkUpdateSalesVariableHeaderGrid','AOC.model.VariableHeaderModel'],
    runTime : AOC.config.Runtime,
    getUpdateScreen:function(){
    	 var viwport=Ext.ComponentQuery.query('#viewportitemid')[0];
      	 var height=viwport.getHeight()-20;
      	 var width=viwport.getWidth()-20;
      	 var id=this.runTime.getOrderQueueId();
     	 var radioGroupValue=this.lookupReference('radioGroup').getValue().rb,store,win,innerGridType,comboValue='';
      	 if(radioGroupValue=='2'){
      		var comboField=this.lookupReference('variableFieldCombo');
      		comboValue=comboField.getValue();
      		if(comboValue=='' || comboValue==null){
      			Ext.Msg.alert('', 'Please select a value from the drop down before drop down.');
      			return false;
      		}
      		innerGridType='bulkUpdateSalesVariableHeaderGrid';
      		store=Ext.create('AOC.store.SalesOrderStore', {
      			model:'AOC.model.VariableHeaderModel',
    			proxy : {
    				type : 'rest',
    				url : applicationContext+'/rest/salesorderdetails/order/'+id+'/'+comboValue,
    				reader:{
    			        type:'json', 
    			        rootProperty: 'SalesOrderDetail'
    			    }
    			}
    		}); 
      	 }else{
      store=Ext.create('AOC.store.SalesOrderStore', {
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
      	innerGridType='bulkupdatesalesordergrid';
      }
		   var win=Ext.create('Ext.window.Window',{
			 	height:height,
				width:width,
				title:"Bulk Update",
				layout: 'fit',
				draggable: false,
				modal:true,
				listeners:{ 
			 	      close:function(obj,eOpts){
			 	    	 var salesorder=Ext.ComponentQuery.query('#salesrrderexpandablegrid')[0];
			 	    	     salesorder.bindStore(store);
			 	    	     store.load();
			 	}
				},
				items:[{
					xtype:innerGridType,
					store:store,
					variableColumnName:comboValue
				}]
		   });
		   win.show();
      	 },
    backButton:function(){
    	 var bulkUpdate=Ext.ComponentQuery.query('#bulkUpdateItemId')[0];
    	 var panel=Ext.ComponentQuery.query('#orderQueueViewItemId1')[0];
    	 var activeIndex = panel.items.indexOf(this.getView());
    	 var currentRecord=this.runTime.getOrderQueueActiveRecord();
        panel.getLayout().setActiveItem(parseInt(activeIndex)-1);
        var ordeQueueGrid=panel.down('#OrderQueueGridItemId');
        var currentRecord=this.runTime.getOrderQueueActiveRecord();
        var row = ordeQueueGrid.getView().getRow(currentRecord);
//        var el = Ext.fly(row);
//        if(el)
//        el.highlight("#c1ddf1", {
//            attr: "backgroundColor",
//            duration: 5000
//        });
        this.getView().destroy();
    },
    radioButtonClick:function(obj,newValue,oldValue){
    	var comboField=this.lookupReference('variableFieldCombo');
    	if(newValue.rb=='2'){
    		Ext.getBody().mask('Loading..');
    		var id= this.runTime.getOrderQueueId();
    		Ext.Ajax.request( {
    			method:'GET',
    			url : applicationContext+'/rest/salesorderdetails/order/'+id,
		        success : function(response, opts) {
		        	var jsonValue=Ext.decode(response.responseText);
		        	var serviceStoreData = [];
		        	if(jsonValue.length>0){
		        	jsonValue.forEach(function(item){
                		var service = [item];
                		serviceStoreData.push(service);
                	});
		        	var serviceStore =  Ext.create('Ext.data.ArrayStore',{
                 	   		fields : ['variableFieldName'],	
            	            data : serviceStoreData
                    });
		        	comboField.bindStore(serviceStore);
		        	}
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
    saveSalesOrder:function(){
    	       var grid=this.getView();me=this;
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
    saveSalesOrderDetails:function(){
     	var grid=this.getView(),me=this;
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
    		   url : applicationContext+'/rest/salesorderdetails/variablebulkupdate',
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
    },
    updateSalesOrder:function(editor, context, eOpts){
    	var ctx = context,me=this,
        idx = ctx.rowIdx,
        currentRecord = ctx.store.getAt(idx),parms='';
    	var obj=currentRecord.getChanges( ) ;
    	obj.id=currentRecord.id;
    	var runTime = AOC.config.Runtime;
    	var obj='{"data":'+Ext.encode(Ext.encode(obj))+',"updateAll":false,"orderQueueId":"'+runTime.getOrderQueueId()+'"}';
    	Ext.Ajax.request({
    		method:'PUT',
	        jsonData:obj,
    		   url : applicationContext+'/rest/salesorders/bulkupdate',
		        success : function(response, opts) {
			  		Ext.Msg.alert('','Sales Order successfully updated');
			  		Ext.getBody().unmask();
			  		me.getView().store.load();
		        },
		        failure: function(response, opts) {
		        	Ext.getBody().unmask();
	          }
    		  });
    },
    submitOrder:function(){
        var id = this.runTime.getOrderQueueId(),
        me = this;
    var parameters = '{\"status\":\"' + submitToOracleStatus + '\"';
    parameters = parameters + '}';
    Ext.Ajax.request({
        url: applicationContext + '/rest/orders/submittosystem/' + id,
        method: 'PUT',
        jsonData: parameters,
        success: function(response, opts) {
        	me.getView().lookupReference('submitOrder').hide();
    		me.getView().lookupReference('lastTab').hide();
            Ext.Msg.alert('Alert','Order submission successful');
            me.getView().store.load();
            Ext.getBody().unmask();
        },
        failure: function(response, opts) {
            Ext.getBody().unmask();
        }
    });
    },
    cancelSalesOrderLine:function(){
    	Ext.getBody().mask('Validating....');
    	var id=this.runTime.getOrderQueueId(),me=this;
    	Ext.Ajax.request({
    		method:'GET',
    		   url : applicationContext+'/rest/router/cancelsalesorder/'+id,
		        success : function(response, opts) {
		        	var jsonValue=Ext.decode(response.responseText);
		        	var status=jsonValue.status;
		        	if(status=='success'){
		        		Ext.Msg.alert('','Sales Order was successfully cancelled');
		        	}
		        	else
		        		Ext.Msg.alert('','An error occured during validation process. Please contact your system Administartor for further information.');
			  		Ext.getBody().unmask();
			  		me.getView().store.load();
		        },
		        failure: function(response, opts) {
		        	Ext.getBody().unmask();
	          }
    		  }); 
    }
})