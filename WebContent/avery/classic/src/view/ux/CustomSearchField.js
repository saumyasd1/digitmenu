Ext.define('AOC.view.ux.CustomSearchField', {
    extend: 'Ext.form.field.Text',
    
    alias: 'widget.customsearchfield',
    itemId:'customsearchfield',
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    
    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',
    
    hasSearch : false,
    paramName : 'query',
    triggers: {
		clear: {
			cls: Ext.baseCSSPrefix + 'form-clear-trigger',
			weight: -1, // controls display order
			hidden: true, //always visible
			handler: 'clearSearchResults'
		},
		search: {
			cls: Ext.baseCSSPrefix + 'form-search-trigger',
			weight: 2, // controls display order
			hideOnReadOnly: false, //always visible
			handler: 'getQuickSearchResults'
		}
	},
    
    initComponent: function() {
        var me = this;
        me.on('specialkey', 'getSearchResults'
        );

        me.callParent(arguments);
    }
});