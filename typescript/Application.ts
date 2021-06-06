import { AlienEnvironment, Environment, IEnvironment } from './Environment.js';
import { AlienEnvironmentFactory, EnvironmentFactory } from './EnvironmentFactory.js';
import { IPhisics, Phisics } from './Phisics.js';

 export class Application{
    environment: IEnvironment;
    phisics: IPhisics;

    constructor(){
        var paraemeter = new  URLSearchParams(window.location.search);
        var environmentId = paraemeter.get('env');

        this.phisics = new Phisics();
        this.environment = this.CreateEnvironment(String(environmentId));       
    }

    //Pattern: Factory method
    private CreateEnvironment(environmentId: string): Environment
    {
        let environmentTypes: any = {
            alien: AlienEnvironment
        };
        
        let resultEnvironment = environmentTypes[environmentId];
        return resultEnvironment?
            new resultEnvironment(new AlienEnvironmentFactory(), this.phisics):
            new Environment(new EnvironmentFactory(), this.phisics);
    }

    Start(){
        this.environment.Start();
    }
 }