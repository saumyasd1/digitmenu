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
					xtype : 'container',
					flex : 1.8,
					layout : 'card',
					itemId : 'archivePanel',
					collapsible : false,
					activeItem : 0,
					hidden : false,
					items : [{
						   xtype:'displayfield',
						   itemId:'messageitemId',
					       value:'<center><font size=2>No data to display,Please Select Table</font></center>'
					}
					      
					]
				}
			],
			dockedItems : [{
					xtype : 'basetoolbar',
					dock : 'top',
					title : 'Archive-Manage',
					height:50,
					items : [{
							xtype : 'tbtext',
							text : '<div style="color:"><b>Archive-Manage</b></div>',
							itemId : 'archivetitleItemid'
						}, {
							xtype : 'form',
							ui : 'darktoolbar',
							reference : 'cmbformArchive',
							border : false,
							buttonAlign : 'center',
							layout : 'column',
							style : 'background: #FFFFFF !important;border: 2px solid #FFFFFF;',
							items : [{
									xtype : 'combobox',
									itemId:'choosetable',
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
									width : 20,
									margin:'5 0 0 500'
								},
						        {
									xtype : 'button',
									text : 'Get Table Data',
									icon : advSearchIcon,
									iconAlign : "right",
									listeners : {
										click : 'onButtonClick'
									}
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
