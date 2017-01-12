Ext.define('AOC.view.partner.PartnerManagementGrid', {
	extend : 'Ext.grid.Panel',
	requires : ['AOC.view.partner.PartnerProductLineGrid','AOC.view.ux.CustomSearchField','AOC.util.Helper'],
	controller:'partnerMain',
	itemId : 'PartnerMangementitemId',
    alias : 'widget.partnermanagementgrid',
	emptyText: AOCLit.emptyDataMsg,
	recordBeingEdit:null,
	initComponent : function(){
	var me=this;
    Ext.apply(this,{
        columns : this.buildColumns(),
		columnLines:false,
		store:Ext.create('AOC.store.PartnerManagementStore', {
				storeId:'PartnerManagementStoreId'}),
		listeners:{
	        activate:function(obj){
			             	 me.down('pagingtoolbar').bindStore(obj.getStore());
			             	  }
			 },		
        tbar: { height: AOC.config.Settings.config.defaultTbarHeight,
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
		            xtype:'actioncolumn',
		            width:25,
		            baseCls:'custom-action',
		  	        items:[
		  	               {
				  	    	  icon: AOC.config.Settings.buttonIcons.menuIcon,
				  	    	  handler: 'onClickMenu'
				  	    	
		  	      }]
		        },
        			    {  
            	            text : AOCLit.partnerName,
            	          	width:120,
            	            sortable : true,
            	            dataIndex:'partnerName',
            	            flex:0.5
            	            
               			},
			            {
				        	text : AOCLit.address,
				          	width:120,
				            sortable : true,
				            dataIndex:'address',
				            flex:1
			            },
			            {
				        	text : AOCLit.contactPerson,
				          	width:120,
				            sortable : true,
				            dataIndex:'contactPerson',
				            flex:0.5
			            },
			            {
				        	text : AOCLit.Phone,
				          	width:120,
				            sortable : true,
				            dataIndex:'phone',
				            flex:0.5
			            },
			            {
							text :AOCLit.lastmodifiedby,
							dataIndex:'lastModifiedBy',
							width:120
						},
						{
							text :AOCLit.lastmodifieddate,
							dataIndex:'lastModifiedDate',
							width:120
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
		              icon:  AOC.config.Settings.buttonIcons.addImage,
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
		    				xtype:'button',
		    				refrence:'advancesearchbutton',
		    				text:AOCLit.advSearchText,
		    				icon   :  AOC.config.Settings.buttonIcons.advSearchIcon,
		    				iconAlign: "right",
		    				handler:'openAdvancedSearchWindow'
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