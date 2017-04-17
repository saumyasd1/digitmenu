Ext.define('AOC.model.WIStatusModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
	    {name: 'value', type: 'string'},
		{name: 'id',type: 'string'},
		{name: 'roleId', type:'string'}
    ]
});

