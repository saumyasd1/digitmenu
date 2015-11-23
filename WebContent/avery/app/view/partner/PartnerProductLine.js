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
					}],
			dockedItems: [{
			    xtype: 'basetoolbar',
			    dock: 'top',
			    title:'Partner Product Line-Manage',
			    items: [{
			    		  xtype : 'tbtext',
			    		  text : '<div style="color:"><b>Partner Product Line-Manage</b></div>'
			    		}]
			}]
	 	});
	 	this.callParent(arguments);
	}
});
