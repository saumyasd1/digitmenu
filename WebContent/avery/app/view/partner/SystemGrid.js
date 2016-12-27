Ext.define('AOC.view.partner.SystemGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.systemgrid',
	emptyText: AOCLit.emptyDataMsg,
	initComponent : function(){
	var me=this;
    Ext.apply(this,{
        columns : this.buildColumns(),
		columnLines:true,
        viewConfig : {
	            stripeRows : true,
	            enableTextSelection : true
        },
        plugins: [{
	        ptype: 'cellediting',
	        clicksToEdit: 1
	    }]
    });
       this.callParent(arguments);
  },
  buildColumns : function(){
    	var me=this;
        return [          
        			    {  
            	            text : 'CSR Name',
            	          	width:120,
            	            sortable : true,
            	            flex:1.5,
            	            dataIndex:'csrName',
            	            editor:{
				            	xtype:'textfield'
				            }
            	            
               			},
                         {
				        	text : 'Packing Instruction',
				          	width:120,
				            sortable : true,
				            dataIndex:'packingInstruction',
				            flex:1.5,
				            editor:{
				            	xtype:'textfield'
				            }
			            },
			            {
				        	text : 'Manu. Note',
				          	width:120,
				            sortable : true,
				            dataIndex:'manufacturingNotes',
				            flex:1.5,
				            editor:{
				            	xtype:'textfield'
				            }
			            },
			            {
				        	text : 'Invoice Note',
				          	width:120,
				            sortable : true,
				            dataIndex:'invoiceNote',
				            flex:1.5,
				            editor:{
				            	xtype:'textfield'
				            }
			            },
			            {
				        	text : 'Variable data breakdown',
				          	width:120,
				            sortable : true,
				            dataIndex:'variableDataBreakdown',
				            flex:1.5,
				            editor:{
				            	xtype:'textfield'
				            }
			            },
                        {
				            text : 'Split by Ship Set',
				            width:150,
				            dataIndex:'splitShipSetBy',
				            flex:1,
				            editor: {
				                xtype: 'combo',
				                displayField: 'variableFieldName',
				                valueField: 'variableFieldName',
				                editable:false,
				                queryMode :'local',
				                store: Ext.data.StoreManager.lookup('SplitShipsetId') == null ? AOC.util.Helper.getVariableComboStore('SplitShipset') : Ext.data.StoreManager.lookup('SplitShipsetId')
				            }
                        },
                        {
				            text : 'Ship mark',
				            width:150,
				            dataIndex:'shippingMark',
				            flex:1,
				            editor:{
				            	xtype:'textfield'
				            }
                        },
                        {
				            text : 'Artwork Hold',
				            width:150,
				            dataIndex:'artworkHold',
				            editor:{
				            	xtype:'combo',
				            	editable:false,
				            	store:[[true,'Y'],[false,'N']]
				            },
				            renderer:function(value, metadata,rec){
				            	if(Ext.isEmpty(value))
				            		return '';
				            	var v='N';
				            	if(value)
				            		v='Y';
				    			return '<div>'+v+'</div>';
				        }
                        }
        ];
    }
});