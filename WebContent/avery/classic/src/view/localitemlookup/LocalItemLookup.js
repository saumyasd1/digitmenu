Ext.define('AOC.view.localitemlookup.LocalItemLookup', {
	extend : 'Ext.Container',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.localitemlookup.LocalItemLookupGrid'],
	alias : 'widget.localitemlookup',
	itemId : 'localItemLookupItemId',
	initComponent : function() {
		Ext.apply(this, {
			layout :'fit', 
			items : [ {
    			xtype : 'container',
    			flex : 1.8,
    			layout:'card',
				itemId:'localItemLookupPanel',
				collapsible :false,
				activeItem: 0,
				hidden:false,
    			items:[{
    				xtype:'localitemlookupgrid',
    				reference:'localItemLookupGrid'
    			}
    			]
    		}]
	 	});
	 	this.callParent(arguments);
	}
});
