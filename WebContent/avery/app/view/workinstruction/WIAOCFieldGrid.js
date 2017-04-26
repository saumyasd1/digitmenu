Ext.define('AOC.view.workinstruction.WIAOCFieldGrid',{
	extend:'Ext.grid.Panel',
	alias:'widget.wiaocfieldgrid',
	cls:'wi-grid',
	emptyText:AOCLit.emptyDataMsg,
	viewConfig:{
		forceFit:true,
		stripeRows:true,
//		columnLines:true,
		enableTextSelection:true
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
			    		 beforeedit:function(e, editor){
			    			 var rec  = editor.grid.store.getAt(editor.rowIdx);
			    			 if(editor.field != 'fieldValueExample'){return;}
			    			 
			    			 if(rec.get('aocFieldName') == 'APO'){
			    				 editor.column.setEditor({
									xtype:'combo',
									editable:false,
									store:[['No APO','No APO'],['General APO Rule','General APO Rule']]
								});
			    			 }else if(rec.get('aocFieldName') == 'Shipping Hold' || rec.get('aocFieldName') == 'Production Hold'
									|| rec.get('aocFieldName') == 'Artwork Hold'){
			    				 editor.column.setEditor({
									xtype:'combo',
									editable:false,
									store:[['Yes','Yes'],['No','No']]
			    				 });
			    			 }else if(rec.get('aocFieldName') == 'Split Shipset'){
			    				 editor.column.setEditor({
									xtype:'combo',
									editable:false,
									store:[['None','None'],['L','L'],['P','P']]
			    				 });
			    			 }else{
			    				 editor.column.setEditor('textfield');
			    			 }
			    		 }
			    	 }
			     }    
			],
			store: Ext.data.StoreManager.lookup('wiAOCFieldStore') == null ? Ext.create('AOC.store.WIAOCFieldStore',{storeId:'wiAOCFieldStore'}) : Ext.data.StoreManager.lookup('wiAOCFieldStore'),
			listeners:{
//				afterrender:'onAOCFieldGridAfterRender',
//				cellclick:'onAOCFieldGridCellClick'
			}
		});
		me.callParent(arguments);
	},
	
	buildColumns:function(){
		return [
		    {
		    	text:'AOC Field Name',
		    	dataIndex:'aocFieldName',
		    	flex:1.5,
		    	renderer:function(value, metaData, record){
		    		if(value == 'Division For Interface ERPORG'){
		    			return value +' <i data-qtip="<font color=#3892d3>PYT/PYL for Oracle<br>POHKT/POHKL for Panyu VIPS<br>ADNS/ADHK/ADHL for Nansha VIPS</font>" class="fa fa-info-circle"></i>'
		    		}
		    		else if(value == 'Order By'){
		    			return value +' <i data-qtip="<font color=#3892d3>Only for Oracle</font>" class="fa fa-info-circle"></i>'
		    		}
		    		else if(value == 'Split Shipset'){
		    			return value +' <i data-qtip="<font color=#3892d3>Only for Oracle</font>" class="fa fa-info-circle"></i>'
		    		}
		    		return value;
		    	}
		    },    
			{  
				text : 'Default/Capture/Complicated Logic(Please explain clearly) '+ AOCLit.wiDefaultCaptureCompIconText,
				flex:1.5,
				dataIndex:'logic',
		    	cellWrap:true,
				editor:{
					xtype:'combo',
					displayField:'name',
					valueField:'name',
					queryMode:'local',
					store:Helper.getDefaultCaptureLogicStore(),
					listeners:{
						
					}
				}
			},
			{
				text : 'Field Value Location '+ AOCLit.wiFieldValueLocationIconText,
				flex:1.5,
				dataIndex:'fieldValueExample',
		    	cellWrap:true,
				editor:'textfield'
			},
			{
				text : 'Explanation/Rules/Additional Logic/Validation '+ AOCLit.wiExplanationRulesIconText,
				flex:1.5,
				dataIndex:'validation',
		    	cellWrap:true,
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Reference',
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
						return '<div class="view-image-preview" filePath="'+filePath+'" style="letter-spacing:.15px;color:#2c3e50;cursor:pointer;" data-qtip="<font color=#3892d3>'+rec.get('fileName')+'</font>"><img src="'+filePath+'" style="width:30px;height:30px;border:solid 1px #ccc;border-radius:50%;"></img></div>'
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
                    gridType:'aocField',
                    listeners:{
                    	change:'onFilesChanged',
                    	afterrender:function(cmp){
                            cmp.fileInputEl.set({
                                accept:'image/*'
                            });
                        }
                    }
                }
            }
		];
	}
});