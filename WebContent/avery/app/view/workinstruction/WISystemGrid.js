Ext.define('AOC.view.workinstruction.WISystemGrid',{
	extend:'Ext.grid.Panel',
	alias:'widget.wisystemgrid',
	emptyText:AOCLit.emptyDataMsg,
	cls:'wi-grid',
	viewConfig:{
		stripeRows:true,
//		columnLines:true,
		enableTextSelection:true
	},
	requires:['AOC.view.ux.RadioModel'],
	//selType: 'checkboxmodel',
	selModel: {
		selType: 'radiomodel'
	},
	initComponent:function(){
		var me = this;
		Ext.apply(me,{
			columns:me.buildColumns(),
			plugins:[
			     {
			    	 ptype:'cellediting',
			    	 clicksToEdit:1,
			    	 listeners:{
			    		 beforeedit: 'onSystemGridBeforeEdit'
			    	 }
			     }    
			],
			store: Ext.data.StoreManager.lookup('wiSystemStore') == null ? Ext.create('AOC.store.WISystemStore',{storeId:'wiSystemStore'}) : Ext.data.StoreManager.lookup('wiSystemStore'),
			listeners:{
				select:'onSystemGridRowSelect'
			}
		});
		me.callParent(arguments);
	},
	
	buildColumns:function(){
		var qtipTitle1 = '<i data-qtip="<font color=#3892d3>Use ^ as an indicator to return a new line. e.g TAIWAN^1 TO <b>UP it will be imported as <br>TAIWAN <br>1 TO UP</font>" class="fa fa-info-circle"></i>';
		
		return [
		    {
		    	text:'System',
		    	dataIndex:AOCLit.systemName,
		    	flex:1
		    },
		    {
		    	text:'Default Org',
		    	dataIndex:AOCLit.defaultOrg,
		    	flex:1,
		    	editor:{
		    		xtype:'combo',
		    		displayField:'name',
		    		valueField:'id',
		    		queryMode:'local',
		    		editable:false,
		    		store:new Ext.data.Store({
		    			data:[
		    			   {name:'PYT', id:1, systemId:31},{name:'PYL', id:2, systemId:31},{name:'VN', id:3, systemId:31},
		    			   {name:'POHKT', id:4, systemId:32},{name:'POHKL', id:5, systemId:32},{name:'ADNS', id:6, systemId:32},
		    			   {name:'ADNL', id:7, systemId:32},{name:'ADHK', id:8, systemId:32},{name:'PXVN', id:9, systemId:32},
		    			   {name:'PXSH', id:10, systemId:32},{name:'SZ', id:11, systemId:33}
		    			],
		    			fields:['name','id','systemId']
		    		}),
		    		listeners:{
		    			expand:'onSystemDefaultOrgExpand'
		    		}
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
				flex:1,
				sortable : true,
				dataIndex:AOCLit.csrName,
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Packing Instruction '+ qtipTitle1,
				flex:1,
				sortable: false,
				dataIndex:AOCLit.packingInstruction,
		    	cellWrap:true,
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Manufacturing Note '+ qtipTitle1,
				flex:1,
				sortable: false,
				dataIndex:AOCLit.manufacturing,
		    	cellWrap:true,
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Invoice Line Instruction '+ qtipTitle1,
				sortable: false,
				dataIndex:AOCLit.invoiceLineInstruction,
		    	cellWrap:true,
				flex:1,
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Variable data breakdown '+ qtipTitle1,
				sortable: true,
				dataIndex:AOCLit.variableDataBreakdown,
		    	cellWrap:true,
				flex:1.5,
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Split by Ship Set <i data-qtip="<font color=#3892d3>Fill in P/L:<br>P- If multiple Cust. po is imported into one SO, 1 Ship set for 1 Customer PO<b>L- Different Ship set per sales order line</font>" class="fa fa-info-circle"></i>',
				dataIndex:AOCLit.splitByShipSet,
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
				text : 'Ship mark '+ qtipTitle1,
				dataIndex:AOCLit.shipMark,
				flex:1,
		    	cellWrap:true,
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Artwork Hold <i data-qtip="<font color=#3892d3>Yes/No , it will apply for all item</font>" class="fa fa-info-circle"></i>',
				dataIndex:AOCLit.artWorkHold,
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