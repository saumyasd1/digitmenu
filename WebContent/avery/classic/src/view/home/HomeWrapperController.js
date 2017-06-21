Ext.define('AOC.view.home.HomeWrapperController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.homewrappercontroller',
    runTime: AOC.config.Runtime,
    onRefreshClick:function(btn){
    	var refs = this.getReferences(),
    		grid = refs.orderQueueStatusList;
    	
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
	    var userInfo = AOCRuntime.getUser(),
	    	siteId = userInfo.siteId;
	    
//	    obj.getStore().proxy.extraParams = {
//		    siteId: siteId
//	    };
	    obj.getStore().load({
	    	callback:function(records, success){
	    		obj.store.insert(0,new Ext.data.Record({name:'None', id:'None'}));
	    	}
	    },obj);
	},
	getCSRList:function(store, siteId){
		var me = this,
			refs = me.getView().getReferences(),
			csrCombo = refs.csrCombo,
			systemCsrNonCodeOwner = AOCRuntime.getUser().systemCsrNonCodeOwner;
		
		Ext.Ajax.request({
			method:'GET',
			url:applicationContext+'/rest/users/csrlist',
			params:{siteId:siteId},
			success:function(response){
				var data = JSON.parse(response.responseText);
				var storeA = Ext.data.StoreManager.lookup('AssignCSRStore');
				storeA.loadData(data);
				if(AOCRuntime.getUser().role == 3){
					if(!Ext.isEmpty(systemCsrNonCodeOwner)){
						var codeArray = systemCsrNonCodeOwner.split(','),
							len = codeArray.length,
							userIds = [];
						
						for(var i = 0; i < len; i++){
							var record = csrCombo.store.findRecord('id',codeArray[i],'', false, false, true);
							if(record){
								userIds.push(record.get('userId'));
							}
						}
						setTimeout(function(){
							csrCombo.setValue(userIds.join());
						},2000);
					}else{
						csrCombo.setValue(AOCRuntime.getUser().id);
					}
				}
			},
			failure:function(response){
				store.removeAll();
				Helper.showToast('failure', 'Unable to Find CSR for selected Site.');
			}
		});
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
			csrCombo.setHeight(24);
			csrCombo.updateLayout();
			me.loadDefaultHomeList();
		}
	},
	filterHomeList:function(obj, newValue, oldValue){
		var me = this,
			refs = me.getView().getReferences(),
			grid = refs.orderQueueStatusList;
			siteCombo = refs.siteCombo,
			csrCombo = refs.csrCombo,
			userinfo = AOCRuntime.getUser(),
			siteId = siteCombo.isVisible() ? siteCombo.getValue() : userinfo.siteId,
			siteComboValue = siteCombo.getValue(),
			csrComboValue = csrCombo.getValue();
			
		var length = csrComboValue.length,
			csrComboValueString = csrComboValue.toString(),
			currentItemRef = obj.currentItemRef,
			systemCsrNonCodeOwner = userinfo.systemCsrNonCodeOwner,
			store = grid.store;
		
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
		
		if(roleId != 1){
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
			grid = refs.orderQueueStatusList,
			gridStore = grid.store;
		
		gridStore.clearFilter();
		
		if(roleId == 1){
			me.onRefreshClick();
		}else if(roleId == 2){
			gridStore.proxy.extraParams = { siteId: currentUserSiteId };
			gridStore.load();
		}else if(roleId == 3){
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
			grid = refs.orderQueueStatusList,
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