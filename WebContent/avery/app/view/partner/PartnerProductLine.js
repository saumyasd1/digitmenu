Ext.define('AOC.view.partner.PartnerProductLine', {
	extend : 'Ext.panel.Panel',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.partner.PartnerProductLineGrid'],
	alias : 'widget.partnerproductline',
	itemId : 'partnerproductlineitemId',
	initComponent : function() {
		Ext.apply(this, {
			layout :'fit', 
			border:'4 4 4 4',	
			items : [{ 
			        	xtype : 'partnerproductlinegrid'
					}]
	 	});
	 	this.callParent(arguments);
	}
});
