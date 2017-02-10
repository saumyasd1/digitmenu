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
    layout:'anchor',
    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            items: me.buildItem(),
            buttons : me.buildButtons(),
            listeners: {
                'afterrender': function(obj) {
                    if (me.rec != null) {
                        me.down('form').loadRecord(me.rec);
                    }
                }
            }
        });
        me.callParent(arguments);
    },
    buildButtons:function(){
    	return [
    	    '->',
    	    {
    	    	 text: 'Save',
    	    	 handler: 'onSaveBtnClick'
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
            margin:'0 0 10 0',
            hidden: true
        }, 
        {
            xtype: 'form',
            itemId: 'listPanel',
            border: false,
            reference:'createPartnerForm',
            anchor:'100%',
            layout:'anchor',
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
                anchor:'100%',
                maxLength: '250',
                margin:'0 0 5 0',
                blankText: AOCLit.partnerNameReq,
                enforceMaxLength: true,
                listeners: {
                    'blur': 'notifyByImage',
                    'focus': 'hideMandatoryMessage'
                }
            }, 
            {
                xtype: 'textfield',
                itemId: 'AItemId',
                name: 'address1',
                fieldLabel: AOCLit.address,
                allowBlank: false,
                anchor:'100%',
                margin:'0 0 5 0',
                blankText: AOCLit.addReq,
                maxLength: 500,
                enforceMaxLength: true,
                listeners: {
                    'blur': 'notifyByImage',
                    'focus': 'hideMandatoryMessage'
                }
            }, 
            {
                xtype: 'textfield',
                itemId: 'CPItemId',
                name: 'contactPerson',
                fieldLabel: AOCLit.contactPerson,
                allowBlank: false,
                anchor:'100%',
                margin:'0 0 5 0',
                blankText: AOCLit.contactPerson,
                maxLength: '100',
                enforceMaxLength: true,
                listeners: {
                    'blur': 'notifyByImage',
                    'focus': 'hideMandatoryMessage'
                }
            }, 
            {

                xtype: 'textfield',
                itemId: 'phone',
                name: 'phone',
                fieldLabel: 'Phone',
                allowBlank: false,
                anchor:'100%',
                margin:'0 0 5 0',
                blankText: AOCLit.phoneReqMsg,
                maxLength: '100',
                regex: /^(\d+-?)+\d+$/,
                enforceMaxLength: true,
                listeners: {
                    'blur': 'notifyByImage',
                    'focus': 'hideMandatoryMessage'
                }
            }]
        }]
    }
});