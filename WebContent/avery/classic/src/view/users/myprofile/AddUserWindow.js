Ext.define('AOC.view.users.myprofile.AddUserWindow', {
    extend: 'AOC.view.base.NewBaseWindow',
    alias: 'widget.createuser',
    controller: 'adduserwindow',
    mode: 'add',
    bodyPadding: 10,
    title: 'Add User',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onAddUserAfterRender'
    },
    initComponent: function () {
        var me = this;
        Ext.apply(Ext.form.VTypes, {
       	 newpassword: function(val,field) {
   		    if(val && val.length<8){
   		    	field.vtypeText =minimum8Char;
   		    	return false;
	    		}
   		    if (field.initialPassField) {
   		    	var form=field.up('form');
   		    	var pwd = form.down('#'+field.initialPassField);
         		  	if(val && val == pwd.getValue()){
         		  		field.vtypeText =AOCLit.newPasswordFailureMsg;
         		  		return false;
         		  	}
     		  	}
   		    return true;
		    },
		    password : function(val, field) {
   		    if(field.initialPassField) {
	    			var form=field.up('form');
	    			var pwd = form.down('#'+field.initialPassField);
   		    	return (val == pwd.getValue());
   		    }
		        return true;
		    },
		    passwordText :AOCLit.passwordsNotMatch
        });
        Ext.apply(me, {
            items: me.buildItems(),
            buttons: me.buildButtons()
        });
        me.callParent(arguments);
    },
    buildButtons: function () {
    	var me = this;
        return [{
		      reference:'viewBtn',
		      text:'View',
		      hidden:true,
		      iconCls:'x-fa fa-eye',
		      handler:'onViewBtnClick'
        },{
            text: 'Save',
            hidden:me.mode == 'view',
            reference:'saveUserFormBtn',
            iconCls:'x-fa fa-save',
            handler: 'SaveDetails'
        }, {
            text: 'Cancel',
            hidden:me.mode == 'view',
            iconCls:'x-fa fa-times',
            reference:'cancelUserFormBtn',
            handler: 'CancelDetails'
        }, {
		    reference:'changePasswordBtn',
		    hidden:me.mode != 'view',
		    text:'Change Password',
		    iconCls:'fa fa-key',
		    handler: 'onClickChangePassword'
		  },{
		      reference:'editBtn',
		      text:'Edit',
		      iconCls:'fa fa-pencil-square-o',
		      hidden:me.mode != 'view',
		      handler:'onClickEdit'
		  }];
    },
    buildItems: function () {
        var me = this,
            maxCharText = AOCLit.maximumNChar;
        
        return [{
            xtype: 'form',
            layout: 'hbox',
            hidden:me.mode == 'view',
            reference: 'addEditUserWinForm',
            mode: me.mode,
            items: [ {
                xtype: 'fieldcontainer',
                layout: 'vbox',
                items: [{
                    xtype: 'image',
                    anchor: '40%',
                    reference:'profileImage',
                    bind:{
                    	src:!me.bindFlag ? '{userInfo.fileSrc}' : '/test'
                    },
                    margin: me.mode == 'edit'? '20 0 0 0' : '35 0 0 0',
                    width: 160,
                    height: 160,
                    style: {
                        border: 'solid 1.5px #ddd; border-radius:50%;'
                    }
                }, {
                    xtype: 'fileuploadfield',
                    buttonText: AOCLit.uploadPhoto,
                    margin: '10 0 0 35',
                    width:90,
                    buttonOnly: true,
                    listeners:{
						change:'onClickUpdatePhoto',
						beforerender:'beforeRenderUploadbtn'
					}
                }]
            }, {
                xtype: 'tbspacer',
                width: 20
            }, {
                xtype: 'fieldcontainer',
                anchor: '60%',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    xtype: 'textfield',
                    labelWidth: 165,
                    width: 615,
                    margin: '0 0 5 0',
                    labelSeparator: '',
                    labelStyle: Settings.config.defaultFormLabelStyle,
                    labelAlign: Settings.form.defaultLabelAlign
                },
                items: 
                	[{
                      name: 'firstName',
                      fieldLabel: AOCLit.firstName,
                      allowBlank: false,
                      maxLength: 64,
                      maxLengthText: maxCharText.replace("$$$$", 64),
                      regex: new RegExp(AOC.config.Settings.getNameRegex()),
                      regexText: AOCLit.splCharNotAllowed
                },{
                    name: 'middleName',
                    fieldLabel: AOCLit.middleName,
                    maxLength: 64,
                    maxLengthText: maxCharText.replace("$$$$", 64),
                    regex: new RegExp(AOC.config.Settings.getNameRegex()),
                    regexText: AOCLit.splCharNotAllowed
                },{
                    name: 'lastName',
                    fieldLabel: AOCLit.lastName,
                    maxLength: 64,
                    allowBlank: false,
                    maxLengthText: maxCharText.replace("$$$$", 64),
                    regex: new RegExp(AOC.config.Settings.getNameRegex()),
                    regexText: AOCLit.splCharNotAllowed
                }, {
                    xtype: 'radiogroup',
                    fieldLabel: AOCLit.iam,
                    width: 300,
                    defaults:{
                    	name:'gender',
                    	width:100
                    },
                    items: [{
                        boxLabel: AOCLit.male,
                        inputValue: 'Male'
                    }, {
                        boxLabel: AOCLit.female,
                        inputValue: 'Female'
                    }]
                }, {
                    name: 'email',
                    fieldLabel: AOCLit.emailAddress,
                    allowBlank: false,
                    regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?,\s*?)*)*$/	
                }, {
                    xtype: 'combo',
                    editable: false,
                    fieldLabel: AOCLit.role,
                    name: 'role',
                    flex: 1,
                    allowBlank: false,
                    itemId:'role',
                    displayField: 'roleName',
                    reference: 'roleName',
                    valueField: 'id',
                    store: Ext.create('AOC.store.RoleStore'),
                    queryMode: 'local',
                    listeners:{
                    	change:'onRoleChange'
                    }
                }, {
                	xtype:'displayfield',
                    fieldLabel: AOCLit.role,
                    hidden:true,
                    name: 'roledisplayfield',
                    itemId: 'roledisplayfield',
                    reference:'roledisplayfield',
                    renderer : function(){
                    	var me = this,
                    		roleId = AOCRuntime.getUser().role;
                    	if(roleId==1){
                    		return 'Super Admin';
                    	}
                    	else if(roleId==2){
                    		return 'Site Manager'
                    	}
                    	else {
                    		return 'CSR';
                    	}
                    }
                },{
                    xtype: 'combo',
                    name: 'siteId',
                    itemId:'site',
                    reference:'site',
                    fieldLabel: AOCLit.site,
                    allowBlank: false,
                    flex: 1,
                    editable: false,
                    displayField: 'name',
                    reference: 'siteName',
                    valueField: 'id',
                    store: Ext.create('AOC.store.SiteStore'),
                    queryMode: 'local',
                    listeners:{
                    	select:'onSiteSelected',
                    	change:'onSiteChange'
                    }
                }, {
                	xtype:'systemcsrcodegrid',
                	reference:'systemCsrCodeGrid',
                	style:'border:solid 1px #ccc;'
                }, 
                {
                    xtype: 'textfield',
                    inputType: 'password',
                    itemId: 'newPassword',
                    reference:'newPassword',
                    name: 'password',
                    fieldLabel: AOCLit.password,
                    allowBlank: me.mode=='add'? false : true,
                    blankText: 'Password is required(should be atleast of length 8)',
                    validateOnChange: false,
                    vtype: 'newpassword',
                    hidden: me.mode=='edit'? true : true
                }, {
                    xtype: 'textfield',
                    inputType: 'password',
                    itemId: 'confirmPassword',
                    reference:'confirmPassword',
                    name: 'confirmPassword',
                    allowBlank: me.mode=='add'? false : true,
                    blankText: 'Confirm Password is required',
                    fieldLabel: AOCLit.confirmPassword,
                    hidden:me.mode=='edit'? true : true,
                    vtype: 'password',
                    initialPassField: 'newPassword'
                }, {
                    xtype: 'hidden',
                    name: 'id'
                }]
            }]
        }, {
            xtype: 'form',
            layout: 'hbox',
            reference: 'viewUserForm',
            hidden:me.mode != 'view',
            items: [{
                xtype: 'fieldcontainer',
                layout: 'vbox',
                margin:'10 50 0 10',
                items: [{
                    xtype: 'image',
                    anchor: '40%',
                    bind:{
                    	src:'{userInfo.fileSrc}'
                    },
                    margin:'15 0 0 0',
                    width: 160,
                    height: 160,
                    style: {
                        border: 'solid 1.5px #ddd; border-radius:50%;'
                    }
                }]
            }, {
                xtype: 'fieldcontainer',
                anchor: '60%',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    xtype: 'displayfield',
                    labelWidth: 180,
                    flex:1,
                    margin: '0 0 5 0',
                    labelSeparator: '',
                    labelStyle: Settings.config.defaultFormLabelStyle,
                    labelAlign: Settings.form.defaultLabelAlign

                },
                items: 
                	[{
                      name: 'name',
                      fieldLabel: AOCLit.name,
                      bind:'{userInfo.name}'
                }, { 
                	fieldLabel:AOCLit.iam,
                    name: 'gender',
                    bind:'{userInfo.gender}',
                    itemId: 'gender',
                    renderer : function(v){
                    	return Ext.util.Format.htmlEncode(v);
                    }
                },{
                    name: 'email',
                    fieldLabel: AOCLit.emailAddress,
                    bind:'{userInfo.email}'
                }, {
                    fieldLabel: AOCLit.role,
                    name: 'role',
                    bind:'{userInfo.role}',
                    renderer : function(v){
                    	if(v==1){
                    		return 'Super Admin';
                    	}
                    	else if(v==2){
                    		return 'Site Manager'
                    	}
                    	else {
                    		return 'CSR';
                    	}
                    }
                },
                {	
                	name:'csrCodeOwnerName',
                	fieldLabel:AOCLit.csrCodeOwnerName,
                    //bind:'{userInfo.csrCodeOwnerName}',
                    hidden:true
                },
                {	
                	name:'csrNonCodeOwnerName',
                	fieldLabel:AOCLit.csrNonCodeOwnerName,
                    //bind:'{userInfo.csrNonCodeOwnerName}',
                    hidden:true
                }]
            }]
        }];
    },
    onDestroy:function(){
    	
    }
});
