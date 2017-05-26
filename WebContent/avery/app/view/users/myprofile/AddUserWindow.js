Ext.define('AOC.view.users.myprofile.AddUserWindow', {
    extend: 'AOC.view.base.NewBaseWindow',
    alias: 'widget.createuser',
    itemId: 'createuserItemId',
    controller: 'adduserwindow',
    reference: 'addEditUserWin',
    mode: 'add',
    bodyPadding: 7,
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
        Ext.apply(me, {
            items: me.buildItems(),
            buttons: me.buildButtons(),

        });
        me.callParent(arguments);
    },
    buildButtons: function () {
        return [{
            text: 'Save',
            handler: 'SaveDetails'
        }, {
            text: 'Cancel',
            handler: 'CancelDetails'
        }];
    },
    buildItems: function () {
        var me = this,
            maxCharText = AOCLit.maximumNChar;
        return [{
            xtype: 'form',
            itemId: 'editform',
            layout: 'hbox',
            reference: 'addEditUserWinForm',
            mode: me.mode,
            items: [{
                xtype: 'tbspacer',
                width: 20
            	}, {
                xtype: 'fieldcontainer',
                layout: 'vbox',
                items: [{
                    xtype: 'image',
                    anchor: '40%',
                    reference:'profileImage',
                    margin: me.mode == 'edit'? '20 0 0 0' : '35 0 0 0',
                    width: 160,
                    height: 160,
                    style: {
                        border: 'solid 1.5px #ddd; border-radius:160px;'
                    }
                }, {
                    xtype: 'fileuploadfield',
                    buttonText: AOCLit.uploadPhoto,
                    margin: '10 0 0 35',
                    buttonOnly: true,
                    listeners:{
						'change':'onClickUpdatePhoto',
						'beforerender':'beforeRenderUploadbtn'
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
                      itemId:'name',
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
                    items: [{
                        boxLabel: AOCLit.male,
                        name: 'gender',
                        width: 100,
                        inputValue: 'Male'
                    }, {
                        boxLabel: AOCLit.female,
                        name: 'gender',
                        width: 100,
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
                    queryMode: 'local'
                }, {
                	xtype:'displayfield',
                    fieldLabel: AOCLit.role,
                    hidden:true,
                    name: 'roledisplayfield',
                    itemId: 'roledisplayfield',
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
                    fieldLabel: AOCLit.site,
                    allowBlank: false,
                    flex: 1,
                    editable: false,
                    displayField: 'name',
                    reference: 'siteName',
                    valueField: 'id',
                    store: Ext.create('AOC.store.SiteStore'),
                    queryMode: 'local'
                }, {
                    xtype: 'textfield',
                    inputType: 'password',
                    itemId: 'newPassword',
                    name: 'password',
                    fieldLabel: AOCLit.password,
                    allowBlank: me.mode=='add'? false : true,
                    blankText: 'Password is required(should be atleast of length 8)',
                    validateOnChange: false,
                    vtype: 'newpassword',
                    hidden: me.mode=='edit'? true : false,
                    listeners: {
                        scope: me
                    }
                }, {
                    xtype: 'textfield',
                    inputType: 'password',
                    itemId: 'confirmPassword',
                    name: 'confirmPassword',
                    allowBlank: me.mode=='add'? false : true,
                    blankText: 'Confirm Password is required',
                    fieldLabel: AOCLit.confirmPassword,
                    hidden:me.mode=='edit'? true : false,
                    vtype: 'password',
                    initialPassField: 'newPassword'
                }, {
                    xtype: 'hidden',
                    name: 'id'
                }]
            }]
        }];
    }
});
