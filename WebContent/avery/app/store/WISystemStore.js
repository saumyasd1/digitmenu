Ext.define('AOC.store.WISystemStore', {
	extend : 'Ext.data.Store',
	fields:['id', 'createdBy','createdDate', 'lastModifiedBy', 'lastModifiedDate', 'artWorkHold',
        'csrName','defaultOrg','invoiceLineInstruction','manufacturing', 'packingInstruction',
        'shipMark','splitByShipSet', 'systemName','variableDataBreakdown'
    ],
	autoLoad:false,
	proxy: {
        type: 'rest',
        url: applicationContext+'/rest/wisystem',
        reader: {
            type: 'json'
            //rootProperty:'items'
        },
        headers: {
            Authorization : 'Basic YWRtaW46aW5kaWdvMQ=='
        }
    }
});

