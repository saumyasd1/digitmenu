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
						 
    		    	var obj ='{"insertBillAddress":'+insertBillAddress+',"insertShipAddress":'+insertShipAddress+',"data":'+Ext.encode(params)+',"orderQueueId":"'+me.runTime.getOrderQueueId()+'","partnerId":"'+me.runTime.getCurrentOrderQueuePartnerId()+'","systemId":"'+me.runTime.getCurrentOrderQueueDefaultSystem()+'","siteId":"'+me.runTime.getCurrentOrderQueueSiteId()+'","orgCodeId":"'+me.runTime.getCurrentOrderQueueOrgCodeId()+'","lastModifiedBy":"'+Helper.setLastModifiedBy()+'"}';
					
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
    	var obj='{"data":'+Ext.encode(parms)+',"orderQueueId":"'+me.runTime.getOrderQueueId()+'","lastModifiedBy":"'+Helper.setLastModifiedBy()+'"}';
    	
    	Ext.Ajax.request({
    		method:'PUT',
	        jsonData:obj,
    		   url : applicationContext+'/rest/orderlinedetails/variablebulkupdate',
    		   success : function(response, opts) {
		        	//AOC.util.Helper.fadeoutMessage('Success',AOCLit.updateOrdLineMsg);
			  		Ext.Msg.alert('','Order line successfully updated');
		          	Ext.getBody().unmask();
			  		me.getView().store.load({params:{variablename:grid.variableColumnName}});
		        },
		        failure: function(response, opts) {
		        	Ext.getBody().unmask();
	          }
    		  }); 
    	}
    		
    	});
    	}
    },
    onERPORGSelect:function(cmp, record){
    	var me = this,
			view = me.getView(),
			eporgStore = AOCRuntime.getStoreERPORG();
	
    	eporgStore.clearFilter();
    },
    onDivisionEPORGExpand:function(field){
    	var view = this.getView(),
			currentRecord = view.editingPlugin.context.record,
			systemId = currentRecord.get('systemId'),
			targetSystemInfoId = currentRecord.get('targetSystem'),
			divisionForInterfaceERPORGId  = currentRecord.get('divisionForInterfaceERPORG');
	
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
//			Ext.Msg.alert('Warning',fieldName + ' can not be less than Ordered date ');
			Helper.showToast('validation', fieldName + ' can not be less than Ordered date');
			df.setValue(orderDate);
		}
	}
});