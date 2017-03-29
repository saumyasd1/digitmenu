Ext.define('AOC.view.workinstruction.WIOrgGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.wiorggrid',
    referenceHolder:true,
	emptyText: AOCLit.emptyDataMsg,
	initComponent : function(){
		var me = this;
		
		Ext.apply(this,{
			columns : this.buildColumns(),
			columnLines:true,
			store: Ext.data.StoreManager.lookup('wiOrgStore') == null ? Ext.create('AOC.store.WIOrgStore',{storeId:'wiOrgStore'}) : Ext.data.StoreManager.lookup('wiOrgStore'),
			viewConfig : {
				stripeRows : true,
				enableTextSelection : true
			},
			plugins: [{
				ptype: 'cellediting',
				clicksToEdit: 1,
				listeners:{
					//beforeedit:'OnBeforeEdit'
				}
			}],
			selModel: 'checkboxmodel',
			listeners:{
				'afterrender':function(){
				}
			}
		});
		this.callParent(arguments);
	},
	buildColumns : function(){
    	var me = this;
        return [
            {
            	text:'System',
            	dataIndex:'systemName',
            	flex:1
            },
            {
            	text:'Site',
            	dataIndex:'siteName',
            	flex:1
            },
            {
            	text:'Org',
            	dataIndex:'orgName',
            	flex:1
            },
            {
            	text:'Please select \"Yes\" if Org exist in this WI',
            	dataIndex:'orgExistFlag',
            	flex:1,
            	editor:{
            		xtype:'combo',
            		name:'orgExistFlag',
            		store:[['Yes','Yes'],['No','No']]
            	}	
            },
            {
            	text:'Bill to Site#',
            	dataIndex:'billToCode',
            	editor:'textfield',
            	flex:1
            },
            {
            	text:'Ship to Site#',
            	dataIndex:'shipToCode',
            	editor:'textfield',
            	flex:1
            },
            {
            	text:'Freight Term',
            	dataIndex:'freightTerm',
            	editor:'textfield',
            	flex:1
            },
            {
            	text:'Shipping Method',
            	dataIndex:'shippingMethod',
            	editor:'textfield',
            	flex:1
            },
            {
            	text:'Shipping Instruction',
            	dataIndex:'shippingInstruction',
            	editor:'textfield',
            	flex:1
            }
        ];
    }
});

  