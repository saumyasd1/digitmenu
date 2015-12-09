Ext.define('AOC.view.AOCHome', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.aochome',
	requires:['AOC.view.base.BaseToolbar'],
	layout: {
        type: 'vbox',
        align: 'stretch'
    },
	dockedItems: [{
		xtype: 'basetoolbar',
		dock: 'top',
		title:'Home',
		items: [{
			xtype :'tbtext',
			text : '<b>Welcome</b>'
		}]
	}],
	initComponent : function() {
		Ext.apply(this, {
			
		});
		this.callParent(arguments);
	}
});