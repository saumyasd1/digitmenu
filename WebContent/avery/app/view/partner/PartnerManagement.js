Ext.define('AOC.view.partner.PartnerManagement', {
	extend : 'Ext.Container',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.partner.PartnerManagementGrid'],
	alias : 'widget.partnermanagement',
	itemId : 'partnermanagementitemId',
	initComponent : function() {
		Ext.apply(this, {
			layout :'fit', 
			border:'4 4 4 4',	
			items : [ {
    			xtype : 'container',
    			flex : 1.8,
    			layout:'card',
				itemId:'partnerPanel',
				collapsible :false,
				activeItem: 0,
				hidden:false,
    			items:[{
    				xtype:'partnermanagementgrid',
					CartId:1
    			},
    			{
    				xtype:'partnerproductlinegrid',
					CartId:1,
					itemId: 'partnerproductlinegriditemId'
					
    			}
    			]
    		}]
	 	});
	 	this.callParent(arguments);
	}
});
