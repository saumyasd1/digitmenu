Ext.apply(Ext.form.VTypes, {
     excelUpload: function(val, field) {                              
         var fileName = /^.*\.(gif|png|bmp|jpg|jpeg)$/i;
         return fileName.test(val);
     },                 
     excelUploadText: 'Image must be in .gif,.png,.bmp,.jpg,.jpeg format'
});

Ext.define('AOC.view.webform.WebOrderForm',{
	extend:'Ext.form.Panel',
	alias:'widget.weborderform',
	itemId:'weborderformItemId',
	bodyPadding: '10',
	requires: [
	    'AOC.lang.lit'
	],
	border:false,
	attachmentFileNameExtension_1:null,
	attachmentCount:1,
	orderFileAttachmentCount:1,
	orderFileNameExtension:null,
	maximumOrderFileCount:4,
	maxAttachmentCount:4,
	isResubmit:false,
	autoScroll:true,
	requires:['AOC.store.WebformStore'],
	
	defaults:{
		labelSeparator:'',
		labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
		labelAlign:AOC.config.Settings.form.defaultLabelAlign,
		labelWidth:150
	},
    resetFormFields: function() {
    	var me = this;
    	me.attachmentCount = 1;
    	me.orderFileAttachmentCount =1;
    	me.isResubmit=false;
        me.form.reset();
        me.queryById('additionalDataFileKey').hide();
        me.queryById('email').setFieldStyle(AOC.lang.lit.hideImage);
        me.queryById('subject').setFieldStyle(AOC.lang.lit.hideImage);
        me.queryById('emailBody').setFieldStyle(AOC.lang.lit.hideImage);
        me.queryById('orderFileType').setFieldStyle(AOC.lang.lit.hideImage);
    },
    initComponent : function(){
    	var me = this;
		Ext.apply(this,{
			items:this.buildItems()
		});
		this.callParent(arguments);
	},
	buildItems:function(){
		var me=this;
		return [
			{
				xtype:'fieldcontainer',
				layout:'hbox',
				flex:1,
				margin:'5 0 5 0',
				defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:150
				},
				items:[
					{
						xtype:'combo',
						emptyText:AOCLit.partnerName,
						reference:'partnerCombo',
						itemId:'partnerCombo',
						isChangedForFirstTime:true,
						store:Ext.create('AOC.store.UniquePartnerStore'),
						valueField:'id',
						name:'partnerName',
						editable:false,
						allowBlank : false,
						queryMode:'local',
						margin:'0 0 0 155',
						flex:1,
						displayField:'partnerName',
						listeners:{
							'change':'onPartnerChange'
						}
					},
					{
						xtype:'combo',
						emptyText:'RBO',
						reference:'rboCombo',
						itemId:'rboCombo',
						editable:false,
						displayField:'rboName',
						name:'rboName',
						flex:1,
						isChangedForFirstTime:true,
						margin:'0 10 0 10',
						valueField:'id',
						allowBlank : false, 
						disabled:true,
						listeners:{
							'change':'onRBOChange'
						}
					},
					{
						xtype:'combo',
						reference:'dataStructureCombo',
						itemId:'dataStructureCombo',
						displayField:'dataStructureName',
						valueField:'id',
						editable:false,
						flex:1,
						name:'dataStructureName',
						emptyText:AOCLit.partnerDataStructure,
						allowBlank : false, 
						disabled:true,
						listeners:{
							'change':'onDataStructureSelection'
						}
					},
					{
						xtype:'combo',
						displayField:'csrName',
						reference:'csrCombo',
						name:'assignCSR',
						emptyText:'CSR Code',
						reference:'assignCSR',
						valueField:'userId',
						queryMode:'local',
						allowBlank:false,
						disabled:true,
						store:Ext.data.StoreManager.lookup('webOrderCSRStoreId') != null ? Ext.data.StoreManager.lookup('webOrderCSRStoreId') : Ext.create('AOC.store.AssignCSRStore',{storeId:'webOrderCSRStoreId'}),
						typeAhead:true,
						triggerAction:'all',
						flex:1,
						tabIndex:9,
						enableKeyEvents:true,
						margin:'0 0 0 10',
						listeners:{
							blur:function(combo,e){
								Helper.clearCSRCombo(combo,e);
							}
						}
					}
				]
			},
			{
				xtype:'fieldcontainer',
				layout:'hbox',
				flex:1,
				margin:'0 0 5 0',
				defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:150
				},
				items:[
					{
						xtype:'textfield',
						itemId:'PNItemId',
						name: 'email',
						reference:'email',
						itemId:'email',
						flex:1.8,
						vtype:'email',
						fieldLabel:'Sender Email',
						disabled:true,
						allowBlank: false,
						blankText : 'Sender Email is required',
						listeners:{
							 blur : this.notifyByImage
						 }
					},
					{
						xtype:'textfield',
						itemId:'RNtemId',
						name: 'subject',
						flex:1.8,
						margin:'0 0 0 10',
						reference:'subject',
						fieldLabel:'Email Subject',
						itemId:'subject',
						allowBlank: false,
						disabled:true,
						maxLength : '100',
						blankText : AOCLit.emailSubReq,
						listeners:{
						  blur : this.notifyByImage
						}
					}
				]
			},
			{
				xtype:'fieldcontainer',
				layout:'hbox',
				flex:1,
				itemId:'orderFileTypeCont',
				reference:'orderFileTypeCont',
				margin:'0 0 5 0',
				defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:150
				},
				items:[
					{
						
						xtype:'textarea',
						itemId:'AItemId',
						name: 'emailBody',
						reference:'emailBody',
						fieldLabel:AOCLit.emailBody,
						itemId:'emailBody',
						disabled:true,
						height:100,
						allowBlank: false,
						flex:1.8,
						//margin:'0 50 0 0',
						listeners:{
							blur : this.notifyByImage
						}
					},
					{ 
						xtype : 'fileuploadfield', 
						name : 'orderFileType',
						reference:'orderFileType',
						fieldLabel : 'Order File', 
						itemId:'orderFileType',
						flex:1.8,
						margin:'0 0 0 10',
						allowBlank : false, 
						disabled:true,
						forceSelection : true,
						enforceMaxLength: true,
						blankText :'Order File Type is required',
						listeners:{
							'change':'onOrderFileChange',
							blur : this.notifyByImage
						}
					}
				]
			},
			{
				xtype:'fieldcontainer',
				layout:'hbox',
				flex:1,
				margin:'0 0 5 0',
				defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:150
				},
				items:[
					{   
						xtype:'textfield',
						name: 'additionalDataFileKey',
						flex:1.8,
						reference: 'additionalDataFileKey',
						fieldLabel:'Additional DataFile Key',
						itemId:'additionalDataFileKey',
						disabled:true,
						hidden:true
					},
					{   
						xtype:'fileuploadfield',
						name: 'attachment',
						flex:1.8,
						margin:'0 0 0 10',
						reference: 'attachment',
						fieldLabel:'Attachments',
						itemId:'attachment',
						disabled:true,
						allowBlank: false,
						hidden:true,
						listeners:{
							'change':'onAttachmentChange',
							blur : this.notifyByImage
						}
					}
				]
			},
			{
				xtype:'hidden',
				name:'oldOrderId',
				itemId:'oldOrderId'
			},
			{
				xtype:'hidden',
				name:'oldOrderFileId',
				itemId:'oldOrderFileId',
				value:''
			},
			{
				xtype:'hidden',
				name:'oldOrderFileDeleted',
				itemId:'oldOrderFileDeleted',
				value:false
			},
			{
				xtype:'hidden',
				name:'oldEmailId',
				itemId:'oldEmailId',
				value:''
			},
			{
				xtype:'hidden',
				name:'oldAdditionalFileId',
				itemId:'oldAdditionalFileId',
				reference:'oldAdditionalFileId',
				value:''
			}
		]
	},
	notifyByImage : function(config){
		if(config.isValid()){
			config.setFieldStyle('background-image:url( AOC.config.Settings.buttonIcons.valid_field);background-repeat:no-repeat;background-position:right;');
		}
		else{
			config.setFieldStyle('background-image:url(AOC.config.Settings.buttonIcons.invalid_field);background-repeat:no-repeat;background-position:right;');
		}
	 }
});
