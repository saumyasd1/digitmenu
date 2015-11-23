Ext.define('AOC.view.orderqueue.BulkUpdateVariableHeaderrGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.bulkUpdateVariableHeaderrGrid',
    itemId:'BulkUpdateVariableHeaderrGrid',
	//store:'SalesOrderStore',
	requires : [
    ],
	emptyText:'<div align=center> No content type(s) to display.</div>',
	runTime : AOC.config.Runtime,
    initComponent : function(){
	var me=this;
	this.fieldArray = [];
        Ext.apply(this,{
            columns : this.buildColumns(),
			columnLines:true,
			dockedItems : this.buildDockedItems(),
			layout:'fit',
			selModel: Ext.create("Ext.selection.CheckboxModel", {
		        checkOnly : true,
		        allowDeselect:true,					
		        mode :'MULTI'
			})
        });
        this.callParent(arguments);

    },
    buildColumns : function(){
    	var me=this;
        return [{ text: "Level", dataIndex: 'Level' ,flex:1},
                { text: "SKU Number", dataIndex: 'SKUNumber' ,flex:1},
                { text: "TypeSetterCode", dataIndex: 'TypeSetterCode' ,flex:1},
                { text: "Variable Field Name", dataIndex: 'VariableFieldName' ,flex:1},
                { text: "Variable Field Value", dataIndex: 'VariableFieldValue' ,flex:1},
                { text: "Fiber Content Name", dataIndex: 'FiberContentName',flex:1}
		];
    },
    buildDockedItems : function(){
    	var me=this;
        return [
			{
            xtype : 'pagingtoolbar',
            dock : 'bottom',
            ui : 'darktoolbar',
            itemId:'pagingtoolbarVisitManage',
           // store:me.store,
            displayInfo:true,
            plugins:Ext.create('Ext.ux.ProgressBarPager',{width:250})
            
        }];
    }
});