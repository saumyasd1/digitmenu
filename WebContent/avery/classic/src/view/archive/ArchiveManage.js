Ext.define('AOC.view.archive.ArchiveManage', {
	extend : 'Ext.Container',
	requires : [
	     'AOC.view.base.BaseToolbar', 
	     'AOC.view.archive.OrderFileQueueArchiveGrid', 
	     'AOC.view.archive.OrderLineArchiveGrid', 
	     'AOC.view.archive.OrderLineDetailArchiveGrid', 
	     'AOC.view.archive.PartnerArchiveGrid', 
	     'AOC.view.archive.ProductLineArchiveGrid',
	     'AOC.view.archive.SalesOrderArchiveGrid',
	     'AOC.view.archive.SalesOrderDetailArchiveGrid',
	     'AOC.view.archive.ArchiveController'
	],
	alias : 'widget.archivemanage',
	itemId : 'archivemanageitemId',
	controller : 'archiveMain',
	initComponent : function () {
		Ext.apply(this, {
		    layout: {
		        type: 'vbox',
		        align: 'stretch'
		         },
			items : [{
				xtype : 'basetoolbar',
				dock : 'top',
				title : 'Archive-Manage',
				height:50,
				items : [{
						xtype : 'tbtext',
						margin:'0 0 0 20',
						text : AOCLit.archiveManage,
						itemId : 'archivetitleItemid'
					},'->', {
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
								fieldLabel : AOCLit.chooseTable,
								labelWidth:120,
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
							},{
								xtype : 'button',
								text : 'Get Table Data',
								margin:'0 20 0 20',
								icon :  AOC.config.Settings.buttonIcons.advSearchIcon,
								iconAlign : "right",
								listeners : {
									click : 'onButtonClick'
								}
							}
						]
					}
				]
			},{
					xtype : 'container',
					flex : 1,
					layout : 'card',
					itemId : 'archivePanel',
					collapsible : false,
					activeItem : 0,
					hidden : false,
					items : [{
						   xtype:'displayfield',
						   itemId:'messageitemId',
						   width:'100%',
					       value:AOCLit.selectTableMsg
					}
					      
					]
				}
			]
		});
		this.callParent(arguments);
	}
});
