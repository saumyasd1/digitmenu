Ext.define('AOC.view.taskmanager.TaskManagerController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.taskManagerController',
    runTime : AOC.config.Runtime,
    requires:[
        'AOC.view.taskmanager.AssignCSRWindow'
    ],
    onClickMenu: function(obj, rowIndex, colIndex, item, e, record) {
        var me = this;
        var callout = Ext.widget('callout', {
            cls: 'white more-menu-item-callout extra',
            html: me.buildMenuTpl.apply("{}"),
            target: e.target,
            calloutArrowLocation: 'top-left',
            relativePosition: 't-b', 
            relativeOffsets: [52, 23],
            dismissDelay: 0,
            listeners: {
            	afterrender: me.onAfterRenderEditCallout,
            	viewMail: function(){  
            		currentRecord = e.record;
					var id = currentRecord.get('id'),
						panel = Ext.ComponentQuery.query('#taskManagerPanel')[0],
						form = panel.down('#viewmailformItemId'),
						viewMail = panel.down('#viewMailItemId');
						
					Helper.showHideEmailBodySubjectFields(form, currentRecord);
					
					viewMail.queryById('saveAttachment').hide();
					viewMail.queryById('processOrderBtn').hide();
					
					form.loadRecord(currentRecord);
                    store = Ext.create('AOC.store.ViewMailformStore',{
                        storeId: 'ViewMailformStoreId',
                        totalCount: 'total',
                        proxy : {
                    		type : 'rest',
                    		url : applicationContext+'/rest/orderattachements/order/'+id,
                    		reader:{
                    	        type:'json', 
                    	        rootProperty: 'viewmail',
                    	        totalProperty: 'totalCount'
                    	    }
                    	}
                    });
                   
					var emailAttachmentGrid = panel.down('#EmailAttachmentInfoGriditemId');
					emailAttachmentGrid.status = AOCLit.emailIdentifiedStatus;
					emailAttachmentGrid.bindStore(store);
					panel.getLayout().setActiveItem(1);
					me.runTime.setActiveGrid(emailAttachmentGrid);
                    callout.destroy();
				},
				assignCSR:function(){
					currentRecord = e.record;
					var id = currentRecord.get('id');
					
					var assignCsrWin  = Ext.create('AOC.view.taskmanager.AssignCSRWindow',{
						callback:function(rec){
							var taskManagerPanel = Ext.ComponentQuery.query('#taskManagerPanel')[0],
								taskManagerGrid = taskManagerPanel.queryById('TaskManagerGriditemId');
							
							assignCsrWin.mask(AOCLit.pleaseWaitTitle);
		    		    	Ext.Ajax.request({
		    		    		method:'GET',
		    		    		url: applicationContext+'/rest/emailqueue/assigncsr/'+rec.recordId+'/'+rec.assignCSRId,
		    				    success : function(response, opts) {
		    				    	assignCsrWin.unmask();
	    					  		Ext.Msg.alert('Success','CSR assigned successfully');
	    					  		assignCsrWin.close();
	    					  		taskManagerGrid.view.refresh();
	    				        },
	    				        failure: function(response, opts) {
	    				        	assignCsrWin.unmask();
								}
							});
						},
						recordId:id
					});
					assignCsrWin.show();
					callout.destroy();
				}
            }
        });
        //Adding functionality related to Menu item visibility
        callout.show();
        var heightAbove = e.getY() - Ext.getBody().getScroll().top,
        heightBelow = Ext.Element.getViewportHeight() - heightAbove;
  	    if(heightBelow<(callout.getHeight()+40)){
			callout.calloutArrowLocation='bottom-left'; 
			callout.relativePosition='b-t';
			callout.relativeOffsets = [60, 0];
		}else{
			callout.calloutArrowLocation='top-left'; 
			callout.relativePosition='t-b';
			callout.relativeOffsets = [60, 5];
		}
        callout.show();
    },
    onAfterRenderEditCallout: function(cmp) {
        var me = this;
        cmp.el.on({
            delegate: 'div.user-profile-menu-item',
            click: function(e, element) {
                var el = Ext.get(element),
                    event = el.getAttribute('event');
                if (event && !el.hasCls('edit-menu-disabled')) {
                    me.fireEvent(event);
                }
            }
        });
    },
    buildMenuTpl: function() {
        var me = this;
        return Ext.create('Ext.XTemplate',
            '<div style="width:150px !important;border-bottom: none !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="viewMail"">View Mail</div>',
            '</tpl>',
            '<div style="width:150px !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="assignCSR"">Assign CSR</div>',
            '</tpl>'
        );
    }
});
