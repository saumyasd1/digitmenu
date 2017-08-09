Ext.define('AOC.view.localitemlookup.LocalItemLookupWindow', {
    extend: 'AOC.view.base.NewBaseWindow',
    alias: 'widget.localitemlookupwindow',
    controller: 'localitemlookupwindowcontroller',
    bodyPadding: 10,
    width: 600,
    scrollable: true,
    title: 'Add Local Item Lookup',
    layout: {
        type: 'anchor'
    },
    draggable: false,
    rec: null,
    mode: 'add',

    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            items: me.buildItem(),
            buttons: me.buildButtons()
        });
        me.callParent(arguments);
    },
    buildButtons: function () {
        return [{
            text: AOCLit.Save,
            iconCls: 'x-fa fa-save',
            handler: 'saveBtnClick'
        }, {
            text: AOCLit.Cancel,
            iconCls: 'x-fa fa-times',
            handler: 'closeBtnClick'
        }];
    },
    buildItem: function () {
        var me = this,
        	orgStore = Ext.data.StoreManager.lookup('orgComboStoreId') == null ? Ext.create('AOC.store.OrgStore') : Ext.data.StoreManager.lookup('orgComboStoreId'),
            systemStore =Ext.data.StoreManager.lookup('localItemSystemComboStoreId') == null ?  Ext.create('AOC.store.SystemStore',{storeId:'localItemSystemComboStoreId'}) :Ext.data.StoreManager.lookup('localItemSystemComboStoreId');
            
        return [{
            xtype: 'form',
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
                    labelAlign: Settings.form.topLabelAlign,
                    xtype: 'combo',
                    allowBlank: false,
                    flex: 1
                },
                items: [{
                    fieldLabel: AOCLit.partnerName,
                    name: 'partnerName',
                    reference: 'partnerName',
                    store:Ext.data.StoreManager.lookup('partnerComboStoreId'),
                    allowBlank: false,
                    queryMode: 'local',
                    displayField: 'partnerName',
                    valueField: 'id',
                    listeners: {
                        blur: 'onComboBlur',
                        select: 'onPartnerComboSelect'
//                        change:'onPartnerChange'
                    }
                }, {
                    itemId: 'RItemId',
                    name: 'rboName',
                    reference: 'rboName',
                    fieldLabel: AOCLit.RBO,
                    store: Ext.create('Ext.data.JsonStore', {
                        fields: ['id', 'rboName', 'site'],
                        data: []
                    }),
                    disabled: me.mode == 'edit' ? false :  true,
                    margin: '0 0 0 10',
                    displayField: 'rboName',
                    valueField: 'rboName',
                    queryMode: 'local',
                    listeners: {
                        blur: 'onComboBlur',
                        select:'onRBOSelect'
                    }
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '0 0 5 0',
                flex: 1,
                defaults: {
                    xtype: 'combo',
                    labelSeparator: '',
                    labelStyle: Settings.config.defaultFormLabelStyle,
                    labelAlign: Settings.form.topLabelAlign,
                    flex: 1
                },
                items: [{
                    fieldLabel: AOCLit.system,
                    name: 'system',
                    reference: 'systemCombo',
                    displayField: 'name',
                    valueField: 'id',
                    queryMode: 'local',
                    disabled:  me.mode == 'edit' ? false :  true,
                    store: systemStore,
                    listeners: {
                        blur: 'onComboBlur',
                        select: 'onSystemSelect'
//                        change:'onSystemComboChange'
                    }
                }, {
                    name: 'orgCode',
                    store: orgStore,
                    reference: 'orgCombo',
                    displayField: 'name',
                    fieldLabel: AOCLit.orgCode,
                    queryMode: 'local',
                    valueField: 'name',
                    margin: '0 0 0 10',
                    disabled:  me.mode == 'edit' ? false :  true,
                    listeners: {
                        blur: 'onComboBlur'
                    }
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '0 0 5 0',
                flex: 1,
                defaults: {
                    labelSeparator: '',
                    labelStyle: Settings.config.defaultFormLabelStyle,
                    labelAlign: Settings.form.topLabelAlign,
                    xtype: 'textfield',
                    allowBlank: false,
                    flex: 1
                },
                items: [{
                    name: 'customerItemNO',
                    fieldLabel: AOCLit.customerItemNO,
                    reference: 'customerItemNO'
                }, {
                    name: 'glid',
                    fieldLabel: AOCLit.glid,
                    reference: 'glid',
                    margin: '0 0 0 10'
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '0 0 5 0',
                defaults: {
                    labelSeparator: '',
                    labelStyle: Settings.config.defaultFormLabelStyle,
                    labelAlign: Settings.form.topLabelAlign,
                    width:280
                },
                items: [{
                    xtype: 'textfield',
                    name: 'identifierValue',
                    fieldLabel: AOCLit.identifierValue,
                    reference: 'identifierValue',
                }]
            }]
        }];
    }
});
