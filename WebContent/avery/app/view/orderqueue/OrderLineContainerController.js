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
    backButton:function(){
    	var orderQueueView = Ext.ComponentQuery.query('#orderQueueViewItemId1')[0];
    	//active orderqueue item
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
	        		Ext.Msg.alert('Success',AOCLit.orderValidation);
	        	}
	        	else{
	        		Ext.Msg.alert('', AOCLit.validateErrorMsg);
	        	}
		  		Ext.getBody().unmask();
		  		//Helper.loadOrderLineGridStore(me.getView().store, id);
	        },
	        failure: function(response, opts) {
	        	Ext.Msg.alert('Failure', AOCLit.validateErrorMsg);
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
    submitSalesOrder:function(){
    	var me = this,
    		grid = me.getView().down('#orderlineexpandablegridcard').getLayout().getActiveItem(),
    		store = grid.store,
    		status,
    		id=this.runTime.getOrderQueueId();
    	
    	if(grid.editingPlugin.editing){
    		Ext.Msg.alert(AOCLit.warningTitle, AOCLit.editingModeTitle);
    		return;
    	}
    	//(Amit Kumar)(IT UAT Issue Log#117)if any record has customer order qty is zero then show warning and not submit sales order
    	var isCustomerOrderQantityIsZero = false;
    	store.each(function(record){
    		if(record.get('customerOrderedQty') == '0' && record.get('status')==AOCLit.cancelStatusOrderLine){
    			isCustomerOrderQantityIsZero = true;
    		}
    	});
    	if(isCustomerOrderQantityIsZero){
    		Ext.Msg.alert(AOCLit.warningTitle,AOCLit.customerOrderQtyNotZeroMessage);
    		return;
    	}
    	
    	if(grid.mandatoryFieldMissing){
			Ext.Msg.alert('',AOCLit.orderLineMandatoryFieldMissingAlt);
			Ext.getBody().unmask();
			return;
		}
    	if(grid.mandatoryValidationFieldMissing){
			Ext.Msg.alert('', AOCLit.orderLineMandatoryValidationFieldMissingAlt);
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
			Ext.Msg.alert('', AOCLit.changeOrderLineStatusAlert);
			return;
		}
		if(grid.invalidComboValid){
			Ext.Msg.alert('', AOCLit.InvalidComboValueAlert);
			grid.showInvalidCombo = true;
			store.load({params:{id:id}});
			return;
		}
		
    	if(grid.validationFieldMissing){
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
    		grid= me.getView().down('#orderlineexpandablegridcard').getLayout().getActiveItem();
    	
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
	                	Ext.getBody().unmask();
	                	Helper.loadOrderLineGridStore(grid.store, id);
		        		Ext.Msg.alert('', AOCLit.salesOrderCreationMsg);
		        	}
		        	else{
		        		Helper.loadOrderLineGridStore(grid.store, id);
		        		Ext.Msg.alert('',AOCLit.submitSalesOrderErrorMsg);
		        		proceed=false;
		        		Ext.getBody().unmask();
		        	}
	        },
	        failure: function(response, opts) {s
	        	proceed=false;
	        	Ext.Msg.alert('',AOCLit.submitSalesOrderErrorMsg);
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
			  		Ext.Msg.alert('',AOCLit.updateOrdLineDetailMsg);
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
			noAdditionalDataFoundStatusOrderLine = 0,
			orderQueueStatus = AOC.config.Runtime.getOrderQueueStatus();
    	
    	store.each(function(rec){
    		var status = rec.get('status');
    		if(rec.get('atovalidationFlag') == 'F'){
    			atovalidationFlagCount++;
    		}
    		switch (status){
    			case AOCLit.waitingForCSRStatusOrderLine : 
    				waitingForCSRStatusOrderLine++;
    				break;
    			case AOCLit.noAdditionalDataFoundStatusOrderLine : 
    				noAdditionalDataFoundStatusOrderLine++;
    				break;
    			case AOCLit.mandatoryFieldMissingStatusOrderLine : 
    				mandatoryFieldMissingStatusOrderLine++;
    				break;
    		}
    	});
    	
    	if(waitingForCSRStatusOrderLine > 0 || noAdditionalDataFoundStatusOrderLine > 0
    			|| mandatoryFieldMissingStatusOrderLine > 0){
    		
    		salesOrderbutton.enable();
    		salesViewOrderbutton.disable();
    		validateButton.enable();
    		form.enable();
    		store.getCount() > 0 ? cancelOrderBtn.enable() : cancelOrderBtn.disable();
    	}
    	else{
    		if(orderQueueStatus == AOCLit.soGeneratedStatusOrderQueue || orderQueueStatus == AOCLit.soSubmittedStatusOrderQueue){
    			salesOrderbutton.disable();
        		salesViewOrderbutton.enable();
        		validateButton.disable();
        		form.disable();
    		}else{
    			salesOrderbutton.disable();
        		salesViewOrderbutton.disable();
        		validateButton.disable();
        		form.disable();
        		store.getCount() > 0 ? cancelOrderBtn.enable() : cancelOrderBtn.disable();
    		}
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
			orderLineExpandableGrid = Ext.ComponentQuery.query('orderlineexpandablegrid')[0],
			viwport = Ext.ComponentQuery.query('#viewportitemid')[0],
			height = viwport.getHeight()-100,
			width = viwport.getWidth()-100,
			id = me.runTime.getOrderQueueId(),
			radioGroupValue = me.lookupReference('radioGroup').getValue().rb,
			store,
			win,
			innerGridType,
			comboValue = '';
			
		if(radioGroupValue == '2'){
      		var comboField = this.lookupReference('variableFieldCombo'),
				comboValue = comboField.getValue();
				
      		if(comboValue == '' || comboValue == null){
      			Ext.Msg.alert(AOCLit.warningTitle, AOCLit.selectValueDrpMsg);
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
    			        type:'json', 
    			        rootProperty: 'OrderLineDetail'
    			    }
    			}
    		}); 
		}else{
			store = orderLineExpandableGrid.store;
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
					var orderLineExpandableGrid = Ext.ComponentQuery.query('orderlineexpandablegrid')[0];
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
                		if(item.toLowerCase()!=AOCLit.qtyVariableLabel && item.toLowerCase().indexOf(AOCLit.sizeVariableLabel)==-1)
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
    }
})