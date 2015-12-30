Ext.define('AOC.view.partner.PartnerProductLineGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'partnerproductlinegriditemId',
    alias : 'widget.partnerproductlinegrid',
	requires:['AOC.view.advsearch.ProductLineAdvanceSearch'],
	controller:'productlineMain',
	emptyText:'<div align=center> No data to display.</div>',
	partnerid:null,
	partnerName:null,
	initComponent : function(){
	var me=this;
    Ext.apply(this,{
        columns : this.buildColumns(),
		columnLines:false,
        tbar: { 
        		height: 40,
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
				            text : '',
				            width:20,
				            xtype:'actioncolumn',
				  	        items:[{
						  	    	  icon:menuIcon,
						  	    	  handler: 'onClickMenu'
  	                              }]
                        },
        			    {  
            	            text : 'Partner Name',
            	          	width:120,
            	            sortable : true,
            	            flex:1.5,
            	            renderer: function(v,cell,rec){
    			                return me.partnerName;
    			            }
            	            
               			},
                         {
				        	text : 'RBO Name',
				          	width:120,
				            sortable : true,
				            dataIndex:'rboName',
				            flex:1.5
			            },
			            {
				        	text : 'Product Line',
				          	width:120,
				            sortable : true,
				            dataIndex:'productLineType',
				            flex:1.5
			            },
			            {
				        	text : 'CSR',
				          	width:120,
				            sortable : true,
				            dataIndex:'csrName',
				            flex:1.5
			            },
			            {
				        	text : 'Packing Instruction',
				          	width:120,
				            sortable : true,
				            dataIndex:'packingInstruction',
				            flex:1.5
			            },
                        {
				            text : 'Split Ship Set',
				            width:150,
				            dataIndex:'splitShipSetBy',
				            flex:1
                        }
                      
        ];
    },
	 buildtbar:function(){
		var me=this;
			return [  	{
			    		    xtype: 'component',
			    		    autoEl: {
			    		    	tag: 'img',
						        src: AOC.config.Settings.buttonIcons.backIcon
			    		    },
				    		    listeners: {
				    		    	 el : {
				    		    		    click    : 'backButton'
				    		    	 }
    	                      }
    		         },
	                 {
	     				xtype : 'tbtext',
	     				itemId : 'ProductlinetextItemId',
	     				text : '<div style="color:"><b>Partner Product Line-Manage</b></div>'
	                    },
	                    {
	                     	xtype :'tbspacer',
	                     	width :10
	             		},
				     {
			              icon: addImage,
			              text:'New',
			              itemId : 'newPartner',
			              handler:'createproductline',
			              hidden:false
		              },
		          '->',
		          {
		            	xtype: 'customsearchfield',
		            	searchCriteria:'',
		    			store : Ext.data.StoreManager.lookup(me.store),
		    			width: 200,
		    			emptyText: "Search Product Line "
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