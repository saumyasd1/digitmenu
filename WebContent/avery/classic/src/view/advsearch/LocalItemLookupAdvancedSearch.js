Ext.define('AOC.view.advsearch.LocalItemLookupAdvancedSearch', {
	extend : 'AOC.view.base.NewBaseWindow',
	alias : 'widget.localitemlookupadvancesearch',
	controller : 'localitemlookupcontroller',
	draggable:false,
	layout:'fit',
	width: 580,
	title:AOCLit.advancedSearchWindowTitle,
	initComponent:function(){
		var me = this;
		me.items = me.buildItems();
		me.callParent(arguments);
	},
	buildItems :function(){
		var me = this,
			userInfo = AOCRuntime.getUser(),
			currentRecSiteId = userInfo.siteId,
			rboStore = Ext.data.StoreManager.lookup('rboId') == null ? Ext.create('AOC.store.RBOStore') : Ext.data.StoreManager.lookup('rboId'),
			orgStore = Ext.data.StoreManager.lookup('orgComboStoreId') == null ? Ext.create('AOC.store.OrgComboStore') : Ext.data.StoreManager.lookup('orgComboStoreId'),
			systemStore = Ext.data.StoreManager.lookup('systemComboStoreId') == null ? Ext.create('AOC.store.SystemComboStore') : Ext.data.StoreManager.lookup('systemComboStoreId');
			
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
							labelAlign:Settings.form.topLabelAlign,
							flex:1,
							enableKeyEvents:true,
							xtype:'textfield',
							listeners:{
								specialkey:'getAdvancedSearchResults'
							}
						},
						items:[
							{
								fieldLabel : AOCLit.customerItemNO,
								name:'customerItemNO',
								tabIndex:1
							},
							{
								fieldLabel : AOCLit.glid,
								name:'glid',
								margin:'0 0 0 10',
								tabIndex:2
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
							labelAlign:Settings.form.topLabelAlign,
							flex:1
						},
						items:[
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.identifierValue,
								name:'identifierValue',
								tabIndex:3,
								enableKeyEvents:true,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},{
								xtype:'combo',
								fieldLabel:AOCLit.partnerName,
								name:'partnerName',
								reference:'partnerCombo',
								store:Ext.data.StoreManager.lookup('partnerComboStoreId'),
								queryMode:'local',
								tabIndex:4,
								editable:false,
								displayField:'partnerName',
								valueField:'partnerName',
								margin:'0 0 0 10',
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
							labelAlign:Settings.form.topLabelAlign,
							flex:1,
							xtype:'combo'
						},
						items:[
					       {
								name: 'rboName',
								fieldLabel:AOCLit.RBO,
								store:rboStore,
								displayField:'rboName',
								editable:false,
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
								name:'orgCode',
								store:orgStore,
								displayField:'name',
								fieldLabel:AOCLit.orgCode,
								queryMode:'local',
								valueField:'name',
								editable:false,
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
								name:'systemName',
								reference:'systemCombo',
								displayField:'name',
								valueField:'name',
								tabIndex:7,
								editable:false,
								flex:1,
								enableKeyEvents:true,
								queryMode:'local',
								store: systemStore,
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
							labelAlign:Settings.form.topLabelAlign,
							flex:1,
							selectOnTab: true
						},
						defaultType:'datefield',
						items:[
							{
								name:'fromDate',
								reference:'fromDate',
								fieldLabel : AOCLit.fromDate,
								enableKeyEvents:true
							},
							{
								fieldLabel : AOCLit.toDate,
								name:'toDate',
								reference:'toDate',
								margin:'0 0 0 10',
								enableKeyEvents:true
							}
						]
					}
		        ]
		    }
		]
	},
	buttons:[ 
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
});
