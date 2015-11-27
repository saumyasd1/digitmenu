Ext.define('AOC.view.archive.ArchiveManage', {
	extend : 'Ext.panel.Panel',
	requires : ['AOC.view.base.BaseToolbar', 'AOC.view.archive.OrderFileQueueArchiveGrid', 'AOC.view.archive.OrderLineArchiveGrid', 
		'AOC.view.archive.OrderLineDetailArchiveGrid', 'AOC.view.archive.PartnerArchiveGrid', 
		'AOC.view.archive.ProductLineArchiveGrid','AOC.view.archive.SalesOrderArchiveGrid','AOC.view.archive.SalesOrderDetailArchiveGrid'],
	alias : 'widget.archivemanage',
	itemId : 'archivemanageitemId',
	controller : 'archiveMain',
	initComponent : function () {
		Ext.apply(this, {
			layout : 'fit',
			border : '4 4 4 4',
			items : [{
					xtype : 'panel',
					flex : 1.8,
					layout : 'card',
					itemId : 'archivePanel',
					collapsible : false,
					activeItem : 0,
					hidden : false,
					items : [
					]
				}
			],
			dockedItems : [{
					xtype : 'basetoolbar',
					dock : 'top',
					title : 'Archive-Manage',
					items : [{
							xtype : 'tbtext',
							text : '<div style="color:"><b>Archive-Manage</b></div>',
							itemId : 'archivetitleItemid'
						}, {
							xtype : 'form',
							ui : 'darktoolbar',
							reference : 'cmbformArchive',
							border : false,
							buttonAlign : 'right',
							layout : 'column',
							style : 'background: #FFFFFF !important;border: 2px solid #FFFFFF;',
							items : [{
									xtype : 'combobox',
									//id : 'cmbArchiveTables',
									fieldLabel : 'Choose Table',
									store : Ext.create('Ext.data.Store', {
										fields : ['displayTableName', 'tableName'],
										data : [{
												"displayTableName" : "Order File Queue",
												"tableName" : "ar_orderfilequeue"
											}, {
												"displayTableName" : "Order Line",
												"tableName" : "ar_orderline"
											}, {
												"displayTableName" : "Order Line Detail",
												"tableName" : "ar_orderlinedetail"
											}, {
												"displayTableName" : "Partner",
												"tableName" : "ar_partner"
											}, {
												"displayTableName" : "Product Line",
												"tableName" : "ar_partner_rboproductline"
											}, {
												"displayTableName" : "Sales Order",
												"tableName" : "ar_salesorder"
											}, {
												"displayTableName" : "Sales Order Detail",
												"tableName" : "ar_salesorderdetail"
											}
											//{"displayTableName":"Address", "tableName":"address"}
										]
									}),
									name : 'tableName',
									queryMode : 'local',
									reference : 'cmbArchiveTables',
									displayField : 'displayTableName',
									valueField : 'tableName',
									editable : false
								}, {
									xtype : 'tbspacer',
									width : 20
								}, {
									xtype : 'datefield',
									//anchor: '100%',
									fieldLabel : 'From',
									name : 'fromDate',
									reference : 'fromDate',
									maxValue : new Date()
								}, {
									xtype : 'tbspacer',
									width : 20
								}, {
									xtype : 'datefield',
									//anchor: '100%',
									fieldLabel : 'To',
									name : 'toDate',
									reference : 'toDate',
									maxValue : new Date()
								}, {
									xtype : 'tbspacer',
									width : 20
								}, {
									xtype : 'button',
									//refrence:'advancesearchbutton',
									text : 'Get Table Data',
									icon : advSearchIcon,
									iconAlign : "right",
									listeners : {
										click : 'onButtonClick'
									}
									//handler:'openAdvancedSearchWindow'
								}
							]
						}
					]
				}
			]
		});
		this.callParent(arguments);
	}
});
