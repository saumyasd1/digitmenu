Ext.define('AOC.view.orderqueue.BulkUpdateController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.orderlinebulkupdate',
    requires : [
        'AOC.model.VariableHeaderModel'
    ],
    
    saveOrderLine:function(){ // this function is called when the orline line is updated by bulk update
    	var me = this,
			grid = this.getView(),
			store=grid.store,
			params ='',
			insertShipAddress = false,
			insertBillAddress = false,
			i = 0,
			orgCodeId = '',
			shipToAddress = '', 
			billToAddress = '', 
			billType = '', 
			shipType = '', 
			billToSiteNumber = '', 
			shipToSiteNumber = '', 
			billToAddress2 = '', 
			billToAddress3 = '', 
			shipToAddress = '', 
			shipToAddress2 = '', 
			shipToAddress3 = '', 
			shipToAddress = '';

    	if(grid.editingPlugin.editing){
    		grid.focus();
    	}
    	
    	var updatedRecords = store.getModifiedRecords();
    	
    	var billToCode = AOCRuntime.getCurrentDefaultBillToCode();
    	var shipToCode = AOCRuntime.getCurrentDefaultShipToCode();
    	var billshipcode = AOCRuntime.getBillshipRequired();
			
    	if(updatedRecords.length==0){
    		Helper.showToast('validation', AOCLit.noRecordsToUpdateMessage);
    		return;
    	}else{
    		Ext.Msg.confirm('', AOCLit.confirmBulkUpdateSave,function(btn){
    			if(btn == 'yes'){
    				Ext.each(updatedRecords, function(currentRecord){
    		    		i = store.find('id', currentRecord.id);
    		    		if(i == 0){
    		    			
    		    			if(billToCode == 'true' || billshipcode == false){
    		    				if(!Ext.isEmpty(currentRecord.get('oracleBillToSiteNumber')) 
    		    						&& currentRecord.isModified('oracleBillToSiteNumber')){
    		    	    			insertBillAddress = true;
    		    				}
    		    			}
    		    			if(shipToCode =='true' || billshipcode == false){
    		    	    		if(!Ext.isEmpty(currentRecord.get('oracleShipToSiteNumber')) 
    		    	    				&& currentRecord.isModified('oracleShipToSiteNumber')){
    		    	    			insertShipAddress = true;
    		    	    		}
    		    			}
    		    			
    		    			orgCodeId = me.getOrgCodeId(currentRecord.get('divisionForInterfaceERPORG'));
    		    			shipToAddress = currentRecord.get('shipToAddress1');
    		    			billToAddress = currentRecord.get('billToAddress1');
    		    			billType = currentRecord.isModified('oracleBillToSiteNumber');
    		    			shipType = currentRecord.isModified('oracleShipToSiteNumber');
    		    			billToSiteNumber = currentRecord.isModified('oracleBillToSiteNumber');
    		    			shipToSiteNumber = currentRecord.isModified('oracleShipToSiteNumber');
    		    			billToAddress2 = currentRecord.isModified('billToAddress2');
    		    			billToAddress3 = currentRecord.isModified('billToAddress3');
    		    			shipToAddress = currentRecord.isModified('shipToAddress1');
    		    			shipToAddress2 = currentRecord.isModified('shipToAddress2');
    		    			shipToAddress3 = currentRecord.isModified('shipToAddress3');
    		    			shipToAddress = currentRecord.isModified('shipToAddress1');
						}
    		    			
    		    		var obj = currentRecord.getChanges();
    		    		obj.id = currentRecord.id;
						
    		    		if(obj.orderedDate){
    		                obj.orderedDate = Ext.util.Format.date(obj.orderedDate, 'Y-m-d H:i:s');
    		            }
    		            if(obj.requestedDeliveryDate){
    		                obj.requestedDeliveryDate = Ext.util.Format.date(obj.requestedDeliveryDate, 'Y-m-d H:i:s');
    		            }
    		            if(obj.promiseDate){
    		                obj.promiseDate = Ext.util.Format.date(obj.promiseDate, 'Y-m-d H:i:s');
    		            }
    		            
    		    		if(params=='')
    		    			params = params + Ext.encode(obj);
    		    		else 
    		    			params = params + '@@@'+ Ext.encode(obj);
		    		 });
						
    				var values ={
						insertBillAddress:insertBillAddress,
						insertShipAddress:insertShipAddress,
						shipToAddress: shipToAddress, 
						billToAddress: billToAddress, 
						billType: billType, 
						shipType: shipType, 
						billToSiteNumber: billToSiteNumber, 
						shipToSiteNumber: shipToSiteNumber, 
						billToAddress2: billToAddress2, 
						billToAddress3: billToAddress3, 
						shipToAddress: shipToAddress, 
						shipToAddress2: shipToAddress2, 
						shipToAddress3: shipToAddress3, 
						shipToAddress: shipToAddress, 

						data:params,
						orderQueueId:AOCRuntime.getOrderQueueId(),
						partnerId:AOCRuntime.getCurrentOrderQueuePartnerId(),
						systemId:AOCRuntime.getCurrentOrderQueueDefaultSystem(),
						siteId:AOCRuntime.getCurrentOrderQueueSiteId(),
						orgCodeId:orgCodeId,
						lastModifiedBy:Helper.getLastModifiedBy()
    				}
    				
    		    	grid.mask(AOCLit.pleaseWait);
    		    	Ext.Ajax.request({
    		    		method:'PUT',
    			        jsonData:Ext.encode(values),
    			        url : applicationContext+'/rest/orderLines/bulkupdate',
				        success : function(response, opts) {
				        	grid.unmask();
				        	Helper.showToast('success', 'Order line successfully updated');
				        	Helper.loadOrderLineGridStore(me.getView().store, AOCRuntime.getOrderQueueId());
				        },
				        failure: function(response, opts) {
				        	grid.unmask();
						}
					});
    			}else{
    				grid.unmask();
    			}
    		});
    	}
    },
    getOrgCodeId:function(orgInfoId){
    	var orgStore = AOCRuntime.getStoreERPORG(),
    		orgCodeId;

		orgStore.each(function(orgRec){
			if(orgRec.get('id') == orgInfoId){
				orgCodeId =  orgRec.get('orgCodeId');
			}
		});
		if(orgCodeId){
			return orgCodeId;
		}
    },
    cancelChanges:function(){
    	var me = this,
    		view = me.getView();
    	
		Ext.Msg.confirm('', AOCLit.cancelChangesMsg,function(btn){
			  if(btn == 'yes'){
				  if(view.xtype == 'bulkupdatevariableheadergrid'){
					  view.store.load({
				        	params:{variablename:view.variableColumnName},
				        	callback:function(obj){
					        	var reader = view.store.proxy.reader;
							    var showFiberPercentage = reader.createAccessor('showFiberPercentage')(reader.rawData);   
							    if(showFiberPercentage){
							    	view.columns[4].show();
								}
							    else{
							    	view.columns[4].hide();
								}
						    }
				        },view);
					  
				  }else{
					  Helper.loadOrderLineGridStore(me.getView().store, AOCRuntime.getOrderQueueId());
				  }
			  }
		});
    },
    saveOrderLineDetails:function(){
    	var me = this,
    		grid = me.getView(),
    		store = grid.store,
    		parms = '';
    	
    	if(grid.editingPlugin.editing){
    		grid.focus();
    	}
    	
    	var updatedRecords = store.getModifiedRecords();
    	
    	if(updatedRecords.length == 0){
    		Helper.showToast('validation', AOCLit.noRecordsToUpdateMessage);
    		return;
    	}else{
    		Ext.Msg.confirm('', AOCLit.confirmBulkUpdateSave,function(btn){
    			if(btn=='yes'){
			    	Ext.each(updatedRecords, function(record){
			    		var obj = record.getChanges();
			    		obj.id=record.id;
			    		
			    		if(parms == ''){
			    			parms = parms + Ext.encode(obj);
			    		}
			    		else {
			    			parms = parms + '@@@' + Ext.encode(obj);
			    		}
			    		  
		    		 });
			    	var params = {
		    			data:parms,
		    			orderQueueId:AOCRuntime.getOrderQueueId(),
		    			lastModifiedBy:Helper.getLastModifiedBy()
			    	}
			    	grid.mask(AOCLit.pleaseWait);
			    	Ext.Ajax.request({
			    		method:'PUT',
				        jsonData:Ext.encode(params),
				        url: applicationContext+'/rest/orderlinedetails/variablebulkupdate',
				        success: function(response, opts) {
				        	Helper.showToast('success', 'Order line successfully updated');
				        	grid.store.load({params:{variablename:grid.variableColumnName}});
				        	grid.unmask();
			        	},
				        failure: function(response, opts) {
				        	grid.unmask();
				        }
			    	}); 
    			}
    		});
    	}
    },
    onERPORGSelect:function(cmp, record){
    	var eporgStore = AOCRuntime.getStoreERPORG();
    	eporgStore.clearFilter();
    },
    onDivisionEPORGExpand:function(field){
    	var view = this.getView(),
			currentRecord = view.editingPlugin.context.record,
			targetSystemInfoId = currentRecord.get('targetSystem');
	
		field.store.filterBy(function(record){
			if(record.get('orderSystemInfoId') == targetSystemInfoId){
				return true;
			}
			return false;
		});
	},
    divisionForInterfaceERPORGColumnRenderer:function(v, h, l, k){
		var orgCodeName = '';
		var view = this.getView();
		if(!Ext.isEmpty(v)){
			h.column.config.editor.store = AOCRuntime.getStoreERPORG();
			var store = h.column.config.editor.store;
			
			if(store){
				store.clearFilter();
				var index = store.find("id",v,'',false, false, true);
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
	onVariableComboFocus:function(field){
		var me = this,
		   	view = me.getView(),
		   	editor = view.editingPlugin,
		   	context = editor.context,
		   	rowIdx = context.rowIdx,
		   	fieldStore = field.store,
		   	currentRecord = context.record,
		   	fieldName = context.field,
		   	systemId = currentRecord.get('systemId'),
		   	currentValue = field.getValue();
		
		var divisionEPORGStore = AOCRuntime.getStoreERPORG(),
			eporgRecord = divisionEPORGStore.getById(currentRecord.get('divisionForInterfaceERPORG')),
			orgId = eporgRecord.get('orgCodeId');
	
		if(fieldName == 'csr'){
			field.store.load({
				callback:function(records, operations, success){
					field.store.clearFilter();
					field.store.filterBy(function(record){
						if(record.get('systemId') == systemId && orgId == record.get('orgId')){
							return true;
						}
						return false;
					}, systemId);
				}
			}, field, orgId);
		}
		else{
			field.store.clearFilter();
			field.store.filterBy(function(record){
				if(record.get('systemId') == systemId && orgId == record.get('orgId')){
					return true;
				}
				return false;
			}, systemId);
		}
		if(!Ext.isEmpty(context.record.get(fieldName))){
			//remove value from current record and field if value is not exist in store
			var index = fieldStore.find("name", currentValue,'', false, false, true);
			if(index == -1){
				field.setValue('');
			  	context.store.getAt(rowIdx).set(fieldName,'');
			}
		}
	},
	onVariableComboBlur:function(field){
		var me = this,
			fieldStore = field.store,
			view = me.getView(),
		   	editor = view.editingPlugin,
		   	context = editor.context,
		   	fieldName = context.field,
		   	rowIdx = context.rowIdx;
		
		var index = fieldStore.find('name', field.getValue(),'', false, false, true);
		if(index == -1 || field.getValue() == 'None'){
			field.setValue('');
		  	context.store.getAt(rowIdx).set(fieldName,'');
		}
	},
	variableComboColumnRenderer:function(v,h,l,k){
		var view = this.getView();
		
		if(!Ext.isEmpty(v)){
			var store = h.column.config.editor.store;
			if(store){
				var index = store.find('name',v,'',false,false,true);
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
	comboColumnRenderer:function(v,h,l,k){
		if(!Ext.isEmpty(v)){
			var store = h.column.config.editor.store;
			if(store){
				var index = store.find("variableFieldName",v,'',false,false,true);
				if(index == -1){
					if(l.get('status') == AOCLit.waitingForCSRStatusOrderLine){
						h.style = AOCLit.cellColor; // change cell color if value is not exist in store
					}
				}
			}else{
				if(l.get('status') == AOCLit.waitingForCSRStatusOrderLine){
					h.style = AOCLit.cellColor; //change cell color if value is not exist in store
				}
			}
		}
		return v;
	},
	onSelectStatusBulk: function(combo){
		var value = combo.getValue(),
			grid = this.getView(),
			columns = grid.columns,
			len = columns.length,
			store = grid.store,
			context = grid.editingPlugin.context
			rowIdx = context.rowIdx;
		
		store.getAt(rowIdx).set(context.field, value);
		store.getAt(rowIdx).set('codeValue', combo.getRawValue());
		
		if(value == AOCLit.cancelStatusOrderLine){
			store.getAt(rowIdx).set('iconName', 'cancel');
			store.getAt(rowIdx).set('colorCode', '#808080');
		}else{
			store.getAt(rowIdx).set('iconName', 'warning');
			store.getAt(rowIdx).set('colorCode', '#FF0000');
		}
		
		for(var i = 0; i< len; i++){
			if(value == AOCLit.waitingForCSRStatusOrderLine){
				columns[i].getEditor(store.getAt(rowIdx)) ? columns[i].getEditor(store.getAt(rowIdx)).enable() : '';
			}else{
				if(columns[i].getEditor(store.getAt(rowIdx))){
					if(columns[i].getEditor(store.getAt(rowIdx)).dataIndex == 'status'){
						columns[i].getEditor(store.getAt(rowIdx)).enable();
					}else{
						columns[i].getEditor(store.getAt(rowIdx)).disable();
					}
				}
			}
		}
	},
	onComboFocus:function(field){
			var me = this,
		   	view = me.getView(),
		   	editor =  view.editingPlugin,//view.lockedGrid.editingPlugin,
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
			  	return true;
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
			Helper.showToast('validation', fieldName + ' can not be less than Ordered date');
			df.setValue(orderDate);
		}
	}
});