Ext.define('AOC.view.advsearch.TaskManagerAdvanceSearch', {
	extend : 'AOC.view.base.NewBaseWindow',
	alias : 'widget.taskmanageradvancesearchwin',
	itemId : 'taskmanagerAdvanceSearchWin',
	
	reference:'taskmanagerAdvanceSearchWin',
	controller : 'taskManagerController',
	requires : ['Ext.window.MessageBox'],

	layout:'fit',
	title:AOCLit.advancedSearchWindowTitle,
	width: 580,
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
		        reference:'taskManagerAdvanceSearchForm',
		        border:false,
		        padding:'10 10 5 10',
		        buttonAlign : 'right',
		        buttons:me.getButtons(),
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
								fieldLabel : 'Email Tracking #',
								name:'id',
								flex:1,
								tabIndex:1
							},
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.Subject,
								name:'Subject',
								flex:1,
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
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype : 'textfield',
								fieldLabel : 'From',
								name:'senderEmailId',
								flex:1,
								tabIndex:3
							},
							{
								xtype:'combo',
								displayField:'firstName',
								fieldLabel:'CSR',
								reference:'csrCombo',
								name:'assignCSR',
								valueField:'id',
								queryMode:'local',
								store:Ext.create('AOC.store.AssignCSRStore'),
								typeAhead:true,
								triggerAction:'all',
								flex:1,
								tabIndex:4,
								margin:'0 0 0 10'
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
								hidden:false,
								allowBlank : true,
								selectOnTab : true,
								value:new Date(),
								tabIndex:5,
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
								flex:1,
								margin:'0 0 0 10',
								hidden:false,
								allowBlank : true,
								selectOnTab : true,
								tabIndex:6,
								listeners : {
									render : function(datefield) {
										datefield.setValue(new Date());
									}
									//'focus': 'notifyByMessage'
								}
							}
						]
					}  
		        ]
		    }
		]
	},
	getButtons:function(){ 
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