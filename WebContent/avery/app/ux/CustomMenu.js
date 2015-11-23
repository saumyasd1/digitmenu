Ext.define('AOC.ux.CustomMenu', {
    extend: 'Ext.menu.Menu',
    alias: 'plugin.custommenu',
    initComponent: function () {
        //get the original template
        var originalTpl = Ext.XTemplate.getTpl(this, 'renderTpl');

        //add the triangle div (or img, span, etc.)
        this.renderTpl = new Ext.XTemplate([
           '<div class="menu-triangle"></div>',
           originalTpl.html,         //the html from the original tpl
           originalTpl.initialConfig //the config options from the original tpl
        ]);

        this.callParent();
    },

    beforeSetPosition: function () {
        //shift the menu down from its original position
        var pos = this.callParent(arguments);

        if (pos) {
            pos.y += 5; //the offset (should be the height of your triangle)
        }

        return pos;
    }
});