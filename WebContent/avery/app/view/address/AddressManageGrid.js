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
		columnLines:false,
        tbar: { height: 40,
    		    items : me.buildtbar()
              },
              listeners:{
            	  activate:function(obj){
             		 var store= Ext.data.StoreManager.lookup('AddressStoreId');
             		 if(store==null){
             			 store=Ext.create('AOC.store.AddressStore', {
             					extend : 'Ext.data.Store',
             					model:'AOC.model.AddressModel',
             					autoLoad : true,
             					pageSize:pageSize,
             					storeId:'AddressStoreId',
             					proxy : {
             						type : 'rest',
             						url : applicationContext+'/rest/address',
//             						url:'avery/app/data/orderheader.json',
             						reader:{
             					        type:'json', 
             					        rootProperty: 'address',
             					        totalProperty: 'totalCount'
             					    }
             				}
             				});
             			 obj.bindStore(store);
             			me.down('pagingtoolbar').bindStore(store);
             		 }
             		 store.load();
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
				  	        		icon:menuIcon,
				  	    			handler: 'onClickMenu'
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
					xtype : 'tbtext',
					itemId : 'PartnertextItemId',
					text : '<div style="color:"><b>Address-Manage</b></div>'
				   },
				   {
				    	xtype :'tbspacer',
				    	width :10
					},
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
	    			emptyText: "Search Partner Name "
				 },
				 {
	                	xtype :'tbspacer',
	                	width :10
	        		},
	        		{
	        		    xtype: 'component',
	        		    itemId:'advancesearchbutton',
	        		    autoEl: {
	        		        tag: 'a',
	        		        href: '#',
	        		        html:'<font color=#3300FF><b>Advanced Search</b></font>'
	        		    },
	        		    listeners: {
	        		    	 el : {
	        		    		    click    : 'openAdvancedSearchWindow'
	        		    		    
	        		    	 }
	        	            }
	        		},
//	            {
//					xtype:'button',
//					refrence:'advancesearchbutton',
//					text:advSearchText,
//					icon   : advSearchIcon,
//					iconAlign: "right",
//					handler:'openAdvancedSearchWindow'
//				 },
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