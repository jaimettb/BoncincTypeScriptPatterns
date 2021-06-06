import { AlienBouncingObject, BouncingObject } from "./BouncingObject.js";
import { Environment } from "./Environment.js";
import { IPhisicObject, NullPhisicObject } from "./PhisicObject.js";
import { IPhisics } from "./Phisics.js";
import { Planet } from "./Planet.js";

//Pattern: Abstract Factory
export interface IEnvironmentFactory {
    CreateBouncingObject(): IPhisicObject;
    CreatePlanet(): IPhisicObject;
}

export class EnvironmentFactory implements IEnvironmentFactory {
    public CreateBouncingObject(): IPhisicObject
    {
        let  element = document.createElement("img");  
        element.setAttribute("src", "images/ball.png");  
        element.setAttribute("class", "ball");
        Environment.container.appendChild(element);

        return new BouncingObject(element);        
    }

    public CreatePlanet(): IPhisicObject{
        return new NullPhisicObject();  
    }
}

export class AlienEnvironmentFactory extends EnvironmentFactory {
    public CreateBouncingObject(): IPhisicObject
    {
        let  element = document.createElement("img");  
        element.setAttribute("src", "images/alienBall.png");  
        element.setAttribute("class", "ball");
        Environment.container.appendChild(element);

        return new AlienBouncingObject(element);        
    }

    public CreatePlanet(): IPhisicObject{
        let  element = document.createElement("img");  
        element.setAttribute("src", "images/planets/Earth.gif");  
        element.setAttribute("class", "planet");
        Environment.container.appendChild(element);

        let planet =  new Planet(element);
        
        let x: number = (Environment.container.offsetWidth - planet.Width)/2;
        let y: number = (Environment.container.offsetHeight - planet.Heigth)/2;
        planet.SetPosition(x, y);

        return planet;
    }
}