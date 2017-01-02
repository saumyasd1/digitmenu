Ext.define('AOC.model.ViewMailModel',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'fileName', mapping:'fileName', type: 'string'},
	    {name: 'dataStructureName', mapping:'varProductLine.id', type: 'string'},
	    {name: 'senderEmailId', mapping:'senderEmailId', type: 'string'},
	    {name: 'additionalDataFileKey', mapping:'additionalDataFileKey', type: 'string'},
	    {name: 'rboMatch', mapping:'rboMatch', type: 'string'},
	    {name: 'productLineMatch', mapping:'productLineMatch', type: 'string'},
	    {name: 'fileContentType', mapping:'fileContentType', type: 'string'},
	    {name: 'fileContentMatch', mapping:'fileContentMatch', type: 'string'},
	    {name:'id', type:'int'},
	    {name:'status', type:'int'}
    ]
});

