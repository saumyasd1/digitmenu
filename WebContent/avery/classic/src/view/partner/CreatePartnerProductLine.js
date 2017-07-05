Ext.define('AOC.view.partner.CreatePartnerProductLine',{
	extend:'AOC.view.base.NewBaseWindow',
	alias:'widget.createpartnerproductline',
	itemId:'createpartnerproductlineItemId',
	controller:'productlineMain',
	bodyPadding: 10,
	width: Ext.getBody().getWidth()-350,
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
				hidden: hiddenFlag 
			},
			{
				text: AOCLit.Cancel,
				handler: 'onCancelDetails'
			}
		];
	},
	buildItems:function(){
		var me = this,
			siteStore = Ext.data.StoreManager.lookup('siteId')== null ? Ext.create('AOC.store.SiteStore') : Ext.data.StoreManager.lookup('siteId'),
			rboStore = Ext.data.StoreManager.lookup('rboId') == null ? Ext.create('AOC.store.RBOStore') : Ext.data.StoreManager.lookup('rboId');
		var fileFormatStore = Ext.create('AOC.store.FileFormatStore');
		siteStore.load();
		rboStore.load();
		
		return [
			{
				xtype:'displayfield',
				itemId:'messageFieldItemId',
				hidden:true,
				anchor:'100%'
			},
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
							labelAlign:Settings.form.topLabelAlign
						},	
						items:[
							{
								xtype:'combo',
								emptyText:AOCLit.partnerName,
								fieldLabel:AOCLit.partnerName,
								name:'partnerId',
								reference:'partnerCombo',
								store:Ext.create('AOC.store.PartnerManagementStore'),
								editable:false,
								allowBlank: false,
								queryMode:'local',
								flex:1,
								displayField:'partnerName',
								valueField:'id',
								listeners:{
									afterrender:function(field){
										field.store.load();
									}
								}
							},
							{
								xtype:'textfield',
								itemId:'dataStructureName',
								name: 'dataStructureName',
								reference:'dataStructureName',
								margin:'0 0 0 10',
								flex:1,
								allowBlank: false,
								fieldLabel: 'Data Structure Name',
								blankText:'Data Structure Name is required',
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
								xtype:'combo',
								itemId:'RItemId',
								name: 'rboId',
								reference:'rboId',
								fieldLabel:AOCLit.RBO,
								allowBlank: false,
								store:rboStore,
								displayField:'rboName',
								valueField:'id',
								blankTexts: 'RBO Name is required'
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
								blankText:'Site Name is required',
								store:siteStore,
								margin:'0 0 0 10',
								siteChanged:false,
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
								name:'defaultSystem',
								reference:'defaultSystemCombo',
								displayField:'name',
								valueField:'id',
								queryMode:'local',
								disabled:true,
								store:new Ext.data.JsonStore({
									data:[],
									fields:['name', 'id']
								}),
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
						layout:'hbox',
						margin : '0 0 5 0',
						layout:{
							type:'hbox',
							align:'center'
						},
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign,
							flex:1,
						},
						items:[
							{
								xtype:'textfield',
								name: 'email',
								vtype:'multiEmail',
								fieldLabel:'Email ID'
							},
							{
								xtype:'textfield',
								reference:'CSRSecondaryId',
								name: 'csrSecondaryId',
								margin:'0 0 0 10',
								fieldLabel:'CSR Secondary Email',
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
								reference : 'waiveMOQ',
							}
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
//									{
//								    	xtype:'combo',
//								    	name:'orderFileNameExtension',
//								    	fieldLabel:'Order File Format',
//								    	displayField:'name',
//								    	valueField:'name',
//								    	queryMode:'local',
//								    	store:fileFormatStore,
//								    	listeners:{
//								    		blur:'onWIComboBlur'
//								    	}
//						    		 },
									 {
										 xtype:'textfield',
										 name:'orderFileNameExtension',
										 fieldLabel:'Order File Format',
										 
									 },
						    		 {
						    			 xtype:'box',
						    			 margin:'0 0 0 10'
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
									labelWidth:200,
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
							me.getAdditionalField('','1','additionalAttachmentFileCont','additionalAttachment',fileFormatStore),
							me.getAdditionalField('Another','2','additionalAttachmentFileCont2','additionalAttachmentTwo',fileFormatStore),
//							{
//								xtype:'fieldcontainer',
//								layout:'hbox',
//								reference:'additionalExcelCont',
//								disabled:true,
//								margin:'0 0 5 0',
//								flex:1,
//								defaults:{
//									labelSeparator:'',
//									labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
//									labelAlign:AOC.config.Settings.form.topLabelAlign
//								},
//								items:[
//								    {
//									   xtype:'combo',
//									   name:'attachmentExcelSheet',
//									   fieldLabel:'One Sheet/Multiple sheets in a Attachment file',
//									   editable:false,
//									   reference:'attachmentExcelSheet',
//									   flex:1,
//									   store:Helper.getExcelStore(),
//									   maxLength:Settings.wiConfig.maxLength100,
//									   listeners:{
//										   select:'onComboSelect'
//									   }
//				                	 },
//				                	 {
//				                		 xtype:'box',
//				                		 flex:2.1,
//				                		 html:''
//				                	 }
//			                	 ]
//							},
							me.getSchemaIdentificationItems(),
							{
								title:'Grouping Fields',
								collapsible:true,
								collapsed:true,
								titleAlign:'center',
								frame:true,
								bodyPadding:10,
								reference:'groupingFieldBox'
							}
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
			    	maskRe: new RegExp('^[ A-Za-z:|]*$'),
			    	name:'cooValidationMultipleProductLine',
			    	maxLength:Settings.wiConfig.maxLength100,
			    	reference:'cooValidationMultipleProductLine'
			    }, {
					xtype:'label',
					text:'MOQ Validation',
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
			    	maskRe: new RegExp('^[ A-Za-z:|]*$'),
			    	name:'factoryMoqValidationMultipleProductLine',
			    	maxLength:Settings.wiConfig.maxLength100,
			    	reference:'moqValidationMultipleProductLine'
			    }
			]
		};
	},
	getAdditionalField:function(fieldLabel, count, fieldContRef, fieldName, fileFormatStore){
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
				labelAlign:AOC.config.Settings.form.topLabelAlign
			  },
			  items:[
			    {
			    	xtype:'textfield',
			    	name:'attachmentFileNameExtension_'+count,
			    	fieldLabel:fieldLabel + ' Additional Attachment Format',
//			    	displayField:'name',
//			    	valueField:'name',
//			    	queryMode:'local',
			    	flex:1
//			    	store:fileFormatStore,
//			    	listeners:{
//			    		blur:'onWIComboBlur'
//			    	}
	    		 }, {
	          		 xtype:'textfield',
	          		 fieldLabel:fieldLabel + ' Additional File Key',
	          		 name:'attachmentSchemaID_'+count,
	          		 margin:'0 0 0 10',
	          		 flex:1
	          	 }, {
	          		 xtype:'textfield',
	          		 fieldLabel:fieldLabel+' Attachment Identifier',
	          		 name:'attachmentIdentifier_'+count,
	          		 margin:'0 0 0 10',
	          		 flex:1
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
			//.concat(me.getAdditionalFileItems())
		};	
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
					me.getOrderFileExcelField(hideFlag, type+'RBOCellNo'),
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
					me.getOrderFileExcelField(hideFlag, type+'ProductLineCellNo'),
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
					me.getOrderFileExcelField(hideFlag, type+'PartnerFactoryCellNo')
				]
			},
			me.getIdentificationFields(type, hideFlag, fileType, hideEmailBody)
		];
	},
	getOrderFileExcelField:function(hideFlag, name){
		if(hideFlag){return;}
		
		return {
			xtype:'textfield',
			fieldLabel:'Cell No,If Excel',
			disabled:true,
			name:name,
			reference:name
		};
	},
	getSchemaIdentificationKeywordField:function(name){
		return {
			xtype:'textfield',
			fieldLabel:'Keyword',
			disabled:true,
			margin:'0 0 5 0',
			name:name,
			reference:name
		};
	},
	getIdentificationFields:function(type, hideFlag, fileType, hideEmailBody){
		if(hideFlag){return;}
		return {
			xtype:'fieldcontainer',
			margin:'0 0 5 0',
			reference:type+'IdentificationTypeCont',
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
					text:'How to identify a file as an '+fileType+ ' File?',
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
					    {boxLabel:'Yes', inputValue:'true', checked:true},
					    {boxLabel:'No', inputValue:'false'}
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
					fieldLabel:'Email Subject'
				}, {
					xtype:'textfield',
					name:'orderInEmailBodyMatch',
					reference:'fileOrderEmailBody',
					fieldLabel:'Email Body'
				}, {
					xtype:'textfield',
					name:'fileOrderFileName',
					reference:'fileOrderFileName',
					disabled:true,
					fieldLabel:'File Name'
				}, {
					xtype:'textfield',
					name:'fileOrderFileContent',
					reference:'fileOrderFileContent',
					disabled:true,
					fieldLabel:'File Content'
				}, {
					xtype:'textfield',
					name:'fileOrderCellNo',
					reference:'fileOrderMatch',
					disabled:true,
					fieldLabel:'Cell No,If Excel'
				}
			]
		};
	},
	getAdditionalFileItems:function(){
		var orderFileTypeQtipTitle = 'What is the rule in order file to identify the schema (i.e. PFL) <br>Like:KeyWording:use | to separate the wordings if there could possibly be more than one set of key wordings';
		return [
			{
				xtype:'box',
				html:'Attachment File <i class="fa fa-info-circle" data-qtip="<font>'+ orderFileTypeQtipTitle +'</font>" ></i>',
			    style:'font-weight:bold;color:#2c3e50;font-size:15px;margin-top:5px;'
			},
			{
				items:[
					{
						xtype:'radiogroup',
						column:2,
						width:230,
						defaults:{
							name:'attachmentFileRequired'
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
				    	reference:'attachmentFileNameContent',
				    	name:'attachmentFileNameContent',
				    	editable:false,
				    	store:Helper.getFileNameContentStore(),
				    	flex:1,
				    	listeners:{
				    		select:'onComboSelect'
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
	onDestroy:function(){
		this.rec = null;
		this.callParent(arguments);
	}
});

