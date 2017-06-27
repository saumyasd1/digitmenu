Ext.define('AOC.view.address.AddressController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.addresscontroller',
    requires: ['AOC.view.advsearch.AddressAdvanceSearch'],
    
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
    			    	text:'Edit',
    			    	iconCls:'x-fa fa-pencil-square-o',
    			    	itemIndex:0,
    			    	itemId:'editAddressMenuItem'
    			    }, {
    			    	text:'View',
    			    	iconCls:'x-fa fa-eye',
    			    	itemIndex:1,
    			    	itemId:'viewAddressMenuItem'
    			    }, {
    			    	text:'Delete',
    			    	iconCls:'x-fa fa-trash-o',
    			    	itemIndex:2,
    			    	itemId:'deleteAddressMenuItem'
    			    }
    			],
    			listeners:{
    				scope:me,
    				click:me.onMenuItemClick,
    				beforeshow:function(menu){
    					var editAddressMenuItem = menu.queryById('editAddressMenuItem'),
    						viewAddressMenuItem = menu.queryById('viewAddressMenuItem'),
    						deleteAddressMenuItem = menu.queryById('deleteAddressMenuItem');
    					
    					 if (AOCRuntime.getUser().role == 3) {
    						 editAddressMenuItem.setDisabled(true);
    						 deleteAddressMenuItem.setDisabled(true);
    						 viewAddressMenuItem.setDisabled(false);
    					 }else{
    						 viewAddressMenuItem.setDisabled(true);
    						 editAddressMenuItem.setDisabled(false);
    						 deleteAddressMenuItem.setDisabled(false);
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
	         me.onEditAddressItemClick();
		} else if (item.itemIndex == 1) {
	         me.onViewAddressItemClick();
		}else if (item.itemIndex == 2) {
	         me.onDeleteAddressMenuItemClick();
		}
    },
    onEditAddressItemClick:function(){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0];
    	
    	AOCRuntime.setWindowInEditMode(true);
        me.openAddAddressWindow(currentRecord, currentRecord.get('id'), 'Edit Address');
    },
    onViewAddressItemClick:function(){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0];
    	
    	 AOCRuntime.setWindowInEditMode(true);
         me.openAddAddressWindow(currentRecord, currentRecord.get('id'), 'View Address');
    },
    onDeleteAddressMenuItemClick:function(){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0];
    	
    	Ext.Msg.confirm('Alert', AOCLit.deleteAddressMsg, function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    method: 'DELETE',
                    url: applicationContext + '/rest/address/' + currentRecord.get('id'),
                    success: function (response, opts) {
                        Helper.showToast('Success', AOCLit.deleteAddMsg);
                        AOCRuntime.getActiveGrid().store.load();
                    },
                    failure: function (response, opts) {}
                });
            }
        });
    },
    clearAdvancedSearch: function (btn) {
        var grid = this.getView();
        var store = grid.store;
        
        store.clearFilter();
        store.loadPage(1);
        btn.hide();
    },
    getQuickSearchResults: function (cmp) {
        var view = this.getView(),
            value = cmp.getValue();
        
        Helper.quickSearch(view, {
            siteNumber: value
        }),
        cmp.orderedTriggers[0].show();
    },
    getSearchResults: function (cmp, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.getQuickSearchResults(cmp);
        }
    },
    clearSearchResults: function (cmp) {
        var grid = this.getView();
        var store = grid.store;
        store.clearFilter();
        store.loadPage(1);
        cmp.setValue('');
        cmp.orderedTriggers[0].hide();
    },
    getAdvancedSearchResults: function (cmp, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onSearchBtnClicked();
        }
    },

    openAdvancedSearchWindow: function () {
        var advanceSearchWin = Ext.create('AOC.view.advsearch.AddressAdvanceSearch', {
            contextGrid: this.getView()
        });
        if (!advanceSearchWin.isVisible()) {
            advanceSearchWin.show();
        }
    },
    onSearchBtnClicked: function (btn) {
        var view = this.getView(),
            refs = view.getReferences(),
            form = refs.addressAdvanceSearchForm.getForm(),
            values = form.getValues();
        
        values.datecriteriavalue = 'createdDate';
        store = view.contextGrid.store;
        Helper.advancedSearch(view, values);
    },
    openAddAddressWindow: function (currentRecord, id, title) {
        var mode = AOCRuntime.getWindowInEditMode(),
//        	title = mode ? 'Edit Address' : 'Add Address';
           	win = Ext.create('AOC.view.address.AddAddressWin', {
                title: title,
                rec: currentRecord,
                editMode: mode,
                ID: id
            });
           	
         win.show(); 	
    }
});
