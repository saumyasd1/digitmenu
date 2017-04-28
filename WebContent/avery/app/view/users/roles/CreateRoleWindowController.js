Ext.define('AOC.view.users.roles.CreateRoleWindowController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.createrolecontroller',
    
    onClosebtnClick:function(){
    	Ext.getBody().unmask();
        this.getView().destroy();
    },
    onSavebtnClick:function(){
    	var me = this,
		refs = me.getReferences(),
		view = me.getView();
    	form=refs.createRoleForm;
    	editMode = view.editMode,
    	roleManagementGrid = AOCRuntime.getActiveGrid(),
		url = '',
		valueObj ='',
		method ='',
		msg ='';
    	 if (editMode) {
             url = applicationContext + '/rest/role/' + view.roleId; //Provide roleId for particular record
             form.updateRecord();
             method = 'PUT';
             valueObj = form.getRecord().getChanges();
             length = Object.keys(valueObj).length;
             msg = AOCLit.updateRoleMsg;
         } else {
             url = applicationContext + '/rest/role';
             valueObj = form.getValues(false, true, false, true);
             method = 'POST';
             length = 1;
             msg = AOCLit.addRoleMsg;
         }
    	 var parameters = Ext.JSON.encode(valueObj);
         
         if (length > 0) {
             if (form.isValid()) {
             	view.mask('Saving....');
                 Ext.Ajax.request({
                     method: method,
                     jsonData: parameters,
                     url: url,
                     success: function(response, opts) {
                         var jsonString = Ext.JSON.decode(response.responseText);
                         var valueExist = jsonString.valueExist;
                         if (valueExist) {
                         	view.unmask();
                             messageLabelField.show();
                             messageLabelField.setValue(AOCLit.roleExistMsg);
                             return false;
                         }
                         view.unmask();
                         view.close();
                         Helper.showToast('success',msg);
                         roleManagementGrid.store.load();
                     },
                     failure: function(response, opts) {
                     	msg = response.responseText;
                         Helper.showToast('failure', msg);
                         view.unmask();
                         view.close();
                     }
                 });
             } else {
             	//messageLabelField.setValue(AOCLit.fillMandatoryFieldMsg).setVisible(true);
             }
             //AOCRuntime.setWindowInEditMode(false);
         }
    }
});