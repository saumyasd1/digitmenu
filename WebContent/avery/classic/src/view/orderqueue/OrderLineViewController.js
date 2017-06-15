Ext.define('AOC.view.orderqueue.OrderLineViewController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.orderline',
    requires : ['AOC.view.orderqueue.BulkUpdateOrderLineGrid','AOC.view.orderqueue.BulkUpdateVariableHeaderrGrid','AOC.model.VariableHeaderModel','AOC.util.Helper'],
    runTime : AOC.config.Runtime,

    updateOrderLine:function(editor, context, eOpts){
    	Ext.getBody().mask('Saving...');
    	
    	var me = this,
    		ctx = context,
        	idx = ctx.rowIdx,
        	rowIdx = ctx.rowIdx,
        	currentRecord = ctx.store.getAt(idx),
        	obj = currentRecord.getChanges(),
        	insertBillAddress = false,
        	insertShipAddress = false,
        	runTime = AOC.config.Runtime;
    	
    	obj.id = currentRecord.id;
    	
    	if(idx == rowIdx){
    		if(currentRecord.isModified('oracleBillToSiteNumber') &&  currentRecord.get('oracleBillToSiteNumber')!=null && currentRecord.get('oracleBillToSiteNumber')!='' && currentRecord.getModified('oracleBillToSiteNumber')==''){
    			insertBillAddress=true;
    	  }
    		if(currentRecord.isModified('oracleShipToSiteNumber') &&  currentRecord.get('oracleShipToSiteNumber')!=null && currentRecord.get('oracleShipToSiteNumber')!='' && currentRecord.getModified('oracleShipToSiteNumber')==''){
    			insertShipAddress=true;
    		}
		}
    	
		var params='{"insertBillAddress":'+insertBillAddress+',"insertShipAddress":'+insertShipAddress+',"data":'+Ext.encode(Ext.encode(obj))+',"updateAll":false,"orderQueueId":"'+runTime.getOrderQueueId()+'","partnerId":"'+runTime.getCurrentOrderQueuePartnerId()+'","systemId":"'+runTime.getCurrentOrderQueueDefaultSystem()+'","siteId":"'+runTime.getCurrentOrderQueueSiteId()+'","orgCodeId":"'+runTime.getCurrentOrderQueueOrgCodeId()+'"}';
		
		Ext.Ajax.request({
			method:'PUT',
			jsonData:params,
			url : applicationContext+'/rest/orderLines/bulkupdate',
			success : function(response, opts) {
				//AOC.util.Helper.fadeoutMessage('Success', AOCLit.updateOrdLineMsg);
				Helper.showToast('success','Order line successfully updated');
				Ext.getBody().unmask();
				me.getView().openedRecordIndex ='';
				Helper.loadOrderLineGridStore(me.getView().store, runTime.getOrderQueueId());
		  		me.getView().view.refresh();
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
		        	Helper.showToast('success','Order line Detail successfully updated');
			  		Ext.getBody().unmask();
			  		Helper.loadOrderLineGridStore(me.getView().store, runTime.getOrderQueueId());
			  		me.getView().view.refresh();
		        },
		        failure: function(response, opts) {
		        	Ext.getBody().unmask();
		        }
		  });
    },
    outerGridBulkUpdate:function(editorPlugin, editor, context){
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
			            rowIdx = ctx.rowIdx,
			            currentRecord = ctx.store.getAt(idx),
			            obj = currentRecord.getChanges(),
			    		insertBillAddress=false,
			    		insertShipAddress=false,
			        	runTime = AOC.config.Runtime;
		        	var partnerId = runTime.getCurrentOrderQueuePartnerId();
		        	
		        	if(idx == rowIdx){
		          		if(currentRecord.isModified('oracleBillToSiteNumber') &&  currentRecord.get('oracleBillToSiteNumber')!=null && currentRecord.get('oracleBillToSiteNumber')!=''&& currentRecord.getModified('oracleBillToSiteNumber')==''){
		          			insertBillAddress=true;
		          		}
		          		if(currentRecord.isModified('oracleShipToSiteNumber') &&  currentRecord.get('oracleShipToSiteNumber')!=null && currentRecord.get('oracleShipToSiteNumber')!=''&& currentRecord.getModified('oracleShipToSiteNumber')==''){
		          			insertShipAddress=true;
		          		}
		              }
		        	var obj='{"insertBillAddress":'+insertBillAddress+',"insertShipAddress":'+insertShipAddress+',"data":' + Ext.encode(Ext.encode(obj)) + ',"updateAll":true,"orderQueueId":"' + runTime.getOrderQueueId() + '","partnerId":"'+runTime.getCurrentOrderQueuePartnerId()+'","systemId":"'+runTime.getCurrentOrderQueueDefaultSystem()+'","siteId":"'+runTime.getCurrentOrderQueueSiteId()+'","orgCodeId":"'+runTime.getCurrentOrderQueueOrgCodeId()+'"}';
		            Ext.Ajax.request({
		                method: 'PUT',
		                jsonData: obj,
		                url: applicationContext + '/rest/orderLines/bulkupdate',
		                success: function(response, opts) {
		                	Helper.showToast('success','Order line successfully updated');
		                    Ext.getBody().unmask();
		                    ctx.grid.openedRecordIndex ='';
		                    Helper.loadOrderLineGridStore(ctx.store, runTime.getOrderQueueId());
		                    ctx.view.refresh();
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
			len = columns.length,
			gridView = me.getView();
    	
    	editor.grid.lastScrollLeftPosition = gridView.view.normalView.el.dom.scrollLeft;
    	
    	if(orderQueueStatus == AOCLit.waitingForCSRStatusOrderQueue 
    			&& (currentRecordStatus == AOCLit.waitingForCSRStatusOrderLine
    				|| currentRecordStatus == AOCLit.mandatoryFieldMissingStatusOrderLine
    					|| currentRecordStatus == AOCLit.noAdditionalDataFoundStatusOrderLine
    						|| currentRecordStatus == AOCLit.customerQtyMismatchStatusOrderline)){
    		
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
    	
    	if(variablefieldname == 'size' || variablefieldname == 'size chart'){
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
    	var me = this,
    		view = me.getView(),
    		currentRecord = view.editingPlugin.context.record,
    		systemId = 0;
    	
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
			variableFieldStore.getAt(1).set(recordRef,valueToBeSet);
		}
	},
	comboColumnRenderer:function(v,h,l,k){
		var view=this.getView();
		
		if(!Ext.isEmpty(v)){
			var store = h.column.config.editor.store;
			if(store){
				var index = store.find("variableFieldName",v,'',false,false,true);
				if(index == -1){
					if(l.get('status') == AOCLit.waitingForCSRStatusOrderLine){
						view.invalidComboValid = true;
						h.style = AOCLit.cellColor; // change cell color if value is not exist in store
					}
				}
			}else{
				if(l.get('status') == AOCLit.waitingForCSRStatusOrderLine){
					view.invalidComboValid = true;
					h.style = AOCLit.cellColor; //change cell color if value is not exist in store
				}
			}
		}
		return v;
	},
	divisionForInterfaceERPORGColumnRenderer:function(v,h,l,k){
		var orgCodeName = '';
		var view = this.getView();
		if(!Ext.isEmpty(v)){
			h.column.config.editor.store = AOCRuntime.getStoreERPORG();
			var store = h.column.config.editor.store;
			
			if(store){
				var index = store.find("id",v);
				if(index == -1){
					if(l.get('status') == AOCLit.waitingForCSRStatusOrderLine){
						view.invalidComboValid=true;
						h.style = AOCLit.cellColor;//change cell color if value is not exist in store
					}
				}else{
					orgCodeName = store.getAt(index).get('name');
				}
			}else{
				if(l.get('status') == AOCLit.waitingForCSRStatusOrderLine){
					view.invalidComboValid=true;
					h.style = AOCLit.cellColor;//change cell color if value is not exist in store
				}
			}
		}
		return orgCodeName;
	},
	onComboFocus:function(field){
		var me = this,
		   	view = me.getView(),
		   	editor = view.editingPlugin,
		   	context = editor.context,
		   	rowIdx = context.rowIdx,
		   	fieldStore = field.store,
		   	fieldName = context.field,
		   	currentValue = field.getValue();
		
		if(!Ext.isEmpty(context.record.get(fieldName))){
			var index = fieldStore.find("variableFieldName", currentValue,'', false, false, true);
			if(index == -1){
				field.setValue('');
			  	context.store.getAt(rowIdx).set(fieldName,'');
			  
			}
		  }
//		if(context.grid && !Ext.isEmpty(context.grid.lastScrollLeftPosition)){
//			context.grid.view.el.dom.scrollLeft = context.grid.lastScrollLeftPosition;
//        }
	},
	onFocusEnter:function(field, e){
		var me = this,
		   	view = me.getView(),
		   	editor = view.editingPlugin,
		   	context = editor.context;
		
		context.grid.lastScrollLeftPosition = view.view.normalView.el.dom.scrollLeft;;
		if(context.grid && !Ext.isEmpty(context.grid.lastScrollLeftPosition)){
			context.grid.view.el.dom.scrollLeft = context.grid.lastScrollLeftPosition;
        }
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
	},
	onSelectDate: function(df){
		var view = this.getView(),
		   	editor = view.editingPlugin,
		   	context = editor.context,
			fieldName = context.column.text,
			orderDate = context.record.get('orderedDate');
		
		if(new Date(Ext.util.Format.dateRenderer()(orderDate)) > new Date(Ext.util.Format.dateRenderer()(df.getValue()))){
			Ext.Msg.alert('Warning',fieldName + ' can not be less than Ordered date ');
			df.setValue(orderDate);
		}
	},
	onShowColumnBtnClick:function(btn){
		var me = this,
			view = me.getView(),
			columns = view.columns,
			len = columns.length;
		
		for(var i=0; i<len;i++){
			if(btn.pressed){
				btn.setText('Hide Column');
				if(!columns[i].isVisible() && columns[i].type == 'address'){
					columns[i].show();
				}
			}else{
				btn.setText('Show Column');
				if(columns[i].type == 'address'){
					columns[i].hide();
				}
			}
		}
	}
});