Ext.define('AOC.view.advsearch.PartnerAdvanceSearch', {
	extend : 'AOC.view.base.NewBaseWindow',
	alias : 'widget.partneradvancesearchwin',
	
	itemId : 'partnerAdvanceSearch',
	reference:'partnerAdvanceSearch',
	controller : 'partnerMain',
	requires : ['Ext.window.MessageBox'],
	
	layout:'fit',
	width: 330,
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
		        reference:'partnerAdvanceSearchForm',
		        border:false,
		        padding:'10 10 5 10',
				defaults:{
					labelSeparator:'',
					labelStyle:Settings.config.defaultFormLabelStyle,
					labelAlign:Settings.form.topLabelAlign
				},
		        items:[
					{
						xtype : 'textfield',
						itemId: 'partnernamevalue',
						fieldLabel: AOCLit.partnerName,
						name:'partnerName',
						width:300,
						selectOnTab : true,
						tabIndex:1,
						enableKeyEvents:true,
						margin:'5 0 0 0',
						listeners:{
							specialkey:'getAdvancedSearchResults'
						}
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
								enableKeyEvents:true,
								selectOnTab : true,
								tabIndex:2,
								value:new Date(),
								listeners : {
									render : function(datefield) {
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
								tabIndex:3,
								flex:1,
								enableKeyEvents:true,
								margin:'0 0 0 10',
								hidden:false,
								allowBlank : true,
								selectOnTab : true,
								listeners : {
									render : function(datefield) {
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
				disabled : false,
				formBind : true,
				success : true,
				enableKeyEvents:true,
				listeners : {
					click  : 'onSearchBtnClicked'
				}
			}
		]	
	}
});
