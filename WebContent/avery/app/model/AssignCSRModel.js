Ext.define('AOC.model.AssignCSRModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
        {name: 'csrName', type: 'string',
        	convert: function( v, record ) {
 		       return record.get('csrCode') + ' (' +record.get( 'firstName' ) + ' ' + record.get( 'lastName' ) + ')';
 		       }
        },
        {name: 'id', type: 'string'}
    ]
});

