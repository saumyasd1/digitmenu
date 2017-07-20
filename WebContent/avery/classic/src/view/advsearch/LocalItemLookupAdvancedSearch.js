Ext.define('AOC.view.advsearch.LocalItemLookupAdvancedSearch', {
	extend : 'AOC.view.base.NewBaseWindow',
	alias : 'widget.localitemlookupadvancesearch',
	itemId : 'localItemLookupAdvanceSearchWin',
	reference:'localItemLookupAdvanceSearchWin',
	controller : 'localitemlookupcontroller',
	requires : ['Ext.window.MessageBox'],
	
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
		var me = this;
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
							},
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.partnerName,
								name:'partnerName',
								flex:1,
								margin:'0 0 0 10',
								tabIndex:4,
								enableKeyEvents:true,
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
								fieldLabel : AOCLit.RBOName,
								name:'rboName',
								flex:1,
								tabIndex:5,
								enableKeyEvents:true,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},{
								xtype : 'textfield',
								fieldLabel : AOCLit.orgCode,
								name:'orgCode',
								flex:1,
								margin:'0 0 0 10',
								tabIndex:6,
								enableKeyEvents:true,
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
								xtype : 'textfield',
								fieldLabel : AOCLit.system,
								name:'system',
								flex:1,
								tabIndex:6,
								enableKeyEvents:true,
								listeners:{
									specialkey:'getAdvancedSearchResults'
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
