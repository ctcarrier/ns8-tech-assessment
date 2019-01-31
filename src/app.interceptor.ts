import {
  Injectable,
  ExecutionContext,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    stream$: Observable<any>,
  ): Observable<any> {
    // stream$ is an Observable of the controller's result value
    return stream$.pipe(
      tap(data => {
        if (data === undefined) {
          throw new NotFoundException();
        }
      }),
    );
  }
}
