Ext.define('AOC.util.Helper',{
    singleton : true,
    config : {
        mainContainerTip : null
    },
    constructor : function(config){
	 var ordderColorMap =new Ext.util.HashMap();
	 ordderColorMap.add('Received','#ED2691');
	 ordderColorMap.add('Waiting CS Review','#FFC500');
	 ordderColorMap.add('Waiting System Response','#25B3EE');
	 ordderColorMap.add('Successful','#09CF86');
	 ordderColorMap.add('Failed','#FF0000');
	 this.orderColorMap=ordderColorMap;
    },
  getSwitchButtonHtml: function(event, status, cssClass){
	  var switchBorder='',
	  circlePadding;
	  if('on' == status){
		  circlePadding = '16px';
	  }else{
		  switchBorder = 'style="border:1px solid #bcbcbc;"';
		  circlePadding = '0px';
	  }
   var leftStyle = !Ext.isEmpty(cssClass)?'style="top:1px;"':'';
   cssClass = Ext.isEmpty(cssClass)?'':cssClass;
   var html = '<span class="text-style-switch'+cssClass+'">';
   //#AC-3110 Change the literal for off text.
    html +='<span class="onoff-text'+cssClass+'"><b>'+'InActive'+'</b></span>';
    html +='<div '+leftStyle+' event="'+event+'" class="onoffswitch">';
	html +='<label event="'+event+'"'+switchBorder+'  class="onoffswitch-label">';
	html +='<span event="'+event+'" class="onoffswitch-inner-'+status+'"></span>';
	html +='<span event="'+event+'" style="left:'+circlePadding+';" class="onoffswitch-switch"></span>';
	html +='</label>';
	html+='</div>';
	html +='<span class="on-text'+cssClass+'">'+'<b>Active'+'</b></span>';
    html+='</span>';
   return html;
  },
  getVariableComboStore:function(variableName){
	  var store=Ext.data.StoreManager.lookup(variableName+'Id');
	    if(Ext.isEmpty(store)) {
        	store =  Ext.create('Ext.data.ArrayStore',{
        		storeId:variableName+'Id',
       	   		fields : ['variableFieldName'],
       	   		proxy:{
       	   		    type : 'memory'
       	   		}
             });
	    }
            return store;
  },
  loadVariableComboStore:function(variableName){
	var store=this.getVariableComboStore(variableName);
	if(store.getCount()==0){
	        var response = Ext.Ajax.request({
	            async: false,
	            url: applicationContext+'/rest/orderconfigurations/variable/'+variableName
	        });
	        var items = Ext.decode(response.responseText);
	      	var jsonValue=Ext.decode(response.responseText);
      	var serviceStoreData = [];
      	if(jsonValue.length>0){
      		Ext.Array.forEach(jsonValue,function(item){
    		var service = [item];
    		serviceStoreData.push(service);
    	});
      	    store.loadRawData(serviceStoreData);
      	}
	}
},
  BulkUpdate:function(grid, selection, eOpts){
          if(selection.startCell)
				var store=grid.store;
                  var intialCell=selection.startCell;
                  if(intialCell!=null){
                	  var dataindex=intialCell.column.dataIndex;
                	  var value=intialCell.record.get(dataindex);
                      var initialrowIdx=intialCell.rowIdx;
                      var lastrowIdx=selection.endCell.rowIdx;
                      var start=initialrowIdx,end=lastrowIdx;
                      if(lastrowIdx<initialrowIdx){
                      	start=lastrowIdx-1;
                      	end=initialrowIdx-1;
                      }
                      for(var i=(start+1);i<=end;i++){
                          store.getAt(i).set(dataindex,value);
                      }
                  }
  	},
    getCodeStore:function(type){
	 var store=Ext.data.StoreManager.lookup(type+'id');
		if(Ext.isEmpty(store)){
			store =  Ext.create('Ext.data.ArrayStore',{
			storeId:type+'id',
			fields : ['code','value'],	
		   	proxy:{
		   	type : 'memory'
		   	}
	     });
		}
    return store
    },
loadCodeStore:function(type){
    var store=this.getCodeStore(type);
	if(store.getCount()==0){
	    var appendUrl='';
	    if(type!='code'){
	    	appendUrl='/type/'+type;
	    }
    var response = Ext.Ajax.request({
        async: false,
        url: applicationContext+'/rest/code'+appendUrl
    });
    var items = Ext.decode(response.responseText);
  	var jsonValue=Ext.decode(response.responseText);
	if(jsonValue.ArrayList.length>0){
		Ext.Array.forEach(jsonValue.ArrayList,function(item){
		store.add(item);
	});
	}
}
},
    getOrderLineEditor:function(record,value){
    	var store=record.store;
    	var i=store.find('id',record.id);
    	if(i==0){
        return Ext.create('Ext.grid.CellEditor', {
            field: {
                xtype: 'textfield',
                allowBlank: false
            }
        });
    }else
    	return false;
    },
    createToolTip : function(el,lit,anchor){
        var me     = this;
        return Ext.create('Ext.tip.ToolTip', {
            target : el,
            html   : lit,
            anchor : (anchor) ? anchor : 'top'
        });
    },
    getSatus:function(v){
    	if(v!==''){
	    	var me=this,
	    	store= Ext.data.StoreManager.lookup('codeid') == null ?me.getCodeStore('code') : Ext.data.StoreManager.lookup('codeid'),
	    	statusRecord=store ? store.findRecord( 'code', v) : '',
			va = statusRecord ? statusRecord.get('value') :'';
	    	
	    	if(v==orderReceivedStatus || v==orderPreProcessedStatus || v==salesOrderCreatedStatus || v==salesOrderGeneratedStatus || v==salesOrderSubmittedStatus || v==orderRead || v==booked)
		   {
	    		return '<div><img  src="' + AOC.config.Settings.buttonIcons.tick + '" /><font color=#009966>&nbsp&nbsp&nbsp'+va+'</font></div>';
		   }
			else if(v==waitingForCSRStatus || v==submissionProcessRunningStatus || v==exportingProcessRunningStatus || v==processingOrder)
			{
				 return '<div><img  src="' + AOC.config.Settings.buttonIcons.watch + '" /><font color=#EF4300>&nbsp&nbsp&nbsp'+va+'</font></div>';
			}
			else if( v==cancelStatus)
			{
			 return '<div><img  src="' + AOC.config.Settings.buttonIcons.cancel + '" /><font color=silver>&nbsp&nbsp&nbsp'+va+'</font></div>';
			}
			else
				return '<div><img  src="' + AOC.config.Settings.buttonIcons.error + '" /><font color=red>&nbsp&nbsp&nbsp'+va+'</font</div>';
    	}
    	return '';
    },
    setCookie:function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires;
    },
    getCookie:function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            c = c.charAt(0)==' '?c.substring(1):c;
            if (c.indexOf(name) == 0){
            return c.substring(name.length,c.length);
            }
        }
        return "";
    },
    deleteCookie:function(cname){
    	 var name = cname + "=";
    	document.cookie = name+"; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    },
    sendAjaxRequest : function(url, method,async, bodyData,callerObject,failureFunction,successFnc,failureContent){
    	var data;
        Ext.Ajax.request({
        method: method,
         url: url,
         jsonData : bodyData,
         async : async,
         headers : {
            "Authorization" : "Basic YWRtaW46aW5kaWdvMQ==",
            "Content-Type"  : "application/json"
          },
         success : function(res){
        	var responseText = res.responseText;
        	if(!Ext.isEmpty(successFnc))
        		successFnc(res,callerObject);	
        	if(!Ext.isEmpty(responseText)){
        		data = Ext.decode(responseText);
        	}
        },
        failure : function(res){
        	if(!Ext.isEmpty(failureFunction))
        		callerObject[failureFunction](res,failureContent);
        }
      });
        return data;
     },
     fadeoutMessage : function(parm1,parm2,parm3,param4){        
	    	var el,
	        title,
	        msg,
	        ms,
	        nextStepMsg,
	        zindex,
	        m,
	        slideFrom;
	    	 nextStepMsg = !Ext.isEmpty(param4)?'<br><br>'+param4:'';
	    if (typeof arguments[0] !== "object"){
	        el = document.body;
	        title = parm1;
	        msg = parm2 || '';
	        //AC:3967 - Update fade out duration
	        ms = (!parm3) ? 30000 : parm3;
	        slideFrom = 't';
	    } else {
	        el = parm1.el || document.body;
	        title = parm1.title || '';
	        msg = parm1.msg || '';
	        ms = parm1.ms || 2000;
	        slideFrom = parm1.slideFrom || 't';
	    }
	    var style="";
	    if(!el.msgCt){
	    	 var w = 480,
	    	 h = 60,
	    	 left = Ext.getBody().getViewSize().width,
	    	 l = (left-w)/2;
    		zindex='width:'+w+'px;min-height:'+h+'px;left:'+l+'px;'; 
    		style='style="min-height:'+h+'px;"';
	        el.msgCt = Ext.core.DomHelper.insertFirst(el, {
	            id:'aoc-msg-div',
	            style:zindex
	        }, true);
	        el.msgCt.on({click:function(event,el){
	        	 var event=el.getAttribute('event');
	        	 if(event){
	        		 m.hide();
	        		 m.destroy();
	                 el.msgCt=null;
	        	 }
	        }});
	    } else {
	    	el.msgCt.update('<div '+style+' class="aoc-msg"><div style="width:23px;height:60px;top:5px;float:left;"><img src="avery/resources/images/tick.png" /></div><div style="float:left;word-wrap: break-word;width:91%;">' + msg +nextStepMsg+'</div><div style="float:left;"><img style="cursor:pointer;" event="close" src="avery/resources/images/close-round-alt.png" /></div></div>');
	    	return;
	    }
	    m = Ext.core.DomHelper.append(el.msgCt, '<div '+style+' class="aoc-msg"><div style="width:23px;height:60px;top:5px;float:left;"><img src="avery/resources/images/tick.png" /></div><div style="float:left;word-wrap: break-word;width:91%;">' + msg +nextStepMsg+'</div><div  style="float:left;"><img style="cursor:pointer;" event="close" src="avery/resources/images/close-round-alt.png" /></div></div>', true);
	    m.hide();
	    m.slideIn(slideFrom, {
			easing: 'easeOut',
			duration: 500}).ghost(slideFrom, {
	    	duration: 10,
	        delay: ms,
	        remove: true,
	        callback:function(){
	            el.msgCt.remove();
	            el.msgCt=null;
	        }
	    });
	    },
	    notifyByImage : function(config){
	    	 if(config.isValid())
	    		   config.setFieldStyle('background-image:url('+AOC.config.Settings.buttonIcons.success+');background-repeat:no-repeat;background-position:right;');
				else
				   config.setFieldStyle('background-image:url('+AOC.config.Settings.buttonIcons.invalid_field+');background-repeat:no-repeat;background-position:right;');
	     },
	     hideMandatoryMessage:function(obj){
	    	 obj.down('#messageFieldItemId').setValue('').setVisible(true);
	    	 obj.down('#messageFieldItemId').setHidden('true');
	     },
	     notifyByMessage: function(obj) {
	    	 obj.down('#messageFieldItemId').setValue('').setVisible(true);
	    	 obj.down('#messageFieldItemId').setHidden('true');
	     }
});
