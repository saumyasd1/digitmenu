Ext.define('AOC.store.Sections', {
    extend : 'Ext.data.ArrayStore',
    model  : 'AOC.model.Section',
    data   : [
              ['home.png','HOME','homewrapper',true,0],
              ['orders.png','ORDER QUEUE','orderqueueview',false,10],
              ['partners.png','PARTNERS','partnermanagement',false,3],
              ['contacts.png','ADDRESS MANAGE','addressmanage',false,5],
              ['webform.png','WEB FORM','weborderview',false,0],
              ['archives.png','ARCHIVE','archivemanage',false,3]
    ]
});