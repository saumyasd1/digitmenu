Ext.define('AOC.view.archive.OrderLineArchiveGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'orderLineArchiveGriditemId',
    alias : 'widget.ar_orderline',
    controller:'archiveMain',
	emptyText: AOCLit.emptyDataMsg,
	recordBeingEdit:null,
	initComponent : function(){
	var me=this;
    Ext.apply(this,{
        columns : this.buildColumns(),
		columnLines:false,
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
  buildColumns : function(){
    	var me=this;
        return [
        			    {  
            	            text : AOCLit.productLineType,
            	          	width:120,
            	            sortable : true,
            	            dataIndex:'productlinetype',
            	            flex:1.5
               			},
                         {
				        	text : AOCLit.custPONumber,
				          	width:120,
				            sortable : true,
				            dataIndex:'customerponumber',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.orderedDate,
				          	width:120,
				            sortable : true,
				            dataIndex:'ordereddate',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.partnerCustName,
				          	width:120,
				            sortable : true,
				            dataIndex:'partnercustomername',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.soldToRboNumber,
				          	width:120,
				            sortable : true,
				            dataIndex:'soldtorbonumber',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.oracleItemNo,
				          	width:120,
				            sortable : true,
				            dataIndex:'oracleitemnumber',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.custItemNo,
				          	width:120,
				            sortable : true,
				            dataIndex:'customeritemnumber',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.contractNo,
				          	width:120,
				            sortable : true,
				            dataIndex:'contractnumber',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.styleNo,
				          	width:120,
				            sortable : true,
				            dataIndex:'styleno',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.custSeason,
				          	width:120,
				            sortable : true,
				            dataIndex:'customerseason',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.custOrderedQty,
				          	width:120,
				            sortable : true,
				            dataIndex:'customerorderedqty',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.Status,
				          	width:120,
				            sortable : true,
				            dataIndex:'status',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.lastModifiedBy,
				          	width:120,
				            sortable : true,
				            dataIndex:'lastModifiedBy',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.lastModifiedDate,
				          	width:120,
				            sortable : true,
				            dataIndex:'lastModifiedDate',
				            flex:1.5
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
	        		        html:AOCLit.advSearchTitle
	        		    },
	        		    listeners: {
	        		    	 el : {
	        		    		    click    : 'openAdvancedSearchWindow'
	        		    		    
	        		    	 }
	        	            }
	        		},
//				    {
//						xtype:'button',
//						itemId:'advancesearchbutton',
//						text:advSearchText,
//						icon:  AOC.config.Settings.buttonIcons.advSearchIcon,
//						iconAlign: "right",
//				    	handler:'openAdvancedSearchWindow'
//					 },
					{
						itemId: 'clearadvanedsearch',
						hidden:true, 
						handler : 'clearAdvancedSerach',
						icon:  AOC.config.Settings.buttonIcons.clearSearchIcon
					}
				 ];
						},
	 buildDockedItems : function(){
		 var me = this;
        return [
			{
            xtype : 'pagingtoolbar',
            dock : 'bottom',
            ui : 'darktoolbar',
            itemId:'pagingtoolbar',
            displayInfo:true,
            store:me.store,
            plugins:Ext.create('Ext.ux.ProgressBarPager',{width:250})
            
        }];
    }
});