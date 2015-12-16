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
				            text : 'Action',
				            width:150,
				            xtype:'actioncolumn',
				            flex:0.8,
				  	        items:[{
				  	        		icon:menuIcon,
				  	    			handler: 'showMenu'
	  	                          }]
	                    },
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
				        	text : 'SiteNumber',
				          	width:120,
				            sortable : true,
				            dataIndex:'siteNumber',
				            flex:1.5
			            },
		                {
				            text : 'Contact',
				            width:150,
				            dataIndex:'contact',
				            flex:1
                        },
                        {
				            text : 'Phone1',
				            width:150,
				            dataIndex:'phone1',
				            flex:1
                        },
                        {
				            text : 'Fax',
				            width:150,
				            dataIndex:'fax',
				            flex:1
                        },
                        {
				            text : 'Email',
				            width:150,
				            dataIndex:'email',
				            flex:1
                        },
                        {
				            text : 'SiteType',
				            width:150,
				            dataIndex:'siteType',
				            flex:1
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