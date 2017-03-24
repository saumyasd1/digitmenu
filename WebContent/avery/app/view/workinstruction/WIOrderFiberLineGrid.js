Ext.define('AOC.view.workinstruction.WIOrderFiberLineGrid',{
	extend:'Ext.grid.Panel',
	alias:'widget.wiorderfiberlinegrid',
	emptyText:AOCLit.emptyDataMsg,
	viewConfig:{
		forceFit:true,
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
					
				}
			}
		});
		me.callParent(arguments);
	},
	
	buildColumns:function(){
		return [
		    {
		    	text:'System & Order/Line/Fiber Level',
		    	dataIndex:'systemOrderLineFiberLevel',
		    	flex:1.5,
		    	editor:{
					xtype:'combo',
					displayField:'name',
					valueField:'name',
					queryMode:'local',
					store:new Ext.data.JsonStore({
						data:[],
						fields:['name']
					})
				}
		    },
		    {
		    	text:'Product Line',
		    	dataIndex:'productLine',
		    	flex:1,
		    	editor:{
		    		xtype:'textfield'
		    	}
		    },
		    {
		    	text:'Field Name',
		    	dataIndex:'fieldName',
		    	flex:1,
		    	editor:{
		    		xtype:'textfield'
		    	}
		    },
			{  
				text : 'RBO Validation/Factory Validation/Structure Specific',
				flex:1.5,
				dataIndex:'rboFactStrucSpecific',
				editor:{
					xtype:'combo',
					name:'rboFactStrucSpecific',
					displayField:'name',
					valueField:'name',
					queryMode:'local',
					store:new Ext.data.JsonStore({
						data:[],
						fields:['name']
					})
				}
			},
			{
				text : 'Default Value/Field Location',
				flex:1.5,
				dataIndex:'defaultValueFieldLocation',
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Explanation/Rules/Additional Logic/Validation',
				flex:1.5,
				dataIndex:'additionalLoginValidation',
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Reference',
				flex:.5,
				dataIndex:'reference',
				editor:{
					xtype:'textfield'
				}
			},
			{
				xtype:'actioncolumn'
			}
		]
	}
});