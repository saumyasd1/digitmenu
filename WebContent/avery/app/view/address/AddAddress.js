Ext.define('AOC.view.address.AddAddress',{
	extend:'AOC.view.base.NewBaseWindow',
	alias:'widget.addaddress',
	itemId:'addAddressItemId',
    controller:'addressMain',
	bodyPadding: 5,
	width: 700,
	height:600,
	scrollable : true,
	layout:{type:'anchor'},
    draggable:false,
    editMode:false,
    rec:null,
    ID:null,
    initComponent : function(){
    	var me=this;
		Ext.apply(this,{
			items:this.buildItem(),
			buttons:this.buildButtons(),
			listeners:{
				'afterrender':function(obj){
					if(me.rec!=null){
						if(me.rec.data!=null){
							var partnerName = me.lookupReference('partnerName');
							partnerName.store.load();
							var siteName = me.lookupReference('siteName');
							var shippingMethod = me.lookupReference('shippingMethod');
							var freightTerms = me.lookupReference('freightTerms');
							var siteId = me.rec.get('siteId');
							var systemId = me.rec.get('system');
							siteName.store.load();
							var systemName = me.lookupReference('systemName');
							var systemStore = systemName.store;
							me.loadSystemStore(systemStore,siteId);
							var orgName = me.lookupReference('orgName');
							orgName.enable();
							systemName.enable();
							shippingMethod.enable();
							freightTerms.enable();
							var orgStore = orgName.store;
							me.loadOrgStore(orgStore,systemId);
							me.down('form').loadRecord(me.rec);
						}else{
							me.down('form').loadRecord(me.rec);
						}
					}
				}
			}
		});
		this.callParent(arguments);
	},
	buildButtons : function(){
		return [
			{
				text : AOCLit.Save,
				handler : 'saveAddressDetails'
			},
			{
				text : AOCLit.Cancel,
				handler : 'closeWindow'
			}
		];
	},
	buildItem:function(){
		var me=this;
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
							labelAlign:Settings.form.topLabelAlign,
							labelWidth:100,
						},
						items:[
							{
								xtype:'combo',
								name: 'siteId',
								fieldLabel:'Site',
								flex:1,
								displayField: 'name',
								reference:'siteName',
								valueField: 'id',
								store:Ext.create('AOC.store.SiteStore'),
								listeners : {
									select : 'onSiteSelect',
									'focus' : 'HideMandatoryMessage'
								}
							},
							{
								xtype:'combobox',
								name: 'system',
								fieldLabel:'System',
								flex:1,
								//queryMode :'local',
								displayField: 'name',
								reference:'systemName',
								disabled:true,
								valueField: 'id',
								margin:'0 0 0 10',
								//  store: 'SiteStore',
								store:Ext.create('AOC.store.SystemStore'),
								listeners : {
									select : 'onSystemSelect',
								//     blur : this.notifyByImage,
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
							labelAlign:Settings.form.topLabelAlign,
							labelWidth:100,
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
								store :'PartnerManagementStore',
								allowBlank: false,
								listeners : {
								//	 blur : this.notifyByImage,
									'focus' : 'HideMandatoryMessage'
								}
							},
							{
								xtype:'combobox',
								name: 'orgCodeId',
								fieldLabel:AOCLit.orgCode,
								displayField: 'name',
								flex:1,
								reference:'orgName',
								valueField: 'id',
								disabled:true,
								margin:'0 0 0 10',
								store:Ext.create('AOC.store.OrgStore'),
								listeners : {
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
							labelAlign:Settings.form.topLabelAlign,
							labelWidth:100,
						},
						items:[
							{
								xtype:'combo',
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
									'focus' : 'HideMandatoryMessage'
								}
							},
							{
								xtype:'combo',
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
							labelAlign:Settings.form.topLabelAlign,
							labelWidth:100,
						},
						items:[
							{
								xtype:'textfield',
								name: 'description',
								flex:1,
								fieldLabel:AOCLit.Description,
								listeners : {
									blur : this.notifyByImage,
									'focus' : 'HideMandatoryMessage'
								}
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
							labelAlign:Settings.form.topLabelAlign,
							labelWidth:100,
						},
						items:[
							{
								xtype:'combobox',
								name: 'siteType',
								fieldLabel:AOCLit.siteType,
								flex:1,
								store :[['B','billToSiteNumber'],['S','shipToSiteNumber']],
								allowBlank: false,
								listeners : {
									blur : this.notifyByImage,
									'focus' : 'HideMandatoryMessage'
								}
							},
							{
								xtype:'textfield',
								name: 'siteNumber',
								margin:'0 0 0 10',
								fieldLabel:AOCLit.siteNumber,
								allowBlank: false,
								flex:1,
								listeners : {
									blur : this.notifyByImage,
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
							labelAlign:Settings.form.topLabelAlign,
							labelWidth:100,
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
							labelAlign:Settings.form.topLabelAlign,
							labelWidth:100,
						},
						items:[
							{
								xtype:'textfield',
								name: 'phone1',
								flex:1,
								fieldLabel:AOCLit.Phone1
								
							},
							{
								xtype:'textfield',
								name: 'phone2',
								margin:'0 0 0 10',
								flex:1,
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
							labelWidth:100,
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
							labelAlign:Settings.form.topLabelAlign,
							labelWidth:100,
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
							labelAlign:Settings.form.topLabelAlign,
							labelWidth:100,
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
							labelAlign:Settings.form.topLabelAlign,
							labelWidth:100,
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
							labelAlign:Settings.form.topLabelAlign,
							labelWidth:100,
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
	},
	loadSystemStore:function(systemStore, value){
		var proxy = new Ext.data.proxy.Rest({
			url: applicationContext+'/rest/system/site/'+ value,
			appendId: true,
			reader      : {
				type          : 'json',
				rootProperty          : 'system',
				totalProperty : 'totalCount'
			},
			autoLoad:true
		});

		systemStore.setProxy(proxy);
		systemStore.load();
	},
	loadOrgStore:function(orgStore, value){
		var proxy = new Ext.data.proxy.Rest({
			url: applicationContext+'/rest/org/system/'+ value,
			appendId: true,
			reader      : {
				type          : 'json',
				rootProperty          : 'org',
				totalProperty : 'totalCount'
			},
			autoLoad:true
		});

		orgStore.setProxy(proxy);
		orgStore.load();
	},
	notifyByImage : function(config){
		if(config.isValid())
			config.setFieldStyle('background-image:url('+ AOC.config.Settings.buttonIcons.successImageSrc+');background-repeat:no-repeat;background-position:right;');
		else
			config.setFieldStyle('background-image:url('+ AOC.config.Settings.buttonIcons.errorIcon+');background-repeat:no-repeat;background-position:right;');
	 }
});
