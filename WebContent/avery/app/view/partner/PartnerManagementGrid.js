Ext.define('AOC.view.partner.PartnerManagementGrid', {
	extend : 'Ext.grid.Panel',
	requires : ['AOC.view.partner.PartnerProductLineGrid','AOC.view.ux.CustomSearchField','AOC.util.Helper'],
	controller:'partnerMain',
	itemId : 'PartnerMangementitemId',
    alias : 'widget.partnermanagementgrid',
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
             		 var store= Ext.data.StoreManager.lookup('PartnerManagementStoreId');
             		 if(store==null){
             			 store=Ext.create('AOC.store.PartnerManagementStore', {
             					extend : 'Ext.data.Store',
             					model:'AOC.model.PartnerManagementModel',
             					autoLoad : true,
             					pageSize:pageSize,
             					storeId:'PartnerManagementStoreId',
             					proxy : {
             						type : 'rest',
             						url : applicationContext+'/rest/partners',
//             						url:'avery/app/data/orderheader.json',
             						reader:{
             					        type:'json', 
             					        rootProperty: 'partners',
             					        totalProperty: 'totalCount'
             					    }
             				}
             				});
             			 obj.bindStore(store);
             		 }
             		 store.load();
             	  }
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
		        return [       {
		           // header:"<img src="+menuIcon+">",
		            xtype:'actioncolumn',
		            width:25,
		            baseCls:'custom-action',
		  	        items:[
		  	      {
				  	    	  icon:menuIcon,
				  	    	  handler: 'showmenu'
		  	      }]
		        },
				          {
		        	       // header:"<img src="+editIcon+">",
				            xtype:'actioncolumn',
				            width:25,
				            baseCls:'custom-action',
				  	        items:[
							  	      {
							  	    	  icon:editIcon,
							  	    	  handler:'editpartnermanagement'
							  	      }]
		                },
        			    {  
            	            text : 'Partner Name',
            	          	width:120,
            	            sortable : true,
            	            dataIndex:'partnerName',
            	            flex:0.5
            	            
               			},
			            {
				        	text : 'Address',
				          	width:120,
				            sortable : true,
				            dataIndex:'address',
				            flex:1
			            },
			            {
				        	text : 'Contact Person',
				          	width:120,
				            sortable : true,
				            dataIndex:'contactPerson',
				            flex:0.5
			            },
			            {
				        	text : 'Phone',
				          	width:120,
				            sortable : true,
				            dataIndex:'phone',
				            flex:0.5
			            }
        ];
    },
	 buildtbar:function(){
		var me=this;
			return [
			        {
						xtype : 'tbtext',
						itemId : 'PartnertextItemId',
						text : '<div style="color:"><b>Partners</b></div>'
		               },
		               {
		                	xtype :'tbspacer',
		                	width :10
		        		},
				  {
		              icon: addImage,
		              text:'New',
		              itemId : 'newPartner',
		              handler:'createpartner',
		              hidden:false
		              },
		          '->',
		      	     {
		            	xtype: 'customsearchfield',
		            	searchCriteria:'',
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
//				       {
//							xtype:'button',
//							itemId:'advancesearchbutton',
//							text:advSearchText,
//							icon: advSearchIcon,
//							iconAlign: "right",
//					    	handler:'openAdvancedSearchWindow'
//					       
//						 },
					{
						itemId: 'clearadvanedsearch',
						hidden:true, 
						handler : 'clearAdvancedSerach',
						icon: clearSearchIcon
					}
		          ];
	},
	 buildDockedItems : function(){
    	var me=this;
        return [
			{
            xtype : 'pagingtoolbar',
            dock : 'bottom',
            ui : 'darktoolbar',
            itemId:'pagingtoolbar',
            store:me.store,
            displayInfo:true,
            plugins:Ext.create('Ext.ux.ProgressBarPager',{width:250})
            
        }];
    }
});