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
    			        rootProperty: 'orderLine'
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
				listeners:{ 
			 	      close:function(obj,eOpts){
			 	    	 var orderline=Ext.ComponentQuery.query('#orderlineexpandablegrid')[0];
			 	    	     orderline.store.load();
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
   	    bulkUpdate.setText('<b>Order Queue</b>');
    	var panel=Ext.ComponentQuery.query('#orderQueueViewItemId1')[0];
        panel.getLayout().setActiveItem(0);
        var ordeQueueGrid=panel.down('#OrderQueueGridItemId');
        var currentRecord=this.runTime.getOrderQueueActiveRecord();
        var row = ordeQueueGrid.getView().getRow(currentRecord);
        var el = Ext.fly(row);
        el.highlight("#c1ddf1", {
            attr: "backgroundColor",
            duration: 5000
        });
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
    	for(i=0;i<store.getCount();i++){
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
    	
    },
    validateOrderLine:function(){
    	Ext.getBody().mask('Validating....');
    	var id=this.runTime.getOrderQueueId(),me=this;
    	Ext.Ajax.request({
    		method:'GET',
    		   url : applicationContext+'/rest/router/orderqueue/'+id,
		        success : function(response, opts) {
		        	var jsonValue=Ext.decode(response.responseText);
		        	var status=jsonValue.status;
		        	if(status=='success')
		        		Ext.Msg.alert('','Order was successfully validated');
		        	else
		        		Ext.Msg.alert('','An error occured during validation process. Please contact your system Administartor for further information.');
			  		Ext.getBody().unmask();
			  		me.getView().store.load();
		        },
		        failure: function(response, opts) {
		        	Ext.getBody().unmask();
	          }
    		  }); 
    },
    viewSalesOrder:function(){
    	Ext.getBody().mask('Loading....');
    	var id=this.runTime.getOrderQueueId(),me=this,
    	salesOrderCount=this.runTime.getSalesOrderCount();
    	var proceed=true;
    	if(salesOrderCount==0){
    		Ext.Ajax.request({
        		method:'GET',
        		async:false,
     		    url : applicationContext+'/rest/router/salesorder/'+id,
     		    success : function(response, opts) {
     		    	var jsonValue=Ext.decode(response.responseText);
 		        	var status=jsonValue.status;
 		        	if(status=='success'){
 		        		proceed=true;
 		        	}
 		        	else{
 		        		Ext.Msg.alert('','An error occured during validation process. Please contact your system Administartor for further information.');
 		        		proceed=false;
 		        		Ext.getBody().unmask();
 		        	}
		        },
		        failure: function(response, opts) {
		        	proceed=false;
		        	Ext.Msg.alert('','An error occured during validation process. Please contact your system Administartor for further information.');
		        	Ext.getBody().unmask();
	          }
    		});
    	}
    	if(proceed){
    		var currentRecord=this.runTime.getOrderQueueActiveRecord();
    	var owner=me.getView().ownerCt;
		   var store=Ext.create('AOC.store.SalesOrderStore', {
				proxy : {
					type : 'rest',
					 url : applicationContext+'/rest/salesorders/order/'+id,
					reader:{
				        type:'json', 
				        rootProperty: 'ArrayList'
				    }
			}
			});
		   owner.insert({
			   	xtype:'salesrrderexpandablegrid',
			    flex:1,
			    store:store
		   });
		   var bulkUpdate=Ext.ComponentQuery.query('#bulkUpdateItemId')[0];
		   bulkUpdate.setText('<b>Sales Order</b> ( <b>Partner Name</b> : '+currentRecord.get('PartnerName')+' <b>RBO</b> : '+currentRecord.get('RBOName')+
 				   ' <b>Product Line</b> : '+currentRecord.get('productLineType')+' <b>Subject</b> : '+currentRecord.get('Subject')
 				   +' <b>Date Received</b> : '+currentRecord.get('receivedDate')+')');
		   owner.getLayout().setActiveItem(2); 
		   Ext.getBody().unmask();
    	}
    },
    updateOrderLine:function(editor, context, eOpts){
    	var ctx = context,me=this,
        idx = ctx.rowIdx,
        currentRecord = ctx.store.getAt(idx),parms='';
    	var obj=currentRecord.getChanges( ) ;
    	obj.id=currentRecord.id;
    	var isAddressModified=false;
    	var runTime = AOC.config.Runtime;
    	if(idx==0){
			if(currentRecord.isModified('billToAddress1') || currentRecord.isModified('billToAddress2') ||currentRecord.isModified('billToAddress3')||
				currentRecord.isModified('billToCity')|| currentRecord.isModified('billToState')|| currentRecord.isModified('billToZip')||
				currentRecord.isModified('billToCountry')|| currentRecord.isModified('billToTelephone')|| currentRecord.isModified('billToFax')||
				currentRecord.isModified('oracleBilltoSiteNumber')|| currentRecord.isModified('oracleBilltoSiteNumber'))
					isAddressModified=true;
		}
		var obj='{"isAddressModified":'+isAddressModified+',"data":'+Ext.encode(Ext.encode(obj))+',"updateAll":false,"orderQueueId":"'+runTime.getOrderQueueId()+'"}';
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
    updateOrderLinedetail:function(editor, context, eOpts){
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
    		   url : applicationContext+'/rest/orderlinedetails/variablebulkupdate',
		        success : function(response, opts) {
			  		Ext.Msg.alert('','Order line Detail successfully updated');
			  		Ext.getBody().unmask();
			  		me.getView().store.load();
		        },
		        failure: function(response, opts) {
		        	Ext.getBody().unmask();
	          }
    		  });
    }
})