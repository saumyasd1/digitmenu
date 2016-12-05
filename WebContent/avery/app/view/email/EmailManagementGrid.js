Ext.define('AOC.view.email.EmailManagementGrid', {
	extend : 'Ext.grid.Panel',
	requires : ['AOC.util.Helper'],
	controller:'emailQueueController',
	itemId : 'EmailMangementitemId',
    alias : 'widget.emailmanagementgrid',
    reserveScrollbar:true,
    initComponent : function(){
    	var me=this;
        Ext.apply(this,{
            columns : this.buildColumns(),
    		columnLines:false,
    		dockedItems : this.buildDockedItems(),
    		store:Ext.create('AOC.store.EmailManagementStore', {
    				storeId:'EmailManagementStoreId'}),
//    		listeners:{
//    	        activate:function(obj){
//    			             	 me.down('pagingtoolbar').bindStore(obj.getStore());
//    			             	  }
//    			 },		
            tbar: { 
            	    height: 50,
        		    items : me.buildtbar()
                  },
            viewConfig : {
    	            stripeRows : true,
    	            enableTextSelection : true
            }
        });
           this.callParent(arguments);
      },
      buildColumns : function(){
      	var me=this;
  		        return [       {
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
  				            xtype:'actioncolumn',
  				            width:25,
  				            baseCls:'custom-action'
  				  	        //items:[
//  							  	      {
//  							  	    	  icon: AOC.config.Settings.buttonIcons.editIcon,
//  							  	    	  handler:'editpartnermanagement'
//  							  	      }]
  		                },
          			    {  
              	            text : 'Tracking #',
              	          	width:120,
              	            sortable : true,
              	            dataIndex:'trackingId',
              	            flex:0.5
              	            
                 			},
  			            {
  				        	text : 'Partner Name',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'partnerName',
  				            flex:1
  			            },
  			            {
  				        	text : 'Sender Email Id',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'senderEmailId',
  				            flex:0.5
  			            },
  			            {
  				        	text :'Subject',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'subject',
  				            flex:0.5
  			            },
  			            {
  				        	text :'Email',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'email',
  				            flex:0.5
  			            },
  			            {
  				        	text :'Status',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'status',
  				            flex:0.5
  			            },
  			            {
  				        	text :'Received Date',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'receivedDate',
  				            flex:0.5
  			            },
  			          {
  				        	text :'Read Date',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'readDate',
  				            flex:0.5
  			            },
  			          {
  				        	text :'Acknowledged Date',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'acknowledgedDate',
  				            flex:0.5
  			            },
  			          {
  				        	text :'CC',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'cc',
  				            flex:0.5
  			            }
          ]
      },
      buildtbar:function(){
  		var me=this;
  			return [
  			        {
  						xtype : 'tbtext',
  						itemId : 'EmailQueueTextId',
  						text : '<div style="color:"><b>Email Queue</b></div>'
  		               },
  		               {
  		                	xtype :'tbspacer',
  		                	width :10
  		        		},
  		          '->',
  		      	     {
  		            	xtype: 'customsearchfield',
  		            	searchCriteria:'',
  		    			store : Ext.data.StoreManager.lookup(me.store),
  		    			width: 200,
  		    			emptyText: "Search Email "
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
             plugins:Ext.create('Ext.ux.ProgressBarPager',{width:250})
             
         }];
     }
    
});
