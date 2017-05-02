Ext.define('AOC.model.WIGridModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
	    {name: 'factoryName', type: 'string'},
		{name: 'assigneeFirstName',type: 'string'},
		{name: 'assigneeLastName', type:'string'},
		{name: 'status', type:'string'},
		{name: 'id', type:'string'}
    ]
});

