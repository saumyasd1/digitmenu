Ext.define('AOC.view.workinstruction.WIOrgGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.wiorggrid',
    referenceHolder:true,
    requires:['AOC.view.ux.RadioModel'],
	emptyText: AOCLit.emptyDataMsg,
	initComponent : function(){
		var me = this;
		
		Ext.apply(this,{
			columns : this.buildColumns(),
			columnLines:true,
			store: Ext.data.StoreManager.lookup('wiOrgStore') == null ? Ext.create('AOC.store.WIOrgStore',{storeId:'wiOrgStore'}) : Ext.data.StoreManager.lookup('wiOrgStore'),
			viewConfig : {
				stripeRows : true,
				columnLines:true,
				enableTextSelection : true
			},
			plugins: [{
				ptype: 'cellediting',
				clicksToEdit: 1,
				listeners:{
				}
			}],
			selModel: {
				selType: 'radiomodel'
			},
			listeners:{
				'afterrender':function(){
				},
				select:'onOrgGridRowSelect'
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
            	flex:1.5,
            	editor:{
            		xtype:'combo',
            		name:'orgExistFlag',
            		store:[['Yes','Yes'],['No','No']]
            	}	
            },
            {
            	text:'Bill to Site# <i data-qtip="<font color=#3892d3>Please fill in Oracle Customer site #/VIPS bill to number if it cannot be captured from the order form / if only 1 bill to code would be ordered</font>" class="fa fa-info-circle"></i>',
            	dataIndex:'billToCode',
            	editor:'textfield',
            	flex:1.5
            },
            {
            	text:'Ship to Site# <i data-qtip="<font color=#3892d3>Please fill in Oracle Customer site #/VIPS ship to number if it cannot be captured from the order form / if only 1 ship to code would be ordered</font>" class="fa fa-info-circle"></i>',
            	dataIndex:'shipToCode',
            	editor:'textfield',
            	flex:1.5
            },
            {
            	text:'Freight Term <i data-qtip="<font color=#3892d3>Please fill in Oracle Oracle Freight Term</font>" class="fa fa-info-circle"></i>',
            	dataIndex:'freightTerm',
            	editor:'textfield',
            	flex:1.5
            },
            {
            	text:'Shipping Method <i data-qtip="<font color=#3892d3>Please fill in Oracle Oracle Shipping Method</font>" class="fa fa-info-circle"></i>',
            	dataIndex:'shippingMethod',
            	editor:'textfield',
            	flex:1.5
            },
            {
            	text:'Shipping Instruction',
            	dataIndex:'shippingInstruction',
            	editor:'textfield',
            	flex:1.5
            }
        ];
    }
});

  