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
			refs = me.getReferences(),
			csrCombo = refs.csrCombo,
			siteCombo = refs.siteCombo,
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
	},
	
	onRefreshClick:function(btn){
    	var grid = this.getView();
    	
    	grid.store.load();
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
	    obj.getStore().load({
	    	callback:function(records, success){
	    		obj.store.insert(0,new Ext.data.Record({name:'None', id:'None'}));
	    	}
	    }, obj);
	},
	onCSRComboAfterRender:function(csrCombo){
		csrCombo.store.load({
			params:{siteId:AOCRuntime.getUser().siteId},
			callback:function(records, operation, success){
				var systemCsrNonCodeOwner = AOCRuntime.getUser().systemCsrNonCodeOwner;
				if(AOCRuntime.getUser().role == AOCLit.userRole.CSR){
					if(!Ext.isEmpty(systemCsrNonCodeOwner)){
						var codeArray = systemCsrNonCodeOwner.split(','),
							len = codeArray.length,
							userIds = [];
						
						for(var i = 0; i < len; i++){
							var record = csrCombo.store.getById(codeArray[i]);
							if(record){
								userIds.push(record.get('userId'));
							}
						}
						csrCombo.setValue(userIds.join());
					}else{
						csrCombo.setValue(AOCRuntime.getUser().id);
					}
				}
			}
		}, csrCombo);
	},
	getCSRList:function(store, siteId){
		var me = this,
			refs = me.getView().getReferences(),
			csrCombo = refs.csrCombo,
			systemCsrNonCodeOwner = AOCRuntime.getUser().systemCsrNonCodeOwner;
		
		csrCombo.store.load({
			params:{siteId:siteId},
			callback:function(records, operation, success){
			}
		});
//		Ext.Ajax.request({
//			method:'GET',
//			url:applicationContext+'/rest/users/csrlist',
//			params:{siteId:siteId},
//			success:function(response){
//				var data = JSON.parse(response.responseText);
//				var storeA = Ext.data.StoreManager.lookup('AssignCSRStore');
//				storeA.loadData(data);
//				if(AOCRuntime.getUser().role == AOCLit.userRole.CSR){
//					if(!Ext.isEmpty(systemCsrNonCodeOwner)){
//						var codeArray = systemCsrNonCodeOwner.split(','),
//							len = codeArray.length,
//							userIds = [];
//						
//						for(var i = 0; i < len; i++){
//							var record = csrCombo.store.getById(codeArray[i]);
//							if(record){
//								userIds.push(record.get('userId'));
//							}
//						}
//						setTimeout(function(){
//							csrCombo.setValue('2,3');
//						},1000);
//					}else{
//						csrCombo.setValue(AOCRuntime.getUser().id);
//					}
//				}
//			},
//			failure:function(response){
//				store.removeAll();
//				Helper.showToast('failure', 'Unable to Find CSR for selected Site.');
//			}
//		});
	},
	onChangeSiteCSRCodeCombo: function(obj, newValue, oldValue, eOpts ){
		var me = this,
			refs = me.getView().getReferences(),
			siteCombo = refs.siteCombo,
			csrCombo = refs.csrCombo,
			siteComboValue = siteCombo.getValue(),
			csrComboValue = csrCombo.getValue(),
			csrComboValueString = csrComboValue.toString();
		
		if(!Ext.isEmpty(csrComboValueString)){
			me.filterHomeList(obj, newValue, oldValue);
		}else if(siteCombo.isVisible() && !Ext.isEmpty(siteComboValue)){
			if(siteCombo.getValue() == 'None'){
				siteCombo.setValue('');
				me.getCSRList(csrCombo.store, 1);
				me.loadDefaultHomeList();
				return;
			}
			me.filterHomeList(obj, newValue, oldValue);
		}
		else{
			me.loadDefaultHomeList();
		}
	},
	filterHomeList:function(obj, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			siteCombo = refs.siteCombo,
			csrCombo = refs.csrCombo,
			userinfo = AOCRuntime.getUser(),
			siteId = '',
			csrComboValue = csrCombo.getValue();
		
		if(siteCombo.getValue() == 'None'){
			siteId = 1;
		}else if(siteCombo.isVisible()){
			siteId = siteCombo.getValue();
		}else{
			siteId = userinfo.siteId;
		}
		
		var length = csrComboValue.length,
			csrComboValueString = csrComboValue.toString(),
			currentItemRef = obj.currentItemRef,
			systemCsrNonCodeOwner = userinfo.systemCsrNonCodeOwner;
		
		if(siteCombo.isVisible() && Ext.isEmpty(siteCombo.getValue())){
			Helper.showToast('validation','Please select site first');
			return;
		}
		var values = {
			 multiSelectFlag: false, 
			 csrManagerFlag: false,
			 filterSiteId: siteId.toString(),
			 filterCsrCode: csrComboValueString
		};
			
		//CSR Clerk functionality
		if(length > 1){
			values.multiSelectFlag = true;
		}
		//CSR Manager functionality
		if(!Ext.isEmpty(systemCsrNonCodeOwner)){
			values.csrManagerFlag = false; 
		}
			
		me.setFilters(values);
        csrCombo.enable();
        
        if(currentItemRef == 'siteCombo' && (oldValue!= newValue)){
        	csrCombo.reset();
        	me.getCSRList(csrCombo.store, siteId);
        }
	},
	onAfterRenderSiteDisplayfield: function(field){
		var me = this,
			refs = me.getReferences(),
			userObj = AOCRuntime.getUser(),
			roleId = userObj.role,
			siteCombo = refs.siteCombo,
			csrCombo = refs.csrCombo,
			siteName = userObj.siteName;
		
		if(roleId != AOCLit.userRole.superAdmin){
			field.setHidden(false);
			field.setValue(siteName);
			siteCombo.setHidden(true);
			me.getCSRList(csrCombo.store, userObj.siteId);
		}
		me.loadDefaultHomeList();
	},
	loadDefaultHomeList:function(){
		var me = this,
			refs = me.getReferences(),
			userObj = AOCRuntime.getUser(),
			currentUserId = userObj.id,
			currentUserSiteId = userObj.siteId,
			roleId = userObj.role,
			systemCsrNonCodeOwner = userObj.systemCsrNonCodeOwner,
			grid = me.getView(),
			gridStore = grid.store;
		
		gridStore.clearFilter();
		if(roleId == AOCLit.userRole.superAdmin){
			gridStore.proxy.extraParams = { siteId: currentUserSiteId };
			me.onRefreshClick();
		}else if(roleId == AOCLit.userRole.siteManager){
			gridStore.proxy.extraParams = { siteId: currentUserSiteId };
			gridStore.load();
		}else if(roleId == AOCLit.userRole.CSR){
			var	values = {filterSiteId : currentUserSiteId, filterCsrCode: currentUserId};
			
			//CSR Manager functionality
			if(!Ext.isEmpty(systemCsrNonCodeOwner)){
				values.filterCsrCode = systemCsrNonCodeOwner;
				values.multiSelectFlag = false;
				values.csrManagerFlag = true; 
			}
			me.setFilters(values);
		}
	},
	setFilters:function(values){
		var me = this,
			refs = me.getReferences(),
			grid = me.getView(),
			store = grid.store;
		
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
	}
});