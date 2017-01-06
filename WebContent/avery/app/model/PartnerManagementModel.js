Ext.define('AOC.model.PartnerManagementModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
        // set up the fields mapping into the xml doc
        {name: 'id', mapping:'id',type: 'string'},
	    {name: 'partnerName', mapping:'partnerName',type: 'string'},
		{name: 'address', mapping:'address',type: 'string'},
		{name: 'contactPerson', mapping:'contactPerson',type: 'string'},
		{name: 'phone', mapping:'phone',type: 'string'},
		{name: 'active', mapping:'active',type: 'boolean'},
		{name: 'lastModifiedBy', mapping:'lastModifiedBy',type: 'string'},
		{name:'lastModifiedDate',mapping:'lastModifiedDate',type:'string'}
	    ]
});

