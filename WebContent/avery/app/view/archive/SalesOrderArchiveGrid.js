Ext.define('AOC.view.archive.SalesOrderArchiveGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'salesOrderArchiveGrid',
	alias : 'widget.ar_salesorder',
	//requires:['AOC.view.ux.CustomSearchField'],
	emptyText : AOCLit.emptyDataMsg,
	recordBeingEdit : null,
	initComponent : function () {
		var me = this;
		Ext.apply(this, {
			columns : this.buildColumns(),
			columnLines : false,
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
				text : AOCLit.productLineType,
				width : 120,
				sortable : true,
				dataIndex : 'productlinetype',
				flex : 1.5
			}, {
				text : AOCLit.oracleExportID,
				width : 120,
				sortable : true,
				dataIndex : 'oracleexportid',
				flex : 1.5
			}, {
				text : AOCLit.Division,
				width : 120,
				sortable : true,
				dataIndex : 'division',
				flex : 1.5
			}, {
				text : AOCLit.orderSource,
				width : 120,
				sortable : true,
				dataIndex : 'ordersource',
				flex : 1.5
			}, {
				text : AOCLit.systemUniqueID,
				width : 120,
				sortable : true,
				dataIndex : 'systemuniqueid',
				flex : 1.5
			}, {
				text : AOCLit.systemUniqueIDLineNo,
				width : 120,
				sortable : true,
				dataIndex : 'systemuniqueidlineno',
				flex : 1.5
			}, {
				text : AOCLit.SOLDTORBONumber,
				width : 120,
				sortable : true,
				dataIndex : 'soldtorbonumber',
				flex : 1.5
			},{
				text : AOCLit.contractNumber,
				width : 120,
				sortable : true,
				dataIndex : 'contractnumber',
				flex : 1.5
			}, {
				text : AOCLit.Style,
				width : 120,
				sortable : true,
				dataIndex : 'style',
				flex : 1.5
			}, {
				text : AOCLit.orderedQty,
				width : 120,
				sortable : true,
				dataIndex : 'orderdedqty',
				flex : 1.5
			}, {
				text : AOCLit.dateOrdered,
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
					    '->' ,
					    {
		        		    xtype: 'component',
		        		    itemId:'advancesearchbutton',
		        		    autoEl: {
		        		        tag: 'a',
		        		        href: '#',
		        		        html:AOCLit.advSearchTitle,
		        		    },
		        		    listeners: {
		        		    	 el : {
		        		    		    click    : 'openAdvancedSearchWindow'
		        		    		    
		        		    	 }
		        	            }
		        		},
						{
							itemId: 'clearadvanedsearch',
							hidden:true, 
							handler : 'clearAdvancedSerach',
							icon:  AOC.config.Settings.buttonIcons.clearSearchIcon
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
