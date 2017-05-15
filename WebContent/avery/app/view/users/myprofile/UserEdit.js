Ext.define('AOC.view.users.myprofile.UserEdit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.useredit',
    itemId:'useredititemid',
    controller:'userMain',
    showPasswordField:false,
    hidefield:true,
    editMode:false,
    rec: null,
    bodyPadding:7,
    ID:null,
    updateUserLogoId: Ext.id(), 
    initComponent: function () {
        Ext.apply(this, {
            items: this.buildItems(),
            buttons:this.buildButtons()
        });
        this.callParent(arguments);
    },
    buildButtons : function(){
        return [{
        	text : 'Save',
            handler : 'SaveDetails',
            hidden:this.hidefield
        },
        {
        	text : 'Cancel',
            handler : 'CancelDetails',
            hidden:this.hidefield
        }];
    },
    isAdmin : false,
    buildUserInfoTpl:function(){
    	var me = this,
        helper =AOC.util.Helper;
    	return Ext.create('Ext.XTemplate',
                '{[this.getInfoHtml(values)]}',
                {
                    getInfoHtml: function(v) {
                            var html = '<span>',
                            gender = (Ext.isEmpty(v.gender))? 1400:v.gender;
                            html += '<div class="container-border profile-img-change-outer-div" id="userchangeimg">';
                            var el = Ext.get(me.updateUserLogoId);
                        	if(!Ext.isEmpty(el)){
                        		el.destroy();	
                        	}
                            if (Ext.isEmpty(v.imageUrl)){
                        	img= AOC.config.Settings.buttonIcons.defaultUserImg;
                        	html +='<img class="profile-img-edit-inner-div" src="'+img+'" />';
                            }else{
                                	var img=v.imageUrl+'?_dc='+new Date().getTime();
                                	html +='<img class="profile-img-edit-inner-div" src="'+img+'" />';
                            	}
                            	html += '<span  id="'+me.updateUserLogoId+'" class="user-change-logo-text"></span>',	
                        html = html + '</span>';
                        return html;
                    }
                }
            );
    },
    buildItems: function () {
        var me = this,
            maxCharText =  AOCLit.maximumNChar;
        return [{
            xtype: 'form',
            itemId: 'editform',
            layout:'fit',
            padding: '30 0 0 20',
            mode: me.editMode,
            items: [{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                flex:1,
               
                items: [{
                	layout : 'vbox',
                	items : [{
								xtype:"component",
								width: 140,
								height:185,
								itemId: 'updateUserImage',
								region:'center',
								margin:'0 0 0 40',
								data: AOC.config.Runtime.getUser(),
								tpl: me.buildUserInfoTpl()
							}]
                }, {
                    xtype: 'fieldcontainer',
                    margin : '0 0 0 100',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        xtype: 'textfield',
                        labelSeparator: ' ',
                        labelWidth : 165,
                        width: 615,
                        margin:'0 0 15 0',
                        listeners: {
                            'blur': 'notifyByImage',
                            'focus': 'hideMandatoryMessage'
                        }
                        
                    },
                    items: [{
                        xtype: 'label',
                        text: AOCLit.personalInformation,
                        cls : 'userDetail-title'
                    },{
                        xtype: 'displayfield',
                        itemId: 'messageFieldItemId',
                        value: '',
                        hidden: true
                    }, {
                        name: 'firstName',
                        fieldLabel: AOCLit.firstName,
                        allowBlank: false,
                        maxLength : 64,
                        maxLengthText : maxCharText.replace("$$$$", 64),
                        regex: new RegExp(AOC.config.Settings.getNameRegex()),
                        regexText: AOCLit.splCharNotAllowed
                    }, {
                        name: 'lastName',
                        fieldLabel: AOCLit.lastName,
                        maxLength : 64,
                        maxLengthText : maxCharText.replace("$$$$", 64),
                        regex: new RegExp(AOC.config.Settings.getNameRegex()), 
                        regexText: AOCLit.splCharNotAllowed
                    }, {
                        xtype: 'radiogroup',
                        fieldLabel : AOCLit.iam,
                        margin:'-4 0 4 0',
                        items: [{boxLabel :AOCLit.male,name : 'gender',width: 100, inputValue :'Male' }, {boxLabel : AOCLit.female,name : 'gender',width: 100, inputValue : 'Female'}]
                    },{
                        name: 'email',
                        fieldLabel: AOCLit.emailAddress,
                        allowBlank: false,
                        regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?,\s*?)*)*$/
                    }, {
                        name: 'jobTitle',
                        fieldLabel: AOCLit.jobTitle,
                        maxLength : 64,
                        maxLengthText : maxCharText.replace("$$$$", 64)
                    },
                    {
                        xtype: 'combo',
                        editable : false,
                        fieldLabel: AOCLit.role,
						name: 'role',
						flex:1,
						displayField: 'roleName',
						reference:'roleName',
						valueField: 'id',
						store:Ext.create('AOC.store.RoleStore'),
						queryMode : 'local'
                    },
                    {
						xtype:'combo',
						name: 'siteId',
						fieldLabel: AOCLit.site,
						allowBlank: false,
						flex:1,
						displayField: 'name',
						reference:'siteName',
						valueField: 'id',
						store:Ext.create('AOC.store.SiteStore'),
						queryMode : 'local'
					},
                    {
                   	    xtype: 'textfield',
                        inputType: 'password',
                        itemId: 'newPassword',
                        name: 'password',
                        fieldLabel: AOCLit.password,
                        allowBlank: !me.showPasswordField,
                        blankText : 'Password is required(should be atleast of length 8)',
                        validateOnChange:false,
                        vtype:'newpassword',
                        hidden:!me.showPasswordField,
                        listeners: {
                            scope: me
                        }
                    },{
               	        xtype: 'textfield',
                        inputType: 'password',
                        itemId: 'confirmPassword',
                        name: 'confirmPassword',
                        allowBlank: !me.showPasswordField,
                        blankText : 'Confirm Password is required',
                        fieldLabel: AOCLit.confirmPassword,
                        hidden:!me.showPasswordField,
                        vtype: 'password',
                        initialPassField: 'newPassword'
                    },{
	                	xtype:'hidden',
	                	name:'id'
                    }]
                }]
            }]
   
        }];
    }
});