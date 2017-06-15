Ext.define('AOC.view.address.AddressManage', {
	extend : 'Ext.Container',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.address.AddressManageGrid'],
	alias : 'widget.addressmanage',
	itemId : 'addressmanageitemId',
	initComponent : function() {
		Ext.apply(this, {
			layout :'fit', 
			items : [ {
    			xtype : 'container',
    			flex : 1.8,
    			layout:'card',
				itemId:'addressPanel',
				collapsible :false,
				activeItem: 0,
				hidden:false,
    			items:[{
    				xtype:'addressmanagegrid',
    				reference:'addressManagerGrid'
    			}
    			]
    		}]
	 	});
	 	this.callParent(arguments);
	}
});
