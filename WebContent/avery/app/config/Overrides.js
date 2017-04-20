Ext.define('AOC.config.Overrides',{
    singleton : true,
    constructor : function(){
    		 Ext.override(Ext.form.field.Base,{
    	            initComponent : function(){
    	                var fl = this.fieldLabel,
    	                    ab = this.allowBlank,
    	                    itemId=this.itemId;
    	                if (ab === false && fl) {
    	                    this.fieldLabel = fl + ' <span style="color:#EB4A00;">*</span> ';
    	                } else if (ab === true && fl) {
    	                    this.fieldLabel = fl;
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
    		 Ext.override(Ext.grid.column.Action,{
    			 defaultRenderer: function(v, meta, record, rowIdx, colIdx, store, view){
    			        var me = this,
    			            prefix = Ext.baseCSSPrefix,
    			            scope = me.origScope || me,
    			            items = me.items,
    			            len = items.length,
    			            i = 0,
    			            item, ret, disabled, tooltip, glyph, glyphParts, glyphFontFamily;

    			        // Allow a configured renderer to create initial value (And set the other values in the "metadata" argument!)
    			        // Assign a new variable here, since if we modify "v" it will also modify the arguments collection, meaning
    			        // we will pass an incorrect value to getClass/getTip
    			        ret = Ext.isFunction(me.origRenderer) ? me.origRenderer.apply(scope, arguments) || '' : '';

    			        meta.tdCls += ' ' + Ext.baseCSSPrefix + 'action-col-cell';
    			        for (; i < len; i++) {
    			            item = items[i];

    			            disabled = item.disabled || (item.isDisabled ? item.isDisabled.call(item.scope || scope, view, rowIdx, colIdx, item, record) : false);
    			            tooltip = disabled ? null : (item.tooltip || (item.getTip ? item.getTip.apply(item.scope || scope, arguments) : null));
    			            glyph = item.glyph,glyphColor=Ext.isEmpty(item.glyphColor)?'blue':item.glyphColor;

    			            // Only process the item action setup once.
    			            if (!item.hasActionConfiguration) {

    			                // Apply our documented default to all items
    			                item.stopSelection = me.stopSelection;
    			                item.disable = Ext.Function.bind(me.disableAction, me, [i], 0);
    			                item.enable = Ext.Function.bind(me.enableAction, me, [i], 0);
    			                item.hasActionConfiguration = true;
    			            }

    			            if (glyph) {
    			                if (typeof glyph === 'string') {
    			                    glyphParts = glyph.split('@');
    			                    glyph = glyphParts[0];
    			                    glyphFontFamily = glyphParts[1];
    			                } else {
    			                    glyphFontFamily = Ext._glyphFontFamily;
    			                }

    			                ret += '<span role="button" title="' + (item.altText || me.altText) + '" class="' + prefix + 'action-col-icon ' + prefix + 'action-col-glyph ' + prefix + 'action-col-' + String(i) + ' ' + (disabled ? prefix + 'item-disabled' : ' ') +
    			                    ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.iconCls || me.iconCls || '')) + '"' +
    			                    ' style="font-family:' + glyphFontFamily + ';color:'+glyphColor+'"' +
    			                    (tooltip ? ' data-qtip="' + tooltip + '"' : '') + '>&#' + glyph + ';</span>';
    			            } else {
    			                ret += '<img role="button" alt="' + (item.altText || me.altText) + '" src="' + (item.icon || Ext.BLANK_IMAGE_URL) +
    			                    '" class="' + prefix + 'action-col-icon ' + prefix + 'action-col-' + String(i) + ' ' + (disabled ? prefix + 'item-disabled' : ' ') +
    			                    ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.iconCls || me.iconCls || '')) + '"' +
    			                    (tooltip ? ' data-qtip="' + tooltip + '"' : '') + ' />';
    			            }
    			        }
    			        return ret;    
    			    }
 	        });
    		// custom Vtype for vtype:'time'
    		 Ext.define('Ext.form.field.VTypes', {
    		     override: 'Ext.form.field.VTypes',

    		     // vtype validation function
    		     multiEmail: function (value) {
    		         var value = value || '';
    		         var emails = value.split(',');

    		         for (var i = 0, len = emails.length; i < len; i++) {
    		             if (!this.multiEmailRe.test(emails[i].trim())) {
    		                 return false;
    		             }
    		         }

    		         return true;
    		     },
    		     // RegExp for the value to be tested against within the validation function
    		     multiEmailRe: /^(")?(?:[^\."\s])(?:(?:[\.])?(?:[\w\-!#$%&'*+/=?^_`{|}~]))*\1@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/,
    		     // vtype Text property: The error text to display when the validation function returns false
    		     multiEmailText: 'Entered email(s) are not valid. Multiple emails can be entered with comma seperated!'
    		 });
    }
});