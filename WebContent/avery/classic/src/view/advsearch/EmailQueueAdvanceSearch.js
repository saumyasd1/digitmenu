Ext.define('AOC.view.advsearch.EmailQueueAdvanceSearch', {
	extend : 'AOC.view.base.NewBaseWindow',
	alias : 'widget.emailqueueadvancesearchwin',
	itemId : 'emailQueueAdvanceSearchWin',
	
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
		        padding:'10 10 5 10',
		        items:[
					{
						xtype: 'fieldcontainer',
						layout: 'hbox',
						margin : '5 0 0 0',
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							flex:1,
							enableKeyEvents:true
						},
						items:[
							{
								xtype:'combo',
								fieldLabel:AOCLit.partnerName,
								name:'partnerName',
								reference:'partnerCombo',
								store:Ext.data.StoreManager.lookup('partnerComboStoreId'),
								queryMode:'local',
								tabIndex:1,
								displayField:'partnerName',
								valueField:'partnerName',
								listeners:{
									specialkey:'getAdvancedSearchResults',
									blur:'onComboBlur'
								}
							},
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.RBO,
								name:'RBOName',
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
							labelAlign:Settings.form.topLabelAlign,
							flex:1,
							enableKeyEvents:true
						},
						items:[
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.Subject,
								name:'Subject',
								tabIndex:3,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.TrackingNo,
								name:'id',
								margin:'0 0 0 10',
								tabIndex:4,
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
							labelAlign:Settings.form.topLabelAlign,
							flex:1,
							enableKeyEvents:true,
							xtype:'combo',
							queryMode :'local',
							xtype:'combo'
						},
						items:[
							{
								fieldLabel : AOCLit.emailStatus,
								name:'Status',
								displayField:'value',
								valueField:'code',
								tabIndex:5,
								store: Ext.data.StoreManager.lookup('orderemailqueueId') == null ? AOC.util.Helper.getCodeStore('orderemailqueue') : Ext.data.StoreManager.lookup('orderemailqueueId'),
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
								name: 'siteId',
								fieldLabel:'Site',
							 	editable:false,
							 	tabIndex:6,
								displayField:'name',
								margin:'0 0 0 10',
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
							labelAlign:Settings.form.topLabelAlign,
							flex:1,
							enableKeyEvents:true,
							xtype:'textfield',
							listeners:{
								specialkey:'getAdvancedSearchResults'
							}
						},
						items:[
							{
								fieldLabel : AOCLit.senderEmailID,
								name:'SenderEmailID',
								tabIndex:7
							},
							{
								fieldLabel : AOCLit.receiverEmailID,
								name:'ReceiverEmailID',
								margin:'0 0 0 10',
								tabIndex:8
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
							labelAlign:Settings.form.topLabelAlign,
							flex:1,
							enableKeyEvents:true
						},
						items:[
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.ccMailId,
								name:'ccMailId',
								tabIndex:9,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
								xtype:'combo',
								displayField:'csrName',
								fieldLabel:AOCLit.csrCode,
								reference:'csrCombo',
								name:'assignCSR',
								valueField:'userId',
								queryMode:'local',
								store:Ext.data.StoreManager.lookup('advEQCSRStoreId') != null ?  Ext.data.StoreManager.lookup('advEQCSRStoreId') : Ext.create('AOC.store.AssignCSRStore',{storeId:'advEQCSRStoreId'}),
								typeAhead:true,
								triggerAction:'all',
								tabIndex:10,
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
							labelAlign:Settings.form.topLabelAlign,
							xtype:'datefield',
							selectOnTab : true,
							flex:1,
							enableKeyEvents:true
						},
						items:[
							{
								xtype : 'datefield',
								name:'fromDate',
								reference:'fromDate',
								fieldLabel : AOCLit.fromDate,
								tabIndex:11,
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
								margin:'0 0 0 10',
								tabIndex:12,
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
				iconCls:'x-fa fa-search',
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
