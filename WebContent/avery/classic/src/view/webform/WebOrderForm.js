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
	border:false,
	
	attachmentFileNameExtension_1:null,
	attachmentCount:1,
	orderFileAttachmentCount:1,
	orderFileNameExtension:null,
	maximumOrderFileCount:10,
	maxAttachmentCount:10,
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
        me.queryById('orderFileType').allowBlank = false;
    },
    initComponent : function(){
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
				margin:'0 0 5 0',
				defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:150,
					xtype:'combo',
					allowBlank:false,
					queryMode:'local',
					flex:1
				},
				items:[
					{
						xtype:'combo',
						emptyText:AOCLit.partnerName,
						reference:'partnerCombo',
						itemId:'partnerCombo',
						isChangedForFirstTime:true,
						store: Ext.data.StoreManager.lookup('uniquePartnerStoreId'),
						name:'partnerName',
						editable:true,
						margin:'0 0 0 155',
						displayField:'name',
						valueField:'id',
						listeners:{
							'select':'onPartnerSelect'
						}
					},
					{
						xtype:'combo',
						emptyText:'RBO',
						reference:'rboCombo',
						itemId:'rboCombo',
						editable:false,
						displayField:'rboName',
						valueField:'id',
						name:'rboName',
						isChangedForFirstTime:true,
						margin:'0 10 0 10',
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
						name:'dataStructureName',
						emptyText:AOCLit.partnerDataStructure,
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
						disabled:true,
						store:Ext.data.StoreManager.lookup('webOrderCSRStoreId') != null ? Ext.data.StoreManager.lookup('webOrderCSRStoreId') : Ext.create('AOC.store.AssignCSRStore',{storeId:'webOrderCSRStoreId'}),
						typeAhead:true,
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
					labelWidth:150,
					xtype:'textfield',
					flex:1.8,
					allowBlank:false
				},
				items:[
					{
						xtype:'textfield',
						itemId:'PNItemId',
						name: 'email',
						reference:'email',
						itemId:'email',
						vtype:'email',
						emptyText:'abc@gmail.com',
						fieldLabel:'Sender Email',
						disabled:true,
						blankText : 'Sender Email is required'
					},
					{
						xtype:'textfield',
						itemId:'RNtemId',
						name: 'subject',
						margin:'0 0 0 10',
						reference:'subject',
						fieldLabel:'Email Subject',
						itemId:'subject',
						disabled:true,
						maxLength: '100',
						emptyText:'email subject',
						blankText: AOCLit.emailSubReq
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
						flex:1.8
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
							change:'onOrderFileChange'
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
							change:'onAttachmentChange'
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
		];
	}
});
