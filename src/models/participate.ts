import {Schema,model,Document} from 'mongoose';
import Iparticipate from '../interfaces/Iparticipate';



interface IparticipateModel extends Iparticipate ,Document
{
   add(Participate:IparticipateModel)
}
let participateScheama:Schema = new Schema({
    kopon: {
        type:Number,
        required:true
    },
    winner:Boolean,
    userId:
    {
       type: Schema.Types.ObjectId,
       ref:'users',
       required:true
    }

})
participateScheama.path('kopon').validate(function(kopon){
    if(!kopon)
        return false;
    return true
},'kopon cant be null');

export default model<IparticipateModel>('Participate',participateScheama);