Ext.define('AOC.model.EmailManagementModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
        // set up the fields mapping into the xml doc
        //{name: 'id', mapping:'ID',type: 'string'},
	    {name: 'Tracking #', mapping:'id',type: 'string'},
		{name: 'Partner Name', mapping:'partnerName',type: 'string'},
		{name:'RBO',mapping:'rbo',type:'string'},
		{name: 'Sender Email Id', mapping:'senderEmailId',type: 'string'},
		{name: 'Email', mapping:'toMailId',type: 'string'},
		{name: 'Status', mapping:'status',type: 'string'},
		{name: 'Received Date', mapping:'receivedDate',type: 'string'},
		{name: 'Read Date', mapping:'readDate',type: 'string'},
		{name: 'Acknowledged Date', mapping:'acknowledgementDate',type: 'string'},
		{name: 'CC', mapping:'ccMailId',type: 'string'}
	    ]
});

