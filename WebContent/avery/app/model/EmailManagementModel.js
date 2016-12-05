Ext.define('AOC.model.EmailManagementModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
        // set up the fields mapping into the xml doc
        {name: 'id', mapping:'id',type: 'string'},
	    {name: 'trackingId', mapping:'trackingId',type: 'string'},
		{name: 'partnerName', mapping:'partnerName',type: 'string'},
		{name: 'senderEmailId', mapping:'senderEmailId',type: 'string'},
		{name: 'email', mapping:'email',type: 'string'},
		{name: 'status', mapping:'status',type: 'string'},
		{name: 'receivedDate', mapping:'receivedDate',type: 'string'},
		{name: 'readDate', mapping:'readDate',type: 'string'},
		{name: 'acknowledgedDate', mapping:'acknowledgedDate',type: 'string'},
		{name: 'cc', mapping:'cc',type: 'string'}
	    ]
});

