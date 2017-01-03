Ext.define('AOC.model.OrderQueueModel',{
    extend: 'Ext.data.Model',
	idProperty:'id',
    fields: [
{
	name : 'TrackingId',
	mapping : 'emailQueueId',
	type: 'string'
},
        {
		name : 'PartnerName',
		mapping : 'partnerName',
		type: 'string'
	}, {
		name : 'RBOName',
		mapping : 'rboName',
		type: 'string'
	},
	{
		name : 'prvOrderQueueID',
		mapping : 'prevOrderQueueId',
		type: 'string'
	},{
		name : 'ProductLineType',
		mapping : 'productLineId',
		type: 'string'
	}, 
	   {
		name: 'productLineType', 
	    mapping:'productLineType',
	    type: 'string'},
	{
		name : 'Status',
		mapping : 'status',
		type: 'string'
	},
	{
		name : 'SenderEmailID',
		mapping : 'senderEmailId',
		type: 'string'
	}, {
		name : 'Subject',
		mapping : 'subject',
		type: 'string'
	}, {
		name : 'subEmailBody',
		mapping : 'subEmailBody',
		type: 'string'
	},
	{
		name : 'emailBody',
		mapping : 'emailBody',
		type: 'string'
	},{
		name : 'receivedDate',
		mapping : 'receivedDate',
		type: 'string'
	}, 
	{
		name : 'submittedDate',
		mapping : 'submittedDate',
		type: 'string'
	},
	{
		name : 'acknowledgementDate',
		mapping : 'feedbackAcknowledgementDate',
		type: 'string'
	},
	{
		name : 'OrderSource',
		mapping : 'orderSource',
		type: 'string'
	}, {
		name : 'ponumber',
		mapping : 'poNumber',
		type: 'string'
	},{
		name : 'SubmittedBy',
		mapping : 'submittedBy',
		type: 'string'
	}, {
		name : 'OrderFile',
		mapping : 'OrderFile'
	}, {
		name : 'Comments',
		mapping : 'comment',
		type: 'string'
	}, {
		name : 'error',
		mapping : 'error',
		type: 'string'
	},{
		name : 'attachmentFileList',
		mapping : 'attachmentFileList'
	},{
		name : 'attachmentPresent',
		mapping : 'attachmentPresent',
		type:'boolean'
	}
	/*{
	    name: 'orderFiles',
	    type: 'string',
	    convert: function( v, record ) {
	    	var attachmentFileList=[];
	    	var OrderFile=[];
	        var order=record.get('varOrderFileAttachment');
	        var length= order.length;
	        var flag=false;
		      for(var i=0;i<length;i++){ 
		    	  var fileContentType=order[i].fileContentType;
		    	  if(fileContentType=='Order'){
		    		  OrderFile.push({fileName:order[i].fileName,id:order[i].id});
		    	  }else{
		    		  attachmentFileList.push({fileName:order[i].fileName,id:order[i].id});
		    		  flag=true;
		    	  }
		      }
	      	 record.set('attachmentPresent',flag);
	      	 record.set('attachmentFileList',attachmentFileList);
	         record.set('OrderFile',OrderFile);
	         record.commit();
	         return true;
	    }
	}*/
    ]
});