Ext.define('AOC.view.localitemlookup.LocalItemLookupWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.localitemlookupwindowcontroller',
    
    saveBtnClick:function(){
    	var me = this,
    		refs = me.getReferences(),
    		view = me.getView(),
    		form = refs.localItemLookupForm,
    		grid = view.gridView,
    		editMode = view.editMode,
    		url = '',
    		valueObj ='',
    		method ='',
    		msg ='';
    	
        var length = 0;
        if (editMode) {
            url = applicationContext + '/rest/localitem/' + view.ID;
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
                    success: function(response, opts) {
                        var jsonString = Ext.JSON.decode(response.responseText),
                        	valueExist = jsonString.valueExist;
                        if (valueExist) {
                        	view.unmask();
                        	Helper.showToast('failure',AOCLit.entryExist)
                            return false;
                        }
                        view.unmask();
                        view.close();
                        Helper.showToast('success',msg);
                        grid.store.load();
                    },
                    failure: function(response, opts) {
                    	msg = response.responseText;
                    	msg = msg.replace("Exception:", " ");
                        Helper.showToast('failure', msg);
                        view.unmask();
                    }
                });
            } else {
            	Helper.showToast('failure',AOCLit.fillMandatoryFieldMsg);
            }
            AOCRuntime.setWindowInEditMode(false);
        } else {
        	Helper.showToast('failure',AOCLit.editFieldEntryMsg);
        }
    
    },
    closeBtnClick: function () {
        Ext.getBody().unmask();
        this.getView().close();
        AOCRuntime.setWindowInEditMode(false);
	},
	onComboBlur:function(field){
    	Helper.clearCombo(field);
    },
});