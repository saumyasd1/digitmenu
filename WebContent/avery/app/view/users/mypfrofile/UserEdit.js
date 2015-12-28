Ext.define('AOC.view.users.myprofile.UserEdit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.useredit',
    updateUserLogoId: Ext.id(),  
    initComponent: function () {
        Ext.apply(this, {
            items: this.buildItems()
        });
        this.callParent(arguments);
    },
    rec: null,
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
				margin:'0 0 0 200',
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
                        readOnly: true
                    }, {
                        name: 'jobTitle',
                        fieldLabel: jobTitle,
                        maxLength : 64,
                        maxLengthText : maxCharText.replace("$$$$", 64)
                    }, {
                        xtype: 'combobox',
                        itemId: 'role',
                        editable : false,
                        readOnly : (id == AOC.config.Runtime.getUser().id),
                        store: 'Roles',
                        name : 'role',
                        queryMode : 'local',
                        displayField: 'entityName',
                        valueField: 'id',
                        fieldLabel: role
                    },{
                	xtype:'hidden',
                	name:'id'
                    }]
                }]
            }]
        }];
    }
});