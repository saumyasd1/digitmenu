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
                		if(item!=qtyVariableLabel)
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
    updateOrderLine:function(editor, context, eOpts){
    	var ctx = context,me=this,
        idx = ctx.rowIdx,
        currentRecord = ctx.store.getAt(idx),parms='';
    	var obj=currentRecord.getChanges( ) ;
    	obj.id=currentRecord.id;
    	var insertBillAddress=false,insertShipAddress=false;
    	var runTime = AOC.config.Runtime;
    	if(idx==0){
    		if(currentRecord.isModified('oracleBilltoSiteNumber') &&  currentRecord.get('oracleBilltoSiteNumber')!=null && currentRecord.get('oracleBilltoSiteNumber')!='' && currentRecord.getModified('oracleBilltoSiteNumber')==''){
    			insertBillAddress=true;
    	  }
    		if(currentRecord.isModified('oracleShiptoSiteNumber') &&  currentRecord.get('oracleShiptoSiteNumber')!=null && currentRecord.get('oracleShiptoSiteNumber')!='' && currentRecord.getModified('oracleShiptoSiteNumber')==''){
    			insertShipAddress=true;
    		}
		}
		var obj='{"insertBillAddress":'+insertBillAddress+',"insertShipAddress":'+insertShipAddress+',"data":'+Ext.encode(Ext.encode(obj))+',"updateAll":false,"orderQueueId":"'+runTime.getOrderQueueId()+'"}';
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
    },
    outerGridBulkUpdate:function(editorPlugin,editor,context){
    	editorPlugin.suspendEvent('edit');
    	editorPlugin.completeEdit();
      editorPlugin.resumeEvent('edit');
      var ctx = editorPlugin.context,
          idx = ctx.rowIdx,
          currentRecord = ctx.store.getAt(idx);
      var obj = currentRecord.getChanges();
      var insertBillAddress=false,insertShipAddress=false;
  	var runTime = AOC.config.Runtime;
  	if(idx==0){
  		if(currentRecord.isModified('oracleBilltoSiteNumber') &&  currentRecord.get('oracleBilltoSiteNumber')!=null && currentRecord.get('oracleBilltoSiteNumber')!=''&& currentRecord.getModified('oracleBilltoSiteNumber')==''){
  			insertBillAddress=true;
  	  }
  		if(currentRecord.isModified('oracleShiptoSiteNumber') &&  currentRecord.get('oracleShiptoSiteNumber')!=null && currentRecord.get('oracleShiptoSiteNumber')!=''&& currentRecord.getModified('oracleShiptoSiteNumber')==''){
  			insertShipAddress=true;
  		}
		}
		var obj='{"insertBillAddress":'+insertBillAddress+',"insertShipAddress":'+insertShipAddress+',"data":' + Ext.encode(Ext.encode(obj)) + ',"updateAll":true,"orderQueueId":"' + runTime.getOrderQueueId() + '"}';
      Ext.Ajax.request({
          method: 'PUT',
          jsonData: obj,
          url: applicationContext + '/rest/orderLines/bulkupdate',
          success: function(response, opts) {
              Ext.Msg.alert('', 'Order line successfully updated');
              Ext.getBody().unmask();
              ctx.store.load();
          },
          failure: function(response, opts) {
              Ext.getBody().unmask();
          }
      });
    },
    outerGridBeforeEditEvent:function(obj,context){
    	if(!this.runTime.getAllowOrderLineEdit())
    		return false;
    	var record=context.record,grid=this.getView();
		var store=grid.store;
		var i=store.find('id',record.id);
    	if(i==0){
    			grid.editingPlugin.editor.form.findField('oracleBilltoSiteNumber').enable();
    			grid.editingPlugin.editor.form.findField('billToContact').enable();
    			grid.editingPlugin.editor.form.findField('billToAddress1').enable();
    			grid.editingPlugin.editor.form.findField('billToAddress2').enable();
    			grid.editingPlugin.editor.form.findField('billToAddress3').enable();
    			grid.editingPlugin.editor.form.findField('billToCity').enable();
    			grid.editingPlugin.editor.form.findField('billToCountry').enable();
    			grid.editingPlugin.editor.form.findField('billToState').enable();
    			grid.editingPlugin.editor.form.findField('billToZip').enable();
    			grid.editingPlugin.editor.form.findField('billToEmail').enable();
    			grid.editingPlugin.editor.form.findField('billToFax').enable();
    			grid.editingPlugin.editor.form.findField('billToTelephone').enable();
    			grid.editingPlugin.editor.form.findField('oracleShiptoSiteNumber').enable();
    			grid.editingPlugin.editor.form.findField('shipToContact').enable();
    			grid.editingPlugin.editor.form.findField('shipToAddress1').enable();
    			grid.editingPlugin.editor.form.findField('shipToAddress2').enable();
    			grid.editingPlugin.editor.form.findField('shipToAddress3').enable();
    			grid.editingPlugin.editor.form.findField('shipToCity').enable();
    			grid.editingPlugin.editor.form.findField('shipToCountry').enable();
    			grid.editingPlugin.editor.form.findField('shipToState').enable();
    			grid.editingPlugin.editor.form.findField('shipToZip').enable();
    			grid.editingPlugin.editor.form.findField('shipToEmail').enable();
    			grid.editingPlugin.editor.form.findField('shipToFax').enable();
    			grid.editingPlugin.editor.form.findField('shipToTelephone').enable();
    	}else{
    		grid.editingPlugin.editor.form.findField('oracleBilltoSiteNumber').disable();
			grid.editingPlugin.editor.form.findField('billToContact').disable();
			grid.editingPlugin.editor.form.findField('billToAddress1').disable();
			grid.editingPlugin.editor.form.findField('billToAddress2').disable();
			grid.editingPlugin.editor.form.findField('billToAddress3').disable();
			grid.editingPlugin.editor.form.findField('billToCity').disable();
			grid.editingPlugin.editor.form.findField('billToCountry').disable();
			grid.editingPlugin.editor.form.findField('billToState').disable();
			grid.editingPlugin.editor.form.findField('billToZip').disable();
			grid.editingPlugin.editor.form.findField('billToEmail').disable();
			grid.editingPlugin.editor.form.findField('billToFax').disable();
			grid.editingPlugin.editor.form.findField('billToTelephone').disable();
			grid.editingPlugin.editor.form.findField('oracleShiptoSiteNumber').disable();
			grid.editingPlugin.editor.form.findField('shipToContact').disable();
			grid.editingPlugin.editor.form.findField('shipToAddress1').disable();
			grid.editingPlugin.editor.form.findField('shipToAddress2').disable();
			grid.editingPlugin.editor.form.findField('shipToAddress3').disable();
			grid.editingPlugin.editor.form.findField('shipToCity').disable();
			grid.editingPlugin.editor.form.findField('shipToCountry').disable();
			grid.editingPlugin.editor.form.findField('shipToState').disable();
			grid.editingPlugin.editor.form.findField('shipToZip').disable();
			grid.editingPlugin.editor.form.findField('shipToEmail').disable();
			grid.editingPlugin.editor.form.findField('shipToFax').disable();
			grid.editingPlugin.editor.form.findField('shipToTelephone').disable();
    	}
    },
    innerGridBeforeEditEvent:function(context){
    	if(!this.runTime.getAllowOrderLineEdit())
    		return false;
    	var record=context.record,grid=context.grid,
    	level=record.get('level'),variablefieldname=record.get('variablefieldname');
    	if(variablefieldname==qtyVariableLabel)
    		return false;
    	if(level==fiberLevel){
    		grid.editingPlugin.editor.form.findField('fiberPercent').enable();
    	}else
    		grid.editingPlugin.editor.form.findField('fiberPercent').disable();
    	return true;
    }
})