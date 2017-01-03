Ext.define('AOC.view.partner.OrgGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.orggrid',
	emptyText: AOCLit.emptyDataMsg,
	store:null,
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
            	            text : 'Default',
            	          	width:50,
            	            dataIndex:'default',
            	            renderer:function(value){
            	            	return "<input type='radio' name="+me.uniqueName+"'default' "+ (value ? "checked='checked'":"")+ ">";
            	            }
               			},
                         {
				        	text : 'Org',
				          	width:120,
				            sortable : true,
				            dataIndex:'orgCodeId',
				            editor:{
				            	xtype:'combo',
				            	store:me.orgStore,
				            	displayField:'name',
				            	valueField:'id',
				            	listeners:{
				            		'render':function(cmp){
				            			var store=cmp.getStore();
				            	    	store.on('load',function(store) {
				            	    	      cmp.select(store.getAt(0).get('id'));
				            	    	    });
				            	    	store.load();
				            		}
				            	}
				            }
			            },
			            {
				        	text : 'Legacy Bill to Code',
				          	width:100,
				            sortable : true,
				            dataIndex:'billToCode',
				            editor:{
				            	xtype:'textfield'
				            }
			            },
			            {
				        	text : 'Legacy Ship to Code',
				          	width:100,
				            sortable : true,
				            dataIndex:'shipToCode',
				            editor:{
				            	xtype:'textfield'
				            }
			            },
			            {
				        	text : 'Freight Terms',
				          	width:120,
				            sortable : true,
				            dataIndex:'freightTerm',
				            editor: {
				                xtype: 'combo',
				                displayField: 'variableFieldName',
				                valueField: 'variableFieldName',
				                editable:false,
				                queryMode :'local',
				                store: Ext.data.StoreManager.lookup('FreightTermsId') == null ? AOC.util.Helper.getVariableComboStore('FreightTerms') : Ext.data.StoreManager.lookup('FreightTermsId')
				            }
			            },
                        {
				            text : 'Shipping method',
				            width:150,
				            dataIndex:'shippingMethod',
				            editor: {
				                xtype: 'combo',
				                displayField: 'variableFieldName',
				                valueField: 'variableFieldName',
				                editable:false,
				                queryMode :'local',
				                store: Ext.data.StoreManager.lookup('ShippingMethodId') == null ? AOC.util.Helper.getVariableComboStore('ShippingMethod') : Ext.data.StoreManager.lookup('ShippingMethodId')
				            }
                        },
                        {
				            text : 'Shipping Instructions',
				            width:150,
				            dataIndex:'shippingInstruction',
				            editor:{
				            	xtype:'textfield'
				            }
                        }
        ];
    }
});