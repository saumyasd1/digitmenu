Ext.define('AOC.view.RowEditorButtons', {
    override: 'Ext.grid.RowEditorButtons',
    constructor: function(config) {
        var me = this,
            rowEditor = config.rowEditor,
            editPlugin = rowEditor.editingPlugin;
        me.callParent(arguments);

        if(editPlugin.saveAndNextBtn){
            me.insert(1,{
                cls: Ext.baseCSSPrefix + 'row-editor-update-button',
                itemId: 'next',
                handler: editPlugin.bulKUpdate,
                text: 'Update All',
                disabled: rowEditor.updateButtonDisabled
            });
        }        
    }
});

Ext.define('AOC.view.ux.CustomRowEditing', {
    override: 'Ext.grid.plugin.RowEditing'
});