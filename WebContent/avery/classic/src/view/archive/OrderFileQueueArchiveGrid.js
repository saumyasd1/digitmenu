Ext.define('AOC.view.archive.OrderFileQueueArchiveGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'orderFileQueueArchiveManageGriditemId',
    alias : 'widget.ar_orderfilequeue',
    controller:'orderqueue',
	emptyText: AOCLit.emptyDataMsg,
	recordBeingEdit:null,
	initComponent : function(){
	var me=this;
    Ext.apply(this,{
        columns : this.buildColumns(),
		columnLines:false,
		tbar: { height: 40,
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
            	            text :AOCLit.processInstanceID,
            	          	width:120,
            	            sortable : true,
            	            dataIndex:'pid',
            	            flex:1.5
               			},
                         {
				        	text : AOCLit.RBO,
				          	width:120,
				            sortable : true,
				            dataIndex:'rboname',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.Partner,
				          	width:120,
				            sortable : true,
				            dataIndex:'partnerName',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.senderEmailID,
				          	width:120,
				            sortable : true,
				            dataIndex:'senderEmailID',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.Subject,
				          	width:120,
				            sortable : true,
				            dataIndex:'subject',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.orderSource,
				          	width:120,
				            sortable : true,
				            dataIndex:'orderSource',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.submittedBy,
				          	width:120,
				            sortable : true,
				            dataIndex:'submittedBy',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.submittedDate,
				          	width:120,
				            sortable : true,
				            dataIndex:'submittedDate',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.Status,
				          	width:120,
				            sortable : true,
				            dataIndex:'status',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.Error,
				          	width:120,
				            sortable : true,
				            dataIndex:'error',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.lastModifiedBy,
				          	width:120,
				            sortable : true,
				            dataIndex:'lastModifiedBy',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.lastModifiedDate,
				          	width:120,
				            sortable : true,
				            dataIndex:'lastModifiedDate',
				            flex:1.5
			            }
        ];
    },
    buildtbar:function(){
		var me=this;
		 	return [
				    '->' ,
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
		 var me = this;
        return [
			{
            xtype : 'pagingtoolbar',
            dock : 'bottom',
            ui : 'darktoolbar',
            itemId:'pagingtoolbar',
            displayInfo:true,
            store:me.store,
            plugins:Ext.create('Ext.ux.ProgressBarPager',{width:250})
            
        }];
    }
});