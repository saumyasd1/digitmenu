Ext.define('AOC.overrides.view.Table', {
    override: 'Ext.view.Table',
    checkThatContextIsParentGridView: function(e){
        var target = Ext.get(e.target);
        var parentGridView = target.up('.x-grid-view');
        if (this.el.getId() != parentGridView.getId()) {
            return false;
        } else {
            return true;
        }
    },
    processItemEvent: function(record, row, rowIndex, e) {
        if (e.target && !this.checkThatContextIsParentGridView(e)) {
            return false;
        } else {
            return this.callParent([record, row, rowIndex, e]);
        }
    }
});
Ext.define('AOC.ux.RowExpanderGrid', {
    extend: 'Ext.grid.plugin.RowExpander',
    requires: [
        'Ext.grid.feature.RowBody',
        'Ext.grid.plugin.RowExpander',
        'Ext.grid.Panel'
    ],
    alias: 'plugin.rowexpandergrid',
     gridConfig:null,
     setCmp: function(outerGrid) {
		var me = this;
		this.rowBodyTpl=new Ext.XTemplate('<div class="detailData"></div>');
		 me.callParent(arguments);
        if (!me.gridConfig) {
            Ext.Error.raise("The 'gridConfig' config is required and is not defined.");
        }
     },
    init:function(outerGrid){
    	var me = this;
    	this.callParent(arguments);
    	outerGrid.getView().on('expandbody',me.addInnerGridOnExpand,me);
    },
      
    addInnerGridOnExpand : function (rowNode, record, expandRow, eOpts) {
    	 var me=this;
        if( Ext.fly(rowNode).down('.x-grid-view')){
            return;
        }
         me.recordsExpanded[record.internalId] = false;
    	 var detailData = Ext.DomQuery.select("div.detailData", expandRow);
    	 var data=record.get(me.gridConfig.nestedGridRefrence);
    	 var store = Ext.create('Ext.data.Store', {
    		    autoLoad: true,
    		    model: Ext.create(me.gridConfig.modal),
    		    data : data,
    		    proxy: {
    		        type: 'memory'
    		    }
    		});
    	 me.gridConfig.store=store;
		 var innerGrid=Ext.create('Ext.grid.Panel',me.gridConfig);
		 innerGrid.render(detailData[0]);
    }
});