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
		    	margin:'5 0',
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
		    me.getOthersItems()
		]
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
				type:'vbox',
				align:'stretch'
			},
			items:[
				{
					xtype:'label',
					text:'Size Validation',
					style:'font-weight:bold;color:#2c3e50;font-size:15px;',
				},
				{
					xtype:'fieldcontainer',
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
	    	    	    	name:'sizeValidationStructure',
	    	    	    	fieldLabel:'Is there any size validation for this structure?',
	    	    	    	reference:'sizeValidationStructure',
	    	    	    	flex:1,
	    	    	    	editable:false,
	    	    	    	store:Helper.getYesNoStore()
					    },
					    {
		                	xtype:'box',
		                	html:Ext.String.format(AOCLit.wiInfoIconText, 'i.e. size has to be validated by Size Chart/Size Page/Additional attachment'),
		                	margin:'36 0 0 5'	
		                },
					    {
					    	xtype:'textfield',
					    	flex:1,
					    	fieldLabel:'If yes, could you advise the SKU field name that requires size validation',
					    	margin:'0 0 0 10',
					    	name:'sizeValidationSKUFieldName',
					    	reference:'sizeValidationSKUFieldName'
					    }
					]
				},
				{
					xtype:'label',
					text:'Fabric Content Validation',
					style:'font-weight:bold;color:#2c3e50;font-size:15px;',
				},
				{
					xtype:'fieldcontainer',
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
	    	    	    	name:'fiberContentValidationStructure',
	    	    	    	fieldLabel:'Is there any Fiber Content validation for this structure?',
	    	    	    	reference:'fibreContentValidationStructure',
	    	    	    	flex:1,
	    	    	    	store:Helper.getYesNoStore()
					    },
					    {
		                	xtype:'box',
		                	html:Ext.String.format(AOCLit.wiInfoIconText, 'i.e. Sum of the Fabric Content must be in the multiple of 100%'),
		                	margin:'36 0 0 5'	
		                },
					    {
					    	xtype:'textfield',
					    	flex:1,
					    	margin:'0 0 0 10',
					    	fieldLabel:'If yes, could you advise the SKU field name that requires Fiber Content validation',
					    	name:'fibreContentValidationSKUFieldName',
					    	reference:'fibreContentValidationSKUFieldName'
					    }
					]
				},
				{
					xtype:'label',
					text:'COO Validation',
					style:'font-weight:bold;color:#2c3e50;font-size:15px;'
				},
				{
					xtype:'fieldcontainer',
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
	    	    	    	name:'cooValidationStructure',
	    	    	    	fieldLabel:'Is there any COO validation for this structure?',
	    	    	    	reference:'cooValidationStructure',
	    	    	    	flex:1,
	    	    	    	editable:false,
	    	    	    	store:Helper.getYesNoStore()
					    },
					    {
		                	xtype:'box',
		                	html:Ext.String.format(AOCLit.wiInfoIconText, 'i.e. Country of Origin or its translation has to be validated'),
		                	margin:'36 0 0 5'	
		                },
					    {
					    	xtype:'textfield',
					    	flex:1,
					    	fieldLabel:'If yes, could you advise the SKU field name that requires COO validation',
					    	margin:'0 0 0 10',
					    	name:'cooValidationSKUFieldName',
					    	reference:'cooValidationSKUFieldName'
					    }
					]
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
    	    	    	bind:'{detail.orderPlacementMethod}',
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
    	    	    	bind:'{detail.aocWaive}',
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
		    	    	name:'emailSubjectWarning',
		    	    	bind:'{detail.emailSubjectWarning}',
		    	    	flex:1,
		    	    	fieldLabel:'Please specify the wordings in the Email subject that AOC has to raise warning if any?'
		    	    },
		    	    {
		    	    	xtype:'textfield',
		    	    	name:'emailContentWarning',
		    	    	margin:'0 0 0 10',
		    	    	bind:'{detail.emailContentWarning}',
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
    	    	    	name:'sampleBulkOrderPresentWI',
    	    	    	bind:'{detail.sampleBulkOrderPresentWI}',
    	    	    	fieldLabel:'Is there any sample/bulk order that would be ordered in this WI?',
    	    	    	reference:'sampleBulkOrderPresentWI',
    	    	    	flex:1,
		    	    	editable:false,
		    	    	store:Helper.getYesNoStore()
    	    	    },
    	    	    {
    	    	    	xtype:'combo',
    	    	    	name:'sampleOrderRequiredMOQ',
    	    	    	bind:'{detail.sampleOrderRequiredMOQ}',
    	    	    	fieldLabel:'Is the sample order required to waive MOQ?',
    	    	    	reference:'sampleOrderRequiredMOQ',
    	    	    	flex:1,
    	    	    	margin:'0 10',
		    	    	editable:false,
		    	    	store:Helper.getYesNoStore()
    	    	    },
    	    	    {
    	    	    	xtype:'combo',
    	    	    	name:'sampleItemRequiredWI',
    	    	    	bind:'{detail.sampleItemRequiredWI}',
    	    	    	fieldLabel:'Is there any sample item that would be ordered in this WI?',
    	    	    	reference:'sampleItemRequiredWI',
    	    	    	flex:1,
		    	    	editable:false,
		    	    	store:Helper.getYesNoStore()
    	    	    }
    	    	]
    	    },
    	    {
    	    	xtype:'fieldcontainer',
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
    	    	    	xtype:'textfield',
    	    	    	name:'bulkOrderIdentified',
    	    	    	bind:'{detail.bulkOrderIdentified}',
    	    	    	fieldLabel:'Bulk Order can be identified if',
    	    	    	reference:'bulkOrderIdentified',
    	    	    	flex:1
    	    	    },
    	    	    {
    	    	    	xtype:'textfield',
    	    	    	name:'sampleOrderIdentified',
    	    	    	bind:'{detail.sampleOrderIdentified}',
    	    	    	fieldLabel:'Sample Order can be identified if',
    	    	    	reference:'sampleOrderIdentified',
    	    	    	margin:'0 10',
    	    	    	flex:1
    	    	    },
    	    	    {
    	    	    	xtype:'combo',
    	    	    	name:'isSampleItem',
    	    	    	bind:'{detail.isSampleItem}',
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
    	    	    }
    	    	]
    	    },
    	    {
    	    	xtype:'fieldcontainer',
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
    	    	    	name:'sampleItemApproved',
    	    	    	bind:'{detail.sampleItemApproved}',
    	    	    	fieldLabel:'Is it the rule that sample items are not approved to be ordered by bulk order?',
    	    	    	reference:'sampleItemApproved',
    	    	    	flex:1,
		    	    	editable:false,
		    	    	store:Helper.getYesNoStore()
    	    	    },
    	    	    {
    	    	    	xtype:'textfield',
    	    	    	name:'sampleBulkOthers',
    	    	    	bind:'{detail.sampleBulkOthers}',
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
					   name:'discountPrice',
					   bind:'{detail.discountPrice}',
					   fieldLabel:'Discount Price',
					   flex:1,
					   editable:false,
					   store:Helper.getYesNoStore()
				   },
				   {
					   xtype:'combo',
					   name:'pricingAggrement',
					   bind:'{detail.pricingAggrement}',
					   fieldLabel:'Pricing Aggrement',
					   margin:'0 0 0 10',
					   flex:1,
					   editable:false,
					   store:Helper.getYesNoStore()
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
						xtype:'textfield',
						fieldLabel:'Internal information for CS (Please ignore for Adeptia): Discount price, pricing agreement',
						name:'internalInformation',
						bind:'{detail.internalInformation}',
						reference:'internalInformation',
						flex:1
					},
					{
						xtype:'textfield',
						fieldLabel:'Order grouping - how the orders should be grouped from AOC to the back end system?',
						name:'orderGrouping',
						bind:'{detail.orderGrouping}',
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
		    	xtype:'textfield',
		    	fieldLabel:'If there is an additional attachment, what is the identifier to map the order information/data between order form and attachment? ',
		    	name:'attachmentIdentifier',
		    	bind:'{detail.attachmentIdentifier}',
		    	reference:'attachmentIdentifier',
		    	flex:1,
		    	labelSeparator:'',
				labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
				labelAlign:AOC.config.Settings.form.topLabelAlign
		    },
		    {
		    	xtype:'textfield',
		    	fieldLabel:'If there is an additional attachment, please specify the process on how we can map the order information/data between order form and attachment ',
		    	name:'attachmentProcess',
		    	bind:'{detail.attachmentProcess}',
		    	reference:'attachmentProcess',
		    	flex:1,
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
						bind:'{detail.billToSiteNumber}',
						reference:'billToSiteNumber',
						flex:1
					},
					{
				    	xtype:'textfield',
				    	fieldLabel:'Please list out all Ship to Site Number (For testing purpose)',
				    	name:'shipToSiteNumber',
				    	bind:'{detail.shipToSiteNumber}',
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
					   name:'billToSite#',
					   bind:'{detail.billToSite#}',
					   reference:'billToSite',
					   fieldLabel:'How can we determine Bill to Site#',
					   flex:1,
					   editable:false,
					   displayField:'name',
					   valueField:'name',
					   queryMode:'local',
					   store:new Ext.data.JsonStore({
						   data:[
						       {name:'1 Default Value'},{name:'Bill To Address'},{name:'PO# (Please fill in "Bill/Ship Mapping Table")'},
						       {name:'Email Subject (Please fill in "Bill/Ship Mapping Table")'},
						       {name :'Others ( (Please specify & fill in "Bill/Ship Mapping Table")'}
						   ],
						   fields:'name'
					   })
				   },
				   {
				    	xtype:'combo',
				    	fieldLabel:'How can we determine Ship to Site#',
				    	name:'shipToSite#',
				    	bind:'{detail.shipToSite#}',
				    	reference:'shipToSite',
				    	margin:'0 0 0 10',
		    	    	editable:false,
		    	    	displayField:'name',
		    	    	valueField:'name',
		    	    	queryMode:'local',
		    	    	store:new Ext.data.JsonStore({
						   data:[
						       {name:'1 Default Value'},{name:'Ship To Address'},{name:'PO#'},
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