Ext.define('AOC.view.advsearch.AddressAdvanceSearch', {
	extend : 'AOC.view.base.NewBaseWindow',
	alias : 'widget.addressadvancesearchwin',
	controller : 'addresscontroller',
	requires : ['Ext.window.MessageBox'],
	
	layout:'fit',
	width: 580,
	title:AOCLit.advancedSearchWindowTitle,
	initComponent:function(){
		var me = this;
		me.items = me.buildItems();
		me.callParent(arguments);
	},
	buildItems :function(){
		var me = this;
		return [
		    {
		    	xtype:'form',
		        reference:'addressAdvanceSearchForm',
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
							enableKeyEvents:true
						},
						items:[
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.address,
								name:'address',
								tabIndex:1,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
								xtype:'combo',
								fieldLabel:AOCLit.partnerName,
								tabIndex:2,
								name:'partnerName',
								reference:'partnerCombo',
								store:Ext.data.StoreManager.lookup('partnerComboStoreId'),
								queryMode:'local',
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
							enableKeyEvents:true
						},
						items:[
							{
								xtype:'combobox',
								name: 'siteType',
								tabIndex:3,
								displayField: 'siteType',
								fieldLabel:AOCLit.siteType,
								store :[['B','Bill To Site Number'],['S','Ship To Site Number']],
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.siteNumber,
								name:'siteNumber',
								margin:'0 0 0 10',
								tabIndex:4,
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
								xtype:'combo',
								name: 'siteId',
								fieldLabel:'Site',
								flex:1,
							 	editable:false,
								displayField:'name',
								queryMode :'local',
								reference:'siteCombo',
								valueField: 'id',
								store:Ext.data.StoreManager.lookup('advSiteStoreId') != null ? Ext.data.StoreManager.lookup('advSiteStoreId') : Ext.create('AOC.store.SiteStore',{storeId:'advSiteStoreId'}),
								listeners : {
									afterrender:Helper.siteNameForSuperAdminOnly,
									select:function(field){
										if(field.getValue() == 'None'){
											field.setValue('');
										}
									}
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
							labelAlign:Settings.form.topLabelAlign,
							flex:1,
							enableKeyEvents:true,
							xtype:'datefield',
							selectOnTab:true
						},
						items:[
							{
								name:'fromDate',
								reference:'fromDate',
								fieldLabel : AOCLit.fromDate
							},
							{
								fieldLabel : AOCLit.toDate,
								name:'toDate',
								reference:'toDate',
								margin:'0 0 0 10'
							}
						]
					}  
		        ]
		    }
		];
	},
	buttons : [ 
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
