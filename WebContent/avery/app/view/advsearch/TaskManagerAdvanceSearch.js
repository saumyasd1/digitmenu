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
		me.buttons=me.getButtons();
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
								fieldLabel : AOCLit.TrackingNo,
								name:'id',
								flex:1,
								tabIndex:1,
								enableKeyEvents:true,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.Subject,
								name:'Subject',
								flex:1,
								margin:'0 0 0 10',
								tabIndex:2,
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
								fieldLabel : AOCLit.senderEmailID,
								name:'SenderEmailID',
								flex:1,
								tabIndex:3,
								enableKeyEvents:true,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.receiverEmailID,
								name:'ReceiverEmailID',
								flex:1,
								tabIndex:4,
								margin:'0 0 0 10',
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
								fieldLabel : AOCLit.ccMailId,
								name:'ccMailId',
								flex:1,
								tabIndex:5,
								enableKeyEvents:true,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},{
								xtype:'combo',
								displayField:'csrName',
								fieldLabel:'CSR',
								reference:'csrCombo',
								name:'assignCSR',
								valueField:'id',
								queryMode:'local',
								store:Ext.create('AOC.store.AssignCSRStore'),
								typeAhead:true,
								triggerAction:'all',
								width:275,
								margin:'0 0 0 10',
								enableKeyEvents:true,
								tabIndex:6,
								listeners:{
									blur:function(combo,e){
										Helper.clearCSRCombo(combo,e);
									},
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
								hidden:false,
								allowBlank : true,
								selectOnTab : true,
								value:new Date(),
								tabIndex:7,
								enableKeyEvents:true,
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
								flex:1,
								margin:'0 0 0 10',
								hidden:false,
								allowBlank : true,
								selectOnTab : true,
								enableKeyEvents:true,
								tabIndex:8,
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
	getButtons:function(){ 
		return [ 
			{
				text : 'Search',
				disabled : false,
				formBind : true,
				success : true,
				tabIndex:9,
				enableKeyEvents:true,
				listeners : {
					click  : 'onSearchBtnClicked',
					specialkey:'getAdvancedSearchResults'
				}
			}
		]	
	}
});