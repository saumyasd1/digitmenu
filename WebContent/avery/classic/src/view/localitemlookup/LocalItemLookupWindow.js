Ext.define('AOC.view.localitemlookup.LocalItemLookupWindow', {
    extend: 'AOC.view.base.NewBaseWindow',
    alias: 'widget.localitemlookupwindow',
    controller:'localitemlookupwindowcontroller',
    bodyPadding: 10,
    width: 550,
    height: 370,
    scrollable: true,
    title: 'Add Local Item Lookup',
    layout: {
        type: 'anchor'
    },
    draggable: false,
    editMode: false,
    rec: null,
    detail: null,
    ID: null,
    
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            items: me.buildItem(),
            buttons: me.buildButtons()

        });
        me.callParent(arguments);
    },
    buildButtons: function () {
        var roleId = AOCRuntime.getUser().role;
        return [{
            text: AOCLit.Save,
            handler: 'saveBtnClick'
        }, {
            text: AOCLit.Cancel,
            handler: 'closeBtnClick'
        }];
    },
    buildItem: function () {
        return [
        {
            xtype: 'form',
            border: false,
            reference: 'localItemLookupForm',
            anchor: '100%',
            scrollable: true,
            items: [{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '0 0 5 0',
                defaults: {
                    labelSeparator: '',
                    labelStyle: Settings.config.defaultFormLabelStyle,
                    labelAlign: Settings.form.topLabelAlign
                },
                items: [{
                    xtype: 'textfield',
                    name: 'customerItemNO',
                    fieldLabel: AOCLit.customerItemNO,
                    allowBlank: false,
                    reference: 'customerItemNO',
                    flex: 1
                }, {
                    xtype: 'textfield',
                    name: 'glid',
                    fieldLabel: AOCLit.glid,
                    allowBlank: false,
                    reference: 'glid',
                    margin:'0 0 0 10',
                    flex: 1
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '0 0 5 0',
                flex: 1,
                defaults: {
                    labelSeparator: '',
                    labelStyle: Settings.config.defaultFormLabelStyle,
                    labelAlign: Settings.form.topLabelAlign
                },
                items: [{
                    xtype: 'textfield',
                    name: 'identifierValue',
                    fieldLabel: AOCLit.identifierValue,
                    allowBlank: false,
                    reference: 'identifierValue',
                    flex: 1
                }, {
                    xtype: 'textfield',
                    name: 'partnerName',
                    fieldLabel: AOCLit.partnerName,
                    allowBlank: false,
                    reference: 'partnerName',
                    margin:'0 0 0 10',
                    flex: 1
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '0 0 5 0',
                flex: 1,
                defaults: {
                    labelSeparator: '',
                    labelStyle: Settings.config.defaultFormLabelStyle,
                    labelAlign: Settings.form.topLabelAlign
                },
                items: [{
                    xtype: 'textfield',
                    name: 'rboName',
                    fieldLabel: AOCLit.RBOName,
                    allowBlank: false,
                    reference: 'rboName',
                    flex: 1
                }, {
                    xtype: 'textfield',
                    name: 'orgCode',
                    fieldLabel: AOCLit.orgCode,
                    allowBlank: false,
                    reference: 'orgCode',
                    margin:'0 0 0 10',
                    flex: 1
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '0 0 5 0',
                flex: 1,
                defaults: {
                    labelSeparator: '',
                    labelStyle: Settings.config.defaultFormLabelStyle,
                    labelAlign: Settings.form.topLabelAlign
                },
                items: [{
                    xtype: 'textfield',
                    name: 'system',
                    width:260,
                    allowBlank: false,
                    fieldLabel: AOCLit.system,
                    reference:'system'
                }]
            }]
        }];
    }
});
