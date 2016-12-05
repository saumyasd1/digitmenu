Ext.define('AOC.store.Sections', {
    extend : 'Ext.data.ArrayStore',
    requires:['AOC.model.Section'],
    model  : 'AOC.model.Section',
    data   : [
              ['home.png','HOME','homewrapper',true,0],
              ['orders.png','ORDER QUEUE','orderqueueview',false,0],
              ['mail.png','EMAIL QUEUE','emailmanagement',false,0],
              ['webform.png','WEB ORDER','weborderview',false,0],
              ['partners.png','PARTNERS','partnermanagement',false,0],
              ['contacts.png','ADDRESS','addressmanage',false,0],
              ['archives.png','ARCHIVE','archivemanage',false,0]
    ]
});