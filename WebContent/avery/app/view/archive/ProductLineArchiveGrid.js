Ext.define('AOC.view.archive.ProductLineArchiveGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'productLineArchiveGrid',
	alias : 'widget.ar_partner_rboproductline',
	controller:'productlineMain',
	//requires:['AOC.view.ux.CustomSearchField'],
	emptyText : '<div align=center> No data to display.</div>',
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
				text : 'Partner_RBOProductLineID',
				width : 120,
				sortable : true,
				dataIndex : 'partner_rboproductlineid',
				flex : 1.5
			}, {
				text : 'PartnerID',
				width : 120,
				sortable : true,
				dataIndex : 'partnerid',
				flex : 1.5
			}, {
				text : 'RBOID',
				width : 120,
				sortable : true,
				dataIndex : 'rboid',
				flex : 1.5
			}, {
				text : 'RBOName',
				width : 120,
				sortable : true,
				dataIndex : 'rboname',
				flex : 1.5
			}, {
				text : 'ProductLineType',
				width : 120,
				sortable : true,
				dataIndex : 'productlinetype',
				flex : 1.5
			}, {
				text : 'CSRName',
				width : 120,
				sortable : true,
				dataIndex : 'csrname',
				flex : 1.5
			}, {
				text : 'CSREmail',
				width : 120,
				sortable : true,
				dataIndex : 'csremail',
				flex : 1.5
			}, {
				text : 'OrderEmailDomain',
				width : 120,
				sortable : true,
				dataIndex : 'orderemaildomain',
				flex : 1.5
			}, {
				text : 'PackingInstruction',
				width : 120,
				sortable : true,
				dataIndex : 'packinginstruction',
				flex : 1.5
			}, {
				text : 'InvoiceLineInstruction',
				width : 120,
				sortable : true,
				dataIndex : 'invoicelineinstruction',
				flex : 1.5
			}, {
				text : 'VariableDataBreakdown',
				width : 120,
				sortable : true,
				dataIndex : 'variabledatabreakdown',
				flex : 1.5
			}, {
				text : 'ManufacturingNotes',
				width : 120,
				sortable : true,
				dataIndex : 'manufacturingnotes',
				flex : 1.5
			}, {
				text : 'ShippingOnlyNotes',
				width : 120,
				sortable : true,
				dataIndex : 'shippingonlynotes',
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
