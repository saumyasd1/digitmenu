Ext.define('AOC.view.taskmanager.TaskManagerGrid', {
	extend : 'Ext.grid.Panel',
	requires : ['AOC.util.Helper'],
	controller:'taskManagerController',
	itemId : 'TaskManagerGriditemId',
    alias : 'widget.taskManagergrid',
    reserveScrollbar:true,
    initComponent : function(){
    	var me=this;
        Ext.apply(this,{
            columns : this.buildColumns(),
    		columnLines:false,
    		dockedItems : this.buildDockedItems(),
    		store:Ext.create('AOC.store.TaskManagerStore', {
    				storeId:'TaskManagerStoreId'}),
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
      selType: 'checkboxmodel',
      buildColumns : function(){
      	var me=this;
  		        return [  {
			                xtype:'actioncolumn',
			                width:25,
				            header: '<img src="'+AOC.config.Settings.buttonIcons.menuIcon + '" />',
				            baseCls:'custom-action',
				  	        items:
				  	        [{
						  	    	  icon: AOC.config.Settings.buttonIcons.menuIcon,
						  	    	  handler: 'onClickMenu'
						  	    	
				  	      }]
				        },
  			            {
  				        	text : 'Date/Time',
  				            sortable : true,
  				            dataIndex:'createdDate',
  				            flex:0.5
  			            },
  			            {
  				        	text : 'From',
  				            sortable : true,
  				            dataIndex:'senderEmailId',
  				            flex:0.5
  			            },
  			            {
  				        	text :'Subject',
  				            sortable : true,
  				            dataIndex:'subject',
  				            flex:0.5
  			            },
  			            {
  				        	text :'CC',
  				            sortable : true,
  				            dataIndex:'ccMailId',
  				            flex:0.5
  			            },
  			          {
  				        	text :'Status',
  				            sortable : true,
  				            dataIndex:'status',
  				            flex:0.5
  			            },
  			            {
  				        	text :'CSR',
  				            sortable : true,
  				            dataIndex:'CSR',
  				            flex:0.5,
  				            editor: {
  			                xtype: 'checkbox',
  			                cls: 'x-grid-checkheader-editor'
  			            }
  			            }
          ]
      },
      buildtbar:function(){
  		var me=this;
  			return [
  			        {
  						xtype : 'tbtext',
  						itemId : 'TaskManagerTextId',
  						text : '<div style="color:"><b>Task Manager</b></div>'
  		               },
//  		               {
//  		                	xtype :'tbspacer',
//  		                	width :50
//  		        		},{
//  		        			xtype:'button',
//  		        			text:'View Mail',
//  		        			handler:'viewMail'
//  		        		},
//  		        		{
//  		        			xtype:'button',
//  		        			text:'Mark as Read'
//  		        		},
//  		        		{
//  		        			xtype:'button',
//  		        			text:'Disregard Mail'
//  		        		},
//  		        		{
//  		        			xtype:'button',
//  		        			text:'Assign to CSR'
//  		        		}
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
