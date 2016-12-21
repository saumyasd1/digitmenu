Ext.define('AOC.view.email.EmailManagementGrid', {
	extend : 'Ext.grid.Panel',
	requires : ['AOC.util.Helper'],
	controller:'emailManagementController',
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
    		listeners:{
    	        activate:function(obj){
    			             	 me.down('pagingtoolbar').bindStore(obj.getStore());
    			             	  }
    			 },		
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
  		        return [  {
  		        	header: '<img src="' +  AOC.config.Settings.buttonIcons.menuIcon + '" />',
  		            //text:'',
  		            width:25,
  					xtype:'actioncolumn',
  					menuDisabled  :true,
  					baseCls:'custom-action',
  					items:[{
  					  icon: AOC.config.Settings.buttonIcons.menuIcon,
  					  handler:'onClickMenu'//'showMenu'
  				  }]
  		        },
  		      {
  		       	header: '<img src="' +  AOC.config.Settings.buttonIcons.commentIcon + '" />',
  	            width:40,
  				dataIndex:'Comments',
  				menuDisabled  :true,
  				baseCls:'custom-action',
  				renderer:function(value, metadata,rec){
  					if(value){
  						var comment=Ext.String.htmlEncode(rec.data.Comments);
  			           return '<div><img data-qtip="<font color=blue>'+comment+'</font>"  src="' +  AOC.config.Settings.buttonIcons.commentIcon + '" /></div>';
  					}
  					else
  						return '';
  				} 
  			   	},
  				          {
  				            xtype:'actioncolumn',
  				            width:25,
  				            baseCls:'custom-action'
  		                },
          			    {  
              	            text : 'Tracking #',
              	          	width:120,
              	            sortable : true,
              	            dataIndex:'Tracking #',
              	            flex:1
              	            
                 			},
  			            {
  				        	text : 'Partner Name',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'Partner Name',
  				            flex:1
  			            },{

  				        	text : 'RBO',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'RBO',
  				            flex:1
  			            
  			            },
  			            {
  				        	text : 'Sender Email Id',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'Sender Email Id',
  				            flex:1
  			            },
  			            {
  				        	text :'Subject',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'Subject',
  				            flex:1
  			            },
  			            {
  				        	text :'Email',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'Email',
  				            flex:1
  			            },
  			            {
  				        	text :'Status',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'Status',
  				            flex:1
  			            },
  			            {
  				        	text :'Received Date',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'Received Date',
  				            flex:1
  			            },
  			          {
  				        	text :'Read Date',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'Read Date',
  				            flex:1
  			            },
  			          {
  				        	text :'Acknowledged Date',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'Acknowledged Date',
  				            flex:1
  			            },
  			          {
  				        	text :'CC',
  				          	width:120,
  				            sortable : true,
  				            dataIndex:'CC',
  				            flex:1
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
