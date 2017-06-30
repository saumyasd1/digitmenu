Ext.define('AOC.view.partner.PartnerManagement', {
	extend : 'Ext.Container',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.partner.PartnerManagementGrid'],
	alias : 'widget.partnermanagement',
	itemId : 'partnermanagementitemId',
	initComponent : function() {
		Ext.apply(this, {
			layout :'fit', 
			items : [ {
    			xtype : 'container',
    			flex : 1.8,
    			layout:'card',
				itemId:'partnerPanel',
				activeItem: 0,
    			items:[
//    			       {
//    				xtype:'partnermanagementgrid',
//    				reference:'partnerManagementGrid'
//    			},
    			{
    				xtype:'partnerproductlinegrid',
    				reference:'partnerProductLineGrid',
					itemId: 'partnerproductlinegriditemId'
    			}
    			]
    		}]
	 	});
	 	this.callParent(arguments);
	}
});
