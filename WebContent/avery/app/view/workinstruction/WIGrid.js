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
		fields:['id','factoryName','assigneeFirstName','assigneeLastName','status'],
		autoLoad:true,
		proxy: {
			type: 'rest',
	        url: applicationContext+'/rest/wi',
	        reader: {
	            type: 'json',
	            rootProperty:'wi'
	        },
	        headers: {
	            "Authorization" : "Basic YWRtaW46aW5kaWdvMQ=="
	        }
	    }
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
					
				},
				cellclick:'onWICellClick'
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
	        },'->',
	        {
	   	    	 text:'',
	   	    	 scale:'medium',
	   	    	 cls:'aoc-btn',
	   	    	 tooltip:'<font color="blue">Quick Refresh</font>',
	   	    	 iconCls:'fa fa-refresh aoc-icon',
	   	    	 handler:'onWiGridRefreshBtnClick'
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
				header: '<img src="' +  AOC.config.Settings.buttonIcons.menuIcon + '" />',
				width:25,
				menuDisabled:true,
				tooltip:'Menu Action',
				renderer:function(value, metaData, record){
					return '<i style="font-size:16px;color#2c3e50;cursor:pointer;" class="fa fa-ellipsis-v"></i>';
				}
			},
		    {
		    	text:'WI #',
		    	dataIndex:'id',
		    	flex:.5
		    }, 
		    {
		    	text:'Name',
		    	dataIndex:'factoryName',
		    	flex:1.5
		    },
		    {
		    	text:'Status',
		    	dataIndex:'status',
		    	flex:1.5,
		    	renderer:function(v, metadata,rec){
					return Helper.getSatus(rec);
				}
		    },
		    {
		    	text:'Assignee',
		    	dataIndex:'assignee',
		    	flex:1.5,
		    	renderer:function(value, metadata, record){
		    		return record.get('assigneeFirstName')+' '+ record.get('assigneeLastName');
		    	}
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