Ext.define('AOC.view.archive.SalesOrderDetailArchiveGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'salesOrderDetailArchiveGrid',
	alias : 'widget.ar_salesorderdetail',
	//requires:['AOC.view.ux.CustomSearchField'],
	emptyText : '<div align=center> No data to display.</div>',
	recordBeingEdit : null,
	initComponent : function () {
		var me = this;
		Ext.apply(this, {
			columns : this.buildColumns(),
			columnLines : true,
			/*tbar: { height: 40,
			items : me.buildtbar()
			},*/
			dockedItems : this.buildDockedItems(),
			viewConfig : {
				stripeRows : true,
				enableTextSelection : true,
			}
		});
		this.callParent(arguments);
	},
	buildColumns : function () {
		var me = this;
		return [{
				text : 'SOnumber',
				width : 120,
				sortable : true,
				dataIndex : 'sonumber',
				flex : 1.5
			}, {
				text : 'Divison',
				width : 120,
				sortable : true,
				dataIndex : 'divison',
				flex : 1.5
			}, {
				text : 'SODetails',
				width : 120,
				sortable : true,
				dataIndex : 'sodetails',
				flex : 1.5
			}, {
				text : 'Oracleitemnumber',
				width : 120,
				sortable : true,
				dataIndex : 'oracleitemnumber',
				flex : 1.5
			}, {
				text : 'Level',
				width : 120,
				sortable : true,
				dataIndex : 'level',
				flex : 1.5
			}, {
				text : 'SKUno',
				width : 120,
				sortable : true,
				dataIndex : 'skuno',
				flex : 1.5
			}, {
				text : 'typesetter',
				width : 120,
				sortable : true,
				dataIndex : 'typesetter',
				flex : 1.5
			}, {
				text : 'Variablefieldname',
				width : 120,
				sortable : true,
				dataIndex : 'variablefieldname',
				flex : 1.5
			}, {
				text : 'variabledatavalue',
				width : 120,
				sortable : true,
				dataIndex : 'variabledatavalue',
				flex : 1.5
			}, {
				text : 'FiberPercent',
				width : 120,
				sortable : true,
				dataIndex : 'fiberpercent',
				flex : 1.5
			}, {
				text : 'SentToOracleDate',
				width : 120,
				sortable : true,
				dataIndex : 'senttooracledate',
				flex : 1.5
			}
		];
	},
	buildDockedItems : function () {
		var me = this;
		return [{
				xtype : 'pagingtoolbar',
				dock : 'bottom',
				ui : 'darktoolbar',
				itemId : 'pagingtoolbar',
				displayInfo : true,
				store : me.store,
				plugins : Ext.create('Ext.ux.ProgressBarPager', {
					width : 250
				})

			}
		];
	}
});
