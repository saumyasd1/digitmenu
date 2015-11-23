Ext.define('AOC.view.partner.CreatePartner',{
	extend:'Ext.window.Window',
	alias:'widget.createpartner',
	itemId:'createpartnerItemId',
	controller:'partnerMain',
	bodyPadding: 5,
	width: 700,
	border:false,
    modal:true,
    draggable:false,
    editMode:false,
    rec:null,
    partnerId:null,
    partnerName:null,
    initComponent : function(){
    	var me=this;
    	this.fieldArray = [],
            Ext.apply(this,{
                items:this.buildItem(),
                listeners:{
            	'afterrender':function(obj){
            	if(me.rec!=null){
            		var form=me.down('form').loadRecord(me.rec);
            	}
            }
            }
            });
            this.callParent(arguments);

        },
        buildButtons : function(){
            return [{
            	text : 'Save',
                handler : 'SaveDetails'
            },
            {
            	text : 'Cancel',
                handler : 'CancelDetails'
            }];
        },
        buildItem:function(){
        	var me=this;
        	return [{
        		xtype:'displayfield',
        		itemId:'messageFieldItemId',
        		vale:'',
        		hidden:false
        	},{
        		xtype:'form',
        		itemId:'listPanel',
        		border:false,
        		items:[{
        	
        			xtype:'textfield',
        			itemId:'PNItemId',
        			labelAlign:'right',
        			name: 'partnerName',
        			fieldLabel:'Partner Name',
        			value:'',
        		    labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 100,
		            width : 500,
		            labelAlign:'right',
		            maxLength : '250',
		            blankText : 'Partner Name is required',
		            enforceMaxLength: true,
		            listeners : {
		            	blur : this.notifyByImage,
   	                	focus : this.notifyByMessage
   	          }
        		},
        		{
                	xtype :'tbspacer',
                	width :20
        		},
        		{
        			xtype:'textfield',
        			itemId:'AItemId',
        			labelAlign:'right',
        			name: 'address',
        			fieldLabel:'Address',
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 100,
  		            width : 500,
  		            labelAlign:'right',
  		            blankText : 'Address is required',
  		            maxLength : '500',
  		            enforceMaxLength: true,
  		            listeners : {
  		            	        blur : this.notifyByImage,
         	                	focus : this.notifyByMessage
         	                     }
        		},
        		{
                	xtype :'tbspacer',
                	width :10
        		},
        		{
        			xtype:'textfield',
        			itemId:'CPItemId',
        			labelAlign:'right',
        			name: 'contactPerson',
        			fieldLabel:'Contact Person',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 100,
  		            width : 500,
  		            labelAlign:'right',
  		            blankText : 'Contact Person is required',
  		            maxLength : '100',
  		            enforceMaxLength: true,
   		            listeners : {
   		            	    blur : this.notifyByImage,
     	                	focus : this.notifyByMessage
     	              
     	                        }
        		},
        		{
        		
        			xtype:'textfield',
        			itemId:'phone',
        			labelAlign:'right',
        			name: 'phone',
        			fieldLabel:'Phone',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 100,
  		            width : 500,
  		            labelAlign:'right',
  		            blankText : 'Phone is required(should contains - and digits)',
  		            maxLength : '100',
  		            regex:/^(\d+-?)+\d+$/,
  		            enforceMaxLength: true,
  		            listeners : {
  		            	        blur : this.notifyByImage,
  	     	                	focus : this.notifyByMessage
  	     	                    }
  		         
        		},
        		{
                	xtype :'tbspacer',
                	width :10
        		},
        		{
        			xtype:'radiogroup',
        			itemId:'ACItemId',
        			labelAlign:'right',
        			name: 'active',
        			fieldLabel:'Active',
        			value:'',
        			labelSeparator:'',
                    labelWidth : 100,
  		            width : 500,
  		            hidden:true,
         	        items:[
         	        {boxLabel:'Active',name:'isActive',inputValue:'1',id:'active'},
         	         {
         	       	    xtype :'tbspacer',
         	       	    width :190
         	         },
         	         {boxLabel:'Inactive',name:'isActive',inputValue:'0',id:'Inactive'},
         	        			       ]
        		}
               ],
        		buttons:this.buildButtons()
        	}]
        },
        notifyByMessage : function(config){
			   var me = this;
			   if(config.up('#listPanel').ownerCt){
				   if(config.up('#listPanel').ownerCt.editMode)
					       config.up('#listPanel').ownerCt.setTitle('Edit Partner');
				   else
					       config.up('#listPanel').ownerCt.setTitle('Add Partner');
			   }
		   },
		   notifyByImage : function(config){
		    	 if(config.isValid())
		    		   config.setFieldStyle('background-image:url(avery/resources/images/valid_field.png);background-repeat:no-repeat;background-position:right;');
					else
					   config.setFieldStyle('background-image:url(avery/resources/images/invalid_field.jpg);background-repeat:no-repeat;background-position:right;');
		     },
		     
        SaveDetails:function(){
        	var me=this;
        	if(me.editMode){
        		this.SaveDetails();
        	}else{
        		this.SaveDetails();
        	}
        }
                 });
