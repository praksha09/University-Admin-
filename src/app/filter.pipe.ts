import { Pipe, PipeTransform } from '@angular/core';
import { from } from 'rxjs/observable/from';

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {

transform(items: any, term: string): any {
  if (!term || !items) return items;

  return FilterPipe.filter(items, term);
}

static filter(items: Array<{ [key: string]: any }>, term: string): Array<{ [key: string]: any }> {

  const toCompare = term.toLowerCase();

  return items.filter(function (item: any) {
    for (let property in item) {
      if (item[property] === null) {
        continue;
      }
      if (item[property].toString().toLowerCase().includes(toCompare)) {
        return true;
      }
    }
    return false;
  });
}
}



@Pipe({
  name:'orderBy',
  pure: false
})

export class OrderPipe implements PipeTransform {
    
    static isString(value: any) {
    return typeof value === 'string' || value instanceof String;
    }

    
     static caseInsensitiveSort(a: any, b: any) {
      if (OrderPipe.isString(a) && OrderPipe.isString(b)) {
        return a.localeCompare(b);
      }
      return OrderPipe.defaultCompare(a, b);
    }
    static defaultCompare(a: any, b: any) {
      if (a === b) {
        return 0;
      }
      if (a == null) {
        return 1;
      }
      if (b == null) {
        return -1;
      }
      return a > b ? 1 : -1;
    }

    transform(value: any | any[], expression?: any, reverse?: boolean, isCaseInsensitive: boolean = false, comparator?: Function): any {
      if (!value) {
        return value;
      }
  
      if(Array.isArray(expression)) {
        const expressions = <any[]>expression;
        let transformResult = value;
  
        expressions.reverse().forEach(splittedExpression => {
          transformResult = this.transform(transformResult, splittedExpression, reverse, isCaseInsensitive, comparator);
        });
  
        return transformResult;
      }
      
      if (Array.isArray(value)) {
        return this.sortArray(value.slice(), expression, reverse, isCaseInsensitive, comparator);
      }
      
      if (typeof value === 'object') {
        return this.transformObject(Object.assign({}, value), expression, reverse, isCaseInsensitive, comparator);
      }
  
      return value;
    }
    static setValue(object: any, value: any, expression: string[]) {
      let i;
      for (i = 0; i < expression.length - 1; i++) {
        object = object[expression[i]];
      }
  
      object[expression[i]] = value;
    }

    static getValue(object: any, expression: string[]) {
      for (let i = 0, n = expression.length; i < n; ++i) {
        const k = expression[i];
        if (!(k in object)) {
          return;
        }
        object = object[k];
      }
  
      return object;
    }

    static parseExpression(expression: string): string[] {
      expression = expression.replace(/\[(\w+)\]/g, '.$1');
      expression = expression.replace(/^\./, '');
      return expression.split('.');
    }
    private sortArray(value: any[], expression?: any, reverse?: boolean, isCaseInsensitive?: boolean, comparator?: Function): any[] {
      const isDeepLink = expression && expression.indexOf('.') !== -1;
  
      if (isDeepLink) {
        expression = OrderPipe.parseExpression(expression);
      }
  
      let compareFn: Function;
      
      if (comparator && typeof comparator === 'function') {
        compareFn = comparator;
      } else {
        compareFn = isCaseInsensitive ? OrderPipe.caseInsensitiveSort : OrderPipe.defaultCompare;
      }
      
      let array: any[] = value.sort((a: any, b: any): number => {
        if (!expression) {
          return compareFn(a, b);
        }
  
        if (!isDeepLink) {
          if (a && b) {
            return compareFn(a[expression], b[expression]);
          }
          return compareFn(a, b);
        }
        
        return compareFn(OrderPipe.getValue(a, expression), OrderPipe.getValue(b, expression));
      });
  
      if (reverse) {
        return array.reverse();
      }
  
      return array;
    }
    private transformObject(value: any | any[], expression?: any, reverse?: boolean, isCaseInsensitive?: boolean, comparator?: Function): any {

      let parsedExpression = OrderPipe.parseExpression(expression);
      let lastPredicate = parsedExpression.pop();
      let oldValue = OrderPipe.getValue(value, parsedExpression);
  
      if (!Array.isArray(oldValue)) {
        parsedExpression.push(lastPredicate);
        lastPredicate = null;
        oldValue = OrderPipe.getValue(value, parsedExpression);
      }
  
      if (!oldValue) {
        return value;
      }
  
      OrderPipe.setValue(value, this.transform(oldValue, lastPredicate, reverse, isCaseInsensitive), parsedExpression);
      return value;
    }
  }

