Ext.define('AOC.config.Overrides',{
    singleton : true,
    constructor : function(){
    		 Ext.override(Ext.form.field.Base,{
    	            initComponent : function(){
    	                var fl = this.fieldLabel,
    	                    ab = this.allowBlank,
    	                    itemId=this.itemId;
    	                if (ab === false && fl) {
    	                    this.fieldLabel = '<span style="color:#EB4A00;">*</span> '+fl;
    	                } else if (ab === true && fl) {
    	                    this.fieldLabel = '  '+fl;
    	                }
    	                if(itemId=='messageFieldItemId'){
    	                	this.fieldCls='aoc-win-msg';
    	                }
    	                this.callParent(arguments);
    	            }
    	        });
    		 Ext.override(Ext.grid.plugin.Clipboard,{
    			 getCellData: function (format, erase) {
    			        var cmp = this.getCmp(),
    			            selModel = cmp.getSelectionModel(),
    			            ret = [],
    			            isRaw = format === 'raw',
    			            isText = format === 'text',
    			            viewNode,
    			            cell, data, dataIndex, lastRecord, record, row, view;

    			        selModel.getSelected().eachCell(function (cellContext) {
    			            view = cellContext.column.getView();
    			            record = cellContext.record;

    			            if (lastRecord !== record) {
    			                lastRecord = record;
    			                ret.push(row = []);
    			            }
    			            
    			            dataIndex = cellContext.column.dataIndex;

    			            if (isRaw) {
    			                data = record.data[dataIndex];
    			            } else {
    			                // Try to access the view node.
    			                viewNode = view.all.item(cellContext.rowIdx);
    			                // If we could not, it's because it's outside of the rendered block - recreate it.
    			                if (!viewNode) {
    			                    viewNode = Ext.fly(view.createRowElement(record, cellContext.rowIdx));
    			                }
    			                cell = viewNode.down(cellContext.column.getCellInnerSelector());
    			                data = cell.dom.innerHTML;
    			                data=data.replace(/&nbsp;/g,' ');
    			                if (isText) {
    			                    data = Ext.util.Format.stripTags(data);
    			                }
    			            }

    			            row.push(data);

    			            if (erase && dataIndex) {
    			                record.set(dataIndex, null);
    			            }
    			        });

    			        return Ext.util.TSV.encode(ret);
    			    }
 	        });
    }
});