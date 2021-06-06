export interface IPhisicObject{
    Element: HTMLElement;

    X: number;
    Y: number;
    SpeedX: number;
    SpeedY: number;
    Width: number;
    Heigth: number;
  
    Move(): void;
    SetPosition(x: number, y:number): void;
    SetSpeed(speed:number): void;
    SetDirection(direction:number): void;
}

export abstract class PhisicObject implements IPhisicObject
{
    public Element: HTMLElement;

    public X: number = 0;
    public Y: number = 0;
    SpeedX: number = 0;
    SpeedY: number = 0;
    public Width: number = 10;
    public Heigth: number = 10;
   
    constructor(element: HTMLElement){
        this.Element = element;
        this.SetSize();
    }

    public Move(): void{}

    public SetPosition(x: number, y:number): void{
        this.X = x;
        this.Y = y;

        this.Element.style.left = ""+this.X;
        this.Element.style.top = ""+this.Y;
    }

    public SetSpeed(speed: number): void {
        // if((this.SpeedX == 0 && this.SpeedY == 0) || this.SpeedY == 0){
        //     this.SpeedX = speed;
        //     this.SpeedY = 0;
        // }
        // else if(this.SpeedX == 0){
        //     this.SpeedY = speed;
        // }
        // else{
        //     //calculate proportional speed here
        // }
    }

    public SetDirection(direction: number): void {
        let radians: number = this.DegreesToRadians(direction);
        this.SpeedX = Math.cos(radians) * 3;
        this.SpeedY = - Math.sin(radians) * 3;
    }

    private SetSize(){
        this.Width = this.Element.offsetWidth;
        this.Heigth = this.Element.offsetHeight;
    }

    private DegreesToRadians(degrees: number): number{
        let radians: number = (degrees*Math.PI)/180;
        return radians;
    }
}

export class NullPhisicObject implements IPhisicObject
{
    public Element: HTMLElement = new HTMLElement();
    public X: number = 0;
    public Y: number = 0;
    public SpeedX: number = 0;
    public SpeedY: number = 0;
    public Width: number = 0;
    public Heigth: number = 0;
    public Move(): void{}
    public SetPosition(x: number, y:number){}
    public SetDirection(direction: number): void {}
    public SetSpeed(speed: number): void {}
}