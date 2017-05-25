Ext.define('AOC.view.users.myprofile.AddUserWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.adduserwindow',
    runTime: AOC.config.Runtime,
    helper: AOC.util.Helper,
    fileArray:[],
    SaveDetails: function () {
        var me = this,
        	userinfo = AOCRuntime.getUser(),
            refs = me.getReferences(),
            view = me.getView(),
        	form = refs.addEditUserWinForm,
        	profileImage = refs.profileImage,
        	userInfo = AOCRuntime.getUser(),
        	role = userInfo.role,
        	firstName = userInfo.firstName,
        	mode = view.mode,
            userGrid = AOCRuntime.getActiveGrid(),
            currentUserName = userinfo.firstName+ '' + userinfo.lastName,
            userIdObj = {currentUserName:currentUserName},
            url = '',
            valueObj = '',
            method = '',
            msg = '';
        if (mode == 'edit') {
            url = applicationContext + '/rest/users/' + view.ID; //Provide roleId for particular record
            method = 'PUT';
            valueObj = form.getValues(false, true, false, true);
            Ext.apply(valueObj,userIdObj);
            length = Object.keys(valueObj).length;
            msg = AOCLit.updateUserMsg;
        } else {
            url = applicationContext + '/rest/users';
            valueObj = form.getValues(false, true, false, true);
            method = 'POST';
            length = 1;
            msg = AOCLit.addUserMsg;
        }
        var parameters = Ext.JSON.encode(valueObj);
        if (length == 0) {
            Helper.showToast('failure', AOCLit.tickTabMsg);
        } else {
            if (form.isValid()) {
                view.mask('Saving....');
                Ext.Ajax.request({
                    method: method,
                    jsonData: parameters,
                    url: url,
                    success: function (response, opts) {
                        var me = this,
                        	jsonString = Ext.JSON.decode(response.responseText),
                            valueExist = jsonString.valueExist;
                        if (valueExist) {
                        	view.unmask();
                            Helper.showToast('failure',AOCLit.userExistMsg);
                            return false;
                        }
                        view.unmask();
                        view.close();
                        Helper.showToast('success', msg);
                        if(userGrid){
                        	userGrid.store.load();
                        }
                        else{
	                        AOCRuntime.setUser(jsonString.user);
	                        Helper.updateHeaderUserName();
	                        Helper.updateProfileInfo();
	                        Helper.setCookie("userinfo", JSON.stringify(jsonString.user), 30);
                        }
                    },
                    failure: function (response, opts) {
                        msg = response.responseText;
                        Helper.showToast('failure', msg);
                        view.unmask();
                        view.close();
                    }
                });
            } else {
                Helper.showToast('failure', AOCLit.userInfoInvalid);
            }
        }
    },
    CancelDetails: function () {
        Ext.getBody().unmask();
        this.getView().close();
    },
    onAddUserAfterRender: function (win) {
        win.mask(AOCLit.pleaseWaitTitle);
        var roleName = win.lookupReference('roleName'),
            siteCombo = win.lookupReference('siteName'),
            siteStore = siteCombo.store,
            userInfo = AOCRuntime.getUser(),
            roleId = userInfo.role,
            siteId = userInfo.siteId,
            store = roleName.store;
        store.load({
            params: {
                role: roleId
            }
        });
        siteStore.load({
            params: {
                siteId: siteId
            }
        })
        win.unmask();
    },
    onClickUpdatePhoto: function (obj, value, eOpts) {
    	var me = this,
        	value = value.substring(value.lastIndexOf("\\"));
            view = me.getView(),
            refs = me.getReferences(),
            addEditUserWin = refs.addEditUserWin,
            profileImage = refs.profileImage,
            userInfo = AOCRuntime.getUser(),
            userId = userInfo.id,
            userEmail = userInfo.email,
            roleId = userInfo.role,
            filePath = '';

        var file = obj.getEl().down('input[type=file]').dom.files[0];
        type = file.type;
        if (!file) {
            return;
        }
        if (type.indexOf('image') != -1) {
            me.setImagePreview(file, profileImage);
            me.fileArray.push(file);
            me.uploadFiles(userId,roleId,userEmail, filePath,file);
        } else {
            Helper.showToast('failure', AOCLit.invalidImgFormat);
        }
    },
    setImagePreview: function (file, imageContainer) {
        var me = this,
            name = file.name,
        	fileReader = new window.FileReader();

        fileReader.onload = function (e, b) {
            var fileContent = e.target.result;
            imageContainer.setSrc(fileContent);
        }
        fileReader.readAsDataURL(file);
    },
    uploadFiles: function (userId,roleId,userEmail, filePath,file) {
        var me = this;
        	refs = me.getReferences(),
            addEditUserWin = refs.addEditUserWinForm,
            form = addEditUserWin.getForm(),
            xhttp = new XMLHttpRequest(),
            fileArray = this.fileArray,
            formData = new FormData(),
            url = applicationContext + '/rest/users/pictureupload',
            values = form.getValues(),
            len = fileArray.length;

            formData.append('file', fileArray[len - 1]);
            formData.append('fileName', fileArray[len - 1].name);
            formData.append('filePath', filePath);
            formData.append('userId',userId);
            formData.append('roleId',roleId);
            formData.append('userEmail',userEmail);

            xhttp.onreadystatechange = function () {
                (4 === xhttp.readyState) && uploadDone(xhttp);
            };
            xhttp.open("POST", url, true);
            xhttp.send(formData);

            function uploadDone(xhttp) {
                switch (xhttp.status) {
                case 200:
                    fileArray.pop();
                    break;
                }
            }
    },
    beforeRenderUploadbtn: function(obj){
    	var me = this,
    		recordId = me.getView().down('form').getValues().id,
    		userId = AOCRuntime.getUser().id;
    	if(recordId!=userId) obj.setHidden(true);
    }
});
