import { Emitter } from "../emitter";
import { ICommand } from "./icommand";
import { BindingDataSource } from "./binding-rule";
import { IValueConverter } from "./ivalue-converter";
import { IValidationRule, ValidationResult } from "./ivalidation-rule";
import { IViewModel, BindingMode } from "./iview-model";
export declare class ViewModelDefault extends Emitter implements IViewModel {
    private _data;
    private _commands;
    private _converters;
    private _validationRules;
    private _ePropChange;
    isCollection: boolean;
    data: any;
    setData(value: any, notify: boolean): IViewModel;
    constructor(data: any);
    bindingMode: BindingMode;
    private _bindingMode;
    onChange(callback: Function): IViewModel;
    offChange(callback: Function): IViewModel;
    notifyChange(type: string, path: string, value: any): void;
    protected fixPath(path: string): string;
    getProp(path: string, converterName?: string): any;
    delProp(path: string): IViewModel;
    setPropEx(source: BindingDataSource, value: any, oldValue?: any): ValidationResult;
    setProp(path: string, v: any, converterName?: string, validationRule?: string): ValidationResult;
    getCommand(name: string): ICommand;
    canExecute(name: string): boolean;
    execCommand(name: string, args: any): boolean;
    registerCommand(name: string, cmd: ICommand): IViewModel;
    unregisterCommand(name: string): IViewModel;
    getValueConverter(name: string): IValueConverter;
    registerValueConverter(name: string, converter: IValueConverter): IViewModel;
    unregisterValueConverter(name: string): IViewModel;
    convert(converterName: string, value: any): any;
    convertBack(converterName: string, value: any): any;
    getValidationRule(name: string): IValidationRule;
    registerValidationRule(name: string, validationRule: IValidationRule): IViewModel;
    unregisterValidationRule(name: string): IViewModel;
    isValueValid(ruleName: string, value: any): ValidationResult;
}
