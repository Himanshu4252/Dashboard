import mongoose, {Model} from 'mongoose';

interface Iuser {
    userName: string;
    password : string;
    gender : string;
    email : string;
}

const UserSchema = new mongoose.Schema<Iuser>({
    userName: {type: String, required: true},
    password : {type: String ,required: true},
    gender : {type:String, required: true},
    email: {type: String, required: true}
}, {
    timestamps: true,
    collection: 'users'
  });

const User : Model<Iuser> = mongoose.models.User || mongoose.model<Iuser>('User', UserSchema);
export { User }