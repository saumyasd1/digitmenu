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
						height:500,
						scrollable:true
					}
				])
		    },
		    {
		    	xtype:'label',
		    	text:'Notes: RBO/Program/Product line specific guidelines, aimed at showing how to validate the sku information or applying logic that applicable to the whole RBO or program or product lines.This guidelines can be shared with all WI under the same RBO/Program/Product line.',
		    	style:'font-weight:bold;color:#2c3e50;font-size:15px;font-style: italic;color: #808080;'
		    },
		    me.getSKUValidationItems(),
		    {
		    	xtype:'checkboxgroup',
		    	columns:3,
		    	vertical:true,
		    	labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
		    	width:550,
		    	items:[
		    	    { boxLabel:'Size Check', name:'sizeCheck', inputValue:'true'},
		    	    { boxLabel:'Fabric Check', name:'fabricCheck', inputValue:'true'},
		    	    { boxLabel:'Waive MOQ', name:'waiveMOQ', inputValue:'true'}
		    	]
		    },
		    {
		    	xtype:'wiorderfiberlinegrid',
		    	reference:'wiorderfiberlinegrid',
		    	height:300,
		    	scrollable:true,
		    	margin:'20 0',
		    	border:'solid 1px #ccc;'
		    },
		    me.getOthersItems(),
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
					fieldLabel:'Status',
					name:'status',
					flex:1,
					displayField:'value',
					reference:'statusCombo',
					valueField:'id',
					queryMode:'local',
					store:Ext.data.StoreManager.lookup('wiStatusStore') == null ? Ext.create('AOC.store.WIStatusStore',{storeId:'wiStatusStore'}) : Ext.data.StoreManager.lookup('wiStatusStore'),
					listeners:{
						blur:'onWIComboBlur',
						select:'onStatusSelect'
                	}
				},
				{
					xtype:'combo',
					fieldLabel:'Assignee',
					name:'assignee',
					flex:1,
					displayField:'assigneeName',
					reference:'assigneeCombo',
					disabled:true,
					valueField:'id',
					margin:'0 0 0 10',
					queryMode:'local',
					listeners:{
						blur:'onWIComboBlur'
					},
					store:Ext.data.StoreManager.lookup('wiAssigneeStore') == null ? Ext.create('AOC.store.WIAssigneeStore',{storeId:'wiAssigneeStore'}) : Ext.data.StoreManager.lookup('wiAssigneeStore')
				}
			]
		}
	},
	getUploadOrderFileItems:function(){
		return {
		   xtype:'fieldcontainer',
		   margin:'10 0 5 0',
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
			    	xtype:'textarea',
			    	fieldLabel:'Please specify any other special rules/Remark',
			    	name:'specialRulesRemark',
					labelSeparator:'',
					maxLength:250,
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
							xtype:'textarea',
							flex:1,
							fieldLabel:'Link',
							name:'link',
							reference:'link',
							maxLength:250
						},
					    {
					    	xtype:'textarea',
					    	flex:1,
					    	fieldLabel:'Folder Layers',
					    	margin:'0 0 0 10',
					    	name:'folderLayers',
							maxLength:250,
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
			margin:'20 0',
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
					width:550,
					margin:'0 0 5 0',
					labelSeparator:'',
					defaults:{
						name:'sizeValidationStructure'
					},
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:400,
					items:[
					  { boxLabel:'Yes',inputValue:'Yes'},
					  { boxLabel:'No',inputValue:'No'}
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
					width:550,
					margin:'0 0 5 0',
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:400,
					defaults:{
						name:'fiberContentValidationStructure'
					},
					items:[
					  { boxLabel:'Yes',inputValue:'Yes'},
					  { boxLabel:'No',inputValue:'No'}
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
					width:550,
					margin:'0 0 5 0',
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:400,
					defaults:{
						name:'cooValidationStructure'
					},
					items:[
					  { boxLabel:'Yes',inputValue:'Yes'},
					  { boxLabel:'No',inputValue:'No'}
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
    	    		type:'anchor'
    	    	},
    	    	defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:430
				},
    	    	items:[
					{
						xtype:'radiogroup',
						column:2,
						margin:'0 0 5 0',
						anchor:'80%',
						defaults:{
							name:'orderPlacementMethod'
						},
						fieldLabel:'Should AOC waive all SKU MOQ for this structure?',
						items:[
						    { boxLabel: 'Direct Email Form Customer', inputValue:'1'},
						    { boxLabel: 'Email Forwarded by CS', inputValue:'2'}
						]
					},
					{
						xtype:'radiogroup',
						column:2,
						margin:'0 0 5 0',
						defaults:{
							name:'aocWaive'
						},
						width:550,
						fieldLabel:'Should AOC waive all SKU MOQ for this structure?',
						items:[
						    { boxLabel: 'Yes', inputValue:'Yes'},
						    { boxLabel: 'No', inputValue:'No'}
						]
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
						width:550,
						margin:'0 0 5 0',
						defaults:{
							name:'sampleBulkOrderPresentWI'
						},
						items:[
						  { boxLabel:'Yes', inputValue:'Yes'},
						  { boxLabel:'No', inputValue:'No'}
						]
					},
					{
						xtype:'radiogroup',
						fieldLabel:'Is the sample order required to waive MOQ?',
						reference:'sampleOrderRequiredMOQ',
						width:550,
						defaults:{
							name:'sampleOrderRequiredMOQ'
						},
						margin:'0 0 5 0',
						items:[
						  {boxLabel:'Yes',inputValue:'Yes'},
						  {boxLabel:'No',inputValue:'No'}
						]
					},
					{
						xtype:'radiogroup',
						fieldLabel:'Is there any sample item that would be ordered in this WI?',
						reference:'sampleItemRequiredWI',
						width:550,
						margin:'0 0 5 0',
						defaults:{
							name:'sampleItemRequiredWI'
						},
						items:[
						  { boxLabel:'Yes',inputValue:'Yes'},
						  { boxLabel:'No',inputValue:'No'}
						]
					},
					{
						xtype:'radiogroup',
						fieldLabel:'Is it the rule that sample items are not approved to be ordered by bulk order?',
						reference:'sampleItemApproved',
						width:550,
						margin:'0 0 5 0',
						defaults:{
							name:'sampleItemApproved'
						},
						items:[
						  { boxLabel:'Yes',inputValue:'Yes'},
						  { boxLabel:'No',inputValue:'No'}
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
    	    	    	maxLength:250,
    	    	    	flex:1
    	    	    },
    	    	    {
    	    	    	xtype:'textarea',
    	    	    	name:'sampleOrderIdentified',
    	    	    	fieldLabel:'Sample Order can be identified if',
    	    	    	reference:'sampleOrderIdentified',
    	    	    	margin:'0 0 0 10',
    	    	    	maxLength:250,
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
    	    	    		data:[{name:'None'},{name:'"SMS" would be stated in the Oracle item Description in "PX Item Spec"'},
    	    	    		      {name:'Others(please specify below)'}],
    	    	    		fields:['name']
    	    	    	}),
    	    	    	listeners:{
    	    	    		blur:'onWIComboBlur',
    	    	    		select:'onComboSelect'
	                	}
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
					labelWidth:200,
					width:325
				},
				items:[
					{
						xtype:'radiogroup',
						fieldLabel:'Discount Price',
						reference:'discountPrice',
						margin:'0 0 5 0',
						defaults:{
							name:'discountPrice'
						},
						items:[
						  { boxLabel:'Yes',inputValue:'Yes'},
						  { boxLabel:'No',inputValue:'No'}
						]
					},
					{
						xtype:'radiogroup',
						fieldLabel:'Pricing Aggrement',
						reference:'pricingAggrement',
						margin:'0 0 5 0',
						defaults:{
							name:'pricingAggrement'
						},
						items:[
						  { boxLabel:'Yes',inputValue:'Yes'},
						  { boxLabel:'No',inputValue:'No'}
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
    	    	    	maxLength:250,
						flex:1
					},
					{
						xtype:'textarea',
						fieldLabel:'Order grouping - how the orders should be grouped from AOC to the back end system?',
						name:'orderGrouping',
						reference:'orderGrouping',
						margin:'0 0 0 10',
    	    	    	maxLength:250,
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
    	    	maxLength:250,
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
    	    	maxLength:250,
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
					   store:Helper.getBillToSiteStore(),
					   listeners:{
						   select:'onComboSelect'
					   }
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
		    	    	store:Helper.getShipToSiteStore(),
				    	flex:1,
				    	listeners:{
						   select:'onComboSelect'
				    	}
				    }
				]
		    },
		    {
		    	xtype:'billshipmappinggrid',
		    	reference:'billShipMappingGrid',
		    	height:400,
		    	scrollable:true,
		    	margin:'20 0',
		    	style:'border:solid 1px #ccc;'
		    }
		]
	}
});