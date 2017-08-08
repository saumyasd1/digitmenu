Ext.define('AOC.view.localitemlookup.LocalItemLookupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.localitemlookupcontroller',
    
    onCellClick:function(obj, td, cellIndex, record, tr, rowIndex, e){
    	if(cellIndex == 1){
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
    			    	text:'Edit',
    			    	iconCls:'x-fa fa-pencil-square-o',
    			    	itemIndex:0,
    			    	itemId:'editMenuItem'
    			    }, {
    			    	text:'Delete',
    			    	iconCls:'x-fa fa-trash',
    			    	itemIndex:1,
    			    	itemId:'deleteMenuItem'
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
	         me.onEditMenuItemClick();
		} else if (item.itemIndex == 1) {
	         me.onDeleteMenuItemClick();
		}
    },
    onEditMenuItemClick:function(){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0];
    	
        me.openLocalItemLookupWindow(currentRecord, 'edit', 'Edit Local Item Lookup');
    },
    onAddBtnClick:function(btn){
    	this.openLocalItemLookupWindow('', 'add', 'Add Local Item Lookup');
    },
    openLocalItemLookupWindow: function(currentRecord, mode, title){
        var me = this,
           	win = Ext.create('AOC.view.localitemlookup.LocalItemLookupWindow', {
                title: title,
                mode: mode,
                rec:currentRecord,
                gridView:me.getView()
            });
        
        if(mode == 'edit'){
        	win.lookupReference('localItemLookupForm').loadRecord(currentRecord);
        }
        
        win.show(); 	
    },
    onDeleteMenuItemClick:function(){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0];
    	
    	Ext.Msg.confirm('Alert', AOCLit.deleteLocalItemMsg, function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    method: 'DELETE',
                    url: applicationContext + '/rest/localitem/' + currentRecord.get('id'),
                    success: function (response, opts) {
                        Helper.showToast('Success', AOCLit.deleteLocalItemSuccessMsg);
                        grid.store.load();
                    },
                    failure: function (response, opts) {}
                });
            }
        }, grid);
    },
    getQuickSearchResults: function(cmp) {
    	var view = this.getView(),
	        value = cmp.getValue(),
	        orgStore = Ext.data.StoreManager.lookup('orgComboStoreId') == null ? Ext.create('AOC.store.OrgComboStore') : Ext.data.StoreManager.lookup('orgComboStoreId'),
			systemStore = Ext.data.StoreManager.lookup('systemComboStoreId') == null ? Ext.create('AOC.store.SystemComboStore') : Ext.data.StoreManager.lookup('systemComboStoreId');
			orgCodeArray = [],
			systemArray = [];
		if(orgStore.getCount() > 0){
    		orgStore.each(function(rec){
    			orgCodeArray.push(rec.get('name'));
    		});
		}
		if(systemStore.getCount() > 0){
    		systemStore.each(function(rec){
    			systemArray.push(rec.get('name'));
    		});
		}
        Helper.quickSearch(view,{glid: value,orgCode:orgCodeArray.join(),systemName:systemArray.join()}),
        cmp.orderedTriggers[0].show();
    },
    getSearchResults: function(cmp, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.getQuickSearchResults(cmp);
        }
    },
    openAdvancedSearchWindow:function(){
    	var advanceSearchWin = Ext.create('AOC.view.advsearch.LocalItemLookupAdvancedSearch',{contextGrid:this.getView()});
    	if(!advanceSearchWin.isVisible()){
    		advanceSearchWin.show();
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
    onSearchBtnClicked:function(btn){
    	  var view = this.getView(),
    	  	  refs = view.getReferences(),
    	  	  form = refs.localItemLookupAdvanceSearchForm.getForm(),
    	  	  values = form.getValues();
    	  
        values.datecriteriavalue = 'lastModifiedDate';
        store = view.contextGrid.store;
        
        if(values.orgCode == ''){
        	var orgStore = Ext.data.StoreManager.lookup('orgComboStoreId') == null ? Ext.create('AOC.store.OrgComboStore') : Ext.data.StoreManager.lookup('orgComboStoreId'),
				orgCodeArray = [];
			if(orgStore.getCount() > 0){
	    		orgStore.each(function(rec){
	    			orgCodeArray.push(rec.get('name'));
	    		});
			}
    	  values.orgCode = orgCodeArray.join();
        }
        if(values.systemName == ''){
        	var systemStore = Ext.data.StoreManager.lookup('systemComboStoreId') == null ? Ext.create('AOC.store.SystemComboStore') : Ext.data.StoreManager.lookup('systemComboStoreId'),
    			systemArray = [];
        	if(systemStore.getCount() > 0){
	    		systemStore.each(function(rec){
	    			systemArray.push(rec.get('name'));
	    		});
			}
        	values.systemName = systemArray.join();
        }
        Helper.advancedSearch(view, values);
      },
    deleteRecords:function(){
    	var me = this,
			grid = me.getView(),
			refs = me.getReferences(),
			deleteBtn = refs.deleteBtn,
			currentRecord = grid.getSelectionModel().getSelection(),
    		len = currentRecord.length,
    		idArray = [];
    		
    	
    	for(i = 0 ; i < len ; i++){
    		idArray.push(currentRecord[i].get('id'));
    	}
    	var values = Ext.JSON.encode({recordId:idArray.join()});
    	
    	Ext.Msg.confirm('Alert', AOCLit.deleteLocalItemMsg, function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    method: 'PUT',
                    url: applicationContext + '/rest/localitem/deleterecords',
                    jsonData:values,
                    success: function (response, opts) {
                        Helper.showToast('Success', AOCLit.deleteLocalItemSuccessMsg);
                        grid.store.load();
                        deleteBtn.setDisabled(true);
                        
                    },
                    failure: function (response, opts) {}
                });
            }
        }, grid);
    },
    onSelectRecord:function(){
    	var me = this,
    		grid = me.getView(),
    		refs = me.getReferences(),
    		deleteBtn = refs.deleteBtn,
    		recordCount = grid.getSelectionModel().getSelection().length;
    	
    	if(recordCount > 1 ){
    		deleteBtn.setDisabled(false);
    	}
    	else{
    		deleteBtn.setDisabled(true);
    	}
    },
    onActivateGrid:function(grid){
        var orgStore = Ext.data.StoreManager.lookup('orgComboStoreId') == null ? Ext.create('AOC.store.OrgComboStore') : Ext.data.StoreManager.lookup('orgComboStoreId'),
    		systemStore = Ext.data.StoreManager.lookup('systemComboStoreId') == null ? Ext.create('AOC.store.SystemComboStore') : Ext.data.StoreManager.lookup('systemComboStoreId');
    		orgCodeArray = [],
    		systemArray = [];
    		if(orgStore.getCount() > 0){
	    		orgStore.each(function(rec){
	    			orgCodeArray.push(rec.get('name'));
	    		});
    		}
    		if(systemStore.getCount() > 0){
	    		systemStore.each(function(rec){
	    			systemArray.push(rec.get('name'));
	    		});
    		}
    		
    		grid.getStore().proxy.extraParams = {
				orgCode:orgCodeArray.join(),
				systemName:systemArray.join()
			};
    },
    onComboBlur:function(field){
    	Helper.clearCombo(field);
    }
});