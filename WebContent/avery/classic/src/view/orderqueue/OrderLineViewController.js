Ext.define('AOC.view.orderqueue.OrderLineViewController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.orderline',
    requires : ['AOC.view.orderqueue.BulkUpdateOrderLineGrid','AOC.model.VariableHeaderModel'],

    cellPosition : '',
    init:function(){
    	this.getButtonPanel();
    },
    onCellClickToView:function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
		var grid=obj;
		var el = Ext.get(e.target);
		this.cellPosition = e.getXY();
		
		if(el.hasCls('EnableUpdateMoq')){
			var Id=record.get('id'),
				MoqDiffQty=record.get('moqdiffQty'),
				roundQty=record.get('roundQty'),
				customerOrderedQty=record.get('customerOrderedQty');
			
			customerOrderedQty=parseInt(MoqDiffQty,10)+parseInt(roundQty,10)+parseInt(customerOrderedQty);
			
			var value={ "customerOrderedQty" : customerOrderedQty, "id" : Id };
			var insertBillAddress= false,
				insertShipAddress=false;
			
			var obj='{"insertBillAddress":'+insertBillAddress+',"insertShipAddress":'+insertShipAddress+',"data":'+Ext.encode(Ext.encode(value))+',"updateAll":false,"orderQueueId":"'+AOCRuntime.getOrderQueueId()+'"}';
			
			Ext.MessageBox.confirm('Confirm Action',AOCLit.updateCustQtyMsg , function(response) {
				if (response == 'yes') {
					Ext.getBody().mask('Updating....');
					Ext.Ajax.request({
						method:'PUT',
						jsonData:obj,
						url : applicationContext+'/rest/orderLines/bulkupdate',
						success : function(response, opts) {
							Ext.getBody().unmask();
							Helper.showToast('validation','<b>Customer Qty. Updated Succesfully</b>');
							Helper.loadOrderLineGridStore(grid.store, AOC.config.Runtime.getOrderQueueId());
						},
						failure: function(response, opts) {
							 Ext.getBody().unmask();
						}
					});
				}else if(response == 'no'){
					return true;
				}
			});
		}
	},
	
	//Nested grid RowEditing event section
	onEditInnerGrid:function(editor, context, eOpts){
		var ctx = context,
			idx = ctx.rowIdx,
			currentRecord = ctx.store.getAt(idx),
			nestedGrid = editor.grid,
			url = applicationContext+'/rest/orderlinedetails/variablebulkupdate';
		
		var obj = currentRecord.getChanges();
		obj.id = currentRecord.id;
		var fiberPercent = currentRecord.get('fiberPercent');
		var isContainsFibre = currentRecord.get('level').toLowerCase();
		
		obj.data = Ext.encode(obj);
		obj.orderQueueId = AOCRuntime.getOrderQueueId();
		
		if(isContainsFibre == 'fibre'){
			if(fiberPercent.includes('.') == true || fiberPercent < 0){
				Helper.showToast('failure','Please enter only positive integer value for Fiber percent');
			}
			else{
				this.updateVariableBulkData(obj, nestedGrid, url);
			}
		}
		else{
			this.updateVariableBulkData(obj, nestedGrid, url);
		}
	},
	updateVariableBulkData:function(obj, nestedGrid, url, params){
		var me = this,
			grid = me.getView();
		
		Ext.getBody().mask('Saving....');
		Ext.Ajax.request({
			method:'PUT',
			jsonData:Ext.encode(obj),
			params:params,
			url: url,
			success : function(response, opts) {
				Helper.showToast('success','Order line Detail successfully updated');
				grid.openedRecordIndex = grid.store.find('id', nestedGrid.recordId);
				Helper.loadOrderLineGridStore(grid.store, AOCRuntime.getOrderQueueId());
				grid.view.refresh();
				Ext.getBody().unmask();
			},
			failure: function(response, opts) {
				Ext.getBody().unmask();
			}
		});
	},
	innerGridBulkUpdateClick:function(editorPlugin, editor, context){
		editorPlugin.suspendEvent('edit');
		editorPlugin.completeEdit();
		editorPlugin.resumeEvent('edit');
        
        var ctx = editorPlugin.context,
            currentRecord = ctx.store.getAt(ctx.rowIdx),
			url= applicationContext + '/rest/orderlinedetails/bulkupdate/variable';
        
        var obj = currentRecord.getChanges();
        obj.data = Ext.encode(obj);
        obj.updateAll = true;
        obj.orderQueueId =  AOCRuntime.getOrderQueueId();
        
        var params = {variablename:currentRecord.get('variableFieldName')};
        
        this.updateVariableBulkData(obj, ctx.grid, url, params)
	},
	
    radioButtonClick:function(obj, newValue, oldValue){
    	var comboField = this.lookupReference('variableFieldCombo');
    	
    	if(newValue.rb == '2'){
    		Ext.getBody().mask('Loading..');
    		var id= AOCRuntime.getOrderQueueId();
    		Ext.Ajax.request({
    			method:'GET',
    			url : applicationContext+'/rest/orderlinedetails/order/'+id,
		        success : function(response, opts) {
		        	var jsonValue=Ext.decode(response.responseText);
		        	var serviceStoreData = [];
		        	if(jsonValue.length>0){
			        	jsonValue.forEach(function(item){
	                		var service = [item];
	                		//fixed bug#40 IT UAT Issue log(Amit Kumar),check only for SIZE,QTY,SIZE CHART
	                        if(item.toLowerCase() != AOCLit.qtyVariableLabel && item.toLowerCase() != AOCLit.sizeVariableLabel && item.toLowerCase() != 'size chart'){
	                        	serviceStoreData.push(service);
	                        }
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
    getUpdateScreen:function(){
		var me = this,
			refs = me.getReferences(),
			height = Ext.getBody().getHeight()-100,
			width = Ext.getBody().getWidth()-100,
			id = AOCRuntime.getOrderQueueId(),
			radioGroupValue = refs.radioGroup.getValue().rb,
			store,
			innerGridType,
			comboValue = '';
			
		if(radioGroupValue == '2'){
      		var comboField = this.lookupReference('variableFieldCombo');
			comboValue = comboField.getValue();
				
      		if(comboValue == '' || comboValue == null){
      			Helper.showToast('validation', AOCLit.selectValueDrpMsg);
      			return false;
      		}
      		innerGridType = 'bulkupdatevariableheadergrid';
      		height = height - 180;
      		width = width - 240;
			
      		store = Ext.create('AOC.store.OrderLineStore', {
      			model:'AOC.model.VariableHeaderModel',
    			proxy : {
    				type : 'rest',
    				url : applicationContext+'/rest/orderlinedetails/order/variable/'+id,
    				reader:{
    					keepRawData:true,
    			        type:'json', 
    			        rootProperty: 'OrderLineDetail'
    			    }
    			}
    		}); 
		}else{
			store=Ext.create('AOC.store.OrderLineStore');
			store.load({params:{id:id}});
      		innerGridType = 'bulkupdateorderlinegrid';
		}
		
		var win=Ext.create('AOC.view.base.NewBaseWindow',{
			height:height,
			width:width,
			layout: 'fit',
			draggable: false,
			title:'Bulk Update',
			listeners:{ 
				close:function(obj, eOpts){
					var orderLineExpandableGrid = me.getView();
					orderLineExpandableGrid.openedRecordIndex = '';
					orderLineExpandableGrid.store.load({params:{id:id}});
				}
			},
			items:[
				{
					xtype:innerGridType,
					store:store,
					variableColumnName:comboValue
				}
			]
		});
		win.show();
    },
    updateOrderLinedetail:function(editor, context, eOpts){
    	var me = this,
    		ctx = context,
        	idx = ctx.rowIdx,
        	currentRecord = ctx.store.getAt(idx),
        	parms = '';
    	
    	var obj = currentRecord.getChanges();
    	obj.id = currentRecord.id;
    	
    	var params = {
			data:Ext.encode(obj),
			updateAll:false,
			orderQueueId:AOCRuntime.getOrderQueueId()
    	}
		Ext.getBody().mask('Saving...');
		Ext.Ajax.request({
    		method:'PUT',
	        jsonData:Ext.encode(params),
	        url : applicationContext+'/rest/orderlinedetails/variablebulkupdate',
	        success : function(response, opts) {
	        	Ext.getBody().unmask();
	        	
	        	Helper.showToast('success','Order line Detail successfully updated');
		  		Helper.loadOrderLineGridStore(me.getView().store, AOCRuntime.getOrderQueueId());
//		  		me.getView().view.refresh();
	        },
	        failure: function(response, opts) {
	        	Ext.getBody().unmask();
	        }
		});
    },
   
    getBulkUpdateParams:function(updateFlag){
    	var me = this,
			grid = me.getView(),
	    	currentRecord = grid.getSelectionModel().getSelection()[0],
	    	obj = currentRecord.getChanges(),
	    	insertBillAddress = false,
	    	insertShipAddress = false,
	    	orgCodeId = me.getOrgCodeId(currentRecord.get('divisionForInterfaceERPORG'));
    	
    	var billToCode = AOCRuntime.getCurrentDefaultBillToCode();
    	var shipToCode = AOCRuntime.getCurrentDefaultShipToCode();
    	var billshipcode = AOCRuntime.getBillshipRequired();
    	var billToTableType = AOCRuntime.getBillToTableType();
    	var shipToTableType = AOCRuntime.getShipToTableType();
    	
    	if(!updateFlag){
    		obj.id = currentRecord.id;
    	}
    	
    	if(obj.orderedDate){
            obj.orderedDate = Ext.util.Format.date(obj.orderedDate, 'Y-m-d H:i:s');
        }
        if(obj.requestedDeliveryDate){
            obj.requestedDeliveryDate = Ext.util.Format.date(obj.requestedDeliveryDate, 'Y-m-d H:i:s');
        }
        if(obj.promiseDate){
            obj.promiseDate = Ext.util.Format.date(obj.promiseDate, 'Y-m-d H:i:s');
        }
    	
		if(billToCode == 'true' || billToTableType == false){
			if(!Ext.isEmpty(currentRecord.get('oracleBillToSiteNumber')) 
					&& currentRecord.isModified('oracleBillToSiteNumber')){
    			insertBillAddress = true;
			}
		}
		if(shipToCode =='true' || shipToTableType == false){
    		if(!Ext.isEmpty(currentRecord.get('oracleShipToSiteNumber')) 
    				&& currentRecord.isModified('oracleShipToSiteNumber')){
    			insertShipAddress = true;
    		}
		}
		
		return {
			insertBillAddress:insertBillAddress,
			insertShipAddress : insertShipAddress,
			shipToAddress:currentRecord.get('shipToAddress1'),
			billToAddress:currentRecord.get('billToAddress1'),
			billType:currentRecord.isModified('oracleBillToSiteNumber'),
			shipType:currentRecord.isModified('oracleShipToSiteNumber'),
			billToSiteNumber:currentRecord.get('oracleBillToSiteNumber'),
			shipToSiteNumber:currentRecord.get('oracleShipToSiteNumber'),
			billToAddress2:currentRecord.get('billToAddress2'),
			billToAddress3:currentRecord.get('billToAddress3'),
			
			shipToAddress2:currentRecord.get('shipToAddress2'),
			shipToAddress3:currentRecord.get('shipToAddress3'),
			data:Ext.encode(obj),
			
			updateAll:updateFlag,
			
			orderQueueId:AOCRuntime.getOrderQueueId(),
			partnerId:AOCRuntime.getCurrentOrderQueuePartnerId(),
			systemId:currentRecord.get('systemId'),
			siteId:AOCRuntime.getCurrentOrderQueueSiteId(),
			orgCodeId:orgCodeId,
			lastModifiedBy:Helper.getLastModifiedBy()
		};
    },
    updateOrderLineRecord:function(params){
    	var me = this;
    	
    	Ext.getBody().mask(AOCLit.pleaseWait);
		Ext.Ajax.request({
			method:'PUT',
			jsonData:Ext.encode(params),
			url : applicationContext+'/rest/orderLines/bulkupdate',
			success : function(response, opts) {
				var jsonString = Ext.JSON.decode(response.responseText),
                	valueExist = jsonString.valueExist;
				
				Ext.getBody().unmask();
	            if (valueExist) {
	                Helper.showToast('failure', AOCLit.addressExistMsg);
	            }else{
	            	Helper.showToast('success','Order line successfully updated');
					me.getView().openedRecordIndex ='';
	            }
	            Helper.loadOrderLineGridStore(me.getView().store, AOCRuntime.getOrderQueueId());
			},
			failure: function(response, opts) {
				Ext.getBody().unmask();
			}
		});
    },
    getOrgCodeId:function(orgInfoId){
    	var orgStore = AOCRuntime.getStoreERPORG(),
    		orgCodeId;

		orgStore.each(function(orgRec){
			if(orgRec.get('id') == orgInfoId){
				orgCodeId = orgRec.get('orgCodeId');
				return;
			}
		});
		if(orgCodeId){
			return orgCodeId;
		}
    },
    updateOrderLine:function(editor, context, eOpts){
    	var me = this;
		me.updateOrderLineRecord(me.getBulkUpdateParams(false));
    },
    outerGridBulkUpdate:function(editorPlugin, editor, context){
    	var me = this;
    	
    	Ext.Msg.show({
		    title:'Update All',
		    message: 'Are you sure, you want to update for all?',
		    buttons: Ext.Msg.YESNO,
		    icon: Ext.Msg.QUESTION,
		    fn: function(btn) {
		        if (btn === 'yes') {
		        	me.updateOrderLineRecord(me.getBulkUpdateParams(true));
		        } 
		    }
		});
    },
    onCopyBtnClick:function(editorPlugin, editor, context){
		var me = this,
			view = me.getView(),
			currentRecord = view.getSelectionModel().getSelection()[0];
		
    	var obj = currentRecord.getChanges();
    	
		var id = currentRecord.get('id'),
			additional = obj.additionalLabelInternalItem;
		
		if(Ext.isEmpty(additional)){
			additional = currentRecord.get('additionalLabelInternalItem');
		}
		
		if(!Ext.isEmpty(additional) && !Ext.isEmpty(additional.trim())){
			Ext.getBody().mask(AOCLit.pleaseWait);
			Ext.Ajax.request({
				method:'GET',
				url:applicationContext+'/rest/orderLines/copy/additional',
				params:{id:id, additional: additional.trim()},
				success:function(response){
					var jsonString = JSON.parse(response.responseText);
					var newRecId = jsonString.id;
					
					view.store.load({
						params:{id:AOCRuntime.getCurrentConfig().orderQueueId},
						callback:function(records, operation, success){
							var record = view.store.getById(newRecId);
							view.getSelectionModel().select(record);
						}
					}, view, newRecId);
					
					Ext.getBody().unmask();
				},
				failure:function(){
					Ext.getBody().unmask();
				}
			});
		}
	},
    getButtonPanel:function(){
    	var me = this;
    	this.buttonPanel =  new Ext.create('Ext.panel.Panel',{
    		bodyStyle:{
    			background:'transparent',
    			padding:10
    		},
    		minWidth:200,
    		hidden:true,
    		width:'28%',
    		style:'z-index:2;position:absolute;',
    		header:false,
    		constrain:true,
    		renderTo:Ext.getBody(),
    		items:[
    		    {
    		    	xtype:'button',
		            cls: 'blue-btn',
		            iconCls:'x-fa fa-pencil-square-o',
		            text: 'Update',
		            handler:function(){
		            	me.stopEditing();
		            	me.updateOrderLine();
		            }
		        }, {
		        	xtype:'button',
		            cls: 'blue-btn',
		            margin:'0 0 0 5',
		            iconCls:'x-fa fa-pencil-square-o',
		            text: 'Update All',
		            handler:function(){
		            	me.stopEditing();
		            	me.outerGridBulkUpdate();
		            }
		        },{
		        	xtype:'button',
		            cls: 'blue-btn',
		            margin:'0 0 0 5',
		            iconCls:'x-fa fa-times',
		            text: 'Cancel',
		            scope:me,
		            handler:function(){
		            	var view = me.getView();
		            	view.editingPlugin.cancelEdit();
		            	me.stopEditing();
		            }
		        },{
		        	xtype:'button',
		            cls: 'blue-btn',
		            itemId:'copyButton',
		            margin:'0 0 0 5',
		            hidden:true,
		            iconCls:'x-fa fa-clone',
		            text: 'Copy',
		            handler:function(){
		            	me.stopEditing();
		            	me.onCopyBtnClick();
		            }
		        }
    		]
    	});
    },
    stopEditing:function(){
    	var me = this,
    		view = me.getView();
    	
    	me.buttonPanel.hide();
    	if(view.editingPlugin.activeEditor && view.editingPlugin.activeEditor.editing){
			view.focus();
    	}
    },
    outerGridBeforeEditEvent:function(editor, context, e){
    	var pos = context.column.getPosition();
    	var me = this,
    		orderQueueStatus = AOCRuntime.getOrderQueueStatus(),
    		rowIdx = context.rowIdx,
    		currentRecord = context.store.getAt(rowIdx),
    		currentRecordStatus = currentRecord.get('status'),
    		columns = editor.grid.columns,
			len = columns.length,
			gridView = me.getView(),
			store = gridView.store;
    	
    	editor.grid.lastScrollLeftPosition = gridView.view.el.dom.scrollLeft;
    	
    	if(orderQueueStatus == AOCLit.waitingForCSRStatusOrderQueue 
    			&& (currentRecordStatus == AOCLit.waitingForCSRStatusOrderLine
    				|| currentRecordStatus == AOCLit.mandatoryFieldMissingStatusOrderLine
    					|| currentRecordStatus == AOCLit.noAdditionalDataFoundStatusOrderLine
    						|| currentRecordStatus == AOCLit.customerQtyMismatchStatusOrderline)){
    		
    		for(var i = 0; i< len; i++){
//    			columns[i].getEditor().enable();
    			columns[i].getEditor(store.getAt(rowIdx)) ? columns[i].getEditor(store.getAt(rowIdx)).enable() : '';
    		}
    		this.showHideButtonWin(context, pos);
    		return true;
    	}
    	//if disable all fields except status field for current record status except above
    	if(orderQueueStatus == AOCLit.waitingForCSRStatusOrderQueue && context.field == 'status'){
    		for(var i = 0; i< len; i++){
//    			if(columns[i].getEditor().dataIndex == 'status'){
    			if(columns[i].dataIndex == 'status'){
    				columns[i].getEditor(store.getAt(rowIdx)) ? columns[i].getEditor(store.getAt(rowIdx)).enable() : '';
    				//columns[i].getEditor().enable();
    			}else{
//    				columns[i].getEditor().disable();
    				columns[i].getEditor(store.getAt(rowIdx)) ? columns[i].getEditor(store.getAt(rowIdx)).disable() : '';
    			}
    		}
    		this.showHideButtonWin(context, pos);
    		return true;
    	}
    	return false;
    },
    showHideButtonWin:function(context, post){
    	if(this.buttonPanel.isVisible()){
    		this.buttonPanel.hide();
    		this.stopEditing();
		}
    	this.buttonPanel.show();
    	var pos = this.cellPosition,
    		copyButton = this.buttonPanel.queryById('copyButton');
    	
    	if(context.field == 'additionalLabelInternalItem'){
    		copyButton.show();
    	}else{
    		copyButton.hide();
    	}
    	
		this.buttonPanel.setPosition(post[0]-10, pos[1]+15);
    },
    innerGridBeforeEditEvent:function(context){
    	if(!AOCRuntime.getAllowOrderLineEdit()){
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
    
    onERPORGSelect:function(cmp, record){
    	var me = this,
			view = me.getView(),
			eporgStore = AOCRuntime.getStoreERPORG();
	
    	eporgStore.clearFilter();
//    	var freightTermStore = AOC.util.Helper.getVariableComboStore('FreightTerms'),
//    		splitShipsetStore = AOC.util.Helper.getVariableComboStore('SplitShipset'),
//    		shippingMethodStore = AOC.util.Helper.getVariableComboStore('ShippingMethod'),
//    		EndCustomer = AOC.util.Helper.getVariableComboStore('EndCustomer'),
//    		Ordertype = AOC.util.Helper.getVariableComboStore('Ordertype'),
//    		APOType = AOC.util.Helper.getVariableComboStore('APOType');
//    	
//    	Ext.getBody().mask('Loading...');
//    	me.loadVariableStore(freightTermStore, params);
//    	me.loadVariableStore(splitShipsetStore, params);
//    	me.loadVariableStore(shippingMethodStore, params);
//    	me.loadVariableStore(EndCustomer, params);
//    	me.loadVariableStore(Ordertype, params);
//    	me.loadVariableStore(APOType, params);
//    	Ext.getBody().unmask();
//    	var response = Ext.Ajax.request({
//			async: false,
//			url: applicationContext+'/rest/orginfo/orgsysteminfo/'+AOCRuntime.getOrderLineCurrenProductLine()+'/'+record.get('id')
//		});
//		var jsonValue=Ext.decode(response.responseText),refs=view.refs;
//		if(jsonValue.length > 0){
//		
//			var obj=jsonValue[0];
//				systemId = obj.systemId;
//			
//			Helper.getVariableComboStore()
//			
//			me.attachCombo('freightTerms', systemId,record.get('id'),'freightTermscombo', obj.freightTerm,'freightTerms');
//			me.attachCombo('splitShipset', systemId,record.get('id'),'splitShipsetCombo', obj.splitShipSetBy,'splitShipset');
//			me.attachCombo('shippingMethod', systemId,record.get('id'),'shippingMethodCombo', obj.shippingMethod,'shippingMethod');
//			
//			me.attachCombo('EndCustomer',systemId,record.get('id'),'EndCustomerCombo',obj.shippingMethod,'EndCustomer');
//			me.attachCombo('Ordertype',systemId,record.get('id'),'OrdertypeCombo',obj.shippingMethod,'Ordertype');
//			me.attachCombo('APOType',systemId,record.get('id'),'APOTypeCombo',obj.shippingMethod,'APOType');
//			//EndCustomerCombo
//			//csrReferenceField
//			currentRecord.set('divisionForInterfaceERPORG',record.get('id'));
//			currentRecord.set('artworkhold',obj.artworkHold);
//			currentRecord.set('CSR',obj.csrName);
//			currentRecord.set('invoicelineInstruction',obj.invoiceNote);
//			currentRecord.set('manufacturingNotes',obj.manufacturingNotes);
//			currentRecord.set('packingInstruction',obj.packingInstruction);
//			currentRecord.set('shipmark',obj.shippingMark);
//			currentRecord.set('splitShipset',obj.splitShipSetBy);
//			currentRecord.set('variableDataBreakdown',obj.variableDataBreakdown);
//			currentRecord.set('shippingInstructions',obj.shippingInstruction);
//			currentRecord.set('shippingMethod',obj.shippingMethod);
//		}
//		Ext.getBody().unmask();
    },
    loadVariableStore:function(store, params){
    	store.load({
    		params:params
    	});
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
		var view = this.getView();
		
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
			//filter variable field store for current record systemId and Orgid
			//remove value from current record and field if value is not exist in store
			var index = fieldStore.find("name", currentValue,'', false, false, true);
			if(index == -1){
				field.setValue('');
			  	context.store.getAt(rowIdx).set(fieldName,'');
			}
		}
	},
	getVariableStore:function(field, context){
    	var me = this,
    		record = context.record,
    		dataIndex = field.dataIndex;
			variableName = Helper.getVariableName(dataIndex);
		
		if(variableName){
			var divEPORGStore = AOCRuntime.getStoreERPORG();
			var eporgRec = divEPORGStore.getById(record.get('divisionForInterfaceERPORG'));
			
	    	field.store.load({
	    		params:{
					sysid:record.get('targetSystem').toString(),
					orgid:eporgRec.get('id').toString(),
					variablename:variableName
				},
				callback:function(records, operation, success){
					var obj = {name:'None'},
						fieldStore = field.store,
						fieldName = field.dataIndex,
						index = field.store.find('name', 'None','', false, false, true);
			
					if(index == -1){
						fieldStore.insert(0, new Ext.data.Record(obj));
					}
					
					if(!Ext.isEmpty(context.record.get(fieldName))){
						var index = fieldStore.find("name", field.getValue(),'', false, false, true);
						if(index == -1){
							field.setValue('');
						  	context.store.getAt(context.rowIdx).set(fieldName, '');
						}
					}
				}
	    	},field, context);
    	}
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
			if(!fieldStore.isEmptyStore){
				var index = fieldStore.find("variableFieldName", currentValue,'', false, false, true);
				if(index == -1){
					field.setValue('');
				  	context.store.getAt(rowIdx).set(fieldName,'');
				}
			}
		}
		if(context.grid && !Ext.isEmpty(context.grid.lastScrollLeftPosition)){
			context.grid.view.el.dom.scrollLeft = context.grid.lastScrollLeftPosition;
        }
	},
	onFocusEnter:function(field, e){
		var me = this,
		   	view = me.getView(),
		   	editor = view.editingPlugin,
		   	context = editor.context;
		
		context.grid.lastScrollLeftPosition = view.view.el.dom.scrollLeft;;
		if(context.grid && !Ext.isEmpty(context.grid.lastScrollLeftPosition)){
			context.grid.view.el.dom.scrollLeft = context.grid.lastScrollLeftPosition;
        }
	},
	onStatusSelect:function(combo){
		var value = combo.getValue(),
			grid = this.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0],
			store = grid.store,
			columns = grid.columns,
			len = columns.length;
		
		currentRecord.set('status', combo.getValue());
		currentRecord.set('codeValue', combo.getRawValue());
		
		if(value == AOCLit.cancelStatusOrderLine){
			currentRecord.set('iconName', 'cancel');
			currentRecord.set('colorCode', '#808080');
		}else{
			currentRecord.set('iconName', 'warning');
			currentRecord.set('colorCode', '#FF0000');
		}
		
		for(var i = 0; i< len; i++){
			if(value == AOCLit.waitingForCSRStatusOrderLine){
				columns[i].getEditor(currentRecord) ? columns[i].getEditor(currentRecord).enable():'';
//				columns[i].getEditor().enable();
			}else{
				if(columns[i].dataIndex == 'status'){
					columns[i].getEditor(currentRecord) ? columns[i].getEditor(currentRecord).enable():'';
//    				columns[i].getEditor().enable();
    			}else{
    				columns[i].getEditor(currentRecord) ? columns[i].getEditor(currentRecord).disable():'';
//    				columns[i].getEditor().disable();
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
	},
	
	onRefreshClick:function(){
		this.stopEditing();
		this.getView().store.load({params:{id:AOCRuntime.getCurrentConfig().orderQueueId}});
	}
});