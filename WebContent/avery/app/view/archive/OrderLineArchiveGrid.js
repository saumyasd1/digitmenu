Ext.define('AOC.view.archive.OrderLineArchiveGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'orderLineArchiveGriditemId',
    alias : 'widget.ar_orderline',
	emptyText:'<div align=center> No data to display.</div>',
	recordBeingEdit:null,
	initComponent : function(){
	var me=this;
    Ext.apply(this,{
        columns : this.buildColumns(),
		columnLines:true,
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
            	            text : 'Product Line Type',
            	          	width:120,
            	            sortable : true,
            	            dataIndex:'productlinetype',
            	            flex:1.5
               			},
                         {
				        	text : 'Customer PO Number',
				          	width:120,
				            sortable : true,
				            dataIndex:'customerponumber',
				            flex:1.5
			            },
			            {
				        	text : 'OrderedDate',
				          	width:120,
				            sortable : true,
				            dataIndex:'ordereddate',
				            flex:1.5
			            },
			            {
				        	text : 'Partner Customer Name',
				          	width:120,
				            sortable : true,
				            dataIndex:'partnercustomername',
				            flex:1.5
			            },
			            {
				        	text : 'SOLD TO RBO Number',
				          	width:120,
				            sortable : true,
				            dataIndex:'soldtorbonumber',
				            flex:1.5
			            },
			            {
				        	text : 'Oracle Item Number',
				          	width:120,
				            sortable : true,
				            dataIndex:'oracleitemnumber',
				            flex:1.5
			            },
			            {
				        	text : 'Customer Item Number',
				          	width:120,
				            sortable : true,
				            dataIndex:'customeritemnumber',
				            flex:1.5
			            },
			            {
				        	text : 'Contract Number',
				          	width:120,
				            sortable : true,
				            dataIndex:'contractnumber',
				            flex:1.5
			            },
			            {
				        	text : 'StyleNo',
				          	width:120,
				            sortable : true,
				            dataIndex:'styleno',
				            flex:1.5
			            },
			            {
				        	text : 'Customer Season',
				          	width:120,
				            sortable : true,
				            dataIndex:'customerseason',
				            flex:1.5
			            },
			            {
				        	text : 'Customer Ordered Qty',
				          	width:120,
				            sortable : true,
				            dataIndex:'customerorderedqty',
				            flex:1.5
			            },
			            {
				        	text : 'Status',
				          	width:120,
				            sortable : true,
				            dataIndex:'status',
				            flex:1.5
			            },
			            {
				        	text : 'Last Modified By',
				          	width:120,
				            sortable : true,
				            dataIndex:'lastModifiedBy',
				            flex:1.5
			            },
			            {
				        	text : 'Last Modified Date',
				          	width:120,
				            sortable : true,
				            dataIndex:'lastModifiedDate',
				            flex:1.5
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