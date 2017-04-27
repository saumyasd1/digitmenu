Ext.define('AOC.view.workinstruction.WIForm',{
	extend:'Ext.panel.Panel',
	cls:'aoc-wi-form',
	alias:'widget.wiformpanel',
	requires:[
	   'AOC.view.workinstruction.WISystemGrid',
	   'AOC.view.workinstruction.WIOrgGrid',
	   'AOC.view.workinstruction.WIPanel',
	   'AOC.view.workinstruction.WIAOCFieldGrid'
	],
	controller:'wiformcontroller',
	viewModel: {
        type: 'wiformviewmodel'
    },
	initComponent:function(){
		var me = this;
		Ext.apply(me,{
			items:me.buildItems(),
			buttons:me.buildButtons(),
			layout:{
				type:'fit'
			}
		});
	
		me.callParent(arguments);
	},
	listeners:{
		afterrender:'onWiFormAfterRender'
	},
	buildButtons:function(){
		return [
		    {
		    	text:'Back',
		    	handler:'onBackBtnClick'
		    },'->',
		    {
		    	text:'Save',
		    	reference:'wiSaveBtn',
		    	handler:'onSaveBtnClick'
		    },
		    {
		    	text:'Submit',
		    	reference:'wiSubmitBtn',
		    	disabled:true,
		    	handler:'onWiSubmitBtnClick'
		    }
		]
	},
	buildItems:function(){
		var me = this;
		return [
	        {
	        	xtype:'form',
	        	reference:'wIForm',
	        	scrollable:true,
	        	bodyPadding:'10 20',
	        	border:false,
	        	items:[
	        	    me.getProfileHeaderItems(),
	        	    me.getWorkingInstructionItems()
	        	]
	        }
		]
	},
	getWorkingInstructionItems:function(){
		return {
			  xtype:'wipanel',
			  margin:'5 0',
			  cls:'wi-form-panel-header',
			  title:'Work Instruction',
			  bodyPadding:'10',
			  titleAlign:'center',
			  layout:'anchor'
		  };
	},
	getProfileHeaderItems:function(){
		var me = this;
		var fileFormatStore = Ext.create('AOC.store.FileFormatStore');
		
		return {
		   title:'Partnership Profile',
		   cls:'wi-form-panel-header',
		   titleAlign:'center',
		   bodyPadding:10,
		   layout:{
			   type:'anchor'
		   },
		   items:[
	          {
	        	  xtype:'fieldcontainer',
	        	  layout:'hbox',
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
	                	name:'factoryName',
	                	fieldLabel:'FactoryName',
	                	flex:1
	                },
	                {
	                	xtype:'box',
	                	html:Ext.String.format(AOCLit.wiInfoIconText, 'Please fill in the Factory Name'),
	                	margin:'36 0 0 5'	
	                },
	                {
	                	xtype:'textfield',
	                	name:'rboName',
	                	reference:'rboForm',
	                	fieldLabel:'RBO Name',
	                	flex:1,
	                	margin:'0 0 0 10'
	                },
	                {
	                	xtype:'box',
	                	html:Ext.String.format(AOCLit.wiInfoIconText, 'Pls fill in the name according to legacy system setting'),
	                	margin:'36 0 0 5'	
	                },
	                {
	                	xtype:'combo',
	                	name:'productLine',
	                	reference:'productLine',
	                	fieldLabel:'Product Line',
	                	margin:'0 0 0 10',
	                	flex:1,
	                	store:Helper.getProductLineStore(),
	                	listeners:{
	                		blur:'onWIComboBlur',
	                		select:'onComboSelect'
	                	}
                	 },
                	 {
 	                	xtype:'box',
 	                	html:'<i class=""></i>',
 	                	width:11,
 	                	margin:'36 0 0 5'	
 	                }
	              ]
	          },
	          {
	        	  xtype:'fieldcontainer',
	        	  layout:'hbox',
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
 		            	name:'factoryEmailDomain',
 		            	reference:'factoryEmailDomain',
 		            	fieldLabel:'Factory Email Domain',
 		            	flex:1
 		            },
 		            {
 	                	xtype:'box',
 	                	html:Ext.String.format(AOCLit.wiInfoIconText, 'Please use , to separate individual email domains'),
 	                	margin:'36 0 0 5'	
 	                },
	                {
	                	xtype:'textfield',
	                	name:'structureName',
	                	reference:'structureName',
	                	fieldLabel:'Specific Structure Name (Please be in short)',
	                	flex:1,
	                	margin:'0 0 0 10'
	                },
	                {
	                	xtype:'box',
	                	html:Ext.String.format(AOCLit.wiInfoIconText, 'Unique reference name to identify the data structure for communication and reference <br> eg. Factory|RBO|ProductLine (like:HTL|PFL)" class="fa fa-info-circle'),
	                	margin:'36 0 0 5'	
	                },
	                {
						xtype:'combo',
						itemId:'siteId',
						name: 'site',
						fieldLabel:'Site',
						reference:'site',
						margin:'0 0 0 10',
						blankText:'Site Name is required',
						store:Helper.getSiteStore(),
						editable:false,
						flex: 1,
						listeners:{
							select:'onSiteSelect'
						}
					},
					{
 	                	xtype:'box',
 	                	html:'<i class=""></i>',
 	                	width:11,
 	                	margin:'36 0 0 5'	
 	                }
	              ]
	          },
	          {
		    	  xtype:'fieldcontainer',
		    	  layout:'hbox',
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
		            	name:'specificFactoryEmailAddress',
		            	vtype:'multiEmail',
		            	reference:'specificFactoryEmailAddress',
		            	fieldLabel:'Specific Factory Email Address',
		            	flex:1
		            },
		            {
	                	xtype:'box',
	                	html:Ext.String.format(AOCLit.wiInfoIconText, 'Please use , to separate individual email'),
	                	margin:'36 0 0 5'	
	                },
		            {
		            	xtype:'textfield',
		            	name:'csrEmailAddress',
		            	vtype:'multiEmail',
		            	reference:'csrEmailAddress',
		            	fieldLabel:'CSR Email Address',
		            	margin:'0 0 0 10',
		            	flex:1
		            },
		            {
	                	xtype:'box',
	                	html:Ext.String.format(AOCLit.wiInfoIconText, 'Please use , to separate individual email Once AOC receive the order, system will send an order acknowledgement report to this CSR Email'),
	                	margin:'36 0 0 5'	
	                },
	                {
			        	xtype:'textfield',
			        	name:'customerItemIdentifier',
		            	reference:'customerItemIdentifier',
			        	fieldLabel:'Customer Item Identifier',
			        	flex:1,
			        	margin:'0 0 0 10'
			        },
			        {
 	                	xtype:'box',
 	                	html:Ext.String.format(AOCLit.wiInfoIconText, 'Please fill in the variable that is to identify the internal item # if any. For example, Size, color code..... if any'),
 	                	margin:'36 0 0 5'	
 	                }
		          ]
		      },
			  {
				  xtype:'fieldcontainer',
				  layout:'hbox',
				  margin:'0 0 5 0',
				  flex:1,
				  defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign
				  },
				  items:[
				    {
				    	xtype:'combo',
				    	name:'system',
				    	reference:'sysetemField',
	                	editable:false,
				    	fieldLabel:'System (Must fill in when Internal item # is selected above)',
				    	store:[['Oracle','Oracle']],
				    	flex:1,
				    	listeners:{
				    		select:'onSystemSelect'
				    	}
				    },
				    {
 	                	xtype:'box',
 	                	html:Ext.String.format(AOCLit.wiInfoIconText, 'Pls fill in the system name that would be ordered by this order form  (only Oracle is allowed)'),
 	                	margin:'36 0 0 5'	
 	                },
				    {
				    	xtype:'combo',
				    	name:'orderFileFormat',
				    	fieldLabel:'Order File Format',
				    	displayField:'name',
				    	valueField:'name',
				    	queryMode:'local',
				    	margin:'0 0 0 10',
				    	flex:1,
				    	store:fileFormatStore,
				    	listeners:{
				    		blur:'onWIComboBlur'
	                	}
				    },
				    {
 	                	xtype:'box',
 	                	html:'<i class=""></i>',
 	                	width:11,
 	                	margin:'36 0 0 5'
 	                },
				    {
				    	xtype:'combo',
				    	name:'additionalAttachment',
				    	fieldLabel:'Additional Attachment Format',
				    	displayField:'name',
				    	valueField:'name',
				    	queryMode:'local',
				    	flex:1,
				    	margin:'0 0 0 10',
				    	store:fileFormatStore,
				    	listeners:{
				    		blur:'onWIComboBlur'
	                	}
		    		 },
		    		 {
 	                	xtype:'box',
 	                	html:'<i class=""></i>',
 	                	width:11,
 	                	margin:'36 0 0 5'	
                	 }
				  ]
			  },
			  {
				  xtype:'fieldcontainer',
				  margin:'0 0 5 0',
				  flex:1,
				  defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:200
				  },
				  items:[
			         {
						xtype:'radiogroup',
						column:3,
						reference:'atoNato',
						width:600,
						margin:'0 0 5 0',
						fieldLabel:'ATO/NATO',
						defaults:{
							name:'atoNato'
						},
						items:[
						    { boxLabel: 'ATO', inputValue:'ATO'},
						    { boxLabel: 'NATO', inputValue:'NATO'},
						    { boxLabel: 'Both ATO&NATO', inputValue:'Both ATO&NATO'}
						]
			         },
			         {
						xtype:'radiogroup',
						column:2,
						width:500,
						margin:'0 0 5 0',
						reference:'glidCustomerItem',
						defaults:{
							name:'glidCustomerItem'
						},
						fieldLabel:'GLID/Customer Item #? '+Ext.String.format(AOCLit.wiInfoIconText, 'Pls fill in either Internal Item # or Customer Item # that would be provided in the order form'),
						items:[
						    { boxLabel: 'Customer Item #', inputValue:'Customer Item#'},
						    { boxLabel: 'GLID', inputValue:'GLID'}
						]
			         },
			         {
						xtype:'radiogroup',
						column:2,
						width:350,
						defaults:{
							name:'isOrderWithAttachment'
						},
						margin:'0 0 5 0',
						scope:me,
		            	reference:'isOrderWithAttachment',
						fieldLabel:'Is Order with Attachment? '+Ext.String.format(AOCLit.wiInfoIconText, 'Pls fill in Yes/No, Yes - Order is come with a supplementary attachment'),
						items:[
						    { boxLabel: 'Yes', inputValue:'Yes'},
						    { boxLabel: 'No', inputValue:'No'}
						]
			         }
				  ]
			  },
			  me.getSystemOrg(),
			  me.getSchemaIdentificationItems()
		   ]
	   }
	},
	getSystemOrg:function(){
		var me = this;
		return {
		   margin:'15 0',
		   layout:{
			   type:'vbox',
			   align:'stretch'
		   },
		   items:[
		      {
		    	  xtype:'wisystemgrid',
		    	  reference:'wiSystemGrid',
		    	  border:'solid 1px #ccc;',
		    	  flex:1,
		    	  title:'System Level',
		    	  titleAlign:'center',
		    	  height:'auto'
		      },
		      {
		    	  title:'Org Level',
		    	  titleAlign:'center',
		    	  flex:1,
		    	  margin:'10 0',
		    	  cls:'wi-form-panel-header'
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
							name:'aocDefaultOneBillToSite'
						},
						fieldLabel:'Should AOC default one Bill to Site# only? '+Ext.String.format(AOCLit.wiInfoIconText, 'For Yes, please mention the corresponding Bill to Site# in org table.  For No, please mention the logic in Bill / Ship Information'),
						reference:'aocDefaultOneBillToSite',
						margin:'0 0 5 0',
						scope:me,
						items:[
						  {boxLabel:'Yes',inputValue:'Yes'},
						  {boxLabel:'No',inputValue:'No'}
						],
						listeners:{
							scope:me,
							change:function(field){
							}
						}
					},
 	                {
						xtype:'radiogroup',
						fieldLabel:'Should AOC default one Ship to Site# only? '+Ext.String.format(AOCLit.wiInfoIconText, 'For Yes, please mention the corresponding Ship to Site# in org table.  For No, please mention the logic in Bill / Ship Information'),
						reference:'aocDefaultOneShipToSite',
						margin:'0 0 5 0',
						defaults:{
							name:'aocDefaultOneShipToSite'
						},
						items:[
						  {boxLabel:'Yes',inputValue:'Yes'},
						  {boxLabel:'No',inputValue:'No'}
						]
					}
		    	]
		      },
		      {
		    	  xtype:'label',
		    	  style:'font-weight:bold;color:#2c3e50;font-size:15px;font-style: italic;color: #808080;',
		    	  text:'Note: Please select Site and System and answer the above two question, order to show the Org Level table'
		      },
		      {
    	    	  xtype:'wiorggrid',
		    	  reference:'wiOrgGrid',
		    	  hidden:true,
		    	  flex:1,
		    	  height:'auto',
		    	  border:'solid 1px #ccc;',
		    	  margin:'20 0'
    	      }
		   ]
	   }
	},
	getSchemaIdentificationItems:function(){
		var emailSubjectQtipTitle = 'What is the rule in email subject to identify the schema (i.e. PFL) <br>Like:KeyWording:use | to separate the wordings if there could possibly be more than one set of key wordings'	,
			orderFileTypeQtipTitle = 'What is the rule in order file to identify the schema (i.e. PFL) <br>Like:KeyWording:use | to separate the wordings if there could possibly be more than one set of key wordings';
		
		return{
			title:'Schema Identification',
			titleAlign:'center',
			cls:'wi-form-panel-header',
			reference:'schemaIdentification',
			bodyPadding:10,
			margin:'10 0',
			layout:{
				type:'vbox',
				align:'stretch'
			},
			items:[
			    {
			    	xtype:'box',
			    	html:'Email Subject <i class="fa fa-info-circle" data-qtip="<font color=#3892d3>'+ emailSubjectQtipTitle +'</font>"></i>',
			    	style:'font-weight:bold;color:#2c3e50;font-size:15px;'
			    },
			    {
			    	items:[
						{
							xtype:'radiogroup',
							column:2,
							width:230,
							margin:'0 0 5 0',
							defaults:{
								name:'emailSubjectRequired'
							},
							items:[
							    {boxLabel:'Required', inputValue:'1'},
							    {boxLabel:'Not Required', inputValue:'2', checked:true}
							],
							listeners:{
								change:'onEmailSubjectRequiredRadioChange'
							}
						}
			    	]
			    },
				{
					xtype:'fieldcontainer',
					margin:'0 0 5 0',
					flex:1,
					reference:'emailSubjectFieldCont',
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
					    	fieldLabel:'Identification Type',
					    	reference:'emailSubjectIdentificationType',
					    	name:'emailSubjectIdentificationType',
					    	disabled:true,
					    	flex:1
					    },
					    {
					    	xtype:'textfield',
					    	name:'emailSubjectKeyWording',
					    	reference:'emailSubjectKeyWording',
					    	fieldLabel:'Key Wordings',
					    	flex:1,
							disabled:true,
					    	margin:'0 10'
					    },
					    {
					    	xtype:'combo',
					    	name:'emailSubjectDataStructureRule',
					    	reference:'emailSubjectDataStructureRule',
					    	fieldLabel:'Does the above Email Subject rule only apply to this Data Structure for this Factory?',
			    	    	editable:false,
							disabled:true,
			    	    	store:Helper.getYesNoStore(),
			    	    	listeners:{
			    	    		select:'onComboSelect'
			    	    	}
					    }
					]
				},
				{
					xtype:'displayfield',
					flex:1,
					margin:'0 0 5 0',
					value:'If "No"(i.e. more than 1 data structure could  potentially be included in same email upon recieve),please specify other data structure that would share the same Email Subject rule'
				},
				{
					xtype:'textarea',
					hideLabel:true,
					name:'emailSubjectDataStructureOtherRule',
					flex:1,
					maxLength:250,
					margin:'0 0 15 0'
				},
				{
			    	xtype:'box',
			    	html:'Email Body',
			    	style:'font-weight:bold;color:#2c3e50;font-size:15px;'
			    },
			    {
			    	items:[
						{
							xtype:'radiogroup',
							column:2,
							width:230,
							margin:'0 0 5 0',
							defaults:{
								name:'emailBodyRequired'
							},
							items:[
							    {boxLabel:'Required', inputValue:'1'},
							    {boxLabel:'Not Required', inputValue:'2', checked:true}
							],
							listeners:{
								change:'onEmailBodyRequiredRadioChange'
							}
						}
			    	]
			    },
				{
					xtype:'fieldcontainer',
					flex:1,
					reference:'emailBodyFieldCont',
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
					    	fieldLabel:'Identification Type',
					    	reference:'emailBodyIdentificationType',
					    	name:'emailBodyIdentificationType',
							disabled:true,
					    	flex:1
					    },
					    {
					    	xtype:'textfield',
					    	name:'emailBodyKeyWording',
					    	reference:'emailBodyKeyWording',
					    	fieldLabel:'Key Wordings',
					    	margin:'0 0 0 10',
							disabled:true,
					    	flex:1
					    }
					]
				},
				{
					xtype:'box',
					html:'Order File <i class="fa fa-info-circle" data-qtip="<font color=#3892d3>'+ orderFileTypeQtipTitle +'</font>"></i>',
	                style:'font-weight:bold;color:#2c3e50;font-size:15px;margin-top:5px;'
				},
				{
					items:[
						{
							xtype:'radiogroup',
							column:2,
							width:230,
							margin:'0 0 5 0',
							defaults:{
								name:'orderFileRequired'
							},
							items:[
							    {boxLabel:'Required', inputValue:'1'},
							    {boxLabel:'Not Required', inputValue:'2', checked:true}
							],
							listeners:{
								change:'onOrderRequiredRadioChange'
							}
						}
					]
				},
				{
	    	    	xtype:'fieldcontainer',
	    	    	margin:'0 0 5 0',
	    	    	reference:'orderFileFieldCont',
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
	    	    	    	fieldLabel:'File Name / File Content',
	    	    	    	reference:'orderFileNameContent',
	    	    	    	name:'orderFileNameContent',
	    	    	    	store:Helper.getFileNameContentStore(),
	    	    	    	editable:false,
	    					disabled:true,
	    	    	    	flex:1,
	    	    	    	listeners:{
	    	    	    		select:'onComboSelect'
	    	    	    	}
	    	    	    },
	    	    	    {
	    	    	    	xtype:'textfield',
	    	    	    	name:'orderFileKeyWording',
	    	    	    	reference: 'orderFileKeyWording',
	    	    	    	fieldLabel:'Key Wordings',
	    	    	    	flex:1,
	    					disabled:true,
	    	    	    	margin:'0 10'
	    	    	    },
	    	    	    {
	    	    	    	xtype:'textfield',
	    	    	    	name:'orderFileTypeFormat',
	    	    	    	reference:'orderFileTypeFormat',
	    	    	    	fieldLabel:'Format',
	    					disabled:true,
	    	    	    	flex:1
	    	    	    }
	    	    	]
	    	    },
	    	    {
	    	    	items:[
    	    	       {
    		    	    	xtype:'radiogroup',
    		    	    	column:2,
    		    	    	width:300,
    		    	    	defaults:{
								name:'orderFileType'
							},
							margin:'0 0 5 0',
    		    	    	items:[
    		    	    	    {boxLabel:'If Text/Html/Pdf', inputValue:'1', checked:true},
    		    	    	    {boxLabel:'If Excel', inputValue:'2'}
    		    	    	],
    		    	    	listeners:{
    		    	    		change:'onOrderRadioChange'
    		    	    	}
    		    	    }
	    	    	]
	    	    },
	    	    {
	    	    	xtype:'fieldcontainer',
	    	    	margin:'0 0 15 0',
	    	    	flex:1,
	    	    	defaults:{
						labelSeparator:'',
						labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
						labelAlign:AOC.config.Settings.form.topLabelAlign
					},
					layout:{
						type:'hbox',
						align:'stretch'
					},
					items:[
					   {
						   xtype:'combo',
						   name:'orderTextFirstLastPage',
						   reference:'orderTextFirstLastPage',
						   fieldLabel:'First Page/Last Page',
						   editable:false,
						   flex:1,
						   store:Helper.getFirstLastPageStore(),
						   listeners:{
							   select:'onComboSelect'
						   }
					   },
					   {
						   xtype:'combo',
						   name:'orderTextPosition',
						   fieldLabel:'Top/Mid/Bottom of the page',
						   reference:'orderTextPosition',
						   editable:false,
						   margin:'0 0 0 10',
						   flex:1,
						   store:Helper.getTopMidBottomStore(),
						   listeners:{
							   select:'onComboSelect'
						   }
					   },
					   {
						   xtype:'textfield',
						   name:'orderExcelCell',
						   reference:'orderExcelCell',
						   hidden:true,
						   fieldLabel:'Cell',
						   flex:1
					   },
					   {
						   xtype:'combo',
						   name:'orderExcelSheet',
						   fieldLabel:'One Sheet/Multiple sheets in a file',
						   hidden:true,
						   editable:false,
						   reference:'orderExcelSheet',
						   margin:'0 0 0 10',
						   flex:1,
						   store:Helper.getExcelStore(),
						   listeners:{
							   select:'onComboSelect'
						   }
					   }
					]
	    	    },
	    	    {
					xtype:'box',
					html:'Attachment File <i class="fa fa-info-circle" data-qtip="<font color=#3892d3>'+ orderFileTypeQtipTitle +'</font>" ></i>',
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
							    {boxLabel:'Required', inputValue:'1'},
							    {boxLabel:'Not Required', inputValue:'2', checked:true}
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
	    					disabled:true,
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
	    	    	    	fieldLabel:'Key Wordings',
	    	    	    	flex:1,
	    					disabled:true,
	    	    	    	margin:'0 10'
	    	    	    },
	    	    	    {
	    	    	    	xtype:'textfield',
	    	    	    	name:'attachmentFormat',
	    	    	    	reference:'attachmentFormat',
	    	    	    	fieldLabel:'Format',
	    					disabled:true,
	    	    	    	flex:1
	    	    	    }
	    	    	]
	    	    },
	    	    {
	    	    	items:[
    	    	       {
    		    	    	xtype:'radiogroup',
    		    	    	column:2,
    		    	    	width:300,
							margin:'0 0 5 0',
							defaults:{
								name:'attachmentFileType'
							},
    		    	    	items:[
    		    	    	    {boxLabel:'If Text/Html/Pdf', inputValue:'1', checked:true},
    		    	    	    {boxLabel:'If Excel', inputValue:'2'}
    		    	    	],
    		    	    	listeners:{
    		    	    		change:'onAttachmentRadioChange'
    		    	    	}
    		    	    }
	    	    	]
	    	    },
	    	    {
	    	    	xtype:'fieldcontainer',
	    	    	margin:'0 0 5 0',
	    	    	flex:1,
	    	    	defaults:{
						labelSeparator:'',
						labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
						labelAlign:AOC.config.Settings.form.topLabelAlign
					},
					layout:{
						type:'hbox',
						align:'stretch'
					},
					items:[
					   {
						   xtype:'combo',
						   name:'attachmentTextFirstLastPage',
						   reference:'attachmentTextFirstLastPage',
						   fieldLabel:'First Page/Last Page',
						   editable:false,
						   flex:1,
						   store:Helper.getFirstLastPageStore(),
						   listeners:{
							   select:'onComboSelect'
						   }
					   },
					   {
						   xtype:'combo',
						   name:'attachmentTextPosition',
						   fieldLabel:'Top/Mid/Bottom of the page',
						   reference:'attachmentTextPosition',
						   editable:false,
						   flex:1,
						   margin:'0 0 0 10',
						   store:Helper.getTopMidBottomStore(),
						   listeners:{
							   select:'onComboSelect'
						   }
					   },
					   {
						   xtype:'textfield',
						   name:'attachmentExcelCell',
						   reference:'attachmentExcelCell',
						   hidden:true,
						   fieldLabel:'Cell',
						   flex:1
					   },
					   {
						   xtype:'combo',
						   name:'attachmentExcelSheet',
						   fieldLabel:'One Sheet/Multiple sheets in a file',
						   hidden:true,
						   reference:'attachmentExcelSheet',
						   margin:'0 10',
						   editable:false,
						   flex:1,
						   store:Helper.getExcelStore(),
						   listeners:{
							   select:'onComboSelect'
						   }
					   }
					]
	    	    }
			]
		};
	}
});