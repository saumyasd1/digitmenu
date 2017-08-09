Ext.define('AOC.model.UniquePartnerModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
        { name: 'id',type: 'string'},
	    { name: 'name', type: 'string'},
		{ name: 'site', type: 'string'},
    ]
});

