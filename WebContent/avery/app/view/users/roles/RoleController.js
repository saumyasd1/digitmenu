Ext.define('AOC.view.users.roles.RoleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rolecontroller',

    createRoleWindow: function () {
        var win = Ext.create('AOC.view.users.roles.CreateRoleWindow',{
        	mode:'add'
        });
        win.show();
    },
    onCellClickToView: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this,
            refs = me.getReferences(),
            roleGrid = refs.roleGrid,
            el = Ext.get(e.target);

        if (el.hasCls('viewuser')) {
            var id = record.get('id');
            var userWin = Ext.create('AOC.view.users.roles.ViewUserWindow', {
                recordId: id
            });
            userWin.show();
        } else if (el.hasCls('editpermission')) {
            var id = record.get('id'),
            	roleName = record.data.roleName,
                editPermissionWin = Ext.create('AOC.view.users.roles.CreateRoleWindow', {
                recordId: id,
                mode:'edit',
                title:'Set Permissions for '+ roleName,
                height:200
            });
            editPermissionWin.show();
        } else if (el.hasCls('deleterole')) {
            var me = this,
                view = me.getView(),
                ID = record.get('id'),
                Msg = AOCLit.deleteRoleMsg,
                isAdmin = 1;
            if (ID == isAdmin) {
                Helper.showToast('validation', AOCLit.adminDelMsg);
            } else {
                Ext.Msg.confirm('Alert', AOCLit.delRoleMsg, function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            method: 'DELETE',
                            url: applicationContext + '/rest/role/' + ID,
                            success: function (response, opts) {
                                Helper.showToast('Success', Msg);
                                roleGrid.store.load();
                            },
                            failure: function (response, opts) {
                                msg = response.responseText;
                                Helper.showToast('failure', msg);
                                view.unmask();
                            }
                        });
                    }
                });
            }
        }
    }

});
