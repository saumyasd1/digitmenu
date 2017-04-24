Ext.define('AOC.view.workinstruction.WIOrderFiberLineGrid',{
	extend:'Ext.grid.Panel',
	alias:'widget.wiorderfiberlinegrid',
	cls:'wi-grid',
	emptyText:AOCLit.emptyDataMsg,
	viewConfig:{
		forceFit:true,
		stripeRows:true,
		columnLines:true,
		enableTextSelection:true
	},
	store:new Ext.data.JsonStore({
		autoLoad:false,
		storeId:'systemLevelStore',
		proxy: {
	        type: 'rest',
	        url : applicationContext+ '/rest/wisystemlevel/systemlevel',
	        reader: {
	            type: 'json',
	            rootProperty: 'systemlevel'
	        }
	    },
		fields:['id','createdBy','createdDate','lastModifiedBy','lastModifiedDate','additionalLogicValidation',
		        'defaultValueFieldLocation','fieldName','productLine','rboFactStrucSpecific','systemOrderLineFiberLevel',
		        'fileName','filePath','fileContent'
        ]
	}),
	initComponent:function(){
		var me = this;
		Ext.apply(me,{
			columns:me.buildColumns(),
			plugins:[
			     {
			    	 ptype:'cellediting',
			    	 clicksToEdit:1
			     }    
			],
			selModel: 'cellmodel',
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
					editable:false,
					store:[['Oracle','Oracle'],['VIPS','VIPS'],['Sparrow','Sparrow']]
				}
		    },
		    {
		    	text:'Product Line <i data-qtip="<font color= #3892d3> Example/<br>	Reference: </font>" class="fa fa-info-circle"></i>',
		    	dataIndex:'productLine',
		    	flex:1,
		    	cellWrap:true,
		    	editor:{
		    		xtype:'textfield'
		    	}
		    },
		    {
		    	text:'Legacy Field Name '+ AOCLit.wiLegacyFieldIconText,
		    	dataIndex:'legacyFieldName',
		    	flex:1,
		    	cellWrap:true,
		    	editor:{
		    		xtype:'textfield'
		    	}
		    },
			{  
				text : 'RBO Validation/Factory Validation/Structure Specific <i data-qtip="<font color= #3892d3> VIPS\'s SKU must be Line Level </font>" class="fa fa-info-circle"></i>',
				flex:1.5,
				dataIndex:'rboFactStrucSpecific',
		    	cellWrap:true,
				editor:{
					xtype:'combo',
					editable:false,
					name:'rboFactStrucSpecific',
					store:[
				       ['RBO Validation','RBO Validation'],
				       ['Factory Validation','Factory Validation'],
				       ['Structure Specific','Structure Specific']]
				}
			},
			{
				text : 'Default / Capture/ Complicated Logic <i class="fa fa-info-circle" data-qtip="<font color=#3892d3>For Complicated Logic, please explain clearly in (Explanation/Rules) with Reference</font>"></i>',
				flex:1.5,
				dataIndex:'defaultCaptureComplicatedLogic',
		    	cellWrap:true,
				editor:{
					xtype:'combo',
					displayField:'name',
					valueField:'name',
					queryMode:'local',
					store:Helper.getDefaultCaptureLogicStore(),
					listeners:{
						//if value not exist then on blur set emty value
					}
				}
			},
			{
				text : 'Default Value/Field Location ' + AOCLit.wiFieldValueLocationIconText,
				flex:1.5,
				dataIndex:'defaultValueFieldLocation',
		    	cellWrap:true,
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Explanation/Rules/Additional Logic/Validation '+ AOCLit.wiExplanationRulesIconText1,
				flex:1.5,
				dataIndex:'additionalLogicValidation',
		    	cellWrap:true,
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Reference <i class="fa fa-info-circle" data-qtip="<font color=#3892d3><b>EXAMPLE ONLY:</b><br>Highlight the corresponding part in the order form/attachment</font>"></i>',
				flex:1,
				dataIndex:'reference',
		    	cellWrap:true,
				editor:{
					xtype:'textfield'
				}
			},
			{
				text:'File',
				flex:.5,
				dataIndex:'file',
				renderer:function(value, metadata, rec){
					if(rec.get('fileName')){
						var filePath = rec.get('filePath') ? rec.get('filePath')+'/'+rec.get('fileName') : rec.get('fileContent');
						return '<a style="letter-spacing:.15px;color:#2c3e50;" href="'+filePath+'" data-qtip="<font color=#3892d3>'+rec.get('fileName')+'</font>" target="_blank"><img src="'+filePath+'" style="width:30px;height:30px;border:solid 1px #ccc;border-radius:50%;"></img></a>'
					}
				}
			},
			{
                text: '',
                xtype: 'widgetcolumn',
                width:40,
                widget: {
                    xtype: 'filefield',
                    name: 'file',
                    width:30,
                    buttonOnly:true,
                    buttonConfig:{
                    	iconCls:'fa fa-upload aoc-icon',
                    	cls:'aoc-btn', 
                    	text:''
                    },
                    regex: /(.)+((\.png)|(\.jpg)|(\.jpeg)(\w)?)$/i,
                    regexText: 'Only PNG and JPEG image formats are accepted',
                    listeners:{
                    	change:'onSystemFilesChanged',
                    	afterrender:function(cmp){
                            cmp.fileInputEl.set({
                                accept:'image/*'
                            });
                        }
                    }
                }
            }
		]
	}
});