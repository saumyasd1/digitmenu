Ext.define('AOC.store.ArchiveStore', {
	extend : 'Ext.data.Store',
	requires:['AOC.model.ArchiveModel'],
	model:'AOC.model.ArchiveModel',
	alias:'store.archiveStore',
	totalCount:'total',
	remoteFilter: true,
	pageSize:pageSize,
	remoteSort: true
});

