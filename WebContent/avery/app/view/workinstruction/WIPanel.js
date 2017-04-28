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
		   reference:'uploadSection',
		   items:[
	          {
	        	  xtype:'panel',
	        	  flex:.5,
	        	  items:[
        	         {   
						xtype:'fileuploadfield',
						buttonText:'Upload Order File',
						name: 'orderfile',
						width:150,
						reference: 'orderfileattachment',
						hideLabel:true,
						margin:'0 0 5 0',
						buttonOnly:true,
						itemId:'orderfileattachment',
						listeners:{
							'change':'onOrderFileAttachmentChange'
						}
        	         }, {   
						xtype:'fileuploadfield',
						buttonText:'Upload Attachment',
						name: 'attachment',
						width:150,
						reference: 'attachment',
						margin:'0 0 5 0',
						hideLabel:true,
						buttonOnly:true,
						itemId:'attachment',
						listeners:{
							'change':'onAttachmentChange'
						}
        	         }, {   
						xtype:'fileuploadfield',
						buttonText:'Upload Sample File',
						name: 'sampleFile',
						width:150,
						margin:'0 0 5 0',
						buttonOnly:true,
						reference: 'sampleFile',
						hideLabel:true,
						itemId:'sampleFile',
						listeners:{
							'change':'onSampleFileChange'
						}
        	         }
	        	  ]
	          },
	          {
				xtype:'container',
				itemId:'orderFileImageContainer',
				reference:'orderFileImageContainer',
				flex:3,
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
			    	margin:'0 0 5 0',
					labelSeparator:'',
					maxLength:Settings.wiConfig.textAreaMaxLength,
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign
			    },
			    {
				   xtype:'fieldcontainer',
				   margin:'0 0 5 0',
				   layout:'hbox',
				   cls:'field-image-cont',
				   items:[
			          {
			        	  xtype:'panel',
			        	  flex:.3,
			        	  items:[
		        	         {   
								xtype:'fileuploadfield',
								buttonText:'Upload Image',
								name: 'specialRulesFileImageUploadField',
								width:150,
								reference: 'specialRulesFileImageUploadField',
								hideLabel:true,
								buttonOnly:true,
								regex: /(.)+((\.png)|(\.jpg)|(\.jpeg)(\w)?)$/i,
			                    regexText: 'Only PNG and JPEG image formats are accepted',
								listeners:{
									change:'onFieldImageUploadChange',
									afterrender:function(cmp){
			                            cmp.fileInputEl.set({
			                                accept:'image/*'
			                            });
			                        }
								}
		        	         }
			        	  ]
			          },
			          {
						xtype:'container',
						itemId:'specialRulesFileImageContainer',
						cls:'image-wrapper',
						reference:'specialRulesFileImageContainer',
						flex:3
			          }
				   ]
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
							maxLength:Settings.wiConfig.textAreaMaxLength
						},
					    {
					    	xtype:'textarea',
					    	flex:1,
					    	fieldLabel:'Folder Layers',
					    	margin:'0 0 0 10',
					    	name:'folderLayers',
							maxLength:Settings.wiConfig.textAreaMaxLength,
					    	reference:'folderLayers'
					    }
					]
				},
				{
				   xtype:'fieldcontainer',
				   margin:'0 0 10 0',
				   layout:'hbox',
				   cls:'field-image-cont',
				   items:[
			          {
			        	  xtype:'panel',
			        	  flex:.3,
			        	  items:[
		        	         {   
								xtype:'fileuploadfield',
								buttonText:'Upload Image',
								name: 'folderLinkFileImageUploadField',
								width:150,
								reference: 'folderLinkFileImageUploadField',
								hideLabel:true,
								buttonOnly:true,
								regex: /(.)+((\.png)|(\.jpg)|(\.jpeg)(\w)?)$/i,
			                    regexText: 'Only PNG and JPEG image formats are accepted',
								listeners:{
									change:'onFieldImageUploadChange',
									afterrender:function(cmp){
			                            cmp.fileInputEl.set({
			                                accept:'image/*'
			                            });
			                        }
								}
		        	         }
			        	  ]
			          },
			          {
						xtype:'container',
						itemId:'folderLinkFileImageContainer',
						cls:'image-wrapper',
						reference:'folderLinkFileImageContainer',
						flex:3
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
						fieldLabel:'Order Placement Method',
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
    	    	margin:'10 0 5 0',
    	    	layout:{
    	    		type:'hbox'	
    	    	},
    	    	defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:430,
					width:550
				},
    	    	items:[
					{
						xtype:'radiogroup',
						fieldLabel:'Is there any sample/bulk order that would be ordered in this WI?',
						reference:'sampleBulkOrderPresentWI',
						margin:'0 0 5 0',
						defaults:{
							name:'sampleBulkOrderPresentWI'
						},
						items:[
						  { boxLabel:'Yes', inputValue:'Yes'},
						  { boxLabel:'No', inputValue:'No'}
						]
					}
    	    	]
    	    },
			{
    	    	xtype:'label',
    	    	style:'font-weight:bold;color:#808080;font-size:13px;font-style:italic;',
    	    	text:'If above field(sample/bulk order) value is yes, how can we identify if the order is Bulk/Sample order based on the order form'
    	    },
    	    {
    	    	xtype:'fieldcontainer',
    	    	flex:1,
    	    	margin:'10 0 5 0',
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
    	    	    	maxLength:Settings.wiConfig.textAreaMaxLength,
    	    	    	flex:1
    	    	    },
    	    	    {
    	    	    	xtype:'textarea',
    	    	    	name:'sampleOrderIdentified',
    	    	    	fieldLabel:'Sample Order can be identified if',
    	    	    	reference:'sampleOrderIdentified',
    	    	    	margin:'0 0 0 10',
    	    	    	maxLength:Settings.wiConfig.textAreaMaxLength,
    	    	    	flex:1
    	    	    }
    	    	    
    	    	]
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
					labelWidth:150,
					width:275
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
						xtype:'textarea',
						fieldLabel:'Order grouping - how the order lines should be grouped from order form to AOC?',
						name:'internalInformation',
						reference:'internalInformation',
    	    	    	maxLength:Settings.wiConfig.textAreaMaxLength,
						flex:1
					},
					{
						xtype:'textarea',
						fieldLabel:'Order grouping - how the orders should be grouped from AOC to the back end system?',
						name:'orderGrouping',
						reference:'orderGrouping',
						margin:'0 0 0 10',
    	    	    	maxLength:Settings.wiConfig.textAreaMaxLength,
						flex:1
					}
		    	]
		    },
		    {
			   xtype:'fieldcontainer',
			   margin:'0 0 10 0',
			   layout:'hbox',
			   cls:'field-image-cont',
			   items:[
		          {
		        	  xtype:'panel',
		        	  flex:.3,
		        	  items:[
	        	         {   
							xtype:'fileuploadfield',
							buttonText:'Upload Image',
							name: 'orderGroupingFileImageUploadField',
							width:150,
							reference: 'orderGroupingFileImageUploadField',
							hideLabel:true,
							buttonOnly:true,
							regex: /(.)+((\.png)|(\.jpg)|(\.jpeg)(\w)?)$/i,
		                    regexText: 'Only PNG and JPEG image formats are accepted',
							listeners:{
								change:'onFieldImageUploadChange',
								afterrender:function(cmp){
		                            cmp.fileInputEl.set({
		                                accept:'image/*'
		                            });
		                        }
							}
	        	         }
		        	  ]
		          },
		          {
					xtype:'container',
					itemId:'orderGroupingFileImageContainer',
					cls:'image-wrapper',
					reference:'orderGroupingFileImageContainer',
					flex:3
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
    	    	maxLength:Settings.wiConfig.textAreaMaxLength,
				labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
				labelAlign:AOC.config.Settings.form.topLabelAlign
		    },
		    {
			   xtype:'fieldcontainer',
			   margin:'0 0 10 0',
			   layout:'hbox',
			   cls:'field-image-cont',
			   items:[
		          {
		        	  xtype:'panel',
		        	  flex:.3,
		        	  items:[
	        	         {   
							xtype:'fileuploadfield',
							buttonText:'Upload Image',
							name: 'attachmentIdentifierFileImageUpload',
							width:150,
							reference: 'attachmentIdentifierFileImageUpload',
							hideLabel:true,
							buttonOnly:true,
							regex: /(.)+((\.png)|(\.jpg)|(\.jpeg)(\w)?)$/i,
		                    regexText: 'Only PNG and JPEG image formats are accepted',
							listeners:{
								change:'onFieldImageUploadChange',
								afterrender:function(cmp){
		                            cmp.fileInputEl.set({
		                                accept:'image/*'
		                            });
		                        }
							}
	        	         }
		        	  ]
		          },
		          {
					xtype:'container',
					itemId:'attachmentIdentifierFileImageContainer',
					cls:'image-wrapper',
					reference:'attachmentIdentifierFileImageContainer',
					flex:3
		          }
			   ]
			},
		    {
		    	xtype:'textarea',
		    	fieldLabel:'If there is an additional attachment, please specify the process on how we can map the order information/data between order form and attachment ',
		    	name:'attachmentProcess',
		    	reference:'attachmentProcess',
		    	flex:1,
		    	margin:'0 0 5 0',
    	    	maxLength:Settings.wiConfig.textAreaMaxLength,
		    	labelSeparator:'',
				labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
				labelAlign:AOC.config.Settings.form.topLabelAlign
		    },
		    {
			   xtype:'fieldcontainer',
			   margin:'0 0 10 0',
			   layout:'hbox',
			   cls:'field-image-cont',
			   items:[
		          {
		        	  xtype:'panel',
		        	  flex:.3,
		        	  items:[
	        	         {   
							xtype:'fileuploadfield',
							buttonText:'Upload Image',
							name: 'attachmentProcessFileImageUpload',
							width:150,
							reference: 'attachmentProcessFileImageUpload',
							hideLabel:true,
							buttonOnly:true,
							regex: /(.)+((\.png)|(\.jpg)|(\.jpeg)(\w)?)$/i,
		                    regexText: 'Only PNG and JPEG image formats are accepted',
							listeners:{
								change:'onFieldImageUploadChange',
								afterrender:function(cmp){
		                            cmp.fileInputEl.set({
		                                accept:'image/*'
		                            });
		                        }
							}
	        	         }
		        	  ]
		          },
		          {
					xtype:'container',
					itemId:'attachmentProcessFileImageContainer',
					cls:'image-wrapper',
					reference:'attachmentProcessFileImageContainer',
					flex:3
		          }
			   ]
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
			   margin:'0 0 10 0',
			   layout:'hbox',
			   cls:'field-image-cont',
			   items:[
		          {
		        	  xtype:'panel',
		        	  flex:.3,
		        	  items:[
	        	         {   
							xtype:'fileuploadfield',
							buttonText:'Upload Image',
							name: 'billShipToSiteNumberFileImageUploadField',
							width:150,
							reference: 'billShipToSiteNumberFileImageUploadField',
							hideLabel:true,
							buttonOnly:true,
							regex: /(.)+((\.png)|(\.jpg)|(\.jpeg)(\w)?)$/i,
		                    regexText: 'Only PNG and JPEG image formats are accepted',
							listeners:{
								change:'onFieldImageUploadChange',
								afterrender:function(cmp){
		                            cmp.fileInputEl.set({
		                                accept:'image/*'
		                            });
		                        }
							}
	        	         }
		        	  ]
		          },
		          {
					xtype:'container',
					itemId:'billShipToSiteNumberFileImageContainer',
					cls:'image-wrapper',
					reference:'billShipToSiteNumberFileImageContainer',
					flex:3
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
			   xtype:'fieldcontainer',
			   margin:'0 0 10 0',
			   layout:'hbox',
			   cls:'field-image-cont',
			   items:[
		          {
		        	  xtype:'panel',
		        	  flex:.3,
		        	  items:[
	        	         {   
							xtype:'fileuploadfield',
							buttonText:'Upload Image',
							name: 'billShipToSiteFileImageUploadField',
							width:150,
							reference: 'billShipToSiteFileImageUploadField',
							hideLabel:true,
							buttonOnly:true,
							regex: /(.)+((\.png)|(\.jpg)|(\.jpeg)(\w)?)$/i,
		                    regexText: 'Only PNG and JPEG image formats are accepted',
							listeners:{
								change:'onFieldImageUploadChange',
								afterrender:function(cmp){
		                            cmp.fileInputEl.set({
		                                accept:'image/*'
		                            });
		                        }
							}
	        	         }
		        	  ]
		          },
		          {
					xtype:'container',
					itemId:'billShipToSiteFileImageContainer',
					cls:'image-wrapper',
					reference:'billShipToSiteFileImageContainer',
					flex:3
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