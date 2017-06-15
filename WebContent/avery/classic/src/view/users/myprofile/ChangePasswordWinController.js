Ext.define('AOC.view.users.myprofile.ChangePasswordWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.changepasswordwincontroller',
    onClickCancel: function (cmp) {
       this.getView().close();
    },
    onClickSaveBtn: function (cmp) {
        var me = this,
            user = AOCRuntime.getUser(),
            id = user.id;

        Ext.getBody().mask(pleaseWait);
        Ext.Ajax.request({
            method: 'PUT',
            type: 'rest',
            jsonData: activeForm.getValues(),
            url: Settings.getBaseUserUrl() + '/' + id,
            headers: {
                "Authorization": "Basic YWRtaW46aW5kaWdvMQ=="
            },
            scope: me,
            success: function (res) {
                Ext.getBody().unmask();
                var userInfo = Ext.decode(res.responseText);
                AOCRuntime.setUser(userInfo.user);
                Helper.setCookie("userinfo", JSON.stringify(userInfo.user), 30);
                Helper.updateProfileInfo();
                var message = password + savedSuccessfully;
                Helper.showToast('Success', message);
                me.getView().close();
            },
            failure: function (rsp) {
                Ext.getBody().unmask();
                Ext.Msg.alert(weFacedError + "save information", rsp.responseText, null, me, null);
                return;
            }
        });
    }
});
