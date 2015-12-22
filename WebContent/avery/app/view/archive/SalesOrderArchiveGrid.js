Ext.define('AOC.view.archive.SalesOrderArchiveGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'salesOrderArchiveGrid',
	alias : 'widget.ar_salesorder',
	//requires:['AOC.view.ux.CustomSearchField'],
	emptyText : '<div align=center> No data to display.</div>',
	recordBeingEdit : null,
	initComponent : function () {
		var me = this;
		Ext.apply(this, {
			columns : this.buildColumns(),
			columnLines : true,
			tbar: { height: 40,
			items : me.buildtbar()
			},
			dockedItems : this.buildDockedItems(),
			viewConfig : {
				stripeRows : true,
				enableTextSelection : true
			}
		});
		this.callParent(arguments);
	},
	buildColumns : function () {
		var me = this;
		return [{
				text : 'ProductLineType',
				width : 120,
				sortable : true,
				dataIndex : 'productlinetype',
				flex : 1.5
			}, {
				text : 'OracleExportID',
				width : 120,
				sortable : true,
				dataIndex : 'oracleexportid',
				flex : 1.5
			}, {
				text : 'Division',
				width : 120,
				sortable : true,
				dataIndex : 'division',
				flex : 1.5
			}, {
				text : 'OrderSource',
				width : 120,
				sortable : true,
				dataIndex : 'ordersource',
				flex : 1.5
			}, {
				text : 'SystemUniqueID',
				width : 120,
				sortable : true,
				dataIndex : 'systemuniqueid',
				flex : 1.5
			}, {
				text : 'SystemUniqueIDLineNo',
				width : 120,
				sortable : true,
				dataIndex : 'systemuniqueidlineno',
				flex : 1.5
			}, {
				text : 'SOLDTORBONumber',
				width : 120,
				sortable : true,
				dataIndex : 'soldtorbonumber',
				flex : 1.5
			},{
				text : 'ContractNumber',
				width : 120,
				sortable : true,
				dataIndex : 'contractnumber',
				flex : 1.5
			}, {
				text : 'Style',
				width : 120,
				sortable : true,
				dataIndex : 'style',
				flex : 1.5
			}, {
				text : 'OrderdedQty',
				width : 120,
				sortable : true,
				dataIndex : 'orderdedqty',
				flex : 1.5
			}, {
				text : 'DateOrdered',
				width : 120,
				sortable : true,
				dataIndex : 'dateordered',
				flex : 1.5
			}, {
				text : 'LastModifiedBy',
				width : 120,
				sortable : true,
				dataIndex : 'lastModifiedBy',
				flex : 1.5
			}, {
				text : 'LastModifiedDate',
				width : 120,
				sortable : true,
				dataIndex : 'lastModifiedDate',
				flex : 1.5
			}
		];
	},
	 buildtbar:function(){
			var me=this;
			 	return [
					    '->' ,{
							xtype:'button',
							itemId:'advancesearchbutton',
							text:advSearchText,
							icon: advSearchIcon,
							iconAlign: "right",
					    	handler:'openAdvancedSearchWindow'
						 },
						{
							itemId: 'clearadvanedsearch',
							hidden:true, 
							handler : 'clearAdvancedSerach',
							icon: clearSearchIcon
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
