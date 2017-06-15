Ext.define('AOC.view.archive.OrderLineDetailArchiveGrid', {
	extend : 'Ext.grid.Panel',
	itemId : 'orderLineDetailArchiveGrid',
    alias : 'widget.ar_orderlinedetail',
    //requires:['AOC.view.ux.CustomSearchField'],
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
            	            text : AOCLit.oracleItemNo,
            	          	width:120,
            	            sortable : true,
            	            dataIndex:'oracleitemnumber',
            	            flex:1.5
               			},
                         {
				        	text : AOCLit.Level,
				          	width:120,
				            sortable : true,
				            dataIndex:'level',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.SKUNo,
				          	width:120,
				            sortable : true,
				            dataIndex:'skuno',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.typeSetter,
				          	width:120,
				            sortable : true,
				            dataIndex:'typesetter',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.variableFieldName,
				          	width:120,
				            sortable : true,
				            dataIndex:'variablefieldname',
				            flex:1.5
			            },
			            {
				        	text : AOCLIt.variableDataValue,
				          	width:120,
				            sortable : true,
				            dataIndex:'variabledatavalue',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.fiberPercent,
				          	width:120,
				            sortable : true,
				            dataIndex:'fiberpercent',
				            flex:1.5
			            },
			            {
				        	text : AOCLit.sentToOracleDate,
				          	width:120,
				            sortable : true,
				            dataIndex:'senttooracledate',
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
	        		        html: AOCLit.advSearchTitle
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