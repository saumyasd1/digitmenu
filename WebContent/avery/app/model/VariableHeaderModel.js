Ext.define('AOC.model.VariableHeaderModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
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
    		name : 'variablefieldname',
    		mapping : 'variablefieldname'
    	},{
    		name : 'variabledatavalue',
    		mapping : 'variabledatavalue'
    	},{
    		name : 'fiberPercent',
    		mapping : 'fiberPercent'
    	}
        ]
});