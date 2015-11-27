Ext.define('AOC.view.address.AddressManageGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'AddressManageGriditemId',
    alias : 'widget.addressmanagegrid',
    requires:['AOC.view.ux.CustomSearchField'],
    controller:'addressMain',
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
	            stripeRows : false,
	            enableTextSelection : true
        }
    });
       this.callParent(arguments);
  },
  buildColumns : function(){
    	var me=this;
        return [
        			    {  
            	            text : 'ORG Code',
            	          	width:120,
            	            sortable : true,
            	            dataIndex:'orgCode',
            	            flex:1.5
               			},
                         {
				        	text : 'Partner Name',
				          	width:120,
				            sortable : true,
				            dataIndex:'partnerName',
				            flex:1.5
			            },
			            {
				        	text : 'Address',
				          	width:120,
				            sortable : true,
				            dataIndex:'address',
				            flex:1.5
			            },
			            {
				        	text : 'Bill to site#',
				          	width:120,
				            sortable : true,
				            dataIndex:'billToSiteNumber',
				            flex:1.5
			            },
			            {
				        	text : 'Ship to site#',
				          	width:120,
				            sortable : true,
				            dataIndex:'shipToSiteNumber',
				            flex:1.5
			            },
		                {
				            text : 'Bill to contact',
				            width:150,
				            dataIndex:'billToContact',
				            flex:1
                        },
                        {
				            text : 'Bill to tel#',
				            width:150,
				            dataIndex:'billToPhone1',
				            flex:1
                        },
                        {
				            text : 'Ship to contact',
				            width:150,
				            dataIndex:'shipToContact',
				            flex:1
                        },
                        {
				            text : 'Ship to tel#',
				            width:150,
				            dataIndex:'shipToPhone1',
				            flex:1
                        },
                        {
				            text : 'Action',
				            width:150,
				            xtype:'actioncolumn',
				            flex:1,
				  	        items:[{
				  	        		icon:menuIcon,
				  	    			handler: 'showMenu'
				  	      }]
                        }
        ];
    },
	 buildtbar:function(){
		var me=this;
			return [
				  {
		              icon: addImage,
		              text:'New',
		              itemId :'newAddress',
		              handler:'openAddAddressWindow'
		         },
					 '->',
				{
	            	xtype: 'customsearchfield',
	            	searchCriteria:'',
	            	message:'Showing all accounts with',
	    			store : Ext.data.StoreManager.lookup(me.store),
	    			width: 200,
	    			emptyText: "Quick Search:Partner Name "
				 },
	            {
					xtype:'button',
					refrence:'advancesearchbutton',
					text:advSearchText,
					icon   : advSearchIcon,
					iconAlign: "right",
					handler:'openAdvancedSearchWindow'
				 },
			{
				hidden:true, 
				itemId:'clearadvanedsearch',
				handler:'clearAdvancedSerach',
				icon:clearSearchIcon
			}
		          ];
	},
	 buildDockedItems : function(){
        return [
			{
            xtype : 'pagingtoolbar',
            dock : 'bottom',
            ui : 'darktoolbar',
            itemId:'pagingtoolbar',
            displayInfo:true,
            plugins:Ext.create('Ext.ux.ProgressBarPager',{width:250})
            
        }];
    }
});