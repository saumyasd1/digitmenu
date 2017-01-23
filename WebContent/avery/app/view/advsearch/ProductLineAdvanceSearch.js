Ext.define('AOC.view.advsearch.ProductLineAdvanceSearch', {
	extend : 'AOC.view.base.NewBaseWindow',
	alias : 'widget.productlineadvancesearchwin',
	
	itemId : 'productlineAdvanceSearch',
	reference:'productlineAdvanceSearch',
	controller : 'productlineMain',
	requires : ['Ext.window.MessageBox'],
	
	layout:'fit',
	width: 330,
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
		        reference:'productlineAdvanceSearchForm',
		        border:false,
		        buttonAlign:'right',
		        buttons:me.getButtons(),
		        padding:'10 10 5 10',
				defaults:{
					labelSeparator:'',
					labelStyle:Settings.config.defaultFormLabelStyle,
					labelAlign:Settings.form.topLabelAlign
				},
		        items:[
					{
						xtype : 'textfield',
						itemId: 'productlinevalue',
						fieldLabel : AOCLit.productLineType,
						name:'productLineType',
						width:300,
						labelSeparator : '',
						labelAlign : 'top',
						allowBlank : true,
						selectOnTab : true,
						tabIndex:1,
						margin:'5 0 0 0',
						listeners:{
							focus: function () {
								var val=this.getValue().replace(/^\s+|\s+$/g,"");
								if(val=="")
									this.setValue('');
							}
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
								selectOnTab : true,
								tabIndex:2,
								value:new Date(),
								listeners : {
									render : function(datefield) {
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
									render : function(datefield) {
										datefield.setValue(new Date());
									},
									'focus': 'notifyByMessage'
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
				tabIndex:4,
				listeners : {
					click  : 'onSearchBtnClicked'
				}
			}
		]	
	}
});

