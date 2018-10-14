import {Router,Request,Response,NextFunction} from 'express';
import participate from '../models/Participate'

//const Participatees = require('../data');

class ParticipateRoutes
{
    router:Router;
    Prop:string[];
    constructor(){
        this.router = Router();
        this.routes();
        this.init();
    }
    init(){
        
    }


    public GetAllParticipate(req:Request,res:Response):void{
        participate.find({}).then((data) => {
            res.status(200).json({
                Data:data,
            })
        })
        .catch((err) => {
           const status =  res.statusCode;
            res.json({
                Status:status,
                err:err
            })
        })
    }
    public GetParticipateById(req:Request,res:Response):void{
          const id:String = req.params.id;
            
          participate.findById(id).then((data) => {
            if (!data){
                res.status(404).json({
                    err:'does not exist'
                })
            }
            else{
            res.status(200).json({
                Data:data,
            })
        }
        })
        .catch((err) => {
           const status =  res.statusCode;
            res.json({
                Status:status,
                err:err
            })
        })
    }
    public CreateParticipate(req:Request,res:Response,next:NextFunction){

      const newParticipate = req.body.Participate;
      if(!newParticipate||!newParticipate.kopon||!newParticipate.userId)
        return res.status(401).json({err:'cant be empty'})

        
        participate.create(newParticipate).then((data)=>{

      }).catch(err=>{
        const status =  res.statusCode;
        res.json({
            Status:status,
            err:err
        })
      })
      
      
        
    }
    public DeleteParticipate(req:Request,res:Response):void{
          const id = req.params.id;
           const status = res.statusCode;
           participate.findByIdAndRemove(id,(err,removed)=>{
              
              if (err) 
              {
               return res.json({status});
              }
              res.json({
                  status,
                  removed
              })

          })
        
    }
    public UpdateParticipate(req:Request,res:Response):void{
        var id =  req.params.id;
        var Participate  =req.body.Participate;
        
        
        Participate.findByIdAndUpdate(id,Participate,{new:true}).exec((err,result)=>{

            if (err) {
                return res.status(res.statusCode).json({
                    Err:err
                })
            }
            res.json({
                Status:res.statusCode,
                Upate:result
            })
        })
        
    }
    routes() {

        this.router.get('/',this.GetAllParticipate);
        this.router.get('/:id', this.GetParticipateById)
        this .router.post('/newParticipate' , this.CreateParticipate);
        this.router.put('/:id',this.UpdateParticipate);
        this.router.delete('/:id',this.DeleteParticipate);
    }
} 

const routes = new ParticipateRoutes();
routes.routes();
//routes.init();

export default routes.router;