Ext.define('AOC.view.archive.PartnerArchiveGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'partnerArchiveGrid',
	alias : 'widget.ar_partner',
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
				enableTextSelection : true
			}
		});
		this.callParent(arguments);
	},
	buildColumns : function () {
		var me = this;
		return [{
				text : 'Partner ARID',
				width : 120,
				sortable : true,
				dataIndex : 'partner_arid',
				flex : 1.5
			}, {
				text : 'Partner ID',
				width : 120,
				sortable : true,
				dataIndex : 'partnerid',
				flex : 1.5
			}, {
				text : 'Partner Name',
				width : 120,
				sortable : true,
				dataIndex : 'partnername',
				flex : 1.5
			}, {
				text : 'Address',
				width : 120,
				sortable : true,
				dataIndex : 'address',
				flex : 1.5
			}, {
				text : 'Contact Person',
				width : 120,
				sortable : true,
				dataIndex : 'contactperson',
				flex : 1.5
			}, {
				text : 'Phone',
				width : 120,
				sortable : true,
				dataIndex : 'phone',
				flex : 1.5
			}, {
				text : 'isActive',
				width : 120,
				sortable : true,
				dataIndex : 'isactive',
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
