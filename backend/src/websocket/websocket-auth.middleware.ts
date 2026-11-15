import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import {parseCookie} from 'cookie';

interface JwtPayload {
  sub: number;
  username?: string;
}

@Injectable()
export class WebsocketAuthMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(client: Socket, next: (err?: Error) => void) {
    try {
      const cookieHeader = client.handshake.headers.cookie;

      if (!cookieHeader) {
        return next(new NotFoundException('Authentication cookie not found'));
      }

      const cookies = parseCookie(cookieHeader);

      const token = cookies['access_token'];

      if (!token) {
        return next(new Error('Access token not found'));
      }

      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

      if (!payload.sub) {
        return next(new Error('Invalid token payload'));
      }

      // Attach authenticated user to the socket.
      client.data.user = {
        id: payload.sub,
        username: payload.username,
      };

      next();
    } catch {
      next(new Error('Unauthorized'));
    }
  }
}