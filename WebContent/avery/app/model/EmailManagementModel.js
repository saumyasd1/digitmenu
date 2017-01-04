Ext.define('AOC.model.EmailManagementModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
        // set up the fields mapping into the xml doc
        //{name: 'id', mapping:'ID',type: 'string'},
	    {name: 'id', mapping:'id',type: 'string'},
		{name: 'PartnerName', mapping:'partnerName',type: 'string'},
		{name:'RBO',mapping:'rbo',type:'string'},
		{name: 'senderEmailId', mapping:'senderEmailId',type: 'string'},
		{name: 'Email', mapping:'toMailId',type: 'string'},
		{name: 'status', mapping:'status',type: 'string'},
		{name: 'receivedDate', mapping:'receivedDate',type: 'string'},
		{name: 'readDate', mapping:'readDate',type: 'string'},
		{name: 'acknowledgementDate', mapping:'acknowledgementDate',type: 'string'},
		{name: 'CC', mapping:'ccMailId',type: 'string'},
		{name:'comment', type:'string'},
		{name:'subject', type:'string'},
		{name:'listOrderFileAttachment'}
	    ]
});

