Ext.define('AOC.model.VariableHeaderModel',{
    extend: 'Ext.data.Model',
   fields: [
            {
    		name : 'level',
    		mapping : 'level',
    		type: 'string'
    	}, {
    		name : 'skuno',
    		mapping : 'skuno'
    	}, {
    		name : 'typesetter',
    		mapping : 'typesetter'
    	},{
    		name : 'variableFieldName',
    		mapping : 'variableFieldname'
    	},{
    		name : 'variableDataValue',
    		mapping : 'variableDataValue'
    	},{
    		name : 'fiberPercent',
    		mapping : 'fiberPercent'
    	},
    	{
    		name : 'customerPONumber',
    		mapping : 'orderLineForVariableData.customerPONumber'
    	},
    	{
    		name : 'customerItemNumber',
    		mapping : 'orderLineForVariableData.customerItemNumber'
    	},
    	{
    		name : 'salesOrdercustomerPONumber',
    		mapping : 'salesOrderForVariableData.customerPONumber'
    	},
    	{
    		name : 'mandatory',
    		mapping : 'mandatory'
    	},
    	{
    		name : 'salesOrdercustomerItemNumber',
    		mapping : 'salesOrderForVariableData.customerItemNumber'
    	}
        ]
});