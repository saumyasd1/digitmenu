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
		me.buttons =me.getButtons();
		me.callParent(arguments);
	},
	buildItems :function(){
		var me = this;
		return [
		    {
		    	xtype:'form',
		        reference:'productlineAdvanceSearchForm',
		        border:false,
		        padding:'10 10 5 10',
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
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'combo',
								fieldLabel:AOCLit.partnerName,
								name:'partnerName',
								reference:'partnerCombo',
								store:Ext.data.StoreManager.lookup('partnerComboStoreId'),
								queryMode:'local',
								tabIndex:4,
								flex:1,
								displayField:'partnerName',
								valueField:'partnerName',
								enableKeyEvents:true,
								listeners:{
									specialkey:'getAdvancedSearchResults',
									blur:'onComboBlur'
								}
							},
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.RBO,
								name:'RBOName',
								flex:1,
								tabIndex:2,
								margin:'0 0 0 10',
								enableKeyEvents:true,
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
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'combo',
								fieldLabel:AOCLit.productLine,
								reference:'productLineTypeCombo',
								name:'productLineType',
								flex:1,
								store:Helper.getProductLineStore()
							},
							{
								xtype : 'combo',
								fieldLabel : AOCLit.partnerDataStructure,
								displayField:'dataStructureName',
								name:'partnerDataStructure',
								valueField:'dataStructureName',
								typeAhead:true,
								reference:'dataStructureCombo',
								queryMode :'local',
								flex:1,
								tabIndex:6,
								enableKeyEvents:true,
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
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype : 'datefield',
								name:'fromDate',
								reference:'fromDate',
								fieldLabel : AOCLit.fromDate,
								flex:1,
								selectOnTab : true
							},
							{
								xtype : 'datefield',
								fieldLabel : AOCLit.toDate,
								name:'toDate',
								reference:'toDate',
								flex:1,
								margin:'0 0 0 10',
								selectOnTab : true
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
				tabIndex:4,
				listeners : {
					click  : 'onSearchBtnClicked'
				}
			}
		]	
	}
});

