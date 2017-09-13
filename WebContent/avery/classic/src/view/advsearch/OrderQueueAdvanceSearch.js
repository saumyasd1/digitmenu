Ext.define('AOC.view.advsearch.OrderQueueAdvanceSearch', {
	extend : 'AOC.view.base.NewBaseWindow',
	alias : 'widget.orderqueueadvancesearchwin',
	itemId : 'orderQueueAdvanceSearchWin',
	
	controller : 'orderqueue',
	requires : ['Ext.window.MessageBox'],
	
	title:AOCLit.advancedSearchWindowTitle,
	layout:'fit',
	width: 580,
    
	initComponent:function(){
		var me = this;
		me.items = me.buildItems();
		me.buttons = me.getButtons();
		me.callParent(arguments);
	},
	buildItems :function(){
		return [
		    {
		    	xtype:'form',
		        reference:'orderQueueAdvanceSearchForm',
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
								tabIndex:2,
								margin:'0 0 0 10',
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
							enableKeyEvents:true,
							flex:1,
							xtype:'textfield',
							listeners:{
								specialkey:'getAdvancedSearchResults'
							}
						},
						items:[
							{
								fieldLabel : AOCLit.Subject,
								name:'Subject',
								tabIndex:3
							},
							{
								fieldLabel :AOCLit.TrackingNo,
								name:'emailQueueId',
								margin:'0 0 0 10',
								tabIndex:4
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
							typeAhead:true,
							queryMode :'local',
							xtype:'combo'
						},
						items:[
							{
								fieldLabel : AOCLit.orderStatus,
								name:'Status',
								displayField:'value',
								valueField:'code',
								tabIndex:5,
								store: Ext.data.StoreManager.lookup('orderfilequeueid') == null ? Helper.getCodeStore('orderfilequeue') : Ext.data.StoreManager.lookup('orderfilequeueid'),
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
								fieldLabel : AOCLit.partnerDataStructure,
								displayField:'dataStructureName',
								name:'partnerDataStructure',
								valueField:'id',
								tabIndex:6,
								margin:'0 0 0 10',
								store:Ext.data.StoreManager.lookup('productLineStoreId') == null ? Ext.create('AOC.store.PartnerProductLineStore',{storeId:'productLineStoreId'}) : Ext.data.StoreManager.lookup('productLineStoreId'),
								listeners:{
									specialkey:'getAdvancedSearchResults',
									expand:Helper.onPartnerDSComboExpand,
									afterrender:Helper.onParterDSComboAfterRender
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
								fieldLabel : AOCLit.senderEmailID,
								name:'SenderEmailID',
								tabIndex:7,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.orderTrackNo,
								name:'orderQueueId',
								margin:'0 0 0 10',
								tabIndex:8,
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
								xtype:'combo',
								name: 'siteId',
								fieldLabel:'Site',
							 	editable:false,
								displayField:'name',
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
									},
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
								fieldLabel : AOCLit.poNumber,
								name:'ponumber',
								tabIndex:9,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
								xtype:'combo',
								displayField:'csrName',
								fieldLabel : AOCLit.csrCode,
								reference:'csrCombo',
								name:'assignCSR',
								valueField:'userId',
								queryMode:'local',
								store:Ext.data.StoreManager.lookup('advOQCSRStoreId') != null ?  Ext.data.StoreManager.lookup('advOQCSRStoreId') : Ext.create('AOC.store.AssignCSRStore',{storeId:'advOQCSRStoreId'}),
								typeAhead:true,
								tabIndex:10,
								triggerAction:'all',
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
							flex:1,
							xtype:'datefield',
							selectOnTab:true,
							enableKeyEvents:true
						},
						items:[
							{
								name:'fromDate',
								reference:'fromDate',
								fieldLabel : AOCLit.fromDate,
								hidden:false,
								tabIndex:11,
								listeners : {
									afterrender : function(datefield) {
										datefield.setValue(Ext.Date.subtract (new Date(),Ext.Date.DAY,7));
									},
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
								fieldLabel : AOCLit.toDate,
								name:'toDate',
								reference:'toDate',
								margin:'0 0 0 10',
								hidden:false,
								tabIndex:12,
								value:new Date(),
								listeners : {
									specialkey:'getAdvancedSearchResults'
								}
							}
						]
					}  
		        ]
		    }
		];
	},
	getButtons:function(){ 
		return [ 
			{
				text : 'Search',
				iconCls:'x-fa fa-search',
				disabled : false,
				formBind : true,
				success : true,
				enableKeyEvents:true,
				reference:'orderQueueSearchBtn',
				listeners : {
					click  : 'onSearchBtnClicked',
					specialkey:'getAdvancedSearchResults'
				}
			}
		];	
	}
});
