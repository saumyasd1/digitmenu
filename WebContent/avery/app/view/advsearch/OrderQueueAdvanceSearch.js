Ext.define('AOC.view.advsearch.OrderQueueAdvanceSearch', {
	extend : 'AOC.view.base.BaseWindow',
	alias : 'widget.orderqueueadvancesearchwin',
	itemId : 'orderQueueAdvanceSearchWin',
	
	reference:'orderQueueAdvanceSearchWin',
	controller : 'orderqueue',
	
	requires : ['Ext.window.MessageBox'],
	//titleAlign:'center',

	bodyStyle: 'background: #FFFFFF !important;border: 2px solid #FFFFFF;padding:10px 10px 5px 10px;',
	layout:'fit',
	
	height: 580,
	width: 580,
	draggable: false,
    modal: true,
    
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
		        reference:'orderQueueAdvanceSearchForm',
		        border:false,
		        buttonAlign : 'right',
		        buttons:me.getButtons(),
		        items:[
					{
						xtype:'tbtext',
						itemId:'tittleItemId',
						text:AOCLit.advancedSearchWindowTitle,
						style:'color:#2f3338;font-size:15px;font-weight:bold;text-align:center;'
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
								fieldLabel : AOCLit.orderStatus,
								name:'Status',
								flex:1,
								displayField:'value',
								valueField:'code',
								queryMode :'local',
								store: Ext.data.StoreManager.lookup('orderfilequeueid') == null ? AOC.util.Helper.getCodeStore('orderfilequeue') : Ext.data.StoreManager.lookup('orderfilequeueid')
							},
							{
								xtype : 'combo',
								fieldLabel : AOCLit.productLine,
								name:'ProductLineType',
								itemId:'productLineComboItemId',
								displayField:'productLineType',
								valueField:'productLineType',
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
								fieldLabel : AOCLit.senderEmailID,
								name:'SenderEmailID',
								flex:1
							},
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.orderTrackNo,
								name:'id',
								width:250,
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
								fieldLabel : AOCLit.poNumber,
								name:'ponumber',
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
						hideLabel :true,
						//width:600,
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
						margin : '5 0 0 0',
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
								//width:250,
								flex:1,
								margin:'0 0 0 10',
								hidden:false,
								allowBlank : true,
								selectOnTab : true,
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
