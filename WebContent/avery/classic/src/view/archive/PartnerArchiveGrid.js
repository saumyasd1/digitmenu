Ext.define('AOC.view.archive.PartnerArchiveGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'partnerArchiveGrid',
	alias : 'widget.ar_partner',
	controller:'partnerMain',
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
				text : AOCLit.partnerARID,
				width : 120,
				sortable : true,
				dataIndex : 'partner_arid',
				flex : 1.5
			}, {
				text : AOCLit.partnerID,
				width : 120,
				sortable : true,
				dataIndex : 'partnerid',
				flex : 1.5
			}, {
				text : AOCLit.partnerName,
				width : 120,
				sortable : true,
				dataIndex : 'partnername',
				flex : 1.5
			}, {
				text : AOCLit.address,
				width : 120,
				sortable : true,
				dataIndex : 'address',
				flex : 1.5
			}, {
				text :AOCLit.contactPerson,
				width : 120,
				sortable : true,
				dataIndex : 'contactperson',
				flex : 1.5
			}, {
				text : AOCLit.Phone,
				width : 120,
				sortable : true,
				dataIndex : 'phone',
				flex : 1.5
			}, {
				text : AOCLit.isActive,
				width : 120,
				sortable : true,
				dataIndex : 'isactive',
				flex : 1.5
			}, {
				text : AOCLit.lastModifiedBy,
				width : 120,
				sortable : true,
				dataIndex : 'lastModifiedBy',
				flex : 1.5
			}, {
				text : AOCLit.lastModifiedDate,
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
		        		        html: AOCLit.advSearchTitle
		        		    },
		        		    listeners: {
		        		    	 el : {
		        		    		    click    : 'openAdvancedSearchWindow'
		        		    		    
		        		    	 }
		        	            }
		        		},
//					    {
//							xtype:'button',
//							itemId:'advancesearchbutton',
//							text:advSearchText,
//							icon:  AOC.config.Settings.buttonIcons.advSearchIcon,
//							iconAlign: "right",
//					    	handler:'openAdvancedSearchWindow'
//						 },
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
