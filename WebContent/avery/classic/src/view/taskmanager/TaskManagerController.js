Ext.define('AOC.view.taskmanager.TaskManagerController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.taskmanagercontroller',
    runTime : AOC.config.Runtime,
    requires:[
        'AOC.view.taskmanager.AssignCSRWindow'
    ],
    
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
    	
    	if(me.contextMenu){
    		me.contextMenu.showAt(e.getXY());
    	}else{
    		me.contextMenu = Ext.create('AOC.view.ux.CustomMenu', {
    			items:[
    			    {
    			    	text:'View Mail',
    			    	iconCls:'x-fa fa-eye',
    			    	itemIndex:0,
    			    	itemId:'viewMailMenuItem'
    			    },{
    			    	text:'Assign CSR',
    			    	iconCls:'x-fa fa-address-book-o',
    			    	itemIndex:1,
    			    	itemId:'assignCSRMenuItem'
    			    }
    			],
    			listeners:{
    				scope:me,
    				click:me.onMenuItemClick
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
	         me.onAssignCSRMenuItemClick();
		}
    },
    onViewMailItemClick:function(){
    	var me = this,
			currentRecord = me.getView().getSelectionModel().getSelection()[0];
    	
    	var id = currentRecord.get('id'),
		panel = Ext.ComponentQuery.query('#taskManagerItemId')[0],
		taskManagerGrid = panel.queryById('TaskManagerGriditemId');
		form = panel.down('#viewmailformItemId'),
		viewMail = panel.down('#viewMailItemId');
		
		//(Amit Kumar)hide some fields from view mail from if user views from taskmanager
		Helper.showHideEmailBodySubjectFields(form, currentRecord);
		
		viewMail.queryById('saveAttachment').hide();
		viewMail.queryById('processOrderBtn').hide();
		viewMail.queryById('assignCSRBtn').show();
		viewMail.currentRecordId = id;
		viewMail.currentSiteId = currentRecord.get('siteId');
		viewMail.contextGrid = taskManagerGrid;
		
		form.queryById('partnerName').hide();
		form.loadRecord(currentRecord);
		
	    store = Ext.create('AOC.store.ViewMailformStore',{
	        storeId: 'ViewMailformStoreId',
	        totalCount: 'totalCount',
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
	   
		var emailAttachmentGrid = panel.down('#EmailAttachmentInfoGriditemId');
		emailAttachmentGrid.status = AOCLit.emailIdentifiedStatus;
		emailAttachmentGrid.bindStore(store);
		
		//(AK)Hide some columns(PartnerDataStructure,FileContentType,FileConentMatch..) if user view mail from taskmanager
		me.showHideEmailAttachmentGridColumns(emailAttachmentGrid);
		
		panel.getLayout().setActiveItem(1);
		me.runTime.setActiveGrid(emailAttachmentGrid);
    },
    onAssignCSRMenuItemClick:function(){
    	var me = this,
			currentRecord = me.getView().getSelectionModel().getSelection()[0];
    	
    	var id = currentRecord.get('id');
		
		var assignCsrWin  = Ext.create('AOC.view.taskmanager.AssignCSRWindow',{
			callback:function(rec){
				var taskManagerPanel = Ext.ComponentQuery.query('#taskManagerItemId')[0],
					taskManagerGrid = taskManagerPanel.queryById('TaskManagerGriditemId');
				
				assignCsrWin.mask(AOCLit.pleaseWaitTitle);
		    	Ext.Ajax.request({
		    		method:'GET',
		    		url: applicationContext+'/rest/emailqueue/assigncsr/'+rec.recordId+'/'+rec.assignCSRId,
		    		params:{
		    			userId: AOCRuntime.getUser().id
		    		},
				    success : function(response, opts) {
				    	assignCsrWin.unmask();
				  		Helper.showToast('Success','CSR assigned successfully');
				  		assignCsrWin.close();
				  		taskManagerGrid.store.load();
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
    
    showHideEmailAttachmentGridColumns:function(emailAttachmentGrid){
    	var columns = emailAttachmentGrid.columns;

		columns[1].hide();
		columns[2].hide();
		columns[3].hide();
		columns[5].hide();
		columns[6].hide();
		columns[7].hide();
    },
    
    //Advance/quick search section
    getQuickSearchResults: function(cmp) {
    	var view = this.getView(),
        value = cmp.getValue();
        Helper.quickSearch(view,{Subject: value}),
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
    	var advanceSearchWin = Ext.create('AOC.view.advsearch.TaskManagerAdvanceSearch',{contextGrid:this.getView()});
    	if(!advanceSearchWin.isVisible()){
  		  advanceSearchWin.show();
  	  }
    },
    onSearchBtnClicked:function(btn){
  	  var view = this.getView(),
  	  	  refs = view.getReferences(),
  	  	  form = refs.taskManagerAdvanceSearchForm.getForm(),
  	  	  values = form.getValues();
  	      values.datecriteriavalue = 'receivedDate';
  	  	  store = view.contextGrid.store;
          Helper.advancedSearch(view,values);
    }
  //End Of Advance/quick search section
});
