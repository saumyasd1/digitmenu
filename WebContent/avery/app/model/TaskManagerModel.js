Ext.define('AOC.model.TaskManagerModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
        {name: 'createdDate', mapping:'createdDate',type: 'string'},
	    {name: 'senderEmailId', mapping:'senderEmailId',type: 'string'},
		{name: 'subject', mapping:'subject',type: 'string'},
		{name: 'ccMailId', mapping:'ccMailId',type: 'string'},
		{name: 'csrName', mapping:'csrName',type: 'string'},
		{name: 'lastModifiedBy', mapping:'lastModifiedBy',type: 'string'},
		{name:'lastModifiedDate',mapping:'lastModifiedDate',type:'string'},
		{name:'iconName'},{name:'colorCode'},
		{name: 'siteName', mapping:'siteName',type: 'string'}
		]
});

