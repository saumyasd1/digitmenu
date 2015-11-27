Ext.define('AOC.model.ArchiveModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
        {name: 'orderFileQueueID', mapping:'orderFileQueueID',type: 'string'},
        {name: 'subject', mapping:'subject',type: 'string'},
		{name: 'partnerName', mapping:'partner.partnerName',type: 'string'}
	    ]
});

