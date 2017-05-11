Ext.define('AOC.view.address.AddressManageGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'AddressManageGriditemId',
    alias : 'widget.addressmanagegrid',
    requires:['AOC.view.ux.CustomSearchField','AOC.view.address.AddressController'],
    controller:'addressMain',
	emptyText:AOCLit.emptyDataMsg,
	cls:'aoc-panel',
	recordBeingEdit:null,
	initComponent : function(){
	var me=this;
		userInfo = AOCRuntime.getUser(),
		roleId = userInfo.role,
		siteId = userInfo.siteId,
		userId = userInfo.id,
		userEmailId = userInfo.email;

    Ext.apply(this,{
        columns : this.buildColumns(),
		columnLines:false,
        tbar: { height:AOC.config.Settings.config.defaultTbarHeight,
    		    items : me.buildtbar()
              },
        store:Ext.create('AOC.store.AddressStore', {
				storeId:'AddressStoreId'
			}),
              listeners:{
            	  activate:function(obj){
             			 obj.down('pagingtoolbar').bindStore(obj.getStore());
             			 obj.getStore().proxy.extraParams = { siteId:siteId,roleId:roleId,userId:userId,userEmailId:userEmailId };
             		 }
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
				            text : '',
				            width:20,
				            xtype:'actioncolumn',
				  	        items:[{
				  	        		icon: AOC.config.Settings.buttonIcons.menuIcon,
				  	    			handler: 'onClickMenu'
	  	                          }]
	                    },
        			    {  
            	            text : AOCLit.orgCode,
            	          	width:120,
            	            sortable : true,
            	            dataIndex:'orgCode',
            	            flex:1.5
               			},
                         {
				        	text : AOCLit.partnerName,
				          	width:120,
				            sortable : true,
				            dataIndex:'partnerName',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.address,
				          	width:120,
				            sortable : true,
				            dataIndex:'address',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.siteNumber,
				          	width:120,
				            sortable : true,
				            dataIndex:'siteNumber',
				            flex:1.5
			            },
		                {
				            text : AOCLit.Contact,
				            width:150,
				            dataIndex:'contact',
				            flex:1
                        },
                        {
				            text : AOCLit.Phone1,
				            width:150,
				            dataIndex:'phone1',
				            flex:1
                        },
                        {
				            text : AOCLit.fax,
				            width:150,
				            dataIndex:'fax',
				            flex:1
                        },
                        {
				            text : AOCLit.Email,
				            width:150,
				            dataIndex:'email',
				            flex:1
                        },
                        {
				            text : AOCLit.siteType,
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
					xtype : 'tbtext',
					itemId : 'addressManagetextItemId',
					text : '<div style="color:"><b>Address-Manage</b></div>'
				   },
				  {
		              //icon:  AOC.config.Settings.buttonIcons.addImage,
		              text:'New',
		              itemId :'newAddress',
		              iconCls:'fa fa-plus',
		              cls:'blue-btn',
		              ui:'blue',
		              handler:'openAddAddressWindow'
		         },
					 '->',
				{
	            	xtype: 'customsearchfield',
	            	searchCriteria:'',
	            	message:'Showing all accounts with',
	    			store : Ext.data.StoreManager.lookup(me.store),
	    			width: 200,
	    			emptyText: "Search by Site Number"
				 },
	            {
					xtype:'button',
					refrence:'advancesearchbutton',
					text:AOCLit.advSearchText,
					//icon   :  AOC.config.Settings.buttonIcons.advSearchIcon,
					iconCls:'fa fa-search',
    				iconAlign: "right",
    				ui:'blue',
    				cls:'blue-btn',
					handler:'openAdvancedSearchWindow'
				 },
				 {
						hidden:true, 
						//icon   :  AOC.config.Settings.buttonIcons.clearSearchIcon,
						iconCls:'fa fa-times',
						ui:'blue',
						cls:'blue-btn',
						itemId:'clearadvanedsearch',
						reference:'clearAdvSearch',
						handler:'clearAdvancedSearch',
						tooltip:'Clear Search'
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
			pageSize:pageSize,
            plugins:Ext.create('Ext.ux.ProgressBarPager',{width:250})
            
        }];
    }
});