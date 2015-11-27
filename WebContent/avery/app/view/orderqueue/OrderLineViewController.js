Ext.define('AOC.view.orderqueue.OrderLineViewController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.orderline',
    requires : ['AOC.view.orderqueue.BulkUpdateOrderLineGrid','AOC.view.orderqueue.BulkUpdateVariableHeaderrGrid','AOC.model.VariableHeaderModel'],
    runTime : AOC.config.Runtime,
    getUpdateScreen:function(){
    	var me=this;
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
      		innerGridType='bulkUpdateVariableHeaderrGrid';
      		store=Ext.create('AOC.store.OrderLineStore', {
      			model:'AOC.model.VariableHeaderModel',
    			proxy : {
    				type : 'rest',
    				url : applicationContext+'/rest/orderlinedetails/order/'+id+'/'+comboValue,
    				reader:{
    			        type:'json', 
    			        rootProperty: 'OrderLineDetail'
    			    }
    			}
    		}); 
      	 }else{
      		store=Ext.create('AOC.store.OrderLineStore', {
    			proxy : {
    				type : 'rest',
    				url : applicationContext+'/rest/orderLines/order/'+id,
    				reader:{
    			        type:'json', 
    			        rootProperty: 'ArrayList'
    			    }
    		}
    		});
      		innerGridType='bulkupdateorderlinegrid';
      	 }
		   var win=Ext.create('Ext.window.Window',{
			 	height:height,
				width:width,
				title:"Bulk Update",
				layout: 'fit',
				draggable: false,
				modal:true,
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
   	     bulkUpdate.setText('<b>Order Queue</b>');
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
    saveOrderLine:function(){
    	var grid=this.getView(),me=this,insertAddess=false;
    	var store=grid.store,
    	parms ='';
    	var madatoryFieldEmpty=false,
    	currentRecord=null,
    	i=0, isAddressModified=false;
    	for(i=0;i<store.getCount ();i++){
    		currentRecord=store.getAt(i);
    		if(currentRecord.get('oracleBilltoSiteNumber')=='' || currentRecord.get('oracleShiptoSiteNumber')==''){
    			madatoryFieldEmpty=true;
    			break;
    		}
    		if(i==0){
    			if(currentRecord.isModified('billToAddress1') || currentRecord.isModified('billToAddress2') ||currentRecord.isModified('billToAddress3')||
    				currentRecord.isModified('billToCity')|| currentRecord.isModified('billToState')|| currentRecord.isModified('billToZip')||
    				currentRecord.isModified('billToCountry')|| currentRecord.isModified('billToTelephone')|| currentRecord.isModified('billToFax')||
    				currentRecord.isModified('oracleBilltoSiteNumber')|| currentRecord.isModified('oracleBilltoSiteNumber'))
    					isAddressModified=true;
    		}
    		if(currentRecord.dirty){
    			var obj=currentRecord.getChanges( ) ;
        		obj.id=currentRecord.id;
        		if(parms==''){
        			parms=parms+Ext.encode(obj);
        		}
        		else 
        			parms=parms+'@@@'+Ext.
        			encode(obj);
    		}
    	}
    	if(madatoryFieldEmpty){
    		alert('Either the Oracle BilltoSite or Oracle shiptoSite number is empty at record number '+parseInt(i)+1+'. Please fill the value before proceeding.');
    		return false;
    	}
    	var obj='{"isAddressModified":'+isAddressModified+',"data":'+Ext.encode(parms)+'}';
    	Ext.Ajax.request({
    		method:'PUT',
	        jsonData:obj,
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
    	Ext.Ajax.request({
    		method:'PUT',
	        jsonData:parms,
    		   url : applicationContext+'/rest/orderlinedetails/variablebulkupdate',
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