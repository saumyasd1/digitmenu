Ext.define('AOC.view.home.HomePageController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.homepagecontroller',
    runTime: AOC.config.Runtime,
    onRefreshClick:function(btn){
    	var view = this.getView();
    	view.store.load();
    },
    onOrderQueueStatusCellClick:function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
    	var me = this,
    		grid = me.getView(),
    		store = grid.store,
    		columns = grid.columns,
    		endDate = new Date(),
    		days =0,
    		dataIndex = columns[cellIndex].dataIndex,
    		status=[];
    	
    	if(cellIndex == 0 || record.get(dataIndex) == 0){
			return;
		}
    	
    	switch(dataIndex){
    		case 'lastOneDay' :
    			days=1;
    			break;
    		case 'lastWeek' :
    			days=7;
    			break;
    		case 'lastTwoWeek' :
    			days=14;
    			break;
    		case 'lastMonth' :
    			days=30;
    			break;
    	}
    	
		
		if(record.get('orderType') == 'Total Count'){
			store.each(function(rec){
				status.push(rec.get('statusCode'));
			});
		}else{
			status.push(record.get('statusCode'));
		}
		status = status.join(',');
		
		var parameters = '{"days":"' +days + '","Status":"' + status +'"}';
		if(record.get('type') == 'orderqueue'){
			me.filterOrderQueueList(parameters);
		}
		else if(record.get('type') == 'emailqueue'){
			me.filterEmailQueueList(parameters);
		}
		else if(record.get('type') == 'taskmanager'){
			me.filterTaskManagerList(parameters);
		}
	},
	filterOrderQueueList:function(parameters){
		var store = Ext.StoreManager.lookup('OrderQueueStore');
		store.proxy.setFilterParam('query');
        
		store.setRemoteFilter(true);
        if (!store.proxy.hasOwnProperty('filterParam')) {
            store.proxy.setFilterParam('query');
        }
        store.proxy.encodeFilters = function(filters) {
            return filters[0].getValue();
        };
        
        Helper.changeScreen('orderqueueview', AOCLit.tablist.orderQueueTabIndex);
		
		Ext.ComponentQuery.query('app-main orderqueuegrid #clearadvanedsearch')[0].setVisible(true);
		store.filter({
			id: 'query',
			property: 'query',
			value: parameters
		});
	},
	filterEmailQueueList:function(parameters){
		var store = Ext.StoreManager.lookup('EmailManagementStoreId');
		store.proxy.setFilterParam('query');
        
		store.setRemoteFilter(true);
        if (!store.proxy.hasOwnProperty('filterParam')) {
            store.proxy.setFilterParam('query');
        }
        store.proxy.encodeFilters = function(filters) {
            return filters[0].getValue();
        };
        
        Helper.changeScreen('emailmanagement', AOCLit.tablist.emailQueueTabIndex);
		
		Ext.ComponentQuery.query('app-main emailmanagementgrid #clearadvanedsearch')[0].setVisible(true);
		store.filter({
			id: 'query',
			property: 'query',
			value: parameters
		});
	},
	filterTaskManagerList:function(parameters){
		var store = Ext.StoreManager.lookup('TaskManagerStoreId');
		store.proxy.setFilterParam('query');
        
		store.setRemoteFilter(true);
        if (!store.proxy.hasOwnProperty('filterParam')) {
            store.proxy.setFilterParam('query');
        }
        store.proxy.encodeFilters = function(filters) {
            return filters[0].getValue();
        };
        
        Helper.changeScreen('taskmanager', AOCLit.tablist.taskManagerTabIndex);
		
		Ext.ComponentQuery.query('app-main taskmanagergrid #clearadvanedsearch')[0].setVisible(true);
		store.filter({
			id: 'query',
			property: 'query',
			value: parameters
		});
	},
	onRefreshRateComboSelect:function(combo){
		var me = this,
			value = combo.getValue();
		
		switch(value){
			case 0 :
				if(me.refreshinterval){
					clearInterval(me.refreshinterval);
				}
					break;
			case 5 : var sec = 5*60*1000;
				me.refreshGridByInterval(sec);
				break;
			case 10 : var sec = 10*60*1000;
				me.refreshGridByInterval(sec);
				break;
			case 15 : var sec = 15*60*1000;
				me.refreshGridByInterval(sec);
				break;
		}
	},
	refreshGridByInterval:function(secs){
		var me = this;
		if(me.refreshinterval){
			clearInterval(me.refreshinterval);
		}
		me.refreshinterval = setInterval(function(){
			me.onRefreshClick();
		},secs);
	},
	onAfterRenderSiteCombo: function(obj){
	    var userInfo = AOCRuntime.getUser(),
	    	userId = userInfo.id,
	    	siteId = userInfo.siteId,
	    	roleId = userInfo.role;
	    
	    obj.getStore().proxy.extraParams = {
		    siteId: siteId,
		    userId: userId
	    };
	    obj.getStore().load();
	},
	getCSRList:function(store, siteId){
		var me = this,
			refs = me.getView().getReferences(),
			csrCombo = refs.csrCombo;
		
		Ext.Ajax.request({
			method:'GET',
			url:applicationContext+'/rest/users/csrlist',
			params:{siteId:siteId},
			success:function(response){
				var data = JSON.parse(response.responseText);
				store.loadData(data);
				if(AOCRuntime.getUser().role == 3){
					csrCombo.setValue(AOCRuntime.getUser().id);
				}
			},
			failure:function(response){
				store.removeAll();
				Helper.showToast('failure', 'Unable to Find CSR for selected Site.');
			}
		});
	},
	
	/* 1 -> Super Admin
	 * 2 -> Site Manager
	 * 3 -> CSR(Manager)
	 * 4 -> CSR()
	 * 
	 */
	onChangeSiteCSRCodeCombo: function( obj, newValue, oldValue, eOpts ){
		var me = this,
			refs = me.getView().getReferences(),
			siteCombo = refs.siteCombo,
			csrCombo = refs.csrCombo,
			userinfo = AOCRuntime.getUser(),
			currentUserSiteId = userinfo.siteId,
			siteComboValue = siteCombo.getValue(),
			csrComboValue = csrCombo.getValue(),
			currentItemRef = obj.currentItemRef,
			values = (currentItemRef=='siteCombo')? {filterSiteId : siteComboValue,filterCsrCode:'' } : {filterSiteId : currentUserSiteId, filterCsrCode: csrComboValue},
			store = me.getView().store;
			
		store.proxy.setFilterParam('query');
        store.setRemoteFilter(true);
        
        if (!store.proxy.hasOwnProperty('filterParam')) {
            store.proxy.setFilterParam('query');
        }
        store.proxy.encodeFilters = function(filters) {
            return filters[0].getValue();
        };
        store.filter({
            id: 'query',
            property: 'query',
            value: Ext.JSON.encode(values)
        });			
        csrCombo.enable();
        
        if(currentItemRef == 'siteCombo' && (oldValue!= newValue)){
        	csrCombo.reset();
        	var userObj = AOCRuntime.getUser(),
			roleId = userObj.role;
        
	        if(roleId != 1){
				me.getCSRList(csrCombo.store, userObj.siteId);
			}
			else {
				me.getCSRList(csrCombo.store, siteComboValue);
			}
        }
	},
	onAfterRenderSiteDisplayfield: function(field){
		var me = this,
			refs = me.getReferences(),
			userObj = AOCRuntime.getUser(),
			roleId = userObj.role,
			siteCombo = refs.siteCombo,
			csrCombo = refs.csrCombo,
			systemCsrNonCodeOwner = userObj.systemCsrNonCodeOwner,
			siteName = userObj.siteName;
		
		if(roleId != 1){
			field.setHidden(false);
			field.setValue(siteName);
			siteCombo.setHidden(true);
			csrCombo.setValue(systemCsrNonCodeOwner);
			me.getCSRList(csrCombo.store, userObj.siteId);
		}
	}
	
});