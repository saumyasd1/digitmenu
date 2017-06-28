Ext.define('AOC.view.orderqueue.OrderQueueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orderqueue',
    requires: ['AOC.view.orderqueue.SalesOrderExpandableGrid', 
               'AOC.view.advsearch.OrderQueueAdvanceSearch'],
    runTime: AOC.config.Runtime,
    getOrdersBasedOnSearchParameters: function() {
        var OrderQueueStore = Ext.create('AOC.store.OrderQueueStore', {storeId:'OrderQueueId'});
        var bulkupdategrid = this.getView();
        bulkupdategrid.bindStore(OrderQueueStore);
    },
    
    onActivateGrid:function(obj){
    	obj.down('pagingtoolbar').bindStore(obj.getStore());
    	var userInfo = AOCRuntime.getUser(),
	        roleId = userInfo.role,
	        siteId = userInfo.siteId;
    
	    obj.getStore().proxy.extraParams = {
	        siteId: siteId,
	        roleId: roleId
	    };
    },
    onCellClickToView:function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts){
    	var el = Ext.get(e.target);
    	if(cellIndex == 0){
        	this.createContextMenu(record, e);
        }
        if (el.hasCls('vieworderattachment')) {
            var form = Ext.create('Ext.form.Panel', {
                standardSubmit: true,
                url: applicationContext + '/rest/orders/download/orderfile/' + record.get('id')
            });
            form.submit({
                method: 'GET'
            });
        } else if (el.hasCls('viewattachment')) {
            var id = record.get('id');
            var attachmentWin = Ext.create('AOC.view.orderqueue.OrderQueueAttachmentWindow', {
                recordId: id
            });
            attachmentWin.show();
        } else if (el.hasCls('attachment')) {
            var id = e.target.accessKey;
            var form = Ext.create('Ext.form.Panel', {
                standardSubmit: true,
                url: applicationContext + '/rest/orderattachements/download/' + id
            });
            form.submit({
                method: 'GET'
            });
        } else if (el.hasCls('viewemail')) {
            var form = Ext.create('Ext.form.Panel', {
                standardSubmit: true,
                url: applicationContext + '/rest/orders/download/emailbody/' + record.get('emailQueueId')
            });

            form.submit({
                method: 'GET'
            });
        }
        
    },
    onRowContextMenu:function(obj, record, tr, rowIndex, e, eOpts){
    	e.stopEvent();
    	this.createContextMenu(record, e);
    },
    createContextMenu:function(record, e){
    	var me = this;
    	AOCRuntime.setCurrentOrderQueueStatus(record.get('status'));
    	
    	if(me.contextMenu){
    		me.contextMenu.showAt(e.getXY());
    	}else{
    		me.contextMenu = Ext.create('AOC.view.ux.CustomMenu', {
    			items:[
    			    {
    			    	text:'View Order Line',
    			    	iconCls:'x-fa fa-eye',
    			    	itemIndex:0,
    			    	itemId:'viewOrderLineMenuItem'
    			    },{
    			    	text:'View Sales Order',
    			    	iconCls:'x-fa fa-eye',
    			    	itemIndex:1,
    			    	itemId:'viewSalesOrderMenuItem'
    			    },{
    			    	text:'Resubmit Order',
    			    	iconCls:'x-fa fa-globe',
    			    	itemIndex:2,
    			    	itemId:'resubmitOrderMenuItem'
    			    },{
    			    	text:'Material Report',
    			    	iconCls:'x-fa fa-bar-chart',
    			    	itemIndex:3,
    			    	itemId:'materialReportMenuItem'
    			    },{
    			    	text:'Cancel Order',
    			    	iconCls:'x-fa fa-times',
    			    	itemIndex:4,
    			    	itemId:'cancelMenuItem'
    			    }
    			],
    			listeners:{
    				scope:me,
    				click:me.onMenuItemClick,
    				beforeshow:function(menu){
    					var viewOrderBtn = menu.queryById('viewOrderLineMenuItem'),
	    					viewSalesBtn = menu.queryById('viewSalesOrderMenuItem'),
	    					resubmitBtn = menu.queryById('resubmitOrderMenuItem'),
	    					cancelBtn = menu.queryById('cancelMenuItem'),
	    					status = AOCRuntime.getCurrentOrderQueueStatus();
    					
    					//enable/disable view order btn
    					if((status == AOCLit.waitingForCSRStatusOrderQueue) || (status == AOCLit.soGeneratedStatusOrderQueue) 
   							 || (status == AOCLit.soSubmittedStatusOrderQueue)
   								|| (status == AOCLit.bookedStatusOrderQueue)
   									|| (status == AOCLit.errorStatusOrderQueue) || (status == AOCLit.oracleErrorStatusOrderQueue)
   										|| (status == AOCLit.cancelStatusOrderQueue)){
    						viewOrderBtn.setDisabled(false);
    					}else{
    						viewOrderBtn.setDisabled(true);
    					}
    					//enable/disable view sales btn
    					if(status  == AOCLit.soGeneratedStatusOrderQueue 
   							 || status == AOCLit.soSubmittedStatusOrderQueue
   								|| status == AOCLit.bookedStatusOrderQueue
   									|| status == AOCLit.errorStatusOrderQueue || status == AOCLit.oracleErrorStatusOrderQueue){
    						viewSalesBtn.setDisabled(false);
    					}else{
    						viewSalesBtn.setDisabled(true);
    					}
    					//enable/disable view resubmit btn
    					if(status == AOCLit.cancelStatusOrderQueue && AOCRuntime.getUser().role != AOCLit.userRole.superAdmin){
    						resubmitBtn.setDisabled(false);
    					}else{
    						resubmitBtn.setDisabled(true);
    					}
    					//enable/disable view cancel btn
    					if(status == AOCLit.waitingForCSRStatusOrderQueue || status == AOCLit.errorStatusOrderQueue){
    						cancelBtn.setDisabled(false);
    					}else{
    						cancelBtn.setDisabled(true);
    					}
    				}
    			}
    		});
    		me.contextMenu.showAt(e.getXY());
    	}
    },
    onMenuItemClick:function(menu, item, e){
		var me = this;
		if (item.itemIndex == 0) {
	         me.onViewOrderMenuItemClick();
		} else if (item.itemIndex == 1) {
	         me.onViewSalesOrderMenuItemClick();
		} else if (item.itemIndex == 2) {
	         me.onResubmitOrderMenuItemClick();
		} else if(item.itemIndex == 3){
			me.onMaterialReportMenuItemClick();
		}
		else {
	         me.onCancelMenuItemClick();
		}
    },
    onViewOrderMenuItemClick:function(){
    	var me = this,
    		grid = me.getView(),
    		currentRecord = grid.getSelectionModel().getSelection()[0];
    	
    	var id = currentRecord.get('id');
    	var partnerId = currentRecord.get('partnerId');
    	//setting parameters at runtime   
        me.runTime.setOrderQueueId(id);
        me.runTime.setCurrentOrderQueuePartnerId(currentRecord.get('partnerId'));
        me.runTime.setCurrentOrderQueueDefaultSystem(currentRecord.get('defaultSystem'));
        me.runTime.setCurrentOrderQueueSiteId(currentRecord.get('siteId'));
        me.runTime.setCurrentOrderQueueOrgCodeId(currentRecord.get('orgCodeId'));
        me.runTime.setOrderQueueActiveRecord(currentRecord);
		me.runTime.setOrderQueueStatus(currentRecord.get('Status'));
		me.runTime.setAllowOrderLineEdit(true);
		
		Ext.getBody().mask('Loading...');
		
		var storeERPORG = Ext.create('Ext.data.Store', {
			fields:['id','name'],
			proxy: {
				type: 'rest',
				url: applicationContext + '/rest/org/productline/' + currentRecord.get('productLineId'),
				reader: {
					type: 'json',
					rootProperty: 'data'
				}
			}
		});
		
		storeERPORG.load(function(){
			me.runTime.setStoreERPORG(storeERPORG);
			me.viewOrderLineScreen(currentRecord);
			
			//callout.destroy(); // hide action menu items
			Ext.getBody().unmask();
		});
    },
    onViewSalesOrderMenuItemClick:function(){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0];
    	
    	var id = currentRecord.get('id');
		me.runTime.setOrderQueueId(id);
		me.runTime.setOrderQueueActiveRecord(currentRecord);
		me.runTime.setOrderQueueStatus(currentRecord.get('Status'));
		me.runTime.setAllowOrderLineEdit(true);
		var bulkUpdate = Ext.ComponentQuery.query('#bulkUpdateItemId')[0];
		var owner = me.getView().ownerCt;
		var store = Ext.create('AOC.store.SalesOrderStore', {
			proxy: {
				type: 'rest',
				url: applicationContext + '/rest/salesorders/order/' + id,
				reader: {
					type: 'json',
					rootProperty: 'ArrayList'
				}
			}
		});
		owner.insert({
			xtype: 'salesrrderexpandablegrid',
			flex: 1,
			store: store
		});
		owner.getLayout().setActiveItem(1);
    },
    onResubmitOrderMenuItemClick:function(){
    	var me = this,
			grid = me.getView(),
			rec = grid.getSelectionModel().getSelection()[0];
    	
		var orderInMailBody=(Ext.isEmpty(rec.get('orderInMailBody'))) ? false : rec.get('orderInMailBody');
		if(orderInMailBody){
			Helper.showToast('validation', AOCLit.resubmitNotPermissible);
			return false;
		}
		var con=AOC.app.getController('MenuController');
		con.changeTabPanel(4);
		
		var webOrderView=Ext.ComponentQuery.query('weborderview')[0],
			refs = webOrderView.getReferences(),
			weborderform = refs.webform,
			attachmentinfoGrid = refs.webOrderAttachmentInfoGrid,
			partnerCombo = refs.partnerCombo,
			rboCombo = refs.rboCombo,
			dataStructureCombo = refs.dataStructureCombo
			emailField = refs.email,
			subjectField = refs.subject,
			emailBodyField = refs.emailBody;
		
		weborderform.resetFormFields();
		attachmentinfoGrid.store.removeAll();
		attachmentinfoGrid.getView().refresh();
		var partnerId = (Ext.isEmpty(rec.get('partnerId'))) ? '' : rec.get('partnerId'),
			productLineId = (Ext.isEmpty(rec.get('productLineId'))) ? '' : rec.get('productLineId'),
			rboId = (Ext.isEmpty(rec.get('rboId'))) ? '' : rec.get('rboId'),
			senderEmailID = (Ext.isEmpty(rec.get('senderEmailId'))) ? '' : rec.get('senderEmailId'),
			subject =(Ext.isEmpty(rec.get('subject'))) ? '' : rec.get('subject'),
					mailBody =(Ext.isEmpty(rec.get('mailBody'))) ? '': rec.get('mailBody');
		emailBodyField.setValue(mailBody);
		webOrderView.rboId = rboId;
		webOrderView.productLineId = productLineId;
		
		partnerCombo.getStore().load();
		partnerCombo.setValue(partnerId);
		
		//rboCombo.setValue(rboId);
		partnerCombo.isChangedForFirstTime=true;
		rboCombo.isChangedForFirstTime=true;
		
		//dataStructureCombo.setValue(productLineId);
		emailField.setValue(senderEmailID);
		subjectField.setValue(subject);
		
		var response = Ext.Ajax.request({
			async: false,
			url: applicationContext+'/rest/orderattachements/resubmit/'+rec.get('id')+'/'+rec.get('emailQueueId')
		});
		var jsonValue = Ext.decode(response.responseText),
			fileList = jsonValue.viewmail;
		 
		var controller=webOrderView.getController(),
			currentFile = null,
			oldAdditionalFileIdArray = [];
		
		for(var i=0;i<fileList.length;i++){
			var currentFile=fileList[i];
			if(currentFile.fileContentType=="Order"){
				webOrderView.down('#oldOrderFileId').setValue(currentFile.id);
				webOrderView.down('#orderFileType').setValue(currentFile.fileName);
				controller.insertFileInGrid(currentFile.fileName,'Order File Type',false,i+1,currentFile.id,null);
			}else if(currentFile.fileContentType == 'AdditionalData'){
				oldAdditionalFileIdArray.push(currentFile.id);
				controller.insertFileInGrid(currentFile.fileName,'Attachment',true,i+1,currentFile.id,null);
			}
		}
		
		webOrderView.down('#oldAdditionalFileId').setValue(oldAdditionalFileIdArray.join(','));
		webOrderView.down('#oldEmailId').setValue(rec.get('emailQueueId'));
		webOrderView.down('#oldOrderId').setValue(rec.get('id'));
		webOrderView.down('#backButtonimage').show();
		webOrderView.updateHeaderLabel(AOCLit.fixAndResubmitWebOredr);
		weborderform.isResubmit=true;
    },
    onMaterialReportMenuItemClick: function(){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0],
			emailTrack = currentRecord.get('emailQueueId'),
			orderTrack = currentRecord.get('id'),
			localDate = new Date(),
			date = localDate.getDate(),
			month = localDate.getMonth(),
			year = localDate.getFullYear(),
			userDate = date+'/'+month+'/'+year,
			hours = localDate.getHours(),
			minutes = localDate.getMinutes(),
			seconds = localDate.getSeconds(),
			userTimeStamp = hours+':'+minutes+':'+seconds,
			obj = {orderTrack:orderTrack,emailTrack:emailTrack,localDate:userDate, localTime:userTimeStamp },
			query = Ext.JSON.encode(obj);
    	Ext.Ajax.request({
    		url:applicationContext + '/rest/orders/download/materialreport',
    		method:'GET',
    		params:{query:query}
    	});
    },
    onCancelMenuItemClick:function(){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0];
    	
		var id = currentRecord.get('id');
		me.runTime.setOrderQueueId(id);
		me.runTime.setOrderQueueActiveRecord(currentRecord);
		me.runTime.setOrderQueueStatus(currentRecord.get('Status'));
		me.runTime.setAllowOrderLineEdit(true);
		var bulkUpdate = Ext.ComponentQuery.query('#bulkUpdateItemId')[0];
		me.getCancelOrderWindow(id);
    },
  	getReportView:function(obj){
		var win=Ext.create('AOC.view.base.NewBaseWindow',{
			title:'Report',
			width:700,
			items:[{
				xtype:'reportform'
			}]
		});
		win.show();
  	},
  
  	openAdvancedSearchWindow:function(btn){
  		var advanceSearchWin = Ext.create('AOC.view.advsearch.OrderQueueAdvanceSearch',{contextGrid:this.getView()});
  		if(!advanceSearchWin.isVisible()){
  			advanceSearchWin.show();
  		}
  	},
  	onSearchBtnClicked:function(searchBtn){
  	  var view = this.getView(),
  	  	  refs = view.getReferences(),
  	  	  form = refs.orderQueueAdvanceSearchForm.getForm(),
  	  	  values = form.getValues();
  	  	  values.datecriteriavalue = 'createdDate';		
  	  	  store = view.contextGrid.store;
          Helper.advancedSearch(view,values);
  	},
  	clearAdvancedSearch:function(btn){
        var grid = this.getView();
        var store = grid.store;
        store.clearFilter();
        store.loadPage(1);
        btn.hide();
    },
    getQuickSearchResults: function(cmp) {
    	var view = this.getView(),
        value = cmp.getValue();
        Helper.quickSearch(view,{orderQueueId: value}),
        cmp.orderedTriggers[0].show();
    },
    getSearchResults: function(cmp, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.getQuickSearchResults(cmp);
        }
    },
    getAdvancedSearchResults: function(cmp, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onSearchBtnClicked();
        }
    },
    clearSearchResults: function(cmp) {
        var grid = this.getView();
        var store = grid.store;
        store.clearFilter();
        store.loadPage(1);
        cmp.setValue('');
        cmp.orderedTriggers[0].hide();
    },
    viewOrderLineScreen:function(currentRecord){
    	var me = this,
    		id = currentRecord.get('id'),
    	    orderQueueView = Ext.ComponentQuery.query('#orderQueueViewItemId')[0],
			status = currentRecord.get('Status');
	
		orderQueueView.insert({
			xtype: 'orderlinecontainer',
			flex: 1
		});
		
		var orderlinecontainer = orderQueueView.down('orderlinecontainer'),
			orderLineForm = orderlinecontainer.lookupReference('orderLineForm').getForm(),
			orderLineTitle = orderlinecontainer.lookupReference('orderLineTitle'),
			grid = orderlinecontainer.down('orderlineexpandablegrid');
		//active orderline view
		orderQueueView.getLayout().setActiveItem(1);
		
		orderLineForm.setValues(currentRecord.data);//set order line form values
		orderLineTitle.setText('Order Line   (Order Track#: '+ id + ')'); //set orderline title
		
		me.runTime.setOrderLineCurrenProductLine(currentRecord.get('productLineId'));
		
		//Load orderline grid for respective orderqueue id
		grid.store.load({params:{id:id}});
		grid.editGrid = true;
		
		//show/hide validation buttons in orderline sceen
		me.showHideValidationButton(orderlinecontainer, status);
    },
	showHideValidationButton:function(orderlinecontainer, status){
		validateButton = orderlinecontainer.lookupReference('validateButton'),
		bulkUpdateButton=orderlinecontainer.lookupReference('bulkUpdateButton'),
		salesViewOrderbutton= orderlinecontainer.lookupReference('salesViewOrderbutton'),
		salesOrderbutton=orderlinecontainer.lookupReference('salesOrderbutton'),
		cancelOrderButton=orderlinecontainer.lookupReference('cancelOrderButton'),
		form = orderlinecontainer.lookupReference('form');

		var editableFlag = (status == AOCLit.waitingForCSRStatusOrderQueue);
		
		validateButton[editableFlag ? 'enable':'disable']();
		bulkUpdateButton[editableFlag ? 'enable':'disable']();
		salesOrderbutton[editableFlag ? 'enable':'disable']();
		cancelOrderButton[editableFlag ? 'enable':'disable']();
		salesViewOrderbutton[editableFlag ? 'disable':'enable']();
		form[editableFlag ? 'enable':'disable']();
	},
    getCancelOrderWindow: function(id) {
        var win = Ext.create('AOC.view.orderqueue.CancelOrderWindow');
        win.show();
    },
