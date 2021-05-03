import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { validate } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { User, UserDocument } from './user.schema';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findById(id: number): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }
    return user;
  }

  async findOne({ tag, password }: LoginUserDto): Promise<User> {
    const user = await this.userModel.findOne({ tag });
    if (!user) {
      return null;
    }

    if (await argon2.verify(user.password, password)) {
      return user;
    }

    return null;
  }

  async create(dto: CreateUserDto): Promise<User> {
    // check uniqueness of username/email
    const preExistingUser = await this.findByTag(dto.tag);

    if (preExistingUser) {
      const errors = { tag: 'Tag must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = new this.userModel({
      _id: Types.ObjectId(),
      ...dto,
    });
    const errors = await validate(user);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await user.save();
      return user;
    }
  }

  async findByTag(tag: string): Promise<User> {
    const user = await this.userModel.findOne({ tag });
    return user;
  }

  public generateJWT(user: User) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    console.log(process.env, process.env.JWT_SECRET);
    return jwt.sign(
      {
        id: user._id,
        username: user.username,
        tag: user.tag,
        exp: exp.getTime() / 1000,
      },
      process.env.JWT_SECRET,
    );
  }

  async verify(token: string, isWs = false): Promise<User | null> {
    try {
      const payload = <any>jwt.verify(token, process.env.JWT_SECRET);
      const user = await this.findById(payload.id);

      if (!user) {
        if (isWs) {
          throw new WsException('Unauthorized access');
        } else {
          throw new HttpException(
            'Unauthorized access',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      return user;
    } catch (err) {
      if (isWs) {
        throw new WsException(err.message);
      } else {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
