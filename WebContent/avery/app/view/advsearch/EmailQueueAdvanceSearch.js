Ext.define('AOC.view.advsearch.EmailQueueAdvanceSearch', {
	extend : 'AOC.view.base.NewBaseWindow',
	alias : 'widget.emailqueueadvancesearchwin',
	itemId : 'emailQueueAdvanceSearchWin',
	
	reference:'emailQueueAdvanceSearchWin',
	controller : 'emailManagementController',
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
		        reference:'emailQueueAdvanceSearchForm',
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
								fieldLabel : AOCLit.partnerName,
								name:'PartnerName',
								flex:1,
								selectOnTab : true
							},
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.RBO,
								name:'RBOName',
								flex:1,
								margin:'0 0 0 10'
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
								fieldLabel : AOCLit.Subject,
								name:'Subject',
								flex:1,
							},
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.emailBody,
								name:'EmailBody',
								flex:1,
								margin:'0 0 0 10'
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
								xtype : 'combo',
								fieldLabel : AOCLit.emailStatus,
								name:'Status',
								flex:1,
								displayField:'value',
								valueField:'code',
								queryMode :'local',
								store: Ext.data.StoreManager.lookup('orderemailqueueId') == null ? AOC.util.Helper.getCodeStore('orderemailqueue') : Ext.data.StoreManager.lookup('orderemailqueueId')
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
								flex:1
							},
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.CSRName,
								name:'CSRName',
								flex:1,
								margin:'0 0 0 10'
							}
						]
					},
					{
						xtype : 'radiogroup',
						name: 'datecriteriavalue',
						fieldLabel : '',
						width:600,
						margin:'5 0 0 0',
						labelSeparator:'',
						labelStyle:Settings.config.defaultFormLabelStyle,
						labelAlign:Settings.form.topLabelAlign,
						items:[
							{ boxLabel: 'Process Date', name: 'datecriteriavalue', inputValue: 'receivedDate', checked: true },
							{ boxLabel: 'Submitted Date', name: 'datecriteriavalue', inputValue: 'submittedDate' }
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
								listeners : {
									render : function(datefield) {
										datefield.setValue(new Date());
									},
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
