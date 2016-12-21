Ext.define('AOC.model.ViewMailModel',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'fileName', mapping:'fileName',type: 'string'},
	    {name: 'Partner Data Structure', mapping:'Partner Data Structure',type: 'string'},
	    {name: 'Download', mapping:'Download',type: 'string'},
	    {name: 'senderEmailId', mapping:'senderEmailId',type: 'string'},
	    {name: 'Group', mapping:'Group',type: 'string'},
	    {name: 'additionalDataFileKey', mapping:'additionalDataFileKey',type: 'string'},
	    {name: 'rboMatch', mapping:'rboMatch',type: 'string'},
	    {name: 'productLineMatch', mapping:'productLineMatch',type: 'string'},
	    {name: 'fileContentType', mapping:'fileContentType',type: 'string'}
	    ]
});

