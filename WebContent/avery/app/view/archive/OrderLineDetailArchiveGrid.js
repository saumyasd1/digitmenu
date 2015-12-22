Ext.define('AOC.view.archive.OrderLineDetailArchiveGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'orderLineDetailArchiveGrid',
    alias : 'widget.ar_orderlinedetail',
    //requires:['AOC.view.ux.CustomSearchField'],
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
            	            text : 'Oracle Item Number',
            	          	width:120,
            	            sortable : true,
            	            dataIndex:'oracleitemnumber',
            	            flex:1.5
               			},
                         {
				        	text : 'Level',
				          	width:120,
				            sortable : true,
				            dataIndex:'level',
				            flex:1.5
			            },
			            {
				        	text : 'SKUno',
				          	width:120,
				            sortable : true,
				            dataIndex:'skuno',
				            flex:1.5
			            },
			            {
				        	text : 'Typesetter',
				          	width:120,
				            sortable : true,
				            dataIndex:'typesetter',
				            flex:1.5
			            },
			            {
				        	text : 'Variable Field Name',
				          	width:120,
				            sortable : true,
				            dataIndex:'variablefieldname',
				            flex:1.5
			            },
			            {
				        	text : 'Variable Data Value',
				          	width:120,
				            sortable : true,
				            dataIndex:'variabledatavalue',
				            flex:1.5
			            },
			            {
				        	text : 'Fiber Percent',
				          	width:120,
				            sortable : true,
				            dataIndex:'fiberpercent',
				            flex:1.5
			            },
			            {
				        	text : 'Sent To Oracle Date',
				          	width:120,
				            sortable : true,
				            dataIndex:'senttooracledate',
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