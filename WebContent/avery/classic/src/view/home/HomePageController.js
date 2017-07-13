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
		
		var parameters = {
			days:days,
			Status:status.join()
		};
		
		var userInfo = AOCRuntime.getUser(),
			roleId = userInfo.role,
			refs = me.getReferences(),
			csrCombo = refs.csrCombo,
			siteCombo = refs.siteCombo,
			userRoles = AOCLit.userRole,
			siteId = '';
		
		var codeArray = csrCombo.getValue(),
			len = codeArray.length,
			userIds = [];
		
		for(var i = 0; i < len; i++){
			if(codeArray[i] != 'All'){
				var csrRec = csrCombo.store.getById(codeArray[i]);
				if(csrRec && !Ext.isEmpty(csrRec.get('userId'))){
					userIds.push(csrRec.get('userId'));
				}
			} 
		}
		parameters.assignCSR = userIds.join();
		
		if(siteCombo.isVisible()){
			var siteComboValue = siteCombo.getValue();
			if(siteComboValue != 'All'){
				siteId = siteComboValue;
			}
		}
		else{
			siteId = userInfo.siteId;
		}
		parameters.siteId = siteId;
		
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
		var refs = this.getReferences();
	    obj.getStore().load({
	    	callback:function(records, success){
	    		if((AOCRuntime.getUser().role == AOCLit.userRole.superAdmin) && obj.isVisible()){
	    			obj.store.insert(0,new Ext.data.Record({name:'All', id:'All'}));
	    			refs['csrCombo'].setValue('All');
	    		}
	    		else if (AOCRuntime.getUser().role == AOCLit.userRole.siteManager){
	    			refs['csrCombo'].setValue('All');
	    		}
	    	}
	    }, obj);
	},
	onCSRComboAfterRender:function(csrCombo){
		csrCombo.store.load({
			params:{siteId:AOCRuntime.getUser().siteId},
			callback:function(records, operation, success){
				var systemCsrNonCodeOwner = AOCRuntime.getUser().systemCsrNonCodeOwner,
					systemCsrCodeOwner = AOCRuntime.getUser().systemCsrCodeOwner,
					codeOwners = systemCsrNonCodeOwner+','+systemCsrCodeOwner;
				
				if(AOCRuntime.getUser().role == AOCLit.userRole.CSR){
					var csrCodeArray = codeOwners.split(','),
						userCsrCodeArray=[], len = csrCodeArray.length;
					for(var i = 0 ; i < len ; i++){
						var index = csrCombo.store.find('id',csrCodeArray[i],'',false, false, true);
						if(index != -1){
							userCsrCodeArray.push(csrCodeArray[i]);
						}
					}
					csrCombo.setValue(userCsrCodeArray.join());
				}
				csrCombo.store.insert(0, new Ext.data.Record({csrName:'All', id:'All'}));
			}
		}, csrCombo);
	},
	getCSRList:function(siteId){
		var me = this,
			refs = me.getView().getReferences(),
			csrCombo = refs.csrCombo;
		
		csrCombo.store.load({
			params:{siteId:siteId},
			callback:function(records, operation, success){
				var rec = csrCombo.store.findExact('id', 'All');
				if(rec){
					csrCombo.store.insert(0, new Ext.data.Record({csrName:'All', id:'All'}));
				}
			}
		}, csrCombo);
	},
	onSpecialKeyClick:function(cmp, e){
		if (e.getKey() == e.ENTER) {
            this.filterHomeList(cmp);
        }
	},
	onCSRComboBeforeSelect:function(obj, record, index){
		if(record.get('id') == 'All' && obj.getValue().length > 0){
			obj.reset();
			return true;
		}
		if(obj.getValue().length == 1 && obj.getValue()[0] == 'All'){
			return false;
		}
	},
	onCSRComboSelect:function(obj){
		if(!Ext.isEmpty(obj.getValue())){
			this.filterHomeList(obj);
		}
	},
	onSiteComboSelect: function(obj, eOpts ){
		var me = this,
			siteComboValue = obj.getValue();
		
		if(siteComboValue == 'All'){
			me.getCSRList('');
			me.loadDefaultHomeList();
			return;
		}
		me.filterHomeList(obj);
	},
	filterHomeList:function(obj){
		var me = this,
			refs = me.getReferences(),
			siteCombo = refs.siteCombo,
			csrCombo = refs.csrCombo,
			userinfo = AOCRuntime.getUser(),
			siteId = '',
			csrComboValue = csrCombo.getValue();
		
		if(siteCombo.isVisible()){
			siteId = siteCombo.getValue() != 'All' ? siteCombo.getValue() : '';
		}else{
			siteId = userinfo.siteId;
		}
		
		var currentItemRef = obj.currentItemRef,
			systemCsrNonCodeOwner = userinfo.systemCsrNonCodeOwner;
		
		//get user id foe selected CSR
		var codeArray = csrComboValue,
			len = codeArray.length,
			userIds = [];
		
		for(var i = 0; i < len; i++){
			if(codeArray[i] == 'All'){
				userIds = [];
//				csrCombo.store.each(function(data){
//					userIds.push(data.get('userId'));
//				});
			}else{
				var record = csrCombo.store.getById(codeArray[i]);
				if(record){
					userIds.push(record.get('userId'));
				}
			}
		}
		var csrComboValueString = userIds.join();
		
		if(siteCombo.isVisible() && Ext.isEmpty(siteCombo.getValue())){
			Helper.showToast('validation','Please select site first');
			return;
		}
		var values = {
			 csrManagerFlag: false,
			 filterSiteId: siteId.toString(),
			 filterCsrCode: csrComboValueString
		};
			
		//CSR Manager functionality
		if(!Ext.isEmpty(systemCsrNonCodeOwner)){
			values.csrManagerFlag = false; 
		}
			
		me.setFilters(values);
        
        if(currentItemRef == 'siteCombo'){
        	csrCombo.reset();
        	me.getCSRList(siteId);
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
			userObj = AOCRuntime.getUser(),
			currentUserSiteId = userObj.siteId,
			roleId = userObj.role,
			systemCsrNonCodeOwner = userObj.systemCsrNonCodeOwner,
			systemCsrCodeOwner = userObj.systemCsrCodeOwner,
			grid = me.getView(),
			gridStore = grid.store;
		
		gridStore.clearFilter();
		if(roleId == AOCLit.userRole.CSR){
			var	values = {filterSiteId : currentUserSiteId, filterCsrCode: userObj.id};
			
			//CSR Manager functionality
			if(!Ext.isEmpty(systemCsrNonCodeOwner)){
				var codeOwnerArray = systemCsrNonCodeOwner.split(',');
				codeOwnerArray = systemCsrCodeOwner ? codeOwnerArray.concat(systemCsrCodeOwner.split(',')) : codeOwnerArray.concat([]);
				values.filterCsrCode = codeOwnerArray.join();
				values.csrManagerFlag = true; 
			}
			me.setFilters(values);
		}
		else{
			gridStore.proxy.extraParams = { siteId: currentUserSiteId };
			me.onRefreshClick();
		}
	},
	setFilters:function(values){
		var me = this,
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