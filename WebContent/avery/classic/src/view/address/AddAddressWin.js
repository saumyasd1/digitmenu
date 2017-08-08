Ext.define('AOC.view.address.AddAddressWin',{
	extend:'AOC.view.base.NewBaseWindow',
	alias:'widget.addaddresswin',
	requires:[
	     'AOC.view.address.AddressWinController'
	],
    controller:'addresswincontroller',
	bodyPadding: 10,
	
	width: 800,
	height: 600,
	scrollable: true,
	title:'Add Address',
	
	layout:{
		type:'anchor'
	},
	
    draggable:false,
    mode:'add',
    rec:null,
    listeners:{
		afterrender:'onAddressAfterRender'
	},
    initComponent : function(){
    	var me=this;
		Ext.apply(me,{
			items:me.buildItem()
		});
		me.callParent(arguments);
	},
	buttons:[
		{
			text: AOCLit.Save,
			hidden: AOCRuntime.getUser().role == 3 ? true : false,
			iconCls:'x-fa fa-save',
			handler: 'onSaveBtnClick'
		},
		{
			text: AOCLit.Cancel,
			iconCls:'x-fa fa-times',
			handler: 'closeWindow'
		}
	],
	buildItem:function(){
		return [
			{
				xtype:'form',
				reference:'addressForm',
				anchor:'100%',
				scrollable: true,
				items:[
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						margin : '0 0 5 0',
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							flex:1,
							allowBlank:false
						},
						defaultType:'combobox',
						items:[
							{
								name: 'siteId',
								fieldLabel:'Site',
								displayField: 'name',
								valueField: 'id',
								queryMode :'local',
								reference:'siteName',
								store:Ext.data.StoreManager.lookup('addressSiteStoreId') == null ?  Ext.create('AOC.store.SiteStore',{storeId:'addressSiteStoreId'}) :Ext.data.StoreManager.lookup('addressSiteStoreId'),
								listeners : {
									blur:'onComboBlur',
									select: 'onSiteSelect',
									expand:'onSiteComboExpand'
								}
							},
							{
								name: 'system',
								fieldLabel:'System',
								queryMode :'local',
								displayField: 'name',
								valueField: 'id',
								reference:'systemName',
								disabled:true,
								margin:'0 0 0 10',
								store:Ext.data.StoreManager.lookup('addressSystemStoreId') == null ?  Ext.create('AOC.store.SystemStore',{storeId:'addressSystemStoreId'}) :Ext.data.StoreManager.lookup('addressSystemStoreId'),
								listeners : {
									blur:'onComboBlur',
									select : 'onSystemSelect',
									expand:'onSystemComboExpand'
								}
							}
						]
					},
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						margin : '0 0 5 0',
						flex:1,
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							flex:1,
							allowBlank: false
						},
						defaultType:'combobox',
						items:[
							{
								name: 'partnerId',
								fieldLabel:AOCLit.partnerName,
								displayField:'partnerName',
								valueField:'id',
								reference:'partnerName',
								queryMode:'local',
								store:Ext.data.StoreManager.lookup('localItemPartnerStoreId'),
								listeners : {
									blur:'onComboBlur'
									//afterrender:'onAfterRenderPartnerCombo'
//									expand:'onPartnerComboExpand'
								}
							},
							{
								name: 'orgCodeId',
								fieldLabel:AOCLit.orgCode,
								displayField: 'name',
								reference:'orgName',
								valueField: 'id',
								disabled:true,
								margin:'0 0 0 10',
								queryMode:'local',
								store: Ext.data.StoreManager.lookup('addressOrgStoreId') != null ? Ext.data.StoreManager.lookup('addressOrgStoreId') : Ext.create('AOC.store.OrgStore',{storeId:'addressOrgStoreId'}),
								listeners : {
									blur:'onComboBlur',
									select:'onOrgSelect',
									expand:'onOrgComboExpand'
								}
							}
						]
					},
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						margin : '0 0 5 0',
						flex:1,
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							xtype:'combobox',
							flex:1
						},
						items:[
							{
								xtype:'combobox',
								name: 'shippingMethod',
								fieldLabel:AOCLit.shippingMethod,
								queryMode :'local',
								displayField: 'name',
								valueField: 'name',
								reference: 'shippingMethod',
								disabled:true,
								store:Ext.data.StoreManager.lookup('ShippingMethodId1') != null ? Ext.data.StoreManager.lookup('ShippingMethodId1') : Helper.getAllVariableComboStore('ShippingMethod', true),
								listeners : {
									blur:'onComboBlur',
									expand:'onShippingMethodComboExpand'
								}
							},
							{
								name: 'freightTerms',
								reference:'freightTerms',
								fieldLabel:'Freight Terms',
								queryMode :'local',
								displayField: 'name',
								valueField: 'name',
								margin:'0 0 0 10',
								disabled:true,
								store:Ext.data.StoreManager.lookup('FreightTermsId1') != null ? Ext.data.StoreManager.lookup('FreightTermsId1') : Helper.getAllVariableComboStore('FreightTerms', true),
								listeners : {
									blur:'onComboBlur',
									expand:'onFreightTermComboExpand'
								}
							}
						]
					},
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						margin : '0 0 5 0',
						flex:1,
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							xtype:'textfield',
							flex:1
						},
						items:[
							{
								name: 'description',
								fieldLabel:AOCLit.Description
							},
							{
								name: 'shippingInstructions',
								margin:'0 0 0 10',
								fieldLabel:AOCLit.shippingInstructions
							}
						]
					},
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						margin : '0 0 5 0',
						flex:1,
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							flex:1,
							allowBlank: false
						},
						items:[
							{
								xtype:'combobox',
								name: 'siteType',
								displayField: 'siteType',
								fieldLabel:AOCLit.siteType,
								store :[['B','Bill To Site Number'],['S','Ship To Site Number']],
								listeners : {
									blur:'onComboBlur'
								}
							},
							{
								xtype:'textfield',
								name: 'siteNumber',
								margin:'0 0 0 10',
								regex: /[a-zA-Z0-9]+/,
								fieldLabel:AOCLit.siteNumber
							}
						]
					},
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						margin : '0 0 5 0',
						flex:1,
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							xtype:'textfield',
							flex:1
						},
						items:[
							{
								name: 'contact',
								fieldLabel:AOCLit.Contact
							},
							{
								name: 'fax',
								margin:'0 0 0 10',
								fieldLabel:AOCLit.fax
							}
						]
					},
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						margin : '0 0 5 0',
						flex:1,
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							xtype:'numberfield',
							hideTrigger:true,
							keyNavEnabled:false,
							mouseWheelEnabled:false,
							allowDecimals:false,
							flex:1
						},
						items:[
							{
								name: 'phone1',
								regex: /^(\d+-?)+\d+$/,
								fieldLabel:AOCLit.Phone1
								
							},
							{
								name: 'phone2',
								margin:'0 0 0 10',
								regex: /^(\d+-?)+\d+$/,
								fieldLabel:AOCLit.phone2
							}
						]
					},
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						margin : '0 0 5 0',
						flex:1,
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							xtype:'textfield',
							flex:1
						},
						items:[
							{
								name: 'address1',
								fieldLabel:AOCLit.address1
							},
							{
								name: 'address2',
								margin:'0 0 0 10',
								fieldLabel:AOCLit.address2
							}
						]
					},
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						margin : '0 0 5 0',
						flex:1,
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							xtype:'textfield',
							flex:1
						},
						items:[
							{
								name: 'address3',
								fieldLabel:AOCLit.address3
							},
							{
								name: 'address4',
								margin:'0 0 0 10',
								fieldLabel:AOCLit.address4
							}
						]
					},
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						margin : '0 0 5 0',
						flex:1,
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							xtype:'textfield',
							flex:1
						},
						items:[
							{
								name: 'city',
								fieldLabel:AOCLit.City
							},
							{
								name: 'state',
								margin:'0 0 0 10',
								fieldLabel:AOCLit.state
							}
						]
					},
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						margin : '0 0 5 0',
						flex:1,
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							xtype:'textfield',
							flex:1
						},
						items:[
							{
								name: 'country',
								fieldLabel:AOCLit.Country
							},
							{
								name: 'zip',
								margin:'0 0 0 10',
								fieldLabel:AOCLit.Zip
							}
						]
					},
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						margin : '0 0 5 0',
						flex:1,
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							flex:1
						},
						items:[
							{
								xtype:'textfield',
								name: 'email',
								vtype:'email',
								fieldLabel:AOCLit.Email
							},
							{
								xtype:'box',
								margin:'0 0 0 10'
							}
						]
					}
				]
			}
		];
	},
	onDestroy:function(){
		this.contextGrid.store.load();
		this.callParent(arguments);
	}
});
