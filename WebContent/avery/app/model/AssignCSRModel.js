Ext.define('AOC.model.AssignCSRModel',{
    extend: 'Ext.data.Model',
	idProperty:'id',
    fields: [
        {name: 'csrName', type: 'string',
        	convert: function( v, record ) {
 		       return record.get('csrCode') + ' (' +record.get( 'firstName' ) + ' ' + record.get( 'lastName' ) + ')';
 		       }
        },
        {name: 'id', type: 'int'},
        {name:'userId', type:'int'}
    ]
});

