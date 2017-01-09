Ext.define('AOC.view.partner.PartnerProductLineGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'partnerproductlinegriditemId',
    alias : 'widget.partnerproductlinegrid',
	requires:['AOC.view.advsearch.ProductLineAdvanceSearch'],
	controller:'productlineMain',
	emptyText: AOCLit.emptyDataMsg,
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
            	            text : AOCLit.partnerName,
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
			            	text:'Data Structure Name',
			            	width:120,
			            	sortable:true,
			            	dataIndex:'dataStructureName'
			            },
			            {
				        	text : AOCLit.productLine,
				          	width:120,
				            sortable : true,
				            dataIndex:'productLineType',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.CSR,
				          	width:120,
				            sortable : true,
				            dataIndex:'csrName',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.packingInstruction,
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
	     				text : '<div style="color:"><b>Partner Data Structure-Manage</b></div>'
	                    },
	                    {
	                     	xtype :'tbspacer',
	                     	width :10
	             		},
				     {
			              icon:  AOC.config.Settings.buttonIcons.addImage,
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
		    			emptyText: "Search Data Structure "
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
		        		        html:AOCLit.advSearchTitle
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
						icon:  AOC.config.Settings.buttonIcons.clearSearchIcon
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
			pageSize:pageSize,
            plugins:Ext.create('Ext.ux.ProgressBarPager',{width:250})
            
        }];
    }
});