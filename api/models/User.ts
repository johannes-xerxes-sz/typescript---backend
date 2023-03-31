import mongoose, { Document, Model, Schema } from 'mongoose';
import validator from 'validator';

export interface UserDocument extends Document {
  userName: string;
  gender: 'Male' | 'Female';
  age: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  admin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<UserDocument> {}

const UserSchema: Schema<UserDocument, UserModel> = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      maxLength: 10,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female'],
    },
    age: {
      type: Number,
      required: true,
      validate: (age: number) => {
        return typeof age === 'number';
      },
    },
    email: {
      type: String,
      required: true,
      validate: (email: string) => {
        return validator.isEmail(email);
      },
    },
    password: {
      type: String,
      required: true,
      validate: (password: string) => {
        return validator.isStrongPassword(password);
      },
    },
    firstName: {
      type: String,
      required: true,
      maxLength: 10,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 10,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<UserDocument>('save', function (next) {
  this.userName = this.userName.trim();
  this.firstName = this.firstName.trim();
  this.lastName = this.lastName.trim();

  next();
});

UserSchema.post<UserDocument>('save', function () {
  this.firstName = this.gender.toUpperCase();
});

export default mongoose.model<UserDocument, UserModel>('User', UserSchema);
