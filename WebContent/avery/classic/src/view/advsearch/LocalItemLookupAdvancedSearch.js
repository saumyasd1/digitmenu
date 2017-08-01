Ext.define('AOC.view.advsearch.LocalItemLookupAdvancedSearch', {
	extend : 'AOC.view.base.NewBaseWindow',
	alias : 'widget.localitemlookupadvancesearch',
	itemId : 'localItemLookupAdvanceSearchWin',
	reference:'localItemLookupAdvanceSearchWin',
	controller : 'localitemlookupcontroller',
	requires : ['Ext.window.MessageBox'],
	draggable:false,
	layout:'fit',
	width: 580,
	title:AOCLit.advancedSearchWindowTitle,
	initComponent:function(){
		var me = this;
		me.items = me.buildItems();
		me.buttons = me.getButtons();
		me.callParent(arguments);
	},
	buildItems :function(){
		var me = this,
			userInfo = AOCRuntime.getUser(),
			currentRecSiteId = userInfo.siteId,
			rboStore = Ext.data.StoreManager.lookup('rboId') == null ? Ext.create('AOC.store.RBOStore') : Ext.data.StoreManager.lookup('rboId'),
			orgStore = Ext.data.StoreManager.lookup('orgComboId') == null ? Ext.create('AOC.store.OrgComboStore') : Ext.data.StoreManager.lookup('orgComboId'),
			systemStore = Ext.data.StoreManager.lookup('systemId') == null ? Ext.create('AOC.store.SystemComboStore') : Ext.data.StoreManager.lookup('systemId'),
			scOrgCodeStore = [['PYT','PYT'],['PYL','PYL'],['POHKT','POHKT'],['POHKL','POHKL'],['ADNS','ADNS'],['ADNL','ADNL'],['ADHK','ADHK']],
			vtOrgCodeStore =[['VN','VN'],['PXVN','PXVN']],
			szOrgCodeStore = [['SZ','SZ'],['PXSH','PXSH']],
			scSZSystemStore =['Oracle','VIPS'],
        	vtSystemStore = ['Sparrow','VIPS'];
			
		rboStore.load();
		orgStore.load();
		systemStore.load();
		
		return [
		    {
		    	xtype:'form',
		        reference:'localItemLookupAdvanceSearchForm',
		        padding:'10 10 5 10',
		        border:false,
				defaults:{
					labelSeparator:'',
					labelStyle:Settings.config.defaultFormLabelStyle,
					labelAlign:Settings.form.topLabelAlign
				},
		        items:[
					{
						xtype: 'fieldcontainer',
						layout: 'hbox',
						margin : '5 0 0 0',
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.customerItemNO,
								name:'customerItemNO',
								flex:1,
								enableKeyEvents:true,
								selectOnTab : true,
								tabIndex:1,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.glid,
								name:'glid',
								flex:1,
								enableKeyEvents:true,
								margin:'0 0 0 10',
								tabIndex:2,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							}
						]
					},				
					{
						xtype: 'fieldcontainer',
						layout: 'hbox',
						margin : '5 0 0 0',
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.identifierValue,
								name:'identifierValue',
								flex:1,
								enableKeyEvents:true,
								tabIndex:3,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},{
								xtype:'combo',
								fieldLabel:AOCLit.partnerName,
								name:'partnerName',
								reference:'partnerCombo',
								store:Ext.data.StoreManager.lookup('PartnerManagementStoreId')== null ? Ext.create('AOC.store.PartnerManagementStore') : Ext.data.StoreManager.lookup('PartnerManagementStoreId'),
								queryMode:'local',
								tabIndex:4,
								flex:1,
								displayField:'partnerName',
								valueField:'partnerName',
								margin:'0 0 0 10',
								enableKeyEvents:true,
								listeners:{
									specialkey:'getAdvancedSearchResults',
									blur:'onComboBlur'
								}
							}
						]
					},
					{ 
						xtype: 'fieldcontainer',
						layout: 'hbox',
						margin : '5 0 0 0',
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
						       {
								xtype:'combo',
								name: 'rboName',
								fieldLabel:AOCLit.RBO,
								store:rboStore,
								displayField:'rboName',
								flex:1,
								valueField:'rboName',
								queryMode:'local',
								tabIndex:5,
								enableKeyEvents:true,
								listeners:{
									specialkey:'getAdvancedSearchResults',
									blur:'onComboBlur'
								}
						       },
						       {
								xtype:'combo',
								name:'orgCode',
								store:currentRecSiteId == null ?  orgStore: ((currentRecSiteId == 2) ? scOrgCodeStore : ((currentRecSiteId == 3)? szOrgCodeStore : vtOrgCodeStore )),
								displayField:'name',
								fieldLabel:AOCLit.orgCode,
								queryMode:'local',
								valueField:'name',
								flex:1,
								tabIndex:6,
								margin:'0 0 0 10',
								enableKeyEvents:true,
								listeners:{
									specialkey:'getAdvancedSearchResults',
									blur:'onComboBlur'
								}
						       }
						]
					},
					{
						xtype: 'fieldcontainer',
						layout: 'hbox',
						margin : '5 0 10 0',
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'combo',
								fieldLabel:AOCLit.system,
								name:'system',
								reference:'systemCombo',
								displayField:'name',
								valueField:'name',
								tabIndex:7,
								flex:1,
								enableKeyEvents:true,
								queryMode:'local',
								store: currentRecSiteId == null ?  systemStore: ((currentRecSiteId == 4) ? vtSystemStore : scSZSystemStore ),
								listeners:{
									specialkey:'getAdvancedSearchResults',
									blur:'onComboBlur'
								}
							}
						]
					},{
						xtype: 'fieldcontainer',
						layout: 'hbox',
						margin : '5 0 10 0',
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype : 'datefield',
								name:'fromDate',
								reference:'fromDate',
								fieldLabel : AOCLit.fromDate,
								flex:1,
								hidden:false,
								allowBlank : true,
								selectOnTab : true,
								tabIndex:10,
								enableKeyEvents:true,
								value:new Date(),
								listeners : {
									afterrender : function(datefield) {
										datefield.setValue(Ext.Date.subtract (new Date(),Ext.Date.DAY,7));
									},
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
								xtype : 'datefield',
								fieldLabel : AOCLit.toDate,
								name:'toDate',
								reference:'toDate',
								flex:1,
								margin:'0 0 0 10',
								hidden:false,
								enableKeyEvents:true,
								allowBlank : true,
								selectOnTab : true,
								tabIndex:11,
								listeners : {
									afterrender : function(datefield) {
										datefield.setValue(new Date());
									},
									specialkey:'getAdvancedSearchResults'
								}
							}
						]
					}
		        ]
		    }
		]
	},
	getButtons :function(){
		return [ 
			{
				text : 'Search',
				iconCls:'x-fa fa-search',
				disabled : false,
				formBind : true,
				success : true,
				enableKeyEvents:true,
				listeners : {
					click  : 'onSearchBtnClicked',
					specialkey:'getAdvancedSearchResults'
				}
			}
		]	
	}
});
