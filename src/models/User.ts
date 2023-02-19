import mongoose from 'mongoose';
import { ProviderType } from '../constants/AuthConstant';

const Schema = mongoose.Schema;
const schema = new Schema(
  {
    cid: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    image: { key: { type: String }, location: { type: String } },
    email: { type: String, required: true, unique: true, index: true },
    passwordSet: { type: Boolean, default: true },
    cognitoIds: [{ type: { type: String, enum: Object.keys(ProviderType) } }],
    passowrdUpdatedAt: { type: Date },
    tempPassword: { type: String },
    lastLoginAt: { type: Date, default: Date.now(), required: true },
    active: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

class UserClass {
  _id: any;
  firstName: any;
  lastName: any;
  email: any;
  image: any;
  passwordSet: any;

  get name() {
    if (this.firstName && this.lastName) return `${this.firstName} ${this.lastName}`;
    else if (this.firstName) return this.firstName;
    else if (this.lastName) return this.lastName;
    else return '';
  }

  get details() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      image: this.image,
      passwordSet: this.passwordSet
    };
  }
}

schema.loadClass(UserClass);
schema.index({ email: 1 }, { unique: true });
schema.index({ cid: 1 });

const User = mongoose.model('User', schema);
export default User;
