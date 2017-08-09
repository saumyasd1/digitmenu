Ext.define('AOC.view.localitemlookup.LocalItemLookupWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.localitemlookupwindowcontroller',

    saveBtnClick: function () {
        var me = this,
            refs = me.getReferences(),
            view = me.getView(),
            form = refs.localItemLookupForm,
            editMode = view.mode == 'edit' ? true : false,
            url = '',
            valueObj = '',
            method = '',
            msg = '';

        var length = 0;
        if (editMode) {
            url = applicationContext + '/rest/localitem/' + view.rec.id;
            form.updateRecord();
            method = 'PUT';
            valueObj = form.getRecord().getChanges(false, true, false, true);
            length = Object.keys(valueObj).length;
            msg = AOCLit.updateLocalItem;
        } else {
            url = applicationContext + '/rest/localitem';
            valueObj = form.getValues();
            method = 'POST';
            length = 1;
            msg = AOCLit.addLocalItem;
        }
        valueObj.partnerName = refs['partnerName'].getRawValue();
        valueObj.system = refs['systemCombo'].getRawValue();
        valueObj.createdBy = Helper.setLastModifiedBy();
        valueObj.lastModifiedBy = Helper.setLastModifiedBy();
        var parameters = Ext.JSON.encode(valueObj);

        if (length > 0) {
            if (form.isValid()) {
                view.mask('Saving....');
                Ext.Ajax.request({
                    method: method,
                    jsonData: parameters,
                    url: url,
                    success: function (response, opts) {
                        var jsonString = Ext.JSON.decode(response.responseText),
                            valueExist = jsonString.valueExist;

                        view.unmask();
                        if (valueExist) {
                            Helper.showToast('validation', AOCLit.entryExist)
                        } else {
                            Helper.showToast('success', msg);
                            view.gridView.store.load();
                            view.close();
                        }
                    },
                    failure: function (response, opts) {
                        msg = response.responseText;
                        msg = msg.replace("Exception:", " ");
                        Helper.showToast('failure', msg);
                        view.unmask();
                    }
                });
            } else {
                Helper.showToast('validation', AOCLit.fillMandatoryFieldMsg);
            }
            AOCRuntime.setWindowInEditMode(false);
        } else {
            Helper.showToast('validation', AOCLit.editFieldEntryMsg);
        }
    },
    onPartnerComboSelect: function (combo, record) {
        var me = this,
            refs = me.getReferences(),
            rboCombo = refs['rboName'];
        
        me.resetRBOOrgFields();

        var response = Ext.Ajax.request({
            async: false,
            url: applicationContext + '/rest/productLines/rbo/' + combo.getValue()
        });

        var jsonValue = Ext.decode(response.responseText);
        if (jsonValue && jsonValue.length > 0) {
            rboCombo.setDisabled(false);
            rboCombo.store.loadData(jsonValue);
        } else {
            Helper.showToast('validation', 'No RBO found for selected Partner.Please select another partner to proceed.')
            rboCombo.setDisabled(true);
        }
    },
    onPartnerComboExpand: function (combo) {
        var siteId = AOCRuntime.getUser().siteId;

        combo.store.clearFilter();
        combo.store.filterBy(function (rec) {
            if (siteId) {
                if (rec.get('siteId') == siteId) {
                    return true;
                }
                return false;
            }
            return true;
        });
    },
    resetRBOOrgFields:function(){
    	var me = this,
	        view = me.getView(),
	        refs = view.getReferences(),
	        orgCombo = refs.orgCombo,
	        rboCombo = refs.rboName,
	        systemCombo = refs.systemCombo;
		
		orgCombo.reset();
		rboCombo.reset();
		systemCombo.reset();
    },
    onPartnerChange:function(combo){
    	var me = this,
	        view = me.getView(),
	        refs = view.getReferences(),
	        orgCombo = refs.orgCombo,
	        rboCombo = refs.rboName,
	        systemCombo = refs.systemCombo;
    	
    	orgCombo.reset();
    	rboCombo.reset();
    	systemCombo.reset();
    },
    closeBtnClick: function () {
        this.getView().close();
    },
    onComboBlur: function (field) {
        Helper.clearCombo(field);
    },
    onRBOSelect:function(combo,record){
    	var me = this,
	        view = me.getView(),
	        siteId = record.get('site'),
	        refs = view.getReferences(),
	        systemCombo = refs['systemCombo'];
    	me.filterSystemStore(siteId);
    },
    onSystemSelect: function (combo) {
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            orgCombo = refs.orgCombo,
            systemId = combo.getValue(),
            orgStore = orgCombo.store;

        AOCRuntime.setCurrentUserSystemId(systemId);
        var proxy = new Ext.data.proxy.Rest({
            url: applicationContext + '/rest/org/system/' + systemId,
            appendId: true,
            reader: {
                type: 'json'
            },
            autoLoad: true
        });
        orgStore.setProxy(proxy);
        orgStore.load();
        orgCombo.enable();
    },
    filterSystemStore:function(siteId){
    	var me = this,
        	refs = me.getReferences(),
        	systemCombo = refs.systemCombo,
            systemStore = systemCombo.store;
    	
    	systemStore.clearFilter();
    	systemCombo.enable();
    	me.filterStoreBySiteId(systemStore, siteId);
    	
    	if(systemStore.getCount() == 0){
    		systemCombo.disable();
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
    onSystemComboChange:function(combo){
    	var me = this,
	        view = me.getView(),
	        refs = view.getReferences(),
	        orgCombo = refs.orgCombo;
    	orgCombo.reset();
    }
});
