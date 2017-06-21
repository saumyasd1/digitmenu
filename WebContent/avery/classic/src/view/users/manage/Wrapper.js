Ext.define('AOC.view.users.manage.Wrapper', {
    extend: 'AOC.view.base.NewBaseWindow',
    requires : [
    ],
    width:Ext.getBody().getWidth()-50,
    height:Ext.getBody().getHeight()-50,
    layout: {
    	type: 'fit'
    },
    draggable:false,
    resizable:false,
    items :  [
	    {
	       xtype : 'users'
	    }
    ],
    buttons:[]
});