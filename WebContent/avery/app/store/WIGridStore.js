Ext.define('AOC.store.WIGridStore', {
	extend : 'Ext.data.Store',
	fields:['artWorkHold','csrName','defaultOrg','invoiceLineInstruction','manufacturing', 'packingInstruction',
        'shipMark','splitByShipSet', 'systemName','variableDataBreakdown','defaultSelected'
    ],
    model:'AOC.model.WIGridModel',
	autoLoad:true,
	proxy: {
		type: 'rest',
        url: applicationContext+'/rest/wi',
        reader: {
            type: 'json',
            rootProperty:'wi'
        },
        headers: {
            Authorization: 'Basic YWRtaW46aW5kaWdvMQ=='
        }
    }
});

