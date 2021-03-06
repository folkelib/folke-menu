"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var MenuButton = /** @class */ (function () {
    function MenuButton(title, action, order, visible, component, selected) {
        if (order === void 0) { order = 0; }
        if (visible === void 0) { visible = ko.observable(true); }
        if (component === void 0) { component = 'folke-menu-button'; }
        if (selected === void 0) { selected = function () { return false; }; }
        this.title = title;
        this.action = action;
        this.order = order;
        this.visible = visible;
        this.component = component;
        this.selected = selected;
    }
    return MenuButton;
}());
exports.MenuButton = MenuButton;
var MenuRouteButton = /** @class */ (function () {
    function MenuRouteButton(title, route, order, visible, component, selected) {
        if (order === void 0) { order = 0; }
        if (visible === void 0) { visible = ko.observable(true); }
        if (component === void 0) { component = 'folke-menu-route-button'; }
        if (selected === void 0) { selected = function () { return false; }; }
        this.title = title;
        this.route = route;
        this.order = order;
        this.visible = visible;
        this.component = component;
        this.selected = selected;
    }
    return MenuRouteButton;
}());
exports.MenuRouteButton = MenuRouteButton;
var Menu = /** @class */ (function () {
    function Menu(title) {
        var _this = this;
        this.title = title;
        this.collapsed = ko.observable(true);
        this.action = function () { return _this.collapsed(!_this.collapsed()); };
        this.menu = ko.observableArray();
    }
    Menu.prototype.addItem = function (menuItem) {
        var m = this.menu();
        var i;
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
    };
    Menu.prototype.addRouteButton = function (title, route) {
        this.addItem(new MenuRouteButton(title, route));
        return this;
    };
    Menu.prototype.addButton = function (title, action, order, visible) {
        if (order === void 0) { order = 0; }
        this.addItem(new MenuButton(title, action, order, visible));
        return this;
    };
    Menu.prototype.addCustomSubMenu = function (component, title, order, visible) {
        if (title === void 0) { title = null; }
        if (order === void 0) { order = 0; }
        if (visible === void 0) { visible = ko.observable(true); }
        return this.addItem(new SubMenu(title, order, visible, component));
    };
    Menu.prototype.addSubMenu = function (title, order, visible) {
        if (order === void 0) { order = 0; }
        if (visible === void 0) { visible = ko.observable(true); }
        return this.addItem(new SubMenu(title, order, visible));
    };
    return Menu;
}());
exports.Menu = Menu;
var SubMenu = /** @class */ (function (_super) {
    __extends(SubMenu, _super);
    function SubMenu(title, order, visible, component) {
        if (order === void 0) { order = 0; }
        if (visible === void 0) { visible = ko.observable(true); }
        if (component === void 0) { component = 'folke-submenu'; }
        var _this = _super.call(this, title) || this;
        _this.order = order;
        _this.visible = visible;
        _this.component = component;
        return _this;
    }
    return SubMenu;
}(Menu));
exports.SubMenu = SubMenu;
