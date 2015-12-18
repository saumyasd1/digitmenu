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
    backButton:function(){
    	var bulkUpdate=Ext.ComponentQuery.query('#bulkUpdateItemId')[0];
   	    bulkUpdate.setText('<b>Order Queue</b>');
    	var panel=Ext.ComponentQuery.query('#orderQueueViewItemId1')[0];
        panel.getLayout().setActiveItem(0);
        var ordeQueueGrid=panel.down('#OrderQueueGridItemId');
        ordeQueueGrid.store.load();
        var record=ordeQueueGrid.store.find('id',this.runTime.getOrderQueueId());
        var row = ordeQueueGrid.getView().getRow(record);
        var el = Ext.fly(row);
        el.highlight("#c1ddf1", {
            attr: "backgroundColor",
            duration: 5000
        });
        
        this.getView().destroy();
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
		        		Ext.Msg.alert('','An error occured during validation process. Please contact your system Administartor for further information.');
			  		Ext.getBody().unmask();
			  		me.getView().store.load();
		        },
		        failure: function(response, opts) {
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
		   var bulkUpdate=Ext.ComponentQuery.query('#bulkUpdateItemId')[0];
		   bulkUpdate.setText('<b>Sales Order</b> ( <b>Partner Name</b> : '+currentRecord.get('PartnerName')+' <b>RBO</b> : '+currentRecord.get('RBOName')+
 				   ' <b>Product Line</b> : '+currentRecord.get('productLineType')+' <b>Subject</b> : '+currentRecord.get('Subject')
 				   +' <b>Date Received</b> : '+currentRecord.get('receivedDate')+')');
		   owner.getLayout().setActiveItem(2); 
    	}
    	Ext.getBody().unmask();
    },
    submitSalesOrder:function(){
    	Ext.getBody().mask('Loading...');
    	var grid=this.getView(),store=grid.store,me=this;
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
    				        		me.getView().store.load();
    				        		var orderlineexpandablegrid = me.getView(),
    				                validateButton = orderlineexpandablegrid.lookupReference('validateButton'),
    				                bulkUpdateButton=orderlineexpandablegrid.lookupReference('bulkUpdateButton'),
    				                salesViewOrderbutton= orderlineexpandablegrid.lookupReference('salesViewOrderbutton'),
    				                salesOrderbutton=orderlineexpandablegrid.lookupReference('salesOrderbutton'),
    				                cancelOrderButton=orderlineexpandablegrid.lookupReference('cancelOrderButton'),
    				                form=orderlineexpandablegrid.lookupReference('form');
    			                	validateButton.disable();
    			                	bulkUpdateButton.disable();
    			                	salesViewOrderbutton.enable();
    			                	salesOrderbutton.disable();
    			                	cancelOrderButton.disable();
    			                	form.disable();
    			                	me.runTime.setAllowOrderLineEdit(false);
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
    			}else
    				Ext.getBody().unmask();
    		});
    	}
    	
    },
    updateOrderLine:function(editor, context, eOpts){
    	var ctx = context,me=this,
        idx = ctx.rowIdx,
        currentRecord = ctx.store.getAt(idx),parms='';
    	var obj=currentRecord.getChanges( ) ;
    	obj.id=currentRecord.id;
    	var isAddressModified=false;
    	var runTime = AOC.config.Runtime;
    	if(idx==0){
    		if(currentRecord.isModified('oracleBilltoSiteNumber') ||  currentRecord.isModified('oracleShiptoSiteNumber')){
				isAddressModified=true;
    	  }
		}
		var obj='{"isAddressModified":'+isAddressModified+',"data":'+Ext.encode(Ext.encode(obj))+',"updateAll":false,"orderQueueId":"'+runTime.getOrderQueueId()+'"}';
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
    cancelOrder:function(){
    	var win = Ext.create('AOC.view.orderqueue.CancelOrderWindow');
        win.show();
    },
    outerGridBulkUpdate:function(editorPlugin,editor,context){
    	editorPlugin.suspendEvent('edit');
    	editorPlugin.completeEdit();
      editorPlugin.resumeEvent('edit');
      var ctx = editorPlugin.context,
          idx = ctx.rowIdx,
          currentRecord = ctx.store.getAt(idx);
      var obj = currentRecord.getChanges();
      var isAddressModified = false;
      var runTime = AOC.config.Runtime;
      if (idx == 0) {
    	  if(currentRecord.isModified('oracleBilltoSiteNumber') ||  currentRecord.isModified('oracleShiptoSiteNumber')){
				isAddressModified=true;
    	  }
      }
      var obj = '{"isAddressModified":' + isAddressModified + ',"data":' + Ext.encode(Ext.encode(obj)) + ',"updateAll":true,"orderQueueId":"' + runTime.getOrderQueueId() + '"}';
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
    		if(record.isModified('oracleBilltoSiteNumber')?record.getModified('oracleBilltoSiteNumber')=='':record.get('oracleBilltoSiteNumber')==''){
    			grid.getPlugin('rowEditing').editor.form.findField('oracleBilltoSiteNumber').enable();
    			grid.getPlugin('rowEditing').editor.form.findField('billToContact').enable();
    			grid.getPlugin('rowEditing').editor.form.findField('billToAddress1').enable();
    			grid.getPlugin('rowEditing').editor.form.findField('billToAddress2').enable();
    			grid.getPlugin('rowEditing').editor.form.findField('billToAddress3').enable();
    			grid.getPlugin('rowEditing').editor.form.findField('billToCity').enable();
    			grid.getPlugin('rowEditing').editor.form.findField('billToCountry').enable();
    			grid.getPlugin('rowEditing').editor.form.findField('billToState').enable();
    			grid.getPlugin('rowEditing').editor.form.findField('billToZip').enable();
    			grid.getPlugin('rowEditing').editor.form.findField('billToEmail').enable();
    			grid.getPlugin('rowEditing').editor.form.findField('billToFax').enable();
    			grid.getPlugin('rowEditing').editor.form.findField('billToTelephone').enable();
    		}
    			
    	}
    },
    innerGridBeforeEditEvent:function(context){
    	if(!this.runTime.getAllowOrderLineEdit())
    		return false;
    	var record=context.record,grid=context.grid,
    	level=record.get('level');
    	if(level==fiberLevel){
    		grid.editingPlugin.editor.form.findField('fiberPercent').enable();
    	}else
    		grid.editingPlugin.editor.form.findField('fiberPercent').disable();
    	return true;
    }
})