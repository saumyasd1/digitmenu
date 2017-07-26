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
    	var rboStore = Ext.data.StoreManager.lookup('rboId') == null ? Ext.create('AOC.store.RBOStore') : Ext.data.StoreManager.lookup('rboId'),
			orgStore = Ext.data.StoreManager.lookup('orgComboId') == null ? Ext.create('AOC.store.OrgComboStore') : Ext.data.StoreManager.lookup('orgComboId'),
			systemStore = Ext.data.StoreManager.lookup('systemId') == null ? Ext.create('AOC.store.SystemComboStore') : Ext.data.StoreManager.lookup('systemId');
    	rboStore.load();
    	orgStore.load();
    	systemStore.load();
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
					xtype:'combo',
					fieldLabel:AOCLit.partnerName,
					name:'partnerName',
					reference:'partnerName',
					store:Ext.data.StoreManager.lookup('PartnerManagementStoreId')== null ? Ext.create('AOC.store.PartnerManagementStore') : Ext.data.StoreManager.lookup('PartnerManagementStoreId'),
					allowBlank: false,
					queryMode:'local',
					flex:1,
					margin:'0 0 0 10',
					displayField:'partnerName',
					valueField:'partnerName',
					listeners:{
						blue:'onComboBlur'
					}
				},]
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
					xtype:'combo',
					itemId:'RItemId',
					name: 'rboName',
					reference:'rboId',
					fieldLabel:AOCLit.RBO,
					allowBlank: false,
					flex:1,
					store:rboStore,
					displayField:'rboName',
					valueField:'rboName',
					queryMode:'local',
					listeners:{
						blue:'onComboBlur'
					}
				},{
                	xtype:'combo',
					name:'orgCode',
					store:orgStore,
					displayField:'name',
					fieldLabel:AOCLit.orgCode,
					queryMode:'local',
					valueField:'name',
					flex:1,
					margin:'0 0 0 10'
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
                	xtype:'combo',
					fieldLabel:AOCLit.system,
					name:'system',
					reference:'systemCombo',
					displayField:'name',
					valueField:'name',
					flex:1,
					queryMode:'local',
					store:systemStore
                }]
            }]
        }];
    }
});
