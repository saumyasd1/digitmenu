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
    	
    	AOCRuntime.setWindowInEditMode(true);
        me.openLocalItemLookupWindow(currentRecord, currentRecord.get('id'));
    
    },
    openLocalItemLookupWindow: function(currentRecord,id){
        var me = this,
        	mode = AOCRuntime.getWindowInEditMode(),
        	title = mode ? 'Edit Local Item Lookup' : 'Add Local Item Lookup';
           	win = Ext.create('AOC.view.localitemlookup.LocalItemLookupWindow', {
                title: title,
                editMode: mode,
                ID: id,
                gridView:me.getView()
            });
       	win.lookupReference('localItemLookupForm').loadRecord(currentRecord);
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
        value = cmp.getValue();
        Helper.quickSearch(view,{glid: value}),
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
        var userInfo = AOCRuntime.getUser(),
            siteId = userInfo.siteId,
        	scOrgCode = ['PYT','PYL','POHKT','POHKL','ADNS','ADNL','ADHK'];
        	vtOrgCode =['VN','PXVN'],
        	szOrgCode = ['SZ','PXSH'],
        	scSZSystem =['Oracle','VIPS'],
        	vtSystem = ['Sparrow','VIPS'];
        	
        switch (siteId){
			case 2: grid.getStore().proxy.extraParams = {
					orgCode:scOrgCode.join(),
					systemName:scSZSystem.join()
			};
			case 3:  grid.getStore().proxy.extraParams = {
					orgCode:szOrgCode.join(),
					systemName:scSZSystem.join()
			};
			case 4:  grid.getStore().proxy.extraParams = {
					orgCode:vtOrgCode.join(),
					systemName:vtSystem.join()
			};
        }
    }
});