Ext.define('AOC.view.workinstruction.WIAOCFieldGrid',{
	extend:'Ext.grid.Panel',
	alias:'widget.wiaocfieldgrid',
	emptyText:AOCLit.emptyDataMsg,
	viewConfig:{
		forceFit:true,
		stripeRows:true,
		enableTextSelection:true
	},
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
			store: Ext.data.StoreManager.lookup('wiAOCFieldStore') == null ? Ext.create('AOC.store.WIAOCFieldStore',{storeId:'wiAOCFieldStore'}) : Ext.data.StoreManager.lookup('wiAOCFieldStore'),
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
		    	text:'AOC Field Name',
		    	dataIndex:'aocFieldName',
		    	flex:1.5
		    },    
			{  
				text : 'Default/Capture/Complicated Logic(Please explain clearly) '+ AOCLit.wiDefaultCaptureCompIconText,
				flex:1.5,
				dataIndex:'logic',
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
				text : 'Field Value Location '+ AOCLit.wiFieldValueLocationIconText,
				flex:1.5,
				dataIndex:'fieldValueExample',
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Explanation/Rules/Additional Logic/Validation '+ AOCLit.wiExplanationRulesIconText,
				flex:1.5,
				dataIndex:'validation',
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Reference',
				flex:1,
				dataIndex:'reference',
				editor:{
					xtype:'textfield'
				}
			},
			{
				xtype:'actioncolumn',
				flex:.5
			}
		]
	}
});