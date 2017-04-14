Ext.define('AOC.view.workinstruction.WIPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.wipanel',
	requires:[
   	   'AOC.view.workinstruction.WIAOCFieldGrid',
   	   'AOC.view.workinstruction.WIOrderFiberLineGrid'
   	],
	initComponent:function(){
		var me = this;
		Ext.apply(me,{
			items:me.buildItems()
		});
		me.callParent(arguments);
	},
	buildItems:function(){
		var me = this;
		return [
		    {
		    	title:'Order Recieving',
		    	cls:'wi-form-panel-header',
		    	titleAlign:'center',
		    	bodyPadding:10,
		    	layout:{
		    		type:'vbox',
		    		align:'stretch'
		    	},
		    	items:[].concat(me.getGeneralInformationItems()).concat(
		    			me.getSampleBulkItems()
		    		)
		    },
		    {
		    	title:'Order Extraction',
		    	cls:'wi-form-panel-header',
		    	titleAlign:'center',
		    	bodyPadding:10,
		    	margin:'15 0',
		    	layout:{
		    		type:'vbox',
		    		align:'stretch'
		    	},
		    	items:[].concat(me.getOrderExtractionItems()).concat([
					{
						xtype:'wiaocfieldgrid',
						reference:'wiaocfieldgrid',
						border:'solid 1px #ccc;',
						margin:'20 0',
						height:'auto'
					}
				])
		    
		    },
		    {
		    	xtype:'label',
		    	text:'Notes:RBO/Program/Product line specific guidelines, aimed at showing how to validate the sku information or applying logic that applicable to the whole RBO or program or product lines.This guidelines can be shared with all WI under the same RBO/Program/Product line.',
		    	style:'font-weight:bold;color:#2c3e50;font-size:15px;'
		    },
		    me.getSKUValidationItems(),
		    {
		    	xtype:'wiorderfiberlinegrid',
		    	reference:'wiorderfiberlinegrid',
		    	height:370,
		    	scrollable:true,
		    	margin:'20 0',
		    	border:'solid 1px #ccc;'
		    },
		    me.getOthersItems(),
		    {
		    	xtype:'container',
		    	itemId:'imageContainer',
		    	reference:'imageContainer',
		    	margin:'0 0 20 0'
		    },
		    {
		    	xtype:'box',
		    	hidden:true,
		    	html:'<input id="upload-file" type="file" accept="image/*" />'
		    },
		    me.getUploadOrderFileItems(),
		    me.getUploadAttachementItems(),
		    me.getSampleFileItems(),
		    me.getAssigneeField()
		]
	},
	getAssigneeField:function(){
		return {
			xtype:'fieldcontainer',
			margin:'0 0 5 0',
			layout:'hbox',
			anchor:'100%',
			defaults:{
				labelSeparator:'',
				labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
				labelAlign:AOC.config.Settings.form.topLabelAlign
			},
			items:[
				{
					xtype:'combo',
					fieldLabel:'Assignee',
					name:'assignee',
					flex:1,
					displayField:'roleName',
					reference:'assigneeCombo',
					valueField:'id',
					store:new Ext.data.JsonStore({
						autoLoad:true,
						proxy:{
							type: 'rest',
							url:applicationContext+'/rest/wiroles',
					        reader: {
					            type: 'json'
					        }
						},
						fields:['roleName','id','roleId']
					})
				},
				{
					xtype:'combo',
					fieldLabel:'Status',
					name:'status',
					flex:1,
					displayField:'value',
					reference:'statusCombo',
					valueField:'id',
					value:'1',
					margin:'0 0 0 10',
					store:new Ext.data.JsonStore({
						autoLoad:true,
						proxy:{
							type: 'rest',
							url:applicationContext+'/rest/wistatus',
					        reader: {
					            type: 'json'
					        }
						},
						fields:['value','id','roleId']
					})
				}
			]
		}
	},
	getUploadOrderFileItems:function(){
		return {
		   xtype:'fieldcontainer',
		   margin:'0 0 5 0',
		   layout:'hbox',
		   items:[
				{   
					xtype:'fileuploadfield',
					buttonText:'Upload Order File',
					name: 'orderfile',
					width:150,
					reference: 'orderfileattachment',
					hideLabel:true,
					buttonOnly:true,
					itemId:'orderfileattachment',
					listeners:{
						'change':'onOrderFileAttachmentChange'
					}
				},
				{
			    	xtype:'container',
			    	itemId:'orderFileImageContainer',
			    	reference:'orderFileImageContainer',
			    	flex:1,
			    	margin:'0 0 0 10'
			    }
		   ]
	   };
	},
	getUploadAttachementItems:function(){
		return {
		   xtype:'fieldcontainer',
		   margin:'0 0 5 0',
		   layout:'hbox',
		   items:[
				{   
					xtype:'fileuploadfield',
					buttonText:'Upload Attachment',
					name: 'attachment',
					width:150,
					reference: 'attachment',
					hideLabel:true,
					buttonOnly:true,
					itemId:'attachment',
					listeners:{
						'change':'onAttachmentChange'
					}
				},
				{
			    	xtype:'container',
			    	itemId:'attchmentContainer',
			    	reference:'attchmentContainer',
			    	flex:1,
			    	margin:'0 0 0 10'
			    }
		   ]
	   };
	},
	getSampleFileItems:function(){
		return {
		   xtype:'fieldcontainer',
		   margin:'0 0 5 0',
		   layout:'hbox',
		   items:[
				{   
					xtype:'fileuploadfield',
					buttonText:'Upload Sample File',
					name: 'sampleFile',
					width:150,
					buttonOnly:true,
					reference: 'sampleFile',
					hideLabel:true,
					itemId:'sampleFile',
					listeners:{
						'change':'onSampleFileChange'
					}
				},
				{
			    	xtype:'container',
			    	itemId:'sampleFileContainer',
			    	reference:'sampleFileContainer',
			    	flex:1,
			    	margin:'0 0 0 10'
			    }
		   ]
	   };
	},
	getOthersItems:function(){
		return {
			title:'Others',
			cls:'wi-form-panel-header',
			titleAlign:'center',
			bodyPadding:10,
			layout:{
				type:'vbox',
				align:'stretch'
			},
			items:[
			    {
			    	xtype:'textfield',
			    	fieldLabel:'Please specify any other special rules/Remark',
			    	name:'specialRulesRemark',
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign
			    },
			    {
			    	xtype:'label',
			    	text:'Upload factory\'s original incoming email in pdf with order files in their original format and other materials to google drive (remarks: remind to create different sub-folders to keep files of different WI#)',
			    	labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
			    	margin:'5 0'
			    },
			    {
					xtype:'fieldcontainer',
					flex:1,
					margin:'0 0 5 0',
					layout:{
						type:'hbox',
						align:'stretch'
					},
					defaults:{
						labelSeparator:'',
						labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
						labelAlign:AOC.config.Settings.form.topLabelAlign
					},
					items:[
						{
							xtype:'textfield',
							flex:1,
							fieldLabel:'Link',
							name:'link',
							reference:'link'
						},
					    {
					    	xtype:'textfield',
					    	flex:1,
					    	fieldLabel:'Folder Layers',
					    	margin:'0 0 0 10',
					    	name:'folderLayers',
					    	reference:'folderLayers'
					    }
					]
				},
				{
					xtype:'textfield',
					flex:1,
					fieldLabel:'File Naming',
					name:'fileNaming',
					reference:'fileNaming',
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign
				}
			]
			
		}
	},
	getSKUValidationItems:function(){
		return {
			title:'SKU Validation',
			cls:'wi-form-panel-header',
			titleAlign:'center',
			margin:'10 0',
			bodyPadding:10,
			layout:{
				type:'anchor'
				//align:'stretch'
			},
			items:[
				{
					xtype:'label',
					text:'Size Validation',
					style:'font-weight:bold;color:#2c3e50;font-size:15px;'
				},
				{
					xtype:'radiogroup',
					fieldLabel:'Is there any size validation for this structure? '+Ext.String.format(AOCLit.wiInfoIconText, 'i.e. size has to be validated by Size Chart/Size Page/Additional attachment'),
					reference:'sizeValidationStructure',
					width:600,
					margin:'0 0 5 0',
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:400,
					items:[
					  { boxLabel:'Yes',inputValue:'Yes',name:'sizeValidationStructure'},
					  { boxLabel:'No',inputValue:'No',name:'sizeValidationStructure'}
					]
				},
				{
			    	xtype:'textfield',
			    	flex:1,
			    	labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign,
					anchor:'50%',
			    	fieldLabel:'If yes, could you advise the SKU field name that requires size validation',
			    	margin:'0 0 5 0',
			    	name:'sizeValidationSKUFieldName',
			    	reference:'sizeValidationSKUFieldName'
			    },
				{
					xtype:'label',
					text:'Fabric Content Validation',
					style:'font-weight:bold;color:#2c3e50;font-size:15px;'
				},
				{
					xtype:'radiogroup',
					fieldLabel:'Is there any Fiber Content validation for this structure? '+Ext.String.format(AOCLit.wiInfoIconText, 'i.e. Sum of the Fabric Content must be in the multiple of 100%'),
					reference:'fiberContentValidationStructure',
					width:600,
					margin:'0 0 5 0',
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:400,
					items:[
					  { boxLabel:'Yes',inputValue:'Yes',name:'fiberContentValidationStructure'},
					  { boxLabel:'No',inputValue:'No',name:'fiberContentValidationStructure'}
					]
				},
				{
			    	xtype:'textfield',
			    	labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign,
					anchor:'50%',
			    	margin:'0 0 5 0',
			    	fieldLabel:'If yes, could you advise the SKU field name that requires Fiber Content validation',
			    	name:'fibreContentValidationSKUFieldName',
			    	reference:'fibreContentValidationSKUFieldName'
			    },
				{
					xtype:'label',
					text:'COO Validation',
					style:'font-weight:bold;color:#2c3e50;font-size:15px;'
				},
				{
					xtype:'radiogroup',
					fieldLabel:'Is there any COO validation for this structure? '+Ext.String.format(AOCLit.wiInfoIconText, 'i.e. Country of Origin or its translation has to be validated'),
					reference:'cooValidationStructure',
					width:600,
					margin:'0 0 5 0',
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:400,
					items:[
					  { boxLabel:'Yes',inputValue:'Yes',name:'cooValidationStructure'},
					  { boxLabel:'No',inputValue:'No',name:'cooValidationStructure'}
					]
				},
				{
			    	xtype:'textfield',
			    	flex:1,
			    	fieldLabel:'If yes, could you advise the SKU field name that requires COO validation',
			    	labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign,
					anchor:'50%',
			    	margin:'0 0 5 0',
			    	name:'cooValidationSKUFieldName',
			    	reference:'cooValidationSKUFieldName'
			    }
			]
		}
	},
	getGeneralInformationItems:function(){
		return [
    	    {
    	    	xtype:'label',
    	    	style:'font-weight:bold;color:#2c3e50;font-size:15px;',
    	    	text:'1. General Information and practice'
    	    },
    	    {
    	    	xtype:'fieldcontainer',
    	    	margin:'0 0 5 0',
    	    	flex:1,
    	    	layout:{
    	    		type:'hbox',
    	    		align:'stretch' 	
    	    	},
    	    	defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign
				},
    	    	items:[
    	    	    {
    	    	    	xtype:'combo',
    	    	    	name:'orderPlacementMethod',
    	    	    	fieldLabel:'Order Placement Method',
    	    	    	reference:'orderPlacementMethod',
    	    	    	displayField:'name',
    	    	    	flex:1,
    	    	    	valueField:'name',
    	    	    	queryMode:'local',
    	    	    	store:new Ext.data.JsonStore({
    	    	    		data:[{name:'Direct Email Form Customer'},{name:'Email Forwarded by CS'}],
    	    	    		fields:['name']
    	    	    	})
    	    	    },
    	    	    {
    	    	    	xtype:'combo',
    	    	    	name:'aocWaive',
    	    	    	fieldLabel:'Should AOC waive all SKU MOQ for this structure?',
    	    	    	reference:'aocWaive',
    	    	    	margin:'0 0 0 10',
    	    	    	flex:1,
		    	    	editable:false,
		    	    	store:Helper.getYesNoStore()
    	    	    }
    	    	]
    	    },
    	    {
    	    	xtype:'fieldcontainer',
    	    	margin:'0 0 15 0',
    	    	layout:{
    	    		type:'hbox',
    	    		align:'stretch'
    	    	},
    	    	defaults:{
        	    	labelSeparator:'',
    				labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
    				labelAlign:AOC.config.Settings.form.topLabelAlign
    	    	},
    	    	items:[
    	    	   {
		    	    	xtype:'textfield',
		    	    	name:'emailSubjectWarning',
		    	    	flex:1,
		    	    	fieldLabel:'Please specify the wordings in the Email subject that AOC has to raise warning if any?'
		    	    },
		    	    {
		    	    	xtype:'textfield',
		    	    	name:'emailContentWarning',
		    	    	margin:'0 0 0 10',
		    	    	flex:1,
		    	    	fieldLabel:'Please specify the wordings in the Email content that AOC has to raise warning if any?'
		    	    }
    	    	]
    	    }
    	];
	},
	getSampleBulkItems:function(){
		return [
    	    {
    	    	xtype:'label',
    	    	style:'font-weight:bold;color:#2c3e50;font-size:15px;',
    	    	text:'2. Sample/Bulk'
    	    },
    	    {
    	    	xtype:'fieldcontainer',
    	    	flex:1,
    	    	margin:'0 0 5 0',
    	    	defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:430
				},
    	    	items:[
					{
						xtype:'radiogroup',
						fieldLabel:'Is there any sample/bulk order that would be ordered in this WI?',
						reference:'sampleBulkOrderPresentWI',
						width:600,
						margin:'0 0 5 0',
						items:[
						  { boxLabel:'Yes', inputValue:'Yes', name:'sampleBulkOrderPresentWI'},
						  { boxLabel:'No', inputValue:'No', name:'sampleBulkOrderPresentWI'}
						]
					},
					{
						xtype:'radiogroup',
						fieldLabel:'Is the sample order required to waive MOQ?',
						reference:'sampleOrderRequiredMOQ',
						width:600,
						margin:'0 0 5 0',
						items:[
						  {boxLabel:'Yes',inputValue:'Yes',name:'sampleOrderRequiredMOQ'},
						  {boxLabel:'No',inputValue:'No',name:'sampleOrderRequiredMOQ'}
						]
					},
					{
						xtype:'radiogroup',
						fieldLabel:'Is there any sample item that would be ordered in this WI?',
						reference:'sampleItemRequiredWI',
						width:600,
						margin:'0 0 5 0',
						items:[
						  { boxLabel:'Yes',inputValue:'Yes',name:'sampleItemRequiredWI'},
						  { boxLabel:'No',inputValue:'No',name:'sampleItemRequiredWI'}
						]
					},
					{
						xtype:'radiogroup',
						fieldLabel:'Is it the rule that sample items are not approved to be ordered by bulk order?',
						reference:'sampleItemApproved',
						width:600,
						margin:'0 0 5 0',
						items:[
						  { boxLabel:'Yes',inputValue:'Yes',name:'sampleItemApproved'},
						  { boxLabel:'No',inputValue:'No',name:'sampleItemApproved'}
						]
					}
    	    	]
    	    },
    	    {
    	    	xtype:'fieldcontainer',
    	    	flex:1,
    	    	margin:'0 0 5 0',
    	    	layout:{
    	    		type:'hbox',
    	    		align:'stretch' 	
    	    	},
    	    	defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign
				},
    	    	items:[
    	    	    {
    	    	    	xtype:'textarea',
    	    	    	name:'bulkOrderIdentified',
    	    	    	fieldLabel:'Bulk Order can be identified if',
    	    	    	reference:'bulkOrderIdentified',
    	    	    	flex:1
    	    	    },
    	    	    {
    	    	    	xtype:'textarea',
    	    	    	name:'sampleOrderIdentified',
    	    	    	fieldLabel:'Sample Order can be identified if',
    	    	    	reference:'sampleOrderIdentified',
    	    	    	margin:'0 0 0 10',
    	    	    	flex:1
    	    	    }
    	    	    
    	    	]
    	    },
    	    {
    	    	xtype:'fieldcontainer',
    	    	flex:1,
    	    	margin:'0 0 15 0',
    	    	layout:{
    	    		type:'hbox',
    	    		align:'stretch' 	
    	    	},
    	    	defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign
				},
    	    	items:[
					{
    	    	    	xtype:'combo',
    	    	    	name:'isSampleItem',
    	    	    	fieldLabel:'How can we identify if the item is sample item?',
    	    	    	reference:'isSampleItem',
    	    	    	displayField:'name',
    	    	    	valueField:'name',
    	    	    	flex:1,
    	    	    	queryMode:'local',
    	    	    	store:new Ext.data.JsonStore({
    	    	    		data:[{name:'"SMS" would be stated in the Oracle item Description in "PX Item Spec"'},
    	    	    		      {name:'Others(please specify below)'}],
    	    	    		fields:['name']
    	    	    	})
    	    	    },
    	    	    {
    	    	    	xtype:'textfield',
    	    	    	name:'sampleBulkOthers',
    	    	    	margin:'0 0 0 10',
    	    	    	fieldLabel:'Sample/Bulk - Others',
    	    	    	reference:'sampleBulkOthers',
    	    	    	flex:1
    	    	    }
    	    	]
    	    },
    	    {
    	    	xtype:'label',
    	    	text:'3. Internal information for CS (Please ignore for Adeptia) that would not be handled by AOC',
    	    	style:'font-weight:bold;color:#2c3e50;font-size:15px;'
    	    },
    	    {
    	    	xtype:'fieldcontainer',
    	    	flex:1,
    	    	margin:'0 0 5 0',
    	    	defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:200
				},
				items:[
					{
						xtype:'radiogroup',
						fieldLabel:'Discount Price',
						reference:'discountPrice',
						width:400,
						margin:'0 0 5 0',
						items:[
						  { boxLabel:'Yes',inputValue:'Yes',name:'discountPrice'},
						  { boxLabel:'No',inputValue:'No',name:'discountPrice'}
						]
					},
					{
						xtype:'radiogroup',
						fieldLabel:'Pricing Aggrement',
						reference:'pricingAggrement',
						width:400,
						margin:'0 0 5 0',
						items:[
						  { boxLabel:'Yes',inputValue:'Yes',name:'pricingAggrement'},
						  { boxLabel:'No',inputValue:'No',name:'pricingAggrement'}
						]
					}
				]
    	    }
    	];
	},
	getOrderExtractionItems:function(){
		return [
		    {
		    	xtype:'label',
		    	text:'1. Line Information',
		    	style:'font-weight:bold;color:#2c3e50;font-size:15px;',
		    	flex:1
		    },
		    {
		    	xtype:'fieldcontainer',
		    	margin:'0 0 20 0',
		    	flex:1,
		    	layout:{
		    		type:'hbox',
		    		align:'stretch'
		    	},
		    	defaults:{
			    	labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign
		    	},
		    	items:[
					{
						xtype:'textarea',
						fieldLabel:'Order grouping - how the order lines should be grouped from order form to AOC?',
						name:'internalInformation',
						reference:'internalInformation',
						flex:1
					},
					{
						xtype:'textarea',
						fieldLabel:'Order grouping - how the orders should be grouped from AOC to the back end system?',
						name:'orderGrouping',
						reference:'orderGrouping',
						margin:'0 0 0 10',
						flex:1
					}
		    	]
		    },
		    {
		    	xtype:'label',
		    	text:'2. Order Information',
		    	style:'font-weight:bold;color:#2c3e50;font-size:15px;',
		    	flex:1
		    },
		    {
		    	xtype:'textarea',
		    	fieldLabel:'If there is an additional attachment, what is the identifier to map the order information/data between order form and attachment? ',
		    	name:'attachmentIdentifier',
		    	reference:'attachmentIdentifier',
		    	flex:1,
		    	margin:'0 0 5 0',
		    	labelSeparator:'',
				labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
				labelAlign:AOC.config.Settings.form.topLabelAlign
		    },
		    {
		    	xtype:'textarea',
		    	fieldLabel:'If there is an additional attachment, please specify the process on how we can map the order information/data between order form and attachment ',
		    	name:'attachmentProcess',
		    	reference:'attachmentProcess',
		    	flex:1,
		    	margin:'0 0 20 0',
		    	labelSeparator:'',
				labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
				labelAlign:AOC.config.Settings.form.topLabelAlign
		    },
		    {
		    	xtype:'label',
		    	text:'3. Bill/Ship Information',
		    	style:'font-weight:bold;color:#2c3e50;font-size:15px;',
		    	flex:1
		    },
		    {
		    	xtype:'fieldcontainer',
		    	flex:1,
		    	margin:'0 0 5 0',
		    	layout:{
		    		type:'hbox',
		    		align:'stretch'
		    	},
    	    	defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign
				},
				items:[
					{
						xtype:'textfield',
						fieldLabel:'Please list out all Bill to Site Number (For testing purpose)',
						name:'billToSiteNumber',
						reference:'billToSiteNumber',
						flex:1
					},
					{
				    	xtype:'textfield',
				    	fieldLabel:'Please list out all Ship to Site Number (For testing purpose)',
				    	name:'shipToSiteNumber',
				    	reference:'shipToSiteNumber',
				    	margin:'0 0 0 10',
				    	flex:1
				    }
				]
		    },
		    {
		    	xtype:'fieldcontainer',
		    	flex:1,
		    	margin:'0 0 5 0',
		    	layout:{
		    		type:'hbox',
		    		align:'stretch'
		    	},
    	    	defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign
				},
				items:[
			       {
					   xtype:'combo',
					   name:'billToSite',
					   reference:'billToSite',
					   fieldLabel:'How can we determine Bill to Site#',
					   flex:1,
					   editable:false,
					   displayField:'name',
					   valueField:'name',
					   queryMode:'local',
					   store:new Ext.data.JsonStore({
						   data:[
						       {name:'Default Value'},{name:'Bill To Address'},{name:'PO# (Please fill in "Bill/Ship Mapping Table")'},
						       {name:'Email Subject (Please fill in "Bill/Ship Mapping Table")'},
						       {name :'Others ( (Please specify & fill in "Bill/Ship Mapping Table")'}
						   ],
						   fields:'name'
					   })
				   },
				   {
				    	xtype:'combo',
				    	fieldLabel:'How can we determine Ship to Site#',
				    	name:'shipToSite',
				    	reference:'shipToSite',
				    	margin:'0 0 0 10',
		    	    	editable:false,
		    	    	displayField:'name',
		    	    	valueField:'name',
		    	    	queryMode:'local',
		    	    	store:new Ext.data.JsonStore({
						   data:[
						       {name:'Default Value'},{name:'Ship To Address'},{name:'PO#'},
						       {name:'Email Subject'},{name:'Shippig Mark'},
						       {name :'Others ( (Please specify & fill in "Bill/Ship Mapping Table")'}
						   ],
						   fields:'name'
		    	    	}),
				    	flex:1
				    }
				]
		    }
		]
	}
});