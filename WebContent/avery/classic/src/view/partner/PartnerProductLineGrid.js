Ext.define('AOC.view.partner.PartnerProductLineGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'partnerproductlinegriditemId',
    alias : 'widget.partnerproductlinegrid',
	requires:[
          'AOC.view.advsearch.ProductLineAdvanceSearch',
          'AOC.view.ux.CustomSearchField',
          'AOC.view.productline.ProductLineController'
	],
	controller:'productlineMain',
	cls:'aoc-panel',
	emptyText: AOCLit.emptyDataMsg,
	partnerid:null,
	partnerName:null,
	
	listeners: {
        activate: 'onActivateGrid',
        cellclick:'onCellClick',
        rowcontextmenu:'onRowContextMenu'
    },
	store:Ext.data.StoreManager.lookup('partnerProductStoreId') != null ? Ext.data.StoreManager.lookup('partnerProductStoreId') : Ext.create('AOC.store.PartnerProductStore',{storeId:'partnerProductStoreId'}),
	initComponent : function(){
		var me=this;
	    Ext.apply(this,{
	        columns : this.buildColumns(),
			columnLines:false,
	        tbar: { 
	    		height: AOC.config.Settings.config.defaultTbarHeight,
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
  buildColumns : function(){
        return [          
            {
            	header: '<img src="' + AOC.config.Settings.buttonIcons.menuIcon + '" />',
	            width:40,
	            menuDisabled: true,
                align:'center',
                sortable:false,
                resizable:false,
                renderer:Helper.actionColumnRenderer
            },
		    {  
	            text : AOCLit.partnerName,
	          	width:120,
	            sortable : true,
                align:'left',
	            flex:1.5,
	            renderer: function(v,cell,rec){
	            	return rec.get('varPartner').partnerName;
	            }
	            
   			},
   			{
	        	text : AOCLit.RBOName,
	            sortable : true,
                align:'left',
	            dataIndex:'rboName',
                align:'left',
	            flex:1
            },
            {
            	text: AOCLit.partnerDataStructure,
            	sortable:true,
            	dataIndex:'dataStructureName',
                align:'left',
            	flex:1
            },
            {
	        	text : AOCLit.productLine,
	            sortable : true,
	            dataIndex:'productLineType',
                align:'left',
	            flex:1
            },
            {
	        	text : AOCLit.CSRName,
	            sortable : true,
                align:'left',
	            dataIndex:'assignCSRName',
	            flex:1
            },
            {
                text: AOCLit.siteName,
                sortable: true,
                flex:1,
                dataIndex: 'site',
                align: 'left',
                listeners: {
                	'afterrender': Helper.siteNameForSuperAdminOnly
                },
                renderer:function(v, metadata, rec){
                	return Helper.getSiteName(v);
                }
            },
            {
                text: AOCLit.lastmodifiedby,
                align:'left',
                dataIndex: 'lastModifiedBy',
                flex:1
            }, 
            {
                text: AOCLit.lastmodifieddate,
                dataIndex:'lastModifiedDate',
                flex:1,
                renderer: function(v,metadata,rec){
                	rec.data.siteId = rec.data.site;
                	return Helper.onDateRendererSiteTimeZoneSpecific(v,metadata,rec);
                }
            }
        ];
    },
	 buildtbar:function(){
		var me=this;
		return [
         		{
	 				xtype : 'tbtext',
	 				text : '<div style="color:"><b>Partner Data Structure-Manage</b></div>'
	            },
	            {
	              text:'New',
	              itemId : 'newPartner',
	              handler:'createproductline',
	              iconCls:'fa fa-plus',
	              cls:'blue-btn',
	              hidden:false,
	              listeners:{
	                	'afterrender':function(obj){
	                		if(AOCRuntime.getUser().role == 3) obj.setHidden(true);
	                	}
	                }
	            },
	          '->',
	          {
            	xtype: 'customsearchfield',
            	searchCriteria:'',
    			store : Ext.data.StoreManager.lookup(me.store),
    			width: 200,
    			emptyText: "Search by ProductLine"
	          },
	          {
				xtype:'button',
				refrence:'advancesearchbutton',
				text:AOCLit.advSearchText,
				iconCls:'fa fa-search',
				iconAlign: "right",
				cls:'blue-btn',
				handler:'openAdvancedSearchWindow'
			 },
			 {
				hidden:true, 
				iconCls:'fa fa-times',
				cls:'blue-btn',
				itemId:'clearadvanedsearch',
				reference:'clearAdvSearch',
				handler:'clearAdvancedSearch',
				tooltip:'Clear Search'
			}
		 ];
	},
	buildDockedItems : function(){
    	var me=this;
        return [
			{
            xtype : 'pagingtoolbar',
            dock : 'bottom',
            itemId:'pagingtoolbar',
            store:me.store,
            displayInfo:true,
			pageSize:pageSize,
            plugins:Ext.create('Ext.ux.ProgressBarPager',{width:250})
            
        }];
    }
});