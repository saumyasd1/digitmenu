Ext.define('AOC.view.advsearch.TaskManagerAdvanceSearch', {
	extend : 'AOC.view.base.NewBaseWindow',
	alias : 'widget.taskmanageradvancesearchwin',
	itemId : 'taskmanagerAdvanceSearchWin',
	
	controller : 'taskmanagercontroller',
	requires : ['Ext.window.MessageBox'],

	layout:'fit',
	title:AOCLit.advancedSearchWindowTitle,
	width: 580,
	initComponent:function(){
		var me = this;
		me.items = me.buildItems();
		me.callParent(arguments);
	},
	buildItems:function(){
		return [
		    {
		    	xtype:'form',
		        reference:'taskManagerAdvanceSearchForm',
		        padding:'10',
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
							enableKeyEvents:true,
							xtype:'textfield',
							listeners:{
								specialkey:'getAdvancedSearchResults'
							}
						},
						items:[
							{
								fieldLabel : AOCLit.TrackingNo,
								name:'id',
								tabIndex:1
								
							},
							{
								fieldLabel : AOCLit.Subject,
								name:'Subject',
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
								tabIndex:3
							},
							{
								fieldLabel : AOCLit.receiverEmailID,
								name:'ReceiverEmailID',
								tabIndex:4,
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
							labelAlign:Settings.form.topLabelAlign,
							flex:1,
							enableKeyEvents:true
						},
						items:[
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.ccMailId,
								name:'ccMailId',
								tabIndex:5,
								listeners:{
									specialkey:'getAdvancedSearchResults'
								}
							},{
								xtype:'combo',
								displayField:'csrName',
								fieldLabel:AOCLit.csrCode,
								reference:'csrCombo',
								name:'assignCSR',
								valueField:'userId',
								queryMode:'local',
								store:Ext.create('AOC.store.AssignCSRStore',{storeId:'advTmCSRStoreId'}),
								typeAhead:true,
								triggerAction:'all',
								margin:'0 0 0 10',
								tabIndex:6,
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
						margin : '5 0 0 0',
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'combo',
								name: 'siteId',
								fieldLabel:'Site',
								flex:1,
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
							labelAlign:Settings.form.topLabelAlign,
							flex:1,
							xtype:'datefield',
							enableKeyEvents:true,
							selectOnTab:true
						},
						items:[
							{
								name:'fromDate',
								reference:'fromDate',
								fieldLabel : AOCLit.fromDate,
								value:new Date(),
								tabIndex:7,
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
								tabIndex:8,
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
	buttons:[ 
		{
			text : 'Search',
			iconCls:'x-fa fa-search',
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
});