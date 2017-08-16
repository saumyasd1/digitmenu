Ext.define('AOC.view.advsearch.ProductLineAdvanceSearch', {
	extend : 'AOC.view.base.NewBaseWindow',
	alias : 'widget.productlineadvancesearchwin',
	
	itemId : 'productlineAdvanceSearch',
	reference:'productlineAdvanceSearch',
	controller : 'productlineMain',
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
		return [
		    {
		    	xtype:'form',
		        reference:'productlineAdvanceSearchForm',
		        border:false,
		        padding:'10',
				defaults:{
					labelSeparator:'',
					labelStyle:Settings.config.defaultFormLabelStyle,
					labelAlign:Settings.form.topLabelAlign
				},
		        items:[{
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
								xtype:'combo',
								fieldLabel:AOCLit.partnerName,
								name:'partnerName',
								reference:'partnerCombo',
								store:Ext.data.StoreManager.lookup('partnerComboStoreId'),
								queryMode:'local',
								tabIndex:1,
								displayField:'partnerName',
								valueField:'partnerName',
								listeners:{
									specialkey:'getAdvancedSearchResults',
									blur:'onComboBlur'
								}
							},
							{
								xtype:'textfield',
								fieldLabel: AOCLit.RBO,
								name:'RBOName',
								tabIndex:2,
								margin:'0 0 0 10',
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							}
						]
					},{
						xtype: 'fieldcontainer',
						layout: 'hbox',
						margin : '5 0 0 0',
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							flex:1,
							enableKeyEvents:true,
							xtype:'combo'
						},
						items:[
							{
								fieldLabel:AOCLit.productLine,
								tabIndex:3,
								reference:'productLineTypeCombo',
								name:'productLineType',
								store:Helper.getProductLineStore()
							},
							{
								fieldLabel : AOCLit.partnerDataStructure,
								displayField:'dataStructureName',
								name:'partnerDataStructure',
								valueField:'dataStructureName',
								typeAhead:true,
								reference:'dataStructureCombo',
								queryMode :'local',
								tabIndex:4,
								margin:'0 0 0 10',
								store:Ext.data.StoreManager.lookup('productLineStoreId') == null ? Ext.create('AOC.store.PartnerProductLineStore',{storeId:'productLineStoreId'}) : Ext.data.StoreManager.lookup('productLineStoreId'),
								listeners:{
									specialkey:'getAdvancedSearchResults',
									expand:Helper.onPartnerDSComboExpand,
									afterrender:Helper.onParterDSComboAfterRender
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
								margin:'0 0 0 10',
							}
						]
					}  
		        ]
		    }
		]
	},
	buttons :[ 
		{
			text : 'Search',
			iconCls:'x-fa fa-search',
			disabled : false,
			formBind : true,
			success : true,
			tabIndex:4,
			listeners : {
				click  : 'onSearchBtnClicked'
			}
		}
	]	
});

