import { Boundaries } from "./DTO/Boundries.js";
import { IEnvironmentFactory } from "./EnvironmentFactory.js";
import { IPhisicObject } from "./PhisicObject.js";
import { IPhisics } from "./Phisics.js";

export interface IEnvironment{
    Start(): void;
}

export class Environment implements IEnvironment {
    public static container: HTMLElement = document.getElementById('mainContainer') as HTMLElement;

    protected phisics: IPhisics;
    protected environmentFactory: IEnvironmentFactory;
    protected phisicObjects: IPhisicObject[] = [];
    
    private timer: any;
    private boundaries: Boundaries = new Boundaries();


    constructor(environmentFactory: IEnvironmentFactory, phisics: IPhisics){
        this.phisics = phisics;
        this.environmentFactory = environmentFactory;
        this.SetupEnvironment();
    }

    protected SetupEnvironment(){
        let paraemeter = new  URLSearchParams(window.location.search);
        let ballsCount = Number(paraemeter.get('balls'));
        ballsCount=ballsCount===0?1:ballsCount;
        
        let createBallInterval = 1000;
        let createBallCurrentInterval = 0;
        for(let i=1; i<=ballsCount;i++){
            setTimeout(()=>{
                this.AddNewObject(this.environmentFactory.CreateBouncingObject());
            }, createBallCurrentInterval);

            createBallCurrentInterval += createBallInterval * Math.random();
        }
    }

    Start(){
        this.timer = setInterval(() => {
            this.RefreshBoundaries();
            this.phisics.Run(this.boundaries);
            this.phisicObjects.forEach((object: IPhisicObject) =>
            {
                object.Move();
            });
        }, 0);
    }


    protected AddNewObject(object: IPhisicObject): void{
        this.phisicObjects.push(object);
        this.phisics.AddObject(object);
    }

    private RefreshBoundaries(): void{
        this.boundaries.X1 = 0;
        this.boundaries.Y1 = 0;
        this.boundaries.X2 = Environment.container.offsetWidth;
        this.boundaries.Y2 = Environment.container.offsetHeight;
    }
}

export class AlienEnvironment extends Environment{
    protected SetupEnvironment(){
        this.AddNewObject(this.environmentFactory.CreatePlanet());

        if(Environment.container){
            Environment.container.classList.add("stars-background");
        }

        super.SetupEnvironment();
    }
}