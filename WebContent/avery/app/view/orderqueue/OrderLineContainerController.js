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
		        		Ext.Msg.alert('',validateErrorMsg);
			  		Ext.getBody().unmask();
			  		me.getView().store.load();
		        },
		        failure: function(response, opts) {
		        	Ext.Msg.alert('',validateErrorMsg);
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
    	var grid=this.getView().down('#orderlineexpandablegridcard').getLayout().getActiveItem(),store=grid.store,me=this,status;;
    	//var grid=this.getView().down('#orderlineexpandablegridrowmodel'),store=grid.store,me=this,status;
    	if(grid.mandatoryFieldMissing){
			Ext.Msg.alert('',orderLineMandatoryFieldMissingAlt);
			Ext.getBody().unmask();
			return false;
		}
    	if(grid.mandatoryValidationFieldMissing){
    		store.load();
			Ext.Msg.alert('',orderLineMandatoryValidationFieldMissingAlt);
			grid.showMandatoryValidationField=true;
			Ext.getBody().unmask();
			return false;
    	}
    		var records=store.queryBy(function(rec){
    			status=rec.get('status');
    			if(status!=waitingForCSRStatus && status!=cancelStatus)
    				return true;
    		});
    		if(records.length>0){
    			Ext.Msg.alert('',changeOrderLineStatusAlert);
    			Ext.getBody().unmask();
    			return false;
    		}
    		if(grid.invalidComboValid){
    			store.load();
    			Ext.Msg.alert('',InvalidComboValueAlert);
    			grid.showInvalidCombo=true;
    			Ext.getBody().unmask();
    			return false;
    		}
    	if(grid.validationFieldMissing){
    		Ext.Msg.confirm('',validateFieldFailedConfirmatonMsg,function(btn){
    			if (btn === 'yes') {
    				var id=me.runTime.getOrderQueueId();
    		    	Ext.Ajax.request({
    		    		method:'GET',
    		    		async:false,
    		 		    url : applicationContext+'/rest/router/salesorder/'+id,
    		 		    success : function(response, opts) {
    		 		    	var jsonValue=Ext.decode(response.responseText);
    				        	var status=jsonValue.status;
    				        	if(status=='success'){
    				        		proceed=false;
    				        		var orderlinecontainer = me.getView(),
    				        		grid=orderlinecontainer.down('grid');
    				                validateButton = orderlinecontainer.lookupReference('validateButton'),
    				                bulkUpdateButton=orderlinecontainer.lookupReference('bulkUpdateButton'),
    				                salesViewOrderbutton= orderlinecontainer.lookupReference('salesViewOrderbutton'),
    				                salesOrderbutton=orderlinecontainer.lookupReference('salesOrderbutton'),
    				                cancelOrderButton=orderlinecontainer.lookupReference('cancelOrderButton'),
    				                form=orderlinecontainer.lookupReference('form');
    			                	validateButton.disable();
    			                	salesViewOrderbutton.enable();
    			                	salesOrderbutton.disable();
    			                	cancelOrderButton.disable();
    			                	form.disable();
    			                	me.runTime.setAllowOrderLineEdit(false);
    			                	me.getView().store.load();
    				        		Ext.Msg.alert('',salesOrderCreationMsg);
    				        		Ext.getBody().unmask();
    				        	}
    				        	else{
    				        		Ext.Msg.alert('',submitSalesOrderErrorMsg);
    				        		proceed=false;
    				        		Ext.getBody().unmask();
    				        	}
    			        },
    			        failure: function(response, opts) {
    			        	proceed=false;
    			        	Ext.Msg.alert('',submitSalesOrderErrorMsg);
    			        	Ext.getBody().unmask();
    		          }
    				});
    			}else
    				Ext.getBody().unmask();
    		});
    	}else{
    		var id=me.runTime.getOrderQueueId();
	    	Ext.Ajax.request({
	    		method:'GET',
	    		async:false,
	 		    url : applicationContext+'/rest/router/salesorder/'+id,
	 		    success : function(response, opts) {
	 		    	var jsonValue=Ext.decode(response.responseText);
			        	var status=jsonValue.status;
			        	if(status=='success'){
			        		proceed=false;
			        		var orderlinecontainer = me.getView(),
			        		grid=orderlinecontainer.down('grid');
			                validateButton = orderlinecontainer.lookupReference('validateButton'),
			                bulkUpdateButton=orderlinecontainer.lookupReference('bulkUpdateButton'),
			                salesViewOrderbutton= orderlinecontainer.lookupReference('salesViewOrderbutton'),
			                salesOrderbutton=orderlinecontainer.lookupReference('salesOrderbutton'),
			                cancelOrderButton=orderlinecontainer.lookupReference('cancelOrderButton'),
			                form=orderlinecontainer.lookupReference('form');
		                	validateButton.disable();
		                	salesViewOrderbutton.enable();
		                	salesOrderbutton.disable();
		                	cancelOrderButton.disable();
		                	form.disable();
		                	me.runTime.setAllowOrderLineEdit(false);
		                	me.getView().store.load();
			        		Ext.Msg.alert('',salesOrderCreationMsg);
			        		Ext.getBody().unmask();
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
    cancelOrder:function(){
    	var win = Ext.create('AOC.view.orderqueue.CancelOrderWindow');
        win.show();
    },
    onOrderLineStoreLoad:function(obj){
    	 var status=this.runTime.getOrderQueueActiveRecord().get('Status');
    	 if(status==waitingForCSRStatus && this.runTime.getAllowOrderLineEdit()){
    		 var records=obj.queryBy(function(rec){
    				status=rec.get('status');
    				if(status==cancelStatus)
    					return true;
    			});
    	    	var view=this.getView(),
    			salesOrderbutton=view.lookupReference('salesOrderbutton'),
    			validateButton=view.lookupReference('validateButton');
    	    	if(obj.getTotalCount( )==records.length){
    	    		salesOrderbutton.disable();
    	    		validateButton.disable();
    	    	}else{
    	    		salesOrderbutton.enable();
    	    		validateButton.enable();
    	    	}
    	 }
    },
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
      		height=height-180;
      		width=width-240;
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
		   var win=Ext.create('AOC.view.base.BaseWindow',{
			 	height:height,
				width:width,
				layout: 'fit',
				draggable: false,
				modal:true,
				listeners:{ 
			 	      close:function(obj,eOpts){
			 	    	 var orderline=Ext.ComponentQuery.query('orderlineexpandablegrid')[0];
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
                		if(item.toLowerCase()!=qtyVariableLabel && item.toLowerCase().indexOf(sizeVariableLabel)==-1)
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