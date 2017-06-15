Ext.define('AOC.view.base.BaseToolbar',{
    extend : 'Ext.toolbar.Toolbar',
    alias : 'widget.basetoolbar',
    ui : 'darktoolbar',
    height : 35,
    shadow : true,
    initComponent : function(){
	var me=this;
        if (this.shadow){
            this.cls = 'adeptia-toolbar-shadow';
        }
        Ext.apply(this,{
        	 forceFit: true,
          listeners:{
	        	'afterrender':function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts){
        		if(me.title){
        			obj.insert(1,{
    					xtype:'image',
    					height:21.5,
    					flex: 0,
    					imgCls:'window-icon',
        	        	listeners:{
    			    		scope:this,
    			    		'afterrender':function(cmp){
    			    			Ext.create('Ext.tip.ToolTip', {
    			    		        target: cmp.getEl(),
    			    		        html: "Help Assistant"
    			    		     });
    			    		},
    			    		el: { 
    			                'click': function() {
    			                	var mainController = myAppGlobal.getController('MenuController'),
    			                	title = me.title;
    			                	mainController.showinformationWindow(title);
    			                }
    			            }
    			    	}
    				})	;
        			obj.insert(2,{
    					xtype:'displayfield',
    					itemId:'titleMessageItemId',
    					flex: 1,
    					hidden: true,
    					height:30,
    					 style:{
    				         'font-size':'8px;text-align: center;'
    				        },
    				    
    					value:'',
    					listeners:{
        				'change':function(obj,newValue){
        				if(newValue!=''){
        					me.down("#advanceSearchField").hide();
        					obj.show();
        				    var task = new Ext.util.DelayedTask(function(){
        					obj.setValue('');
        				});
        				    task.delay(10000);
        				} 
        				else  {
        					me.down("#advanceSearchField").show();
        					obj.hide();
        				}
        			}
        			}
    				})	;
        		}
	        	}
	        }
        });
        this.callParent(arguments);
    }
});