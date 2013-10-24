dom.js
======

Simple library for work with DOM-elements.

It can:
- get DOM-elements by a CSS class or a DOM ID, or a name attribute, or a tag name, or a CSS selector
- add/remove selected elements or values of selected elements, or CSS classes
- use chain like
    Dom('#el').classes().add('bold_class').remove('old_class').values().add('Hi all there!')

Syntax
------

    new Dom(css_selector | element).[chainable methods].[get method]

Chainable methods:
* select(string) - select DOM-elements by a CSS string selector

* classes() - switch activity to work with CSS classes
* elements() - switch activity to work with DOM-elements, it's default mode
* values() - switch activity to work with content of DOM-elements

* add(child_element | class_name | string_value) - add a DOM-element as child in every selected DOM-element or add CSS class, or add a content
* remove(element_index | class_name) - remove a DOM-element with some index from the document structure or remove a CSS class from every selected DOM-element
* removeAll() - remove all DOM-elements or clear all CSS classes from all selected DOM-elements, or clear all content

Get methods:
* all() - return an array of DOM-elements or all CSS classes of that elements, or an array of content from every DOM-element
* count() -  return a count of selected DOM-elements
* first() - return first DOM-element or CSS classes of that, or a content of this DOM-element
* last() - return last DOM-element or CSS classes of that, or a content of this DOM-element
* only(element_index) - return a DOM-element with chosen index or CSS classes of that, or a content of this DOM-element

Samples
-------

Return an array of DOM-elements with CSS class "some_class":
    new Dom('.some_class').all()

Return an array of all CSS classes in DOM-elements with CSS class "some_class":
    new Dom('.some_class').classes().all()

Return an array of all contains in DOM-elements with CSS class "some_class":
    new Dom('.some_class').values().all()

Remove all content in DOM-elements with CSS class "some_class" and add there "Hello world!":
    new Dom('.some_class').values().removeAll().add('Hello world!')