//    notifyByMessage:function(){
//    	var ordersearch=Ext.ComponentQuery.query('#orderqueueadvancesearchIDWindow')[0];
//	 	ordersearch.down('#messageFieldItemId').setValue('').setVisible(true);
//	 	ordersearch.down('#messageFieldItemId').setHidden('true');
//    },
    backButton:function(){
 	   var panel=Ext.ComponentQuery.query('#emailPanel')[0];
	       var emailManagement=panel.down('#EmailMangementitemId');
	       panel.getLayout().setActiveItem(emailManagement);
	       emailManagement.getView().refresh();
	       emailManagement.getStore().load();
    },
   
    onAttachmentGridCellClick:function(view, td, cellIndex, record, tr, rowIndex, e, eOpts ){
		if(e.target.className=='emailAttachmentLink'){
			this.downLoadFile(record.get('filePath'), record.get('fileName'));
		}
	},
	
	downLoadFile:function(filePath, fileName){
		var filePath = filePath +'/'+fileName;
		
		
		var form = Ext.create('Ext.form.Panel', { 
			standardSubmit: true,   
			url : applicationContext+'/rest/orderattachements/download' 
		});
		form.submit({
			getParams: function() {
				return Ext.apply({}, {filePath:encodeURIComponent(filePath)});
			},
			method : 'GET'
		});
	},
	
	onDownloadAttachmentBtnClick:function(){
		var me = this,
			refs = me.getReferences(),
			gridView = refs.attachmentGrid,
			recordsArray = gridView.getSelectionModel().getSelection(),
			len = recordsArray.length;
		
		if(len > 0){
			var interVal = setInterval(function(){
				if(len >= 0 && recordsArray[len-1]){
					me.downLoadFile(recordsArray[len-1].get('filePath'),recordsArray[len-1].get('fileName'));
					len = len-1;
				}else{
					clearInterval(interVal);
				}
				
			},1000);
		}else{
			Helper.showToast('failure', AOCLit.selectAttachmentFileMsg);
		}
	}
});