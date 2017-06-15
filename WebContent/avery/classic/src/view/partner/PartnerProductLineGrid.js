Ext.define('AOC.view.partner.PartnerProductLineGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'partnerproductlinegriditemId',
    alias : 'widget.partnerproductlinegrid',
	requires:[
          'AOC.view.advsearch.ProductLineAdvanceSearch',
          'AOC.view.ux.CustomSearchField',
          'AOC.view.productline.ProductLineController'
	],
	controller:'productlineMain',
	cls:'aoc-panel',
	emptyText: AOCLit.emptyDataMsg,
	partnerid:null,
	partnerName:null,
	initComponent : function(){
	var me=this;
    Ext.apply(this,{
        columns : this.buildColumns(),
		columnLines:false,
        tbar: { 
        		height: AOC.config.Settings.config.defaultTbarHeight,
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
                align:'left',
	            flex:1.5,
	            renderer: function(v,cell,rec){
	                return me.partnerName;
	            }
	            
   			},
   			{
	        	text : AOCLit.RBOName,
	            sortable : true,
                align:'left',
	            dataIndex:'rboName',
                align:'left',
	            flex:1
            },
            {
            	text: AOCLit.partnerDataStructure,
            	sortable:true,
            	dataIndex:'dataStructureName',
                align:'left',
            	flex:1
            },
            {
	        	text : AOCLit.productLine,
	            sortable : true,
	            dataIndex:'productLineType',
                align:'left',
	            flex:1
            },
            {
	        	text : AOCLit.CSR,
	            sortable : true,
                align:'left',
	            dataIndex:'assignCSRName',
	            flex:1
            },
            {
	        	text : AOCLit.packingInstruction,
                align:'left',
	            sortable : true,
	            dataIndex:'packingInstruction',
	            flex:1
            },
            {
	            text : AOCLit.splitShipSetBy,
                align:'left',
	            dataIndex:'splitShipSetBy',
	            flex:1
            },
            {
                text: AOCLit.siteName,
                sortable: true,
                flex:1,
                dataIndex: 'siteName',
                align: 'left',
                listeners: {
                	'afterrender': Helper.siteNameForSuperAdminOnly
                }
            },
            {
                text: AOCLit.lastmodifiedby,
                align:'left',
                dataIndex: 'lastModifiedBy',
                flex:1
            }, 
            {
                text: AOCLit.lastmodifieddate,
                align:'left',
                dataIndex: 'lastModifiedDate',
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
			              text:'New',
			              itemId : 'newPartner',
			              handler:'createproductline',
			              iconCls:'fa fa-plus',
			              cls:'blue-btn',
			              hidden:false,
			              listeners:{
			                	'afterrender':function(obj){
			                		if(AOCRuntime.getUser().role == 3) obj.setHidden(true);
			                	}
			                }
		              },
		          '->',
		          {
		            	xtype: 'customsearchfield',
		            	searchCriteria:'',
		    			store : Ext.data.StoreManager.lookup(me.store),
		    			width: 200,
		    			emptyText: "Search by ProductLine"
					 },
					
		        		{
		    				xtype:'button',
		    				refrence:'advancesearchbutton',
		    				text:AOCLit.advSearchText,
		    				iconCls:'fa fa-search',
		    				iconAlign: "right",
		    				cls:'blue-btn',
		    				handler:'openAdvancedSearchWindow'
		    			 },
		    			 {
		 					hidden:true, 
		 					iconCls:'fa fa-times',
							cls:'blue-btn',
		 					itemId:'clearadvanedsearch',
		 					reference:'clearAdvSearch',
		 					handler:'clearAdvancedSearch',
		 					tooltip:'Clear Search'
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