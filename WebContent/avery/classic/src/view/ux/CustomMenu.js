Ext.define('AOC.view.ux.CustomMenu', {
	extend:'Ext.menu.Menu',
	cls:'aoc-action-menu',
	renderTo:Ext.getBody(),
	initComponent: function () {
        this.callParent();
    }

});