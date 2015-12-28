Ext.define('AOC.store.Roles', {
    extend : 'Ext.data.Store',
    model  : 'AOC.model.Role',
   data:[{"value":"Admin","displayname":"Admin"},
         {"value":"Partner Group Admin","displayname":"Partner Group Admin"},
         {"value":"CSR","displayname":"CSR"}]
});