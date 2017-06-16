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
    		grid = refs.orderQueueStatusList;
			siteCombo = refs.siteCombo,
			csrCombo = refs.csrCombo,
			siteComboValue = siteCombo.getValue(),
			csrComboValue = csrCombo.getValue(),
			currentItemRef = obj.currentItemRef,
			values = (currentItemRef=='siteCombo')? {filterSiteId : siteComboValue,filterCsrCode:'' } : {filterSiteId : siteComboValue, filterCsrCode: csrComboValue};
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