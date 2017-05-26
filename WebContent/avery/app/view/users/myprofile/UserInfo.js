Ext.define('AOC.view.users.myprofile.UserInfo', {
    extend: 'Ext.form.Panel',
    requires : [
        'Ext.form.field.Hidden'
    ],
    alias: 'widget.userinfo',
    padding: '30 20 30 20',
    controller:'adduserwindow',
    initComponent: function () {
        Ext.apply(this, {
            items: this.buildItems()
        });
        this.callParent(arguments);
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
                width: 150
            }, {
                xtype: 'fieldcontainer',
                layout: 'vbox',
                items: [{
                    xtype: 'image',
                    anchor: '40%',
                    reference:'profileImage',
                    margin:'15 0 0 0',
                    width: 160,
                    height: 160,
                    src:Helper.getFilePath(),
                    style: {
                        border: 'solid 1.5px #ddd; border-radius:160px;'
                    }
                }, {
                    xtype: 'fileuploadfield',
                    buttonText: AOCLit.uploadPhoto,
                    margin: '10 0 0 35',
                    buttonOnly: true,
                    hidden:true,
                    listeners:{
						'change':'onClickUpdatePhoto'
					}
                }]
            }, {
                xtype: 'tbspacer',
                width: 150
            }, {
                xtype: 'fieldcontainer',
                anchor: '60%',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    xtype: 'displayfield',
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
                      fieldLabel: AOCLit.name,
                      itemId:'name'
                }, { 
                	fieldLabel:AOCLit.iam,
                    name: 'gender',
                    itemId: 'gender',
                    renderer : function(v){
                    	return Ext.util.Format.htmlEncode(v);
                    }
                },{
                    name: 'email',
                    fieldLabel: AOCLit.emailAddress,
                    itemId:'email'
                }, {
                    fieldLabel: AOCLit.role,
                    name: 'role',
                    itemId: 'role',
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
                }]
            }]
        }];
    }
});