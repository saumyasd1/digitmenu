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
		
		var parameters = {
			days:days,
			Status:status
		};
		var userInfo = AOCRuntime.getUser(),
			roleId = userInfo.role,
			homeWrapper = Ext.ComponentQuery.query('viewport homewrapper')[0],
			homeWrapperRefs = homeWrapper.getReferences(),
			csrCombo = homeWrapperRefs.csrCombo,
			siteCombo = homeWrapperRefs.siteCombo,
			userRoles = AOCLit.userRole;
		
		if(roleId == userRoles.superAdmin){ //super admin
			parameters.assignCSR = csrCombo.getValue().join();
			parameters.siteId = siteCombo.getValue() ? siteCombo.getValue() : '';
		}else if(roleId == userRoles.siteManager){ //site admin
			parameters.assignCSR = csrCombo.getValue().join();
		}else if(roleId == userRoles.CSR){ //csr
			if(Ext.isEmpty(userInfo.systemCsrNonCodeOwner)){ //csr clerk
				parameters.assignCSR = csrCombo.getValue().length > 0 ? csrCombo.getValue().join() : userInfo.id.toString();
			}else{   // csr manager
				if(csrCombo.getValue().length > 0){
					parameters.assignCSR = csrCombo.getValue().join();
				}else{
					var codeArray = userInfo.systemCsrNonCodeOwner.split(','),
						len = codeArray.length,
						assignCSRStore = csrCombo.store,
						userIds = [];
				  
					for(var i = 0; i < len; i++){
						var rec = assignCSRStore.findRecord('id', codeArray[i],'',false, false, true);
						if(rec){
							userIds.push(rec.get('userId'));
						}
					}
					parameters.assignCSR = userIds.join();
				}
			}
		}
		
		if(record.get('type') == 'orderqueue'){
			me.filterOrderQueueList(Ext.JSON.encode(parameters));
		}
		else if(record.get('type') == 'emailqueue'){
			me.filterEmailQueueList(Ext.JSON.encode(parameters));
		}
		else if(record.get('type') == 'taskmanager'){
			me.filterTaskManagerList(Ext.JSON.encode(parameters));
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
	}
});