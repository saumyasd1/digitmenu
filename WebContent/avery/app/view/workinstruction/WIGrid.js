Ext.define('AOC.view.workinstruction.WIGrid',{
	extend:'Ext.grid.Panel',
	alias:'widget.wigrid',
	emptyText:AOCLit.emptyDataMsg,
	cls:'aoc-panel',
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
			tbar: { 
				height: AOC.config.Settings.config.defaultTbarHeight,
				items : me.buildtbar()
			},
			listeners:{
				afterrender:function(grid){
					
				}
			}
		});
		me.callParent(arguments);
	},
	buildtbar:function(){
		return [
			{
				xtype : 'tbtext',
				itemId : 'workInstructionText',
				text : 'Work Instruction',
				style:AOC.config.Settings.config.tabHeaderTitleStyle
			},
			{
	        	text:'Create New WI',
	        	itemId : 'createWIBtn',
	        	handler:'createNewWI',
	        	iconCls:'fa fa-plus',
				iconAlign: 'left',
				ui:'blue',
				cls:'blue-btn'
	        }
			//'->'
//			{
//				xtype: 'customsearchfield',
//				width: 200,
//				emptyText: "Search by WI Track # "
//			}
		]
	},
	buildColumns:function(){
		return [
		    {
		    	text:'WI Name',
		    	dataIndex:'wiName',
		    	flex:1.5
		    },    
			{  
				text : 'Last Modified By',
				flex:1.5,
				dataIndex:'lastModifiedBy'
			},
			{
				text : 'Last Modified Date',
				flex:1.5,
				dataIndex:'lastModifiedDate'
			}
		]
	}
});