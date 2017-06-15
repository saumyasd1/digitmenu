Ext.define('AOC.view.users.myprofile.UserInfo', {
    extend: 'Ext.form.Panel',
    requires : [
        'Ext.form.field.Hidden'
    ],
    alias: 'widget.userinfo',
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
            layout: 'hbox',
            reference: 'viewUserForm',
            mode: me.mode,
            items: [{
                xtype: 'fieldcontainer',
                layout: 'vbox',
                margin:'10 50 0 10',
                items: [{
                    xtype: 'image',
                    anchor: '40%',
                    reference:'profileImage',
                    bind:{
                    	src:'{userInfo.fileSrc}'
                    },
                    margin:'15 0 0 0',
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
                    hidden:true,
                    listeners:{
						'change':'onClickUpdatePhoto'
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
                    bind:'{userInfo.csrCodeOwnerName}',
                    hidden:true
                },
                {	
                	name:'csrNonCodeOwnerName',
                	fieldLabel:AOCLit.csrNonCodeOwnerName,
                    bind:'{userInfo.csrNonCodeOwnerName}',
                    hidden:true
                }]
            }]
        }];
    }
});