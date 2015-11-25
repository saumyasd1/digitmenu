Ext.define('AOC.view.AOCLogin',{
	extend:'Ext.form.Panel',
	alias:'widget.aocLogin',
	itemId:'aocLoginItemId',
	bodyPadding: 5,
	width: 700,
	border:false,
    modal:true,
    initComponent : function(){
    	var me=this;
    	this.fieldArray = [],
            Ext.apply(this,{
                items:this.buildItem(),
                layout: {
                	type: 'vbox',
                	align: 'center',
                	pack: 'center'
                	},
                title: '<B>Welcome to Accelerated Order Capture Login</B>'
            });
            this.callParent(arguments);

        },
        buildButtons : function(){
        	var me=this;
            return [{
            	text : 'Login',
            	handler: function() 
            	{
            		valueObj=me.form.getValues(false,true,false,true);
            		var UserName=valueObj.userName;
            		var password=valueObj.password;
            		if(UserName=="aoc_user" && password=="indigo1")
            		{
            			var activeCard=Ext.ComponentQuery.query("#viewportitemid")[0];
            			activeCard.getLayout().setActiveItem(1);
            			var menuStore=Ext.create('AOC.store.MenuStore');
                    	var menuController=myAppGlobal.getController('MenuController');
                    	menuStore.on({
                    		load : menuController.onLoadMenuBar
                    	});
            		}else{
            			var Msg=me.down('#messageFieldItemId');
            			Msg.setValue('Either UserName or Password is not correct');
            		}
            	}
            }
           ];
        },
        buildItem:function(){
        	var me=this;
        	return [{
        		items: [
							{
								xtype:'displayfield',
								itemId:'messageFieldItemId',
								vale:'',
								hidden:false
							},
					      {
        		            xtype: 'form',        
        		            frame: true,         
        		            bodyPadding: 50,
        		            defaults: {             
        		                xtype: 'textfield', 
        		                labelWidth : 100,
        			            width : 500,
        			            allowBlank:false
        		            },
        		            items: [
        		                {
        		                    name: 'userName',    
        		                    fieldLabel: "<B>UserName</B>",
        		                    blankText : 'UserName Field is required',
        		                },
        		            	{
        		                	xtype :'tbspacer',
        		                	width :20
        		        		},
        		                {   
        		                    name: 'password',
        		                    fieldLabel: "<B>Password</B>",
        		                    inputType: 'password',
        		                    blankText : 'Password Field is required',
        		                }
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
		   }
		 
                 });
