Ext.define('AOC.model.ViewMailModel',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'fileName', mapping:'fileName', type: 'string'},
	    {name: 'dataStructureNameId', mapping:'varProductLine.id', type: 'int'},
	    {name: 'dataStructureName', mapping:'varProductLine.dataStructureName', type: 'string'},
	    {name: 'senderEmailId', mapping:'senderEmailId', type: 'string'},
	    {name: 'additionalDataFileKey', mapping:'additionalDataFileKey', type: 'string'},
	    {name: 'rboMatch', mapping:'rboMatch', type: 'string'},
	    {name: 'productLineMatch', mapping:'productLineMatch', type: 'string'},
	    {name: 'fileContentType', mapping:'fileContentType', type: 'string'},
	    {name: 'contentType', mapping:'fileContentType', type: 'string'},
	    {name: 'fileContentMatch', mapping:'fileContentMatch', type: 'string'},
	    {name: 'comment', mapping:'comment', type: 'string'},
	    {name:'id', type:'int'},{name:'iconName'},{name:'colorCode'}
    ]
});

