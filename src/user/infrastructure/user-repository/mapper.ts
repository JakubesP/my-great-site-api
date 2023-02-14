import { User as UserModel } from '@prisma/client';
import { User } from '../../domain';

export const mapUserToDomain = (model: UserModel): User => model;
