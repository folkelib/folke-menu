﻿import * as ko from "knockout";

export interface MenuItem {
    title: KnockoutObservable<string> | null;
    visible: KnockoutObservable< boolean>;
    component: string;
    order: number;
}

export class MenuButton implements MenuItem {
    constructor(public title: KnockoutObservable<string>, public action: () => void, public order = 0, public visible: KnockoutObservable<boolean> = ko.observable(true), public component = 'folke-menu-button', public selected = () => false) {
    }
}

export class MenuRouteButton implements MenuItem {
    constructor(public title: KnockoutObservable<string>, public route: string, public order = 0, public visible: KnockoutObservable<boolean> = ko.observable(true), public component = 'folke-menu-route-button', public selected = () => false) {
    }
}

export class Menu {
    public collapsed = ko.observable(true);
    public action = () => this.collapsed(!this.collapsed());
    public menu: KnockoutObservableArray<MenuItem> = ko.observableArray<MenuItem>();
    
    constructor(public title: KnockoutObservable<string> | null) {
    }

    public addItem<T extends MenuItem>(menuItem: T) {
        const m = this.menu();
        let i;
        for (i = 0; i < m.length; i++) {
            if (m[i].order > menuItem.order) {
                this.menu.splice(i, 0, menuItem);
                break;
            }
        }
        if (i === m.length) {
            this.menu.push(menuItem);
        }
        return menuItem;
    }

    public addRouteButton(title: KnockoutObservable<string>, route: string) {
        this.addItem(new MenuRouteButton(title, route));
        return this;
    }

    public addButton(title: KnockoutObservable<string>, action: () => void, order: number = 0, visible?: KnockoutObservable<boolean>) {
        this.addItem(new MenuButton(title, action, order, visible));
        return this;
    }

    public addCustomSubMenu(component: string, title: KnockoutObservable<string> | null = null, order: number = 0, visible: KnockoutObservable<boolean> = ko.observable(true)) {
        return this.addItem(new SubMenu(title, order, visible, component));
    } 

    public addSubMenu(title: KnockoutObservable<string>, order: number = 0, visible: KnockoutObservable<boolean> = ko.observable(true)) {
        return this.addItem(new SubMenu(title, order, visible));
    } 
}

export class SubMenu extends Menu implements MenuItem {
    constructor(title: KnockoutObservable<string> | null, public order = 0, public visible: KnockoutObservable<boolean> = ko.observable(true), public component = 'folke-submenu') {
        super(title);
    }
}
