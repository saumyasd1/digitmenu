Ext.define('AOC.view.email.EmailManagementController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.emailManagementController',
    
    onActivateGrid:function(grid){
    	grid.down('pagingtoolbar').bindStore(grid.getStore());
    	
    	 var userInfo = AOCRuntime.getUser(),
	         roleId = userInfo.role,
	         siteId = userInfo.siteId;
    	 
    	 grid.getStore().proxy.extraParams = {
	         siteId: siteId,
	         roleId: roleId
	     };
    },
    onCellClick:function(obj, td, cellIndex, record, tr, rowIndex, e){
    	if(cellIndex == 0){
    		this.createContextMenu(record, e);
    	}
    },
    onRowContextMenu:function(obj, record, tr, rowIndex, e, eOpts){
    	e.stopEvent();
    	this.createContextMenu(record, e);
    },
    createContextMenu:function(record, e){
    	var me = this;
    	AOCRuntime.setCurrentEmailQueueStatus(record.get('status'));
    	AOCRuntime.setCurrentOrderQueueCount(record.get('orderQueueCount'));
    	
    	if(me.contextMenu){
    		me.contextMenu.showAt(e.getXY());
    	}else{
    		me.contextMenu = Ext.create('AOC.view.ux.CustomMenu', {
    			items:[
    			    {
    			    	text:'View Mail',
    			    	iconCls:'x-fa fa-eye',
    			    	itemIndex:0,
    			    	itemId:'emailViewMailMenuItem'
    			    }, {
    			    	text:'View Order',
    			    	iconCls:'x-fa fa-globe',
    			    	itemIndex:1,
    			    	itemId:'emailViewOrderMenuItem'
    			    }, {
    			    	text:'Assign CSR',
    			    	iconCls:'x-fa fa-address-book-o',
    			    	itemIndex:2,
    			    	itemId:'emailAssignCSRMenuItem'
    			    }, {
    			    	text:'Move To Task Manager',
    			    	iconCls:'x-fa fa-arrows',
    			    	itemIndex:3,
    			    	itemId:'moveToTaskManagerMenuItem'
    			    }
    			],
    			listeners:{
    				scope:me,
    				click:me.onMenuItemClick,
    				beforeshow:function(menu){
    					var emailViewMailMenuItem = menu.queryById('emailViewMailMenuItem'),
    						emailViewOrderMenuItem = menu.queryById('emailViewOrderMenuItem'),
	    					emailAssignCSRMenuItem = menu.queryById('emailAssignCSRMenuItem'),
	    					moveToTaskManagerMenuItem = menu.queryById('moveToTaskManagerMenuItem'),
	    					status = AOCRuntime.getCurrentEmailQueueStatus(),
    						orderQueueCount = AOCRuntime.getCurrentOrderQueueCount();
    					
    					//enable/diable view mail btn
    					if(Helper.isEmailQueueViewMailEnabled(status)){
    						emailViewMailMenuItem.setDisabled(false);
            			}else{
            				emailViewMailMenuItem.setDisabled(true);
            			}
    					//enable/disable view order btn
    					if(Helper.isEmailQueueViewOrderEnabled(status, orderQueueCount)){
    						emailViewOrderMenuItem.setDisabled(false);
            			}else{
            				emailViewOrderMenuItem.setDisabled(true);
            			}
    					//enable/disable moveto task manager btn
    					if(Helper.isEmailQueueMoveToTaskManagerEnabled(status)){
    						moveToTaskManagerMenuItem.setDisabled(false);
            			}else{
            				moveToTaskManagerMenuItem.setDisabled(true);
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
	         me.onViewMailItemClick();
		} else if (item.itemIndex == 1) {
	         me.onViewOrderItemClick();
		}else if (item.itemIndex == 2) {
	         me.onAssignCSRMenuItemClick();
		}else if (item.itemIndex == 3) {
	         me.onMoveToTaskManagerMenuItemClick();
		}
    },
    onViewMailItemClick:function(menu, item, e){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0];
    	
    	var id = currentRecord.get('id'),
			panel = Ext.ComponentQuery.query('#emailManagementItemId')[0],
			form = panel.down('#viewmailformItemId'),
			emailAttachmentInfoGrid = panel.down('#EmailAttachmentInfoGriditemId');
		
		Helper.showHideEmailBodySubjectFields(form, currentRecord);
		form.loadRecord(currentRecord);
		
		store = Ext.create('AOC.store.ViewMailformStore',{
			storeId: 'ViewMailformStoreId',
			totalCount: 'total',
			proxy : {
				type : 'rest',
				url : applicationContext+'/rest/orderattachements/order/'+id,
				reader:{
					type:'json', 
					rootProperty: 'viewmail',
					totalProperty: 'totalCount'
				}
			}
		});
		
		emailAttachmentInfoGrid.trackingId = id;
		emailAttachmentInfoGrid.status = currentRecord.get('status');
		emailAttachmentInfoGrid.bindStore(store); //Bind Store to viewmail grid
		
		panel.getLayout().setActiveItem(1);
		AOCRuntime.setActiveGrid(emailAttachmentInfoGrid);
    },
    onViewOrderItemClick:function(menu, item, e){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0];
    	
		AOC.app.fireEvent('changemainview','orderqueueview', currentRecord.get('id'), AOCLit.tablist.orderQueueTabIndex);
    },
    onAssignCSRMenuItemClick:function(menu, item, e){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0];
    	
    	var id = currentRecord.get('id'),
			assignCsrWin  = Ext.create('AOC.view.taskmanager.AssignCSRWindow',{
				callback:function(rec){
					var emailPanel = Ext.ComponentQuery.query('#emailManagementItemId')[0],
						emailGrid = emailPanel.queryById('emailManagementGrid');
					
					assignCsrWin.mask(AOCLit.pleaseWaitTitle);
			    	Ext.Ajax.request({
			    		method:'GET',
			    		url: applicationContext+'/rest/emailqueue/assigncsr/'+rec.recordId+'/'+rec.assignCSRId,
			    		params:{
			    			userId: AOCRuntime.getUser().id,
			    			changeStatus:false
			    		},
					    success : function(response, opts) {
					    	assignCsrWin.unmask();
					  		Helper.showToast('Success','CSR assigned successfully');
					  		assignCsrWin.close();
					  		emailGrid.store.load();
				        },
				        failure: function(response, opts) {
				        	assignCsrWin.unmask();
						}
					});
				},
				recordId:id,
				siteId:currentRecord.get('siteId')
			});
		 assignCsrWin.show();
    },
    onMoveToTaskManagerMenuItemClick:function(menu, item, e){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0];
    	
		var id = currentRecord.get('id'),
			win = Ext.create('AOC.view.email.CancelEmailWindow');
		
		win.show();
		AOCRuntime.setOrderEmailQueueId(id);
		AOCRuntime.setOrderEmailQueueStatus(currentRecord.get('status'));
    },
    
    //Adv search section
    getQuickSearchResults: function(cmp) {
    	var view = this.getView(),
        value = cmp.getValue();
        Helper.quickSearch(view,{id: value}),
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
    clearAdvancedSearch:function(btn){
        var grid = this.getView();
        var store = grid.store;
        store.clearFilter();
        store.loadPage(1);
        btn.hide();
    },
    
    openAdvancedSearchWindow:function(){
    	var advanceSearchWin = Ext.create('AOC.view.advsearch.EmailQueueAdvanceSearch',{contextGrid:this.getView()});
    	if(!advanceSearchWin.isVisible()){
    		advanceSearchWin.show();
    	}
    },
    onSearchBtnClicked:function(btn){
  	  var view = this.getView(),
  	  	  refs = view.getReferences(),
  	  	  form = refs.emailQueueAdvanceSearchForm.getForm(),
  	  	  values = form.getValues();
  	  
      values.datecriteriavalue = 'receivedDate';
  	  store = view.contextGrid.store;
      Helper.advancedSearch(view, values);
    }
});