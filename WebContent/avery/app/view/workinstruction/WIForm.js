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
    bodyPadding:10,
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
	
	buildButtons:function(){
		return [
		    {
		    	text:'Back',
		    	handler:'onBackBtnClick'
		    },'->',
		    {
		    	text:'View'
		    },
		    {
		    	text:'Save',
		    	handler:'onSaveBtnClick'
		    },
		    {
		    	text:'Submit'
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
	        	layout:{
	        		type:'anchor'
	        	},
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
			  titleAlign:'center'
		  };
	},
	getProfileHeaderItems:function(){
		var me = this;
		var fileFormatStore = Ext.create('AOC.store.FileFormatStore');
		
		return {
		   title:'Partnership Profile',
		   cls:'wi-form-panel-header',
		   titleAlign:'center',
		   bodyPadding:'10 20',
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
	                	bind:'{detail.factoryName}',
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
	                	bind:'{detail.rBOName}',
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
	                	bind:'{detail.productLine}',
	                	fieldLabel:'Product Line',
	                	margin:'0 0 0 10',
	                	flex:1,
	                	store:Helper.getProductLineStore()
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
					labelAlign:AOC.config.Settings.form.topLabelAlign,
					labelWidth:150
	        	  },
	              items:[
	                {
	                	xtype:'combo',
	                	name:'atoNATO',
	                	reference:'atoNato',
	                	bind:'{detail.aTONATO}',
	                	fieldLabel:'ATO/NATO',
	                	store:[['ATO','ATO'],['NATO', 'NATO'],['Both','Both ATO & NATO']],
	                	flex:1
	                },
	                {
 	                	xtype:'box',
 	                	html:'<i class=""></i>',
 	                	width:11,
 	                	margin:'36 0 0 5'	
 	                },
	                {
	                	xtype:'textfield',
	                	name:'structureName',
	                	reference:'structureName',
	                	bind:'{detail.structureName}',
	                	fieldLabel:'Specific Structure Name (Please be in short)',
	                	flex:1,
	                	margin:'0 0 0 10'
	                },
	                {
	                	xtype:'box',
	                	html:Ext.String.format(AOCLit.wiInfoIconText, 'Unique reference name to identify the data structure for communication and reference" class="fa fa-info-circle'),
	                	margin:'36 0 0 5'	
	                },
	                {
						xtype:'combo',
						itemId:'siteId',
						name: 'site',
	                	bind:'{detail.site}',
						fieldLabel:'Site',
						reference:'site',
						valueField:'id',
						displayField:'name',
						margin:'0 0 0 10',
						blankText:'Site Name is required',
						store:Ext.data.StoreManager.lookup('siteId')== null ? Ext.create('AOC.store.SiteStore') : Ext.data.StoreManager.lookup('siteId'),
						flex: 1
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
	                	bind:'{detail.factoryEmailDomain}',
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
		            	name:'specificFactoryEmailAddress',
		            	reference:'specificFactoryEmailAddress',
	                	bind:'{detail.specificFactoryEmailAddress}',
		            	fieldLabel:'Specific Factory Email Address',
		            	flex:1,
		            	margin:'0 0 0 10'
		            },
		            {
	                	xtype:'box',
	                	html:Ext.String.format(AOCLit.wiInfoIconText, 'Please use , to separate individual email'),
	                	margin:'36 0 0 5'	
	                },
		            {
		            	xtype:'textfield',
		            	name:'csrEmailAddress',
		            	reference:'csrEmailAddress',
	                	bind:'{detail.csrEmailAddress}',
		            	fieldLabel:'CSR Email Address',
		            	margin:'0 0 0 10',
		            	flex:1
		            },
		            {
	                	xtype:'box',
	                	html:Ext.String.format(AOCLit.wiInfoIconText, 'Please use , to separate individual email Once AOC receive the order, system will send an order acknowledgement report to this CSR Email'),
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
			        	name:'glidCustomerItem',
		            	reference:'glidCustomerItem',
	                	bind:'{detail.gLIDCustomerItem}',
			        	fieldLabel:'GLID/Customer Item #?',
			        	store:[['CustomerItem#','Customer Item #'],['GLID','GLID']],
			        	flex:1
			        },
			        {
 	                	xtype:'box',
 	                	html:Ext.String.format(AOCLit.wiInfoIconText, 'Pls fill in either Internal Item # or Customer Item # that would be provided in the order form'),
 	                	margin:'36 0 0 5'	
 	                },
			        {
			        	xtype:'combo',
			        	name:'customerItemIdentifier',
		            	reference:'customerItemIdentifier',
	                	bind:'{detail.customerItemIdentifier}',
			        	fieldLabel:'Customer Item Identifier',
			        	displayField:'name',
			        	valueField:'name',
			        	queryMode:'local',
			        	store:new Ext.data.JsonStore({
			        		data:[
			        		    {name:'Color Code'},{name:'Color Name'} ,{name:'Color Way'},
			        		    {name:'Size'}, {name:'Quality'}, {name:'Material'},
			        		    {name:'Seasion'},{name:'Other'}  
			        		],
			        		fields:['name']
			        	}),
			        	flex:1,
			        	margin:'0 0 0 10'
			        },
			        {
 	                	xtype:'box',
 	                	html:Ext.String.format(AOCLit.wiInfoIconText, 'Please fill in the variable that is to identify the internal item # if any. For example, Size, color code..... if any'),
 	                	margin:'36 0 0 5'	
 	                },
			        {
			        	xtype:'combo',
			        	name:'isOrderWithAttachment',
		            	reference:'isOrderWithAttachment',
	                	bind:'{detail.isOrderWithAttachment}',
			        	fieldLabel:'Is Order with Attachment',
			        	editable:false,
			        	queryMode:'local',
			        	margin:'0 0 0 10',
			        	flex:1,
			        	store:[['Yes','Yes'],['No','No']]
			        },
			        {
 	                	xtype:'box',
 	                	html:Ext.String.format(AOCLit.wiInfoIconText, 'Pls fill in Yes/No, Yes - Order is come with a supplementary attachment'),
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
	                	bind:'{detail.system}',
				    	fieldLabel:'System (Must fill in when Internal item # is selected above)',
				    	store:[['Oracle','Oracle']],
				    	flex:1
				    },
				    {
 	                	xtype:'box',
 	                	html:Ext.String.format(AOCLit.wiInfoIconText, 'Pls fill in the system name that would be ordered by this order form  (only Oracle is allowed)'),
 	                	margin:'36 0 0 5'	
 	                },
				    {
				    	xtype:'combo',
				    	name:'orderFileFormat',
	                	bind:'{detail.orderFileFormat}',
				    	fieldLabel:'Order File Format',
				    	displayField:'name',
				    	valueField:'v',
				    	queryMode:'local',
				    	margin:'0 0 0 10',
				    	flex:1,
				    	store:fileFormatStore
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
	                	bind:'{detail.additionalAttachment}',
				    	fieldLabel:'Additional Attachment Format',
				    	displayField:'name',
				    	valueField:'v',
				    	queryMode:'local',
				    	flex:1,
				    	margin:'0 0 0 10',
				    	store:fileFormatStore
		    		 },
		    		 {
 	                	xtype:'box',
 	                	html:'<i class=""></i>',
 	                	width:11,
 	                	margin:'36 0 0 5'	
                	 }
				  ]
			  },
			  me.getSystemOrg(),
			  me.getSchemaIdentificationItems()
		   ]
	   }
	},
	getSystemOrg:function(){
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
		    	  height:160
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
		    	    	name:'aocDefaultOneBillToSite',
		    	    	fieldLabel:'Should AOC default one Bill to Site # only?',
		    	    	reference:'aocDefaultOneBillToSite',
		    	    	queryMode:'local',
		    	    	editable:false,
		    	    	store:[['Yes','Yes'],['No','No']],
		    	    	flex:1
		    	    },
		    	    {
 	                	xtype:'box',
 	                	html:Ext.String.format(AOCLit.wiInfoIconText, 'For Yes, please mention the corresponding Bill to Site# in org table.  For No, please mention the logic in Bill / Ship Information'),
 	                	margin:'36 0 0 5'	
 	                },
		    	    {
		    	    	xtype:'combo',
		    	    	name:'aocDefaultOneShipToSite',
		    	    	fieldLabel:'Should AOC default one Ship to Site # only?',
		    	    	reference:'aocDefaultOneShipToSite',
		    	    	editable:false,
		    	    	store:[['Yes','Yes'],['No','No']],
		    	    	flex:1,
		    	    	margin:'0 0 0 10'
		    	    },
		    	    {
 	                	xtype:'box',
 	                	html:Ext.String.format(AOCLit.wiInfoIconText, 'For Yes, please mention the corresponding Ship to Site# in org table.  For No, please mention the logic in Bill / Ship Information'),
 	                	margin:'36 0 0 5'	
 	                }
		    	]
		      },
		      {
		    	  xtype:'label',
		    	  style:Settings.form.wiLabelStyle,
		    	  text:'Note:Please select site, check system in System Level table and answer the above two question, order to show the Org Level table'
		      },
		      {
    	    	  xtype:'wiorggrid',
		    	  reference:'wiOrgGrid',
		    	  flex:1,
		    	  height:325,
		    	  border:'solid 1px #ccc;',
		    	  margin:'10 0'
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
							width:300,
							margin:'0 0 5 0',
							items:[
							    {boxLabel:'Required', name:'emailSubjectRequired', inputValue:1},
							    {boxLabel:'No Required', name:'emailSubjectRequired', inputValue:2, checked:true}
							],
							bind:'{detail.emailSubjectRequired}',
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
					    	reference:'emailFileNameContent',
					    	name:'emailFileNameContent',
				        	bind:'{detail.emailFileNameContent}',
					    	queryMode:'local',
					    	displayField:'name',
					    	valueField:'name',
					    	store:new Ext.data.JsonStore({
					    		data:[{name:'RBO'},{name:'Product Line'}],
					    		fields:['name']
					    	}),
					    	flex:1
					    },
					    {
					    	xtype:'textfield',
					    	name:'emailSubjectKeyWording',
				        	bind:'{detail.emailSubjectKeyWording}',
					    	fieldLabel:'Key Wordings',
					    	flex:1,
					    	margin:'0 10'
					    },
					    {
					    	xtype:'combo',
					    	name:'emailSubjectDataStructureRule',
				        	bind:'{detail.emailSubjectDataStructureRule}',
					    	fieldLabel:'Does the above Email Subject rule only apply to this Data Structure for this Factory?',
			    	    	editable:false,
			    	    	store:Helper.getYesNoStore(),
					    }
					]
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
							width:300,
							margin:'0 0 5 0',
							items:[
							    {boxLabel:'Required', name:'emailBodyRequired', inputValue:1},
							    {boxLabel:'No Required', name:'emailBodyRequired', inputValue:2, checked:true}
							],
							bind:'{detail.emailBodyRequired}',
							listeners:{
								change:'onEmailBodyRequiredRadioChange'
							}
						}
			    	]
			    },
				{
					xtype:'fieldcontainer',
					margin:'0 0 5 0',
					flex:1,
					reference:'emailBodyFieldCont',
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
					    	fieldLabel:'Identification Type',
					    	reference:'emailBodyIdentificationType',
					    	name:'emailBodyIdentificationType',
				        	bind:'{detail.emailBodyIdentificationType}',
				        	store:[['RBO','RBO'],['ProductLine','Product Line']],
					    	flex:1
					    },
					    {
					    	xtype:'textfield',
					    	name:'emailBodyKeyWording',
				        	bind:'{detail.emailBodyKeyWording}',
					    	fieldLabel:'Key Wordings',
					    	margin:'0 0 0 10',
					    	flex:1
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
					xtype:'textfield',
					hideLabel:true,
					name:'emailSubjectDataStructureOtherRule',
					bind:'{detail.emailSubjectDataStructureOtherRule}',
					width:300
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
							width:300,
							margin:'0 0 5 0',
							items:[
							    {boxLabel:'Required', name:'orderFileRequired', inputValue:1},
							    {boxLabel:'No Required', name:'orderFileRequired', inputValue:2, checked:true}
							],
							bind:'{detail.orderFileRequired}',
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
	    	    	disabled:true,
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
		                	bind:'{detail.orderFileNameContent}',
	    	    	    	store:Helper.getFileNameContentStore(),
	    	    	    	editable:false,
	    	    	    	flex:1
	    	    	    },
	    	    	    {
	    	    	    	xtype:'textfield',
	    	    	    	name:'orderFileKeyWording',
		                	bind:'{detail.orderFileKeyWording}',
	    	    	    	fieldLabel:'Key Wordings',
	    	    	    	flex:1,
	    	    	    	margin:'0 10'
	    	    	    },
	    	    	    {
	    	    	    	xtype:'textfield',
	    	    	    	name:'orderFileTypeFormat',
		                	bind:'{detail.orderFileTypeFormat}',
	    	    	    	fieldLabel:'Format',
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
    		    	    	items:[
    		    	    	    {boxLabel:'If Text/Html/Pdf', name:'orderFileType', inputValue:1, checked:true},
    		    	    	    {boxLabel:'If Excel', name:'orderFileType', inputValue:2}
    		    	    	],
    	                	bind:'{detail.order}',
    		    	    	listeners:{
    		    	    		change:'onOrderRadioChange'
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
						   name:'orderTextFirstLastPage',
						   bind:'{detail.orderTextFirstLastPage}',
						   reference:'orderTextFirstLastPage',
						   fieldLabel:'First Page/Last Page',
						   editable:false,
						   flex:1,
						   store:Helper.getFirstLastPageStore()
					   },
					   {
						   xtype:'combo',
						   name:'orderTextPosition',
						   bind:'{detail.orderTextPosition}',
						   fieldLabel:'Top/Mid/Bottom of the page',
						   reference:'orderTextPosition',
						   editable:false,
						   margin:'0 0 0 10',
						   flex:1,
						   store:Helper.getTopMidBottomStore()
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
						   store:Helper.getExcelStore()
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
							width:300,
							margin:'0 0 5 0',
							items:[
							    {boxLabel:'Required', name:'attachmentRequired', inputValue:1},
							    {boxLabel:'No Required', name:'attachmentRequired', inputValue:2, checked:true}
							],
							bind:'{detail.attachmentRequired}',
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
	    	    	disbled:true,
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
	    	    	    	flex:1
	    	    	    },
	    	    	    {
	    	    	    	xtype:'textfield',
	    	    	    	name:'attachmentFileKeyWording',
	    	    	    	fieldLabel:'Key Wordings',
	    	    	    	flex:1,
	    	    	    	margin:'0 10'
	    	    	    },
	    	    	    {
	    	    	    	xtype:'textfield',
	    	    	    	name:'attachmentFormat',
	    	    	    	fieldLabel:'Format',
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
    		    	    	items:[
    		    	    	    {boxLabel:'If Text/Html/Pdf', name:'attachmentFileType', inputValue:1, checked:true},
    		    	    	    {boxLabel:'If Excel', name:'attachmentFileType', inputValue:2}
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
						   store:Helper.getFirstLastPageStore()
					   },
					   {
						   xtype:'combo',
						   name:'attachmentTextPosition',
						   fieldLabel:'Top/Mid/Bottom of the page',
						   reference:'attachmentTextPosition',
						   editable:false,
						   flex:1,
						   margin:'0 0 0 10',
						   store:Helper.getTopMidBottomStore()
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
						   store:Helper.getExcelStore()
					   }
					]
	    	    }
			]
		}
	}
});