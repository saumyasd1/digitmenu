Ext.define('AOC.view.partner.CreatePartnerProductLine',{
	extend:'AOC.view.base.BaseWindow',
	alias:'widget.createpartnerproductline',
	itemId:'createpartnerproductlineItemId',
	controller:'productlineMain',
	bodyPadding: 10,
	width: 1000,
	height:550,
    modal:true,
    draggable:false,
    editMode:false,
    rec:null,
    productlineId:null,
    partnerid:null,
    partnerName:null,
	scrollable : true,	
    initComponent : function(){
		this.items = this.buildItems();
		this.buttons = this.buildButtons();
		this.callParent(arguments);
	},
	listeners:{
		'afterrender':'afterWindowRender'
	},
	buildButtons : function(){
		return [
			{
				text : AOCLit.Save,
				handler : 'SaveDetails'
			},
			{
				text : AOCLit.Cancel,
				handler : 'CancelDetails'
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
				itemId:'titleItemId',
				vale:'',
				hidden:false,
				style:'margin:0px auto;color:#2f3338;font-size:13px;font-weight:bold;'
			},
			{
				xtype:'displayfield',
				itemId:'messageFieldItemId',
				hidden:true
			},
			{
				xtype:'form',
				itemId:'listPanel',
				border:false,
				items:[
					{
						xtype: 'fieldcontainer',
						layout: 'column',
						margin : '10 0 5 0',
						defaults:{
							labelSeparator:'',
							labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
							labelAlign:'left',
							labelWidth:150,
							width:300
						},	
						items:[
							{
								xtype:'displayfield',
								itemId:'PNItemId',
								name: 'partnerName',
								width: 300,
								fieldLabel: AOCLit.partnerName,
								value: me.partnerName
							},
							{
								xtype:'textfield',
								itemId:'dataStructureName',
								name: 'dataStructureName',
								width: 300,
								fieldLabel: 'Data Structure Name',
								bind:'{dataStructureName}'
							},
							{
								xtype:'combo',
								itemId:'RItemId',
								name: 'rboId',
								reference:'rboId',
								bind:'{rbo.id}',
								fieldLabel:AOCLit.RBO,
								allowBlank: false,
								margin:'0 10 0 20',
								store:rboStore,
								displayField:'rboName',
								valueField:'id',
								blankText : 'RBO Name is required',
								listeners : {
									 blur : this.notifyByImage,
									'focus' : 'HideMandatoryMessage'
								}
							}
						]
					},
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						margin : '0 0 5 0',
						defaults:{
							labelSeparator:'',
							labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
							labelAlign:'left',
							labelWidth:150,
							width:455
						},
						items:[
							{
								xtype:'combo',
								itemId:'SiteId',
								name: 'site',
								fieldLabel:'Site',
								allowBlank: false,
								bind:'{siteId}',
								changedBefore:false,
								reference:'site',
								valueField:'id',
								displayField:'name',
								maxLength : '100',
								store:siteStore,
								siteChanged:false,
								enforceMaxLength: true,
								listeners : {
									 blur : this.notifyByImage,
									'focus' : 'HideMandatoryMessage',
									'change':'onSiteSelect'
								}
							},
							{
								xtype:'textfield',
								name: 'email',
								bind:'{email}',
								fieldLabel:'Email ID',
								regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?,\s*?)*)*$/, //Allowed Space Between Email Ids
								
								margin:'0 0 5 10',
								labelSeparator:'',
								labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
								labelAlign:'left',
								labelWidth:150,
								listeners : {
									 blur : this.notifyByImage,
									'focus' : 'HideMandatoryMessage'
								}
							}
						]
					},
					{
						xtype:'fieldcontainer',
						reference:'systemcontainer',
						fieldLabel:'Systems',
						labelSeparator:'',
						labelAlign:'top',
						margin : '0 0 0 0',
						checkboArray:new Array(),
						labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;'
					},
					{
	        			xtype:'fieldcontainer',
	        			layout:'column',
	        			fieldLabel:'Product Line',
	        			margin : '0 0 5 0',
	        			labelSeparator:'',
						labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
						labelWidth:150,
	        			defaults:{
							labelSeparator:'',
							labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
							labelAlign:'left',
							labelWidth:150
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
								labelWidth:100,
								allowBlank: true,
								reference:'productLineTypeCombo',
//								hidden:'{productLineType}'=='MIXED'?true:false,
								width : 220,
								margin:' 0 10 0 10',
								store:[['HTL','HTL'],['PFL','PFL'],['WVL','WVL']],
								value:'HTL',
								blankText : AOCLit.prodLineReq,
								listeners : {
									blur : this.notifyByImage,
									'focus' : 'HideMandatoryMessage',
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
	        		/*{
						xtype:'textfield',
						name: 'email',
						bind:'{email}',
						fieldLabel:'Email ID',
						regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?,\s*?)*)*$/, //Allowed Space Between Email Ids
						width : 455,
						margin:'0 0 5 0',
						labelSeparator:'',
						labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
						labelAlign:'left',
						labelWidth:150,
						listeners : {
							 blur : this.notifyByImage,
							'focus' : 'HideMandatoryMessage'
						}
					},*/
					{   
						xtype: 'fieldcontainer',
						layout: 'column',
						margin : '0 0 5 0',
						defaults:{
							labelSeparator:'',
							labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
							labelAlign:'left',
							labelWidth:150,
							width:455
						},
						items:[
							{
								xtype:'textfield',
								itemId:'CSRPrimaryId',
								name: 'CSRPrimaryId',
								bind:'{CSRPrimaryId}',
								fieldLabel:'CSR Primary Email',
								//allowBlank: false,
								regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?,\s*?)*)*$/, //Allowed Space Between Email Ids
								blankText : AOCLit.prodLineReq,
								listeners : {
									 blur : this.notifyByImage,
									'focus' : 'HideMandatoryMessage'
								}
							},
							{
								xtype:'textfield',
								itemId:'CSRSecondaryId',
								name: 'CSRSecondaryId',
								bind:'{CSRSecondaryId}',
								fieldLabel:'CSR Secondary Email',
								//allowBlank: false,
								regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?,\s*?)*)*$/, //Allowed Space Between Email Ids
								blankText : AOCLit.CSRReq,
								margin:'0 10 0 10',
								listeners : {
									 blur : this.notifyByImage,
									'focus' : 'HideMandatoryMessage'
								}
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
						labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
						labelAlign:'left',
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
						xtype: 'fieldcontainer',
						fieldLabel: 'CSR Attention',
						labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
						labelSeparator:'',
						labelAlign:'top',
						defaults:{
							width:150
						},
						defaultType: 'checkboxfield',
						layout:'column',
						margin : '0 0 5 0',
						labelAlign:'top',
						name:'CSRAttention',
						items: [
							{
								boxLabel : 'Local Billing',
								name : 'localBilling',
								inputValue: 'localBilling',
								id: 'localBilling',
								bind:'{localBilling}'
							},
							{
								boxLabel : 'Factory Transfer',
								name : 'factoryTransfer',
								inputValue : 'factoryTransfer',
								id : 'factoryTransfer',
								bind:'{factoryTransfer}'
							},
							{
								boxLabel: 'Shipment Sample',
								name : 'shipmentSample',
								inputValue : 'shipmentSample',
								id : 'shipmentSample',
								bind:'{shipmentSample}'
							}
							
						]
					},
					{
						xtype: 'fieldcontainer',
						defaultType: 'checkboxfield',
						layout:'column',
						margin : '0 0 5 0',
						name:'CSRAttention1',
						defaults:{
							labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
							width:150
						},
						items: [
							{
								boxLabel : 'Size Check',
								name  : 'CSRAttention',
								inputValue : 'sizecheck',
								id : 'sizecheck',
								bind:'{sizecheck}'
							},
							{
								boxLabel : 'Fabric Check',
								name : 'CSRAttention',
								inputValue : 'fabriccheck',
								id : 'fabriccheck',
								bind:'{fabriccheck}'
							},
							{
								boxLabel : 'LLKK',
								name : 'LLKK',
								inputValue : 'LLKK',
								id : 'LLKK',
								bind:'{LLKK}'
							}
						]
					},
					{
                        xtype: 'togglebutton',
                        fieldLabel: 'Active',
                        value: 0,
                        labelSeparator:'',
                        labelAlign:'top',
                        labelWidth : 200,
      		            width : 30,
      		            height:60,
      		            bind:'{active}',
                        listeners: {
                            changecomplete: function(slider, newValue, thumb, eOpts ){
                                // 'do the required action'
                            }
                        }
					}
			   ]
			},
			{
				xtype: 'form',
				itemId:'AdvancedPropertiesForm',
				collapseDirection: 'top',
				animCollapse: false,
				collapsible: true,
				collapsed :true,
				title: '<p style="color:#2c3e50;font-size:13px;font-weight:bold;">Advanced Properties</p>',
				titleCollapse: true,
				style:'border:solid 1px #ccc;padding:5px;',
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
											labelAlign:'left',
											labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
											labelWidth:150,
											width:450
										},
										items:[
											{
												xtype:'combo',
												itemId:'FileType',
												name: 'fileType',
												fieldLabel:'File Type',
												maxLength : 50,
												enforceMaxLength: true,
												bind:'{orderFileNameExtension}'
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
											labelAlign:'left',
											labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
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
								xtype: 'radiogroup',
								vertical: true,
								width:300,
								margin:'5 0 0 0',
								name:'AdditionalData',
								reference:'attachmentRequired',
								fieldLabel:'Additional Data',
								labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
								labelSeparator:'',
								labelWidth:150,
								//bind:'{attachmentRequired}',
								items:[
									{
										 boxLabel : 'Yes',
										 name : 'attachmentRequired',
										 inputValue : 'true',
//										 checked : true,
										 id : 'yes'
									 }, 
									 {
										 boxLabel : 'No',
										 name : 'attachmentRequired',
										 inputValue :'false',
										 id : 'no',
										 listeners: {
											 change: function (field, newValue, oldValue) {
												 field.up('form').down('#AdditionalData').setDisabled(newValue);
												
											 }
										 }
									 }
								 ]
						   },
						   {	
								xtype: 'form',
								itemId:'AdditionalData',
								title: '<p style="color:#2c3e50;font-size:13px;font-weight:bold;">Additional Data</p>',
								style:'border:solid 1px #ccc;margin-bottom:5px;padding:5px;',
								collapseDirection: 'top',
								animCollapse: false,
								collapsible: true,
								collapsed :true,
								titleCollapse: true,
								width:'100%',
								items:[ 
									{
										xtype: 'fieldcontainer',
										layout: 'column',
										margin : '0 0 5 0',
										defaults:{
											labelSeparator:'',
											labelAlign:'left',
											labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
											labelWidth:150,
											width:450
										},
										items:[
											{
												xtype:'combo',
												itemId:'FileType',
												name: 'fileType',
												fieldLabel:'File Type',//?/
												maxLength : '50',
												bind:'{attachmentFileNameExtension_1}',
												enforceMaxLength: true
											},
											{
												xtype:'textfield',
												itemId:'FileNamePattern',
												name: 'fileNamePattern',
												fieldLabel:'File Name Pattern',//?/
												margin:'0 0 0 10',
												bind:'{attachmentFileNamePattern_1}'
											}
										]
									},
									{
										xtype: 'fieldcontainer',
										layout: 'column',
										margin : '0 0 5 0',
										defaults:{
											labelSeparator:'',
											labelAlign:'left',
											labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
											labelWidth:150,
											width:450
										},
										items:[
											{
												xtype:'textfield',
												itemId:'SchemaId',
												name: 'schemaId',
												bind:'{attachmentSchemaID_1}',
												fieldLabel:'Schema ID'//?/
											},
											{
												xtype:'textfield',
												itemId:'MappingId',
												name: 'mappingId',
												bind:'{attachmentMappingID_1}',
												fieldLabel:'Mapping ID',//?/
												margin:'0 0 0 10'
											}
										]
									},
									{
										xtype:'textfield',
										itemId:'MatchType',
										labelAlign:'left',
										labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
										name: 'matchType',
										fieldLabel:'Match Type',//?/
										bind:'{attachmentIdentifier_1}',
										labelSeparator:'',
										labelWidth : 150,
										width : 450
									}
								]
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
								titleCollapse: true,
								width:'100%',
								items:[ 
									{
										xtype: 'fieldcontainer',
										layout: 'column',
										margin : '0 0 5 0',
										defaults:{
											labelSeparator:'',
											labelAlign:'left',
											labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
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
											labelAlign:'left',
											labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
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
										labelWidth : 150,
										labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
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
											labelAlign:'left',
											labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
											labelWidth:150,
											width:300
										},
										items:[
											{
												xtype:'textfield',
												itemId:'RBO',
												name: 'rbo',
												fieldLabel:'RBO',
												bind:'{fileRBOMatch}'
											},
											{
												xtype:'textfield',
												//itemId:'Sheet',
												margin:'0 0 0 10',
												name: 'sheet',
												fieldLabel:'Sheet'
											},
											{
												xtype:'textfield',
												margin:'0 0 0 10',
												name: 'cell',
												fieldLabel:'Cell'
											}
										]
									},
									{
										xtype: 'fieldcontainer',
										layout: 'column',
										margin : '0 0 5 0',
										defaults:{
											labelSeparator:'',
											labelAlign:'left',
											labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
											labelWidth:150,
											width:300
										},
										items:[
											{
												xtype:'textfield',
												itemId:'ProductLine',
												name: 'rbo',
												fieldLabel:'Product Line',
												bind:'{fileProductlineMatch}'
											},
											{
												xtype:'textfield',
												name: 'page',
												margin:'0 0 0 10',
												fieldLabel:'Page'
											}
										]
									},
									{
										xtype: 'fieldcontainer',
										layout: 'column',
										margin : '0 0 5 0',
										defaults:{
											labelSeparator:'',
											labelAlign:'left',
											labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
											labelWidth:150,
											width:300
										},
										items:[
											{
												xtype:'textfield',
												itemId:'OrderMatch',
												name: 'orderMatch',
												fieldLabel:'Order Match',
												bind:'{fileOrderMatch}'
											},
											{
												xtype:'textfield',
												//itemId:'Sheet',
												name: 'sheet',
												margin:'0 0 0 10',
												fieldLabel:'Sheet'
											},
											{
												xtype:'textfield',
												name: 'cell',
												margin:'0 0 0 10',
												fieldLabel:'Cell'
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
											labelAlign:'left',
											labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
											labelWidth:150,
											width:300
										},
										items:[
											{
												xtype:'textfield',
												itemId:'RBO',
												name: 'rbo',
												fieldLabel:'RBO'
											},
											{
												xtype:'textfield',
												margin:'0 0 0 10',
												name: 'sheet',
												fieldLabel:'Sheet'
											},
											{
												xtype:'textfield',
												name: 'cell',
												margin:'0 0 0 10',
												fieldLabel:'Cell'
											}
										]
									},
									{
										xtype: 'fieldcontainer',
										layout: 'column',
										margin : '0 0 5 0',
										defaults:{
											labelSeparator:'',
											labelAlign:'left',
											labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
											labelWidth:150,
											width:300
										},
										items:[
											{
												xtype:'textfield',
												itemId:'ProductLine',
												name: 'productLine',
												fieldLabel:'Product Line'
											},
											{
												xtype:'textfield',
												name: 'page',
												margin:'0 0 0 10',
												fieldLabel:'Page'
											}
										]
									},
									{
										xtype: 'fieldcontainer',
										layout: 'column',
										margin : '0 0 5 0',
										defaults:{
											labelSeparator:'',
											labelAlign:'left',
											labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
											labelWidth:150,
											width:300
										},
										items:[
											{
												xtype:'textfield',
												itemId:'AdditonalDataMatch',
												name: 'additionalDataMatch',
												fieldLabel:'Additional Data Match'
											},
											{
												xtype:'textfield',
												//itemId:'Sheet',
												margin:'0 0 0 10',
												name: 'sheet',
												fieldLabel:'Sheet'
											},
											{
												xtype:'textfield',
												name: 'cell',
												margin:'0 0 0 10',
												fieldLabel:'Cell'
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
	notifyByImage : function(config){
		 if(config.isValid()){
			   config.setFieldStyle('background-image:url('+ AOC.config.Settings.buttonIcons.successImageSrc+');background-repeat:no-repeat;background-position:right;');
		 }else{
			   config.setFieldStyle('background-image:url('+ AOC.config.Settings.buttonIcons.errorIcon+');background-repeat:no-repeat;background-position:right;');
		 }
	 }
});

