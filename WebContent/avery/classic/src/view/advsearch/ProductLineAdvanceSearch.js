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
								xtype : 'textfield',
								fieldLabel : AOCLit.partnerName,
								name:'PartnerName',
								flex:1,
								tabIndex:1,
								selectOnTab : true,
								enableKeyEvents:true,
								listeners:{
									specialkey:'getAdvancedSearchResults'
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
								queryMode :'local',
								flex:1,
								tabIndex:6,
								enableKeyEvents:true,
								margin:'0 0 0 10',
								store:Ext.data.StoreManager.lookup('PartnerProductLineStoreStoreId') == null ? Ext.create('AOC.store.PartnerProductLineStore') : Ext.data.StoreManager.lookup('PartnerProductLineStoreStoreId'),
								listeners:{
									specialkey:'getAdvancedSearchResults'
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
								selectOnTab : true,
								tabIndex:2,
								value:new Date(),
								listeners : {
									afterrender : function(datefield) {
										datefield.setValue(Ext.Date.subtract (new Date(),Ext.Date.DAY,7));
									}
								}
							},
							{
								xtype : 'datefield',
								fieldLabel : AOCLit.toDate,
								name:'toDate',
								reference:'toDate',
								tabIndex:3,
								flex:1,
								margin:'0 0 0 10',
								hidden:false,
								allowBlank : true,
								selectOnTab : true,
								listeners : {
									afterrender : function(datefield) {
										datefield.setValue(new Date());
									}
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
				tabIndex:4,
				listeners : {
					click  : 'onSearchBtnClicked'
				}
			}
		]	
	}
});

