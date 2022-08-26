const itm = require('./Catalog.json')

module.exports =
{
  getPath: (id) => {
    //console.log('getPath');
    //console.log(id);

    var tale
    var pathArr = []

    itm.catalog.forEach(element => {
      //    console.log(element.label)
      if (element.items) {
        if (element.items.find(x => x.id === id)) {
          tale = element.items.find(x => x.id === id)
          //console.log(tale)
        }
      }
      
      if (element.id === id)
      {tale=element}
      
    })


    if(itm.catalog.find(x => x.id === id))
    {
      tale=itm.catalog.find(x => x.id === id)
    }

    //console.log(element));

    var path 
    var parentId 
    path =''

    if (tale)
    {path = tale.label
      parentId = tale.parentId
      pathArr.push({ id: tale.id, label: tale.label })
    }

    
   
    var parent

    const getParent = (parentId) => {

      const parent = itm.catalog.find(x => x.id === parentId);

      return {
        id: parent.id,
        label: parent.label,
        parentId: parent.parentId
      }
    }

    while (parentId !== null) {
      parent = getParent(parentId)
      parentId = parent.parentId
      //Use unshift, which modifies the existing array by adding the arguments to the beginning: 
      pathArr.unshift({ id: parent.id, label: parent.label })
      path = parent.label + '/' + path
    }
    path = '/' + path




    //console.log(path);

    return {
      path: path,
      pathArr: pathArr

    }
  },

  getChildItems: (id) => {
      // /  id=14
    var arr = []
    arr.push(id)
    if(itm.catalog.find(x => x.id === id)){
    var e = itm.catalog.find(x => x.id === id)
    if (e.hasOwnProperty('items')) {
      e.items.forEach(i=>{arr.push(i.id)})
    }
  }
    const
    getChildren = id => (relations[id] || []).flatMap(o => [o, ...getChildren(o.id)]),
    data = itm.catalog,
    relations = data.reduce((r, o) => {
        (r[o.parentId] ??= []).push(o);
        return r;
    }, {});
    
    const children=getChildren(id)
    console.log(children); 


 
    
    children.forEach(e => {

     arr.push(e.id)
      if (e.items) {
        e.items.forEach(i=>{arr.push(i.id)})
      }

    })

  


  //  console.log(arr); 


    return arr
  }

  //console.log(getPath(17));
}
