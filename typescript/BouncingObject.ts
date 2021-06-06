import { PhisicObject } from "./PhisicObject.js";

export class BouncingObject extends PhisicObject{
    constructor(element: HTMLElement){
        super(element);
        this.SetDirection(315*Math.random());

        let container = (element.parentElement as HTMLElement);
        let maxWidth = container.offsetWidth - element.offsetWidth;
        let maxHeight = container.offsetHeight - element.offsetHeight;
        this.SetPosition(
            maxWidth * Math.random(),
            maxHeight * Math.random());
    }
}

export class AlienBouncingObject extends BouncingObject {
    constructor(element: HTMLElement){
        super(element);

        let container = this.Element.parentElement as HTMLElement;
        this.X = (container.offsetWidth - element.offsetWidth) * Math.random();
        this.Y = (container.offsetHeight - element.offsetHeight) * Math.random();
        // this.Speed = 3;
        // this.Direction = 360 * Math.random();
        // this.Speed = 2;
        // this.Direction = 100;
    }
}