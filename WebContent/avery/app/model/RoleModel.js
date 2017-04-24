Ext.define('AOC.model.RoleModel', {
    extend: 'Ext.data.Model',
    fields: [
             {name: 'id',mapping:'id',type: 'int'},
             {name:'roleName',mapping:'roleName',type:'string'}
             ]
});