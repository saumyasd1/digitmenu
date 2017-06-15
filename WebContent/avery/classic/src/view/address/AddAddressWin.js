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
	
	layout:{
		type:'anchor'
	},
	
    draggable:false,
    editMode:false,
    
    rec:null,
    detail:null,
    ID:null,
    listeners:{
		afterrender:'onAddressAfterRender'
	},
    initComponent : function(){
    	var me=this;
		Ext.apply(me,{
			items:me.buildItem(),
			buttons:me.buildButtons()
			
		});
		me.callParent(arguments);
	},
	buildButtons : function(){
		var roleId = AOCRuntime.getUser().role;
		return [
			{
				text: AOCLit.Save,
				hidden: roleId == 3 ? true : false,
				handler: 'onSaveBtnClick'
			},
			{
				text: AOCLit.Cancel,
				handler: 'closeWindow'
			}
		];
	},
	buildItem:function(){
		return [
			{
				xtype:'displayfield',
				itemId:'messageFieldItemId',
				hidden:true
			},
			{
				xtype:'form',
				itemId:'listPanel',
				border:false,
				reference:'addressForm',
				anchor:'100%',
				scrollable : true,
				items:[
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						margin : '0 0 5 0',
						//flex:1,
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'combobox',
								name: 'siteId',
								fieldLabel:'Site',
								allowBlank: false,
								flex:1,
								displayField: 'name',
								queryMode :'local',
								reference:'siteName',
								valueField: 'id',
								store:Ext.create('AOC.store.SiteStore'),
								listeners : {
									blur:function(combo,e){
										Helper.clearCombo(combo,e);
									},
									select : 'onSiteSelect',
									'afterrender':'onAfterRenderSiteCombo'
								}
							},
							{
								xtype:'combobox',
								name: 'system',
								fieldLabel:'System',
								allowBlank: false,
								flex:1,
								queryMode :'local',
								displayField: 'name',
								reference:'systemName',
								disabled:true,
								valueField: 'id',
								margin:'0 0 0 10',
								store:Ext.create('AOC.store.SystemStore'),
								listeners : {
									blur:function(combo,e){
										Helper.clearCombo(combo,e);
									},
									select : 'onSystemSelect'
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
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'combobox',
								name: 'partnerId',
								flex:1,
								fieldLabel:AOCLit.partnerName,
								displayField:'partnerName',
								valueField:'id',
								reference:'partnerName',
								store : Ext.data.StoreManager.lookup('partnerStoreId') != null ? Ext.data.StoreManager.lookup('partnerStoreId') : Ext.create('AOC.store.PartnerManagementStore',{storeId:'partnerStoreId'}),
								allowBlank: false,
								listeners : {
									blur:function(combo,e){
										Helper.clearCombo(combo,e);
									},
									afterrender:'onAfterRenderPartnerCombo'
								}
							},
							{
								xtype:'combobox',
								name: 'orgCodeId',
								fieldLabel:AOCLit.orgCode,
								displayField: 'name',
								flex:1,
								reference:'orgName',
								allowBlank: false,
								valueField: 'id',
								disabled:true,
								margin:'0 0 0 10',
								store:Ext.create('AOC.store.OrgStore'),
								listeners : {
									blur:function(combo,e){
										Helper.clearCombo(combo,e);
									},
									select : 'onOrgSelect',
									'focus' : 'HideMandatoryMessage'
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
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'combobox',
								name: 'shippingMethod',
								fieldLabel:AOCLit.shippingMethod,
								queryMode :'local',
								flex:1,
								displayField: 'variableFieldName',
								reference: 'shippingMethod',
								valueField: 'variableFieldName',
								disabled:true,
								store: new Ext.data.JsonStore({
									data:[],
									fields:['variableFieldName']
								}),
								listeners : {
									blur:function(combo,e){
										Helper.clearCombo(combo,e);
									},
									'focus' : 'HideMandatoryMessage'
								}
							},
							{
								xtype:'combobox',
								name: 'freightTerms',
								fieldLabel:'Freight Terms',
								flex:1,
								queryMode :'local',
								displayField: 'variableFieldName',
								reference:'freightTerms',
								valueField: 'variableFieldName',
								margin:'0 0 0 10',
								disabled:true,
								store: Ext.data.StoreManager.lookup('FreightTermsId') == null ? AOC.util.Helper.getVariableComboStore('FreightTerms') : Ext.data.StoreManager.lookup('FreightTermsId'),
								listeners : {
									blur:function(combo,e){
										Helper.clearCombo(combo,e);
									},
									'focus' : 'HideMandatoryMessage'
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
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'textfield',
								name: 'description',
								flex:1,
								fieldLabel:AOCLit.Description
							},
							{
								xtype:'textfield',
								name: 'shippingInstructions',
								margin:'0 0 0 10',
								flex:1,	
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
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'combobox',
								name: 'siteType',
								displayField: 'siteType',
								fieldLabel:AOCLit.siteType,
								flex:1,
								store :[['B','Bill To Site Number'],['S','Ship To Site Number']],
								allowBlank: false,
								listeners : {
									blur:function(combo,e){
										Helper.clearCombo(combo,e);
									},
								'focus': 'HideMandatoryMessage'
								}
							},
							{
								xtype:'textfield',
								name: 'siteNumber',
								margin:'0 0 0 10',
								regex: /[a-zA-Z0-9]+/,
								fieldLabel:AOCLit.siteNumber,
								allowBlank: false,
								flex:1
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
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'textfield',
								name: 'contact',
								flex:1,
								fieldLabel:AOCLit.Contact
							},
							{
								xtype:'textfield',
								name: 'fax',
								margin:'0 0 0 10',
								flex:1,
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
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'textfield',
								name: 'phone1',
								flex:1,
								regex: /^(\d+-?)+\d+$/,
								fieldLabel:AOCLit.Phone1
								
							},
							{
								xtype:'textfield',
								name: 'phone2',
								margin:'0 0 0 10',
								flex:1,
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
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'textfield',
								name: 'address1',
								flex:1,
								fieldLabel:AOCLit.address1
							},
							{
								xtype:'textfield',
								name: 'address2',
								margin:'0 0 0 10',
								flex:1,
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
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'textfield',
								name: 'address3',
								flex:1,
								fieldLabel:AOCLit.address3
							},
							{
								xtype:'textfield',
								name: 'address4',
								margin:'0 0 0 10',
								flex:1,
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
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'textfield',
								name: 'city',
								flex:1,
								fieldLabel:AOCLit.City
							},
							{
								xtype:'textfield',
								name: 'state',
								margin:'0 0 0 10',
								flex:1,
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
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'textfield',
								name: 'country',
								flex:1,
								fieldLabel:AOCLit.Country
							},
							{
								xtype:'textfield',
								name: 'zip',
								margin:'0 0 0 10',
								flex:1,
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
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'textfield',
								name: 'email',
								flex:1,
								fieldLabel:AOCLit.Email
							},
							{
								xtype:'box',
								margin:'0 0 0 10',
								flex:1
							}
						]
					}
				]
			}
		];
	}
});
