Ext.define('AOC.view.users.myprofile.AddUserWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.adduserwindow',
    fileArray:[],
    getSystemCsrCodeValues:function(grid){
    	var store = grid.store,
    		me = this,
    		mode = me.getView().mode;
    	var yesArray = [],
    		noArray = [];
    	
    	store.each(function(rec, index){
    		if(rec.get('codeOwner') == 'Y'){
    			if(mode == 'edit'){
        			yesArray.push(rec.get('id'));
    			}
    			else{
        			yesArray.push(rec.get('id'));
    			}
    		}else if((rec.get('codeOwner') == 'N')){
    			if(mode == 'edit'){
        			noArray.push(rec.get('id'));
    			}
    			else{
        			noArray.push(rec.get('id'));
    			}
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
            userGrid = view.gridView,
            userId = userinfo.id,
            userIdObj = {userId:userId},
            url = '',
            valueObj = '',
            method = '',
            msg = '';
        
        var obj = me.getSystemCsrCodeValues(systemCsrCodeGrid);
        
        var values = form.getValues(false, true, false, true);
        if(systemCsrCodeGrid.store.getCount() == 0 && values.role == 3){
        	Helper.showToast('validation', 'User must have atleast one CSR Code');
        	return;
        }
        
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
                        Helper.showToast('success', msg);
                        if(userGrid){
                        	userGrid.store.load();
                        }
                        else{
	                        AOCRuntime.setUser(jsonString.user);
	                        if(AOCRuntime.getUser().id == view.ID){
	                        	Helper.updateProfileInfo();
	                        }
	                        Helper.setCookie("userinfo", JSON.stringify(jsonString.user), 30);
                        }
                        view.close();
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
    	if(win.mode != 'view'){
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
	        });
	        win.unmask();
    	}
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
            if(AOCRuntime.getUser().id == me.getView().ID){
            	Helper.setUserProfileIcon(fileContent);
            }
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
                    //me.getView().fireEvent('uploaded',me.getView().scope);
                    break;
                }
            }
    },
    beforeRenderUploadbtn: function(uploadbtn){
    	var me = this,
    		refs = me.getReferences(),
    		recordId = refs['addEditUserWinForm'].getForm().getValues().id,
    		userId = AOCRuntime.getUser().id;
    	
    	if(!Ext.isEmpty(recordId) && (recordId != userId)){
    		uploadbtn.setHidden(true);
    	}
    	if(me.getView().mode == 'add'){
    		uploadbtn.setHidden(true);
    	}
    },
    onSiteSelected:function(field){
    	var me = this,	
			refs = me.getView().getReferences(),
    		systemCsrCodeGrid = refs.systemCsrCodeGrid,
    		systemCsrCodeGridStore = systemCsrCodeGrid.store,
    		gridRefs = me.getReferences(),
    		systemCombo = gridRefs.systemName,
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
    	systemCsrCodeGridStore.removeAll();
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
    		reader: {
    			type: 'json'
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
    		systemCombo = refs.systemName,
    		orgCodeCombo = refs.orgCode,
    		csrCodeCombo = refs.csrCode,
    		codeOwnerCombo = refs.codeOwner;
    	
    	systemCombo.reset();
    	orgCodeCombo.reset();
    	csrCodeCombo.reset();
    	codeOwnerCombo.reset();
    	orgCodeCombo.setDisabled(true);
    	csrCodeCombo.setDisabled(true);
    	codeOwnerCombo.setDisabled(true);
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
    		insertBtn = refs.insertBtn,
    		systemComboValue = systemCombo.getRawValue(),
    		orgCodeComboValue = orgCodeCombo.getRawValue(),
    		csrCodeComboValue = csrCodeCombo.getRawValue(),
    		csrCodeComboId = csrCodeCombo.getValue(),
    		codeOwnerComboValue = codeOwner.getRawValue(),
    		obj = {systemName : systemComboValue,orgCode : orgCodeComboValue,csrCode : csrCodeComboValue,codeOwner : codeOwnerComboValue,csrCodeComboId:csrCodeComboId,id:csrCodeComboId};
    	
    	if(systemCsrCodeGridStore.getCount() > 0){
	    	systemCsrCodeGridStore.each(function(record, index){
	    		if(record.get('codeOwner') != obj.codeOwner){
	    			Helper.showToast('validation', 'Code Owner should be '+record.get('codeOwner') +'.Please change code owner');
	    			return;
	    		}else{
	    			systemCsrCodeGridStore.insert(0,(new Ext.data.Record(obj)));
	    	    	systemCombo.reset();
	    	    	orgCodeCombo.reset();
	    	    	csrCodeCombo.reset();
	    	    	codeOwner.reset();
	    	    	orgCodeCombo.setDisabled(true);
	    	    	csrCodeCombo.setDisabled(true);
	    	    	codeOwner.setDisabled(true);
	    	    	insertBtn.setDisabled(true);
	    		}
	    	}, me);
    	}else{
    		systemCsrCodeGridStore.insert(0,(new Ext.data.Record(obj)));
	    	systemCombo.reset();
	    	orgCodeCombo.reset();
	    	csrCodeCombo.reset();
	    	codeOwner.reset();
	    	orgCodeCombo.setDisabled(true);
	    	csrCodeCombo.setDisabled(true);
	    	codeOwner.setDisabled(true);
	    	insertBtn.setDisabled(true);
    	}
    },
    onSelectCsrCode: function(combo){
    	var me = this,
    		csrComboValue = combo.getRawValue(),
    		refs = me.getReferences(),
    		systemCsrCodeGridStore = refs.systemCsrCodeGrid.store,
    		systemCombo = refs.systemName,
    		orgCodeCombo = refs.orgCode,
    		csrCodeCombo = refs.csrCode,
    		codeOwner = refs.codeOwner,
    		hasOwner = combo.getSelectedRecord().data.hasOwner,
    		insertBtn = refs.insertBtn;
    	
    	codeOwner.setDisabled(false);
    	systemCsrCodeGridStore.each(function(rec, index){
    		if(rec.get('csrCode') == csrComboValue ){
    			Helper.showToast('failure',AOCLit.csrCodeExist);
    			systemCombo.reset();
    			orgCodeCombo.reset();
    			csrCodeCombo.reset();
    			orgCodeCombo.setDisabled(true);
    			csrCodeCombo.setDisabled(true);
    			codeOwner.setDisabled(true);
    		}
    	});
    	if(hasOwner == 'true'){
    		codeOwner.setValue('N');
    		codeOwner.setDisabled(true);
    		insertBtn.setDisabled(false);
    	}else{
    		codeOwner.setValue('Y');
    		codeOwner.setDisabled(true);
    		insertBtn.setDisabled(false);
    	}
    },
    onSelectCodeOwner: function(combo){
    	var me = this,
			refs = me.getReferences(),
			insertBtn = refs.insertBtn;
		insertBtn.setDisabled(false);
    },
    
    onClickEdit: function (btn) {
        var me = this,
        	userinfo = AOCRuntime.getUser(),
        	refs = me.getReferences(),
        	editForm = refs.addEditUserWinForm,
        	viewForm = refs.viewUserForm;
        
        this.getView().mode = 'edit';
        this.getView().setTitle('Edit Profile');
        this.getView().ID = userinfo.id;
        
        refs['roledisplayfield'].setHidden(false);
        refs['newPassword'].setValue();
        
        if(userinfo.role == superAdmin){
        	refs['siteName'].setHidden(true);
        }
    	refs['newPassword'].setHidden(true);
    	refs['confirmPassword'].setHidden(true);
        
        refs['roleName'].setHidden(true);
        refs['saveUserFormBtn'].setHidden(false);
        refs['viewBtn'].setHidden(false);
        refs['cancelUserFormBtn'].setHidden(false);
        refs['changePasswordBtn'].setHidden(true);
        btn.hide();
        
        viewForm.hide();
        editForm.show();
        editForm.loadRecord(new Ext.data.Record(userinfo));
        refs['siteName'].setDisabled(true);
        
        var userInfo = AOCRuntime.getUser(),
        	systemCsrCodeOwner = userInfo.systemCsrCodeOwner,
        	systemCsrNonCodeOwner = userInfo.systemCsrNonCodeOwner;
        
	    var	systemCsrCombinedCodes ='';
	    if((systemCsrCodeOwner != null && !Ext.isEmpty(systemCsrCodeOwner.trim())) && (systemCsrNonCodeOwner !=null && !Ext.isEmpty(systemCsrNonCodeOwner.trim()))){
	        systemCsrCombinedCodes = systemCsrCodeOwner+","+systemCsrNonCodeOwner;
	    }
	    else{
	    	if(systemCsrCodeOwner != null){
	    		if(!Ext.isEmpty(systemCsrCodeOwner.trim())){
	        		systemCsrCombinedCodes = systemCsrCodeOwner;
	        	}
	        	else if(!Ext.isEmpty(systemCsrNonCodeOwner.trim()) && systemCsrNonCodeOwner !=null){
	        		systemCsrCombinedCodes = systemCsrNonCodeOwner;
	        	}
	    	}
	    }
	    if(!Ext.isEmpty(systemCsrCombinedCodes.trim())){
	    	refs['systemCsrCodeGrid'].setDisabled(true);
        	Helper.loadSystemCsrCodeGrid(refs['systemCsrCodeGrid'], systemCsrCodeOwner, systemCsrNonCodeOwner, systemCsrCombinedCodes);
	    }
        this.getView().center();
    },
    onViewBtnClick:function(btn){
    	var me = this,
	    	refs = me.getReferences(),
	    	editForm = refs.addEditUserWinForm,
	    	viewForm = refs.viewUserForm;
    	
    	this.getView().mode = 'view';
    	
	    refs['saveUserFormBtn'].setHidden(true);
        refs['editBtn'].setHidden(false);
        refs['cancelUserFormBtn'].setHidden(true);
        refs['changePasswordBtn'].setHidden(false);
        btn.hide();
        editForm.hide();
	    viewForm.show();
	    
	    this.getView().center();
    },
    onClickChangePassword:function(){
    	var win = Ext.create('AOC.view.users.myprofile.ChangePasswordWin');
    	win.show();
    },
    onRoleChange: function(combo){
    	var me = this,
    		view = me.getView(),
    		refs = me.getReferences(),
    		roleComboValue = combo.getValue(),
    		systemCsrCodeGrid = refs.systemCsrCodeGrid;
    	
    	if(roleComboValue == 3){
    		systemCsrCodeGrid.setHidden(false);
    		if(view.isVisible()){
	    		var pos = view.getPosition();
	    		view.setPosition(pos[0],pos[1]-100);
    		}
    	}
    	else{
    		systemCsrCodeGrid.setHidden(true);
    		if(view.isVisible()){
	    		var pos = view.getPosition();
	    		view.setPosition(pos[0],pos[1]+100);
    		}
    	}
    }
});
