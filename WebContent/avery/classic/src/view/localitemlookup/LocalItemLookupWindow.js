Ext.define('AOC.view.localitemlookup.LocalItemLookupWindow', {
    extend: 'AOC.view.base.NewBaseWindow',
    alias: 'widget.localitemlookupwindow',
    controller:'localitemlookupwindowcontroller',
    bodyPadding: 10,
    width: 600,
//    height: 370,
    scrollable: true,
    title: 'Add Local Item Lookup',
    layout: {
        type: 'anchor'
    },
    draggable: false,
    rec: null,
    mode:'add',
    
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
            iconCls:'x-fa fa-save',
            handler: 'saveBtnClick'
        }, {
            text: AOCLit.Cancel,
            iconCls:'x-fa fa-times',
            handler: 'closeBtnClick'
        }];
    },
    buildItem: function () {
		var	orgStore = Ext.data.StoreManager.lookup('orgComboStoreId') == null ? Ext.create('AOC.store.OrgComboStore') : Ext.data.StoreManager.lookup('orgComboStoreId'),
			systemStore = Ext.data.StoreManager.lookup('systemComboStoreId') == null ? Ext.create('AOC.store.SystemComboStore') : Ext.data.StoreManager.lookup('systemComboStoreId');
		
        return [
	        {
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
	                    xtype:'textfield',
	                    allowBlank: false,
	                    flex:1
	                },
	                items: [{
	                    name: 'customerItemNO',
	                    fieldLabel: AOCLit.customerItemNO,
	                    reference: 'customerItemNO'
	                }, {
	                    name: 'glid',
	                    fieldLabel: AOCLit.glid,
	                    reference: 'glid',
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
	                    labelAlign: Settings.form.topLabelAlign,
	                    flex: 1
	                },
	                items: [{
	                    xtype: 'textfield',
	                    name: 'identifierValue',
	                    fieldLabel: AOCLit.identifierValue,
	                    reference: 'identifierValue',
	                }, {
						xtype:'combo',
						fieldLabel:AOCLit.partnerName,
						name:'partnerName',
						reference:'partnerName',
						store:Ext.data.StoreManager.lookup('localItemPartnerStoreId'),
						allowBlank: false,
						queryMode:'local',
						margin:'0 0 0 10',
						displayField:'partnerName',
						valueField:'id',
						listeners:{
							blur:'onComboBlur',
							select:'onPartnerComboSelect'
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
	                    xtype:'combo',
	                    allowBlank:false,
	                    flex:1
	                },
	                items: [{
						itemId:'RItemId',
						name: 'rboName',
						reference:'rboName',
						fieldLabel:AOCLit.RBO,
						store:Ext.create('Ext.data.JsonStore',{
							fields:['id','rboName','site'],
							data: []
						}),
						disabled:true,
						displayField:'rboName',
						valueField:'rboName',
						queryMode:'local',
						listeners:{
							blur:'onComboBlur'
						}
					},{
						name:'orgCode',
						store:orgStore,
						displayField:'name',
						fieldLabel:AOCLit.orgCode,
						queryMode:'local',
						valueField:'name',
						margin:'0 0 0 10',
						listeners:{
							blur:'onComboBlur'
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
	                    flex:1
	                },
	                items: [{
	                	xtype:'combo',
						fieldLabel:AOCLit.system,
						name:'system',
						reference:'systemCombo',
						displayField:'name',
						valueField:'name',
						queryMode:'local',
						store:systemStore,
						listeners:{
							blur:'onComboBlur'
						}
	                }]
	            }]
	        }
        ];
    }
});
