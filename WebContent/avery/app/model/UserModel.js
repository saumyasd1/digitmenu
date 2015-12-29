Ext.define('AOC.model.UserModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
	    {name: 'firstName', mapping:'firstName',type: 'string'},
		{name: 'lastName', mapping:'lastName',type: 'string'},
		{name: 'email', mapping:'email',type: 'string'},
		{name: 'role', mapping:'role',type: 'string'},
		{name: 'password', mapping:'password',type: 'string'},
		{name: 'jobTitle', mapping:'jobTitle',type: 'string'}
	    ]
});

