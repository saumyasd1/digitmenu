Ext.define('AOC.view.partner.CreatePartnerProductLine',{
	extend:'AOC.view.base.NewBaseWindow',
	alias:'widget.createpartnerproductline',
	itemId:'createpartnerproductlineItemId',
	controller:'productlineMain',
	bodyPadding: 10,
	width: Ext.getBody().getWidth()-300,
	height:Ext.getBody().getHeight()-50,
    draggable:false,
    
    mode:'add',
    rec:null,
    additionalFieldCount:1,
    
	scrollable : true,	
    initComponent : function(){
		this.items = this.buildItems();
		this.buttons = this.buildButtons();
		this.callParent(arguments);
	},
	layout:{
		type:'anchor'
	},
	listeners:{
		'afterrender':'onWinAfterRender'
	},
	buildButtons : function(){
		var hiddenFlag = false;
		if(AOCRuntime.getUser().role == 3 || this.mode == 'view'){
			hiddenFlag = true;
		}
		return [
			{
				text : AOCLit.Save,
				handler: 'onSaveBtnClick',
				iconCls:'x-fa fa-save',
				hidden: hiddenFlag 
			},
			{
				text: AOCLit.Cancel,
				iconCls:'x-fa fa-times',
				handler: 'onCancelDetails'
			}
		];
	},
	buildItems:function(){
		var me = this,
			siteStore = Ext.data.StoreManager.lookup('siteId')== null ? Ext.create('AOC.store.SiteStore') : Ext.data.StoreManager.lookup('siteId'),
			rboStore = Ext.data.StoreManager.lookup('rboId') == null ? Ext.create('AOC.store.RBOStore') : Ext.data.StoreManager.lookup('rboId');
		
//		var fileFormatStore = Ext.create('AOC.store.FileFormatStore');
		siteStore.load();
		rboStore.load();
		
		return [
			{
				xtype:'form',
				itemId:'listPanel',
				reference:'partnerProfileForm',
				anchor:'100%',
				border:false,
				items:[
					{
						xtype: 'fieldcontainer',
						layout: 'column',
						margin : '10 0 5 0',
						layout:{
							type:'hbox',
							align:'stretch'
						},
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							flex:1
						},	
						items:[
							{
								xtype:'combo',
								emptyText:AOCLit.partnerName,
								fieldLabel:AOCLit.partnerName,
								name:'partnerId',
								reference:'partnerCombo',
								store:Ext.data.StoreManager.lookup('PartnerManagementStoreId')== null ? Ext.create('AOC.store.PartnerManagementStore') : Ext.data.StoreManager.lookup('PartnerManagementStoreId'),
								allowBlank: false,
								queryMode:'local',
								displayField:'partnerName',
								valueField:'id',
								listeners:{
									blur:'onComboBlur'
								}
							},
							{
								xtype:'combo',
								itemId:'RItemId',
								name: 'rboId',
								reference:'rboId',
								fieldLabel:AOCLit.RBO,
								allowBlank: false,
								emptyText:AOCLit.RBO,
								store:rboStore,
								displayField:'rboName',
								valueField:'id',
								queryMode:'local',
								margin:'0 0 0 10',
								blankTexts: 'RBO Name is required',
								listeners:{
									blur:'onComboBlur'
								}
							}
						]
					},
					{
						xtype: 'fieldcontainer',
						layout: 'column',
						margin : '10 0 5 0',
						layout:{
							type:'hbox',
							align:'stretch'
						},
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							flex:1
						},	
						items:[
							{
								xtype:'textfield',
								itemId:'dataStructureName',
								name: 'dataStructureName',
								reference:'dataStructureName',
								emptyText:AOCLit.dataStructureNameEmptyText,
								allowBlank: false,
								fieldLabel: 'Data Structure Name',
								blankText:'Data Structure Name is required'
							},
							{
								xtype:'combo',
								itemId:'SiteId',
								name: 'site',
								fieldLabel:'Site',
								allowBlank: false,
								changedBefore:false,
								reference:'site',
								valueField:'id',
								displayField:'name',
								maxLength: '100',
								emptyText:'Site',
								editable:false,
								blankText:'Site Name is required',
								store:siteStore,
								margin:'0 0 0 10',
								enforceMaxLength: true,
								listeners : {
									'change':'onSiteSelect'
								}
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
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							flex:1
						},	
						items:[
							{
								xtype:'combo',
								fieldLabel:'Default System',
								emptyText:'System Name',
								name:'defaultSystem',
								reference:'defaultSystemCombo',
								displayField:'name',
								valueField:'id',
								queryMode:'local',
								editable:false,
								disabled:true,
								store:new Ext.data.JsonStore({
									data:[],
									fields:['name', 'id']
								})
							},
							{
								xtype:'box',
								margin:'0 0 0 10'
							}
						]
					},
					{
						xtype:'fieldcontainer',
						reference:'systemcontainer',
						fieldLabel:'Systems<font color=red>*</font>',
						labelSeparator:'',
						labelAlign:'top',
						margin : '0 0 0 0',
						checkboArray:new Array(),
						layout:'anchor',
						labelStyle:Settings.config.defaultFormLabelStyle
					},
					{
				    	xtype:'fieldcontainer',
				    	margin:'0 0 5 0',
				    	flex:1,
				    	defaults:{
							labelSeparator:'',
							labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
							labelAlign:AOC.config.Settings.form.defaultLabelAlign,
							labelWidth:300,
							width:430
				    	},
				    	items:[
							{
								xtype:'radiogroup',
								defaults:{
									name:'defaultBillToCode'
								},
								fieldLabel:'Should AOC default one Bill to Site# only? '+Ext.String.format(AOCLit.wiInfoIconText, AOCLit.aocDefaultOneBillToSiteText),
								reference:'aocDefaultOneBillToSite',
								margin:'0 0 5 0',
								scope:me,
								items:[
								  { boxLabel:'Yes',inputValue:'true'},
								  { boxLabel:'No',inputValue:'false', checked:true}
								]
							},
		 	                {
								xtype:'radiogroup',
								fieldLabel:'Should AOC default one Ship to Site# only? '+Ext.String.format(AOCLit.wiInfoIconText, AOCLit.aocDefaultOneShipToSiteText),
								reference:'aocDefaultOneShipToSite',
								margin:'0 0 5 0',
								defaults:{
									name:'defaultShipToCode'
								},
								items:[
								  { boxLabel:'Yes',inputValue:'true'},
								  { boxLabel:'No',inputValue:'false', checked:true}
								]
							}
				    	]
					},
	        		{
						xtype:'fieldcontainer',
						layout:'hbox',
						margin : '0 0 5 0',
						layout:{
							type:'vbox',
							align:'stretch'
						},
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							flex:1
						},
						items:[
							{
								xtype:'textarea',
								name: 'email',
								height:120,
								grow:true,
								vtype:'multiEmail',
								emptyText:'Email Id\'s with ; separated',
								fieldLabel:'Email ID',
								maxLength:Settings.wiConfig.maxLength2000
							},
							{
								xtype:'textfield',
								reference:'CSRSecondaryId',
								name: 'csrSecondaryId',
								emptyText:'Email Id\'s with ; separated',
								fieldLabel:'CSR Email',
								vtype:'multiEmail',
								blankText : AOCLit.CSRReq
							}
						]
					},
					{
	        			xtype:'fieldcontainer',
	        			margin : '0 0 5 0',
	        			layout:{
	        				type:'hbox',
	        				align:'stretch'
	        			},
	        			defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							flex:1
						},
	        			items:[
							{
								xtype:'combo',
								fieldLabel:AOCLit.productLine,
								reference:'productLineTypeCombo',
								name:'productLineType',
								margin:' 0 10 0 10',
								value:'HTL',
								store:Helper.getProductLineStore(),
								blankText : AOCLit.prodLineReq
							},
							{
								xtype:'box',
								margin:'0 0 0 10'
							}
						]
	        		},
					{
						xtype: 'fieldcontainer',
						fieldLabel: 'Validations',
						defaultType: 'checkboxfield',
						layout:'column',
						labelWidth:150,
						margin : '0 0 5 0',
						labelSeparator:'',
						labelStyle:Settings.config.defaultFormLabelStyle,
						labelAlign:Settings.form.defaultLabelAlign,
						name:'validation',
						defaults:{
							width:150,
							name:'waiveMOQ'
						},
						items: [
							{
								boxLabel : 'Waive MOQ ',
								inputValue: 'true',
								reference : 'waiveMOQ'
							}
						]
					},
					{
						xtype:'radiogroup',
						column:2,
						width:500,
						margin:'0 0 5 0',
						labelSeparator:'',
						labelStyle:Settings.config.defaultFormLabelStyle,
						labelAlign:Settings.form.defaultLabelAlign,
						labelWidth:150,
						reference:'averyItem',
						defaults:{
							name:'averyItem'
						},
						fieldLabel:'GLID/Customer Item #?',
						items:[
						    { boxLabel: 'GLID', inputValue:true},
						    { boxLabel: 'Customer Item #', inputValue:false, checked:true}
						]
			         },
					me.getSKUValidationItems(),
					{
						frame:true,
						collapsible:true,
						collapsed:true,
						title:'Advance Properties',
						titleCollapse:true,
						titleAlign:'center',
						bodyPadding:10,
						layout:{
							type:'vbox',
							align:'stretch'
						},
						defaults:{
							flex:1
						},
						items:[
						    {
						    	xtype:'fieldcontainer',
						    	items:[
					    	       {
								    	xtype:'button',
								    	text:'View Bill/Ship Mapping',
								    	iconCls:'x-fa fa-eye',
								    	hidden:me.mode == 'add',
								    	margin:'10 0',
								    	reference:'viewBillShipMappingBtn',
								    	handler:'onBillShipMappingBtnClick'
								    }
						    	]
						    },
						    {
								xtype: 'fieldcontainer',
								layout: 'column',
								margin : '0 0 5 0',
								layout:{
									type:'vbox'
								},
								defaults:{
									labelSeparator:'',
									labelStyle:Settings.config.defaultFormLabelStyle,
									labelAlign:Settings.form.defaultLabelAlign,
									labelWidth:400
								},
								items:[
//									{
//										xtype:'radiogroup',
//										column:2,
//										width:350,
//										defaults:{
//											name:'billshipRequired'
//										},
//										reference:'billshipRequired',
//										fieldLabel:'Bill/Ship Required?',
//										items:[
//										    { boxLabel: 'Yes', inputValue:'true'},
//										    { boxLabel: 'No', inputValue:'false', checked:true}
//										]
//									}
									{
										xtype:'radiogroup',
										column:2,
										width:800,
										defaults:{
											name:'billToTableType'
										},
										reference:'billToTableType',
										fieldLabel:'Bill to: Bill/Ship Mapping Table OR Address Table ?',
										items:[
										    { boxLabel: 'Bill/Ship Mapping Table', inputValue:'true'},
										    { boxLabel: 'Address Table', inputValue:'false', checked:'true'}
										]
									},{
										xtype:'radiogroup',
										column:2,
										width:800,
										defaults:{
											name:'shipToTableType'
										},
										reference:'shipToTableType',
										fieldLabel:'Ship To: Bill/Ship Mapping Table OR Address Table ?',
										items:[
										    { boxLabel: 'Bill/Ship Mapping Table', inputValue:'true'},
										    { boxLabel: 'Address Table', inputValue:'false', checked:'true'}
										]
									}
								]
							},
						    {
						    	xtype:'label',
						    	text:'Order',
						    	style:Settings.form.wiLabelStyle
						    },
						    {
								xtype: 'fieldcontainer',
								layout: 'column',
								margin : '0 0 5 0',
								layout:{
									type:'hbox',
									align:'stretch'
								},
								defaults:{
									labelSeparator:'',
									labelStyle:Settings.config.defaultFormLabelStyle,
									labelAlign:Settings.form.topLabelAlign,
									flex:1
								},
								items:[
									 {
										 xtype:'textfield',
										 name:'orderFileNameExtension',
										 emptyText:AOCLit.fileExtensionEmptyText,
										 fieldLabel:'Order File Format',
										 listeners:{
											 blur:'onFileFormatFieldBlur',
											 change:'onOrderFileFormatFieldChange'
										 }
									 },
						    		 {
						    			 xtype:'box',
						    			 margin:'0 0 0 10'
						    		 }
								]
							},
							{
								xtype: 'fieldcontainer',
								layout: {
									type:'hbox',
									align:'stretch'
								},
								margin : '0 0 5 0',
								defaults:{
									labelSeparator:'',
									labelStyle:Settings.config.defaultFormLabelStyle,
									labelAlign:Settings.form.topLabelAlign,
									flex:1
								},
								items:[
									{
										xtype:'textfield',
										name: 'orderSchemaID',
										fieldLabel:'Schema',
										maxLength : '50',
										disabled:me.mode != 'add',
										enforceMaxLength: true
									},
									{
										xtype:'textfield',
										margin:'0 0 0 10',
										name: 'orderMappingID',
										fieldLabel:'Mapping',
										disabled:me.mode != 'add',
										maxLength : '50',
										enforceMaxLength: true
									}
								]
							},
							{
								xtype: 'fieldcontainer',
								layout: 'column',
								margin : '0 0 5 0',
								layout:{
									type:'hbox'
								},
								defaults:{
									labelSeparator:'',
									labelStyle:Settings.config.defaultFormLabelStyle,
									labelAlign:Settings.form.defaultLabelAlign,
									labelWidth:200
								},
								items:[
									{
										xtype:'radiogroup',
										column:2,
										width:350,
										defaults:{
											name:'optionalAttachment'
										},
										margin:'0 0 5 0',
										reference:'isOptionalAttachment',
										fieldLabel:'Is Attachment Optional?',
										items:[
										    { boxLabel: 'Yes', inputValue:'true'},
										    { boxLabel: 'No', inputValue:'false', checked:true}
										]
									}
								]
							},
							{
								xtype: 'fieldcontainer',
								layout: 'column',
								margin : '0 0 5 0',
								layout:{
									type:'hbox'
								},
								defaults:{
									labelSeparator:'',
									labelStyle:Settings.config.defaultFormLabelStyle,
									labelAlign:Settings.form.defaultLabelAlign,
									labelWidth:200
								},
								items:[
									{
										xtype:'radiogroup',
										column:2,
										width:350,
										defaults:{
											name:'attachmentRequired'
										},
										reference:'isOrderWithAttachment',
										fieldLabel:'Is Order with Additional File?',
										items:[
										    { boxLabel: 'Yes', inputValue:'true'},
										    { boxLabel: 'No', inputValue:'false', checked:true}
										],
										listeners:{
											change:'onOrderWithAttachmentRadioChange'
										}
									}
								]
							},
							me.getAdditionalField('','1','additionalAttachmentFileCont','additionalAttachment'),
							me.getAdditionalField('Another','2','additionalAttachmentFileCont2','additionalAttachmentTwo'),
							me.getAdditionalSchemaField(1, 'Additional', 'attchmentSchemaCont'),
							me.getAdditionalSchemaField(2, 'Another Additional', 'attchmentSchemaCont'),
							me.getSchemaIdentificationItems(),
							{
								xtype: 'fieldcontainer',
								layout: 'column',
								margin : '0 0 5 10',
								defaults:{
									labelSeparator:'',
									labelStyle:Settings.config.defaultFormLabelStyle,
									labelAlign:Settings.form.defaultLabelAlign,
									labelWidth:200
								},
								items:[
									{
										xtype:'radiogroup',
										width:350,
										column:2,
										defaults:{
											name:'groupingLogic'
										},
										reference:'groupingLogic',
										fieldLabel:'Need Grouping Logic?',
										items:[
										    { boxLabel: 'Yes', inputValue:'true', checked:true},
										    { boxLabel: 'No', inputValue:'false' }
										]
//										listeners:{
//											change:'onGroupingLogicChange'
//										}
									}
								]
							},
							me.getGroupingField()
						]
					}
			   ]
			}
		];
	},
	getSKUValidationItems:function(){
		return {
			title:'SKU Validation',
			titleAlign:'center',
			collapsible:true,
			margin:'20 0',
			frame:true,
			bodyPadding:10,
			layout:{
				type:'anchor'
			},
			items:[
				{
					xtype:'label',
					text:'Size Validation',
					style:'font-weight:bold;color:#2c3e50;font-size:15px;'
				},
				{
					xtype:'radiogroup',
					fieldLabel:'Is there any size validation for this structure?',
					reference:'sizeCheck',
					width:550,
					margin:'0 0 5 0',
					labelSeparator:'',
					type:'sizeValidation',
					defaults:{
						name:'sizeCheck'
					},
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:400,
					items:[
					  { boxLabel:'Yes',inputValue:'1'},
					  { boxLabel:'No',inputValue:'0', checked:true}
					],
					listeners:{
						change:'onSKUValidationRadioChange'
					}
				},
			    {
			    	xtype:'textfield',
			    	labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign,
					anchor:'60%',
			    	fieldLabel:'If Multiple Product Line,Product Lines for which validation is applicable '+Ext.String.format(AOCLit.wiInfoIconText, AOCLit.moqValidationText),
			    	margin:'0 0 5 0',
			    	disabled:true,
			    	emptyText:AOCLit.multipleProductLineEmptyText,
			    	maskRe: new RegExp('^[ A-Za-z:|]*$'),
			    	name:'sizeValidationMultipleProductLine',
			    	maxLength:Settings.wiConfig.maxLength100,
			    	reference:'sizeValidationMultipleProductLine'
			    }, {
					xtype:'label',
					text:'Fabric Content Validation',
					style:'font-weight:bold;color:#2c3e50;font-size:15px;'
				},
				{
					xtype:'radiogroup',
					fieldLabel:'Is there any Fiber Content validation for this structure?',
					reference:'fiberpercentagecheck',
					width:550,
					margin:'0 0 5 0',
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:400,
					type:'fiberContentValidation',
					defaults:{
						name:'fiberpercentagecheck'
					},
					items:[
					  { boxLabel:'Yes',inputValue:'1'},
					  { boxLabel:'No',inputValue:'0', checked:true}
					],
					listeners:{
						change:'onSKUValidationRadioChange'
					}
				},
			    {
			    	xtype:'textfield',
			    	labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign,
					anchor:'60%',
			    	fieldLabel:'If Multiple Product Line,Product Lines for which validation is applicable '+Ext.String.format(AOCLit.wiInfoIconText, AOCLit.moqValidationText),
			    	margin:'0 0 5 0',
			    	disabled:true,
			    	emptyText:AOCLit.multipleProductLineEmptyText,
			    	maskRe: new RegExp('^[ A-Za-z:|]*$'),
			    	name:'fiberContentValidationMultipleProductLine',
			    	maxLength:Settings.wiConfig.maxLength100,
			    	reference:'fiberContentValidationMultipleProductLine'
			    }, {
					xtype:'label',
					text:'COO Validation',
					style:'font-weight:bold;color:#2c3e50;font-size:15px;'
				},
				{
					xtype:'radiogroup',
					fieldLabel:'Is there any COO validation for this structure?',
					reference:'coocheck',
					width:550,
					margin:'0 0 5 0',
					allowBlank:false,
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:400,
					type:'cooValidation',
					defaults:{
						name:'coocheck'
					},
					items:[
					  { boxLabel:'Yes',inputValue:'1'},
					  { boxLabel:'No',inputValue:'0', checked:true}
					],
					listeners:{
						change:'onSKUValidationRadioChange'
					}
				},
			    {
			    	xtype:'textfield',
			    	labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign,
					anchor:'60%',
			    	fieldLabel:'If Multiple Product Line,Product Lines for which validation is applicable '+Ext.String.format(AOCLit.wiInfoIconText, AOCLit.moqValidationText),
			    	margin:'0 0 5 0',
			    	disabled:true,
			    	emptyText:AOCLit.multipleProductLineEmptyText,
			    	maskRe: new RegExp('^[ A-Za-z:|]*$'),
			    	name:'cooValidationMultipleProductLine',
			    	maxLength:Settings.wiConfig.maxLength100,
			    	reference:'cooValidationMultipleProductLine'
			    }, {
					xtype:'label',
					text:'FactoryMOQ Validation',
					style:'font-weight:bold;color:#2c3e50;font-size:15px;'
				}, {
					xtype:'radiogroup',
					fieldLabel:'Is there any MOQ validation for this structure?',
					reference:'factoryMOQCheck',
					width:550,
					margin:'0 0 5 0',
					labelSeparator:'',
					type:'moqValidation',
					defaults:{
						name:'factoryMOQCheck'
					},
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:400,
					items:[
					  { boxLabel:'Yes',inputValue:'1'},
					  { boxLabel:'No',inputValue:'0', checked:true}
					],
					listeners:{
						change:'onSKUValidationRadioChange'
					}
				},
			    {
			    	xtype:'textfield',
			    	labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign,
					anchor:'60%',
			    	fieldLabel:'If Multiple Product Line,Product Lines for which validation is applicable '+Ext.String.format(AOCLit.wiInfoIconText, AOCLit.moqValidationText),
			    	margin:'0 0 5 0',
			    	disabled:true,
			    	emptyText:AOCLit.multipleProductLineEmptyText,
			    	maskRe: new RegExp('^[ A-Za-z:|]*$'),
			    	name:'factoryMoqValidationMultipleProductLine',
			    	maxLength:Settings.wiConfig.maxLength100,
			    	reference:'moqValidationMultipleProductLine'
			    },
			    {
			    	xtype:'numberfield',
			    	hideTrigger:true,
			    	allowDecimals:false,
			    	keyNavEnabled:false,
			    	mouseWheelEnabled:false,
			    	minValue:'',
			    	emptyText:'eg. 100',
			    	labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign,
					anchor:'60%',
					margin:'0 0 5 0',
					fieldLabel:'FactoryMOQ',
					name:'factoryMOQValue'
			    }
			]
		};
	},
	getAdditionalField:function(fieldLabel, count, fieldContRef, fieldName){
		return {
			  xtype:'fieldcontainer',
			  layout:'hbox',
			  reference:fieldContRef,
			  disabled:true,
			  margin:'0 0 5 0',
			  flex:1,
			  defaults:{
				labelSeparator:'',
				labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
				labelAlign:AOC.config.Settings.form.topLabelAlign,
				flex:1
			  },
			  items:[
			    {
			    	xtype:'textfield',
			    	name:'attachmentFileNameExtension_'+count,
			    	reference:'attachmentFileNameExtension_'+count,
			    	fieldLabel:fieldLabel + ' Additional Attachment Format',
			    	emptyText:AOCLit.fileExtensionEmptyText,
//			    	fieldType:'attachmentFileExt',
//			    	count : count,
			    	listeners:{
				    	blur:'onFileFormatFieldBlur',
				    	change:'onAdditionalAttachmentChange'
			    	}
	    		 }, {
	          		 xtype:'textfield',
	          		 fieldLabel:fieldLabel + ' Additional File Key',
	          		 name:'attachmentFileNamePattern_'+count,
	          		 reference:'attachmentFileNamePattern_'+count,
	          		 margin:'0 0 0 10'
	          	 }, {
	          		 xtype:'textfield',
	          		 fieldLabel:fieldLabel+' Attachment Identifier',
	          		 name:'attachmentIdentifier_'+count,
	          		 reference:'attachmentIdentifier_'+count,
	          		 margin:'0 0 0 10'
	          	 }
//	          	 {
//	          		 xtype:'textfield',
//	          		 fieldLabel:'Cell No,If Excel',
//	          		 reference:'attachmentFileCellNo_'+count,
//	          		 hidden:true,
//	          		 margin:'0 0 0 10'
//	          	 }
			  ]
		  };
	},
	getAdditionalSchemaField:function(count, fieldLabel, fieldRefs){
		return {
			xtype: 'fieldcontainer',
			layout: {
				type:'hbox',
				align:'stretch'
			},
			margin : '0 0 5 0',
			disabled:true,
			reference:fieldRefs+count,
			defaults:{
				labelSeparator:'',
				labelStyle:Settings.config.defaultFormLabelStyle,
				labelAlign:Settings.form.topLabelAlign,
				flex:1
			},
			items:[
				{
					xtype:'textfield',
					name: 'attachmentSchemaID_'+count,
					fieldLabel:fieldLabel +' SchemaID',
					maxLength : Settings.wiConfig.maxLength50,
					enforceMaxLength: true
				},
				{
					xtype:'textfield',
					margin:'0 0 0 10',
					name: 'attachmentMappingID_'+count,
					fieldLabel:fieldLabel+' MappingID',
					maxLength : Settings.wiConfig.maxLength50,
					enforceMaxLength: true
				}
			]
		};
	},
	getSchemaIdentificationItems:function(){
		var me = this;
	    
		return {
			bodyPadding:10,
			margin:'10 0',
			layout:{
				type:'vbox',
				align:'stretch'
			},
			items:[
				{
					xtype:'box',
					html:'Email Subject',
					style:'font-weight:bold;color:#2c3e50;font-size:15px;'
				}
			].concat(me.getSchemaIdentificationFields('emailSubject', true))
			.concat([
				{
					xtype:'box',
					html:'Email Body',
					style:'font-weight:bold;color:#2c3e50;font-size:15px;'
				}
			]).concat(me.getSchemaIdentificationFields('emailBody', true))
			.concat([
				{
					xtype:'box',
					html:'Order File',
				    style:'font-weight:bold;color:#2c3e50;font-size:15px;margin-top:5px;'
				}
			]).concat(me.getSchemaIdentificationFields('fileOrder', false, 'Order'))
			.concat(me.getIdentificationFields())
			.concat(me.getAdditionalFileItems())
		};	
	},
	getAdditionalFileItems:function(){
		//var orderFileTypeQtipTitle = 'What is the rule in order file to identify the schema (i.e. PFL) <br>Like:KeyWording:use | to separate the wordings if there could possibly be more than one set of key wordings';
		return [
			{
				xtype:'box',
				html:'Attachment File',
			    style:'font-weight:bold;color:#2c3e50;font-size:15px;margin-top:5px;'
			},
			{
				items:[
					{
						xtype:'radiogroup',
						column:2,
						width:230,
						defaults:{
							name:'attachmentFileMatchRequired'
						},
						margin:'0 0 5 0',
						items:[
						    {boxLabel:'Required', inputValue:'true'},
						    {boxLabel:'Not Required', inputValue:'false', checked:true}
						],
						listeners:{
							change:'onAttachmentRequiredRadioChange'
						}
					}
				]
			},
			{
				xtype:'fieldcontainer',
				margin:'0 0 5 0',
				flex:1,
				reference:'attachmentFieldCont',
				disabled:true,
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
				    	fieldLabel:'File Name / File Content',
				    	reference:'attachmentFileOrderMatchLocation',
				    	name:'attachmentFileOrderMatchLocation',
				    	editable:false,
				    	store:Helper.getFileNameContentStore(),
				    	flex:1,
				    	listeners:{
				    		select:function(field){
				    			if(field.getValue() == 'None'){
				    				field.setValue('');
				    			}
				    		}
				    	}
				    },
				    {
				    	xtype:'textfield',
				    	name:'attachmentFileKeyWording',
				    	reference:'attachmentFileKeyWording',
				    	maxLength:Settings.wiConfig.maxLength100,
				    	fieldLabel:'Key Wordings',
				    	flex:1,
				    	margin:'0 0 0 10'
				    },
				    {
				    	xtype:'textfield',
				    	name:'attachmentCellNo',
				    	reference:'attachmentCellNo',
				    	maxLength:Settings.wiConfig.maxLength100,
				    	fieldLabel:'Cell No,If Excel',
				    	flex:1,
				    	margin:'0 0 0 10'
				    }
				]
			}
		];
	},
	getSchemaIdentificationFields:function(type, hideFlag, fileType, hideEmailBody){
		var me = this;
		return [
	        {
				xtype:'fieldcontainer',
				reference:type+'RBOProductLineCont',
				margin:'0 0 5 0',
				flex:1,
				defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:120,
					width:600
				},
				items:[
				    {
						xtype:'radiogroup',
						column:2,
						width:350,
						margin:'0 0 5 0',
						fieldLabel:'RBO',
						fieldType:type,
						childCont1:type+'RBOKeyword',
						childCont2:type+'RBOCellNo',
						fieldName:type+'RBOMatchRequired',
						defaults:{
							name:type+'RBOMatchRequired'
						},
						items:[
						    {boxLabel:'Required', inputValue:'true'},
						    {boxLabel:'Not Required', inputValue:'false', checked:true}
						],
						listeners:{
							change:'onRequiredRadioChange'
						}
					}, 
					me.getSchemaIdentificationKeywordField(type+'RBOKeyword'),
					me.getOrderFileExcelField(hideFlag, type+'RBOCellNo', type+'RBOKeyword'),
					{
						xtype:'radiogroup',
						column:2,
						width:350,
						margin:'0 0 5 0',
						fieldLabel:'Product Line',
						fieldType:type,
						childCont1:type+'ProductLineKeyword',
						childCont2:type+'ProductLineCellNo',
						fieldName:type+'ProductLineMatchRequired',
						defaults:{
							name:type+'ProductLineMatchRequired'
						},
						items:[
						    {boxLabel:'Required', inputValue:'true'},
						    {boxLabel:'Not Required', inputValue:'false', checked:true}
						],
						listeners:{
							change:'onRequiredRadioChange'
						}
					}, 
					me.getSchemaIdentificationKeywordField(type+'ProductLineKeyword'),
					me.getOrderFileExcelField(hideFlag, type+'ProductLineCellNo', type+'ProductLineKeyword'),
					{
						xtype:'radiogroup',
						column:2,
						width:350,
						margin:'0 0 5 0',
						fieldLabel:'Partner/Factory',
						fieldType:type,
						childCont1:type+'PartnerFactoryKeyword',
						childCont2:type+'PartnerFactoryCellNo',
						fieldName:type+'PartnerRequired',
						defaults:{
							name:type+'PartnerRequired'
						},
						items:[
						    {boxLabel:'Required', inputValue:'true'},
						    {boxLabel:'Not Required', inputValue:'false', checked:true}
						],
						listeners:{
							change:'onRequiredRadioChange'
						}
					}, 
					me.getSchemaIdentificationKeywordField(type+'PartnerFactoryKeyword'),
					me.getOrderFileExcelField(hideFlag, type+'PartnerFactoryCellNo', type+'PartnerFactoryKeyword')
				]
			}
		];
	},
	getOrderFileExcelField:function(hideFlag, name, prevItemRefs){
		if(hideFlag){return;}
		var index = name.indexOf('fileOrder');
		return {
			xtype:'textfield',
			fieldLabel:index > -1 ? 'Cell No,If Excel '+Ext.String.format(AOCLit.wiInfoIconText, AOCLit.orderCellNoInfoText)  :'Cell No,If Excel',
			name:name,
			prevItemRefs: prevItemRefs,
			emptyText:index > -1 ? AOCLit.orderFileCellNoEmptyText : '',
			reference:name,
			listeners:{
				blur:'onCellNoBlur'
			}
		};
	},
	getSchemaIdentificationKeywordField:function(name){
		var index = name.indexOf('fileOrder');
		return {
			xtype:'textfield',
			fieldLabel:index > -1 ? 'Keyword '+Ext.String.format(AOCLit.wiInfoIconText, AOCLit.orderKeywordInfoText)  :'Keyword',
			fileOrderType:index > -1 ? true : false,
			margin:'0 0 5 0',
			emptyText:(index > -1) || (name.indexOf('emailBody') > -1) ? AOCLit.orderFileKeywordEmptyText : '',
			name:name,
			reference:name,
			listeners:{
				blur:'onKeywordFieldBlur'
			}
		};
	},
	getIdentificationFields:function(){
		return {
			xtype:'fieldcontainer',
			margin:'0 0 5 0',
			reference:'fileOrderIdentificationTypeCont',
			defaults:{
				width:600,
		    	labelSeparator:'',
				labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
				labelAlign:AOC.config.Settings.form.defaultLabelAlign,
				labelWidth:150,
				margin:'0 0 5 0'
			},
			items:[
				{
					xtype:'label',
					text:'How to identify a file as an Order File?',
					style:'font-weight:bold;color:#2c3e50;font-size:13px;font-style: italic;color: #808080;'
				},
				{
					xtype:'radiogroup',
					column:2,
					width:350,
					margin:'0 0 5 0',
					fieldLabel:'Order Received in Email Body',
					labelWidth:200,
					defaults:{
						name:'orderInMailBody'
					},
					items:[
					    {boxLabel:'Yes', inputValue:'true'},
					    {boxLabel:'No', inputValue:'false', checked:true}
					],
					listeners:{
						change:'onOrderReceivedEmailBodyRadioChange'
					}
				},
				{
					xtype:'box',
					html:'<span>Identification Type</span><span style="margin-left:150px;">Key Word</span>',
					margin:'0 0 10 0',
					style:'color#2c3e50;font-size:13px;font-weight:bold;'
				}, {
					xtype:'textfield',
					name:'orderInEmailSubjectMatch',
					reference:'fileOrderEmailSubject',
					disabled:true,
					fieldLabel:'Email Subject'
				}, {
					xtype:'textfield',
					name:'orderInEmailBodyMatch',
					reference:'fileOrderEmailBody',
					emptyText:AOCLit.orderFileKeywordEmptyText,
					allowBlank:false,
					disabled:true,
					fieldLabel:'Email Body'
				}, {
					xtype:'textfield',
					name:'orderFileNamePattern',
					reference:'fileOrderFileName',
					fieldLabel:'File Name'
				}, {
					xtype:'textfield',
					name:'fileOrderFileContent',
					allowBlank:false,
					reference:'fileOrderFileContent',
					fieldLabel:'File Content'
				}, {
					xtype:'textfield',
					name:'fileOrderCellNo',
					reference:'fileOrderCellNo',
					fieldLabel:'Cell No,If Excel',
					prevItemRefs: 'fileOrderFileContent',
					listeners:{
						blur:'onCellNoBlur'
					}
				}
			]
		};
	},
	getGroupingField:function(){
		var me = this;
		return {
			title:'Grouping',
			titleAlign:'center',
			collapsible:true,
			frame:true,
			layout:'vbox',
			bodyPadding:10,
			margin:'20 0 0 0',
			border:false,
			reference:'groupingFieldCont',
			disabled:me.mode == 'view',
			items:this.getGroupingFieldContItem(1)
		};
	},
	getGroupingFieldContItem:function(count){
		if(this.mode != 'add'){return [];}
		return [
		    Helper.getGroupingField(count)
		];
	},
	onDestroy:function(){
		this.contextView.store.load();
		this.rec = null;
		this.callParent(arguments);
	}
});

