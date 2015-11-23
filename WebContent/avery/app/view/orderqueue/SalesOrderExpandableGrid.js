Ext.create('Ext.data.Store', {
    storeId:'orderstore',
    fields:['Division','Order Source','SOLD TO RBO Number',' Oracle Bill to Site Number','Oracle Ship to Site Number',' Shipping method','Customer PO Number','Retailer po/Customer job',' Oracle Item Number','Customer Item Number','Item Description','Orderded Qty','Date Ordered','Request date','promise date','Freight term','CSR','packing instruction','Shipping instruction','Invoice line instruction',' Division for Interface ERP ORG',' Bill to contact','Bill to tel','Bill to FAX','Bill to EMAIL','Ship to contact','Ship to tel',' Ship to FAX','Ship to EMAIL','Artwork hold','Artwork for Reference','Variable data Breakdown','Manu. Note','Order type','Order by','End customer','Shipping only note','Bank charge','Freight charge','Shipping hold','Production hold','Split ship set by','Agreement','Model serial Number','Waive MOQ','APO type'],
    data:{'items':[{
        "Division": "POHK",
        "OrderSource": "ADEPTIA",
        "SOLDTORBONumber": "33529",
        "OracleBilltoSiteNumber": "123456",
        "OracleShiptoSiteNumber": "23456",
        "Shippingmethod": "SF EXPRESS",
        "CustomerPONumber": "1034460",
        "Retailerpo/Customerjob": "123",
        "OracleItemNumber": "CB84364",
        "CustomerItemNumber": "NUT-PFL1",
        "ItemDescription": "Lindex Price Sticker",
        "OrderdedQty": "2100",
        "DateOrdered": "20151008",
        "Requestdate": "20151008",
        "promisedate": "20151018",
        "Freightterm": "COLLECT",
        "CSR": "YVONNELEUNG",
        "packinginstruction": "Add Packing List,Pls Mark Gross & Net weight on P/L,S#SO-_3___PCS/SKU",
        "Shippinginstruction": "SHIP TO address in chinese pls find the ship only notes",
        "Invoicelineinstruction": "Style # is 12",
        "DivisionforInterfaceERPORG": "PYT",
        "Billtocontact": "SAM CHU",
        "Billtotel": "85298999999",
        "BilltoFAX": "85298999999",
        "BilltoEMAIL": "SAMCHU@NINGBO.COM",
        "Shiptocontact": "MARY CHAN",
        "Shiptotel": "85298999999",
        "ShiptoFAX": "85298999999",
        "ShiptoEMAIL": "MARYCHAN@NINGBO.COM",
        "Artworkhold": "Y",
        "ArtworkforReference": "Y",
        "VariabledataBreakdown": "Size M",
        "ManuNote": "Produce Urgently",
        "Ordertype": "PYT 24H",
        "Orderby": "Miss Chang",
        "Endcustomer": "COO CAMBODIA",
        "Shippingonlynote": "Ship with other goods",
        "Bankcharge": "10",
        "Freightcharge": "90",
        "Shippinghold": "Y",
        "Productionhold": "Y",
        "Splitshipsetby": "P",
        "Agreement": "PY123343:00",
        "ModelserialNumber": "123456",
        "WaiveMOQ": "Y",
        "APOtype": "APO",
        "variableData": [
            {
                "Level": "Item",
                "SKUNumber": "1128182",
                "TypeSetterCode": "98",
                "VariableFieldName": "Style",
                "VariableFieldValue": "Western",
                "FiberContentName": ""
            },
            {
                "Level": "SKU",
                "SKUNumber": "1128182",
                "TypeSetterCode": "67",
                "VariableFieldName": "Size",
                "VariableFieldValue": "S",
                "FiberContentName": ""
            },
            {
                "Level": "SKU",
                "SKUNumber": "1128182",
                "TypeSetterCode": "90",
                "VariableFieldName": "Color",
                "VariableFieldValue": "Red",
                "FiberContentName": ""
            },
            {
                "Level": "Fiber",
                "SKUNumber": "1128182",
                "TypeSetterCode": "98",
                "VariableFieldName": "FiberContent1",
                "VariableFieldValue": "70",
                "FiberContentName": "CO"
            },
            {
                "Level": "Fiber",
                "SKUNumber": "1128182",
                "TypeSetterCode": "45",
                "VariableFieldName": "FiberContent2",
                "VariableFieldValue": "30",
                "FiberContentName": "POL"
            }
        ]
    }]},proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
Ext.define('AOC.view.orderqueue.SalesOrderExpandableGrid',{
	extend:'Ext.grid.Panel',
	xtype:'salesrrderexpandablegrid',
	requires:['Ext.grid.Panel','AOC.ux.RowExpanderGrid'],
	controller:'salesorder',
    autoHeight:true,
    columnLines:true,
    store: Ext.data.StoreManager.lookup('orderstore'),
    columns: [
       { text: 'Division',  dataIndex: 'Division',editor:'textfield' },
{ text: 'OrderSource', dataIndex: 'OrderSource', editor:'textfield' },
{ text: 'SOLD TO RBO Number', dataIndex: 'SOLDTORBONumber',editor:'textfield' },
{ text: 'Oracle Bill to Site Number', dataIndex: 'OracleBilltoSiteNumber',editor:'textfield' },
{ text: 'Oracle Ship to Site Number', dataIndex: 'OracleShiptoSiteNumber',editor:'textfield' },
{ text: 'Shipping method', dataIndex: 'Shippingmethod',editor:{xtype:'combo',store:[['ACS','ACS'],['ADP GLOBAL EXPRESS','ADP GLOBAL EXPRESS'],['AIRTRANS LOG - BY AIR','AIRTRANS LOG - BY AIR'],['A-LINK','A-LINK']]} },
{ text: 'Customer PO Number', dataIndex: 'CustomerPONumber',editor:'textfield' },
{ text: 'Retailer poCustomer job', dataIndex: 'RetailerpoCustomerjob',editor:'textfield' },
{ text: 'Oracle Item Number', dataIndex: 'OracleItemNumber',editor:'textfield' },
{ text: 'Customer Item Number', dataIndex: 'CustomerItemNumber',editor:'textfield' },
{ text: 'Item Description', dataIndex: 'ItemDescription',editor:'textfield' },
{ text: 'Orderded Qty', dataIndex: 'OrderdedQty',editor:'textfield' },
{ text: 'Date Ordered', dataIndex: 'DateOrdered',editor:'textfield' },
{ text: 'Request date', dataIndex: 'Requestdate',editor:'textfield' },
{ text: 'promise date', dataIndex: 'promisedate',editor:'textfield' },
{ text: 'Freight term', dataIndex: 'Freightterm',editor:'textfield' },
{ text: 'CSR', dataIndex: 'CSR',editor:'textfield' },
{ text: 'packing instruction', dataIndex: 'packinginstruction',editor:'textfield' },
{ text: 'Shipping instruction', dataIndex: 'Shippinginstruction',editor:'textfield' },
{ text: 'Invoice line instruction', dataIndex: 'Invoicelineinstruction',editor:'textfield' },
{ text: 'Division for Interface ERP ORG', dataIndex: 'DivisionforInterfaceERPORG',editor:'textfield' },
{ text: 'Bill to contact', dataIndex: 'Billtocontact',editor:'textfield' },
{ text: 'Bill to tel', dataIndex: 'Billtotel',editor:'textfield' },
{ text: 'Bill to EMAIL', dataIndex: 'BilltoEMAIL',editor:'textfield' },
{ text: 'Ship to contact', dataIndex: 'Ship to contact',editor:'textfield' },
{ text: 'Ship to tel', dataIndex: 'Shiptotel',editor:'textfield' },
{ text: 'Ship to FAX', dataIndex: 'ShiptoFAX',editor:'textfield' },
{ text: 'Ship to EMAIL', dataIndex: 'Ship to EMAIL',editor:'textfield' },
{ text: 'Artwork hold', dataIndex: 'Artwork hold',editor:'checkbox' },
{ text: 'Artwork work attachment', dataIndex: 'Artwork for Reference',editor:'checkbox' },
{ text: 'Variable data Breakdown', dataIndex: 'Variable data Breakdown',editor:'textfield' },
{ text: 'Manu. Note', dataIndex: 'ManuNote',editor:'textfield' },
{ text: 'Order type', dataIndex: 'Ordertype',editor:'textfield' },
{ text: 'Order by', dataIndex: 'Orderby',editor:'textfield' },
{ text: 'End customer', dataIndex: 'Endcustomer',editor:'textfield' },
{ text: 'Shipping only note', dataIndex: 'Shippingonlynote',editor:'textfield' },
{ text: 'Bank charge', dataIndex: 'Bankcharge',editor:'textfield' },
{ text: 'Freight charge', dataIndex: 'Freightcharge',editor:'textfield' },
{ text: 'Shipping hold', dataIndex: 'Shippinghold',editor:'checkbox' },
{ text: 'Production hold', dataIndex: 'Productionhold',editor:'checkbox' },
{ text: 'Split ship set by', dataIndex: 'Splitshipsetby',editor:'textfield' },
{ text: 'Agreement', dataIndex: 'Agreement',editor:'textfield' },
{ text: 'Model serial Number', dataIndex: 'ModelserialNumber',editor:'textfield' },
{ text: 'Waive MOQ', dataIndex: 'WaiveMOQ',editor:'checkbox' },
{ text: 'APO type', dataIndex: 'APOtype',editor:'textfield' }
    ],
    plugins:[{
		ptype:'rowexpandergrid',
		requires:['AOC.model.VariableHeaderModel'],
		gridConfig:{
			nestedGridRefrence:'variableData',
    		//store:'nestedStore1', 
			modal:'AOC.model.VariableHeaderModel',
            columns: [
                {xtype: 'rownumberer'},
                { text: 'Level', dataIndex: "Level" ,width:100},
                { text: "SKU Number", dataIndex: 'SKUNumber',width:100},
                { text: "TypeSetterCode", dataIndex: 'TypeSetterCode' ,width:130},	
                { text: "Variable Field Name", dataIndex: 'VariableFieldName' ,width:140},
                { text: "Variable Field Value", dataIndex: 'VariableFieldValue' ,width:140},
                { text: "Fiber Content Percentage", dataIndex: 'FiberContentPercentage' ,width:155}
            ],
            columnLines: false,
            border:true,
            plugins:['rowediting'],
            width:790,
            autoHeight: true,
            frame: false,
            header:false
		}
    }
            ],
            tbar: { 
    			height: 50,
    		    items : 
    		    	[
					 {
			              icon: BackIcon, //back button functionality added
						  text:backText,
						  handler:'backButton'
			         },
			         {
		                	xtype :'tbspacer',
		                	width :30
		        	 },
			         {
			        	 xtype: 'radiogroup',
			             items: [
			                 { boxLabel: 'Sales Order Update', name: 'rb', inputValue: '1' , checked: true},
			                 {
			                 	xtype :'tbspacer',
			                 	width :15
			         		 },
			                 { boxLabel: 'Variable Order Update', name: 'rb', inputValue: '2'}
			             ],
			             listeners:{
			            	 change:'radioButtonClick'
			             }
			         },
			         {
		                	xtype :'tbspacer',
		                	width :30
		        	 },
			         {
			              xtype: 'button',
						  text:'<b>Submit</b>',
						  handler:'getUpdateScreen'
			         },
					 ]
}
});