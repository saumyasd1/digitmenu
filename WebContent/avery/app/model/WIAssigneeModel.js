Ext.define('AOC.model.WIAssigneeModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
	    {name: 'firstName', mapping:'firstName',type: 'string'},
		{name: 'lastName', mapping:'lastName',type: 'string'},
		{name: 'email', mapping:'email',type: 'string'},
		{name: 'roleName', mapping:'roleName',type: 'string'},
		{name: 'assigneeName',type:'string',
			convert: function( v, record ) {
		       return record.get( 'firstName' ) + ' ' + record.get( 'lastName' ) + ' (' + record.get('roleName') +')';
	       }},
		{name: 'id', type:'string'},
		{name: 'roleId', type:'string'},
		{name: 'password', mapping:'password',type: 'string'}
    ]
});

