import { Boundaries } from "./DTO/Boundries";
import { IPhisicObject } from "./PhisicObject";

export interface IPhisics{
    AddObject(phisicObject: IPhisicObject): void;
    Run(boundaries: Boundaries): void;
}

export class Phisics implements IPhisics {
    //Assumptions (need to confirm/adjust)

    //Every time tick runs phisic mecanism
    //Every run = 1 second
    
    //Each pixel = 1 meter, this will be the general scale

    private generalGravityForce: number = 0.01;
    private fakeGroundHittingAttriction: number = 0.8;

    private objects: IPhisicObject[] = [];

    public AddObject(phisicObject: IPhisicObject): void{
        this.objects.push(phisicObject);
    }

    public Run(boundaries: Boundaries): void{
        this.objects.forEach((object: IPhisicObject) => {
            let objectState: ObjectState = this.CalculateNewState(object, boundaries);

            object.SpeedY = objectState.SpeedY;
            object.SpeedX = objectState.SpeedX;
            object.SetPosition(object.X+objectState.SpeedX, object.Y+objectState.SpeedY);
        });
    }

    private CalculateNewState(object: IPhisicObject, boundaries: Boundaries): ObjectState{
        let objectState: ObjectState = new ObjectState();
        objectState.SpeedX = object.SpeedX;
        objectState.SpeedY = object.SpeedY
        this.ApplyGeneralGravity(objectState);
        this.CalculateBouncingInCorners(objectState, object, boundaries);

        return objectState;
    }

    private ApplyGeneralGravity(objectState: ObjectState): void{
        objectState.SpeedY += this.generalGravityForce;
    }

    private CalculateBouncingInCorners(objectState: ObjectState, object: IPhisicObject, boundaries: Boundaries){       
        if((object.X+objectState.SpeedX+object.Width >= boundaries.X2 && objectState.SpeedX > 0) ||
        (object.X+objectState.SpeedX <= boundaries.X1 && objectState.SpeedX < 0)){
            objectState.SpeedX = - objectState.SpeedX;
        }

        if((object.Y+objectState.SpeedY+object.Width >= boundaries.Y2 && objectState.SpeedY > 0) ||
            (object.Y+objectState.SpeedY <= boundaries.Y1 && objectState.SpeedY < 0)){
            objectState.SpeedY = - objectState.SpeedY*this.fakeGroundHittingAttriction;
            objectState.SpeedX *= this.fakeGroundHittingAttriction;
        }
    }
}

class ObjectState{
    public SpeedX: number = 0;
    public SpeedY: number = 0;
}