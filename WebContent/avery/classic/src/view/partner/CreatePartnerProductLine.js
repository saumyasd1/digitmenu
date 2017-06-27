Ext.define('AOC.view.partner.CreatePartnerProductLine',{
	extend:'AOC.view.base.NewBaseWindow',
	alias:'widget.createpartnerproductline',
	itemId:'createpartnerproductlineItemId',
	controller:'productlineMain',
	bodyPadding: 10,
	width: Ext.getBody().getWidth()-350,
	height:Ext.getBody().getHeight()-50,
    draggable:false,
    
    editMode:false,
    rec:null,
    additionalFieldCount:1,
    productlineId:null,
    partnerid:null,
    partnerName:null,
    
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
		'afterrender':'afterWindowRender'
	},
	buildButtons : function(){
		return [
			{
				text : AOCLit.Save,
				handler : 'onSaveDetails',
				hidden: AOCRuntime.getUser().role == 3 ? true : false 
			},
			{
				text : AOCLit.Cancel,
				handler : 'onCancelDetails'
			}
		];
	},
	buildItems:function(){
		var me = this,
			siteStore = Ext.data.StoreManager.lookup('siteId')== null ? Ext.create('AOC.store.SiteStore') : Ext.data.StoreManager.lookup('siteId'),
			rboStore = Ext.data.StoreManager.lookup('rboId') == null ? Ext.create('AOC.store.RBOStore') : Ext.data.StoreManager.lookup('rboId');
		
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
								xtype:'textfield',
								itemId:'PNItemId',
								name: 'partnerName',
								flex:1,
								fieldLabel: AOCLit.partnerName,
								value: me.partnerName
							},
							{
								xtype:'textfield',
								itemId:'dataStructureName',
								name: 'dataStructureName',
								margin:'0 0 0 10',
								flex:1,
								allowBlank: false,
								fieldLabel: 'Data Structure Name',
								blankText:'Data Structure Name is required',
								bind:'{dataStructureName}'
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
							labelAlign:Settings.form.topLabelAlign
						},	
						items:[
							{
								xtype:'combo',
								itemId:'RItemId',
								name: 'rboId',
								reference:'rboId',
								bind:'{rbo.id}',
								fieldLabel:AOCLit.RBO,
								allowBlank: false,
								store:rboStore,
								displayField:'rboName',
								valueField:'id',
								flex:1,
								blankTexts: 'RBO Name is required',
								listeners : {
									//'focus' : 'HideMandatoryMessage'
								}
							},
							{
								xtype:'combo',
								itemId:'SiteId',
								name: 'site',
								flex:1,
								fieldLabel:'Site',
								allowBlank: false,
								bind:'{siteId}',
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
									//'focus' : 'HideMandatoryMessage',
									'change':'onSiteSelect'
								}
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
							type:'anchor',
						},
						defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign
						},
						items:[
							{
								xtype:'textfield',
								name: 'email',
								flex:1,
								anchor:'49.5%',
								bind:'{email}',
								fieldLabel:'Email ID',
								regex: /^((([a-zA-Z0-9_\-\.*]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?,\s*?)*)*$/, //Allowed Space Between Email Ids
								listeners : {
									//'focus' : 'HideMandatoryMessage'
								}
							}
						]
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
								itemId:'CSRPrimaryId',
								name: 'csrPrimaryId',
								bind:'{csrPrimaryId}',
								fieldLabel:'CSR Primary Email',
								regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?,\s*?)*)*$/, //Allowed Space Between Email Ids
								blankText : AOCLit.prodLineReq,
								listeners : {
									//'focus' : 'HideMandatoryMessage'
								}
							},
							{
								xtype:'textfield',
								itemId:'CSRSecondaryId',
								name: 'csrSecondaryId',
								bind:'{csrSecondaryId}',
								fieldLabel:'CSR Secondary Email',
								regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?,\s*?)*)*$/, //Allowed Space Between Email Ids
								blankText : AOCLit.CSRReq,
								margin:'0 0 0 10',
								listeners : {
									//'focus' : 'HideMandatoryMessage'
								}
							}
						]
					},
					{
	        			xtype:'fieldcontainer',
	        			layout:'column',
	        			fieldLabel:'Product Line',
	        			labelStyle:Settings.config.defaultFormLabelStyle,
	        			labelSeparator:'',
	        			labelWidth:150,
	        			margin : '0 0 5 0',
	        			defaults:{
							labelSeparator:'',
							labelStyle:Settings.config.defaultFormLabelStyle,
							labelAlign:Settings.form.topLabelAlign
						},
	        			items:[
							{
								xtype:'radio',
								boxLabel:'Unique',
								width:80,
								input:'unique',
								reference:'unique',
								name:'productlineType',
								checked:true,
								listeners:{
									change:'onProductLineChange'
								}
							},
							{
								xtype:'combo',
								name: 'productLineTypeCombo',
								fieldLabel:AOCLit.productLine,
								labelAlign:Settings.form.defaultLabelAlign,
								labelWidth:100,
								allowBlank: true,
								reference:'productLineTypeCombo',
//								hidden:'{productLineType}'=='MIXED'?true:false,
								width : 220,
								bind:'{productLineType}',
								margin:' 0 10 0 10',
								store:[['HTL','HTL'],['PFL','PFL'],['WVL','WVL']],
								value:'HTL',
								blankText : AOCLit.prodLineReq,
								listeners : {
									//'focus' : 'HideMandatoryMessage',
									change:'onProductLineComboChange'
								}
							},
							{
								xtype:'radio',
								boxLabel:'Mixed',
								margin:'0 0 0 10',
								inputValue:'MIXED',
								reference:'mixed',
								name:'productlineType'
							},
							{
								xtype:'hiddenfield',
								reference:'productLineHidden'
								//value:('{productLineType}'==null||'{productLineType}'=='')?'HTL':'{productLineType}'
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
						labelAlign:Settings.form.topLabelAlign,
						name:'validation',
						defaults:{
							width:150
						},
						items: [
							{
								boxLabel : 'Waive MOA',
								name : 'waiveMOA',
								inputValue : 'waiveMOA',
								id : 'waiveMOA',
								bind:'{waiveMOA}'
							},
							{
								boxLabel : 'Waive MOQ ',
								name : 'waiveMOQ',
								inputValue: 'waiveMOQ',
								id : 'waiveMOQ',
								bind:'{waiveMOQ}'
							}
						]
					},
					{
						xtype:'checkboxgroup',
						fieldLabel:'CSR Attention',
						labelStyle:Settings.config.defaultFormLabelStyle,
						labelSeparator:'',
						labelAlign:Settings.form.topLabelAlign,
						width:500,
						columns:3,
						vertical:true,
						items:[
							{
								boxLabel: 'Local Billing',
								name: 'localBilling',
								inputValue: 'localBilling',
								itemId:'localBilling',
								bind: '{localBilling}'
							},
							{
								boxLabel : 'Factory Transfer',
								name: 'factoryTransfer',
								inputValue : 'factoryTransfer',
								itemId : 'factoryTransfer',
								bind:'{factoryTransfer}'
							},
							{
								boxLabel: 'Shipment Sample',
								name : 'shipmentSample',
								inputValue : 'shipmentSample',
								itemId : 'shipmentSample',
								bind:'{shipmentSample}'
							},
							{
								boxLabel : 'Size Check',
								name  : 'sizeCheck',
								inputValue : 'sizecheck',
								itemId : 'sizecheck',
								bind:'{sizeCheck}'
							},
							{
								boxLabel : 'Fabric Check',
								name : 'fiberpercentagecheck',
								inputValue : 'fabriccheck',
								itemId : 'fabriccheck',
								bind:'{fiberpercentagecheck}'
							},
							{
								boxLabel : 'LLKK',
								name : 'llkk',
								inputValue : 'LLKK',
								itemId : 'LLKK',
								bind:'{llkk}'
							}
						]
					},
					{
						xtype:'displayfield',
						fieldLabel:'Active',
						labelSeparator:'',
						labelWidth:50,
						margin:'0 0 5 0',
						labelStyle:Settings.config.defaultFormLabelStyle,
						value:'<div class="activeBtn fa fa-toggle-off" style="font-size:24px;color:#ccc;cursor:pointer;"></div>'
					},
					{
						frame:true,
						collapsible:true,
						collapsed:true,
						title:'Advance Properties',
						titleCollapse:true,
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
									{
										xtype:'combo',
										itemId:'FileType',
										name: 'fileType',
										fieldLabel:'File Type',
										store:[['pdf','pdf'],['xls/xlsx','xls/xlsx'],['txt','txt']],
										editable:false,
										bind:'{orderFileNameExtension}',
										allowBlank:false,
										blankText:'File Type is required'
									},
									{
										xtype:'textfield',
										itemId:'FileNamePattern',
										margin:'0 0 0 10',
										name: 'fileNamePattern',
										fieldLabel:'File Name Pattern',
										bind:'{orderFileNamePattern}'
									}
								]
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
										itemId:'Schema',
										name: 'orderSchemaID',
										fieldLabel:'Schema',
										maxLength : '50',
										enforceMaxLength: true,
										bind:'{orderSchemaID}'
									},
									{
										xtype:'textfield',
										itemId:'Mapping',
										margin:'0 0 0 10',
										name: 'orderMappingID',
										fieldLabel:'Mapping',
										maxLength : '50',
										enforceMaxLength: true,
										bind:'{orderMappingID}'
									}
								]
							},
							{
								xtype:'fieldcontainer',
								layout:'hbox',
								margin:'0 0 5 0',
								defaults:{
									labelStyle:Settings.config.defaultFormLabelStyle,
									labelSeparator:'',
									labelAlign:Settings.form.defaultLabelAlign,
									labelWidth:150,
								},
								items:[{
									xtype: 'radiogroup',
									vertical: true,
									fieldLabel:'Additional Data',
									width:300,
									name:'AdditionalData',
									reference:'attachmentRequired',
									//bind:'{attachmentRequired}',
									defaults:{
										name:'attachmentRequired'
									},
									items:[
										{
											 boxLabel : 'Yes',
											 inputValue : true,
											 checked:true
										 }, 
										 {
											 boxLabel : 'No',
											 inputValue :false,
											 listeners: {
												 change: 'onRequiredChange'
											 }
										 }
									 ]
								},{
									xtype:'button',
									text:'Add Additional Field',
									cls:'blu-btn',
									iconCls:'x-fa fa-plus',
									itemId:'addMoreAdditionalFieldButton',
									handler:'addMoreAdditionalField'
								}]
							},
							{	
								itemId:'AdditionalData',
								reference:'additionalData',
								layout:{
									type:'vbox',
									align:'stretch'
								},
								items:me.getController().getAttachementContainer(1)
						   },
						   me.getEmailRBOMatchField('Email Subject Match', 'emailSubject'),
						   me.getEmailRBOMatchField('Email Body Match', 'emailBody'),
						   me.getFileRBOMatchField('File Match','file',false),
						   me.getFileRBOMatchField('File Match Additional','attachmentFile',true),
						]
					}
			   ]
			},
			{
				xtype: 'form',
				itemId:'AdvancedPropertiesForm',
				hidden:true,
				collapseDirection: 'top',
				animCollapse: false,
				collapsible: true,
				collapsed :true,
				anchor:'100%',
				reference:'advancePropertiesForm',
				title: '<p style="color:#2c3e50;font-size:13px;font-weight:bold;">Advanced Properties</p>',
				titleCollapse: true,
				style:'border:solid 1px #ccc;padding:5px;width:100%;',
				layout:'vbox',
				items:[ 
					{
						xtype: 'fieldcontainer',
						width:'100%',
						layout: 'vbox',
						//margin : '5 0 0 5',
						items:[
							   /*Order Tab*/
							{	
								xtype: 'form',
								itemId:'OrderForm',
								collapseDirection: 'top',
								animCollapse: false,
								collapsible: true,
								reference:'orderForm',
								collapsed :true,
								title: '<p style="color:#2c3e50;font-size:13px;font-weight:bold;">Order</p>',
								style:'border:solid 1px #ccc;margin-bottom:5px;padding:5px;',
								titleCollapse: true,
								width:'100%',
								items:[ 
									{
										xtype: 'fieldcontainer',
										layout: 'column',
										margin : '0 0 5 0',
										defaults:{
											labelSeparator:'',
											labelStyle:Settings.config.defaultFormLabelStyle,
											labelAlign:Settings.form.defaultLabelAlign,
											labelWidth:150,
											width:450
										},
										items:[
											{
												xtype:'combo',
												itemId:'FileType',
												name: 'fileType',
												fieldLabel:'File Type',
												store:[['pdf','pdf'],['xls/xlsx','xls/xlsx'],['txt','txt']],
												editable:false,
												bind:'{orderFileNameExtension}',
												allowBlank:false,
												blankText:'File Type is required'
											},
											{
												xtype:'textfield',
												itemId:'FileNamePattern',
												margin:'0 0 0 10',
												name: 'fileNamePattern',
												fieldLabel:'File Name Pattern',
												bind:'{orderFileNamePattern}'
											}
										]
									},
									{
										xtype: 'fieldcontainer',
										layout: 'column',
										margin : '0 0 5 0',
										defaults:{
											labelSeparator:'',
											labelStyle:Settings.config.defaultFormLabelStyle,
											labelAlign:Settings.form.defaultLabelAlign,
											labelWidth:150,
											width:450
										},
										items:[
											{
												xtype:'textfield',
												itemId:'Schema',
												name: 'orderSchemaID',
												fieldLabel:'Schema',
												maxLength : '50',
												enforceMaxLength: true,
												bind:'{orderSchemaID}'
											},
											{
												xtype:'textfield',
												itemId:'Mapping',
												margin:'0 0 0 10',
												name: 'orderMappingID',
												fieldLabel:'Mapping',//?/
												maxLength : '50',
												enforceMaxLength: true,
												bind:'{orderMappingID}'
											}
										]
									}
								]
						   },
							   /*Start Additional Data*/
						   {
							xtype:'fieldcontainer',
							layout:'hbox',
							items:[{
								xtype: 'radiogroup',
								vertical: true,
								width:300,
								margin:'5 0 0 0',
								name:'AdditionalData',
//								reference:'attachmentRequired',
								fieldLabel:'Additional Data',
								labelStyle:Settings.config.defaultFormLabelStyle,
								labelSeparator:'',
								labelWidth:150,
								//bind:'{attachmentRequired}',
								items:[
									{
										 boxLabel : 'Yes',
										 name : 'attachmentRequired',
										 inputValue : true,
										 checked:true
									 }, 
									 {
										 boxLabel : 'No',
										 name : 'attachmentRequired',
										 inputValue :false,
										 listeners: {
											 change: 'onRequiredChange'
										 }
									 }
								 ]
							},{
								xtype:'button',
								text:'Add Additional Field',
								ui:'white', 
								itemId:'addMoreAdditionalFieldButton',
								handler:'addMoreAdditionalField'
							}]
						   },
						   {	
								xtype: 'form',
								itemId:'AdditionalData',
								title: '<p style="color:#2c3e50;font-size:13px;font-weight:bold;">Additional Data</p>',
								style:'border:solid 1px #ccc;margin-bottom:5px;padding:5px;',
								collapseDirection: 'top',
								animCollapse: false,
								collapsible: true,
//								reference:'additionalData',
								collapsed :true,
								titleCollapse: true,
								width:'100%',
								items:me.getController().getAttachementContainer(1)
						   },/*End Additional Data*/
							   
							   /*Start of Email subject match*/
						   {	
								xtype: 'form',
								itemId:'EmailSubjectMatch',
								title: '<p style="color:#2c3e50;font-size:13px;font-weight:bold;">Email Subject Match</p>',
								style:'border:solid 1px #ccc;margin-bottom:5px;padding:5px;',
								collapseDirection: 'top',
								animCollapse: false,
								collapsible: true,
								collapsed :true,
								reference:'emailSubjectMatchForm',
								titleCollapse: true,
								width:'100%',
								items:[ 
									{
										xtype: 'fieldcontainer',
										layout: 'column',
										margin : '0 0 5 0',
										defaults:{
											labelSeparator:'',
											labelStyle:Settings.config.defaultFormLabelStyle,
											labelAlign:Settings.form.defaultLabelAlign,
											labelWidth:150,
											width:450
										},
										items:[
											{
												xtype:'textfield',
												itemId:'RBO',
												name: 'rbo',
												fieldLabel:'RBO',
												bind:'{emailSubjectRBOMatch}'
											},
											{
												xtype:'textfield',
												itemId:'ProductLine',
												margin:'0 0 0 10',
												name: 'productLine',
												fieldLabel:'Product Line Type',
												bind:'{emailSubjectProductLineMatch}'
											}
										]
									},
									{
										xtype:'textfield',
										itemId:'Instruction',
										labelAlign:'left',
										name: 'instruction',
										fieldLabel:'Instruction',//?/
										labelSeparator:'',
										hidden:true,
										labelWidth : 150,
										width : 450,
										labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;'
									}
								]
						   },
							   /*End of Email subject match*/
							   
							   /*Start of Email match*/
						   {	
								xtype: 'form',
								itemId:'EmailMatch',
								collapseDirection: 'top',
								animCollapse: false,
								collapsible: true,
								collapsed :true,
								reference:'emailMatchForm',
								title: '<p style="color:#2c3e50;font-size:13px;font-weight:bold;">Email Match</p>',
								style:'border:solid 1px #ccc;margin-bottom:5px;padding:5px;',
								titleCollapse: true,
								width:'100%',
								items:[ 
									{
										xtype: 'fieldcontainer',
										layout: 'column',
										margin : '0 0 5 0',
										defaults:{
											labelSeparator:'',
											labelStyle:Settings.config.defaultFormLabelStyle,
											labelAlign:Settings.form.defaultLabelAlign,
											labelWidth:150,
											width:450
										},
										items:[
											{
												xtype:'textfield',
												itemId:'RBO',
												name: 'rbo',
												fieldLabel:'RBO',
												bind:'{emailBodyRBOMatch}'
											},
											{
												xtype:'textfield',
												itemId:'ProductLine',
												margin:'0 0 0 10',
												name: 'productLine',
												fieldLabel:'Product Line',
												bind:'{emailBodyProductLineMatch}'
											}
										]
									},
									{
										xtype:'textfield',
										itemId:'Instruction',
										labelAlign:'left',
										name: 'instruction',
										fieldLabel:'Instruction',//?/
										labelSeparator:'',
										hidden:true,
										labelWidth : 150,
										labelStyle:Settings.config.defaultFormLabelStyle,
										width : 450
									}
								]
						   },     /*End of Email match*/
							   /*Start of File Match- Order File*/
						   {	
								xtype: 'form',
								itemId:'FileMatchOrderFile',
								collapseDirection: 'top',
								animCollapse: false,
								collapsible: true,
								collapsed :true,
								reference:'fileMatchForm',
								title: '<p style="color:#2c3e50;font-size:13px;font-weight:bold;">File Match</p>',
								style:'border:solid 1px #ccc;margin-bottom:5px;padding:5px;',
								titleCollapse: true,
								width:'100%',
								items:[ 
									{
										xtype: 'fieldcontainer',
										layout: 'column',
										margin : '0 0 5 0',
										defaults:{
											labelSeparator:'',
											labelStyle:Settings.config.defaultFormLabelStyle,
											labelAlign:Settings.form.defaultLabelAlign,
											labelWidth:150,
											width:300
										},
										items:[
											{
												xtype:'textfield',
												itemId:'RBO',
												reference:'rbo',
												name: 'rbo',
												fieldLabel:'RBO',
												allowBlank:true,
												bind:'{fileRBOMatch}'
											},
											{
												xtype:'textfield',
												itemId:'firstSheet',
												margin:'0 0 0 10',
												name: 'sheet',
												prevItemRef: 'rbo',
												fieldLabel:'Sheet',
												bind:'{fileRBOSheetMatch}',
												listeners: {
													'change': 'onChangeOfSheetCellField'
												}
											},
											{
												xtype:'textfield',
												margin:'0 0 0 10',
												name: 'cell',
												prevItemRef: 'rbo',
												fieldLabel:'Cell',
												bind:'{fileRBOCellMatch}',
												listeners: {
													'change': 'onChangeOfSheetCellField'
												}
											}
										]
									},
									{
										xtype: 'fieldcontainer',
										layout: 'column',
										margin : '0 0 5 0',
										defaults:{
											labelSeparator:'',
											labelStyle:Settings.config.defaultFormLabelStyle,
											labelAlign:Settings.form.defaultLabelAlign,
											labelWidth:150,
											width:300
										},
										items:[
											{
												xtype:'textfield',
												itemId:'ProductLine',
												name: 'rbo',
												allowBlank:true,
												reference:'productline',
												fieldLabel:'Product Line',
												bind:'{fileProductlineMatch}'
											},
											{
												xtype:'textfield',
												itemId:'secondSheet',
												margin:'0 0 0 10',
												name: 'sheet',
												prevItemRef: 'productline',
												fieldLabel:'Sheet',
												bind:'{fileProductlineSheetMatch}',
												listeners: {
													'change': 'onChangeOfSheetCellField'
												}
											},
											{
												xtype:'textfield',
												name: 'cell',
												margin:'0 0 0 10',
												prevItemRef: 'productline',
												fieldLabel:'Cell',
												bind:'{fileProductlineCellMatch}',
												listeners: {
													'change': 'onChangeOfSheetCellField'
												}
											}
										]
									},
									{
										xtype: 'fieldcontainer',
										layout: 'column',
										margin : '0 0 5 0',
										defaults:{
											labelSeparator:'',
											labelStyle:Settings.config.defaultFormLabelStyle,
											labelAlign:Settings.form.defaultLabelAlign,
											labelWidth:150,
											width:300
										},
										items:[
											{
												xtype:'textfield',
												itemId:'OrderMatch',
												name: 'orderMatch',
												allowBlank:true,
												reference:'ordermatch',
												fieldLabel:'Order Match',
												bind:'{fileOrderMatch}'
											},
											{
												xtype:'textfield',
												itemId:'thirdSheet',
												name: 'sheet',
												margin:'0 0 0 10',
												prevItemRef: 'ordermatch',
												fieldLabel:'Sheet',
												bind:'{fileOrderMatchSheet}',
												listeners: {
													'change': 'onChangeOfSheetCellField'
												}
											},
											{
												xtype:'textfield',
												name: 'cell',
												margin:'0 0 0 10',
												prevItemRef: 'ordermatch',
												fieldLabel:'Cell',
												bind:'{fileOrderMatchCell}',
												listeners: {
													'change': 'onChangeOfSheetCellField'
												}
											}
										]
									}
								]
							},/*End of File Match- Order File*/
							  
							  /*Start of File Match- Additional Data File*/
							{	
								xtype: 'form',
								itemId:'FileMatchAdditionalFile',
								collapseDirection: 'top',
								animCollapse: false,
								collapsible: true,
								collapsed :true,
								reference:'fileMatchAdditionalForm',
								title: '<p style="color:#2c3e50;font-size:13px;font-weight:bold;">File Match Additional</p>',
								style:'border:solid 1px #ccc;margin-bottom:5px;padding:5px;',
								titleCollapse: true,
								width:'100%',
								items:[ 
									{
										xtype: 'fieldcontainer',
										layout: 'column',
										margin : '0 0 5 0',
										defaults:{
											labelSeparator:'',
											labelStyle:Settings.config.defaultFormLabelStyle,
											labelAlign:Settings.form.defaultLabelAlign,
											labelWidth:150,
											width:300
										},
										items:[
											{
												xtype:'textfield',
												itemId:'RBO',
												name: 'rbo',
												fieldLabel:'RBO',
												hidden:true,
											},
											{
												xtype:'textfield',
												margin:'0 0 0 10',
												name: 'sheet',
												fieldLabel:'Sheet',
												hidden:true
											},
											{
												xtype:'textfield',
												name: 'cell',
												margin:'0 0 0 10',
												fieldLabel:'Cell',
												hidden:true
											}
										]
									},
									{
										xtype: 'fieldcontainer',
										layout: 'column',
										margin : '0 0 5 0',
										defaults:{
											labelSeparator:'',
											labelStyle:Settings.config.defaultFormLabelStyle,
											labelAlign:Settings.form.defaultLabelAlign,
											labelWidth:150,
											width:300
										},
										items:[
											{
												xtype:'textfield',
												itemId:'ProductLine',
												name: 'productLine',
												fieldLabel:'Product Line',
												bind:'{attachmentFileProductlineMatch}'
											},
											{
												xtype:'textfield',
												//itemId:'Sheet',
												margin:'0 0 0 10',
												name: 'sheet',
												fieldLabel:'Sheet',
												bind:'{attachmentFileProductlineMatchSheet}'
											},
											{
												xtype:'textfield',
												name: 'cell',
												margin:'0 0 0 10',
												fieldLabel:'Cell',
												bind:'{attachmentFileProductlineMatchCell}'
											}
										]
									},
									{
										xtype: 'fieldcontainer',
										layout: 'column',
										margin : '0 0 5 0',
										defaults:{
											labelSeparator:'',
											labelStyle:Settings.config.defaultFormLabelStyle,
											labelAlign:Settings.form.defaultLabelAlign,
											labelWidth:150,
											width:300
										},
										items:[
											{
												xtype:'textfield',
												itemId:'AdditonalDataMatch',
												name: 'additionalDataMatch',
												fieldLabel:'Additional Data Match',
												bind:'{attachmentFileOrderMatch}'
											},
											{
												xtype:'textfield',
												margin:'0 0 0 10',
												name: 'sheet',
												fieldLabel:'Sheet',
												bind:'{attachmentFileOrderMatchSheet}'
											},
											{
												xtype:'textfield',
												name: 'cell',
												margin:'0 0 0 10',
												fieldLabel:'Cell',
												bind:'{attachmentFileOrderMatchCell}'
											}
										]
									}
								]
							}
							  /*End of File Match- Additional Data File*/
						]
					}
				]
			}
		]
	},
	getEmailRBOMatchField:function(label, fieldType){
		return {
			xtype:'fieldcontainer',
			margin:'10 0',
			layout:{
				type:'vbox',
				align:'stretch'
			},
			items:[
				{
					xtype:'label',
					text:label,
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
							name: fieldType+'RBOMatch',
							fieldLabel:'RBO',
							bind:'{'+fieldType+'RBOMatch}'
						},
						{
							xtype:'textfield',
							margin:'0 0 0 10',
							name: fieldType+'ProductLineMatch',
							fieldLabel:'Product Line Type',
							bind:'{'+fieldType+'ProductLineMatch}'
						}
					]
				},
				{
					xtype:'textarea',
					labelAlign:'left',
					name: 'instruction',
					fieldLabel:'Instruction',
					labelSeparator:'',
					hidden:true,
					labelWidth: 150,
					labelStyle:Settings.config.defaultFormLabelStyle,
					labelAlign:Settings.form.topLabelAlign,
					flex:1
				}
			]
		};
	},
	getFileRBOMatchField:function(label, fieldType, hiddenFlag){
		return  {
			xtype:'fieldcontainer',
			layout:{
				type:'vbox',
				align:'stretch'
			},
			margin:'10 0',
			defaults:{
				flex:1
			},
			items:[
				{
					xtype:'label',
					text:label,
					style:Settings.form.wiLabelStyle
				},
				{
					xtype: 'fieldcontainer',
					layout: {
						type:'hbox',
						align:'stretch'
					},
					margin : '0 0 15 0',
					defaults:{
						labelSeparator:'',
						labelStyle:Settings.config.defaultFormLabelStyle,
						labelAlign:Settings.form.topLabelAlign,
						flex:1
					},
					defaultType:'textfield',
					items:[
						{
							name: fieldType+'RBOMatch',
							fieldLabel:'RBO',
							reference:fieldType+'RBOMatch',
							hidden:hiddenFlag,
							bind:'{'+fieldType+'RBOMatch}'
						},
						{
							itemId:'firstSheet',
							margin:'0 0 0 10',
							name: fieldType+'RBOSheetMatch',
							prevItemRef: fieldType+'RBOMatch',
							fieldLabel:'Sheet',
							hidden:hiddenFlag,
							bind:'{'+fieldType+'RBOSheetMatch}',
							listeners: {
								'change': 'onChangeOfSheetCellField'
							}
						},
						{
							margin:'0 0 0 10',
							name: fieldType+'RBOCellMatch',
							prevItemRef: fieldType+'RBOMatch',
							fieldLabel:'Cell',
							hidden:hiddenFlag,
							bind:'{'+fieldType+'RBOCellMatch}',
							listeners: {
								'change': 'onChangeOfSheetCellField'
							}
						}
					]
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
					defaultType:'textfield',
					items:[
						{
							name: fieldType+'ProductlineMatch',
							reference:fieldType+'ProductlineMatch',
							fieldLabel:'Product Line',
							bind:'{'+fieldType+'ProductlineMatch}'
						},
						{
							margin:'0 0 0 10',
							name: fieldType+'ProductlineSheetMatch',
							prevItemRef: fieldType+'ProductlineMatch',
							fieldLabel:'Sheet',
							bind:'{fileProductlineSheetMatch}',
							listeners: {
								'change': 'onChangeOfSheetCellField'
							}
						},
						{
							name: fieldType+'ProductlineCellMatch',
							margin:'0 0 0 10',
							prevItemRef: fieldType+'ProductlineMatch',
							fieldLabel:'Cell',
							bind:'{'+fieldType+'ProductlineCellMatch}',
							listeners: {
								'change': 'onChangeOfSheetCellField'
							}
						}
					]
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
					defaultType:'textfield',
					items:[
						{
							name: fieldType+'OrderMatch',
							reference:fieldType+'OrderMatch',
							fieldLabel:'Order Match',
							bind:'{'+fieldType+'OrderMatch}'
						},
						{
							name: fieldType+'OrderMatchSheet',
							margin:'0 0 0 10',
							prevItemRef: fieldType+'OrderMatch',
							fieldLabel:'Sheet',
							bind:'{'+fieldType+'OrderMatchSheet}',
							listeners: {
								'change': 'onChangeOfSheetCellField'
							}
						},
						{
							name: fieldType+'OrderMatchCell',
							margin:'0 0 0 10',
							prevItemRef:  fieldType+'OrderMatch',
							fieldLabel:'Cell',
							bind:'{'+fieldType+'OrderMatchCell}',
							listeners: {
								'change': 'onChangeOfSheetCellField'
							}
						}
					]
				}
			]
		};
	},
	notifyByImage : function(config){
		 if(config.isValid()){
			   config.setFieldStyle('background-image:url('+ AOC.config.Settings.buttonIcons.successImageSrc+');background-repeat:no-repeat;background-position:right;');
		 }else{
			   config.setFieldStyle('background-image:url('+ AOC.config.Settings.buttonIcons.errorIcon+');background-repeat:no-repeat;background-position:right;');
		 }
	 }
});

