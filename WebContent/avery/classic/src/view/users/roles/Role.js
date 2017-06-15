Ext.define('AOC.view.users.roles.Role', {
    extend: 'Ext.Container',
    requires: ['AOC.view.base.BaseToolbar', 'AOC.view.users.roles.RoleGrid'],
    alias: 'widget.roles',
    itemId: 'rolesitemId',
    controller: 'rolecontroller',
    initComponent: function () {
        Ext.apply(this, {
            layout: 'fit',
            items: [{
                xtype: 'container',
                flex: 1.8,
                layout: 'card',
                itemId: 'rolePanel',
                collapsible: false,
                activeItem: 0,
                hidden: false,
                items: [{
                    xtype: 'rolesgrid',
                    reference: 'roleGrid'
                }]
            }]
        });
        this.callParent(arguments);
    }
});
