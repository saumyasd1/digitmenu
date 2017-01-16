Ext.define('AOC.view.orderqueue.OrderQueueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orderqueue',
    requires: ['AOC.view.orderqueue.SalesOrderExpandableGrid', 
               'AOC.view.advsearch.OrderQueueAdvanceSearch', 
               'AOC.view.orderqueue.OrderLineContainer'],
    runTime: AOC.config.Runtime,
    getOrdersBasedOnSearchParameters: function() {
        var OrderQueueStore = Ext.create('AOC.store.OrderQueueStore', {storeId:'OrderQueueId'});
        var bulkupdategrid = this.getView();
        bulkupdategrid.bindStore(OrderQueueStore);
    },
    init : function(){
	     var me=this;
	 me.menuTpl=me.buildMenuTpl();    
  },
  getReportView:function(obj){
		var win=Ext.create('AOC.view.base.BaseWindow',{
			items:[{
				xtype:'reportform'
			}]
		});
		win.show();
  },
  
  openAdvancedSearchWindow:function(btn){
	  var advanceSearchWin = Ext.create('AOC.view.advsearch.OrderQueueAdvanceSearch',{contextGrid:this.getView()});
	  if(!advanceSearchWin.isVisible()){
		  advanceSearchWin.show();
	  }
  },
  onSearchBtnClicked:function(searchBtn){
	  var view = this.getView(),
	  	  refs = view.getReferences(),
	  	  form = refs.orderQueueAdvanceSearchForm.getForm(),
	  	  values = form.getValues();
	  	  store = view.contextGrid.store;
	  	  
      if (values) {
          store.proxy.setFilterParam('query');
          
          var parameters = Ext.JSON.encode(values);
          
          store.setRemoteFilter(true);
          if (!store.proxy.hasOwnProperty('filterParam')) {
              store.proxy.setFilterParam('query');
          }
          store.proxy.encodeFilters = function(filters) {
              return filters[0].getValue();
          };
          store.filter({
              id: 'query',
              property: 'query',
              value: parameters
          });
          view.contextGrid.lookupReference('clearAdvSearch').show();
      }
      view.close();
  },
    getOrderBasedOnSearchParameters: function(store) {
        var valueObj = this.getView().getForm().getValues(false, true);
        
        var FromDate=this.lookupReference('fromDate').getValue();
	 	var ToDate=this.lookupReference('toDate').getValue();
	 	if(FromDate<=ToDate)
	 		{
        if (!valueObj.hasOwnProperty('datecriteriavalue'))
            valueObj.datecriteriavalue = 'receivedDate';
        var parameters = Ext.JSON.encode(valueObj);
        var grid = this.runTime.getActiveGrid();
    	var archievegrid=Ext.ComponentQuery.query('#orderFileQueueArchiveManageGriditemId')[0];
    	if(archievegrid !=null)
    		{
    		var currentView = Ext.ComponentQuery.query('#archivemanageitemId')[0];
    		var valueObj=(currentView.lookupReference('cmbformArchive')).getForm().getValues(false,true);
			var grid=archievegrid;
    		}
        var store = grid.store;
        store.proxy.setFilterParam('query');
        store.setRemoteFilter(true);
        if (!store.proxy.hasOwnProperty('filterParam')) {
            store.proxy.setFilterParam('query');
        }
        store.proxy.encodeFilters = function(filters) {
            return filters[0].getValue();
        };
        store.filter({
            id: 'query',
            property: 'query',
            value: parameters
        });
        grid.down('#clearadvanedsearch').show();
        this.getView().up('window').hide();
	 		}
	 	else
	 		{
	 	var ordersearch=Ext.ComponentQuery.query('#orderqueueadvancesearchIDWindow')[0];
	 	ordersearch.down('#messageFieldItemId').setValue(AOCLit.setDateMsg).setVisible(true);
	 		}
    },
    clearAdvancedSerach: function(widget) {
    	var temp=Ext.ComponentQuery.query('#orderqueueadvancesearchIDWindow')[0];
    	if(temp){
    	temp.destroy();
    	}
        var grid = this.getView();
        var store = grid.store;
        store.clearFilter();
        widget.setVisible(false);
        var temp = grid.down('#advancesearchbutton');
        if(temp)
        temp.enable();
    },
    clearAdvancedSerach:function(btn){
        var grid = this.getView();
        var store = grid.store;
        store.clearFilter();
        store.loadPage(1);
        btn.hide();
    },
    getQuickSearchResults: function(cmp) {
        var store = this.getView().store;
        var value = cmp.getValue();
        if (value != null && value != '') {
            store.proxy.setFilterParam('query');
            var parameters = '{"PartnerName":"' + value + '"}';
            store.setRemoteFilter(true);
            if (!store.proxy.hasOwnProperty('filterParam')) {
                store.proxy.setFilterParam('query');
            }
            store.proxy.encodeFilters = function(filters) {
                return filters[0].getValue();
            };
            store.filter({
                id: 'query',
                property: 'query',
                value: parameters
            });
        }
        cmp.orderedTriggers[0].show();
    },
    getSearchResults: function(cmp, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.getQuickSearchResults(cmp);
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
    onClickMenu:function(obj,rowIndex,colIndex,item,e,record){
	      var me=this;
	      var callout = Ext.widget('callout', {
	          cls                  : 'white more-menu-item-callout extra',
	          html                 : me.menuTpl.apply(record.data),
	          target               : e.target,
	          calloutArrowLocation : 'top-left',
	          relativePosition     : 't-b',
	          relativeOffsets      : [52,23],
	          dismissDelay         : 0,
	          listeners            : {
            afterrender : me.onAfterRenderEditCallout,
            viewOrders: function(cmp){
               currentRecord = e.record;
        	   var id = currentRecord.get('id');
        	   
               me.runTime.setOrderQueueId(id);
               me.runTime.setOrderQueueActiveRecord(currentRecord);
               me.runTime.setOrderQueueStatus(currentRecord.get('Status'));
               me.runTime.setAllowOrderLineEdit(true);
        	   Ext.getBody().mask('Loading...');
        	   var storeERPORG = Ext.create('Ext.data.Store', {
        		   fields:['id','name'],
                   proxy: {
                       type: 'rest',
                       url: applicationContext + '/rest/org/productline/' + currentRecord.get('productLineId'),
                       reader: {
                           type: 'json',
                           rootProperty: 'data'
                       }
                   }
               });
        	   me.runTime.setStoreERPORG(storeERPORG);
                var owner = me.getView().ownerCt;
                var status=currentRecord.get('Status');
                var store = Ext.create('AOC.store.OrderLineStore', {
                    storeId: 'OrderLineStoreId',
                    proxy: {
                        type: 'rest',
                        url: applicationContext + '/rest/orderLines/order/' + id,
                        reader: {
                            type: 'json',
                            rootProperty: 'orderLine'
                        }
                    }
                });
                me.runTime.setOrderLineCurrenProductLine(currentRecord.get('productLineId'));
                owner.insert({
                    xtype: 'orderlinecontainer',
                    flex: 1,
                    store: store
                });
                
                var orderlinecontainer = owner.down('orderlinecontainer'),
        		grid = orderlinecontainer.down('orderlineexpandablegrid');
                grid.editGrid = true;
                
                validateButton = orderlinecontainer.lookupReference('validateButton'),
                bulkUpdateButton=orderlinecontainer.lookupReference('bulkUpdateButton'),
                salesViewOrderbutton= orderlinecontainer.lookupReference('salesViewOrderbutton'),
                salesOrderbutton=orderlinecontainer.lookupReference('salesOrderbutton'),
                cancelOrderButton=orderlinecontainer.lookupReference('cancelOrderButton'),
                form=orderlinecontainer.lookupReference('form');
                //salesOrderCount = currentRecord.get('salesOrderCount');
                
                var editableFlag = (status == AOCLit.waitingForCSRStatusOrderQueue);
                
                validateButton[editableFlag ? 'enable':'disable']();
                bulkUpdateButton[editableFlag ? 'enable':'disable']();
                salesOrderbutton[editableFlag ? 'enable':'disable']();
                cancelOrderButton[editableFlag ? 'enable':'disable']();
                salesViewOrderbutton[editableFlag ? 'disable':'enable']();
                form[editableFlag ? 'enable':'disable']();
                
                /*if(salesOrderCount!=0){
                	salesViewOrderbutton.enable();
                }*/
                
                owner.getLayout().setActiveItem(1);
                Ext.getBody().unmask();
            	callout.destroy();
            },
            viewSales: function(cmp){
            	  currentRecord = e.record;
            	  var id = currentRecord.get('id');
            	  me.runTime.setOrderQueueId(id);
            	  me.runTime.setOrderQueueActiveRecord(currentRecord);
            	  me.runTime.setOrderQueueStatus(currentRecord.get('Status'));
            	  me.runTime.setAllowOrderLineEdit(true);
                  var bulkUpdate = Ext.ComponentQuery.query('#bulkUpdateItemId')[0];
                      var owner = me.getView().ownerCt;
                      var store = Ext.create('AOC.store.SalesOrderStore', {
                          proxy: {
                              type: 'rest',
                              url: applicationContext + '/rest/salesorders/order/' + id,
                              reader: {
                                  type: 'json',
                                  rootProperty: 'ArrayList'
                              }
                          }
                      });
                      owner.insert({
                          xtype: 'salesrrderexpandablegrid',
                          flex: 1,
                          store: store
                      });
                      owner.getLayout().setActiveItem(1);
            	callout.destroy();
            },
            cancelOrder: function(cmp){
               currentRecord = e.record;
        	   var id = currentRecord.get('id');
        	   me.runTime.setOrderQueueId(id);
        	   me.runTime.setOrderQueueActiveRecord(currentRecord);
        	   me.runTime.setOrderQueueStatus(currentRecord.get('Status'));
        	   me.runTime.setAllowOrderLineEdit(true);
               var bulkUpdate = Ext.ComponentQuery.query('#bulkUpdateItemId')[0];
            	me.getCancelOrderWindow(id);
            	
            },
            reSubmitOrder:function(cmp){
                var rec =e.record;
                var con=AOC.app.getController('MenuController');
                con.selectCard('weborderview');
                con.selectMenuItem('weborderview');
                var weborderview=Ext.ComponentQuery.query('weborderview')[0];
                var weborderform=weborderview.down('#weborderformItemId'),
                attachmentinfoGrid=weborderview.down('#AttachmentInfoGriditemId');
                weborderform.reset();
                attachmentinfoGrid.store.removeAll();
                attachmentinfoGrid.getView().refresh();
                var partnerId =(Ext.isEmpty(rec.get('partnerId')))?"":rec.get('partnerId'),
                productLineId =(Ext.isEmpty(rec.get('productLineId')))?"":rec.get('productLineId'),
                rboId =(Ext.isEmpty(rec.get('rboId')))?"":rec.get('rboId'),
                senderEmailID =(Ext.isEmpty(rec.get('senderEmailId')))?"":rec.get('senderEmailId'),
                subject =(Ext.isEmpty(rec.get('subject')))?"":rec.get('subject'),
                emailBody =(Ext.isEmpty(rec.get('emailBody')))?"":rec.get('emailBody');
                weborderview.down('form').lookupReference('partnerCombo').getStore().load(),
                partnerCombo=weborderform.down('#partnerCombo'),
                rboName=weborderform.down('#rboCombo');
                partnerCombo.setValue(partnerId);
                rboName.setValue(rboId);
                partnerCombo.isChangedForFirstTime=true;
                rboName.isChangedForFirstTime=true;
                weborderform.down('#dataStructureCombo').setValue(productLineId);
                weborderform.down('#email').setValue(senderEmailID);
                weborderform.down('#subject').setValue(subject);
                  var response = Ext.Ajax.request({
      				async: false,
      				url: applicationContext+'/rest/orderattachements/order/'+rec.get('emailQueueId')
      			});
      			var jsonValue=Ext.decode(response.responseText),
      			fileList=jsonValue.viewmail;
                var controller=weborderform.getController(),currentFile=null;
            	 for(var i=0;i<fileList.length;i++){
            		 currentFile=fileList[i];
            		 if(currentFile.fileContentType=='Disregard'){
            			 weborderform.down('#emailBody').setValue(currentFile.filePath);
            		 }else if(currentFile.fileContentType=="Order"){
            			 weborderview.down('#oldOrderFileId').setValue(currentFile.id);
            			 weborderform.down('#orderFileType').setValue(currentFile.fileName);
            			 controller.insertFileInGrid(currentFile.fileName,'Order File Type',false,i+1,currentFile.id,null); 
            		 }
            	     
            	 }
            	weborderview.down('#oldEmailId').setValue(rec.get('emailQueueId'));
            	weborderview.down('#oldOrderId').setValue(rec.get('id'));
            	weborderview.down('#backButtonimage').setVisible(true);
            	weborderview.updateHeaderLabel(AOCLit.fixAndResubmitWebOredr);
            	weborderform.isResubmit=true;
            }
	          } 
	          });
	      callout.show();   
	      var heightAbove = e.getY() - Ext.getBody().getScroll().top,
	        heightBelow = Ext.Element.getViewportHeight() - heightAbove;
	  	    if(heightBelow<(callout.getHeight()+40)){
	  		  callout.calloutArrowLocation='bottom-left'; 
	  		  callout.relativePosition='b-t';
	  		  callout.relativeOffsets = [55, 0];
	  	  }
	  	    else{
	  		  callout.calloutArrowLocation='top-left'; 
	  		  callout.relativePosition='t-b';
	  		callout.relativeOffsets = [55, 5];
	  	  }
	        callout.show();
	  },
	  onAfterRenderEditCallout : function(cmp){
	        var me = this;
	        cmp.el.on({
	            delegate: 'div.user-profile-menu-item',
	            click    : function(e,element){
	                var el    = Ext.get(element),
	                    event = el.getAttribute('event');
	                if (event && !el.hasCls('edit-menu-disabled')){
	                    me.fireEvent(event);
	                    if(cmp)
	                    	cmp.destroy();
	                }
	            }
	        });
	  },
	  buildMenuTpl : function(){
		    var me=this;
		    return Ext.create('Ext.XTemplate',
    			  '<div style="width: 140px !important;{[this.getViewOrderLineStyle(values)]}" class="user-profile-menu-callout {[this.getViewOrderLineEnableDisableClass(values)]}" event="viewOrders">View Order Line</div>',
    			  '<div style="width: 140px !important;{[this.getViewSalesOrderStyle(values)]}" class="user-profile-menu-callout {[this.getViewSalesOrderEnableDisableClass(values)]}" event="viewSales">View Sales Order</div>',
    			  '<div style="width: 140px !important;{[this.getResubmitStyle(values)]}" class="user-profile-menu-callout {[this.getResubmitEnableDisableClass(values)]}" event="reSubmitOrder">ReSubmit Order</div>',
    			  '<div style="width: 140px !important;{[this.getCancelOrderStyle(values)]}" class="user-profile-menu-callout {[this.getCancelOrderEnableDisableClass(values)]}" event="cancelOrder">Cancel Order</div>',
	              {
					isViewOrderBtnEnable:function(status){
						if((status == AOCLit.waitingForCSRStatusOrderQueue) || (status == AOCLit.soGeneratedStatusOrderQueue) 
								 || (status == AOCLit.soSubmittedStatusOrderQueue)
								 	|| (status == AOCLit.bookedStatusOrderQueue)
								 		|| (status == AOCLit.errorStatusOrderQueue)
								 			|| (status == AOCLit.cancelStatusOrderQueue)){
							return true;
						}
						return false;
					},
					isViewSalesOrderBtnEnable:function(status){
						if(status  == AOCLit.soGeneratedStatusOrderQueue 
		    					 || status == AOCLit.soSubmittedStatusOrderQueue
		    					 	|| status == AOCLit.bookedStatusOrderQueue
		    					 		|| status == AOCLit.errorStatusOrderQueue){
							return true;
						}
						return false;
					},
					getViewOrderLineStyle:function(v){
						if(this.isViewOrderBtnEnable(v.Status)){
		    				 return Helper.getEnableMenuItemStyle();
						}
						return Helper.getDisableMenuItemStyle();
					},
					getViewSalesOrderStyle:function(v){
						if(this.isViewSalesOrderBtnEnable(v.Status)){
							return Helper.getEnableMenuItemStyle();
						}
						return Helper.getDisableMenuItemStyle();
					},
					getViewSalesOrderEnableDisableClass:function(v){
						if(this.isViewSalesOrderBtnEnable(v.Status)){
		    				 return 'user-profile-menu-item';
						}
						return 'order-profile-menu-item';
					},
					getResubmitStyle:function(v){
						if(v.Status == AOCLit.cancelStatusOrderQueue){
		    				 return Helper.getEnableMenuItemStyle();
						}
						return Helper.getDisableMenuItemStyle();
					},
					getViewOrderLineEnableDisableClass:function(v){
						if(this.isViewOrderBtnEnable(v.Status)){
		    				 return 'user-profile-menu-item';
						}
						return 'order-profile-menu-item';
					},
					getResubmitEnableDisableClass:function(v){
						if(v.Status == AOCLit.cancelStatusOrderQueue){
		    				 return 'user-profile-menu-item';
						}
						return 'order-profile-menu-item';
					},
					getCancelOrderStyle:function(v){
						if(v.Status == AOCLit.waitingForCSRStatusOrderQueue){
		    				 return Helper.getEnableMenuItemStyle();
						}
						return Helper.getDisableMenuItemStyle();
					},
					getCancelOrderEnableDisableClass:function(v){
						if(v.Status == AOCLit.waitingForCSRStatusOrderQueue){
		    				 return 'user-profile-menu-item';
						}
						return 'order-profile-menu-item';
					}
				}
			);
	},
    getCancelOrderWindow: function(id) {
        var win = Ext.create('AOC.view.orderqueue.CancelOrderWindow');
        win.show();
    },
    notifyByMessage:function()
    {
    	var ordersearch=Ext.ComponentQuery.query('#orderqueueadvancesearchIDWindow')[0];
	 	ordersearch.down('#messageFieldItemId').setValue('').setVisible(true);
	 	ordersearch.down('#messageFieldItemId').setHidden('true');
    },
    backButton:function(){
 	   var panel=Ext.ComponentQuery.query('#emailPanel')[0];
	       var emailManagement=panel.down('#EmailMangementitemId');
	       panel.getLayout().setActiveItem(emailManagement);
	       emailManagement.getView().refresh();
	       emailManagement.getStore().load();
    },
   
    onAttachmentGridCellClick:function(view, td, cellIndex, record, tr, rowIndex, e, eOpts ){
		if(e.target.className=='emailAttachmentLink'){
			this.downLoadFile(record.get('filePath'), record.get('fileName'));
		}
	},
	
	downLoadFile:function(filePath, fileName){
		var form = Ext.create('Ext.form.Panel', { 
			standardSubmit: true,   
			url : applicationContext+'/rest/orderattachements/download/'+filePath +'/'+fileName
		});
		form.submit({
			method : 'GET'
		});
	},
	
	onDownloadAttachmentBtnClick:function(){
		var me = this,
			refs = me.getReferences(),
			gridView = refs.attachmentGrid,
			recordsArray = gridView.getSelectionModel().getSelection(),
			len = recordsArray.length;
		
		if(len > 0){
			var interVal = setInterval(function(){
				if(len >= 0 && recordsArray[len-1]){
					me.downLoadFile(recordsArray[len-1].get('filePath'),recordsArray[len-1].get('fileName'));
					len = len-1;
				}else{
					clearInterval(interVal);
				}
				
			},1000);
		}else{
			Ext.Msg.alert(AOCLit.warningTitle, AOCLit.selectAttachmentFileMsg);
		}
	}
})