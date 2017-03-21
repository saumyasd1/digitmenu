Ext.define('AOC.view.workinstruction.WIForm',{
	extend:'AOC.view.base.NewBaseWindow',
	title:'WI Form',
	cls:'aoc-wi-form',
	requires:[
	   'AOC.view.workinstruction.WISystemGrid',
	   'AOC.view.workinstruction.WIOrgGrid'
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
			},
			width:Ext.getBody().getWidth()-50,
			height:Ext.getBody().getHeight()-80
		});
	
		me.callParent(arguments);
	},
	
	buildButtons:function(){
		return [
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
	        	layout:{
	        		type:'accordion',
	        		animate:true
	        		//activeOnTop:true
	        	},
	        	border:false,
	        	items:[
	        	    me.getProfileHeaderItems(),
	        	    {
	        	    	title:'Work Instruction (WI)',
	        	    	bodyPadding:10,
	        	    	html:'Instruction'
	        	    },
	        	    {
	        	    	title:'SKU',
	        	    	bodyPadding:10,
	        	    	html:'SKU Instruction'
	        	    }
	        	]
	        }
		]
	},
	getProfileHeaderItems:function(){
		var me = this;
		return {
		   title:'Partnership Profile',
		   bodyPadding:'10 20',
		   scrollable:true,
		   layout:{
			   type:'anchor'
		   },
		   items:[
	          {
	        	  xtype:'fieldcontainer',
	        	  layout:'hbox',
	        	  margin:'0 0 5 0',
	        	  anchor:'100%',
	        	  defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign,
					labelWidth:150
	        	  },
	              items:[
	                {
	                	xtype:'textfield',
	                	name:'factoryName',
	                	fieldLabel:'FactoryName',
	                	allowBlank:false,
	                	bind:'{detail.factoryName}',
	                	flex:1
	                },
	                {
	                	xtype:'textfield',
	                	name:'rboName',
	                	reference:'rboForm',
	                	fieldLabel:'RBO Name',
	                	allowBlank:false,
	                	flex:1,
	                	bind:'{detail.rBOName}',
	                	margin:'0 10 0 10'
	                },
	                {
	                	xtype:'combo',
	                	name:'productLine',
	                	reference:'productLine',
	                	bind:'{detail.productLine}',
	                	fieldLabel:'Product Line',
	                	displayField:'name',
	                	valueField:'v',
	                	queryMode:'local',
	                	allowBlank:false,
	                	flex:1,
	                	store:new Ext.data.JsonStore({
	                		data:[{name:'PFL', v:'PFL'},{name:'Multiple(HTL&PFL)', v:'Multiple(HTL&PFL)'},{name:'HTL', v:'HTL'},
	                		           {name:'WVL', v:'WVL'},{name:'GG', v:'GG'},{name:'Multiple(please specify here)', v:'Multiple(please specify here)'},
	                		           {name:'Others(please specify here)', v:'Others(please specify here)'}
	                		],  
	                		fields:['name','v']
	                	})
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
	                	displayField:'name',
	                	valueField:'name',
	                	queryMode:'local',
	                	store:new Ext.data.JsonStore({
	                		data:[
	                		  {name:'ATO'},
	                		  {name:'NATO'},
	                		  {name:'Both ATO & NATO'}
	                		],
	                		fields:['name']
	                	}),
	                	flex:1
	                },
	                {
	                	xtype:'textfield',
	                	name:'structureName',
	                	reference:'structureName',
	                	bind:'{detail.structureName}',
	                	fieldLabel:'Specific Structure Name (Please be in short)',
	                	flex:1,
	                	margin:'0 10 0 10'
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
						blankText:'Site Name is required',
						store:Ext.data.StoreManager.lookup('siteId')== null ? Ext.create('AOC.store.SiteStore') : Ext.data.StoreManager.lookup('siteId'),
						flex: 1
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
		            	xtype:'textfield',
		            	name:'factoryEmailDomain',
		            	reference:'factoryEmailDomain',
	                	bind:'{detail.factoryEmailDomain}',
		            	fieldLabel:'Factory Email Domain',
		            	flex:1
		            },
		            {
		            	xtype:'textfield',
		            	name:'specificFactoryEmailAddress',
		            	reference:'specificFactoryEmailAddress',
	                	bind:'{detail.specificFactoryEmailAddress}',
		            	fieldLabel:'Specific Factory Email Address',
		            	flex:1,
		            	margin:'0 10 0 10'
		            },
		            {
		            	xtype:'textfield',
		            	name:'csrEmailAddress',
		            	reference:'csrEmailAddress',
	                	bind:'{detail.csrEmailAddress}',
		            	fieldLabel:'CSR Email Address',
		            	flex:1
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
			        	name:'glidCustomerItem',
		            	reference:'glidCustomerItem',
	                	bind:'{detail.gLIDCustomerItem}',
			        	fieldLabel:'GLID/Customer Item #?',
			        	displayField:'name',
			        	valueField:'name',
			        	queryMode:'local',
			        	store:new Ext.data.JsonStore({
			        		data:[
			        		   {name:'Customer Item #'},
			        		   {name:'GLID'}
			        		],
			        		fields:['name']
			        	}),
			        	flex:1
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
			        	margin:'0 10 0 10'
			        },
			        {
			        	xtype:'combo',
			        	name:'isOrderWithAttachment',
		            	reference:'isOrderWithAttachment',
	                	bind:'{detail.isOrderWithAttachment}',
			        	fieldLabel:'Is Order with Attachment',
			        	displayField:'name',
			        	valueField:'name',
			        	queryMode:'local',
			        	flex:1,
			        	store:new Ext.data.JsonStore({
			        		data:[{name:'Yes'},{name:'No'}],  
			        		fields:['name']
			        	})
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
				    	name:'system',
	                	bind:'{detail.system}',
				    	fieldLabel:'System (Must fill in when Internal item # is selected above)',
				    	displayField:'name',
				    	valueField:'name',
				    	queryMode:'local',
				    	store:new Ext.data.JsonStore({
				    		data:[
				    		   {name:'Oracle'}
				    		],
				    		fields:['name']
				    	}),
				    	flex:1
				    },
				    {
				    	xtype:'combo',
				    	name:'orderFileFormat',
	                	bind:'{detail.orderFileFormat}',
				    	fieldLabel:'Order File Format',
				    	displayField:'name',
				    	valueField:'v',
				    	queryMode:'local',
				    	margin:'0 10 0 10',
				    	flex:1,
				    	store:new Ext.data.JsonStore({
				    		data:[{name:'Excel (xlsx)', v:'1'},{name:'Excel (xls)', v:'2'},{name:'Excel (xlsx & xls)', v:'3'},
			    		           {name:'Email Content', v:'4'},{name:'Readable pdf', v:'5'},{name:'Text (html)', v:'6'},
			    		           {name:'Text (htm)', v:'7'},{name:'Word (doc)', v:'8'},{name:'Word (docx)', v:'9'},{name:'Word (doc & docs)', v:'10'},
			    		           {name:'Zip->pdf', v:'11'},{name:'Zip->doc', v:'12'},{name:'Zip->docs', v:'13'},{name:'Zip->doc&docs', v:'14'},
			    		           {name:'Zip->xls', v:'15'},{name:'Zip->xlsx', v:'16'},{name:'Zip->xls&xlsx', v:'17'}
	    		            ],  
				    		fields:['name','v']
				    	})
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
				    	store:new Ext.data.JsonStore({
				    		data:[{name:'Excel (xlsx)', v:'1'},{name:'Excel (xls)', v:'2'},{name:'Excel (xlsx & xls)', v:'3'},
				    		           {name:'Email Content', v:'4'},{name:'Readable pdf', v:'5'},{name:'Text (html)', v:'6'},
				    		           {name:'Text (htm)', v:'7'},{name:'Word (doc)', v:'8'},{name:'Word (docx)', v:'9'},{name:'Word (doc & docs)', v:'10'},
				    		           {name:'Zip->pdf', v:'11'},{name:'Zip->doc', v:'12'},{name:'Zip->docs', v:'13'},{name:'Zip->doc&docs', v:'14'},
				    		           {name:'Zip->xls', v:'15'},{name:'Zip->xlsx', v:'16'},{name:'Zip->xls&xlsx', v:'17'},{name:'Non Readable attachment (AOC would not handle)', v:'18'}
				    		],  
				    		fields:['name','v']
				    	})
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
		   xtype:'fieldset',
		   title:'System',
		   margin:'10 0',
		   bodyPadding:5,
		   collapsible:true,
		   defaults:{
			   layout:{
				   type:'vbox',
				   align:'stretch'
			   }
		   },
		   items:[
		      {
		    	  xtype:'wisystemgrid',
		    	  reference:'wiSystemGrid',
		    	  border:'solid 1px #ccc;',
		    	  height:100
		      },
		      {
		    	  xtype:'fieldcontainer',
		    	  border:false,
		    	  layout:{
		    		  type:'hbox',
		    		  align:'stretch'
		    	  },
		    	  items:[
		    	      {
		    	    	  xtype:'wiorggrid',
				    	  reference:'wiorgGrid',
				    	  flex:1,
				    	  height:100,
				    	  border:'solid 1px #ccc;'
		    	      },
		    	      {
		    	    	  xtype:'button',
		    	    	  text:'+Org',
		    	    	  margin:'45 0 5 5',
		    	    	  ui:'white',
		    	    	  width:50
		    	      }
		    	  ]
		      }
		   ]
	   }
	},
	getSchemaIdentificationItems:function(){
		return{
			xtype:'fieldset',
			title:'Schema Identification',
			collapsible:true,
			reference:'schemaIdentification',
			bodyPadding:'5',
			margin:'10 0',
			items:[
			    {
			    	xtype:'fieldset',
			    	title:'Email Subject',
			    	reference:'emailSubject',
			    	bodyPadding:'5',
			    	collapsible:true,
			    	items:[
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
								//labelWidth:150
							},
			    	    	items:[
			    	    	    {
			    	    	    	xtype:'combo',
			    	    	    	fieldLabel:'Contain / Exact Match',
			    	    	    	reference:'emailContainExactMatch',
			    	    	    	name:'emailContainExactMatch',
				                	bind:'{detail.emailContainExactMatch}',
			    	    	    	queryMode:'local',
			    	    	    	displayField:'name',
			    	    	    	valueField:'name',
			    	    	    	store:new Ext.data.JsonStore({
			    	    	    		data:[{name:'Contain'},{name:'Exact Match'}],
			    	    	    		fields:['name']
			    	    	    	}),
			    	    	    	flex:1
			    	    	    },
			    	    	    {
			    	    	    	xtype:'textfield',
			    	    	    	name:'emailKeyWording',
				                	bind:'{detail.emailKeyWording}',
			    	    	    	fieldLabel:'Key Wordings',
			    	    	    	flex:1,
			    	    	    	margin:'0 10'
			    	    	    },
			    	    	    {
			    	    	    	xtype:'combo',
			    	    	    	name:'emailSubjectDataStructureRule',
				                	bind:'{detail.emailSubjectDataStructureRule}',
			    	    	    	fieldLabel:'Does the above Email Subject rule only apply to this Data Structure for this Factory?',
			    	    	    	displayField:'name',
			    	    	    	valueField:'name',
			    	    	    	queryMode:'local',
			    	    	    	store:new Ext.data.JsonStore({
			    	    	    		data:[{name:'Yes'},{name:'No'}],
			    	    	    		fields:['name']
			    	    	    	})
			    	    	    }
			    	    	]
			    	    },
			    	    {
			    	    	xtype:'displayfield',
			    	    	value:'If "No"(i.e. more than 1 data structure could  potentially be included in same email upon recieve),please specify other data structure that would share the same Email Subject rule'
			    	    },
			    	    {
			    	    	xtype:'textfield',
			    	    	hideLabel:true,
			    	    	name:'emailSubjectDataStructureOtherRule',
		                	bind:'{detail.emailSubjectDataStructureOtherRule}',
			    	    	width:300
			    	    }
			    	]
			    },
                {
			    	xtype:'fieldset',
			    	title:'Order File',
			    	reference:'orderFileFieldSet',
			    	bodyPadding:'5',
			    	collapsible:true,
			    	items:[
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
								labelAlign:AOC.config.Settings.form.topLabelAlign,
								labelWidth:150
							},
			    	    	items:[
			    	    	    {
			    	    	    	xtype:'combo',
			    	    	    	fieldLabel:'Contain / Exact Match',
			    	    	    	reference:'orderFileContainExactMatch',
			    	    	    	name:'orderFileContainExactMatch',
				                	bind:'{detail.orderFileContainExactMatch}',
			    	    	    	queryMode:'local',
			    	    	    	displayField:'name',
			    	    	    	valueField:'name',
			    	    	    	store:new Ext.data.JsonStore({
			    	    	    		data:[{name:'Contain'},{name:'Exact Match'}],
			    	    	    		fields:['name']
			    	    	    	}),
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
			    	    	    	name:'orderFormat',
				                	bind:'{detail.orderFormat}',
			    	    	    	fieldLabel:'Format',
			    	    	    	flex:1
			    	    	    }
			    	    	]
			    	    },
			    	    {
			    	    	xtype:'radiogroup',
			    	    	column:2,
			    	    	width:300,
			    	    	items:[
			    	    	    {boxLabel:'If Text', name:'order', inputValue:1, checked:true},
			    	    	    {boxLabel:'If Excel', name:'order', inputValue:2}
			    	    	],
		                	bind:'{detail.order}',
			    	    	listeners:{
			    	    		change:'onOrderRadioChange'
			    	    	}
			    	    },
			    	    {
			    	    	xtype:'fieldcontainer',
			    	    	margin:'0 0 5 0',
			    	    	defaults:{
								labelSeparator:'',
								labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
								labelAlign:AOC.config.Settings.form.defaultLabelAlign,
								labelWidth:200
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
								   displayField:'name',
								   valueField:'name',
								   queryMode:'local',
								   flex:1,
								   store:new Ext.data.JsonStore({
									   data:[{name:'First Page'},{name:'Last Page'}],
									   fields:['name']
								   })
							   },
							   {
								   xtype:'combo',
								   name:'orderTextPosition',
				                	bind:'{detail.orderTextPosition}',
								   fieldLabel:'Top/Mid/Bottom of the page',
								   displayField:'name',
								   reference:'orderTextPosition',
								   valueField:'name',
								   queryMode:'local',
								   margin:'0 10',
								   flex:1,
								   store:new Ext.data.JsonStore({
									   data:[{name:'Top'},{name:'Mid'}, {name:'Bottom'}],
									   fields:['name']
								   })
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
								   fieldLabel:'1 Sheet/Multiple sheets in a file',
								   displayField:'name',
								   hidden:true,
								   reference:'orderExcelSheet',
								   valueField:'name',
								   queryMode:'local',
								   margin:'0 10',
								   flex:1,
								   store:new Ext.data.JsonStore({
									   data:[{name:'1 Sheet in a file'},{name:'Multiple order sheets in a file'}],
									   fields:['name']
								   })
							   }
							]
			    	    }
			    	]
			    },
			    {
			    	xtype:'fieldset',
			    	title:'Attachment',
			    	reference:'attachmentFileFieldSet',
			    	bodyPadding:'5',
			    	collapsible:true,
			    	items:[
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
								labelAlign:AOC.config.Settings.form.topLabelAlign,
								labelWidth:150
							},
			    	    	items:[
			    	    	    {
			    	    	    	xtype:'combo',
			    	    	    	fieldLabel:'Contain / Exact Match',
			    	    	    	reference:'attachmentFileContainExactMatch',
			    	    	    	name:'attachmentFileContainExactMatch',
			    	    	    	queryMode:'local',
			    	    	    	displayField:'name',
			    	    	    	valueField:'name',
			    	    	    	store:new Ext.data.JsonStore({
			    	    	    		data:[{name:'Contain'},{name:'Exact Match'}],
			    	    	    		fields:['name']
			    	    	    	}),
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
			    	    	xtype:'radiogroup',
			    	    	column:2,
			    	    	width:300,
			    	    	items:[
			    	    	    {boxLabel:'If Text', name:'attach', inputValue:1, checked:true},
			    	    	    {boxLabel:'If Excel', name:'attach', inputValue:2}
			    	    	],
			    	    	listeners:{
			    	    		change:'onAttachmentRadioChange'
			    	    	}
			    	    },
			    	    {
			    	    	xtype:'fieldcontainer',
			    	    	margin:'0 0 5 0',
			    	    	defaults:{
								labelSeparator:'',
								labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
								labelAlign:AOC.config.Settings.form.defaultLabelAlign,
								labelWidth:200
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
								   displayField:'name',
								   valueField:'name',
								   queryMode:'local',
								   flex:1,
								   store:new Ext.data.JsonStore({
									   data:[{name:'First Page'},{name:'Last Page'}],
									   fields:['name']
								   })
							   },
							   {
								   xtype:'combo',
								   name:'attachmentTextPosition',
								   fieldLabel:'Top/Mid/Bottom of the page',
								   displayField:'name',
								   reference:'attachmentTextPosition',
								   valueField:'name',
								   queryMode:'local',
								   flex:1,
								   margin:'0 10',
								   store:new Ext.data.JsonStore({
									   data:[{name:'Top'},{name:'Mid'}, {name:'Bottom'}],
									   fields:['name']
								   })
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
								   fieldLabel:'1 Sheet/Multiple sheets in a file',
								   displayField:'name',
								   hidden:true,
								   reference:'attachmentExcelSheet',
								   valueField:'name',
								   queryMode:'local',
								   margin:'0 10',
								   flex:1,
								   store:new Ext.data.JsonStore({
									   data:[{name:'1 Sheet in a file'},{name:'Multiple order sheets in a file'}],
									   fields:['name']
								   })
							   }
							]
			    	    }
			    	]
			    }
			]
		}
	}
});