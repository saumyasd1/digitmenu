Ext.define('AOC.view.archive.OrderFileQueueArchiveGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'orderFileQueueArchiveManageGriditemId',
    alias : 'widget.ar_orderfilequeue',
    controller:'orderqueue',
	emptyText:'<div align=center> No data to display.</div>',
	recordBeingEdit:null,
	initComponent : function(){
	var me=this;
    Ext.apply(this,{
        columns : this.buildColumns(),
		columnLines:true,
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
            	            text : 'Process Instance ID',
            	          	width:120,
            	            sortable : true,
            	            dataIndex:'pid',
            	            flex:1.5
               			},
                         {
				        	text : 'RBO',
				          	width:120,
				            sortable : true,
				            dataIndex:'rboname',
				            flex:1.5
			            },
			            {
				        	text : 'Partner',
				          	width:120,
				            sortable : true,
				            dataIndex:'partnerName',
				            flex:1.5
			            },
			            {
				        	text : 'Sender Email ID',
				          	width:120,
				            sortable : true,
				            dataIndex:'senderEmailID',
				            flex:1.5
			            },
			            {
				        	text : 'Subject',
				          	width:120,
				            sortable : true,
				            dataIndex:'subject',
				            flex:1.5
			            },
			            {
				        	text : 'Order Source',
				          	width:120,
				            sortable : true,
				            dataIndex:'orderSource',
				            flex:1.5
			            },
			            {
				        	text : 'Submitted By',
				          	width:120,
				            sortable : true,
				            dataIndex:'submittedBy',
				            flex:1.5
			            },
			            {
				        	text : 'Submitted Date',
				          	width:120,
				            sortable : true,
				            dataIndex:'submittedDate',
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
				        	text : 'Error',
				          	width:120,
				            sortable : true,
				            dataIndex:'error',
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