// Generated by typings
// Source: https://raw.githubusercontent.com/aurelia/templating-binding/master/dist/aurelia-templating-binding.d.ts
declare module 'aurelia-templating-binding' {
import * as LogManager from 'aurelia-logging';
import {
  camelCase,
  SVGAnalyzer,
  bindingMode,
  connectable,
  enqueueBindingConnect,
  Parser,
  ObserverLocator,
  EventManager,
  ListenerExpression,
  BindingExpression,
  CallExpression,
  NameExpression
} from 'aurelia-binding';
import {
  BehaviorInstruction,
  BindingLanguage
} from 'aurelia-templating';
export class AttributeMap {
  static inject: any;
  elements: any;
  allElements: any;
  constructor(svg?: any);
  
  /**
     * Maps a specific HTML element attribute to a javascript property.
     */
  register(elementName?: any, attributeName?: any, propertyName?: any): any;
  
  /**
     * Maps an HTML attribute to a javascript property.
     */
  registerUniversal(attributeName?: any, propertyName?: any): any;
  
  /**
     * Returns the javascript property name for a particlar HTML attribute.
     */
  map(elementName?: any, attributeName?: any): any;
}
export class InterpolationBindingExpression {
  constructor(observerLocator?: any, targetProperty?: any, parts?: any, mode?: any, lookupFunctions?: any, attribute?: any);
  createBinding(target?: any): any;
}
export class InterpolationBinding {
  constructor(observerLocator?: any, parts?: any, target?: any, targetProperty?: any, mode?: any, lookupFunctions?: any);
  interpolate(): any;
  updateOneTimeBindings(): any;
  bind(source?: any): any;
  unbind(): any;
}
export class ChildInterpolationBinding {
  constructor(target?: any, observerLocator?: any, sourceExpression?: any, mode?: any, lookupFunctions?: any, targetProperty?: any, left?: any, right?: any);
  updateTarget(value?: any): any;
  call(): any;
  bind(source?: any): any;
  unbind(): any;
  connect(evaluate?: any): any;
}

/*eslint dot-notation:0*/
export class SyntaxInterpreter {
  static inject: any;
  constructor(parser?: any, observerLocator?: any, eventManager?: any, attributeMap?: any);
  interpret(resources?: any, element?: any, info?: any, existingInstruction?: any, context?: any): any;
  handleUnknownCommand(resources?: any, element?: any, info?: any, existingInstruction?: any, context?: any): any;
  determineDefaultBindingMode(element?: any, attrName?: any, context?: any): any;
  bind(resources?: any, element?: any, info?: any, existingInstruction?: any, context?: any): any;
  trigger(resources?: any, element?: any, info?: any): any;
  delegate(resources?: any, element?: any, info?: any): any;
  call(resources?: any, element?: any, info?: any, existingInstruction?: any): any;
  options(resources?: any, element?: any, info?: any, existingInstruction?: any, context?: any): any;
  'for'(resources?: any, element?: any, info?: any, existingInstruction?: any): any;
  'two-way'(resources?: any, element?: any, info?: any, existingInstruction?: any): any;
  'one-way'(resources?: any, element?: any, info?: any, existingInstruction?: any): any;
  'one-time'(resources?: any, element?: any, info?: any, existingInstruction?: any): any;
}
export class TemplatingBindingLanguage extends BindingLanguage {
  static inject: any;
  constructor(parser?: any, observerLocator?: any, syntaxInterpreter?: any, attributeMap?: any);
  inspectAttribute(resources?: any, elementName?: any, attrName?: any, attrValue?: any): any;
  createAttributeInstruction(resources?: any, element?: any, theInfo?: any, existingInstruction?: any, context?: any): any;
  inspectTextContent(resources?: any, value?: any): any;
  parseInterpolation(resources?: any, value?: any): any;
}
export function configure(config?: any): any;
}
