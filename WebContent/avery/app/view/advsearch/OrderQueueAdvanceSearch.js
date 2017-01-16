Ext.define('AOC.view.advsearch.OrderQueueAdvanceSearch', {
	extend : 'AOC.view.base.NewBaseWindow',
	alias : 'widget.orderqueueadvancesearchwin',
	itemId : 'orderQueueAdvanceSearchWin',
	
	reference:'orderQueueAdvanceSearchWin',
	controller : 'orderqueue',
	requires : ['Ext.window.MessageBox'],
	
	title:AOCLit.advancedSearchWindowTitle,
	layout:'fit',
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
		        reference:'orderQueueAdvanceSearchForm',
		        border:false,
		        padding:'10 10 5 10',
		        buttonAlign: 'right',
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
								flex:1
							},
							{
								xtype : 'textfield',
								fieldLabel : 'Email Tracking #',
								name:'emailQueueId',
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
								fieldLabel : AOCLit.partnerDataStructure,
								displayField:'dataStructureName',
								valueField:'id',
								queryMode :'local',
								flex:1,
								margin:'0 0 0 10',
								store:Ext.data.StoreManager.lookup('PartnerProductLineStoreStoreId') == null ? Ext.create('AOC.store.PartnerProductLineStore') : Ext.data.StoreManager.lookup('PartnerProductLineStoreStoreId')
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
								name:'orderQueueId',
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
									xtype:'combo',
									displayField:'firstName',
									fieldLabel : AOCLit.CSRName,
									reference:'csrCombo',
									name:'assignCSR',
									valueField:'id',
									queryMode:'local',
									store:Ext.create('AOC.store.AssignCSRStore'),
									typeAhead:true,
									triggerAction:'all',
									flex:1,
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
								value:new Date(),
								listeners : {
									render : function(datefield) {
										//datefield.setValue(new Date());
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
				reference:'orderQueueSearchBtn',
				listeners : {
					click  : 'onSearchBtnClicked'
				}
			}
		]	
	}
});
