Ext.define('AOC.view.address.AddressManage', {
	extend : 'Ext.panel.Panel',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.address.AddressManageGrid'],
	alias : 'widget.addressmanage',
	itemId : 'addressmanageitemId',
	initComponent : function() {
		Ext.apply(this, {
			layout :'fit', 
			border:'4 4 4 4',	
			items : [ {
    			xtype : 'panel',
    			flex : 1.8,
    			layout:'card',
				itemId:'addressPanel',
				collapsible :false,
				activeItem: 0,
				hidden:false,
    			items:[{
    				xtype:'addressmanagegrid',
					CartId:1
    			}
    			]
    		}],
			dockedItems: [{
			    xtype: 'basetoolbar',
			    dock: 'top',
			    title:'Address-Manage',
			    items: [{
			    		  xtype : 'tbtext',
			    		  text : '<div style="color:"><b></b></div>',
			    		  itemId:'addresstitleItemid'
			    		}]
			}]
	 	});
	 	this.callParent(arguments);
	}
});
