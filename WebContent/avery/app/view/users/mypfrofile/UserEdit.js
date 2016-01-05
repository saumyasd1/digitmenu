Ext.define('AOC.view.users.myprofile.UserEdit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.useredit',
    itemId:'useredititemid',
    controller:'userMain',
    showPasswordField:false,
    editMode:false,
    rec: null,
    ID:null,
    updateUserLogoId: Ext.id(),  
    initComponent: function () {
        Ext.apply(this, {
            items: this.buildItems(),
        });
        this.callParent(arguments);
    },
    buildButtons : function(){
        return [{
        	text : 'Save',
            handler : 'SaveDetails'
        },
        {
        	text : 'Cancel',
            handler : 'CancelDetails'
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
            //imageUrl = me.rec.get('imageUrl'),
            //id = me.rec.get('id'),
            maxCharText =  maximumNChar;
        return [{
            xtype: 'form',
            itemId: 'editform',
            padding: '30 0 0 20',
            mode:me.editMode,
            items: [{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [{
                	layout : 'vbox',
                	items : [
				{
				xtype:"component",
				width: 140,
				height:185,
				itemId: 'updateUserImage',
				region:'center',
				margin:'0 0 0 40',
				data: AOC.config.Runtime.getUser(),
				tpl: me.buildUserInfoTpl()
				}
                	]
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
                        margin:'0 0 20 0'
                        
                    },
                    items: [{
                        xtype: 'label',
                        text: personalInformation,
                        cls : 'userDetail-title'
                    }, {
                        name: 'firstName',
                        fieldLabel: firstName,
                        allowBlank: false,
                        maxLength : 64,
                        maxLengthText : maxCharText.replace("$$$$", 64),
                        regex: new RegExp(AOC.config.Settings.getNameRegex()),
                        regexText: splCharNotAllowed
                    }, {
                        name: 'lastName',
                        fieldLabel: lastName,
                        maxLength : 64,
                        maxLengthText : maxCharText.replace("$$$$", 64),
                        regex: new RegExp(AOC.config.Settings.getNameRegex()), 
                        regexText: splCharNotAllowed
                    }, {
                        xtype: 'radiogroup',
                        fieldLabel : iam,
                        margin:'-4 0 4 0',
                        items: [{boxLabel :male,name : 'gender',width: 100, inputValue :'Male', checked : true }, {boxLabel : female,name : 'gender',width: 100, inputValue : 'Female'}]
                    },{
                        name: 'email',
                        fieldLabel: emailAddress,
                        regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?,\s*?)*)*$/
                    }, {
                        name: 'jobTitle',
                        fieldLabel: jobTitle,
                        maxLength : 64,
                        maxLengthText : maxCharText.replace("$$$$", 64)
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'role',
                        editable : false,
                        readOnly : (id == AOC.config.Runtime.getUser().id),
                        store: 'Roles',
                        name : 'role',
                        queryMode : 'local',
                        displayField: 'displayname',
                        valueField: 'value',
                        fieldLabel: role
                    },
                    {
                   	 xtype: 'textfield',
                            inputType: 'password',
                            itemId: 'newPassword',
                            name: 'password',
                            fieldLabel: password,
                            allowBlank: false,
                            blankText : 'Password is required(should be atleast of length 8)',
                            validateOnChange:false,
                            vtype:'newpassword',
                            hidden:me.showPasswordField,
                            initialPassField: 'currentPassword',
                            listeners: {
                                scope: me
                            }
                        },
                        {
                   	        xtype: 'textfield',
                            inputType: 'password',
                            itemId: 'confirmPassword',
                            name: 'confirmPassword',
                            allowBlank: false,
                            blankText : 'Confirm Password is required',
                            fieldLabel: confirmPassword,
                            hidden:me.showPasswordField,
                            vtype: 'password',
                            initialPassField: 'password'
                        }
                    ,{
                	xtype:'hidden',
                	name:'id'
                    }]
                }]
            },
            {
            	xtype :'tbspacer',
            	width :100
    		},
            { buttons:this.buildButtons()}]
   
        }];
    }
});
Ext.apply(Ext.form.VTypes, {
	 newpassword: function(val,field) {
		    if(val && val.length<8)
		    	{
		    	field.vtypeText =minimum8Char;
		    	return false;
		    	}
		    if (field.initialPassField) {
     		 var pwd = Ext.ComponentQuery.query('#'+field.initialPassField)[0];
     		  if(val && val == pwd.getValue()){
     		  field.vtypeText =newPasswordFailureMsg;
     		    	return false;
     		   }}
     		 return true;
		    },
		    password : function(val, field) {
		    if (field.initialPassField) {
		     var pwd = Ext.ComponentQuery.query('#'+field.initialPassField)[0];
		    	return (val == pwd.getValue());
		    }
		        return true;
		    },
		    passwordText :passwordsNotMatch
});