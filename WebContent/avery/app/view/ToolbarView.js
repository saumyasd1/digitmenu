Ext.define('AOC.view.ToolbarView', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.toolbarview',
	itemId : 'toolbarviewitemid',
	cls : 'adeptia-toolbar-shadow',
	ui : 'lighttoolbar',
	initComponent : function() {
		Ext.apply(this, {
			listeners : this.buildListeners()
		});
		this.callParent(arguments);
	},
	buildListeners : function() {
		return {
			add : function(tb, cmp) {
				var length = tb.items.length;
				if (length > 1 && !cmp.parentMenu
						&& cmp.xtype !== 'tbseparator' && cmp.xtype !== 'tbfill') {
					tb.insert(length - 1, {
						xtype : 'tbseparator'
					});
				}
			}
		};
	}
});