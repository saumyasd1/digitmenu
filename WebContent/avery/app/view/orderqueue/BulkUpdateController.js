Ext.define('AOC.view.orderqueue.BulkUpdateController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.orderlinebulkupdate',
    requires : ['AOC.model.VariableHeaderModel','AOC.util.Helper'],
    runTime: AOC.config.Runtime,
    saveOrderLine:function(){ // this function is called when the orline line is updated by bulk update
    	var mask = Ext.getBody().mask('Loading');
    	mask.dom.style.zIndex = '99999';
		
    	var me = this,
			grid = this.getView(),
			store=grid.store,
			params ='',
			insertShipAddress = false,
			insertBillAddress = false,
			i = 0,
			updatedRecords = store.getModifiedRecords();
			
    	if(updatedRecords.length==0){
    		Ext.Msg.alert('Alert',AOCLit.noRecordsToUpdateMessage);
    		Ext.getBody().unmask();
    		return false;
    	}else{
    		Ext.getBody().unmask();
    		Ext.Msg.confirm('', AOCLit.confirmBulkUpdateSave,function(btn){
    			if(btn=='yes'){
    				var mask = Ext.getBody().mask('Saving....');
    				mask.dom.style.zIndex = '99999';
					
    				Ext.each(updatedRecords,function(currentRecord){
    		    		i = store.find('id',currentRecord.id);
    		    		if(i==0){
    		    			if(currentRecord.isModified('oracleBillToSiteNumber') &&  currentRecord.get('oracleBillToSiteNumber')!=null && currentRecord.get('oracleBillToSiteNumber')!='' && currentRecord.getModified('oracleBillToSiteNumber')==''){
    		    	  			insertBillAddress=true;
							}
    		    	  		if(currentRecord.isModified('oracleShipToSiteNumber') &&  currentRecord.get('oracleShipToSiteNumber')!=null && currentRecord.get('oracleShipToSiteNumber')!='' && currentRecord.getModified('oracleShipToSiteNumber')==''){
    		    	  			insertShipAddress=true;
    		    	  		}
						}
    		    			
    		    		var obj=currentRecord.getChanges();
    		    		obj.id = currentRecord.id;
						
    		    		if(params=='')
    		    			params = params + Ext.encode(obj);
    		    		else 
    		    			params = params + '@@@'+ Ext.encode(obj);
    		    		 });
						 
    		    	var obj ='{"insertBillAddress":'+insertBillAddress+',"insertShipAddress":'+insertShipAddress+',"data":'+Ext.encode(params)+',"orderQueueId":"'+me.runTime.getOrderQueueId()+'","partnerId":"'+runTime.getCurrentOrderQueuePartnerId()+'","systemId":"'+runTime.getCurrentOrderQueueDefaultSystem()+'","siteId":"'+runTime.getCurrentOrderQueueSiteId()+'","orgCodeId":"'+runTime.getCurrentOrderQueueOrgCodeId()+'"}';
					
    		    	Ext.Ajax.request({
    		    		method:'PUT',
    			        jsonData:obj,
    		    		   url : applicationContext+'/rest/orderLines/bulkupdate',
    				        success : function(response, opts) {
    				        	//AOC.util.Helper.fadeoutMessage('Success',AOCLit.updateOrdLineMsg);
    					  		Ext.Msg.alert('Success','Order line successfully updated');
    				        	Ext.getBody().unmask();
    				        	Helper.loadOrderLineGridStore(me.getView().store, me.runTime.getOrderQueueId());
    					  		//me.getView().view.refresh();
    				        },
    				        failure: function(response, opts) {
    				        	Ext.getBody().unmask();
							}
						});
    			}else{
    				Ext.getBody().unmask();
    			}
    		});
    	}
    },
    cancelChanges:function(){
    	var me=this;
		Ext.Msg.confirm('', AOCLit.cancelChangesMsg,function(btn){
			  if(btn=='yes'){
				  if(me.getView().xtype == 'bulkUpdateVariableHeaderrGrid'){
					  me.getView().getStore().load();
				  }else{
					  Helper.loadOrderLineGridStore(me.getView().store, me.runTime.getOrderQueueId());
					  //me.getView().getStore().load({params:{id:me.runTime.getOrderQueueId()}});
				  }
			  }
		});
    },
    saveOrderLineDetails:function(){
    	var grid=this.getView(),me=this;
    	var store=grid.store,
    	parms ='';
    	var updatedRecords=store.getModifiedRecords();
    	if(updatedRecords.length==0){
    		Ext.Msg.alert('',AOCLit.noRecordsToUpdateMessage);
    		Ext.getBody().unmask();
    		return false;
    	}else{
    		Ext.getBody().unmask();
    		Ext.Msg.confirm('',AOCLit.confirmBulkUpdateSave,function(btn){
    			if(btn=='yes'){
    				var mask=Ext.getBody().mask('Saving....');
    				mask.dom.style.zIndex = '99999';
    	Ext.each(updatedRecords,function(record){
    		var obj=record.getChanges( ) ;
    		obj.id=record.id;
    		if(parms=='')
    			parms=parms+Ext.encode(obj);
    		else 
    			parms=parms+'@@@'+Ext.encode(obj);
    		  
    		 });
    	var obj='{"data":'+Ext.encode(parms)+',"orderQueueId":"'+me.runTime.getOrderQueueId()+'"}';
    	
    	Ext.Ajax.request({
    		method:'PUT',
	        jsonData:obj,
    		   url : applicationContext+'/rest/orderlinedetails/variablebulkupdate',
    		   success : function(response, opts) {
		        	AOC.util.Helper.fadeoutMessage('Success',AOCLit.updateOrdLineMsg);
			  		//Ext.Msg.alert('','Order line successfully updated');
		          	Ext.getBody().unmask();
			  		me.getView().store.load();
		        },
		        failure: function(response, opts) {
		        	Ext.getBody().unmask();
	          }
    		  }); 
    	}
    		
    	});
    	}
    }
})