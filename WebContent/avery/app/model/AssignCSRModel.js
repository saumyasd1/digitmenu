Ext.define('AOC.model.AssignCSRModel',{
    extend: 'Ext.data.Model',
	idProperty:'id',
    fields: [
        {name: 'csrName', type: 'string',
        	convert: function( v, record ) {
        		if(v == 'All'){
        			return 'All';
        		}
 		       return record.get('csrCode') + ' (' +record.get( 'firstName' ) + ' ' + record.get( 'lastName' ) + ')';
        	}
        },
        {name: 'id', type: 'string'},
        {name:'userId', type:'int'}
    ]
});

