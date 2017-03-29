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
		    	text:'System & Order/Line/Fiber Level <i data-qtip="<font color= #3892d3> Example/<br>	Reference: </font>" class="fa fa-info-circle"></i>',
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
		    	text:'Product Line <i data-qtip="<font color= #3892d3> Example/<br>	Reference: </font>" class="fa fa-info-circle"></i>',
		    	dataIndex:'productLine',
		    	flex:1,
		    	editor:{
		    		xtype:'textfield'
		    	}
		    },
		    {
		    	text:'Legacy Field Name '+ AOCLit.wiLegacyFieldIconText,
		    	dataIndex:'legacyFieldName',
		    	flex:1,
		    	editor:{
		    		xtype:'textfield'
		    	}
		    },
			{  
				text : 'RBO Validation/Factory Validation/Structure Specific <i data-qtip="<font color= #3892d3> VIPS\'s SKU must be Line Level </font>" class="fa fa-info-circle"></i>',
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
				text : 'Default / Capture/ Complicated Logic <i class="fa fa-info-circle" data-qtip="<font color=#3892d3>For Complicated Logic, please explain clearly in (Explanation/Rules) with Reference</font>"></i>',
				flex:1.5,
				dataIndex:'defaultCaptureComplicatedLogic',
				editor:{
					xtype:'combo'
				}
			},
			{
				text : 'Default Value/Field Location ' + AOCLit.wiFieldValueLocationIconText,
				flex:1.5,
				dataIndex:'defaultValueFieldLocation',
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Explanation/Rules/Additional Logic/Validation '+ AOCLit.wiExplanationRulesIconText1,
				flex:1.5,
				dataIndex:'additionalLoginValidation',
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Reference <i class="fa fa-info-circle" data-qtip="<font color=#3892d3><b>EXAMPLE ONLY:</b><br>Highlight the corresponding part in the order form/attachment</font>"></i>',
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