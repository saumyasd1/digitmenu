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
		me.buttons = me.getButtons();
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
								selectOnTab : true,
								tabIndex:1,
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
								fieldLabel : AOCLit.Subject,
								name:'Subject',
								flex:1,
								tabIndex:3,
								enableKeyEvents:true,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.TrackingNo,
								name:'id',
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
								xtype : 'combo',
								fieldLabel : AOCLit.emailStatus,
								name:'Status',
								flex:1,
								displayField:'value',
								valueField:'code',
								queryMode :'local',
								tabIndex:5,
								typeAhead:true,
								enableKeyEvents:true,
								store: Ext.data.StoreManager.lookup('orderemailqueueId') == null ? AOC.util.Helper.getCodeStore('orderemailqueue') : Ext.data.StoreManager.lookup('orderemailqueueId'),
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
								xtype:'combo',
								name: 'siteId',
								fieldLabel:'Site',
								flex:1,
							 	editable:false,
								displayField:'name',
								margin:'0 0 0 10',
								queryMode :'local',
								reference:'siteCombo',
								valueField: 'id',
								store:Ext.data.StoreManager.lookup('advSiteStoreId') != null ? Ext.data.StoreManager.lookup('advSiteStoreId') : Ext.create('AOC.store.SiteStore',{storeId:'advSiteStoreId'}),
								listeners : {
									afterrender:Helper.siteNameForSuperAdminOnly,
									select:function(field){
										if(field.getValue() == 'None'){
											field.setValue('');
										}
									}
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
								tabIndex:6,
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
								margin:'0 0 0 10',
								tabIndex:7,
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
								tabIndex:8,
								enableKeyEvents:true,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
								xtype:'combo',
								displayField:'csrName',
								fieldLabel:AOCLit.CSRName,
								reference:'csrCombo',
								name:'assignCSR',
								valueField:'userId',
								queryMode:'local',
								store:Ext.data.StoreManager.lookup('advEQCSRStoreId') != null ?  Ext.data.StoreManager.lookup('advEQCSRStoreId') : Ext.create('AOC.store.AssignCSRStore',{storeId:'advEQCSRStoreId'}),
								typeAhead:true,
								triggerAction:'all',
								flex:1,
								tabIndex:9,
								enableKeyEvents:true,
								margin:'0 0 0 10',
								listeners:{
									blur:function(combo,e){
										Helper.clearCSRCombo(combo,e);
									},
									specialkey:'getAdvancedSearchResults',
									afterrender:Helper.loadAdvanceCSRStore
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
	getButtons:function(){ 
		return [ 
			{
				text : 'Search',
				disabled : false,
				formBind : true,
				success  : true,
				tabIndex : 12,
				enableKeyEvents:true,
				listeners: {
					click  : 'onSearchBtnClicked',
					specialkey:'getAdvancedSearchResults'
				}
			}
		]	
	}
});
