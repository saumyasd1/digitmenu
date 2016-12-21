Ext.define('AOC.model.TaskManagerModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
        // set up the fields mapping into the xml doc
        {name: 'createdDate', mapping:'createdDate',type: 'string'},
	    {name: 'senderEmailId', mapping:'senderEmailId',type: 'string'},
		{name: 'subject', mapping:'subject',type: 'string'},
		{name: 'ccMailId', mapping:'ccMailId',type: 'string'},
		{name: 'assignCSR', mapping:'assignCSR',type: 'string'}
		]
});

