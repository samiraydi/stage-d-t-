import { Injectable } from '@angular/core';
import { InjectableRxStompConfig, RxStompService } from '@stomp/ng2-stompjs';

// Models
import { WebSocketOptions } from 'accelengine-lib';

// Services
import { WebSocketService } from 'accelengine-lib';


export const batchsStompConfig: InjectableRxStompConfig = {
    webSocketFactory: () => {
        return new WebSocket('ws://localhost:9191/websocket');
    }
};

@Injectable({ providedIn: 'root' })
export class BatchsWebsocketService extends WebSocketService {
    constructor(stompService: RxStompService) {
        super(
            stompService,
            batchsStompConfig,
            new WebSocketOptions('/batchs/get')
        );
    }
}