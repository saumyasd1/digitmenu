Ext.define('AOC.view.users.roles.CreateRoleWindow', {
    extend: 'AOC.view.base.NewBaseWindow',
    alias: 'widget.createrolewindow',
    controller: 'createrolecontroller',
    itemId: 'createroleItemId',
    bodyPadding: 5,
    width: 700,
    height: 270,
    title: 'Add Role',
    scrollable: true,
    layout: {
        type: 'anchor'
    },
    draggable: true,
    initComponent: function () {
        Ext.apply(this, {
            items: this.buildItem(),
            buttons: this.buildButtons()
        });
        this.callParent(arguments);
    },
    afterRender:function(){
    	this.callParent(arguments);
		var me = this;
		if(me.mode=='edit'){
			Ext.getBody().mask('Loading...');
			Ext.Ajax.request({
				url:applicationContext+'/rest/role/menuroles/'+ me.recordId,
				method: 'GET',
				success:function(response){
					var	form = me.down('form');
					var detail = JSON.parse(response.responseText);
					form.loadRecord(new Ext.data.Record(detail.data));
					Ext.getBody().unmask();
				},
				failure:function(){
					Ext.getBody().unmask();
				}
				});
			}
    },
    buildItem: function () {
    	var me = this;
        return [{
            xtype: 'form',
            itemId: 'rolePanel',
            reference: 'createRoleForm',
            border: false,
            scrollable: true,
            items: [{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '0 0 5 0',
                defaults: {
                    labelSeparator: '',
                    labelStyle: Settings.config.defaultFormLabelStyle,
                    labelAlign: Settings.form.defaultLabelAlign,
                    labelWidth: 100,
                },
                items: [{
                    xtype: 'textfield',
                    itemId: 'RNItemId',
                    name: 'roleName',
                    fieldLabel: AOCLit.roleName,
                    allowBlank: me.mode=='edit'  ? true :false,
                    reference: 'roleName',
                    hidden:me.mode=='edit',
                    flex: 0.5,
                    margin: '20 10 5 10'
                }]
            }, {
                xtype: 'fieldset',
                title: AOCLit.setPermission,
                margin: '20 10 5 10',
                title:me.mode=='edit'  ?  '': AOCLit.setPermission,
                items: [{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin: '0 10 5 0',
                    defaults: {
                        labelSeparator: '',
                        labelStyle: Settings.config.defaultFieldSetLabelStyle,
                        labelAlign: Settings.form.defaultLabelAlign,
                    }, // do not edit name config and input values
                    items: [{
                        xtype: 'checkboxgroup',
                        columns: 4,
                        reference: 'menuCheckbox',
                        items: [{
                            boxLabel: 'Home Screen',
                            width: 150,
                            name: 'home',
                            inputValue: '1'
                        }, {
                            boxLabel: 'Task Manager',
                            width: 150,
                            name: 'taskmanager',
                            inputValue: '2'
                        }, {
                            boxLabel: 'Email Queue',
                            width: 150,
                            name: 'emailqueue',
                            inputValue: '3'
                        }, {
                            boxLabel: 'Order Queue',
                            width: 150,
                            name: 'orderqueue',
                            inputValue: '4'
                        },
                        {
                            boxLabel: 'Web Order',
                            width: 150,
                            name: 'weborder',
                            inputValue: '5'
                        }, {
                            boxLabel: 'Partner',
                            width: 150,
                            name: 'partner',
                            inputValue: '6'
                        }, {
                            boxLabel: 'Address',
                            width: 150,
                            name: 'address',
                            inputValue: '7'
                        }]
                    }]
                }]

            }]
        }];
    },
    buildButtons: function () {
        return [{
            text: AOCLit.Save,
            handler: 'onSavebtnClick'
        }, {
            text: AOCLit.close,
            handler: 'onClosebtnClick'
        }];
    }
});
