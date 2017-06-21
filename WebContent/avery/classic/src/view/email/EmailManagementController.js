Ext.define('AOC.view.email.EmailManagementController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.emailManagementController',
    runTime : AOC.config.Runtime,
    helper: AOC.util.Helper,
    requires:['AOC.util.Helper'],
    
    init : function(){
	     var me=this;
	     me.menuTpl = me.buildMenuTpl();    
    },
    onClickMenu: function(obj, rowIndex, colIndex, item, e, record) {
        var me = this;
        var callout = Ext.widget('callout', {
            cls: 'white more-menu-item-callout extra',
            html: me.menuTpl.apply(record.data),
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
						panel = Ext.ComponentQuery.query('#emailManagementItemId')[0],
						form = panel.down('#viewmailformItemId'),
						emailAttachmentInfoGrid = panel.down('#EmailAttachmentInfoGriditemId');
					
					Helper.showHideEmailBodySubjectFields(form, currentRecord);
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
					
					emailAttachmentInfoGrid.trackingId = id;
					emailAttachmentInfoGrid.status = currentRecord.get('status');
					emailAttachmentInfoGrid.bindStore(store); //Bind Store to viewmail grid
					
					panel.getLayout().setActiveItem(1);
					me.runTime.setActiveGrid(emailAttachmentInfoGrid);
					callout.destroy();
				},
				cancelMail:function(){
					var currentRecord = e.record,
						id = currentRecord.get('id'),
						win = Ext.create('AOC.view.email.CancelEmailWindow');
						
					callout.destroy();
					win.show();
					me.runTime.setOrderEmailQueueId(id);
					me.runTime.setOrderEmailQueueStatus(currentRecord.get('Status'));
				},
				viewOrder: function(cmp) {
					var currentRecord = e.record,
						id = currentRecord.id;
					
					AOC.app.fireEvent('changemainview','orderqueueview', id);
					callout.destroy();
				},
				assignCSR:function(){
					currentRecord = e.record;
					var id = currentRecord.get('id'),
						assignCsrWin  = Ext.create('AOC.view.taskmanager.AssignCSRWindow',{
						callback:function(rec){
							var emailPanel = Ext.ComponentQuery.query('#emailManagementItemId')[0],
								emailGrid = emailPanel.queryById('emailManagementGrid');
							
							assignCsrWin.mask(AOCLit.pleaseWaitTitle);
		    		    	Ext.Ajax.request({
		    		    		method:'GET',
		    		    		url: applicationContext+'/rest/emailqueue/assigncsr/'+rec.recordId+'/'+rec.assignCSRId,
		    		    		params:{
		    		    			userId: AOCRuntime.getUser().id
		    		    		},
		    				    success : function(response, opts) {
		    				    	assignCsrWin.unmask();
	    					  		Helper.showToast('Success','CSR assigned successfully');
	    					  		assignCsrWin.close();
	    					  		emailGrid.store.load();
	    				        },
	    				        failure: function(response, opts) {
	    				        	assignCsrWin.unmask();
								}
							});
						},
						recordId:id,
						siteId:currentRecord.get('siteId')
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
			callout.relativeOffsets = [75, -5];
		}else{
			callout.calloutArrowLocation='top-left'; 
			callout.relativePosition='t-b';
			callout.relativeOffsets = [75, 5];
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
			'<div style="width: 180px !important; {[this.getViewMailMenuItemStyle(values)]}" class="user-profile-menu-callout {[this.getViewMailEnableDisableClass(values)]}" event="viewMail"">View Mail</div>',
            '<div style="width: 180px !important;{[this.getViewOrderMenuItemStyle(values)]}" class="user-profile-menu-callout {[this.getViewOrderEnableDisableClass(values)]}" event="viewOrder"> View Order </div>',
            '<div style="width: 180px !important;border-bottom: none !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="assignCSR"">Assign CSR</div>',
        	'<div style="width: 180px !important;border-bottom: none{[this.getMoveToTaskManagerMenuItemStyle(values)]}" class="user-profile-menu-callout {[this.getMoveToTaskManagerEnableDisableClass(values)]}" event="cancelMail"> Move To Task Manager</div>',
        	{
        		compiled:true,
        		getViewMailMenuItemStyle:function(value){
        			if(Helper.isEmailQueueViewMailEnabled(value.status)){
        				return Helper.getEnableMenuItemStyle();
        			}
        			return Helper.getDisableMenuItemStyle();
        		},
        		getViewOrderMenuItemStyle:function(value){
        			if(Helper.isEmailQueueViewOrderEnabled(value.status,value.orderQueueCount)){
        				return Helper.getEnableMenuItemStyle();
        			}
        			return Helper.getDisableMenuItemStyle();
        		},
        		getMoveToTaskManagerMenuItemStyle:function(value){
        			if(Helper.isEmailQueueMoveToTaskManagerEnabled(value.status)){
        				return Helper.getEnableMenuItemStyle();
        			}
        			return Helper.getDisableMenuItemStyle();
        		},
        		getViewMailEnableDisableClass:function(value){
        			if(Helper.isEmailQueueViewMailEnabled(value.status)){
        				return 'user-profile-menu-item';
        			}
        			return 'order-profile-menu-item';
        		},
        		getViewOrderEnableDisableClass:function(value){
        			if(Helper.isEmailQueueViewOrderEnabled(value.status,value.orderQueueCount)){
        				return 'user-profile-menu-item';
        			}
        			return 'order-profile-menu-item';
        		},
        		getMoveToTaskManagerEnableDisableClass:function(value){
        			if(Helper.isEmailQueueMoveToTaskManagerEnabled(value.status)){
        				return 'user-profile-menu-item';
        			}
        			return 'order-profile-menu-item';
        		}
        	}
        );
    },
    getQuickSearchResults: function(cmp) {
    	var view = this.getView(),
        value = cmp.getValue();
        Helper.quickSearch(view,{id: value}),
        cmp.orderedTriggers[0].show();
    },
    getSearchResults: function(cmp, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.getQuickSearchResults(cmp);
        }
    },
    getAdvancedSearchResults: function(cmp, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onSearchBtnClicked();
        }
    },
    clearSearchResults: function(cmp) {
        var grid = this.getView();
        var store = grid.store;
        store.clearFilter();
        store.loadPage(1);
        cmp.setValue('');
        cmp.orderedTriggers[0].hide();
    },
    clearAdvancedSearch:function(btn){
        var grid = this.getView();
        var store = grid.store;
        store.clearFilter();
        store.loadPage(1);
        btn.hide();
    },
    
    openAdvancedSearchWindow:function(){
    	var advanceSearchWin = Ext.create('AOC.view.advsearch.EmailQueueAdvanceSearch',{contextGrid:this.getView()});
    	if(!advanceSearchWin.isVisible()){
    		advanceSearchWin.show();
    	}
    },
    onSearchBtnClicked:function(btn){
  	  var view = this.getView(),
  	  	  refs = view.getReferences(),
  	  	  form = refs.emailQueueAdvanceSearchForm.getForm(),
  	  	  values = form.getValues();
  	  
      values.datecriteriavalue = 'receivedDate';
  	  store = view.contextGrid.store;
      Helper.advancedSearch(view, values);
    }
});