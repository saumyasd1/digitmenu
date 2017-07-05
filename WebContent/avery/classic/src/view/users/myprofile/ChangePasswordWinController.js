Ext.define('AOC.view.users.myprofile.ChangePasswordWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.changepasswordwincontroller',
    onClickCancel: function (cmp) {
       this.getView().close();
    },
    onClickSaveBtn: function (cmp) {
        var me = this,
            user = AOCRuntime.getUser(),
            id = user.id,
            refs = me.getReferences(),
            form = refs['changePasswordForm'].getForm(),
        	formObj = form.getValues(),
        	userIdObj = {userId : id},
        	obj = Ext.apply(formObj,userIdObj);

        if(form.isValid()){
	        Ext.getBody().mask(pleaseWait);
	        Ext.Ajax.request({
	            method: 'PUT',
	            jsonData: obj,
	            url: Settings.getBaseUserUrl() + '/' + id,
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
        }else{
        	Helper.showToast('validation','Please fill mandatory(*) fields.');
        }
    }
});
