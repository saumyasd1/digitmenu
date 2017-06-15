Ext.define('AOC.view.users.roles.ManageRoleWindow', {
    extend: 'AOC.view.base.NewBaseWindow',
    requires : [
    ],
    width:Ext.getBody().getWidth()-50,
    height:Ext.getBody().getHeight()-50,
    layout: {
    	type: 'fit'
    },   
    items :  [
	    {
	       xtype : 'roles'
	    }
    ],
    buttons:[
       
    ]
});