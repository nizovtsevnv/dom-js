var Dom = function(root){
  var CLASSES = 'classes',
      ELEMENTS = 'elements',
      THIS = this,
      VALUES = 'values',
      list = [ document ],
      type = 'elements'

  var isIn = function(object, value){
    return object.indexOf(value) > -1
  }
  
  var propertyOf = function(element){
    return element.hasOwnProperty('value') ? 'value' : 'innerHTML'
  }

  var valueOf = function(element){
    return element[propertyOf(element)]
  }
  
  // Select by CSS class
  /*THIS.css = function(value){
    var elements, i, j, result = []
    for(i = 0; i < list.length; i++){
      elements = list[i].getElementsByTagName('*')
      for(j = 0; j < elements.length; j++){
        if(elements[j].hasOwnProperty('className') && isIn(elements[j].className, value) && !isIn(result, elements[j])){
          result.push(elements[j])
        }
      }
    }
    list = result
    return THIS
  }*/

  // Select by ID
  /*THIS.id = function(value){
    list = [ document.getElementById(value) ]
    return THIS
  }*/

  // Select by NAME attribute
  /*THIS.name = function(value){
    list = document.getElementsByName(value)
    return THIS
  }*/
  
  // Select by CSS selector
  THIS.select = function(value){
    var elements, i, j, result = []
    for(i = 0; i < list.length; i++){
      elements = list[i].querySelectorAll(value)
      for(j = 0; j < elements.length; j++){
        if(!isIn(result, elements[j])){
          result.push(elements[j])
        }
      }
    }
    list = result
    return THIS
  }
  
  // Select by TAG name
  /*THIS.tag = function(value){
    var elements, i, j, result = []
    for(i = 0; i < list.length; i++){
      elements = list[i].getElementsByTagName(value)
      for(j = 0; j < elements.length; j++){
        if(!isIn(result, elements[j])){
          result.push(elements[j])
        }
      }
    }
    list = result
    return THIS
  }*/

  // Change activity mode
  THIS.on = function(value){
    if(isIn([CLASSES, ELEMENTS, VALUES], value)){ type = value }
    return THIS
  }

  // Return array of elements or classes, or values
  THIS.all = function(){
    var data = [], i, j, value
    switch(type){
    case CLASSES:
      for(i in list){
        for(j = 0; j < list[i].classList.length; j++){
          value = list[i].classList[j]
          if(!isIn(data, value)){ data.push(value) }
        }
      }
      break
    case ELEMENTS:
      data = list
      break
    case VALUES:
      for(i in list){
        value = valueOf(list[i])
        if(!isIn(data, value)){ data.push(value) }
      }
      break
    }
    return data
  }

  // Return a count of all selected DOM-elements
  THIS.count = function(){
    return list.length
  }
  
  // Return the first element
  THIS.first = function(){
    return THIS.only(0)
  }
  
  // Return the last element
  THIS.last = function(){
    return THIS.only(list.length - 1)
  }

  // Return an item from a list of DOM-elements or list of CSS classes of that, or a content
  THIS.only = function(key){
    var value = list[key]
    switch(type){
    case CLASSES:
      value = value.classList
      break
    case VALUES:
      value = valueOf(value)
      break
    }
    return value
  }

  // Add a child element or CSS class, or a content to all selected DOM-elements
  THIS.add = function(value){
    for(var i in list){
      switch(type){
      case CLASSES:
        list[i].classList.add(value)
        break
      case ELEMENTS:
        list[i].appendChild(value)
        break
      case VALUES:
        list[i][propertyOf(list[i])] += value
        break
      }
    }
    return THIS
  }

  // Remove chosen element or CSS class, or a content of chosen DOM-element
  THIS.remove = function(key){
    var i, j
    switch(type){
    case CLASSES:
      if(isIn(list, key)){
        list[key].className = ''
      }else{
        for(var i in list){ list[i].classList.remove(key) }
      }
      break
    case ELEMENTS:
      if(list[key] != undefined){
        if(typeof(list[key].remove) == 'function'){ list[key].remove() }
        delete list[key]
      }
      break
    case VALUES:
      list[key][propertyOf(list[i])] = ''
      break
    }
    return THIS
  }
  
  // Remove all selected elements or values, or clear CSS classes
  THIS.removeAll = function(){
    for(var i in list){
      switch(type){
      case CLASSES:
        list[i].className = ''
        break
      case ELEMENTS:
        if(typeof(list[i].remove) == 'function'){ list[i].remove() }
        delete list[i]
        break
      case VALUES:
        list[i][propertyOf(list[i])] = ''
        break
      }
    }
    return THIS
  }

  if(typeof(root) == 'string'){ THIS.select(root) }
  else if(typeof(root.innerHTML) == 'string'){ list = [ root ] }

  return THIS
}
