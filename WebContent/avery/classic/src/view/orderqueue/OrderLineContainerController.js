Ext.define('AOC.view.orderqueue.OrderLineContainerController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.orderlinecontainer',
    requires : ['AOC.view.orderqueue.BulkUpdateOrderLineGrid','AOC.view.orderqueue.BulkUpdateVariableHeaderrGrid','AOC.model.VariableHeaderModel'],
    runTime : AOC.config.Runtime,
    config: {
        listen: {
        	store: {
        		'#OrderLineStoreId': {
        			load: 'onOrderLineStoreLoad'
        		}
    		}
        }
    },
    isSalesOrderSubmittedFlag : true,
    backButton:function(){
    	var orderQueueView = Ext.ComponentQuery.query('#orderQueueViewItemId')[0];
    	orderQueueView.getLayout().setActiveItem(0);
    	
    	var ordeQueueGrid = orderQueueView.getLayout().activeItem;
        ordeQueueGrid.store.load();
        this.getView().destroy();
    },
    validateOrderLine:function(){
    	Ext.getBody().mask('Validating....');
    	var me = this,
    		id=this.runTime.getOrderQueueId();
    	
    	Ext.Ajax.request({
    		method:'GET',
    		url : applicationContext+'/rest/router/orderqueue/'+id,
	        success : function(response, opts) {
	        	var jsonValue=Ext.decode(response.responseText);
	        	var status=jsonValue.status;
	        	if(status=='success'){
	        		Helper.showToast('Success',AOCLit.orderValidation);
	        	}
	        	else{
	        		Helper.showToast('failure', AOCLit.validateErrorMsg);
	        	}
		  		Ext.getBody().unmask();
		  		//Helper.loadOrderLineGridStore(me.getView().store, id);
	        },
	        failure: function(response, opts) {
	        	Helper.showToast('failure', AOCLit.validateErrorMsg);
	        	Ext.getBody().unmask();
	        }
	    }); 
    },
    viewSalesOrder:function(){
    	Ext.getBody().mask('Loading....');
    	var id=this.runTime.getOrderQueueId(),me=this;
    	//salesOrderCount=this.runTime.getSalesOrderCount();
    	var proceed=true;
    	if(proceed){
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
		   owner.getLayout().setActiveItem(2); 
    	}
    	Ext.getBody().unmask();
    },
    validInvalidCombo:function(rec, rowIdx, grid){
    	var orderLineExpandableGrid = this.getView().queryById('orderlineexpandablegridrowmodel'),//Ext.ComponentQuery.query('orderlineexpandablegrid')[0],
    		columns = orderLineExpandableGrid.columns,
    		len = columns.length;
    	
    	for(var i = 0; i < len; i++){
    		var column = columns[i],
    			dataIndex = column.dataIndex,
    			headerText = column.text;
    		
    		//checks for followng dropdown validation
    		if(dataIndex == 'csr' || dataIndex == 'freightTerms' 
    			|| dataIndex == 'shippingMethod' || dataIndex == 'apoType'
    				|| dataIndex == 'orderType' || dataIndex == 'splitShipset' || dataIndex == 'endCustomer'){
    			
    			if(column.getEditor(rec)){
    				var fieldStore = column.getEditor(rec).store;
	    			if(fieldStore && !Ext.isEmpty(rec.get(dataIndex))){
	    				var index = fieldStore.find("variableFieldName",rec.get(dataIndex),'',false,false,true);
	    				if(index == -1){
	    					if(rec.get('status') == AOCLit.waitingForCSRStatusOrderLine){
	    						rowIdx++;
	    						grid.invalidComboColumn = headerText +' value is not valid in row '+ rowIdx +'.Please correct the value before proceeding.';
	    						return false;
	    					}
	    				}
	    			}
    			}
    		}
    		if(dataIndex == 'divisionForInterfaceERPORG' ){
    			if(column.getEditor(rec)){
    				var fieldStore = column.getEditor(rec).store;
	    			if(fieldStore && !Ext.isEmpty(rec.get(dataIndex))){
	    				var index = fieldStore.find("id",rec.get(dataIndex),'',false,false,true);
	    				if(index == -1){
	    					if(rec.get('status') == AOCLit.waitingForCSRStatusOrderLine){
	    						rowIdx++;
	    						grid.invalidComboColumn = headerText +' value is not valid in row '+ rowIdx +'.Please correct the value before proceeding.';
	    						return false;
	    					}
	    				}
	    			}
    			}
    		}
    		//checks for Mandatory column missing
    		if(dataIndex == 'oracleBillToSiteNumber' || dataIndex == 'soldToRBONumber' || dataIndex == 'oracleShipToSiteNumber'
    			|| dataIndex == 'orderedDate' || dataIndex == 'poNumber' || dataIndex == 'averyItemNumber' || dataIndex == 'bulk'){
    			
    			if(column.getEditor(rec) && Ext.isEmpty(rec.get(dataIndex))){
    				if(rec.get('status') == AOCLit.waitingForCSRStatusOrderLine){
						rowIdx++;
						grid.mandatoryColumnMissing = headerText +' field is empty in row '+ rowIdx +'.Please ensure the field is filled before proceeding.';
						return false;
					}
    			}
    		}
    		if(dataIndex == 'customerOrderedQty'){
    			if(!Ext.isEmpty(rec.get(dataIndex)) && rec.get(dataIndex) <= 0){
    				if(rec.get('status') == AOCLit.waitingForCSRStatusOrderLine){
						rowIdx++;
						grid.mandatoryColumnMissing = headerText +' field is empty in row '+ rowIdx +'.Please ensure the field is filled before proceeding.';
						return false;
					}
    			}
    		}
    		if(dataIndex == 'requestedDeliveryDate' || dataIndex == 'promiseDate'){
    			if(!Ext.isEmpty(rec.get(dataIndex))){
    				if(rec.get('status') == AOCLit.waitingForCSRStatusOrderLine && (rec.get(dataIndex) < rec.get('orderedDate'))){
						rowIdx++;
						grid.mandatoryColumnMissing = headerText +' can not be less than Ordered date in row '+ rowIdx +'.Please correct before proceeding.';
						return false;
					}
    			}
    		}
    		//checks for Mandatory Validation Column
    		if(dataIndex == 'mandatoryVariableDataFieldFlag' || dataIndex == 'bulkSampleValidationFlag' || dataIndex == 'htlsizePageValidationFlag'
    			|| dataIndex == 'moqvalidationFlag' || dataIndex == 'febricPercentageFlag' || dataIndex == 'cooTranslationFlag'){
    			
    			var checkvalue = rec.get(dataIndex) ? rec.get(dataIndex).trim() : '';
    			if(checkvalue.substr(0,1) == 'F'){
    				if(rec.get('status') == AOCLit.waitingForCSRStatusOrderLine){
						rowIdx++;
						grid.mandatoryValidationColumnMissing = 'Mandatory validation has failed for '+ headerText +' field in row '+ rowIdx +'.Please resolve it before proceeding.';
						return false;
					}
    			}
    		}
    	}
    },
    submitSalesOrder:function(){
    	var me = this,
    		refs = me.getReferences(),
    		grid = refs.orderLineExpandableGrid,
    		store = grid.store,
    		status,
    		id=this.runTime.getOrderQueueId();
    	
    	grid.invalidComboColumn = '';
    	grid.mandatoryColumnMissing = '';
    	grid.mandatoryValidationColumnMissing = '';
    	grid.validationColumnMissing = false;
    	
    	if(!me.isSalesOrderSubmittedFlag){
    		Helper.showToast('validation',AOCLit.salesOrderWarning);
    		return ;
    	}
    	if(grid.editingPlugin.editing){
    		Helper.showToast('validation', AOCLit.editingModeTitle);
    		return;
    	}
    	//(Amit Kumar)(IT UAT Issue Log#117)if any record has customer order qty is zero for WaitingForCSRStaus only then show warning and not submit sales order
    	var isCustomerOrderQantityIsZero = false;
    		isCommentExist = false;
    	store.each(function(record, index){
    		if(record.get('comment')){
    			isCommentExist = true;
	    	}
    		if((record.get('customerOrderedQty') == '0' || Ext.isEmpty(record.get('customerOrderedQty'))) && record.get('status') == AOCLit.waitingForCSRStatusOrderLine){
    			isCustomerOrderQantityIsZero = true;
    		}
    		return me.validInvalidCombo(record, index, grid);
    	});
    	
    	//For comment column if value exist in comment column
    	if(isCommentExist ){
    		Helper.showToast('failure',AOCLit.commentOnOrderLine);
    		return;
    	}
    	//For Invalid Combo 
    	if(grid.invalidComboColumn){
    		Helper.showToast('validation', grid.invalidComboColumn);
    		return;
    	}
    	
    	//If customer order qty is zero
    	if(isCustomerOrderQantityIsZero){
    		Helper.showToast('validation', AOCLit.customerOrderQtyNotZeroMessage);
    		return;
    	}
    	
    	//if mandatoryColumn Missing
    	if(grid.mandatoryColumnMissing){
    		Helper.showToast('validation', grid.mandatoryColumnMissing);
			return;
		}
    	//if mandatoryValidation Missing
    	if(grid.mandatoryValidationColumnMissing){
    		Helper.showToast('validation', grid.mandatoryValidationColumnMissing);
			grid.showMandatoryValidationField=true;
			return;
    	}
		var records=store.queryBy(function(rec){
			status=rec.get('status');
			if(status!=AOCLit.waitingForCSRStatusOrderLine && status!=AOCLit.cancelStatusOrderLine){
				return;
			}
		});
		
		if(records.length > 0){
			Helper.showToast('validation', AOCLit.changeOrderLineStatusAlert);
			return;
		}
		
		store.each(function(rec, index){
			var columns = grid.columns,
    			len = columns.length;
    	
	    	for(var i = 0; i < len; i++){
	    		var column = columns[i],
	    			dataIndex = column.dataIndex,
	    			headerText = column.text;
	    		
				if(dataIndex == 'customerPOFlag' || dataIndex == 'duplicatePOFlag' || dataIndex == 'moqvalidationFlag'
	    			|| dataIndex == 'reviseOrderFlag'){
	    			
	    			var checkvalue = rec.get(dataIndex) ? rec.get(dataIndex).trim() : '';
	    			if(checkvalue.substr(0,1) == 'F' || checkvalue.substr(0,1) == 'W'){
	    				if(rec.get('status') == AOCLit.waitingForCSRStatusOrderLine){
							grid.validationColumnMissing = true;
							return false;
						}
	    			}
	    		}
				if(dataIndex == 'cooTranslationFlag'){
	    			var checkvalue = rec.get(dataIndex) ? rec.get(dataIndex).trim() : '';
	    			if(checkvalue.substr(0,1) == 'W'){
	    				if(rec.get('status') == AOCLit.waitingForCSRStatusOrderLine){
							grid.validationColumnMissing = true;
							return false;
						}
	    			}
	    		}
	    	}
    	});
		
    	if(grid.validationColumnMissing){
    		Ext.Msg.confirm(AOCLit.warningTitle, AOCLit.validateFieldFailedConfirmatonMsg,function(btn){
    			if (btn === 'yes') {
    				me.callSubmitSalesOrderReq();
    			}
    		});
    	}else{
    		me.callSubmitSalesOrderReq();
    	}
    },
    
    callSubmitSalesOrderReq:function(){
    	var me = this,
    		id = me.runTime.getOrderQueueId(),
    		refs = me.getReferences(),
    		grid = refs.orderLineExpandableGrid;
    	
    	Ext.getBody().mask(AOCLit.pleaseWaitTitle); // show mask on body
    	
    	Ext.Ajax.request({
    		method:'GET',
    		async:false,
 		    url : applicationContext+'/rest/router/salesorder/'+id,
 		    success : function(response, opts) {
 		    	var jsonValue=Ext.decode(response.responseText),
		        	status=jsonValue.status;
 		    	
		        	if(status=='success'){
		        		me.runTime.setOrderQueueStatus(AOCLit.soGeneratedStatusOrderQueue);
		        		proceed=false;
		        		var orderlinecontainer = me.getView(),
			                validateButton = orderlinecontainer.lookupReference('validateButton'),
			                bulkUpdateButton = orderlinecontainer.lookupReference('bulkUpdateButton'),
			                salesViewOrderbutton = orderlinecontainer.lookupReference('salesViewOrderbutton'),
			                salesOrderbutton = orderlinecontainer.lookupReference('salesOrderbutton'),
			                cancelOrderButton = orderlinecontainer.lookupReference('cancelOrderButton'),
			                form = orderlinecontainer.lookupReference('form');
		        		
	                	validateButton.disable();
	                	salesViewOrderbutton.enable();
	                	salesOrderbutton.disable();
	                	cancelOrderButton.disable();
	                	form.disable();
	                	
	                	me.runTime.setAllowOrderLineEdit(false);
	                	grid.openedRecordIndex = '';
	                	Ext.getBody().unmask();
	                	Helper.loadOrderLineGridStore(grid.store, id);
		        		Helper.showToast('Success', AOCLit.salesOrderCreationMsg);
		        	}
		        	else{
		        		Helper.loadOrderLineGridStore(grid.store, id);
		        		Helper.showToast('failure',AOCLit.submitSalesOrderErrorMsg);
		        		proceed=false;
		        		Ext.getBody().unmask();
		        	}
	        },
	        failure: function(response, opts) {
	        	proceed=false;
	        	Helper.showToast('failure',AOCLit.submitSalesOrderErrorMsg);
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
			  		Helper.showToast('Success',AOCLit.updateOrdLineDetailMsg);
			  		grid.openedRecordIndex ='';
			  		Ext.getBody().unmask();
			  		Helper.loadOrderLineGridStore(me.getView().store, runTime.getOrderQueueId());
		        },
		        failure: function(response, opts) {
		        	Ext.getBody().unmask();
		        }
		  });
    },
    cancelOrder:function(){
    	var win = Ext.create('AOC.view.orderqueue.CancelOrderWindow');
        win.show();
    },
    onOrderLineStoreLoad:function(store){
    	var me = this,
    		view = me.getView(),
			salesOrderbutton=view.lookupReference('salesOrderbutton'),
			salesViewOrderbutton=view.lookupReference('salesViewOrderbutton'),
			validateButton=view.lookupReference('validateButton'),
			cancelOrderBtn = view.lookupReference('cancelOrderButton')
			form = view.lookupReference('form'),
			radioGroup = view.lookupReference('radioGroup'),
			atovalidationFlagCount = 0,
			
			totalCount = store.getCount(),
			waitingForCSRStatusOrderLine = 0,
			mandatoryFieldMissingStatusOrderLine = 0,
			cancelStatusOrderLine = 0,
			noAdditionalDataFoundStatusOrderLine = 0,
			orderQueueStatus = AOC.config.Runtime.getOrderQueueStatus(),
			refs = me.getReferences(),
    		orderLineExpandableGrid = refs.orderLineExpandableGrid;
    	
    	orderLineExpandableGrid.invalidComboValid = false;
    	var isSubmitSaleOrderFlag = true;
    	
    	store.each(function(rec, index){
    		var status = rec.get('status');
    		if(rec.get('averyATO') == 'N'){
    			atovalidationFlagCount++;
    		}
    		if(!Ext.isEmpty(orderLineExpandableGrid.openedRecordIndex) && (orderLineExpandableGrid.openedRecordIndex == index)){
    			var expander = orderLineExpandableGrid.lockedGrid.features[0].rowExpander;
    			
    			expander ? expander.toggleRow(index, orderLineExpandableGrid.store.getAt(index)) :'';
    		}
    		
    		switch (status){
    			case AOCLit.waitingForCSRStatusOrderLine : 
    				waitingForCSRStatusOrderLine++;
    				break;
    			case AOCLit.noAdditionalDataFoundStatusOrderLine : 
    				isSubmitSaleOrderFlag = false;
    				noAdditionalDataFoundStatusOrderLine++;
    				break;
    			case AOCLit.mandatoryFieldMissingStatusOrderLine :
    				isSubmitSaleOrderFlag = false;
    				mandatoryFieldMissingStatusOrderLine++;
    				break;
    			case AOCLit.cancelStatusOrderLine : 
    				cancelStatusOrderLine++;
    				break;
				default:isSubmitSaleOrderFlag = false;
					break;
    		}
    	});
    	if(!isSubmitSaleOrderFlag){
    		me.isSalesOrderSubmittedFlag = false;
    	}else{
    		me.isSalesOrderSubmittedFlag = true;
    	}
    	if(waitingForCSRStatusOrderLine > 0 || noAdditionalDataFoundStatusOrderLine > 0
    			|| mandatoryFieldMissingStatusOrderLine > 0){
    		
    		salesOrderbutton.enable();
    		salesViewOrderbutton.disable();
    		validateButton.enable();
    		form.enable();
    		store.getCount() > 0 ? cancelOrderBtn.enable() : cancelOrderBtn.disable();
    	}
    	else{
    		if(orderQueueStatus == AOCLit.soGeneratedStatusOrderQueue || orderQueueStatus == AOCLit.soSubmittedStatusOrderQueue 
    					|| orderQueueStatus == AOCLit.oracleErrorStatusOrderQueue || orderQueueStatus == AOCLit.bookedStatusOrderQueue){
    			salesOrderbutton.disable();
        		salesViewOrderbutton.enable();
        		validateButton.disable();
        		form.disable();
    		}else{
    			salesOrderbutton.disable();
        		salesViewOrderbutton.disable();
        		validateButton.disable();
        		form.disable();
        		if(orderQueueStatus == AOCLit.oracleErrorStatusOrderQueue){
        			cancelOrderBtn.disable();
        		}else{
        			store.getCount() > 0 ? cancelOrderBtn.enable() : cancelOrderBtn.disable();
        		}
    		}
    	}
    	if(cancelStatusOrderLine==store.getCount()){
    		salesOrderbutton.disable();
    		salesViewOrderbutton.disable();
    		validateButton.disable();
    		form.disable();
    		cancelOrderBtn.disable();
    	}
    	if(atovalidationFlagCount == totalCount){
    		radioGroup.items.items[1].disable();
    	}else{
    		radioGroup.items.items[1].enable();
    	}
    },
    getUpdateScreen:function(){
		var me = this,
			refs = me.getReferences(),
			height = Ext.getBody().getHeight()-100,
			width = Ext.getBody().getWidth()-100,
			id = me.runTime.getOrderQueueId(),
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
      		innerGridType = 'bulkUpdateVariableHeaderrGrid';
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
					var orderLineExpandableGrid = me.getView().queryById('orderlineexpandablegridrowmodel');//Ext.ComponentQuery.query('orderlineexpandablegrid')[0];
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
    radioButtonClick:function(obj, newValue, oldValue){
    	var comboField=this.lookupReference('variableFieldCombo');
    	
    	if(newValue.rb == '2'){
    		Ext.getBody().mask('Loading..');
    		var id= this.runTime.getOrderQueueId();
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
    onShowColumnBtnClick:function(btn){
		var me = this,
			refs = me.getReferences(),
			orderLineExpandableGrid = refs.orderLineExpandableGrid; 
			columns = orderLineExpandableGrid.columns,
			len = columns.length;
			
		for(var i=0; i<len;i++){
			if(btn.pressed){
				btn.setText('<b>Collapse Column</b>');
				if(!columns[i].isVisible() && columns[i].type == 'address'){
					columns[i].show();
				}
			}else{
				btn.setText('<b>Expand Column</b>');
				if(columns[i].type == 'address'){
					columns[i].hide();
				}
			}
		}
	}
});