Ext.define('AOC.view.users.manage.UserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usermain',
    
    createuser: function () {
        var me = this,
            win = Ext.create('AOC.view.users.myprofile.AddUserWindow', {
                gridView: me.getView(),
                mode:'add',
                bindFlag:true
            });
        win.showBy(Ext.getBody());
    },
    CancelDetails: function () {
        Ext.getBody().unmask();
        var win = Ext.ComponentQuery.query('#userWindowItemId')[0];
        win.close();
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
    	AOCRuntime.setCurrentUserRecord(record.data);
    	
    	if(me.contextMenu){
    		me.contextMenu.showAt(e.getXY());
    	}else{
    		me.contextMenu = Ext.create('AOC.view.ux.CustomMenu', {
    			items:[
    			    {
    			    	text:'Edit',
    			    	iconCls:'x-fa fa-pencil-square-o',
    			    	itemIndex:0,
    			    	itemId:'editUserMenuItem'
    			    }
    			],
    			listeners:{
    				scope:me,
    				click:me.onMenuItemClick,
    				beforeshow:function(menu){
    					var editBtn = menu.queryById('editUserMenuItem'),
	    					currentUserRec = AOCRuntime.getCurrentUserRecord();;
    					
    					if(currentUserRec.role == AOCRuntime.getUser().role){
    						editBtn.setDisabled(true);
    					}else{
    						editBtn.setDisabled(false);
    					}
    				}
    			}
    		});
    		me.contextMenu.showAt(e.getXY());
    	}
    },
    
    onMenuItemClick:function(menu, item, e){
		var me = this;
		if(item){
			if (item.itemIndex == 0) {
		         me.onEditAddressItemClick();
			} 
		}
    },
    
    onEditAddressItemClick:function(){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0];
    	
    	var data = currentRecord.data,
         	id = data.id,
         	win = Ext.create('AOC.view.users.myprofile.AddUserWindow', {
	             mode: 'edit',
	             ID: id,
	             gridView: grid,
	             bindFlag:true,
	             title:'Edit User'
         	});
     
	     var refs = win.getReferences(),
	         profileImage = refs.profileImage,
	         systemCsrCodeGrid = refs.systemCsrCodeGrid,
	         systemCsrCodeGridStore = systemCsrCodeGrid.store,
	         systemCombo = refs.systemName,
	         userId = AOCRuntime.getUser().id;
	     
	     if (id == userId) {
	         win.down('#site').setDisabled(true);
	         win.down('#role').setHidden(true);
	         win.down('#roledisplayfield').setHidden(false);
	     }
	     else{
	     	if(userId == 1){
	         	win.down('#newPassword').setHidden(false);
	         	win.down('#confirmPassword').setHidden(false);
	     	}
	     }
	     
	     win.lookupReference('addEditUserWinForm').loadRecord(currentRecord);
	     profileImage.setSrc(Helper.getFilePath(currentRecord));
	     
	     var systemCsrCodeOwner = data.systemCsrCodeOwner,
     		 systemCsrNonCodeOwner = data.systemCsrNonCodeOwner,
	     	 systemCsrCombinedCodes = '';
	     
	     if((systemCsrCodeOwner != null && !Ext.isEmpty(systemCsrCodeOwner.trim())) 
	    		 && (systemCsrNonCodeOwner !=null && !Ext.isEmpty(systemCsrNonCodeOwner.trim()))){
	         systemCsrCombinedCodes = systemCsrCodeOwner+","+systemCsrNonCodeOwner;
	     }else{
	     	if(!Ext.isEmpty(systemCsrCodeOwner) && !Ext.isEmpty(systemCsrCodeOwner.trim())){
	     		systemCsrCombinedCodes = systemCsrCodeOwner;
	     	}
	     	else if(!Ext.isEmpty(systemCsrNonCodeOwner) && !Ext.isEmpty(systemCsrNonCodeOwner.trim())){
        		systemCsrCombinedCodes = systemCsrNonCodeOwner;
	     	}
	     }
	     if(!Ext.isEmpty(systemCsrCombinedCodes.trim())){
	     	Helper.loadSystemCsrCodeGrid(systemCsrCodeGrid, systemCsrCodeOwner, systemCsrNonCodeOwner, systemCsrCombinedCodes);
	     }
	     
	     if (win.mode == 'edit') {
	         systemCombo.setDisabled(false);
	         Helper.getSystemComboList(currentRecord.data.siteId);
	         systemCombo.store.load();
	     }
	     setTimeout(function(){
	     	win.show();
	     	win.center();
	     },400);
    },
    onDeleteMenuItemClick:function(){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0];
    	
    	 var id = currentRecord.get('id');
         var msg = AOCLit.deleteUserMsg;
         
         Ext.Msg.confirm('Alert', AOCLit.delUserMsg,
             function (btn) {
             	if (btn == 'yes') {
             		Ext.Ajax.request({
             			method: 'DELETE',
             			url: applicationContext + '/rest/users/' + id,
             			success: function (response, opts) {
             				Helper.showToast('Success', msg);
             				AOCRuntime.getActiveGrid().store.load();
             			},
             			failure: function (response, opts) {
             				msg = response.responseText;
             				Helper.showToast('failure', msg);
             				view.unmask();
             				view.close();
             			}
             		});
             	}
         	}
         );
    },
    hideMandatoryMessage: function () {
        var obj = this.getView();
        Helper.hideMandatoryMessage(obj);
    },
    notifyByMessage: function () {
        var obj = this.getView();
        Helper.notifyByMessage(obj);
    },
    notifyByImage: function (config) {
    	Helper.notifyByImage(config);
    },
    getQuickSearchResults: function (cmp) {
        var store = this.getView().store;
        var value = cmp.getValue();
        if (value != null && value != '') {
            store.proxy.setFilterParam('query');
            var parameters = '{"email":"' + value + '"}';
            store.setRemoteFilter(true);
            if (!store.proxy.hasOwnProperty('filterParam')) {
                store.proxy.setFilterParam('query');
            }
            store.proxy.encodeFilters = function (filters) {
                return filters[0].getValue();
            };
            store.filter({
                id: 'query',
                property: 'query',
                value: parameters
            });
        }
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
    }
});
