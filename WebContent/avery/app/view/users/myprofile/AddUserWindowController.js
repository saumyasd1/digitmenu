Ext.define('AOC.view.users.myprofile.AddUserWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.adduserwindow',
    runTime: AOC.config.Runtime,
    helper: AOC.util.Helper,
    fileArray:[],
    getSystemCsrCodeValues:function(grid){
    	var store = grid.store;
    	var yesArray = [],
    		noArray = [];
    	
    	store.each(function(rec, index){
    		if(rec.get('codeOwner') == 'Y'){
    			yesArray.push(rec.get('csrCodeComboId'));
    		}else if((rec.get('codeOwner') == 'N')){
    			noArray.push(rec.get('csrCodeComboId'));
    		}
    	});
    	return {yes:yesArray.join(),no:noArray.join()};
    },
    SaveDetails: function () {
        var me = this,
        	userinfo = AOCRuntime.getUser(),
            refs = me.getReferences(),
            view = me.getView(),
        	form = refs.addEditUserWinForm,
        	systemCsrCodeGrid = refs.systemCsrCodeGrid,
        	profileImage = refs.profileImage,
        	userInfo = AOCRuntime.getUser(),
        	role = userInfo.role,
        	mode = view.mode,
            userGrid = AOCRuntime.getActiveGrid(),
            userId = userinfo.id,
            userIdObj = {userId:userId},
            url = '',
            valueObj = '',
            method = '',
            msg = '';
        
        var obj =me.getSystemCsrCodeValues(systemCsrCodeGrid);
        
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
        valueObj.systemCsrCodeOwner =  obj.yes;
        valueObj.systemCsrNonCodeOwner =  obj.no;
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
	                        window.location.reload();
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
    },
    onSiteSelected:function(field){
    	var me = this,
    		refs = this.getReferences(),
    		systemCombo = refs.systemName,
    		siteId = field.getValue(),
    		systemStore = Ext.StoreManager.lookup('userSystemStore'),
    		proxy = new Ext.data.proxy.Rest({
				url: applicationContext+'/rest/system/site/'+ siteId,
				appendId: true,
				reader: {
					type : 'json'
				},
				autoLoad:true
		});
    	systemStore.setProxy(proxy);
    	systemStore.load();
    	systemCombo.setDisabled(false);
    },
    onSystemSelected:function(field){
    	var me = this,
			refs = this.getReferences(),
			orgCodeCombo = refs.orgCode,
    		systemId = field.getValue(),
			orgStore = Ext.StoreManager.lookup('userOrgStore');
    	AOCRuntime.setCurrentUserSystemId(systemId);
    	var proxy = new Ext.data.proxy.Rest({
    		url: applicationContext+'/rest/org/system/'+ systemId,
    		appendId: true,
    		reader      : {
    			type          : 'json'
    		},
    		autoLoad:true
    	});
    	orgStore.setProxy(proxy);
    	orgStore.load();
    	orgCodeCombo.setDisabled(false);
    },
    onOrgSelected:function(field){
    	var me = this,
			refs = this.getReferences(),
			csrCodeCombo = refs.csrCode,
    		orgId = field.getValue(),
    		systemId = AOCRuntime.getCurrentUserSystemId();
    	var store = Ext.StoreManager.lookup('userCsrCodeStore');
    	store.load({params:{org:orgId,system:systemId}});
    	csrCodeCombo.setDisabled(false);
    },
    onSystemCsrCodeAddRowBtnClick:function(){
		var me = this,
			refs = me.getReferences(),
			grid = refs.systemCsrCodeGrid,
			store = grid.store,
			rec = new Ext.data.Record({'system':'', 'orgCode':'', 'csrCode':''}),
		    rowIdx = store.getCount();
		store.insert(rowIdx, rec);
		grid.editingPlugin.startEditByPosition({
			row:rowIdx,
			column:0
		});
	},
	onSystemCsrCodeCellClick:function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var el = Ext.get(e.target);
		if(el.hasCls('delete-row')){
	        grid.store.remove(record);
		}
    },
    onSiteChange: function(obj, newValue, oldValue, eOpts){
    	var me = this,	
    		refs = me.getView().getReferences(),
    		systemCsrCodeGrid = refs.systemCsrCodeGrid,
    		systemCsrCodeGridStore = systemCsrCodeGrid.store;
    	systemCsrCodeGridStore.removeAll();
    },
    insertDataIntoGrid: function(obj){
    	var me = this,
    		systemCsrCodeGridView = me.getReferences().systemCsrCodeGrid,
    		systemCsrCodeGridStore = systemCsrCodeGridView.store,
    		refs =  me.getView().getReferences(),
    		systemCombo = refs.systemName,
    		orgCodeCombo = refs.orgCode,
    		csrCodeCombo = refs.csrCode,
    		codeOwner = refs.codeOwner,
    		systemComboValue = systemCombo.getRawValue(),
    		orgCodeComboValue = orgCodeCombo.getRawValue(),
    		csrCodeComboValue = csrCodeCombo.getRawValue(),
    		csrCodeComboId = csrCodeCombo.getValue(),
    		codeOwnerComboValue = codeOwner.getRawValue(),
    	obj = {systemName : systemComboValue,orgCode : orgCodeComboValue,csrCode : csrCodeComboValue,codeOwner : codeOwnerComboValue,csrCodeComboId:csrCodeComboId};
    	systemCsrCodeGridStore.insert(0,(new Ext.data.Record(obj)));
    	systemCombo.reset();
    	orgCodeCombo.reset();
    	csrCodeCombo.reset();
    	codeOwner.reset();
    	orgCodeCombo.setDisabled(true);
    	csrCodeCombo.setDisabled(true);
    	codeOwner.setDisabled(true);
    },
    onSelectCsrCode: function(combo){
    	var me = this,
    		csrComboValue = combo.getRawValue(),
    		refs = me.getReferences(),
    		systemCsrCodeGridStore = refs.systemCsrCodeGrid.store,
    		systemCombo = refs.systemName,
    		orgCodeCombo = refs.orgCode,
    		csrCodeCombo = refs.csrCode,
    		codeOwner = refs.codeOwner;
    	systemCsrCodeGridStore.each(function(rec, index){
    		if(rec.get('csrCode') == csrComboValue ){
    			Helper.showToast('failure',AOCLit.csrCodeExist);
    			systemCombo.reset();
    			orgCodeCombo.reset();
    			csrCodeCombo.reset();
    		}
    	});
    	codeOwner.setDisabled(false);
    },
    onSelectCodeOwner: function(combo){
    	var me = this,
			refs = this.getReferences(),
			insertBtn = refs.insertBtn;
		insertBtn.setDisabled(false);
    }
});
