import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { endWith, map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { FetchReportDto } from '../dto/fetch-report.dto';

import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ReportService } from './report.service';

@WebSocketGateway({
  namespace: 'reports',
  // path: '/reports',
  cors: true,
})
export class ReportsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly reportsService: ReportService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    this.server.emit('connected', 'Connected!');
  }
  async handleDisconnect(client: Socket) {
    await this.cacheManager.del('user:' + client.id);
  }

  afterInit(server: Server) {
    console.log(server);
  }

  @SubscribeMessage('fetch')
  async findAll(
    @MessageBody() data: FetchReportDto,
    @ConnectedSocket() socket: Socket,
  ) {
    // create a room for the user with his id from the jwt token OR the socket id
    socket.join('user:' + socket.id);
    // store the report params under the id key
    await this.cacheManager.set('user:' + socket.id, data, 60 * 30);
    // emit the data stats to the user
    socket
      .to('user:' + socket.id)
      .emit(JSON.stringify(await this.reportsService.findPackageStats(data)));
  }

  @SubscribeMessage('refresh')
  async refresh(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    // get all sockets
    this.server.emit('response', data);

    // const sockets = await this.server.of('reports').fetchSockets();
    // // for each socket fetch its id, and send a message according to fetched params from the cache

    // if (sockets.length === 0) return;
    // for (const socket of sockets) {
    //   const searchParams: FetchReportDto = JSON.parse(
    //     (await this.cacheManager.get(socket.id)) as string,
    //   );
    //   // fetch the data and emit it to all clients
    //   client
    //     .to('user:' + socket.id)
    //     .emit(
    //       'refresh',
    //       await this.reportsService.findPackageStats(searchParams),
    //     );
    // }
  }
}
