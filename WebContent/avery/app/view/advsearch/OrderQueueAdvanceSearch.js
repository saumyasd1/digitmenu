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
		me.buttons = me.getButtons();
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
								tabIndex:1,
								selectOnTab : true,
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
								tabIndex:2,
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
								fieldLabel :AOCLit.TrackingNo,
								name:'emailQueueId',
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
								fieldLabel : AOCLit.orderStatus,
								name:'Status',
								flex:1,
								displayField:'value',
								valueField:'code',
								queryMode :'local',
								tabIndex:5,
								enableKeyEvents:true,
								store: Ext.data.StoreManager.lookup('orderfilequeueid') == null ? AOC.util.Helper.getCodeStore('orderfilequeue') : Ext.data.StoreManager.lookup('orderfilequeueid'),
										listeners:{
											specialkey:'getAdvancedSearchResults'
										}
							},
							{
								xtype : 'combo',
								fieldLabel : AOCLit.partnerDataStructure,
								displayField:'dataStructureName',
								name:'partnerDataStructure',
								valueField:'id',
								typeAhead:true,
								queryMode :'local',
								flex:1,
								tabIndex:6,
								enableKeyEvents:true,
								margin:'0 0 0 10',
								store:Ext.data.StoreManager.lookup('PartnerProductLineStoreStoreId') == null ? Ext.create('AOC.store.PartnerProductLineStore') : Ext.data.StoreManager.lookup('PartnerProductLineStoreStoreId'),
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
								tabIndex:7,
								enableKeyEvents:true,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.orderTrackNo,
								name:'orderQueueId',
								width:250,
								flex:1,
								margin:'0 0 0 10',
								tabIndex:8,
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
								fieldLabel : AOCLit.poNumber,
								name:'ponumber',
								flex:1,
								tabIndex:9,
								enableKeyEvents:true,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},
							{
									xtype:'combo',
									displayField:'csrName',
									fieldLabel : AOCLit.CSRName,
									reference:'csrCombo',
									name:'assignCSR',
									valueField:'id',
									queryMode:'local',
									store:Ext.create('AOC.store.AssignCSRStore',{storeId:'assignCSRStore'}),
									typeAhead:true,
									tabIndex:10,
									triggerAction:'all',
									flex:1,
									enableKeyEvents:true,
									margin:'0 0 0 10',
									listeners:{
										blur:function(combo,e){
											Helper.clearCSRCombo(combo,e);
										},
										afterrender:function(combo){
											combo.store.load({params:{siteId:AOCRuntime._user.siteId}})
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
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'combobox',
								name: 'filterSiteId',
								displayField: 'name',
								valueField:'id',
								fieldLabel:'Site',
								width:275,
								store: Ext.create('AOC.store.SiteStore',{storeId:'siteStore'}),
								listeners:{
									specialkey:'getAdvancedSearchResults',
									afterrender:function(field){
										if(AOCRuntime._user.role == '1'){
											field.show();
										}
										else{
											field.hide();
										}
									}
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
								tabIndex:11,
								enableKeyEvents:true,
								selectOnTab : true,
								value:new Date(),
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
								tabIndex:12,
								enableKeyEvents:true,
								allowBlank : true,
								selectOnTab : true,
								value:new Date(),
								listeners : {
									render : function(datefield) {
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
				enableKeyEvents:true,
				reference:'orderQueueSearchBtn',
				listeners : {
					click  : 'onSearchBtnClicked',
					specialkey:'getAdvancedSearchResults'
				}
			}
		]	
	}
});
