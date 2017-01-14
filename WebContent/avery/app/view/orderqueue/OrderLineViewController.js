Ext.define('AOC.view.orderqueue.OrderLineViewController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.orderline',
    requires : ['AOC.view.orderqueue.BulkUpdateOrderLineGrid','AOC.view.orderqueue.BulkUpdateVariableHeaderrGrid','AOC.model.VariableHeaderModel','AOC.util.Helper'],
    runTime : AOC.config.Runtime,
//    getUpdateScreen:function(){
//    	var me=this;
//    	 var viwport=Ext.ComponentQuery.query('#viewportitemid')[0];
//      	 var height=viwport.getHeight()-20;
//      	 var width=viwport.getWidth()-20;
//      	 var id=this.runTime.getOrderQueueId();
//      	 var radioGroupValue=this.lookupReference('radioGroup').getValue().rb,store,win,innerGridType,comboValue='';
//      	 if(radioGroupValue=='2'){
//      		var comboField=this.lookupReference('variableFieldCombo');
//      		comboValue=comboField.getValue();
//      		if(comboValue=='' || comboValue==null){
//      			Ext.Msg.alert('', AOCLit.selectValueDrpMsg);
//      			return false;
//      		}
//      		innerGridType='bulkUpdateVariableHeaderrGrid';
//      		height=height-180;
//      		width=width-240;
//      		store=Ext.create('AOC.store.OrderLineStore', {
//      			model:'AOC.model.VariableHeaderModel',
//    			proxy : {
//    				type : 'rest',
//    				url : applicationContext+'/rest/orderlinedetails/order/'+id+'/'+comboValue,
//    				reader:{
//    			        type:'json', 
//    			        rootProperty: 'OrderLineDetail'
//    			    }
//    			}
//    		}); 
//      	 }else{
//      		store=Ext.create('AOC.store.OrderLineStore', {
//    			proxy : {
//    				type : 'rest',
//    				url : applicationContext+'/rest/orderLines/order/'+id,
//    				reader:{
//    			        type:'json', 
//    			        rootProperty: 'orderLine'
//    			    }
//    		}
//    		});
//      		innerGridType='bulkupdateorderlinegrid';
//      	 }
//		   var win=Ext.create('AOC.view.base.BaseWindow',{
//			 	height:height,
//				width:width,
//				layout: 'fit',
//				draggable: false,
//				modal:true,
//				listeners:{ 
//			 	      close:function(obj,eOpts){
//			 	    	 var orderline=Ext.ComponentQuery.query('orderlineexpandablegrid')[0];
//			 	    	     orderline.store.load();
//			 	}
//				},
//				items:[{
//					xtype:innerGridType,
//					store:store,
//					variableColumnName:comboValue
//				}]
//		   });
//		   win.show();
//    },
//    radioButtonClick:function(obj,newValue,oldValue){
//    	var comboField=this.lookupReference('variableFieldCombo');
//    	if(newValue.rb=='2'){
//    		Ext.getBody().mask('Loading..');
//    		var id= this.runTime.getOrderQueueId();
//    		Ext.Ajax.request( {
//    			method:'GET',
//    			url : applicationContext+'/rest/orderlinedetails/order/'+id,
//		        success : function(response, opts) {
//		        	var jsonValue=Ext.decode(response.responseText);
//		        	var serviceStoreData = [];
//		        	if(jsonValue.length>0){
//		        	jsonValue.forEach(function(item){
//                		var service = [item];
//                		if(item.toLowerCase()!=qtyVariableLabel && item.toLowerCase().indexOf(sizeVariableLabel)==-1)
//                			serviceStoreData.push(service);
//                	});
//		        	var serviceStore =  Ext.create('Ext.data.ArrayStore',{
//                 	   		fields : ['variableFieldName'],	
//            	            data : serviceStoreData
//                    });
//		        	comboField.bindStore(serviceStore);
//		        	}
//		        	comboField.setVisible(true);
//		        	Ext.getBody().unmask();
//		        },
//		        failure: function(response, opts) {
//		        	Ext.getBody().unmask();
//	          }
//	  	});
//    	}else{
//    		comboField.setVisible(false);
//    	}
//    },
    updateOrderLine:function(editor, context, eOpts){
    	Ext.getBody().mask('Saving...');
    	
    	var me = this,
    		ctx = context,
        	idx = ctx.rowIdx,
        	currentRecord = ctx.store.getAt(idx),
        	obj = currentRecord.getChanges(),
        	insertBillAddress = false,
        	insertShipAddress = false,
        	runTime = AOC.config.Runtime;
    	
    	obj.id = currentRecord.id;
    	
    	if(idx == 0){
    		if(currentRecord.isModified('oracleBilltoSiteNumber') &&  currentRecord.get('oracleBilltoSiteNumber')!=null && currentRecord.get('oracleBilltoSiteNumber')!='' && currentRecord.getModified('oracleBilltoSiteNumber')==''){
    			insertBillAddress=true;
    	  }
    		if(currentRecord.isModified('oracleShiptoSiteNumber') &&  currentRecord.get('oracleShiptoSiteNumber')!=null && currentRecord.get('oracleShiptoSiteNumber')!='' && currentRecord.getModified('oracleShiptoSiteNumber')==''){
    			insertShipAddress=true;
    		}
		}
    	
		var params='{"insertBillAddress":'+insertBillAddress+',"insertShipAddress":'+insertShipAddress+',"data":'+Ext.encode(Ext.encode(obj))+',"updateAll":false,"orderQueueId":"'+runTime.getOrderQueueId()+'"}';
		
		Ext.Ajax.request({
			method:'PUT',
			jsonData:params,
			url : applicationContext+'/rest/orderLines/bulkupdate',
			success : function(response, opts) {
				//AOC.util.Helper.fadeoutMessage('Success', AOCLit.updateOrdLineMsg);
				Ext.Msg.alert('Success','Order line successfully updated');
				Ext.getBody().unmask();
				me.getView().store.load();
			},
			failure: function(response, opts) {
				Ext.getBody().unmask();
			}
		});
    },
    updateOrderLinedetail:function(editor, context, eOpts){
    	Ext.getBody().mask('Saving...');
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
		        	AOC.util.Helper.fadeoutMessage('Success',AOCLit.updateOrdLineDetailMsg);
			  		//Ext.Msg.alert('','Order line Detail successfully updated');
			  		Ext.getBody().unmask();
			  		me.getView().store.load();
		        },
		        failure: function(response, opts) {
		        	Ext.getBody().unmask();
	          }
    		  });
    },
    outerGridBulkUpdate:function(editorPlugin,editor,context){
    	Ext.Msg.show({
		    title:'Update All',
		    message: 'Are you sure, you want to update for all?',
		    buttons: Ext.Msg.YESNO,
		    icon: Ext.Msg.QUESTION,
		    fn: function(btn) {
		        if (btn === 'yes') {
		        	Ext.getBody().mask('Saving...');
		        	editorPlugin.suspendEvent('edit');
		        	editorPlugin.completeEdit();
		        	editorPlugin.resumeEvent('edit');
		        	
		        	var ctx = editorPlugin.context,
			            idx = ctx.rowIdx,
			            currentRecord = ctx.store.getAt(idx),
			            obj = currentRecord.getChanges(),
			    		insertBillAddress=false,
			    		insertShipAddress=false,
			        	runTime = AOC.config.Runtime;
		        	
		        	if(idx == 0){
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
		              	  //AOC.util.Helper.fadeoutMessage('Success',AOCLit.updateOrdLineMsg);
		                   Ext.Msg.alert('Success', 'Order line successfully updated');
		                    Ext.getBody().unmask();
		                    ctx.store.load();
		                },
		                failure: function(response, opts) {
		                    Ext.getBody().unmask();
		                }
		            });
		        } 
		    }
		});
    },
    outerGridBeforeEditEvent:function(editor, context){
    	var me = this,
    		orderQueueStatus = me.runTime.getOrderQueueStatus(),
    		rowIdx = context.rowIdx,
    		currentRecord = context.store.getAt(rowIdx),
    		currentRecordStatus = currentRecord.get('status'),
    		columns = editor.grid.columns,
			len = columns.length;;
    	
    	if(orderQueueStatus == AOCLit.waitingForCSRStatusOrderQueue 
    			&& (currentRecordStatus == AOCLit.waitingForCSRStatusOrderLine
    				|| currentRecordStatus == AOCLit.mandatoryFieldMissingStatusOrderLine
    					|| currentRecordStatus == AOCLit.noAdditionalDataFoundStatusOrderLine)){
    		
    		for(var i = 0; i< len; i++){
    			columns[i].getEditor().enable();
    		}
    		return true;
    	}
    	//if disable all fields except status field for current record status except above
    	if(orderQueueStatus == AOCLit.waitingForCSRStatusOrderQueue && context.field == 'status'){
    		for(var i = 0; i< len; i++){
    			if(columns[i].getEditor().dataIndex == 'status'){
    				columns[i].getEditor().enable();
    			}else{
    				columns[i].getEditor().disable();
    			}
    		}
    		return true;
    	}
    	return false;
    },
    innerGridBeforeEditEvent:function(context){
    	if(!this.runTime.getAllowOrderLineEdit()){
    		return false;
    	}
    	
    	var record = context.record,
    		grid = context.grid,
    		level = record.get('level'),
    		variablefieldname = record.get('variableFieldName').toLowerCase();
    	
    	if(variablefieldname == qtyVariableLabel || variablefieldname.indexOf(sizeVariableLabel)!=-1){
    		return false;
    	}
    	if(level == AOCLit.fiberLevel){
    		grid.editingPlugin.editor.form.findField('fiberPercent').enable();
    	}else{
    		grid.editingPlugin.editor.form.findField('fiberPercent').disable();
    	}
    	return true;
    },
    onerporgSelectChange:function(cmp,record){
    	Ext.getBody().mask('Setting...');
    	var currentRecord=cmp.ownerCt.context.record,view=this.getView(),me=this,systemId=0;
    	var response = Ext.Ajax.request({
			async: false,
			url: applicationContext+'/rest/orginfo/orgsysteminfo/'+me.runTime.getOrderLineCurrenProductLine()+'/'+record.get('id')
		});
		var jsonValue=Ext.decode(response.responseText),refs=view.refs;
		if(jsonValue.length > 0){
			
			var obj=jsonValue[0];
			systemId=obj.systemId;
			me.attachCombo('freightTerms',systemId,record.get('id'),'freightTermscombo',obj.freightTerm,'freightTerms');
			me.attachCombo('splitShipset',systemId,record.get('id'),'splitShipsetCombo',obj.splitShipSetBy,'splitShipset');
			me.attachCombo('shippingMethod',systemId,record.get('id'),'shippingMethodCombo',obj.shippingMethod,'shippingMethod');
			
			me.attachCombo('EndCustomer',systemId,record.get('id'),'EndCustomerCombo',obj.shippingMethod,'EndCustomer');
			me.attachCombo('Ordertype',systemId,record.get('id'),'OrdertypeCombo',obj.shippingMethod,'Ordertype');
			me.attachCombo('APOType',systemId,record.get('id'),'APOTypeCombo',obj.shippingMethod,'APOType');
			//EndCustomerCombo
			//csrReferenceField
			currentRecord.set('divisionForInterfaceERPORG',record.get('id'));
			currentRecord.set('artworkhold',obj.artworkHold);
			currentRecord.set('CSR',obj.csrName);
			currentRecord.set('invoicelineInstruction',obj.invoiceNote);
			currentRecord.set('manufacturingNotes',obj.manufacturingNotes);
			currentRecord.set('packingInstruction',obj.packingInstruction);
			currentRecord.set('shipmark',obj.shippingMark);
			currentRecord.set('splitShipset',obj.splitShipSetBy);
			currentRecord.set('variableDataBreakdown',obj.variableDataBreakdown);
			currentRecord.set('shippingInstructions',obj.shippingInstruction);
			currentRecord.set('shippingMethod',obj.shippingMethod);
		}
		Ext.getBody().unmask();
    },
	attachCombo:function(variableName,systemId,orgId,referenceValue,valueToBeSet,recordRef){
		var variableFieldStore=AOC.util.Helper.loadDependendVariableComboStore(variableName,systemId,orgId),
		view=this.getView(),
		variableField=this.getView().lookupReference(referenceValue);
		variableField.bindStore(variableFieldStore);
		var index=variableFieldStore.find('variableFieldName',valueToBeSet);
		if(index!=-1){
			variableField.setValue(valueToBeSet);
			currentRecord.set(recordRef,valueToBeSet);
		}
	},
	comboColumnRenderer:function(v,h,l,k){
		var view=this.getView();
		if(!Ext.isEmpty(v)){
			var store=h.column.config.editor.store;
			if(store){
				var index=store.find("variableFieldName",v);
				if(index==-1){
					view.invalidComboValid=true;
					if(view.showInvalidCombo)
						h.style = AOCLit.cellColor;
				}
			}else{
				view.invalidComboValid=true;
				if(view.showInvalidCombo)
					h.style = AOCLit.cellColor;
			}
		}
		return v;
	},
	divisionForInterfaceERPORGColumnRenderer:function(v,h,l,k){
		var view=this.getView();
		if(!Ext.isEmpty(v)){
			var store=h.column.config.editor.store;
			if(store){
				var index=store.find("id",v);
				if(index==-1){
					view.invalidComboValid=true;
					if(view.showInvalidCombo)
						h.style = AOCLit.cellColor;
				}
				else{
					v=store.getAt(index).get('name');
				}
				
			}else{
				view.invalidComboValid=true;
				if(view.showInvalidCombo)
					h.style = AOCLit.cellColor;
			}
		}
		return '<div>'+v+'</div>';
	},
	
	onStatusSelect:function(combo){
		var value = combo.getValue(),
			grid = this.getView(),
			columns = grid.columns,
			len = columns.length;
		
		for(var i = 0; i< len; i++){
			if(value == AOCLit.waitingForCSRStatusOrderLine){
				columns[i].getEditor().enable();
			}else{
				if(columns[i].getEditor().dataIndex == 'status'){
    				columns[i].getEditor().enable();
    			}else{
    				columns[i].getEditor().disable();
    			}
			}
		}
	}
    
});