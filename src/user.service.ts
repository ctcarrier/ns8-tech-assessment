import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  store: User[] = [];
  seq: number = 0;
  getUser(id: number): User {
    return this.store.find(i => i.id === id);
  }

  saveUser(user: User): number {
    if (this.store.find(i => i.email === user.email)) {
      throw new BadRequestException('Duplicate email: ' + user.email);
    }
    const saveSeq: number = this.seq;
    this.store.push(Object.assign({}, user, { id: saveSeq }));
    this.seq += 1;
    return saveSeq;
  }
}
