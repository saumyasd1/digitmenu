Ext.define('AOC.view.orderqueue.BulkUpdateController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.orderlinebulkupdate',
    requires : ['AOC.model.VariableHeaderModel'],
    saveOrderLine:function(){ // this function is called when the orline line is updated by bulk update
    	var mask = Ext.getBody().mask('Loading');
    	mask.dom.style.zIndex = '99999';
    	var grid=this.getView(),me=this;
    	var store=grid.store,
    	parms ='';
    	var i=0, isAddressModified=false;
    	var updatedRecords=store.getModifiedRecords();
    	Ext.each(updatedRecords,function(currentRecord){
    		i=store.find('id',currentRecord.id);
    		if(i==0){
    				if(currentRecord.isModified('oracleBilltoSiteNumber') ||  currentRecord.isModified('oracleShiptoSiteNumber')){
    					isAddressModified=true;
    			}
    		}
    		var obj=currentRecord.getChanges( ) ;
    		obj.id=currentRecord.id;
    		if(parms=='')
    			parms=parms+Ext.encode(obj);
    		else 
    			parms=parms+'@@@'+Ext.encode(obj);
    		  
    		 });
    	var obj='{"isAddressModified":'+isAddressModified+',"data":'+Ext.encode(parms)+'}';
    	Ext.Ajax.request({
    		method:'PUT',
	        jsonData:obj,
    		   url : applicationContext+'/rest/orderLines/bulkupdate',
		        success : function(response, opts) {
			  		Ext.Msg.alert('','Order line successfully updated');
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
		Ext.Msg.confirm('', 'Are you sure you want to cancel the changes?',function(btn){
			  if(btn=='yes'){
				  me.getView().getStore().load();
			  }
		});
    },
    saveOrderLineDetails:function(){
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
    	var obj='{"data":'+Ext.encode(parms)+'}';
    	Ext.Ajax.request({
    		method:'PUT',
	        jsonData:obj,
    		   url : applicationContext+'/rest/orderlinedetails/variablebulkupdate',
		        success : function(response, opts) {
			  		Ext.Msg.alert('','Order line successfully updated');
			  		Ext.getBody().unmask();
			  		me.getView().store.load();
		        },
		        failure: function(response, opts) {
		        	Ext.getBody().unmask();
	          }
    		  }); 
    	
    }
})