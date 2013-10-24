var Dom = function(root){

  // Select by CSS class
  this.css = function(value){
    var elements, i, j, result = []
    for(i = 0; i < list.length; i++){
      elements = list[i].getElementsByTagName('*')
      for(j = 0; j < elements.length; j++){
        if(elements[j].hasOwnProperty('className') && elements[j].className.indexOf(value) > -1 && result.indexOf(elements[j]) == -1){
          result.push(elements[j])
        }
      }
    }
    list = result
    return this
  }

  // Select by ID
  this.id = function(value){
    list = [ document.getElementById(value) ]
    return this
  },

  // Select by NAME attribute
  this.name = function(value){
    list = document.getElementsByName(value)
    return this
  }
  
  // Select by CSS selector
  this.select = function(value){
    var elements, i, j, result = []
    for(i = 0; i < list.length; i++){
      elements = list[i].querySelectorAll(value)
      for(j = 0; j < elements.length; j++){
        if(result.indexOf(elements[j]) == -1){
          result.push(elements[j])
        }
      }
    }
    list = result
    return this
  }
  
  // Select by TAG name
  this.tag = function(value){
    var elements, i, j, result = []
    for(i = 0; i < list.length; i++){
      elements = list[i].getElementsByTagName(value)
      for(j = 0; j < elements.length; j++){
        if(result.indexOf(elements[j]) == -1){
          result.push(elements[j])
        }
      }
    }
    list = result
    return this
  }

  // Change activity mode to CSS classes of DOM-elements
  this.classes = function(){
    type = 'classes'
    return this
  }

  // Change activity mode to DOM-elements
  this.elements = function(){
    type = 'elements'
    return this
  }

  // Change activity mode to a content of DOM-elements
  this.values = function(){
    type = 'values'
    return this
  }

  // Return array of elements or classes, or values
  this.all = function(){
    var data = [], i, j, value
    switch(type){
    case 'classes':
      for(i in list){
        for(j = 0; j < list[i].classList.length; j++){
          value = list[i].classList[j]
          if(data.indexOf(value) == -1){ data.push(value) }
        }
      }
      break
    case 'elements':
      data = list
      break
    case 'values':
      for(i in list){
        value = valueOf(list[i])
        if(data.indexOf(value) == -1){ data.push(value) }
      }
      break
    }
    return data
  }

  // Return a count of all selected DOM-elements
  this.count = function(){
    return list.length
  }
  
  // Return the first element
  this.first = function(){
    return this.only(0)
  }
  
  // Return the last element
  this.last = function(){
    return this.only(list.length - 1)
  }

  // Return an item from a list of DOM-elements or list of CSS classes of that, or a content
  this.only = function(key){
    var value = list[key]
    switch(type){
    case 'classes':
      value = value.classList
      break
    case 'values':
      value = valueOf(value)
      break
    }
    return value
  }

  // Add a child element or CSS class, or a content to all selected DOM-elements
  this.add = function(value){
    for(var i in list){
      switch(type){
      case 'classes':
        list[i].classList.add(value)
        break
      case 'elements':
        list[i].appendChild(value)
        break
      case 'values':
        list[i][list[i].hasOwnProperty('value') ? 'value' : 'innerHTML'] += value
        break
      }
    }
    return this
  }

  // Remove chosen element or CSS class, or a content of chosen DOM-element
  this.remove = function(key){
    var i, j
    switch(type){
    case 'classes':
      if(list.indexOf(key) >= 0){
        list[key].className = ''
      }else{
        for(var i in list){ list[i].classList.remove(key) }
      }
      break
    case 'elements':
      if(list[key] != undefined){
        if(typeof(list[key].remove) == 'function'){ list[key].remove() }
        delete list[key]
      }
      break
    case 'values':
      list[key][list[key].hasOwnProperty('value') ? 'value' : 'innerHTML'] = ''
      break
    }
    return this
  }
  
  // Remove all selected elements or values, or clear CSS classes
  this.removeAll = function(){
    for(var i in list){
      switch(type){
      case 'classes':
        list[i].className = ''
        break
      case 'elements':
        if(typeof(list[i].remove) == 'function'){ list[i].remove() }
        delete list[i]
        break
      case 'values':
        list[i][list[i].hasOwnProperty('value') ? 'value' : 'innerHTML'] = ''
        break
      }
    }
    return this
  }

  var valueOf = function(element){
    return element[element.hasOwnProperty('value') ? 'value' : 'innerHTML']
  }
    
  var list = [ document ]
  
  var type = 'elements'
  
  if(typeof(root) == 'string'){ this.select(root) }
  else if(typeof(root.innerHTML) == 'string'){ list = [ root ] }

  return this
}
