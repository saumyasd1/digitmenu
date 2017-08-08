Ext.define('AOC.view.address.AddressWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.addresswincontroller',
    runTime: AOC.config.Runtime,
    
    onComboBlur:function(combo, e){
    	Helper.clearCombo(combo,e);
    },
    
    onSaveBtnClick:function(btn){
    	var me = this,
    		view = me.getView(),
    		refs = me.getReferences(),
    		formPanel = refs['addressForm'],
    		form = formPanel.getForm(),
    		mode = view.mode,
    		url,
    		values = form.getValues();
    	
    	if(mode == 'add'){
    		method = 'POST';
    		url = applicationContext + '/rest/address';
    	}else if(mode == 'edit'){
    		method = 'PUT';
    		url = applicationContext + '/rest/address/' + view.rec.id;
    	}
    	
    	if(form.isValid()){
    		values.varPartner = {
                id: values.partnerId
            };
    		
    		values.varOrgCode = {
                id: values.orgCodeId
            },
            
            delete values.partnerId;
            delete values.orgCodeId;
            
    		me.saveAddress(values, method, url);
    	}else{
    		Helper.showToast('validation', 'Please fill all mandatory(*) fields.');
    	}
    },
    saveAddress:function(params, method, url){
    	var me = this,
    		view = this.getView();
    	
    	view.el.mask(AOCLit.pleaseWait);
    	
    	Ext.Ajax.request({
            method: method,
            jsonData: params,
            url: url,
            success: function (response, opts) {
            	var jsonData = Ext.JSON.decode(response.responseText),
                	valueExist = jsonData.valueExist;
            	
            	view.el.unmask();
            	
	            if (valueExist) {
	                Helper.showToast('validation', AOCLit.addressExistMsg);
	            }else{
	            	me.clearStoreFilter();
	            	Helper.showToast('Success', 'Address has been saved successfully!!');
	                view.contextGrid.store.load();
	                view.close();
	            }
            },
            failure: function (response, opts) {
            	view.el.unmask();
            }
        });
    },
    onSiteComboExpand:function(combo){
    	 var siteId = AOCRuntime.getUser().siteId;
 	    
    	 combo.store.filterBy(function(rec){
 	    	if(siteId){
 		    	if(rec.get('id') == siteId){
 		    		return true;
 		    	}
 		    	return false;
 	    	}
 	    	return true;
 	    });
    },
    onSiteSelect: function (combo, record) {
    	combo.store.clearFilter();
    	var me = this,
            siteId = record.get('id');
    	
    	me.resetFields();
    	me.filterSystemStore(siteId);
    },
    resetFields:function(){
    	var me = this,
	        refs = me.getReferences(),
	        org = refs.orgName,
	        shippingMethod = refs.shippingMethod,
	        freightTerms = refs.freightTerms,
	        system = refs.systemName;
    	
    	system.reset();
    	org.reset();
    	shippingMethod.reset();
    	freightTerms.reset();
    	shippingMethod.disable();
    	freightTerms.disable();
    	org.disable();
    },
    filterSystemStore:function(siteId){
    	var me = this,
        	refs = me.getReferences(),
        	system = refs.systemName,
            systemStore = system.store;
    	
    	systemStore.clearFilter();
    	system.enable();
    	me.filterStoreBySiteId(systemStore, siteId);
    	
    	if(systemStore.getCount() == 0){
    		system.disable();
    	}
    },
    filterStoreBySiteId:function(store, siteId){
    	store.filterBy(function(rec){
    		if(siteId){
 		    	if(rec.get('siteId') == siteId){
 		    		return true;
 		    	}
 		    	return false;
 	    	}
 	    	return true;
    	});
    },
    onSystemComboExpand:function(combo){
    	var me = this,
    		view = me.getView();
    	
    	if(view.mode != 'add'){
    		var siteId = view.rec.get('siteId');
    		me.filterSystemStore(siteId);
    	}
    },
    onSystemSelect: function (combo, record) {
        var me = this,
        	refs = me.getReferences(),
        	siteName = refs['siteName'],
            systemId = record.get('id');
        
        me.filterOrgStore(systemId, siteName.getValue());
    },
    filterOrgStore:function(systemId, siteId){
    	var me = this,
	    	refs = me.getReferences(),
	        org = refs.orgName,
	        orgStore = org.store;
    	
    	orgStore.clearFilter();
    	orgStore.filterBy(function(rec){
    		if(rec.get('systemId') == systemId && rec.get('siteId') == siteId){
    			return true;
    		}
    		return false;
    	});
    	if (orgStore.getCount() > 0) {
            org.enable();
        }else {
            org.disable();
            var msg = AOCLit.orgCountMsg;
            Helper.showToast('validation', msg);
        } 
    },
    onOrgSelect: function (combo, record) {
        var me = this,
            refs = me.getReferences();

        me.loadShippingMethodStore(refs['shippingMethod'], refs['shippingMethod'].store);
        me.loadShippingMethodStore(refs['freightTerms'], refs['freightTerms'].store);
    },
    onPartnerComboExpand:function(combo){
    	var me = this,
			view = me.getView(),
			refs = me.getReferences(),
			siteCombo = refs['siteName'],
			siteId;
		
		if(view.mode != 'add'){
			siteId = view.rec.get('siteId');
		}else{
			siteId = siteCombo.getValue();
		}
		combo.store.clearFilter();
		me.filterStoreBySiteId(combo.store, siteId);
    },
    onOrgComboExpand:function(combo){
    	var me = this,
			view = me.getView();
    	
    	if(view.mode != 'add'){
    		var siteId = view.rec.get('siteId'),
    			systemId = view.rec.get('system');
    		me.filterOrgStore(systemId, siteId);
    	}
    },
    onShippingMethodComboExpand:function(combo){
    	var me = this,
			view = me.getView();
	
		if(view.mode != 'add'){
			var systemId = view.rec.get('system');
		        orgId = view.rec.get('orgCodeId');
	    	
	    	me.filterShippingFreightStore(combo, systemId, orgId);
		}
    },
    onFreightTermComboExpand:function(combo){
    	var me = this,
		view = me.getView();

		if(view.mode != 'add'){
			var siteId = view.rec.get('siteId'),
				systemId = view.rec.get('system');
		        orgId = view.rec.get('orgCodeId');
	    	
	    	me.filterShippingFreightStore(combo, systemId, orgId);
		}
    },
    filterShippingFreightStore:function(field, systemId, orgId){
    	var store = field.store;
    	
    	store.clearFilter();
    	store.filterBy(function(rec){
    		if(rec.get('systemId') == systemId && rec.get('orgId') == orgId){
    			return true;
    		}
    		return false;
    	});
    	if (store.getCount() > 0) {
            field.enable();
        }else {
        	field.disable();
        } 
    },
    loadShippingMethodStore: function (field, store) {
    	var me = this,
	        refs = me.getReferences(),
	        systemId = refs['systemName'].getValue(),
	        orgId = refs['orgName'].getValue();
    	
    	me.filterShippingFreightStore(field, systemId, orgId);
    },
    closeWindow: function () {
    	this.clearStoreFilter();
        this.getView().close();
        AOCRuntime.setWindowInEditMode(false);
        var grid = Ext.ComponentQuery.query('#AddressManageGriditemId')[0];
        grid.store.load();
    },
    clearStoreFilter:function(){
    	var me = this,
	        refs = me.getReferences();
    	
    	refs['shippingMethod'].store.clearFilter();
    	refs['freightTerms'].store.clearFilter();
    	refs['systemName'].store.clearFilter();
    	refs['orgName'].store.clearFilter();
    	refs['freightTerms'].store.clearFilter();
    	refs['shippingMethod'].store.clearFilter();
    	refs['partnerName'].store.clearFilter();
    },
   
    deleteResource: function (record) {
        var ID = record.get('id');
        var me = this;
        Ext.Msg.confirm('Alert', AOCLit.deleteAddressMsg, function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    method: 'DELETE',
                    url: applicationContext + '/rest/address/' + ID,
                    success: function (response, opts) {
                        Helper.showToast('Success', AOCLit.deleteAddMsg);
                        me.runTime.getActiveGrid().store.load();
                    },
                    failure: function (response, opts) {}
                });
            }
        });
    },
    onAfterRenderSiteCombo:function(obj){
	    var siteId = AOCRuntime.getUser().siteId;
	    
	    obj.store.filterBy(function(rec){
	    	if(siteId){
		    	if(rec.get('id') == siteId){
		    		return true;
		    	}
		    	return false;
	    	}
	    	return true;
	    });
    },
    onAfterRenderPartnerCombo:function(obj){
	    var me = this,
	    	view = me.getView(),
	    	userInfo = AOCRuntime.getUser(),
	    	siteId = userInfo.siteId;
	    
	    obj.getStore().proxy.extraParams = {
	    	siteId: siteId
	    };
	    
	    if(view.mode != 'add'){
	    	view.mask(AOCLit.pleaseWait);
	    }
	    obj.getStore().load({
	    	callback:function(records, operation, success){
	    		if(view && view.mode != 'add'){
	    			view.unmask();
	    		}
	    	}
	    }, view);
    },
    
    onAddressAfterRender:function(){
    	var me = this,
    		refs = me.getReferences(),
    		view = me.getView(),
    		userinfo = AOCRuntime.getUser(),
    		roleId = userinfo.role;
	
		if(view.rec != null){
			if(view.rec.data != null){
				var orgName = refs['orgName'],
					siteId = view.rec.get('siteId'),
					systemId = view.rec.get('system');
				
				refs['siteName'].store.load();
				
				refs['shippingMethod'].enable();
				refs['freightTerms'].enable();
				orgName.enable();
				refs['systemName'].enable();
				
				refs['systemName'].store.load();
				orgName.store.load();
				
				refs['addressForm'].getForm().loadRecord(view.rec);
			}
		}
		if(roleId == 3){
			me.setReadOnlyView(true);
		}
    },
    setReadOnlyView: function (readOnlyFlag) {
	    var refs = this.getReferences(),
	        addressForm = refs.addressForm,
	        textFieldArray = addressForm.query('[xtype = textfield]'),
	        comboArray = addressForm.query('[xtype = combobox]'),
	        tempArray = [].concat(textFieldArray)
	        			.concat(comboArray);

	    var len = tempArray.length;
	    for(var i = 0; i < len; i++) {
	    	tempArray[i].setReadOnly(readOnlyFlag);
	    }
	}
});
