Ext.define('AOC.view.partner.CreatePartnerProductLine',{
	extend:'AOC.view.base.BaseWindow',
	alias:'widget.createpartnerproductline',
	itemId:'createpartnerproductlineItemId',
	controller:'productlineMain',
	bodyPadding: 10,
	width: 1000,
	height:550,
    modal:true,
    //draggable:false,
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
		'afterrender':function(obj){
			var me = this;
			if(me.rec!=null){
				me.down('form').loadRecord(me.rec);
				me.down('#AdvancedPropertiesForm').loadRecord(me.rec);
			}
		}
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
			
		return [
			{
				xtype:'displayfield',
				itemId:'titleItemId',
				vale:'',
				hidden:false,
				margin : '5 0 0 220'
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
						margin : '0 0 5 0',
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
								xtype:'combo',
								itemId:'RItemId',
								name: 'rboName',
								reference:'rboName',
								fieldLabel:AOCLit.RBO,
								allowBlank: false,
								margin:'0 10 0 10',
								store:rboStore,
								displayField:'rboName',
								valueField:'id',
								blankText : 'RBO Name is required',
								listeners : {
									 blur : this.notifyByImage,
									'focus' : 'HideMandatoryMessage'
								}
							},
							{
								xtype:'combo',
								itemId:'SiteId',
								name: 'site',
								fieldLabel:'Site',
								allowBlank: false,
								valueField:'id',
								displayField:'name',
								maxLength : '100',
								store:siteStore,
								enforceMaxLength: true,
								listeners : {
									 blur : this.notifyByImage,
									'focus' : 'HideMandatoryMessage',
									'select':'onSiteSelect'
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
						margin : '0 0 5 0',
						labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
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
								name:'productlineType'
							},
							{
								xtype:'hiddenfield',
								reference:'productLineHidden',
								value:'HTL'
							}
						]
	        		},
	        		{
						xtype:'textfield',
						name: 'emailId',
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
					},
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
								itemId:'CSRPEmailId',
								name: 'CSRPrimaryEmail',
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
								itemId:'CSRSEmailId',
								name: 'CSRSecondaryEmail',
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
								name : 'validation',
								inputValue : 'waivemoa',
								checked : true,
								id : 'waivemoa'
							},
							{
								boxLabel : 'Waive MOQ ',
								name : 'validation',
								inputValue: 'waivemoq',
								checked : true,
								id : 'waivemoq'
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
								name : 'CSRAttention',
								inputValue: 'localbilling',
								checked : true,
								id: 'localbilling'
							},
							{
								boxLabel : 'Factory Transfer',
								name : 'CSRAttention',
								inputValue : 'factorytransfer',
								checked : true,
								id : 'factorytransfer'
							},
							{
								boxLabel: 'Shipment Sample',
								name : 'CSRAttention',
								inputValue : 'shipmentsample',
								checked : true,
								id : 'shipmentsample'
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
								checked : true,
								id : 'sizecheck'
							},
							{
								boxLabel : 'Fabric Check',
								name : 'CSRAttention',
								inputValue : 'fabriccheck',
								checked : true,
								id : 'fabriccheck'
							},
							{
								boxLabel : 'LLKK',
								name : 'CSRAttention',
								inputValue : 'llkk',
								checked : true,
								id : 'llkk'
							}
						]
					},
					{
						xtype: 'togglebutton',
						fieldLabel: 'Active',
						labelWidth:50,
						value: 0,
						labelSeparator:'',
						labelAlign:'left',
						labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
						width : 30,
						height:30,
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
												enforceMaxLength: true
											},
											{
												xtype:'textfield',
												itemId:'FileNamePattern',
												margin:'0 0 0 10',
												name: 'fileNamePattern',
												fieldLabel:'File Name Pattern'
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
												xtype:'combo',
												itemId:'Schema',
												name: 'schema',
												fieldLabel:'Schema',
												maxLength : '50',
												enforceMaxLength: true
											},
											{
												xtype:'combo',
												itemId:'Mapping',
												margin:'0 0 0 10',
												name: 'mapping',
												fieldLabel:'Mapping',//?/
												maxLength : '50',
												enforceMaxLength: true
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
								fieldLabel:'Additional Data',
								labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
								labelSeparator:'',
								labelWidth:150,
								items:[
									{
										 boxLabel : 'Yes',
										 name : 'AdditionalData',
										 inputValue : 'yes',
										 checked : true,
										 id : 'yes'
									 }, 
									 {
										 boxLabel : 'No',
										 name : 'AdditionalData',
										 inputValue : 'no',
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
												enforceMaxLength: true
											},
											{
												xtype:'textfield',
												itemId:'FileNamePattern',
												name: 'fileNamePattern',
												fieldLabel:'File Name Pattern',//?/
												margin:'0 0 0 10'
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
												fieldLabel:'Schema ID',//?/
											},
											{
												xtype:'textfield',
												itemId:'MappingId',
												name: 'mappingId',
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
										value:'',
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
												fieldLabel:'RBO'
											},
											{
												xtype:'textfield',
												itemId:'ProductLine',
												margin:'0 0 0 10',
												name: 'productLine',
												fieldLabel:'Product Line Type'
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
										labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
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
												fieldLabel:'RBO'
											},
											{
												xtype:'textfield',
												itemId:'ProductLine',
												margin:'0 0 0 10',
												name: 'productLine',
												fieldLabel:'Product Line'
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
												fieldLabel:'RBO'
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
												itemId:'OrderMatch',
												name: 'orderMatch',
												fieldLabel:'Order Match'
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

