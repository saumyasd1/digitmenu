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
    	var panel=this.getView().ownerCt;
        panel.getLayout().setActiveItem(0);
        var ordeQueueGrid=panel.down('#OrderQueueGridItemId');
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
		  		me.getView().store.load();
	        },
	        failure: function(response, opts) {
	        	Ext.Msg.alert('Failure', AOCLit.validateErrorMsg);
	        	Ext.getBody().unmask();
	        }
	    }); 
    },
    viewSalesOrder:function(){
    	Ext.getBody().mask('Loading....');
    	var id=this.runTime.getOrderQueueId(),me=this,
    	salesOrderCount=this.runTime.getSalesOrderCount();
    	var proceed=true;
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
		   owner.getLayout().setActiveItem(2); 
    	}
    	Ext.getBody().unmask();
    },
    submitSalesOrder:function(){
    	Ext.getBody().mask('Loading...'); //show message on missing field
    	var me = this,
    		grid = me.getView().down('#orderlineexpandablegridcard').getLayout().getActiveItem(),
    		store = grid.store,
    		status;
    	
    	if(grid.mandatoryFieldMissing){
			Ext.Msg.alert('',AOCLit.orderLineMandatoryFieldMissingAlt);
			Ext.getBody().unmask();
			return false;
		}
    	if(grid.mandatoryValidationFieldMissing){
    		store.load();
			Ext.Msg.alert('',AOCLit.orderLineMandatoryValidationFieldMissingAlt);
			grid.showMandatoryValidationField=true;
			Ext.getBody().unmask();
			return false;
    	}
		var records=store.queryBy(function(rec){
			status=rec.get('status');
			if(status!=AOCLit.waitingForCSRStatusOrderLine && status!=AOCLit.cancelStatusOrderLine)
				return true;
		});
		if(records.length>0){
			Ext.Msg.alert('',AOCLit.changeOrderLineStatusAlert);
			Ext.getBody().unmask();
			return false;
		}
		if(grid.invalidComboValid){
			store.load();
			Ext.Msg.alert('',AOCLit.InvalidComboValueAlert);
			grid.showInvalidCombo=true;
			Ext.getBody().unmask();
			return false;
		}
		
    	if(grid.validationFieldMissing){
    		Ext.Msg.confirm(AOCLit.warningTitle, AOCLit.validateFieldFailedConfirmatonMsg,function(btn){
    			if (btn === 'yes') {
    				me.callSubmitSalesOrderReq();
    			}else
    				Ext.getBody().unmask();
    		});
    	}else{
    		me.callSubmitSalesOrderReq();
    	}
    },
    
    callSubmitSalesOrderReq:function(){
    	var me = this,
    		id = me.runTime.getOrderQueueId();
    	
    	Ext.getBody().mask(AOCLit.pleaseWaitTitle); // show mask on body
    	
    	Ext.Ajax.request({
    		method:'GET',
    		async:false,
 		    url : applicationContext+'/rest/router/salesorder/'+id,
 		    success : function(response, opts) {
 		    	var jsonValue=Ext.decode(response.responseText),
		        	status=jsonValue.status;
 		    	
		        	if(status=='success'){
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
		        		Ext.Msg.alert('', AOCLit.salesOrderCreationMsg);
		        	}
		        	else{
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
			  		me.getView().store.load();
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
			soGeneratedCount = 0,
			soSubmittedCount =0,
			invalidInternalNoCount = 0,
			internalItemNoMisCount =0,
			orgCodeMisCount = 0,
			frontEndSystemCount = 0,
			
			readyForAdditionalDataCount = 0,
			readyForValidationCount = 0,
			errorWhileReadingItemCount =0,
			errorInValidationCount = 0,
			cancelCount = 0,
			readyForItemSpecCount = 0;
    	
    	store.each(function(rec){
    		var status = rec.get('status');
    		if(rec.get('atovalidationFlag') == 'F'){
    			atovalidationFlagCount++;
    		}
    		switch (status){
    			case AOCLit.soGenereatedStatusOrderLine : 
    				soGeneratedCount++;
    				break;
    			case AOCLit.soSubmittedStatusOrderLine : 
    				soSubmittedCount++;
    				break;
    			case AOCLit.invalidInternalNoStatusOrderLine : 
    				invalidInternalNoCount++;
    				break;
    			case AOCLit.internalItemNoIsMissingStatusOrderLine : 
    				internalItemNoMisCount++;
    				break;
    			case AOCLit.orgCodeIsMissingStatusOrderLine : 
    				orgCodeMisCount++;
    				break;
    			case AOCLit.frontEndSystemIsMissingStatusOrderLine : 
    				frontEndSystemCount++;
    				break;
    			case AOCLit.readyForItemSpecStatusOrderLine : 
    				readyForItemSpecCount++;
    				break;
    			case AOCLit.readyForAdditionalDataFileParsingStatusOrderLine : 
    				readyForAdditionalDataCount++;
    				break;
    			case AOCLit.readyForValidationStatusFlag : 
    				readyForValidationCount++;
    				break;
    			case AOCLit.errorWhileReadingItemSpecStatusOrderLine : 
    				errorWhileReadingItemCount++;
    				break;
    			case AOCLit.errorInValidationStatusOrderLine : 
    				errorInValidationCount++;
    				break;
    			case AOCLit.cancelStatusOrderLine : 
    				cancelCount++;
    				break;
    		}
    	});
    	
    	if(soGeneratedCount == totalCount || soSubmittedCount == totalCount || invalidInternalNoCount == totalCount
    			|| internalItemNoMisCount == totalCount || orgCodeMisCount == totalCount
					|| frontEndSystemCount == totalCount || readyForItemSpecCount == totalCount
						|| readyForAdditionalDataCount == totalCount || readyForValidationCount == totalCount
							|| errorWhileReadingItemCount == totalCount || errorInValidationCount == totalCount
								|| cancelCount == totalCount){
    		
    		salesOrderbutton.disable();
    		salesViewOrderbutton.disable();
    		validateButton.disable();
    		form.disable();
    		store.getCount() > 0 ? cancelOrderBtn.enable() : cancelOrderBtn.disable();
    	}else{
    		var orderQueueStatus = me.runTime.getOrderQueueStatus();
    		orderQueueStatus == AOCLit.waitingForCSRStatusOrderQueue ? salesOrderbutton.enable() : salesOrderbutton.disable();
    		orderQueueStatus == AOCLit.waitingForCSRStatusOrderQueue ? salesViewOrderbutton.disable() : salesViewOrderbutton.enable();
    		orderQueueStatus == AOCLit.waitingForCSRStatusOrderQueue ? validateButton.enable() : validateButton.disable();
    		orderQueueStatus == AOCLit.waitingForCSRStatusOrderQueue ? form.enable() : form.disable();
    	}
    	if(atovalidationFlagCount == totalCount){
    		radioGroup.items.items[1].disable();
    	}else{
    		radioGroup.items.items[1].enable();
    	}
    },
    getUpdateScreen:function(){
		var me = this,
			viwport = Ext.ComponentQuery.query('#viewportitemid')[0],
			height = viwport.getHeight()-20,
			width = viwport.getWidth()-20,
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
      			Ext.Msg.alert('', AOCLit.selectValueDrpMsg);
      			return false;
      		}
      		innerGridType='bulkUpdateVariableHeaderrGrid';
      		height = height - 180;
      		width = width - 240;
			
      		store = Ext.create('AOC.store.OrderLineStore', {
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
      		innerGridType = 'bulkupdateorderlinegrid';
		}
		
		var win=Ext.create('AOC.view.base.BaseWindow',{
			height:height,
			width:width,
			layout: 'fit',
			draggable: false,
			modal:true,
			listeners:{ 
				close:function(obj, eOpts){
					var orderline = Ext.ComponentQuery.query('orderlineexpandablegrid')[0];
					orderline.store.load();
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