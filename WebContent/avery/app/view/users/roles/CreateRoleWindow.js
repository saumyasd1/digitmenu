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
    editMode: false,
    initComponent: function () {
        Ext.apply(this, {
            items: this.buildItem(),
            buttons: this.buildButtons()
        });
        this.callParent(arguments);
    },
    buildButtons: function () {
        return [{
            text: AOCLit.Save,
            handler: 'onSavebtnClick'
        }, {
            text: AOCLit.close,
            handler: 'onClosebtnClick'
        }];
    },
    buildItem: function () {
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
                    allowBlank: false,
                    reference: 'roleName',
                    flex: 0.5,
                    margin: '20 10 5 10'
                }]
            }, {
                xtype: 'fieldset',
                title: AOCLit.setPermission,
                margin: '20 10 5 10',
                items: [{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin: '0 10 5 0',
                    defaults: {
                        labelSeparator: '',
                        labelStyle: Settings.config.defaultFieldSetLabelStyle,
                        labelAlign: Settings.form.defaultLabelAlign,
                    },
                    items: [{
                        xtype: 'checkboxgroup',
                        columns: 4,
                        reference: 'menuCheckbox',
                        items: [{
                            boxLabel: 'Home Screen',
                            width: 150,
                            name: 'Home',
                            inputValue: '1'
                        }, {
                            boxLabel: 'Task Manager',
                            width: 150,
                            name: 'TaskManager',
                            inputValue: '2'
                        }, {
                            boxLabel: 'Email Queue',
                            width: 150,
                            name: 'EmailQueue',
                            inputValue: '3'
                        }, {
                            boxLabel: 'Order Queue',
                            width: 150,
                            name: 'OrderQueue',
                            inputValue: '4'
                        }, {
                            boxLabel: 'Web Order',
                            width: 150,
                            name: 'WebOrder',
                            inputValue: '5'
                        }, {
                            boxLabel: 'Partner',
                            width: 150,
                            name: 'Partner',
                            inputValue: '6'
                        }, {
                            boxLabel: 'Address',
                            width: 150,
                            name: 'Address',
                            inputValue: '7'
                        }]
                    }]
                }]

            }]
        }];
    }
});
