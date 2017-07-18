Ext.define('AOC.view.localitemlookup.LocalItemLookupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.localitemlookupcontroller',
    
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
    }
});