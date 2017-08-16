Ext.define('AOC.view.partner.CreatePartner', {
    extend: 'AOC.view.base.NewBaseWindow',
    alias: 'widget.createpartner',
    itemId: 'createpartnerItemId',
    controller: 'partnerMain',
    bodyPadding: 5,
    width: 350,
    draggable: false,
    editMode: false,
    rec: null,
    partnerId: null,
    partnerName: null,
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    listeners: {
        'afterrender': function(obj) {
        	var roleId = AOCRuntime.getUser().role;
            if (this.rec != null) {
                this.down('form').loadRecord(this.rec);
            }
            if(roleId== 3){
				this.setReadOnlyView(true);
			}
        }
    },
    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            items: me.buildItem(),
            buttons : me.buildButtons()
        });
        me.callParent(arguments);
    },
    buildButtons:function(){
    	return [
    	    '->',
    	    {
    	    	 text: 'Save',
    	    	 handler: 'onSaveBtnClick',
    	    	 hidden:AOCRuntime.getUser().role == 3 ? true : false
    	    },
    	    {
	   	    	 text: 'Cancel',
	   	    	 handler: 'onCancelBtnClick'
    	    }
    	];
    },
    buildItem: function() {
        return [
        {
            xtype: 'displayfield',
            itemId: 'messageFieldItemId',
            reference:'messageLabelField',
            fieldStyle:'text-align: center;',
            value: '',
            flex:1,
            margin:'0 0 10 0',
            hidden: true
        }, 
        {
            xtype: 'form',
            itemId: 'listPanel',
            border: false,
            reference:'createPartnerForm',
            flex:1,
            layout:{type:'vbox',align:'stretch'},
            defaults:{
				labelSeparator:'',
				labelStyle:Settings.config.defaultFormLabelStyle,
				labelAlign:Settings.form.topLabelAlign
			},
            items: [{

                xtype: 'textfield',
                itemId: 'PNItemId',
                name: 'partnerName',
                reference: 'partnerName',
                fieldLabel: AOCLit.partnerName,
                allowBlank: false,
                flex:1,
                maxLength: '250',
                margin:'0 0 5 0',
                blankText: AOCLit.partnerNameReq,
                enforceMaxLength: true
            }, 
            {
                xtype: 'textfield',
                itemId: 'AItemId',
                name: 'address1',
                fieldLabel: AOCLit.address,
                allowBlank: false,
                flex:1,
                margin:'0 0 5 0',
                blankText: AOCLit.addReq,
                maxLength: 500,
                enforceMaxLength: true
            }, 
            {
                xtype: 'textfield',
                itemId: 'CPItemId',
                name: 'contactPerson',
                fieldLabel: AOCLit.contactPerson,
                allowBlank: false,
                flex:1,
                margin:'0 0 5 0',
                blankText: AOCLit.contactPersonReq,
                maxLength: 100,
                enforceMaxLength: true
            }, 
            {

                xtype: 'textfield',
                itemId: 'phone',
                name: 'phone',
                fieldLabel: 'Phone',
                allowBlank: false,
                flex:1,
                margin:'0 0 5 0',
                blankText: AOCLit.phoneReqMsg,
                maxLength: 20,
                regex: /^(\d+-?)+\d+$/,
                enforceMaxLength: true
            }]
        }]
    },
    setReadOnlyView: function (readOnlyFlag) {
	    var me = this,
	        refs = me.getReferences(),
	        createPartnerForm = refs.createPartnerForm,
	        textFieldArray = createPartnerForm.query('[xtype = textfield]'),
	        tempArray = [].concat(textFieldArray);

	    var len = tempArray.length;
	    for (var i = 0; i < len; i++) {
	            tempArray[i].setReadOnly(readOnlyFlag);
	    }
	}
});