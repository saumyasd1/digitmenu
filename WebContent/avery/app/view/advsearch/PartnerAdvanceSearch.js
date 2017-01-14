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
		me.callParent(arguments);
	},
	buildItems :function(){
		var me = this;
		return [
		    {
		    	xtype:'form',
		        reference:'partnerAdvanceSearchForm',
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
						itemId: 'partnernamevalue',
						fieldLabel: AOCLit.partnerName,
						name:'partnerName',
						width:300,
						selectOnTab : true,
						tabIndex:1,
						margin:'5 0 0 0',
						listeners:{
							focus: function () {
								var val=this.getValue().replace(/^\s+|\s+$/g,"");
								if(val == ''){
									this.setValue('');
								}
							}
						}
					},					
					{
						xtype : 'radiogroup',
						itemId: 'partnerdatecriteriavalue',
						fieldLabel : '',
						name: 'datecriteriavalue',
						flex:1,
						margin:'5 0 0 0',
						items:[
							{ boxLabel: 'Creation Date', tabIndex:2, name: 'datecriteriavalue', inputValue: 'createdDate', checked: true },
							{ boxLabel: 'Modified Date', tabIndex:3, name: 'datecriteriavalue', inputValue: 'lastModifiedDate' }
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
								tabIndex:4,
								value:new Date(),
								listeners : {
									render : function(datefield) {
										//datefield.setValue(new Date());
									}
								}
							},
							{
								xtype : 'datefield',
								fieldLabel : AOCLit.toDate,
								name:'toDate',
								reference:'toDate',
								tabIndex:5,
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
				listeners : {
					click  : 'onSearchBtnClicked'
				}
			}
		]	
	}
});
