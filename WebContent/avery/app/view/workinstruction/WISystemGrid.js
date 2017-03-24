Ext.define('AOC.view.workinstruction.WISystemGrid',{
	extend:'Ext.grid.Panel',
	alias:'widget.wisystemgrid',
	emptyText:AOCLit.emptyDataMsg,
	viewConfig:{
		stripeRows:true,
		enableTextSelection:true
	},
	store:new Ext.data.JsonStore({
		data:[],
		fields:['system','csrName','packingInstruction','manufacturingNotes','invoiceNote','variableDataBreakdown',
		        'splitShipSetBy','shippingMark','artworkHold']
	}),
	initComponent:function(){
		var me = this;
		Ext.apply(me,{
			columns:me.buildColumns(),
			plugins:[
			     {
			    	 ptype:'cellediting',
			    	 clickToEdit:1
			     }    
			],
			listeners:{
				afterrender:function(grid){
					var store = grid.store,
						count = store.getCount();
					if(count == 0){
						var record = {
								system:31,
								csrName:'Amit',
								packingInstruction:'',
								manufacturingNotes:'Test',
								invoiceNote:'',
								variableDataBreakdown:'',
								splitShipSetBy:'L',
								shippingMark:'',
								artworkHold:'N'
						}
						store.insert(0,new Ext.data.Record(record));
					}
				}
			}
		});
		me.callParent(arguments);
	},
	
	buildColumns:function(){
		return [
		    {
		    	text:'System',
		    	dataIndex:'system',
		    	width:150,
		    	editor:{
		    		xtype:'combo',
		    		displayField:'name',
		    		valueField:'id',
		    		queryMode:'local',
		    		store:new Ext.data.JsonStore({
		    			data:[{name:'Oracle',id:31},{name:'VIPS', id:32}],
		    			fields:['name','id']
		    		})
		    	},
		    	renderer:function(value, metaData, record){
		    		var editor = metaData.column.getEditor(record),    
			    	storeRecord = editor.store.getById(value);
				
				    if(storeRecord) {       
				        return storeRecord.data[editor.displayField];
				    }
				    else{         
				        return null;
				    }
		    	}
		    },    
			{  
				text : 'CSR Name',
				width:120,
				sortable : true,
				dataIndex:'csrName',
				editor:{
					xtype:'textfield'
				}
//				renderer:function(value,metadata){
//					return me.validationRendered(value, metadata);
//				}
			},
			{
				text : 'Packing Instruction',
				width:120,
				sortable : true,
				dataIndex:'packingInstruction',
				//flex:1.5,
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Manufacturing Note',
				width:120,
				sortable : true,
				dataIndex:'manufacturingNotes',
				//flex:1.5,
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Invoice Note',
				width:120,
				sortable : true,
				dataIndex:'invoiceNote',
				//flex:1.5,
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Variable data breakdown',
				//width:120,
				sortable : true,
				dataIndex:'variableDataBreakdown',
				flex:1.5,
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Split by Ship Set',
				//width:150,
				dataIndex:'splitShipSetBy',
				flex:1,
				editor: {
					xtype: 'combo',
					displayField: 'variableFieldName',
					valueField: 'variableFieldName',
					editable:false,
					queryMode :'local',
					store: Ext.data.StoreManager.lookup('SplitShipsetId') == null ? AOC.util.Helper.getVariableComboStore('SplitShipset') : Ext.data.StoreManager.lookup('SplitShipsetId'),
					listeners:{
						afterrender:function(field){
							var store = field.store
								index = store.find('variableFieldName','None','', false, false, true),
								obj = {variableFieldName:'None'};
							
							if(index == -1){
								store.insert(0,new Ext.data.Record(obj));
							}
						},
						select:function(field){
							if(field.getValue() == 'None'){
								field.setValue('');
							}
						}
					}
				}
			},
			{
				text : 'Ship mark',
				//width:150,
				dataIndex:'shippingMark',
				flex:1,
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Artwork Hold',
				//width:150,
				dataIndex:'artworkHold',
				editor:{
					xtype:'combo',
					editable:false,
					store:[['Y','Y'],['N','N']]
				}
			}
		]
	},
	validationRendered:function(value, metadata){
    	var me=this;
    	if(Ext.isEmpty(value)){
    		if(me.showValidationError){
    			metadata.style = AOCLit.cellColor;
    		}
    		me.isSystemGridNotValid=true;
    	}
    	return value;
    }
});