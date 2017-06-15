Ext.define('AOC.view.archive.ProductLineArchiveGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'productLineArchiveGrid',
	alias : 'widget.ar_partner_rboproductline',
	controller:'productlineMain',
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
				text : AOCLit.partner_RBOProductLineID,
				width : 120,
				sortable : true,
				dataIndex : 'partner_rboproductlineid',
				flex : 1.5
			}, {
				text : AOCLit.partnerID,
				width : 120,
				sortable : true,
				dataIndex : 'partnerid',
				flex : 1.5
			}, {
				text : AOCLit.RBOID,
				width : 120,
				sortable : true,
				dataIndex : 'rboid',
				flex : 1.5
			}, {
				text : AOCLit.RBOName,
				width : 120,
				sortable : true,
				dataIndex : 'rboname',
				flex : 1.5
			}, {
				text : AOCLit.productLineType,
				width : 120,
				sortable : true,
				dataIndex : 'productlinetype',
				flex : 1.5
			}, {
				text : AOCLit.CSRName,
				width : 120,
				sortable : true,
				dataIndex : 'csrname',
				flex : 1.5
			}, {
				text : AOCLit.CSREmail,
				width : 120,
				sortable : true,
				dataIndex : 'csremail',
				flex : 1.5
			}, {
				text :AOCLit.orderEmailDomain,
				width : 120,
				sortable : true,
				dataIndex : 'orderemaildomain',
				flex : 1.5
			}, {
				text : AOCLit.packagingInstruction,
				width : 120,
				sortable : true,
				dataIndex : 'packinginstruction',
				flex : 1.5
			}, {
				text : AOCLit.invoiceLineInstruction,
				width : 120,
				sortable : true,
				dataIndex : 'invoicelineinstruction',
				flex : 1.5
			}, {
				text : AOCLit.variableDataBreakDown,
				width : 120,
				sortable : true,
				dataIndex : 'variabledatabreakdown',
				flex : 1.5
			}, {
				text : AOCLit.manufacturingNotes,
				width : 120,
				sortable : true,
				dataIndex : 'manufacturingnotes',
				flex : 1.5
			}, {
				text : AOCLit.shippingOnlyNotes,
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
							icon:  AOC.config.Settings.buttonIcons.advSearchIcon,
							iconAlign: "right",
					    	handler:'openAdvancedSearchWindow'
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
